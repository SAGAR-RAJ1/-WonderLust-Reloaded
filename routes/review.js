const express = require('express');
const router = express.Router({mergeParams:true});//merge params to get the data from the parent query
const Listing = require("../models/listing");
const Review = require("../models/review");
const { isLoggedIn, isReviewAuthor } = require('../middleware');


//!reviews
//post route for the reviews
router.post("/",async function (req,res){
    let listing = await Listing.findById(req.params.id);
    let newRev = new Review(req.body.review);
   newRev.author=req.user._id;


    listing.reviews.push(newRev);
   
    await newRev.save();
   await listing.save();
   
   // req.send("New review save")
   // res.redirect(`/listings/${req.params.id}`)
   res.redirect(`/listings/${listing._id}`);
   
   })
   
   //!  Delete Review Route
   router.delete("/:reviewId",isLoggedIn,isReviewAuthor,async(req,res)=>{
        
      let {id,reviewId}=req.params;
   
      await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
      await Review.findByIdAndDelete(reviewId);
   
      res.redirect(`/listings/${id}`);
   })
   
   module.exports=router;