import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
})

export const fileUpload = multer({storage:storage}).single("file");

export const upload = (req, res) =>{
    fileUpload(req,res, (err) =>{
        const file = req.file
        if(err) return res.status(500).json(err)
        if(!file) return res.status(400).json("no file was uploaded")
        res.status(200).json(file.filename)
    })
}