// import uuid from 'uuid';
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');

// import { v4 as uuidv4 } from 'uuid';
const{setUser} = require('../service/auth');

async function handleUserSignup(req , res){
    const{ name , email , password } = req.body;
    await User.create({
        name ,
        email ,
        password ,
    });
    // redirect to homepage 
    return res.redirect("/");
};
async function handleUserLogin(req , res){
    const{ email , password } = req.body;
    const user = await User.findOne({email , password});
    if(!user)
        return res.render("login" , {
            error: "Invalid Username or Password",
        });
    // set the session id in the cookie
    const token = setUser(user);

    // by default it creates a cookie with the name "uid"
    // and the value of the token 
    // res.cookie("uid",token);

    return res.json({token});

    // redirect to homepage
    // return res.redirect("/");
};

module.exports = {
    handleUserSignup,
    handleUserLogin,
};