import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Қате: ' + (err.response?.data?.message || 'Сервер қатесі'));
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list-container">
      <h2>Блог</h2>
      {loading && <p>Жүктелуде...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && posts.length === 0 && !error && <p>Жазбалар жоқ</p>}
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {post.image && (
              <img
                src={`http://localhost:3000/${post.image}`}
                alt={post.title}
                className="post-image"
              />
            )}
            <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
            <p>{post.content}</p>
            <p className="author">Автор: {post.username || 'Белгісіз'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;