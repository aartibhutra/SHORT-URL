const express = require('express');
// import :
const {handleGenerateNewShortURL} = require('../controllers/url');
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

module.exports = router;