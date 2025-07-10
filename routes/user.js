const express = require('express');
const router = express.Router({mergeParams:true});//merge params to get the data from the parent query


router.get("/signup",(req,res)=>{
    res.send("form")
})
module.exports=router;