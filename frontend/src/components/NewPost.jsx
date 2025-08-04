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
      const token = localStorage.getItem('token');
      const res = await axios.post('https://blog-backend-3329.onrender.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
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
      <h2>Новый блог</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <input
            type="text"
            placeholder="Тема"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Описания"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image-upload" className="file-label">Выбрать фото</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && <div className="image-preview"><img src={preview} alt="Preview" /></div>}
        </div>
        <button type="submit">Сохранить</button>
      </form>
      {message && <p className={message.includes('Ошибка') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
};

export default NewPost;