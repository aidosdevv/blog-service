import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        
        const profileRes = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(profileRes.data);

        const postsRes = await axios.get('http://localhost:3000/api/auth/my-posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(postsRes.data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Сервер қатесі');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== postId));
      setMessage('Пост удалён');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка при удалении');
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`); 
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <div className="profile-info">
        <p><strong>Имя пользователя:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <h3>Менің посттарым</h3>
      {posts.length === 0 ? (
        <p>Әзірше посттар жоқ сізде</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h4>{post.title}</h4>
              <p>{post.content.substring(0, 100)}...</p>
              <p><small>Сенен құрған Посттар: {new Date(post.created_at).toLocaleDateString()}</small></p>
              <button
                onClick={() => handleEdit(post.id)}
    style={{ marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Өзгерту
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Өшіру
              </button>
            </li>
          ))}
        </ul>
      )}
      {message && <p className={message.includes('ошибка') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
};

export default Profile;