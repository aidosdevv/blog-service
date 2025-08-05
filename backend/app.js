const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes')
const app = express();


app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так!' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});