const { getUser } = require("../service/auth");

// normal middleware : 
// this is an Authentication middleware
function checkForAuthentication(req , res , next){
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if(!tokenCookie){
        return next();
    }
    const token =tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

// role is basically like admin etc 
// give a roles to an array of roles
// this is an Authorization middleware
function restrictTo(roles = []){
    return function (req , res , next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) res.end("UnAuthorized");

        // if both conditions are false then we can go to next middleware
        return next();
    };
}

module.exports = {
    checkForAuthentication,
    restrictTo,
};