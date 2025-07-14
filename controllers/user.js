const User = require("../models/user");

module.exports.Signup= (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.Login= (req, res) => {
  res.render("users/login.ejs");
};

module.exports.PostSignup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUSer = new User({ email, username });
    const registeredUser = await User.register(newUSer, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      // this is for automatically login after the sign-up
      if (err) {
        return next(err); // if there is an error, this will execute or if there is not an error the other code will execute normally
      }
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    });
  } catch (error) {
    console.error("Signup error:", error); // see error in terminal
    req.flash("error", error.message);     // show message in UI
    res.redirect("/signup");
  }
};
module.exports.PostLogin = async (req, res) => {
  //statergy    //failure k case m kaha redirect ho
  req.flash("success", "Welcome to WanderLust");
  res.redirect("/listings");
};

module.exports.Logout= (req, res, next) => {
  req.logout((err) => {
    //Passport k apna checking h logout krne k liye
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out");
    res.redirect("/listings");
  });
};

