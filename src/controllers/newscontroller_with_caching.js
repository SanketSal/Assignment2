const redis = require('redis');
const client = redis.createClient();

// Fetch news articles based on the logged-in user's preferences
async function fetchNews(req, res) {
  try {
    const { username } = req.user;

    // Check if articles are in Redis cache
    client.get(username, async (err, cachedArticles) => {
      if (err) {
        console.error('Error retrieving cached articles:', err);
      }

      if (cachedArticles) {
        return res.status(200).json({ articles: JSON.parse(cachedArticles) });
      }

      // Fetch news articles based on preferences
      const articles = await newsapi.v2.topHeadlines({
        category: preferences.category,
        sources: preferences.sources.join(','),
      });

      // Store articles in Redis cache
      client.set(username, JSON.stringify(articles));

      return res.status(200).json({ articles });
    });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
