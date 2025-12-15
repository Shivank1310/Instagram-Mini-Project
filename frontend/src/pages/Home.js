import React, { useState, useEffect } from 'react';
import { getFeed } from '../services/api';
import PostCard from '../components/PostCard';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    try {
      const data = await getFeed();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log('Error loading feed:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  if (loading) {
    return <div className="loading">Loading feed...</div>;
  }

  return (
    <div className="home-container">
      <div className="feed">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <div className="no-posts">
            <h3>No posts yet!</h3>
            <p>Follow some users to see their posts here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
