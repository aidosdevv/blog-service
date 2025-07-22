const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {postRegis} = require('../controllers/postController');

router.post('/posts', authMiddleware, upload.single('image'),postRegis);

module.exports = router;
