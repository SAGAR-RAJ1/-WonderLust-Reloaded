const express = require('express');
const router = express.Router({mergeParams:true});//merge params to get the data from the parent query
const User= require("../models/user");
const passport = require('passport');

router.get("/signup",(req,res)=>{
  
    res.render("users/signup.ejs")
})
router.get("/login",(req,res)=>{
  
    res.render("users/login.ejs")
})

router.post("/signup",async(req,res)=>{

    try {
        let {username,email,password}=req.body;
        const newUSer = new User({email,username});
        const registeredUser = await User.register(newUSer,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{// this is for automatically login after the sign-up
            if(err){
                return next(err);// if there is an error, this will execute or if there is not an error the other code will execute normally
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings")
        })
     
    } catch (error) {
        
     res.send("Account exists go back to signup page")
    }
   
})                   //Middleware for checking users already exist or not
router.post("/login",passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}) ,async(req,res)=>{
                                           //statergy    //failure k case m kaha redirect ho
    req.flash("success","Welcome to WanderLust");  
    res.redirect("/listings")

})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{//Passport k apna checking h logout krne k liye
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings")
    })
})

module.exports=router;