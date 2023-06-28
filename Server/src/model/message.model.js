const mongoose = require("mongoose");
const uploadSchema = new mongoose.Schema({
    url: String,
    type: String,
    name: String
})
const chatSchema = new mongoose.Schema({
    name: String,
    messageText: String,
    channelName: String,
    uploadGridId: mongoose.Schema.Types.ObjectId,
    sentDate: String
}, {
    versionKey: false,
    timestamps: true
});
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat