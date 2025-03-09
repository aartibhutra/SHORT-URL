const express = require('express');

const router = express.Router();

// '/' means the root of the application (home page)
router.get('/', (req, res) => {
    return res.render("home");
});

module.exports = router;