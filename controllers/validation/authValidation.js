const joi=require('joi')
const registerSchema=joi.object({
    username:joi.string().min(3).max(20),
    firstName:joi.string().min(3).max(30).required(),
    lastName:joi.string().min(3).max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    role:joi.string().valid("user","admin").default("user")

})

const loginSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required()

})

module.exports={
    registerSchema,loginSchema
}