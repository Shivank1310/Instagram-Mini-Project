import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import './CreatePost.css';

function CreatePost() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageUrl.trim()) {
      setError('Please provide an image URL');
      return;
    }

    try {
      await createPost({ imageUrl, caption });
      navigate('/');
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-box">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Preview" onError={() => setError('Invalid image URL')} />
            </div>
          )}

          <div className="form-group">
            <label>Caption</label>
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows="4"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">Share Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
