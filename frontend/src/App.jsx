import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';
import EditPost from './components/EditPost';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', checkAuth);
    checkAuth();
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/posts'; // Перенаправляем на страницу постов после выхода
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <BrowserRouter>
        {/* Навигационная панель */}
        <nav style={{
          backgroundColor: '#4a6fa5',
          padding: '1rem 2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link 
              to="/posts" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginRight: '2rem'
              }}
            >
              MyBlog
            </Link>
            
            {/* Ссылка на посты видна всем */}
            <Link 
              to="/posts" 
              style={{
                color: 'white',
                textDecoration: 'none',
                marginRight: '1.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                transition: 'background-color 0.3s'
              }}
              className="nav-link"
            >
              Посты
            </Link>

            {/* Ссылка на новый пост только для авторизованных */}
            {isAuthenticated && (
              <Link 
                to="/new" 
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginRight: '1.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s'
                }}
                className="nav-link"
              >
                Новый пост
              </Link>
            )}
          </div>

          <div>
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    marginRight: '1.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s'
                  }}
                  className="nav-link"
                >
                  Вход
                </Link>
                <Link 
                  to="/register" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: '1px solid white',
                    transition: 'all 0.3s'
                  }}
                  className="nav-link"
                >
                  Регистрация
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/profile" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    marginRight: '1.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s'
                  }}
                  className="nav-link"
                >
                  Профиль
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    color: 'white',
                    background: 'none',
                    border: '1px solid white',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '1rem'
                  }}
                  className="nav-link"
                >
                  Выход
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Основное содержимое */}
        <div style={{
          maxWidth: '1200px',
          margin: '2rem auto',
          padding: '0 1rem'
        }}>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new" element={isAuthenticated ? <NewPost /> : <PostList />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <PostList />} />
            <Route path="/edit/:id" element={isAuthenticated ? <EditPost /> : <PostList />} />
            <Route path="/" element={<PostList />} />
          </Routes>
        </div>

        <footer style={{
          backgroundColor: '#4a6fa5',
          color: 'white',
          textAlign: 'center',
          padding: '1.5rem',
          marginTop: '2rem'
        }}>
          <p>© 2025 MyBlog. Все права защищены.</p>
        </footer>
      </BrowserRouter>

      {/* Стили для hover-эффектов */}
      <style>{`
        .nav-link:hover {
          background-color: rgba(255,255,255,0.2);
        }
        button.nav-link:hover {
          background-color: white;
          color: #4a6fa5;
        }
      `}</style>
    </div>
  );
}

export default App;