import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://blog-backend-3329.onrender.com/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        setError('Қате: ' + (err.response?.data?.message || 'Сервер қатесі'));
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Постты жойғыңыз келеді ме?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://blog-backend-3329.onrender.com/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate('/posts');
      } catch (err) {
        setError('Қате: ' + (err.response?.data?.message || 'Сервер қатесі'));
      }
    }
  };

  if (loading) return <p>Жүктелуде...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>Пост табылмады</p>;

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      {post.image && (
        <img
          src={`https://blog-backend-3329.onrender.com/${post.image}`}
          alt={post.title}
          className="post-image"
        />
      )}
      <p>{post.content}</p>
      <p className="author">Автор: {post.username || 'Белгісіз'}</p>
      <div className="post-actions">
        <Link to={`/post/edit/${post.id}`} className="edit-btn">Өзгерту</Link>
        <button onClick={handleDelete} className="delete-btn">Жою</button>
      </div>
      <Link to="/posts" className="back-btn">Артқа</Link>
    </div>
  );
};

export default PostDetail;