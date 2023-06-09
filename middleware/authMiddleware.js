const jwt=require("jsonwebtoken");
const User= require("../models/User");

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;

    //check json web token exists & is verified
    if(token){
        jwt.verify(token,"secret key not to pass to public",(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect("/login");
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect("/login");
    }
}

//check current user
const checkUser= async (req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,"secret key not to pass to public",async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;   //create a global variable that we can access in the view
                next();
            }
            else{
                console.log(decodedToken);
                let user= await User.findById(decodedToken.id);
                res.locals.user=user;
                next();
            }
        })
    }
    else{
        res.locals.user=null;   //create a global variable that we can access in the view
        next();
    }
}

module.exports={requireAuth,checkUser};