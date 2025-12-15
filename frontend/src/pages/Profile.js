import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, getUserPosts, followUser, unfollowUser } from '../services/api';
import PostCard from '../components/PostCard';
import './Profile.css';

function Profile() {
  const { userId } = useParams();
  const currentUserId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const userProfile = await getUserProfile(userId);
      const userPosts = await getUserPosts(userId);
      setUser(userProfile);
      setPosts(userPosts);
      setLoading(false);
    } catch (error) {
      console.log('Error loading profile:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      loadProfile();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error">User not found</div>;
  }

  const isOwnProfile = currentUserId === userId;
  const isFollowing = user.followers?.some(f => f._id === currentUserId);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.username?.charAt(0).toUpperCase()}
        </div>
        
        <div className="profile-info">
          <div className="profile-top">
            <h2>{user.username}</h2>
            {!isOwnProfile && (
              <button 
                className={`follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={handleFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          
          <div className="profile-stats">
            <span><strong>{posts.length}</strong> posts</span>
            <span><strong>{user.followers?.length || 0}</strong> followers</span>
            <span><strong>{user.following?.length || 0}</strong> following</span>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h3>Posts</h3>
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="no-posts-msg">No posts yet</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
