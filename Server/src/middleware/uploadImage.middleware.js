const multer = require("multer");
const mongoose = require("mongoose")
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const util = require("util");
const connection = mongoose.connection;
const path = require("path")
// let gfs;

// conn.once('open', () => {
//     gfs = Grid(conn, mongoose.mongo);
//     gfs.collection('uploads');
// });


// const storage = new GridFsStorage({
//     url: process.env.DATABASE,
//     // options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         // if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//         //     return {
//         //         bucketName: "photos",
//         //         filename: `${Date.now()}_${file.originalname}`,
//         //     }
//         // } else {
//         //     //Otherwise save to default bucket
//         //     return `${Date.now()}_${file.originalname}`
//         // }

//         // return new Promise((resolve, reject) => {
//         //     const filename = file.originalname;
//         //     const fileInfo = {
//         //         filename: filename,
//         //         bucketName: 'uploads'
//         //     };
//         //     resolve(fileInfo);
//         // });

//         // const match = ["image/png", "image/jpeg"];


//        /*

//         bucketName indicates that the file will be stored at photos.chunks and photos.files collections.


//        */
//         return {
//             bucketName: 'uploads', 
//             // Makesure duplicate should not stored 
//             filename: `${Date.now()}-avishkar-${file.originalname }`
//         };
//     }
// })




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../my-uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// let gfs;
// connection.once('open', () => {
//   gfs = Grid(connection.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: 'mongodb://localhost:27017/test',
//   file: (req, file) => {
//     return {
//       filename: file.originalname
//     };
//   }
// });
// // const upload = multer({ storage: storage });

// single() function with the parameter is the name of input tag (in html view:
// <input type="file" name="file">) will store the single file in req.file.
let uploadFiles = multer({ storage })
//use multer module to initialize middleware and util.promisify() to make the exported middleware object can be used with async-await.
// let uploadFileMiddleware = util.promisify(uploadFiles);


module.exports = uploadFiles