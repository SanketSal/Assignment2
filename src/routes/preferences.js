const express = require('express');
const router = express.Router();
const preferencesController = require('../controllers/preferencesController');
const { authMiddleware } = require('../utils/authentication');

router.get('/', authMiddleware, preferencesController.getPreferences);
router.put('/', authMiddleware, preferencesController.updatePreferences);

module.exports = router;
