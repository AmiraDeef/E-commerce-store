
const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({       
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    description:{
        type:String,    
        trim:true,
    },
    price:{ 
        type:Number,
        required:true,
        min:2
    },
    images: {
        type: [String],
    },
    sizes: {
        type: [String],
    },
    colors: {
        type: [String],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
        
    },createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Product = mongoose.model("Product", productSchema);

module.exports = Product;