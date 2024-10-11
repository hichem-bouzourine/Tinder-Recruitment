
const express = require('express');
const { addFavori } = require('../controllers/favoriController');

const router = express.Router();

router.post('/add', addFavori);

module.exports = router;
