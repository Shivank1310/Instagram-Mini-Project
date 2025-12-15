import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { likePost, addComment } from '../services/api';
import './PostCard.css';

function PostCard({ post, onUpdate }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const currentUserId = localStorage.getItem('userId');

  const handleLike = async () => {
    try {
      await likePost(post._id);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.log('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addComment(post._id, comment);
      setComment('');
      if (onUpdate) onUpdate();
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };

  const isLiked = post.likes && post.likes.includes(currentUserId);

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <div className="user-avatar">
            {post.userId?.username?.charAt(0).toUpperCase()}
          </div>
          <span 
            className="username"
            onClick={() => navigate(`/profile/${post.userId._id}`)}
          >
            {post.userId?.username}
          </span>
        </div>
      </div>

      <div className="post-image">
        <img src={post.imageUrl} alt="Post" />
      </div>

      <div className="post-actions">
        <button 
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'} {post.likes?.length || 0} likes
        </button>
        <button 
          className="comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {post.comments?.length || 0} comments
        </button>
      </div>

      <div className="post-caption">
        <span className="caption-username">{post.userId?.username}</span>
        <span className="caption-text">{post.caption}</span>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((c, index) => (
                <div key={index} className="comment">
                  <span className="comment-username">{c.userId?.username}</span>
                  <span className="comment-text">{c.text}</span>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet</p>
            )}
          </div>

          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostCard;