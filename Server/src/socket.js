const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Chat = require("./model/message.model");
const mongoose = require("mongoose");
const { Readable } = require('stream');
const connection = mongoose.connection;
let gfs;

connection.once("open", async () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connections[0].db, { bucketName: 'fileUploads' })
    // const filename = 'chandan.jpg';

    // // const query = { filename };

    // const fileId = "649965b7e2b2a385d57cb5d5"

    // const query = { _id: new mongoose.Types.ObjectId(fileId) };
    // // console.log('query: ', query);

    // console.log("Execution to this line")

    // let res = await gfs.find().toArray((err) => {
    //     console.log(err)
    // });

    // console.log(res)


    let files = await gfs.find().toArray();

    let result = []

    console.log("Before finding")

    // console.log(gfs)
    // files.forEach((ele) => {
    //     // console.log('ele: ', ele._id);
    //     const downloadStream = gfs.openDownloadStream(ele._id)
    //     console.log('downloadStream: ', downloadStream.on());

    //     // downloadStream.pipe({})
    //     const chunks = [];
    //     downloadStream.on("data", (chunk) => {
    //         console.log(chunk)
    //         chunks.push(chunk);
    //     })
    //     downloadStream.on("error", (er) => {
    //         console.log(er)
    //     })
    //     downloadStream.on("end", () => {
    //         const fileBuffer = Buffer.concat(chunks);
    //         const buffer = fileBuffer.toString("base64")
    //         // console.log('fileBuffer: ', fileBuffer);
    //         const fileItem = {
    //             filename: ele.filename,
    //             data: buffer
    //         }

    //         // console.log(fileItem)
    //         result.push(fileItem)
    //     })
    // })

    // console.log("After finding")

    // console.log(result)

    // console.log("Execution to this line")

    // const channel = await Chat.find({ channelName: "Random" });
    // console.log('channel: ', channel);

    // 649a760c4c2fe2a4719b95fc

    // const createChat = await new Chat({
    //     name: "C and C",
    //     messageText: "Uploaded to gridFS",
    //     channelName: "Random",
    //     uploadGridId: '649a814d01844eb00d2cbe55',
    //     sentDate: "27-06-2023"

    // }).save()
})

const socketConnection = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
        maxHttpBufferSize: 1e8
    });

    // io.use is a middleware to perform some action before executing the socket operation
    io.use(async (socket, next) => {
        let token = JSON.parse(socket.handshake?.auth?.token)
        if (token) {
            const user = jwt.verify(token, process.env.SECRETKEY)
            socket.user = user;
            next();
        } else {
            return next(new Error("Please provide token"))
        }
    })

    io.on('connection', async (socket) => {
        console.log("Socket Connection Established with ID :" + socket.id);
        socket.on('disconnect', (room, userName) => {
            // socket.broadcast.to(room).emit('disconnect_user', { message: `${userName} has disconnect from the room ` })
            console.log('A user disconnected');
        });

        // all the event listened by the client will be printed in the console - its help to debug the application
        // socket.onAny((event, ...args) => {
        //     console.log(event, args);
        // });

        socket.on("upload-image", (room, imageUrl) => {
            console.log('room, imageUrl: ', room, imageUrl);

            // const imgPath =`${ __dirname}/my-uploads/img.png`
            // console.log('imgPath: ', imgPath);

            // const buffer = Buffer.from(imageUrl, 'base64');
            // console.log('buffer: ', buffer);
            socket.broadcast.to(room).emit("upload-room-image", imageUrl);

        })

        socket.on("join-room", ({ room, userName }) => {
            socket.join(room);
            socket.broadcast.to(room).emit('newUserJoined', { message: `${userName} has joined the room ` })
        })


        socket.on("user-typing", (room) => {
            try {
                socket.broadcast.to(room).emit("user-start-typing", { isTyping: true, userName: socket.user.user.name });
            } catch (error) {
                console.log(error)
            }
        })

        socket.on("user-stop", (room) => {
            socket.broadcast.to(room).emit("user-stop-typing", false);
        })

        socket.on('send-message', async function (room, data) {
            try {
                if (data.upload) {
                    // console.log('message: ', data.upload.name);
                    // console.log('message: ', data.upload.url);
                    // console.log('message: ', data.upload.type);
                    // io.in(room).emit('get-message', message)
                    /*
                    Store Image/video url to the GridFS

                    once its store and refer to the chat schema who sent the file to which channel

                    Retrieve file from gridFs store and sent to the frontend 

                    UPLOAD progress and download progress also need to implement 
                    */

                    // it converts string to binary 
                    const buffer = Buffer.from(data?.upload?.url, "base64");
                    // create readable stream
                    const stream = new Readable();
                    stream.push(buffer);
                    stream.push(null);

                    const writeStream = gfs.openUploadStream({
                        filename: data?.upload?.name,
                        channel: "Random"
                    })

                    writeStream.on("finish", (file) => {
                        console.log("file uploaded successfully", file)
                        // instead console , send some data to frontend
                        // we can refer to user and channel schema from here 
                    })

                    writeStream.on("error", (err) => {
                        // send err to frontend e.g - uploading failed upload again
                        console.log(err)
                    })

                    // close the gridfs after success and fail
                    writeStream.end();

                    // whatever the stream has data that will transfer to writestream 
                    stream.pipe(writeStream)

                } else {
                    // Save user chat to database 
                    await new Chat(data).save()
                    io.in(room).emit('get-message', data)
                }
            } catch (err) {
                console.log(err)
            }
        })


        // To leave the room is same as join 
        // socket.leave(roomName)
        socket.on("roomMessage", (data) => {
            io.in(data.room).emit("chat message", { user: data.user, message: data.message });
        })
        /*
         Send socket to all in room expect the sender
         socket.to(data.room).emit("chat", data.message)
         Broadcast the message to all connected clients
         io.emit('chat message', message);
        
         Broadcastng -  means to emit the event from server to all users
         in order to emit the event from server
         socket io giving us io.emit() methods
    
         To get the auth details
         let token = socket.handshake?.auth?.token
    
         it send the same message back to sender only not others 
         socket.emit('message', "this is a test");
    
         it send message to all the client expect the sender 
         socket.broadcast.emit('message', "this is a test"); 
    
         it send message all clients in room expect sender
         socket.broadcast.to('game').emit('message', 'nice game'); 
    
        sending  to sender client, only if they are in 'game' room(channel)
        socket.to('game').emit('message', 'enjoy the game'); 
    
        sending message to individual socketid
        socket.broadcast.to(socketid).emit('message', 'for your eyes only'); 
    
        sending message to all clients, include sender
        io.emit('message', "this is a test"); 
    
        sending message to all clients in 'game' room(channel), include sender
        io.in('game').emit('message', 'cool game'); //
    
        sending to all clients in namespace 'myNamespace', include sender
        io.of('myNamespace').emit('message', 'gg'); 
    
        send to all connected clients
        socket.emit(); 
    
        send to all connected clients except the one that sent the message
        socket.broadcast.emit(); //
    
        event listener, can be called on client to execute on server
        socket.on(); 
    
        io.sockets.socket(); //for emiting to specific clients
    
        io.sockets.emit(); //send to all connected clients (same as socket.emit)
    
        io.sockets.on() ; //initial connection from a client.
        
        */

    })
}


module.exports = { socketConnection, gfs }
