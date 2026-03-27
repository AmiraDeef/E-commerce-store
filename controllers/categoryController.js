const Category=require('../models/categoryModel')
const User = require("../models/User");
const Product = require("../models/Product");
const createCategorySchema=require("./validation/categoryValidation")

const addCategoryController=async(req,res)=>{
    try {

       const user = req.user;

        if (user.role !== "admin") {
        return res.status(400).json({ msg: "Only admin can add catrgoriess" });
        }

        if (!req.file) return res.status(404).json({ msg: "Pls upload image" });
        const { error, value } = createCategorySchema.validate(req.body, {  
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }   
        const {name,description}=value
        value.image=req.file.path
        const existCategory=await Category.findOne({name})
        if(existCategory){
            return res.status(400).json({"message":"category already exist with this name"})   
        }
        const newCategory=await Category.create({
            name,description,image
        })
        res.status(201).json({
            message:"Category created successfully",
            category:newCategory
        })
    } catch (error) {
        next(error)
    }   
}

const getAllCategoriesController=async(req,res)=>{
    try {
        const categories=await Category.find()
        res.status(200).json({
            categories
        })
    } catch (error) {
        next(error)
    }
}

const getCategoryByIdController=async(req,res)=>{
    try {
        const category=await Category.findById(req.params.id)
        if(!category){
            return res.status(404).json({
                message:"category not found"
            })
        }
        res.status(200).json({
            category
        })
    }   
    catch (error) {
        next(error)
    }       
} 

const updateCategory = async (req, res, next) => {
  try {
      const user = req.user;  
        if (user.role !== "admin") {
        return res.status(400).json({ msg: "only admin can update " });
        } 
         const { error, value } = createCategorySchema.validate(req.body, {  
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        } 
        const updateData = { ...value };
    
    if (req.file) {
      updateData.image = req.file.path; 
    }  
       const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData, 
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ msg: "category not found" });
    res.status(200).json({ msg: "updated Successfully", category });
  } catch (error) {
     next(error); }
}



const deleteCategoryController=async(req,res)=>{
    try {
        const user = req.user;  
        if (user.role !== "admin") {
        return res.status(400).json({ msg: "only admin can delete " });
        }   
        const category=await Category.findByIdAndDelete(req.params.id)
        if(!category){
            return res.status(404).json({   
                message:"category not found"
            })
        } 
        res.status(200).json({ msg: "deleted Successfully" });
    } catch (error) {
        next(error)
    }   
}

module.exports={
addCategoryController,
getAllCategoriesController,
getCategoryByIdController,
updateCategory,
deleteCategoryController

}

     