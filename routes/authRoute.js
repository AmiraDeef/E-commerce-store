const express=require('express')
const router=express.Router()
const authMiddleware=require("../Middlewares/authMiddleware")
const{
    registerController,loginController,logoutController
}=require('../controllers/authController')


router.post("/register",registerController);
router.post("/login",loginController);
router.get("/logout",authMiddleware.authMiddleware,logoutController);


module.exports=router