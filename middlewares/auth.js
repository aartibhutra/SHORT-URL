const { getUser } = require("../service/auth");
async function restrictToLoggedInUserOnly(res , req , next){
    const userUid = req.cookies.uid;
    
    // if userUid is not present in the cookie then redirect to login page
    if(!userUid){
        return res.redirect("/login");
    }
    const user = getUser(userUid);
    // if user is not present in the hashmap then redirect to login page
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    // if user is present in the hashmap then call the next middleware
    next();
};

module.exports = {
    restrictToLoggedInUserOnly,
};