import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Сәтті кіруді');
      setTimeout(() => window.location.href = '/posts', 1000); // Редирект после логина
    } catch (err) {
      setMessage(err.response?.data?.message || 'Сервер қатесі');
    }
  };

  return (
    <div className="login-container">
      <h2>Кіру</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Кіру</button>
      </form>
      {message && <p className={message.includes('Қате') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
};

export default Login;