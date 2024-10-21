const express = require('express');

const { sendMail, sendCalendarScheduleMail } = require('../controllers/emailController');

const router = express.Router();

router.post('/send-email', sendMail);
router.post('/send-schedule-email', sendCalendarScheduleMail);

module.exports = router;