const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing.js");//Acquiring model
const Review = require("./models/review.js");//Acquiring model
const methodOverride = require('method-override'); // Update and delete req
const ejsMate = require("ejs-mate");//helps to create template
app.engine('ejs', ejsMate)  //
const session = require("express-session") //May be for cookies

//! Requiring listing from listing .js
const listings = require("./routes/listing.js")
//! Requiring Review from review .js
const reviews = require("./routes/review.js")

// const wrapAsync = require("./utils/WrapAsync.js");
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
//todo Using session
const sessionOptions = {
  secret : "mysupersecretcode", // cookies m kaam aata search krolo (just like privacy pass)
  resave :false,
  saveUninitialized:true,  //ye dono likhna pdta error aaata kiuch chat gpt m dkeh lo
  cookie:{
    expires:Date.now()+7*24*60*60*1000,//after how many time the cokkie will expire
    httpOnly:true,//by default true so we set true no more knowledge about it now generally for security prevent crosssafety attacks
  }
}

app.use(session(sessionOptions));


app.get("/", function (req, res) {
  res.send("Root Route");
});

//! Acquiring the listing routes from routes folder
//! As the code is being restructing with Express router for better readability
app.use("/",listings)

//! Acquiring the review routes from routes folder
//! As the code is being restructing with Express router for better readability
app.use("/listings/:id/reviews", reviews);



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
