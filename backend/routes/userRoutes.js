const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db'); 
const authMiddleware = require('../middleware/auth');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 
    console.log('userId:', userId); 
    const { rows } = await db.query('SELECT username FROM users WHERE id = $1', [userId]);
    const user = rows[0];
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (err) {
    console.error('Ошибка в /profile:', err);
    res.status(500).json({ message: 'Серверная ошибка' });
  }
});

router.get('/my-posts', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('userId:', userId); 
    const { rows: posts } = await db.query(
      'SELECT posts.id, posts.title, posts.content, posts.created_at, users.username ' +
      'FROM posts JOIN users ON posts.user_id = users.id WHERE posts.user_id = $1',
      [userId]
    );
    res.json(posts);
  } catch (err) {
    console.error('Ошибка в /my-posts:', err);
    res.status(500).json({ message: 'Серверная ошибка' });
  }
});

module.exports = router;