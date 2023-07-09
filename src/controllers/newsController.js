const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('YOUR_NEWS_API_KEY'); // Replace with your NewsAPI key
const User = require('../models/User');

// Fetch news articles based on the logged-in user's preferences
async function fetchNews(req, res) {
  try {
    const { username } = req.user;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { preferences } = user;
    
    // Fetch news articles based on preferences
    const articles = await newsapi.v2.topHeadlines({
      category: preferences.category,
      sources: preferences.sources.join(','),
    });

    return res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Mark a news article as read
async function markAsRead(req, res) {
  try {
    const { username } = req.user;
    const { id } = req.params;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Mark article as read
    const articleIndex = user.preferences.articles.findIndex(article => article.id === id);
    if (articleIndex !== -1) {
      user.preferences.articles[articleIndex].read = true;
      await user.save();
    }

    return res.status(200).json({ message: 'Article marked as read' });
  } catch (error) {
    console.error('Error marking article as read:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Mark a news article as favorite
async function markAsFavorite(req, res) {
  try {
    const { username } = req.user;
    const { id } = req.params;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Mark article as favorite
    const articleIndex = user.preferences.articles.findIndex(article => article.id === id);
    if (articleIndex !== -1) {
      user.preferences.articles[articleIndex].favorite = true;
      await user.save();
    }

    return res.status(200).json({ message: 'Article marked as favorite' });
  } catch (error) {
    console.error('Error marking article as favorite:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Retrieve all read news articles
async function getReadArticles(req, res) {
  try {
    const { username } = req.user;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get read articles
    const readArticles = user.preferences.articles.filter(article => article.read);

    return res.status(200).json({ readArticles });
  } catch (error) {
    console.error('Error retrieving read articles:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Retrieve all favorite news articles
async function getFavoriteArticles(req, res) {
  try {
    const { username } = req.user;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get favorite articles
    const favoriteArticles = user.preferences.articles.filter(article => article.favorite);

    return res.status(200).json({ favoriteArticles });
  } catch (error) {
    console.error('Error retrieving favorite articles:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Search for news articles based on keywords
async function searchArticles(req, res) {
  try {
    const { username } = req.user;
    const { keyword } = req.params;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Search articles based on keyword
    const articles = await newsapi.v2.everything({
      q: keyword,
      sources: user.preferences.sources.join(','),
    });

    return res.status(200).json({ articles });
