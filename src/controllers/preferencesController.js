const User = require('../models/User');

// Retrieve the news preferences for the logged-in user
async function getPreferences(req, res) {
  try {
    const { username } = req.user;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Update the news preferences for the logged-in user
async function updatePreferences(req, res) {
  try {
    const { username } = req.user;
    const { preferences } = req.body;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user preferences
    user.preferences = preferences;
    await user.save();

    return res.status(200).json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getPreferences,
  updatePreferences,
};
