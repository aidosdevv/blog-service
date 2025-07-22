import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

import ProtectedRoute from './components/ProtectedRoute';
import NewPost from './components/NewPost';
function App() {
  return (
    <div style={{ textAlign: 'center', backgroundColor: 'green' }}>
      <BrowserRouter>
        <nav style={{ margin: 20 }}>
          <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/new">Posts</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
          path="/new"
          element={
              <NewPost/>
          }
        />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;