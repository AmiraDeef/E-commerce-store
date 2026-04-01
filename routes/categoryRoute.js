const express=require('express')
const router=express.Router()
const authMiddleware=require("../Middlewares/authMiddleware")
const{
    addCategoryController,updateCategory,
    deleteCategoryController,getAllCategoriesController,
    getCategoryByNameController}=require('../controllers/categoryController')



const {uploadImageCat}=require("../Middlewares/uploadImageMiddleware")

router.post("/",authMiddleware.authMiddleware,uploadImageCat,addCategoryController);
router.get("/",getAllCategoriesController);
router.get("/:name",getCategoryByNameController);
router.delete("/:id",authMiddleware.authMiddleware,deleteCategoryController);
router.put("/:id",authMiddleware.authMiddleware,updateCategory);




module.exports=router