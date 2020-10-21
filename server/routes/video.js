const express = require('express');
const Ffmpeg = require('fluent-ffmpeg');
const router = express.Router();
const multer  = require('multer')
const { auth } = require("../middleware/auth");
const {Video} = require('../models/Video')

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

router.post('/thumbnail' , (req,res) => {
    // 썸네일 생성 하고 비디오 러닝타임도 가져오기

    let filePath = ""
    let fileDuration = ""

    // 비디오 정보 가져오기
    Ffmpeg.ffprobe(req.body.url , (err , metadata) => {
        console.dir(metadata)
        console.log(metadata.format.duration)
        fileDuration = metadata.format.duration
    })

    // 썸네일 생성
    Ffmpeg(req.body.url)
    .on('filenames' , (filenames) => {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)
        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on("end" , () => {
        console.log('Screenshots taken')
        return res.json({ success: true , url: filePath , fileDuration: fileDuration})
    })
    .on('error' , (err) => {
        console.error(err)
        return res.json({success: false , err})
    })
    .screenshot({
        count:3,
        folder: 'uploads/thumbnails',
        size:'320x240',
        filename: 'thumbnail-%b.png'
    })
})

router.post('/uploadVideo' , (req,res) => {
    const video = new Video(req.body)

    video.save((err , doc) => {
        if(err) return res.json({success:false , err})
        res.status(200).json({success:true})
    })
})

router.get('/getVideos' , (req,res) => {
    Video.find().populate('writer').exec((err,videos) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true , videos})
    })
})



module.exports = router;
