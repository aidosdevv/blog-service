const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {postRegis,getAllPosts,getPostById} = require('../controllers/postController');

router.post('/posts', authMiddleware, upload.single('image'),postRegis);
router.get('/posts', getAllPosts);
router.get('/:id',getPostById);

module.exports = router;

