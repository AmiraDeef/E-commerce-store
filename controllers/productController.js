const Product = require("../models/Product");
const fs = require('fs'); 


const { createProductSchema } = require("./validation/productValidation");
const addProductController = async (req, res, next) => {
    try {
        const user = req.user;

        if (user.role !== "admin") {
            return res.status(403).json({ msg: "Only admin can add products" });
        }

        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: "Please upload image" });
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

        const existProduct = await Product.findOne({ name: value.name });
        if (existProduct) {
            return res.status(400).json({ message: "Product already exists with this name" });
        }

        const newProduct = await Product.create({
            ...value,
            images: req.files.map(file => file.path), createdBy: req.user.id
        
        });

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        next(error);
    }
};

const getAllProductsController = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate("categoryId", "name")
            
        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
};


const getProductByIdController = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("categoryId", "name")

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
};


const updateProduct = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "admin") {
            return res.status(403).json({ msg: "Only admin can update" });
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

        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        const updateData = { ...value };

     
        if (req.files && req.files.length > 0) {
          
            product.images.forEach(img => {
                if (fs.existsSync(img)) fs.unlinkSync(img);
            });
            updateData.images = req.files.map(file => file.path);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({ msg: "Updated Successfully", product: updatedProduct });
    } catch (error) {
        next(error);
    }
};

const deleteProductController = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Only admin can delete" });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
//delete -->study
        product.images.forEach(img => {
            if (fs.existsSync(img)) fs.unlinkSync(img);
        });

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addProductController,
    getProductByIdController,
    getAllProductsController,
    deleteProductController,
    updateProduct
};