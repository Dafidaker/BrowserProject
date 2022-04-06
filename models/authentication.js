const tokenExpiration = 4*60*60*1000; // 4 hours
// Middleware
module.exports.checkAuthentication = function (req,res,next) {
    console.log(req.signedCookies);
    let usr_id = req.signedCookies.userId;
    if (!usr_id) {
        res.status(401).send({msg: "You are not logged in."});       
    } else {
        // refresh token (not sure if there is a way of changing only the maxAge)
        res.cookie("userId", usr_id, 
            {  maxAge: tokenExpiration,  httpOnly: true, signed:true});
        req.userId = usr_id;
        next();
    }
}

// functions
module.exports.saveUserId = function (res,userId) {    
    res.cookie("userId", userId, {  maxAge: tokenExpiration, httpOnly: true, signed:true });
}

module.exports.logout = function (res) {
    res.clearCookie("userId", {  httpOnly: true, signed:true});
}
