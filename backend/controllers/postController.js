const pool = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const upload = require('../middleware/upload');

exports.postRegis = async(req,res)=>{
    const { title, content } = req.body;
  const image = req.file?.filename;

  if (!title) return res.status(400).json({ message: 'Title міндетті' });

  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, image) VALUES ($1, $2, $3) RETURNING *',
      [title, content, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
}