const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NewsApi } = require('newsapi');
const newsapi = new NewsApi('adssdsdsdsads');

const users = [];

// Register a new user
async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user information
    const user = { username, password: hashedPassword };
    users.push(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Log in a user
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, 'your-secret-key');

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Middleware for authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

// Retrieve news preferences for the logged-in user
function getPreferences(req, res) {
  const { username } = req.user;

  // Fetch the user's preferences from the data store
  const user = users.find(user => user.username === username);

  res.json({ preferences: user.preferences });
}

// Update news preferences for the logged-in user
function updatePreferences(req, res) {
  const { username } = req.user;
  const { preferences } = req.body;

  // Update the user's preferences in the data store
  const user = users.find(user => user.username === username);
  user.preferences = preferences;

  res.json({ message: 'Preferences updated successfully' });
}

// Fetch news articles based on the logged-in user's preferences
async function getNews(req, res) {
  const { username } = req.user;

  // Fetch the user's preferences from the data store
  const user = users.find(user => user.username === username);
  const preferences = user.preferences;

  // Fetch news articles from NewsAPI based on preferences
  try {
    const response = await newsapi.v2.topHeadlines({
      category: preferences.join(','),
      language: 'en',
      pageSize: 10,
    });

    // Return the articles
    const articles = response.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
    }));

    res.json({ news: articles });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  authenticateToken,
  getPreferences,
  updatePreferences,
  getNews,
};
