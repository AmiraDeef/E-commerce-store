const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category"); 
const {createProductSchema} = require("./validation/productValidation");


const addProductController = async (req, res) => {
    try {
        const user = req.user;

        if (user.role !== "admin") {
            return res.status(400).json({ msg: "Only admin can add products" });
        }
        if (!req.file) return res.status(404).json({ msg: "Please Upload Image" });
        const { error, value } = createProductSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });


    }
    catch(error){

    }
}

const getAllProductsController=async(req,res)=>{
    try {
        const products=await Product.find()
        res.status(200).json({
           products
        })
    } catch (error) {
        next(error)
    }
}

const getProductByIdController=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            product
        })
    }   
    catch (error) {
        next(error)
    }       
} 


const updateProduct = async (req, res, next) => {
  try {
      const user = req.user;  
        if (user.role !== "admin") {
        return res.status(400).json({ msg: "only admin can update " });
        } 
         const { error, value } = createProductSchema.validate(req.body, {  
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
       const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData, 
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ msg: "product not found" });
    res.status(200).json({ msg: "updated Successfully", product });
  } catch (error) {
     next(error); }
}



const deleteProductController=async(req,res)=>{
    try {
        const user = req.user;  
        if (user.role !== "admin") {
        return res.status(400).json({ msg: "only admin can delete " });
        }   
        const product=await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({   
                message:"product not found"
            })
        } 
        res.status(200).json({ msg: "deleted Successfully" });
    } catch (error) {
        next(error)
    }   
}




module.exports={
addProductController,
getProductByIdController,
getAllProductsController,
deleteProductController,
updateProduct

}