//YE file bna rhe kuki Because there are a lot of middleware or will be in our file so we are making the middleware for authentication in different file
const Review = require("./models/review")


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect("/login")
      }
      next();
}
module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","You are not the author of the review");
      return res.redirect(`/listings/${id}`)
    }
      next(); 
}
