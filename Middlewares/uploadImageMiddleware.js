const multer=require('multer')
const path =require('path')


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        const uniqueName=Date.now()+"-"+Math.round(Math.random()*1000)
        cb(null,uniqueName+path.extname(file.originalname))
    },

})
const upload=multer({storage})
const uploadImageCat=upload.single("image")
const uploadImagePro=upload.array("image",5)

module.exports={
uploadImageCat,
uploadImagePro

}
