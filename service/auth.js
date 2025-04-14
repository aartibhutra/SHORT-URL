const jwt = require('jsonwebtoken');
const secret = "Aarti$143"; // replace with your secret key

// create tokens for the user
function setUser(user){
    return jwt.sign({
        //payload
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}