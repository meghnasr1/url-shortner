const express = require('express');

const router = express.Router();
const { handlegenerateShortUrl } = require('../controllers/url');

router.post('/', handlegenerateShortUrl);

module.exports = router;