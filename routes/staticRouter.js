const express = require('express');
const {restrictTo} = require('../middlewares/auth');
const URL= require('../models/url');

const router = express.Router();

router.get("/admin/urls" , restrictTo(["ADMIN"]),async (req, res) => {
    const allurls = await URL.find({});
   // res.locals.urls = allUrls;
   return res.render("home",{
       urlS: allurls,
   });
});

// '/' means the root of the application (home page)
// use the inline middleware
router.get('/', restrictTo(["NORMAL" , "ADMIN"]), async (req, res) => {
     const allurls = await URL.find({ createdBy: req.user._id });
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