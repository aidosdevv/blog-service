const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {postRegis} = require('../controllers/postController');

router.post('/posts', authMiddleware, upload.single('image'),postRegis);

module.exports = router;


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => setError('Пост табылмады'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Жүктелуде...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return null;

  return (
    <div>
      <h2>{post.title}</h2>
      {post.image && (
        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt="Post"
          width="500"
        />
      )}
      <p>
        {new Date(post.created_at).toLocaleDateString('kk-KZ', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;

