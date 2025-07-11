const express = require('express');
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");

// middleware for authentication
const {isLoggedIn} = require("../middleware")

//! Index Route

router.get("/listings",wrapAsync (async function (req, res) {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  }));
  
  //! New Route
  
  router.get("/listings/new",isLoggedIn, function (req, res) {

      res.render("./listings/new.ejs");

 
      
  });
  //! Show Route
  
  router.get("/listings/:id", wrapAsync(async function (req, res) {
    let { id } = req.params;                 //populate add kiye kuki  object k id k sath sath uska data v is m aaye  islye add kiye
    // const listing = await Listing.findById(id).populate("reviews").populate("owner");
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    res.render("./listings/show.ejs", { listing });
  }));
  
  //! Create Route
  
  router.post("/listings",isLoggedIn, wrapAsync(async function (req, res) {
    let {title,description,image,price,location,country} = req.body;
    console.log("Received body:", req.body);
  
    if (!title || !description || !price || !location || !country) {
      throw new ExpressError("All fields are required", 400);
    }
    if (isNaN(price)) {
      throw new ExpressError("Price must be a number", 400);
    }
  
    // console.log("Price after conversion:", price);
    const newListing = new Listing({
      title:title,
      description:description,
      image,//Dono method shi h naam same h toh direct v likh skhte ho
      price,
      location,
      country,
    });
    newListing.owner = req.user._id;//Username alag se dalna pdega
  
    await newListing.save();
  //todo using flash
  req.flash("success","New Listing Created!")
    res.redirect("/listings")
    // res.send("Listing saved successfully!");
  }));
  
  //! Edit Route
  
  router.get("/listing/:id/edit",isLoggedIn, wrapAsync(async function (req, res) {
    let { id } = req.params;
    const listing = await Listing.findById(id);
  
    res.render("listings/edit.ejs",{listing})
  
  }));
  
  //! Update Route
  
  router.put("/listings/:id",isLoggedIn,wrapAsync( async function (req, res) {
    let { id } = req.params;
    let {title,description,image,price,location,country} = req.body;
     
    // Listing.findByIdAndUpdate()
    await Listing.findByIdAndUpdate(id, { title, description, image, price, location, country }, { new: true });
  
    res.redirect(`/listings/${id}`);
  
  }));
  
  //! Delete route
  
  router.delete("/listing/:id",isLoggedIn,wrapAsync( async function (req, res) {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    // res.redirect(`/listing/{$id}`);  mistake i have made in the syntax
    res.redirect("/listings");
  }));

  module.exports = router;
  