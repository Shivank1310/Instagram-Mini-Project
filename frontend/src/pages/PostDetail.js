import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/api';
import PostCard from '../components/PostCard';
import './PostDetail.css';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPost = async () => {
    try {
      const data = await getPostById(postId);
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.log('Error loading post:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [postId]);

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

  return (
    <div className="post-detail-container">
      <PostCard post={post} />
    </div>
  );
}

export default PostDetail;
