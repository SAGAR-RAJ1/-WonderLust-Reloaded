const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
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


// Catch-all route handler (404)
// app.all("*", (req, res, next) => {
// res.send("hy")
// });

//!reviews
//post route for the reviews
app.post("/listings/:id/reviews",async function (req,res){
 let listing = await Listing.findById(req.params.id);
 let newRev = new Review(req.body.review);

 listing.reviews.push(newRev);

 await newRev.save();
await listing.save();

// req.send("New review save")
// res.redirect(`/listings/${req.params.id}`)
res.redirect(`/listings/${listing._id}`);

})

//!  Delete Review Route
app.delete("/listings/:id/reviews/:reviewId",async(req,res)=>{
     
   let {id,reviewId}=req.params;

   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   await Review.findByIdAndDelete(reviewId);

   res.redirect(`/listings/${id}`);
})

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
