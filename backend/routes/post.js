const express = require('express');
const Post = require('../models/Post');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a post
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;

    const newPost = new Post({
      userId: req.userId,
      imageUrl,
      caption
    });

    await newPost.save();
    
    const populatedPost = await Post.findById(newPost._id).populate('userId', 'username');

    res.status(201).json({
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like a post
router.post('/:postId/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if already liked
    const alreadyLiked = post.likes.includes(req.userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== req.userId);
    } else {
      // Like
      post.likes.push(req.userId);
    }

    await post.save();

    res.json({
      message: alreadyLiked ? 'Post unliked' : 'Post liked',
      likes: post.likes
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Comment on a post
router.post('/:postId/comment', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      userId: req.userId,
      text
    });

    await post.save();
    
    const updatedPost = await Post.findById(post._id)
      .populate('comments.userId', 'username');

    res.json({
      message: 'Comment added',
      comments: updatedPost.comments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get feed (posts from followed users)
router.get('/feed', authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    
    const posts = await Post.find({ userId: { $in: currentUser.following } })
      .populate('userId', 'username')
      .populate('comments.userId', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post
router.get('/:postId', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('userId', 'username')
      .populate('comments.userId', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's posts
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;