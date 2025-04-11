const { getUser } = require("../service/auth");
async function restrictToLoggedInUserOnly(req , res , next){
    const userUid = req.headers["Authorization"];
    
    // if userUid is not present in the cookie then redirect to login page
    if(!userUid){
        return res.redirect("/login");
    }
    const token = userUid.split('Bearer ')[1]; // remove the "Bearer " prefix
    const user = getUser(token);
    // if user is not present in the hashmap then redirect to login page
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    // if user is present in the hashmap then call the next middleware
    next();
};

// not force you should be logged in 
async function checkAuth(req , res, next){
    const userUid = req.cookies?.uid;
    
    
    const user = getUser(userUid);
    // if user is not present in the hashmap then redirect to login page
    req.user = user;
    // if user is present in the hashmap then call the next middleware
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
};