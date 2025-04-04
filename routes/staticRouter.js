const express = require('express');
const URL= require('../models/url');

const router = express.Router();

// '/' means the root of the application (home page)
router.get('/', async (req, res) => {
    const allurls = await URL.find({});
    // res.locals.urls = allUrls;
    return res.render("home",{
        urlS: allurls,
    });
});

router.get("/signup" , (req , res) =>{
    return res.render("signup");
});
router.get("/login" , (req , res) =>{
    return res.render("login");
});

module.exports = router;