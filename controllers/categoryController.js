const Category=require('../models/Category')
const User = require("../models/User");
const Product = require("../models/Product");
const { createCategorySchema }=require("./validation/categoryValidation")

const addCategoryController=async(req,res,next)=>{
    try {
       console.log(req.user)
       const user = req.user;
       console.log(user)

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
            name,description,image:req.file.path,createdBy: req.user.id
        })
        res.status(201).json({
            message:"Category created successfully",
            category:newCategory
        })
    } catch (error) {
        next(error)
    }   
}

const getAllCategoriesController=async(req,res,next)=>{
    try {
        const categories=await Category.find()
        res.status(200).json({
            categories
        })
    } catch (error) {
        next(error)
    }
}
const getCategoryByNameController = async (req, res, next) => {
    try {
        const { name } = req.params;

  
        const category = await Category.findOne({ name: name });
        console.log(category)
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

      
        const products = await Product.find({ categoryId: category._id });

        
        res.status(200).json({
            category: {
                ...category._doc,
                products: products 
            }
        });
    } catch (error) {
        next(error);
    }
};

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
      { returnDocument: 'after',  runValidators: true }
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
getCategoryByNameController,
updateCategory,
deleteCategoryController

}

     