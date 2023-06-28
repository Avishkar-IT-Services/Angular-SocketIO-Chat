require('dotenv').config()
const loggerRequest = require("./utils/logger.util")
const express = require('express')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
app.use(cors({
    origin: '*'
}))
app.use(loggerRequest)
app.use(require("./middleware/errorHandle.middleware"));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Chat application",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger"
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use("", require("./controller/signup-login.controller"));
app.use("", require("./controller/channel.controller"));
app.use("", require("./controller/upload.controller"));
app.use("", require("./controller/otp.controller"));
module.exports = app