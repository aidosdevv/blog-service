import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        setIsLoading(true);
        const [profileRes, postsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3000/api/auth/my-posts', {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        
        setUser(profileRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Сервер қатесі');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleDelete = async (postId) => {
    if (!window.confirm('Бұл постты шынымен жойғыңыз келе ме?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== postId));
      setMessage('Пост сәтті жойылды');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Постты жою кезінде қате орын алды');
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`); 
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px'
      }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #4a6fa5',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        borderBottom: '1px solid #eee',
        paddingBottom: '1rem'
      }}>
        <h2 style={{
          color: '#4a6fa5',
          margin: 0,
          fontSize: '1.8rem'
        }}>Менің профилім</h2>
      </div>

      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          color: '#4a6fa5',
          marginTop: 0,
          marginBottom: '1rem'
        }}>Жеке ақпарат</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div>
            <p style={{
              margin: '0.5rem 0',
              color: '#666'
            }}><strong>Қолданушы аты:</strong></p>
            <p style={{
              margin: '0.5rem 0',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>{user.username}</p>
          </div>
          
          <div>
            <p style={{
              margin: '0.5rem 0',
              color: '#666'
            }}><strong>Email:</strong></p>
            <p style={{
              margin: '0.5rem 0',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>{user.email}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{
          color: '#4a6fa5',
          marginBottom: '1.5rem'
        }}>Менің посттарым</h3>
        
        {posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }}>
            <p style={{ color: '#666', margin: 0 }}>Әзірше посттар жоқ</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {posts.map((post) => (
              <div key={post.id} style={{
                backgroundColor: 'white',
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }
              }}>
                <h4 style={{
                  marginTop: 0,
                  marginBottom: '0.5rem',
                  color: '#333'
                }}>{post.title}</h4>
                
                <p style={{
                  color: '#666',
                  marginBottom: '1rem'
                }}>{post.content.substring(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
                
                <p style={{
                  fontSize: '0.85rem',
                  color: '#999',
                  marginBottom: '1.5rem'
                }}>
                  {new Date(post.created_at).toLocaleDateString('kk-KZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => handleEdit(post.id)}
                    style={{
                      flex: 1,
                      backgroundColor: '#4a6fa5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      fontSize: '0.9rem'
                    }}
                  >
                    Өңдеу
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      flex: 1,
                      backgroundColor: '#f8f9fa',
                      color: '#dc3545',
                      border: '1px solid #dc3545',
                      borderRadius: '6px',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontSize: '0.9rem'
                    }}
                  >
                    Жою
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {message && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: message.includes('қате') ? '#f8d7da' : '#d4edda',
          color: message.includes('қате') ? '#721c24' : '#155724',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        button:hover {
          opacity: 0.9;
        }
        button:first-of-type:hover {
          background-color: #3a5a80 !important;
        }
        button:last-of-type:hover {
          background-color: #dc3545 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Profile;