const express = require('express');
const urls = require('../models/url');
const router = express.Router();

// '/' means the root of the application (home page)
router.get('/', async (req, res) => {
    const allurls = await urls.find({});
    res.locals.urls = allUrls;
    return res.render("home",{
        url: allurls,
    });
});

router.get("/signup" , (req , res) =>{
    return res.render("signup");
});

module.exports = router;