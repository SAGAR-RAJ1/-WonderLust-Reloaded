//todo Here it will get a function as input and run the same function if any error will come it will run next error handler
module.exports=(fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(next);
    
    }
}