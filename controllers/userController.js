const User= require("../models/User");
const Product=require("../models/Product")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Order=require("../models/Order")



const getProfileController=async(req,res)=>{
    try {
        const user=await User.findById(req.user).select("-password")
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }   
        const orders=await Order.find({user:req.user}).populate("products.product")
        res.status(200).json({
            orders
        })
    } catch (error) {
        next(error)
    }
}


const updateProfileController=async(req,res)=>{
    try {
        const user=await User.findById(req.user)
        if(!user){                  

            return res.status(404).json({
                message:"User not found"
            })
        } 
        const {firstName,lastName,email,userName,address}=req.body  
        if(firstName) user.firstName=firstName
        if(lastName) user.lastName=lastName
        if(email) user.email=email  
        if(userName) user.userName=userName
        if(address) user.address=address        
        
        await user.save()
        res.status(200).json({
            message:"User profile updated successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}

const getAddressController=async(req,res)=>{
    try {
        const user=await User.findById(req.user)
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        res.status(200).json({
            address:user.address
        })
    } catch (error) {   
        next(error)
    }
}


module.exports={
    getProfileController,
    updateProfileController,
    getAddressController
}


