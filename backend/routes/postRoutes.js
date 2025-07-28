const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file?.filename;
  const user_id = req.user.id;

  if (!title) {
    return res.status(400).json({ message: 'Title міндетті' });
  }
  if (!user_id) {
    return res.status(401).json({ message: 'Авторизация қажет' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, image, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, image, user_id]
    );
    res.status(201).json({ message: 'Блог сәтті сақталды!', post: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Сервер қатесі', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.*, users.username 
      FROM posts 
      LEFT JOIN users ON posts.user_id = users.id 
      ORDER BY posts.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Сервер қатесі', error: err.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  const postId = Number(req.params.id);
  if (!postId || isNaN(postId)) {
    return res.status(400).json({ message: 'Жарамсыз пост ID' });
  }

  try {
    const result = await pool.query(
      `
      SELECT posts.*, users.username 
      FROM posts 
      LEFT JOIN users ON posts.user_id = users.id 
      WHERE posts.id = $1
      `,
      [postId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Пост табылмады' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Сервер қатесі', error: err.message });
  }
});

router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  const postId = Number(req.params.id);
  if (!postId || isNaN(postId)) {
    return res.status(400).json({ message: 'Жарамсыз пост ID' });
  }

  const { title, content } = req.body;
  const image = req.file ? req.file.path : req.body.image; 
  const user_id = req.user.id;

  if (!title) {
    return res.status(400).json({ message: 'Title міндетті' });
  }

  try {
    const result = await pool.query(
      `
      UPDATE posts 
      SET title = $1, content = $2, image = $3, user_id = $4 
      WHERE id = $5 AND user_id = $4 
      RETURNING *
      `,
      [title, content, image, user_id, postId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Пост табылмады немесе рұқсат жоқ' });
    }
    res.json({ message: 'Пост жаңартылды', post: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Сервер қатесі', error: err.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const [post] = await pool.query('SELECT user_id FROM posts WHERE id = ?', [postId]);
    if (!post || post.user_id !== userId) {
      return res.status(403).json({ message: 'Нет доступа к этому посту' });
    }
    await db.query('DELETE FROM posts WHERE id = ?', [postId]);
    res.json({ message: 'Пост удалён' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Серверная ошибка' });
  }
});

module.exports = router;