const { nanoid } = require("nanoid");
const urls = require('../models/url');

async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error :'url is required'});

    const shortID = nanoid(8);
    await urls.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
    });

    // I don't want to send the json file here, I want to send the  url 
    return res.render('home',{
        id : shortID,
    });
    // return res.json({ id : shortID});
};

async function handleGetAnalytics(req , res) {
    const shortId = req.params.shortId;
    const result =await urls.findOne({ shortId });
    return res.json({ 
        totalClicks : result.visitHistory.length , 
        analytics: result.visitHistory, })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};