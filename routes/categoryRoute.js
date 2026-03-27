const express=require('express')
const router=express.Router()
const authMiddleware=require("../Middlewares/authMiddleware")
const{
    addCategoryController,updateCategory,deleteCategoryController,getAllCategoriesController,getCategoryByIdController
}=require('../controllers/categoryController')


router.post("/",authMiddleware.authMiddleware,addCategoryController);
router.get("/",getAllCategoriesController);
router.get("/:id",getCategoryByIdController);
router.delete("/:id",authMiddleware.authMiddleware,deleteCategoryController);
router.put("/:id",authMiddleware.authMiddleware,updateCategory);




module.exports=router