const router = require("express").Router();
const OtpSchema = require("../model/otp.model");
const { checkOtpLength, result } = require("../utils/validation.utils");
const User = require("../model/user.model");
router.post("/verify-email",
    checkOtpLength("otp"),
    async (req, res) => {
        let { email, otp } = req.body;
        try {
            if (!result(req).isEmpty()) {
                return res.status(400).send({
                    success: false,
                    errors: result(req).array()
                });
            }
            else {
                const populateUser = await OtpSchema.find({}).populate('userId').exec();
                let isUser = populateUser.find(({ userId }) => userId?.email === email);
                if (isUser.otp == otp) {
                    const findUser = await User.findOneAndUpdate({ email }, { isVerify: true }, { new: true });
                    return res.status(200).send({ verifyUser: findUser?.isVerify })
                } else {
                    return res.status(200).send({ verifyUser: false })
                }
            }

        } catch (error) {
            return res.status(400).send({ error })
        }
    })
module.exports = router