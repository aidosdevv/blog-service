import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('https://blog-backend-3329.onrender.com/api/auth/register', { username, password });
      setMessage('Қолданушы сәтті тіркелді!');
      setTimeout(() => window.location.href = '/login', 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Серверде қате орын алды');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 200px)',
      backgroundColor: '#f5f7fa',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#4a6fa5',
          marginBottom: '1.5rem',
          fontSize: '1.8rem',
          fontWeight: '600'
        }}>Регистрация</h2>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#555',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>Имя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              className="form-input"
              placeholder="Имя"
            />
          </div>
          
          <div style={{ marginBottom: '1.75rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#555',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              className="form-input"
              placeholder="Пароль"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.85rem',
              backgroundColor: '#4a6fa5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginBottom: '1rem'
            }}
            className="submit-btn"
          >
            {isLoading ? 'Загрузка...' : 'Регистрация'}
          </button>
        </form>
        
        {message && (
          <p style={{
            color: message.includes('қате') ? '#e74c3c' : '#2ecc71',
            margin: '1rem 0',
            fontWeight: '500'
          }}>
            {message}
          </p>
        )}
        
        <p style={{ color: '#666', marginTop: '1.5rem' }}>
          Аккаунт есть?{' '}
          <Link 
            to="/login" 
            style={{
              color: '#4a6fa5',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Войти
          </Link>
        </p>
      </div>

      {/* Стили для hover эффектов */}
      <style>{`
        .form-input:focus {
          outline: none;
          border-color: #4a6fa5;
        }
        .submit-btn:hover {
          background-color: #3a5a80 !important;
        }
        .submit-btn:disabled {
          background-color: #cccccc !important;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Register;