import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div style={{ textAlign: 'center', backgroundColor: 'green' }}>
      <BrowserRouter>
        <nav style={{ margin: 20 }}>
          <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;