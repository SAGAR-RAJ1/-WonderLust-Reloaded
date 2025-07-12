const express = require("express");
const router = express.Router({ mergeParams: true }); //merge params to get the data from the parent query
const User = require("../models/user");
const passport = require("passport");

const wrapasync = require("../utils/WrapAsync");

const ListingUser = require("../controllers/user");


// we are using router.route as we it is used to structure the code I say, but that's not all it's used For writing routes, whether it is get post delete if they have the same path, we can club them together with a single path. You will be shown below

router.route("/signup")
.get( ListingUser.Signup)
.post(ListingUser.PostSignup); //Middleware for checking users already exist or not


router.route("/login")
.get( ListingUser.Login)
.post(passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapasync(ListingUser.PostLogin)
);

router.route("/logout")
.get(ListingUser.Logout);


//todo old code without router.route
// router.get("/signup", ListingUser.Signup);

// router.get("/login", ListingUser.Login);

// router.post("/signup",ListingUser.PostSignup); //Middleware for checking users already exist or not
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   wrapasync(ListingUser.PostLogin)
// );

// router.get("/logout",ListingUser.Logout) ;

module.exports = router;
