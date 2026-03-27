const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true, 
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    trim: true,
  },
  image:{
    type:String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
},{timestamps:true});

const User=mongoose.model('User',userSchema)

module.exports=User
