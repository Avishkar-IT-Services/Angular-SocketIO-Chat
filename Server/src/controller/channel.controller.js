const router = require("express").Router();
const Chat = require("../model/message.model");
// import gfs from socket
const { gfs } = require("../socket")

router.get("/channel-message/:name", async (req, res) => {
    try {
        const channel = await Chat.find({ channelName: req.params.name });
        if (!channel) return res.status(400).send({ err: "Not found the channel" });
        /*
            TODO
            CHECK if any gridfs id is there or not ,if it's there just get the data from gridFS
            and send data  to frontend 
       */

        // console.log(ele.uploadGridId)
        const findGridId = channel.find((ele) => ele.uploadGridId)
        console.log(findGridId)



        return res.status(200).send({ channel: channel })
    } catch (error) {
        console.log('error: ', error);
        return res.status(400).send({ message: error })
    }
})


module.exports = router