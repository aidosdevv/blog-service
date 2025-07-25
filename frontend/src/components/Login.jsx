import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setMessage('логин успешно!');
      setTimeout(() => window.location.href = '/posts', 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка в сервере');
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
        }}>Логин</h2>
        
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
            {isLoading ? 'Пытаеться войти...' : 'Войти'}
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
        
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>
            Аккаунт нет?{' '}
            <Link 
              to="/register" 
              style={{
                color: '#4a6fa5',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Регистрация
            </Link>
          </p>
          <p style={{ color: '#666' }}>
            <Link 
              to="/forgot-password" 
              style={{
                color: '#4a6fa5',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Забыли пароль?
            </Link>
          </p>
        </div>
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

export default Login;