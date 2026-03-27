// id
// name
// description
// createdAt
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
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Category = mongoose.model("Category", categorySchema);