const mail = require("nodemailer");
const transport = mail.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "abhiskarit@gmail.com",
        pass: "koamwcomowmucafq"
    },
    secure: true
})
const generateOtp = async (user) => {
    let otp = Math.floor(1000 + Math.random() * 9000);
    const mailData = {
        from: "abhiskarit@gmail.com",
        to: user.email,
        subject: "Verify your account with OTP",
        text: `Hi ${user.name} please Verify your account`,
        html: `<h2>Hi ${user.name} Your otp is ${otp}<h2>`
    };
    const result = await transport.sendMail(mailData);
    return { email: result, otp };
}
module.exports = generateOtp