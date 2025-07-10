const express = require('express');
const router = express.Router({mergeParams:true});//merge params to get the data from the parent query


router.get("/signup",(req,res)=>{
  
    res.render("users/signup.ejs")
})
module.exports=router;