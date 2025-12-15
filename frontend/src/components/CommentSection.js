import React, { useState } from 'react';
import { addComment } from '../services/api';
import './CommentSection.css';

function CommentSection({ postId, comments, onCommentAdded }) {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const updatedPost = await addComment(postId, newComment);
      setNewComment('');
      if (onCommentAdded) {
        onCommentAdded(updatedPost);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments && comments.map((comment, index) => (
          <div key={index} className="comment">
            <span className="comment-author">{comment.userId.username}</span>
            <span className="comment-text">{comment.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newComment.trim()}>
          Post
        </button>
      </form>
    </div>
  );
}

export default CommentSection;
