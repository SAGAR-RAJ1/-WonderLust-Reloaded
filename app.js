if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//todo--------> Step 1 : acquiring things and then connect to Mongo DB

const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing.js"); //Acquiring model
const Review = require("./models/review.js"); //Acquiring model
const methodOverride = require("method-override"); // Update and delete req
const ejsMate = require("ejs-mate"); //helps to create template eg agar nav bar sb m dikhana h toh boilerplate bnanae. m kaam aata hai
app.engine("ejs", ejsMate); //

//! Acquiring things for authentication for using passport
const passport = require("passport");
const localStratergy = require("passport-local");
const User = require("./models/user.js");

const session = require("express-session"); //May be for cookies. it is for making sttps which i stateless make it statefull

const MongoStore = require("connect-mongo"); //used after aquiring session used to store session on the server not on local used for production

const flash = require("connect-flash");

//! Requiring listing from listing .js
const listingsRouter = require("./routes/listing.js");
//! Requiring Review from review .js
const reviewsRouter = require("./routes/review.js");
//! Requiring User from user.js
const userRouter = require("./routes/user.js");

// const wrapAsync = require("./utils/WrapAsync.js");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

app.set("view engine", "ejs"); // Use: Tells Express to use EJS as the template engine so you can render .ejs files using:
app.use(express.json()); //Use: Parses incoming JSON data from the request body and stores it in req.body.
app.use(express.urlencoded({ extended: true })); //Use: Parses data sent from HTML forms and stores it in req.body.
//If data comes from:
// HTML <form> → express.urlencoded()
// API / React / Postman / fetch() → express.json()

app.use(express.static(path.join(__dirname, "public"))); //Use: Makes all files inside the public folder (CSS, JavaScript, images, fonts, etc.) accessible to the browser.
app.set("views", path.join(__dirname, "views")); //Use: Tells Express that all EJS template files are inside the views folder.
app.use(methodOverride("_method")); //Use: Allows HTML forms to send PUT and DELETE requests, even though forms normally support only GET and POST.

//!connection with the mongodb server using mongoose
//todo -----------> Connected to Mongo DB step 2 : create Listing

const mongoose = require("mongoose");
const { title } = require("process");
const LUrl = "mongodb://127.0.0.1:27017/wanderlust";
const DBUrl = process.env.MONGODB_ATLAS;
main()
  .then(() => {
    console.log("connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DBUrl);
}

//todo -----> This route is added Not exactly it will be edited later and all the routes will be
//todo transferred to diff folder routes. STEP 6 :Created views folder to store views of diff model
app.get("/", function (req, res) {
  res.redirect("/listings");
});

const secret = process.env.SECRET;

const store = new MongoStore({
  mongoUrl: DBUrl,
  crypto: {
    secret: secret,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in mongo session store", err);
});

//todo Using session
const sessionOptions = {
  store: store,
  secret: secret, // cookies m kaam aata search krolo (just like privacy pass)
  resave: false,
  saveUninitialized: true, //ye dono likhna pdta error aaata kiuch chat gpt m dkeh lo
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //after how many time the cokkie will expire
    httpOnly: true, //by default true so we set true no more knowledge about it now generally for security prevent crosssafety attacks
  },
};

app.use(session(sessionOptions));
//todo USing flash (routes se phle likhayega kuki route k use krk use hota)

app.use(flash()); //Aage listing.js create m milega

//todo session k baad hi aayega passport k middleware kuki session k jarurat hota login la(passport session ko use krta hai)
app.use(passport.initialize()); //har request k liye passport initialize ho jayega
app.use(passport.session()); //taki passport ko pta kko konsa session k part h baar baar logon n krna pdde session tk
//ye do middleware passport use krne k liye hmesha use krte
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//todo listing se phle flash k liye middleware likhenge
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; //initialize or session k baad use kr skhte phle wo log aayega passport k
  next(); //next k call krna importannt warna isi middle ware m stuck hoke reh jaoge
});

//! Acquiring the listing routes from routes folder
//! As the code is being restructing with Express router for better readability
app.use("/", listingsRouter);

//! Acquiring the review routes from routes folder
//! As the code is being restructing with Express router for better readability
app.use("/listings/:id/reviews", reviewsRouter);

//! Acquiring the signup routes from routes folder
app.use("/", userRouter);

// Catch-all route handler (404)
// app.all("*", (req, res, next) => {
// res.send("hy")
// });

//!Error handling middleware  i.e may be usk liye agar save krte samai ya waisa kuch DB se error aaye direct
app.use((err, req, res, next) => {
  // equal to k baad jo likhe hai wo act as default value krega aagr kuch nhi aaya toh wo run krega
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
