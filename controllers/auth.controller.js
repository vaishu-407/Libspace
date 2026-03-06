
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model");

exports.register = async(req,res)=>{
 try{

 const {name,email,password} = req.body;

 const user = await User.findOne({email});

 if(user){
  return res.send({msg:"User exists"});
 }

 const hash = await bcrypt.hash(password,5);

 const newUser = new User({
  name,
  email,
  password:hash
 });

 await newUser.save();

 res.send({msg:"Registration successful"});

 }catch(err){
  res.send(err);
 }
};

exports.login = async(req,res)=>{
 try{

 const {email,password} = req.body;

 const user = await User.findOne({email});

 if(!user){
  return res.send({msg:"User not found"});
 }

 const match = await bcrypt.compare(password,user.password);

 if(match){

  const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);

  res.send({msg:"Login success",token});

 }else{

  res.send({msg:"Wrong password"});

 }

 }catch(err){
  res.send(err);
 }
};

exports.logout = async(req,res)=>{

 const token = req.headers.authorization?.split(" ")[1];

 await Blacklist.create({token});

 res.send({msg:"Logout successful"});

};

exports.deleteUser = async(req,res)=>{

 await User.findByIdAndDelete(req.userId);

 res.send({msg:"User deleted"});

};
