const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category"); 
const createProductSchema = require("./validation/productValidation");


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