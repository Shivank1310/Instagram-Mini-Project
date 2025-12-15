import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Auth APIs
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// Post APIs
export const createPost = async (postData) => {
  const response = await axios.post(`${API_URL}/post/create`, postData, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const getFeed = async () => {
  const response = await axios.get(`${API_URL}/post/feed`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const likePost = async (postId) => {
  const response = await axios.post(`${API_URL}/post/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const addComment = async (postId, text) => {
  const response = await axios.post(`${API_URL}/post/${postId}/comment`, 
    { text }, 
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await axios.get(`${API_URL}/post/${postId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const getUserPosts = async (userId) => {
  const response = await axios.get(`${API_URL}/post/user/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

// User APIs
export const followUser = async (userId) => {
  const response = await axios.post(`${API_URL}/user/follow/${userId}`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const unfollowUser = async (userId) => {
  const response = await axios.post(`${API_URL}/user/unfollow/${userId}`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await axios.get(`${API_URL}/user/profile/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};