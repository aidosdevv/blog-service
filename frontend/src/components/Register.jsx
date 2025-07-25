import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', { username, password });
      setMessage('Қолданушы тіркелді');
      setTimeout(() => window.location.href = '/login', 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Сервер қатесі');
    }
  };

  return (
    <div className="register-container">
      <h2>Тіркелу</h2>
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
        <button type="submit">Тіркелу</button>
      </form>
      {message && <p className={message.includes('Қате') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
};

export default Register;