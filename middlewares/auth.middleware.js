
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model");

const auth = async(req,res,next)=>{

const token = req.headers.authorization?.split(" ")[1];

if(!token){
 return res.status(401).send({msg:"No token"});
}

const black = await Blacklist.findOne({token});

if(black){
 return res.status(401).send({msg:"Token logged out"});
}

try{
 const decoded = jwt.verify(token,process.env.JWT_SECRET);
 req.userId = decoded.userId;
 next();
}catch(err){
 res.status(401).send({msg:"Invalid token"});
}

};

module.exports = auth;
