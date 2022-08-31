const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("public/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url = '';
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
         url = "./public/image/";
        }else if(file.mimetype == "video/x-flv" || file.mimetype == "video/mp4" || file.mimetype == "iapplication/x-mpegURL" || file.mimetype == "video/3gpp" || file.mimetype == "video/quicktime" || file.mimetype == "video/x-msvideo" || file.mimetype == "video/x-ms-wmv"){
            url ="./public/video/";
        }else{
            url ="./public/others/"
        }
        req.fileurl = url
    cb(null, url);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


app.post("/upload", upload.single("file"), (req, res)=>{
    if(!req.file){
        return  res.json({
            msg: "please select a file"
        })
        
    }
    const absolutePath = req.fileurl.slice(9)
    res.json({
        msg:"File successfully uploaded",
        link: `http://localhost:5000/` + absolutePath + req.file.filename 
    })
});


app.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`);
});