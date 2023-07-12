// tests/auth.test.js (example for authentication endpoints)
const request = require('supertest');
const app = require('../app');

describe('Authentication endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should log in a user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
  
  // Add more test cases for other authentication endpoints
});
