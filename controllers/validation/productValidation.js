const joi=require('joi')

const createProductSchema=joi.object({  
    name:joi.string().min(3).max(50).required(),
    description: joi.string().min(10),
    price:joi.number().positive().required() ,

    //search for the future use of the product
    images:joi.array().items(joi.string()).single(),
    sizes:joi.array().items(joi.string()).single(),
    colors:joi.array().items(joi.string()).single(),

    stock:joi.number().min(0).positive().required(),

    //after auth i will remove comment to prevent error
    categoryId:joi.string().hex().length(24).required(),
    createdBy: joi.string().hex().length(24)
})
module.exports={
    createProductSchema
}   