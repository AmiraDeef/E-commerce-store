// id
// name
// description
// createdAt
const { required } = require("joi");
const mongoose=require("mongoose")


const categorySchema=new mongoose.Schema({  
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

    //I' make img static in front temporary 
    image:{
        type:String,
        required:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Category = mongoose.model("Category", categorySchema);
module.exports = Category