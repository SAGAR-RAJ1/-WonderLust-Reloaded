//YE file bna rhe kuki Because there are a lot of middleware or will be in our file so we are making the middleware for authentication in different file

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect("/login")
      }
      next();
}