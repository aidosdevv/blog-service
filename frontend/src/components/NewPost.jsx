import React, { useState } from 'react';
import axios from 'axios';
import './NewPost.css'; 

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:3000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setMessage('Блог сәтті сақталды!');
      setTitle('');
      setContent('');
      setImage(null);
      setPreview(null);
    } catch (err) {
      setMessage('Қате: ' + (err.response?.data?.message || 'Сервер қатесі'));
    }
  };

  return (
    <div className="new-post-container">
      <form onSubmit={handleSubmit} className="new-post-form">
        <h2>Жаңа блог жазбасы</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Тақырып"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Мазмұны"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image-upload" className="file-label">
            Суретті таңдау
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-file"
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>
        <button type="submit" className="submit-button">
          Сақтау
        </button>
        {message && <p className={`message ${message.includes('Қате') ? 'error' : 'success'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default NewPost;






