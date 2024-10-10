
const express = require('express');
const { addFavori } = require('../controllers/favoriController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', authenticateToken, addFavori);

module.exports = router;
