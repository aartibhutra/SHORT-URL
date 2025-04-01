// create hashmap 
// create a hashmap to store user data
const sessionIdToUseMap = new Map();

function setUser(id , user){
    // set the user in the hashmap
    sessionIdToUseMap.set(id , user);
}

function getUser(id){
    // get the user from the hashmap
    return sessionIdToUseMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}