const express = require('express');
const router = express.Router();

// Import helpers
const { registerUser, loginUser, getPreferences, updatePreferences, getNews } = require('./helpers');

// Register a new user
router.post('/register', registerUser);

// Log in a user
router.post('/login', loginUser);

// Retrieve news preferences for the logged-in user
router.get('/preferences', getPreferences);

// Update news preferences for the logged-in user
router.put('/preferences', updatePreferences);

// Fetch news articles based on the logged-in user's preferences
router.get('/news', getNews);

module.exports = router;
