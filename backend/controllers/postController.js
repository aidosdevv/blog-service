const pool = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const upload = require('../middleware/upload');

exports.postRegis = async(req,res)=>{
  const { title, content } = req.body;
  const image = req.file?.filename;
  const user_id = req.user?.id;

  if (!title) return res.status(400).json({ message: 'Title міндетті' });

  try {
    const result = await pool.query(
        'INSERT INTO posts (title, content, image, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, content, image, user_id]
      );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}

exports.getAllPosts = async (req, res, next) => {
    try {
      const result = await pool.query('SELECT posts.* ,users.username from posts left join users on posts.user_id = users.id  ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      next(err);
    }
  };
  
exports.getPostById = async (req, res, next) => {
    const postId = Number(req.params.id); // Приводим к числу
  
    // Проверка, что postId - это валидное число
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
      console.error(err);
      next(err);
    }
  };

  
 