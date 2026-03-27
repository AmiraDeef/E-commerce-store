const joi=require('joi')
const createCategorySchema=joi.object({
    name:joi.string().min(3).max(50).required(),
    description:joi.string().min(10).max(500),
    image:joi.string().uri().optional()
})
module.exports={
    createCategorySchema
}