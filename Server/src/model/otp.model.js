const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user-list",
        required: true
    },
    otp: {
        type: Number,
        required: true
    }
})
const OtpSchema = mongoose.model("otp", otpSchema);
module.exports = OtpSchema;