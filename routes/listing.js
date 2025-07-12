const express = require('express');
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");




const multer  = require('multer')//package for multiport
// const upload = multer({ dest: 'uploads/' })//kaha p file store hoga
const { storage } = require('../cloudConfig');
const upload = multer({ storage})//kaha p file store hoga

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
  
  router.post("/listings",isLoggedIn,upload.single('image'), wrapAsync(ListingController.Create));
  // router.post("/listings",isLoggedIn,upload.single('image'), (req,res)=>{
  //   console.log(req.file);
  //   res.send(req.file)
  // });
  
  //! Edit Route
  
  router.get("/listing/:id/edit",isLoggedIn, wrapAsync(ListingController.Edit));
  
  //! Update Route
  
  router.put("/listings/:id",isLoggedIn,upload.single('image[url]'),wrapAsync(ListingController.Update));
  
  //! Delete route
  
  router.delete("/listing/:id",isLoggedIn,wrapAsync(ListingController.Delete));

  module.exports = router;
  