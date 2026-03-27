const User = require("../models/User");
const bcrypt = require("bcrypt");
const { registerSchema, loginSchema } = require("./validation/authValidation");

const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const { username, email, password, role } = value;
    const existUser=await User.findOne({email})
    if(existUser){
        return res.status(400).json({
            message:"User already exist with this email"
        })
    }
    const hashPassword=await bcrypt.hash(password,10)
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      role,
    });
    const token = jwt.sign(
  { id: newUser._id, role: newUser.role },
  process.env.JWT_SK,
  { expiresIn: "1d" }
);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      token
    });

  } catch (error) {
    console.log(error);
  }
};


const loginController= async (req,res)=> {

    try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        msg: error.details.map((err) => err.message),
      });
    }
    const { email, password } = value;
    const existUser=await User.findOne({email})
    if(!existUser){
        return res.status(400).json({
            message:"Invalid email or password"
        })
      }
      const matchPassword = await bcrypt.compare(password, existUser.password);
       if (!matchPassword)
      return res.status(400).json({ msg: "Invalid Password" });

      const token =jwt.sign({
        id:existUser._id,
        role:existUser.role

       },
      process.env.JWT_SK,
      {expiresIn:"1d"})

      res.status(200).json({
        message:"Login successful",
        token
      })
        
    } catch (error) {
        next(error)
    }
    
}

const logoutController= async (req,res)=> {

    try {
      const user=req.user
      if(!user){
        return res.status(400).json({
            message:"Invalid user"
        })
      }
      res.status(200).json({
        message:"Logout successful",
      })
        
    } catch (error) {
        next(error)
        
    }
    
}



module.exports={
    registerController,
    loginController,
    logoutController
}