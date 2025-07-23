import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/posts', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        setPosts(res.data);
      } catch (err) {
        setError('Қате: ' + (err.response?.data?.message || 'Сервер қатесі'));
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list-container">
      <h2>Блог жазбалары</h2>
      {error && <p className="error">{error}</p>}
      {posts.length === 0 && !error && <p>Жазбалар жоқ</p>}
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
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p className="author">Автор: {post.username || 'Белгісіз'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;