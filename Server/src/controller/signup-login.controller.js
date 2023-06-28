const router = require("express").Router();
const { checkValidEmail, result, checkValidPassword } = require("../utils/validation.utils");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const OtpSchema = require("../model/otp.model");
const generateOtp = require("../utils/otpMail.util");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRETKEY)
}

router.post("/create-account",
    checkValidEmail("email"),
    checkValidPassword("password").withMessage("Password must be 6 digit minimum and max 8"),
    async (req, res) => {
        let user;
        try {
            if (!result(req).isEmpty()) {
                return res.status(400).send({
                    success: false,
                    errors: result(req).array()
                });
            } else {
                user = await User.findOne({ email: req.body.email }).lean().exec();
                if (user) return res.status(400).send({ message: "User is already registered" });
                user = await User.create(req.body);
                let token = generateToken(user);
                const { email, otp } = await generateOtp(user);
                if (email.accepted.length === 1) {

                    // lets find the user id ,if its there just update the documents else create new documents
                    const findUser = await OtpSchema.findOne({ userId: user.id }).lean().exec();

                    if (findUser) {
                        let res = await OtpSchema.findOneAndUpdate({ userId: user.id }, { otp: otp }, { new: true })
                        return res.status(200).send({ message: "Successfully created account , please verify account", user: { name: user.name, email: user.email }, token });
                    } else {
                        await OtpSchema.create({
                            userId: user.id,
                            otp: otp
                        })
                        return res.status(200).send({ message: "Successfully created account , please verify account", user: { name: user.name, email: user.email }, token });
                    }
                } else {
                    return res.status(400).send({ error: "There is an error with otp handler" })
                }
            }
        } catch (error) {
            return res.status(400).send({ error })
        }

    })

router.post("/login-account",
    checkValidEmail("email"),
    async (req, res) => {
        let user;
        try {
            if (!result(req).isEmpty()) {
                return res.status(400).send({
                    success: false,
                    errors: result(req).array()
                })
            }
            else {
                user = await User.findOne({ email: req.body.email });
                if (!user) return res.status(400).send({ message: "The email and password is not matching" });
                let matchPassword = user.checkPassword(req.body.password);
                if (!matchPassword) return res.status(400).send({ message: "The email and password is not matching" });
                let token = generateToken(user);
                return res.status(200).send({ message: "Successfully authenticated ", user: { name: user.name, email: user.email }, token });
            }
        } catch (error) {
            return res.status(400).send({ error })
        }
    })


module.exports = router