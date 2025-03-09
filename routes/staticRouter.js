const express = require('express');

const router = express.Router();

// '/' means the root of the application (home page)
router.get('/', async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home",{
        urls: allurls,
    });
});

module.exports = router;