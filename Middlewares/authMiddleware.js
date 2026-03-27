const jwt =require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                message:"unauthorized"
            })
        } 
        token=authHeader.split(" ")[1]
        const payload=jwt.verify(token,process.env.JWT_SK)
        req.user=payload
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}
module.exports={
    authMiddleware
}
