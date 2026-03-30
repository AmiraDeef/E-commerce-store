const express=require('express')
const router=express.Router()
const authMiddleware=require("../Middlewares/authMiddleware")

const{
    addProductController,getAllProductsController,getProductByIdController,deleteProductController,updateProduct
}=require('../controllers/productController')


const {uploadImagePro
}=require("../Middlewares/uploadImageMiddleware")




router.post("/",authMiddleware.authMiddleware,uploadImagePro,addProductController);
router.get("/",getAllProductsController);
router.get("/:id",getProductByIdController);
router.delete("/:id",authMiddleware.authMiddleware,deleteProductController);
router.put("/:id",authMiddleware.authMiddleware,updateProduct);


module.exports=router