const User= require("../models/User");
const jwt=require("jsonwebtoken");

//handling error
const handleErrors=(err)=>{
    console.log(err.message,err.code);

    let errors={email:"",password:""};

    //duplicate error code
    if(err.code===11000){
        errors.email="that email is already registred";
        return errors;
    }

    //validation error
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
    }

    //incorrect email
    if(err.message==="incorrect email"){
        errors.email="that email is not registered";
    }

    //incorrect password
    if(err.message==="incorrect password"){
        errors.password="that password is incorrect";
    }
    return errors;
}
const maxAge=3*60*60*24; //in second
const createToken=(id)=>{
    return jwt.sign({id},"secret key not to pass to public",{
        expiresIn:maxAge //in second
    })
}
module.exports.signup_get=(req,res)=>{
    res.render("signup")
}
module.exports.login_get=(req,res)=>{
    res.render("login")
}
module.exports.signup_post= async (req,res)=>{
    const {email,password}=req.body;

   try {
    const user=await User.create({email,password});
    const token=createToken(user._id);
    res.cookie("jwt",token,{httpOnly:true,secure:true,maxAge:maxAge*1000});
    res.status(201).json({user:user._id});
   } 
   catch (err) {
    const errors=handleErrors(err);
    res.status(400).json({errors});
   }
}
module.exports.login_post= async (req,res)=>{
    const {email,password}=req.body;

    try {
        const user=await User.login(email,password);
        const token=createToken(user._id);
        res.cookie("jwt",token,{httpOnly:true,secure:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    } 
    catch (err) {
        const errors=handleErrors(err);
        res.status(400).json({errors})
    }
}

module.exports.logout_get= (req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.redirect("/");
}