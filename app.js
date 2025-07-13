if(process.env.NODE_ENV!="production"){
  require("dotenv").config()
}

const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing.js");//Acquiring model
const Review = require("./models/review.js");//Acquiring model
const methodOverride = require('method-override'); // Update and delete req
const ejsMate = require("ejs-mate");//helps to create template
app.engine('ejs', ejsMate)  //


//todo Acquiring things for authentication for using passport 
const passport = require("passport");
const localStratergy = require("passport-local")
const User = require("./models/user.js")


const session = require("express-session") //May be for cookies

const flash = require("connect-flash");

//! Requiring listing from listing .js
const listingsRouter = require("./routes/listing.js")
//! Requiring Review from review .js
const reviewsRouter = require("./routes/review.js")
//! Requiring User from user.js
const userRouter = require("./routes/user.js")


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

// app.get("/", function (req, res) {
//   res.send("Root Route");
// });


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
//todo USing flash (routes se phle likhayega kuki route k use krk use hota)


app.use(flash());//Aage listing.js create m milega

//todo session k baad hi aayega passport k middleware kuki session k jarurat hota login la(passport session ko use krta hai)
app.use(passport.initialize());//har request k liye passport initialize ho jayega
app.use(passport.session());//taki passport ko pta kko konsa session k part h baar baar logon n krna pdde session tk
//ye do middleware passport use krne k liye hmesha use krte
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser())
 passport.deserializeUser(User.deserializeUser())

//todo listing se phle flash k liye middleware likhenge
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;//initialize or session k baad use kr skhte phle wo log aayega passport k
  next();//next k call krna importannt warna isi middle ware m stuck hoke reh jaoge
})




//! Acquiring the listing routes from routes folder
//! As the code is being restructing with Express router for better readability
app.use("/",listingsRouter)

//! Acquiring the review routes from routes folder
//! As the code is being restructing with Express router for better readability
app.use("/listings/:id/reviews", reviewsRouter);

//! Acquiring the signup routes from routes folder
app.use("/", userRouter);



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
