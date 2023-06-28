const router = require("express").Router();
const upload = require("../middleware/uploadImage.middleware");
const path = require("path");
const fs = require("fs")
const Chat = require("../model/message.model");

router.post("/upload-image", upload.single("file"), async (req, res) => {
    // readFileSync means to read the synchronously and block other parallel activity
    let image = fs.readFileSync(req.file.path);
    // Base64 is used to encode binary data as printable text.
    let encodeImage = image.toString('base64');

    const finalImage = {
        contentType: req.file.mimetype,
        data: Buffer.from(encodeImage, 'base64')
    }

    const saveChat = await Chat.create(
        { name: "chandan", message: "hello", channel: "Random", img: finalImage }
    )

    saveChat.save()


    return res.send({ saveChat });
})

// router.get('/photos', async (req, res) => {
//     await Chat.find({}).fetch((err, result) => {
//         // const imgArray = result.map(element => element._id);
//         // console.log(imgArray);
//         // if (err) return console.log(err)
//         // res.send(imgArray)
//         console.log(result)
//     })
// });


module.exports = router