const mongoose = require("mongoose");
const connectDb = () => mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err + "error while connecting database"))
module.exports = { connectDb }