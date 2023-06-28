const mongoose = require("mongoose");
const { hashSync, compareSync } = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isVerify: Boolean
}, {
    versionKey: false,
    timestamps: false
});

userSchema.pre("save", function (next) {
    try {
        if (!this.isModified("password")) next()
        const hash = hashSync(this.password, 10);
        this.password = hash
        next()
    } catch (error) {
        console.log(error)
    }
})
userSchema.methods.checkPassword = function (password) {
    return compareSync(password, this.password)
}
const User = mongoose.model("user-list", userSchema);
module.exports = User