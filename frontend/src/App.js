import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import './App.css';

function App() {
  const isLoggedIn = localStorage.getItem('token');

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          
          <Route path="/create-post" element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          } />
          
          <Route path="/profile/:id" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          <Route path="/post/:id" element={
            <PrivateRoute>
              <PostDetail />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;