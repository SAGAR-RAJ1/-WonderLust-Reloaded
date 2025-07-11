const express = require('express');
const router = express.Router({mergeParams:true});//merge params to get the data from the parent query
const Listing = require("../models/listing");
const Review = require("../models/review");
const { isLoggedIn, isReviewAuthor } = require('../middleware');
const WrapAsync = require('../utils/WrapAsync');

const ListingReview = require("../controllers/review")
//!reviews
//post route for the reviews
router.post("/",isLoggedIn,WrapAsync(ListingReview.ReviewPost))
   
   //!  Delete Review Route
   router.delete("/:reviewId",isLoggedIn,isReviewAuthor,WrapAsync(ListingReview.ReviewDelete))
   
   module.exports=router;