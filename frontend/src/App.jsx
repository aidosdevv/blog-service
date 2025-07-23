import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <div style={{ textAlign: 'center', backgroundColor: '#4CAF50', padding: '20px' }}>
      <BrowserRouter>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/login" style={{ marginRight: '15px', color: 'white' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '15px', color: 'white' }}>Register</Link>
          <Link to="/new" style={{ marginRight: '15px', color: 'white' }}>New Post</Link>
          <Link to="/posts" style={{ color: 'white' }}>Posts</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;