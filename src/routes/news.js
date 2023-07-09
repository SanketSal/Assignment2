const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { authMiddleware } = require('../utils/authentication');

router.get('/', authMiddleware, newsController.fetchNews);
router.post('/:id/read', authMiddleware, newsController.markAsRead);
router.post('/:id/favorite', authMiddleware, newsController.markAsFavorite);
router.get('/read', authMiddleware, newsController.getReadArticles);
router.get('/favorites', authMiddleware, newsController.getFavoriteArticles);
router.get('/search/:keyword', authMiddleware, newsController.searchArticles);

module.exports = router;
