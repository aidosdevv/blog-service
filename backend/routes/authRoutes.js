const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

router.get('/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.send(`Database time: ${result.rows[0].now}`);
    } catch (err) {
      console.error('DB connection error:', err);
      res.status(500).send('Database connection failed');
    }
  });

  router.get('/some-route', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error('Ошибка:', err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });  

router.post('/register', async (req, res) => {
const { username, password } = req.body;

if (!username || !password) {
    return res.status(400).json({ message: 'Username және password міндетті' });
}

try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, hashedPassword]
    );
    res.status(201).json({ message: 'Қолданушы тіркелді', user: result.rows[0] });
} catch (err) {
    if (err.code === '23505') {
    return res.status(400).json({ message: 'Username бос емес' });
    }
    res.status(500).json({ message: 'Сервер қатесі', error: err.message });
}
});

// Логин
router.post('/login', async (req, res) => {
const { username, password } = req.body;

if (!username || !password) {
    return res.status(400).json({ message: 'Username және password міндетті' });
}

try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
    return res.status(401).json({ message: 'Қолданушы табылмады' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
    return res.status(401).json({ message: 'Қате пароль' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    });
    res.json({ message: 'Сәтті кіруді', token });
} catch (err) {
    res.status(500).json({ message: 'Сервер қатесі', error: err.message });
}
});

module.exports = router;