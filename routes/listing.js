const express = require('express');
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");

// middleware for authentication
const {isLoggedIn} = require("../middleware")


//diversify code with backend logic shifted to controllers folder
const ListingController = require("../controllers/listing")

//! Index Route

router.get("/listings",wrapAsync (ListingController.index));
  
  //! New Route
  
  router.get("/listings/new",isLoggedIn,wrapAsync(ListingController.New));
  //! Show Route
  
  router.get("/listings/:id", wrapAsync(ListingController.Show));
  
  //! Create Route
  
  router.post("/listings",isLoggedIn, wrapAsync(ListingController.Create));
  
  //! Edit Route
  
  router.get("/listing/:id/edit",isLoggedIn, wrapAsync(ListingController.Edit));
  
  //! Update Route
  
  router.put("/listings/:id",isLoggedIn,wrapAsync(ListingController.Update));
  
  //! Delete route
  
  router.delete("/listing/:id",isLoggedIn,wrapAsync(ListingController.Delete));

  module.exports = router;
  