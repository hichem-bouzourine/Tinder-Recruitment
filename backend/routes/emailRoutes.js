const express = require('express');

const { sendMail } = require('../controllers/emailController');

const router = express.Router();

router.post('/send-email', sendMail);

module.exports = router;