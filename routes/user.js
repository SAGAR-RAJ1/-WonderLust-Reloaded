const express = require('express');
const router = express.Router({mergeParams:true});//merge params to get the data from the parent query
const User= require("../models/user")

router.get("/signup",(req,res)=>{
  
    res.render("users/signup.ejs")
})

router.post("/signup",async(req,res)=>{

    try {
        let {username,email,password}=req.body;
        const newUSer = new User({email,username});
        const registeredUser = await User.register(newUSer,password);
        console.log(registeredUser);
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings")
    } catch (error) {
        
     res.send("Account exists go back to signup page")
    }
   
})



module.exports=router;