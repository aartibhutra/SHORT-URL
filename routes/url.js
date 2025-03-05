const express = require('express');
// import :
const {handleGenerateNewShortURL,handleGetAnalytics} = require('../controllers/url');
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = router;