const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Create or update user after Firebase authentication
router.post('/sync', async (req, res) => {
  try {
    const { email, uid, displayName, photoURL } = req.body;

    // Find user by Firebase UID or create new one
    let user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      // Create new user
      user = new User({
        email,
        firebaseUid: uid,
        name: displayName || '',
        photoURL: photoURL || ''
      });
    } else {
      // Update existing user
      user.email = email;
      user.name = displayName || user.name;
      user.photoURL = photoURL || user.photoURL;
    }

    await user.save();
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({
      success: false,
      error: 'Error syncing user data'
    });
  }
});

// Get user profile
router.get('/profile/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.uid });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching user profile'
    });
  }
});

module.exports = router;
