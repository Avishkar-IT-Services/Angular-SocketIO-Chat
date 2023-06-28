const { connectDb } = require("./config/db.config");
const app = require("./index");
const httpServer = require('http').createServer(app);
const { socketConnection } = require("./socket");
socketConnection(httpServer);
httpServer.listen(3000, async () => {
    try {
        console.log("Server is running on 3000");
        await connectDb()
    } catch (error) {
        console.log(error)
    }
})