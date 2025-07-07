const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");//helps to create template
app.engine('ejs', ejsMate)  //

const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError= require("./utils/ExpressError.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'))


//connection with the mongodb server using mongoose
const mongoose = require("mongoose");
const { title } = require("process");

main()
  .then(() => {
    console.log("connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", function (req, res) {
  res.send("Root Route");
});

//! Index Route

app.get("/listings",wrapAsync (async function (req, res) {
  let allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
}));

//! New Route

app.get("/listings/new", function (req, res) {
  res.render("./listings/new.ejs");
});
//! Show Route

app.get("/listings/:id", wrapAsync(async function (req, res) {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
}));

//! Create Route

app.post("/listings", wrapAsync(async function (req, res) {
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

  await newListing.save();

  // res.redirect("./listings")
  res.send("Listing saved successfully!");
}));

//! Edit Route

app.get("/listing/:id/edit", wrapAsync(async function (req, res) {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  res.render("listings/edit.ejs",{listing})

}));

//! Update Route

app.put("/listing/:id",wrapAsync( async function (req, res) {
  let { id } = req.params;
  let {title,description,image,price,location,country} = req.body;
   
  // Listing.findByIdAndUpdate()
  await Listing.findByIdAndUpdate(id, { title, description, image, price, location, country }, { new: true });

  res.redirect(`/listings/${id}`);

}));

//! Delete route

app.delete("/listing/:id",wrapAsync( async function (req, res) {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  // res.redirect(`/listing/{$id}`);  mistake i have made in the syntax
  res.redirect("/listings");
}));

// Catch-all route handler (404)
// app.all("*", (req, res, next) => {
// res.send("hy")
// });


//!Error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

// app.get('/test',async function(req, res) {
//      let sample = new Listing({
//         title : "My Home Town house",
//         description: "Very good house vary vary good house",
//         location:"gaya,bihar",
//         price:40000000,
//         country:"India"
//      })
//     await sample.save();
//     console.log("Data uploadedd");
//     res.send("Sucess")
// });
app.listen(3000);
