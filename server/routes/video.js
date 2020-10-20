const express = require('express');
const router = express.Router();
// const { Video } = require("../models/User");
const multer  = require('multer')

const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"uploads/")
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req,file,cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed') , false)
        }
        cb(null, null)
    }
})

const upload = multer({ storage: storage}).single('file')

//=================================
//             Video
//=================================

router.post('/uploadfiles' , (req,res) => {
    upload(req , res , err => {
        if(err) {
            return res.json({success: false , err})
        }
        return res.json({success:true , url: res.req.file.path , fileName: res.req.file.filename})
    })
})

module.exports = router;
