const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Follow a user
router.post('/follow/:userId', authMiddleware, async (req, res) => {
  try {
    const userToFollow = req.params.userId;
    const currentUser = req.userId;

    if (userToFollow === currentUser) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    // Update both users
    await User.findByIdAndUpdate(currentUser, {
      $addToSet: { following: userToFollow }
    });

    await User.findByIdAndUpdate(userToFollow, {
      $addToSet: { followers: currentUser }
    });

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Unfollow a user
router.post('/unfollow/:userId', authMiddleware, async (req, res) => {
  try {
    const userToUnfollow = req.params.userId;
    const currentUser = req.userId;

    // Update both users
    await User.findByIdAndUpdate(currentUser, {
      $pull: { following: userToUnfollow }
    });

    await User.findByIdAndUpdate(userToUnfollow, {
      $pull: { followers: currentUser }
    });

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user profile
router.get('/profile/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('followers', 'username')
      .populate('following', 'username');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;