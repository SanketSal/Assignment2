const request = require('supertest');
const app = require('../app');

describe('Complete Workflow', () => {
  let authToken;

  beforeAll(async () => {
    // Register a new user
    await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'password123' });

    // Log in the user and obtain the authentication token
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    authToken = loginResponse.body.token;
  });

  it('should perform a complete workflow', async () => {
    // Set news preferences
    const preferencesResponse = await request(app)
      .put('/preferences')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        preferences: {
          category: 'technology',
          sources: ['cnn', 'bbc-news'],
        },
      });

    expect(preferencesResponse.statusCode).toEqual(200);
    expect(preferencesResponse.body).toHaveProperty('message', 'Preferences updated successfully');

    // Fetch news articles
    const newsResponse = await request(app)
      .get('/news')
      .set('Authorization', `Bearer ${authToken}`);

    expect(newsResponse.statusCode).toEqual(200);
    expect(newsResponse.body).toHaveProperty('articles');

    const articles = newsResponse.body.articles;
    expect(articles.length).toBeGreaterThan(0);

    // Mark an article as read
    const articleId = articles[0].id;
    const markAsReadResponse = await request(app)
      .post(`/news/${articleId}/read`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(markAsReadResponse.statusCode).toEqual(200);
    expect(markAsReadResponse.body).toHaveProperty('message', 'Article marked as read');

    // Mark an article as favorite
    const markAsFavoriteResponse = await request(app)
      .post(`/news/${articleId}/favorite`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(markAsFavoriteResponse.statusCode).toEqual(200);
    expect(markAsFavoriteResponse.body).toHaveProperty('message', 'Article marked as favorite');

    // Retrieve read articles
    const readArticlesResponse = await request(app)
      .get('/news/read')
      .set('Authorization', `Bearer ${authToken}`);

    expect(readArticlesResponse.statusCode).toEqual(200);
    expect(readArticlesResponse.body).toHaveProperty('articles');

    const readArticles = readArticlesResponse.body.articles;
    expect(readArticles.length).toBeGreaterThan(0);

    // Retrieve favorite articles
    const favoriteArticlesResponse = await request(app)
      .get('/news/favorites')
      .set('Authorization', `Bearer ${authToken}`);

    expect(favoriteArticlesResponse.statusCode).toEqual(200);
    expect(favoriteArticlesResponse.body).toHaveProperty('articles');

    const favoriteArticles = favoriteArticlesResponse.body.articles;
    expect(favoriteArticles.length).toBeGreaterThan(0);

    // Search for articles
    const searchKeyword = 'technology';
    const searchResponse = await request(app)
      .get(`/news/search/${searchKeyword}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(searchResponse.statusCode).toEqual(200);
    expect(searchResponse.body).toHaveProperty('articles');

    const searchedArticles = searchResponse.body.articles;
    expect(searchedArticles.length).toBeGreaterThan(0);
  });
});
