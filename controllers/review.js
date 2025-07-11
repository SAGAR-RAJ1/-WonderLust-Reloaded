const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.ReviewPost = async function (req, res) {
  let listing = await Listing.findById(req.params.id);
  let newRev = new Review(req.body.review);
  newRev.author = req.user._id;

  listing.reviews.push(newRev);

  await newRev.save();
  await listing.save();

  // req.send("New review save")
  // res.redirect(`/listings/${req.params.id}`)
  res.redirect(`/listings/${listing._id}`);
};

module.exports.ReviewDelete=async(req,res)=>{
        
    let {id,reviewId}=req.params;
 
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review is deleted")
 
    res.redirect(`/listings/${id}`);
 }