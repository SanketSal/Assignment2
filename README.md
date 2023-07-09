# News Aggregator API

This RESTful API allows users to fetch news articles from multiple sources based on their preferences.

## Features

- User registration and login with password hashing and token-based authentication.
- User can set their news preferences, including categories and sources.
- Fetch news articles based on user preferences from external news APIs.
- Filter and process fetched articles asynchronously based on user preferences.
- Error handling for invalid requests, authentication errors, and authorization errors.
- Input validation for user registration and news preference updates.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- bcrypt (for password hashing)
- jsonwebtoken (for token-based authentication)
- NewsAPI (for fetching news articles)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/news-aggregator-api.git
```

2. Install the dependencies:

```bash
cd news-aggregator-api
npm install
```

3. Set up a MongoDB database and update the connection string in `app.js` to your database URL.

4. Obtain a NewsAPI key by signing up at [newsapi.org](https://newsapi.org/) and replace `YOUR_NEWS_API_KEY` in `controllers/newsController.js` with your actual key.

5. Start the server:

```bash
npm start
```

The server will start on http://localhost:3000.

## API Endpoints

- **POST /auth/register:** Register a new user.
- **POST /auth/login:** Log in a user.
- **GET /preferences:** Retrieve the news preferences for the logged-in user.
- **PUT /preferences:** Update the news preferences for the logged-in user.
- **GET /news:** Fetch news articles based on the logged-in user's preferences.
- **POST /news/:id/read:** Mark a news article as read.
- **POST /news/:id/favorite:** Mark a news article as a favorite.
- **GET /news/read:** Retrieve all read news articles.
- **GET /news/favorites:** Retrieve all favorite news articles.
- **GET /news/search/:keyword:** Search for news articles based on keywords.

## Examples

### Register a new user

```bash
POST /auth/register

{
  "username": "john_doe",
  "password": "password123"
}
```

### Log in a user

```bash
POST /auth/login

{
  "username": "john_doe",
  "password": "password123"
}
```

### Retrieve news preferences

```bash
GET /preferences
```

### Update news preferences

```bash
PUT /preferences

{
  "preferences": {
    "category": "technology",
    "sources": ["cnn", "bbc-news"]
  }
}
```

### Fetch news articles

```bash
GET /news
```

### Mark an article as read

```bash
POST /news/:id/read
```

### Mark an article as favorite

```bash
POST /news/:id/favorite
```

### Retrieve read articles

```bash
GET /news/read
```

### Retrieve favorite articles

```bash
GET /news/favorites
```

### Search articles

```bash
GET /news/search/keyword
```

Replace `:id` in the routes with the ID of the specific article.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit an issue or a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README according to your specific project needs. Provide information about any additional features, instructions for running tests, and deployment considerations if applicable.

I hope this helps you create a comprehensive README for your News Aggregator API project. If you have any further questions, feel free to ask!
