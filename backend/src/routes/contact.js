const express = require('express');
const { sendContactEmail } = require('../controllers/contact');

const router = express.Router();

router.post('/', sendContactEmail);

module.exports = router;
