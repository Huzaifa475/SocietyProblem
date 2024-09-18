import connectDB from "./database/index.js";
import dotenv from "dotenv";
import {app} from "./app.js";
import { Server } from "socket.io";
import { createServer } from "http";
import {Message} from "./model/message.model.js";

dotenv.config({
    path: './.env'
})

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true, 
    }
})

io.on('connection', (socket) => {

    socket.on('join', async (societyId) => {
        try {
            socket.join(societyId);

            console.log(`User joined society: ${societyId}`);
    
            const messageHistory = await Message.find({societyId}).sort({createdAt: -1});
    
            socket.emit('messageHistory', messageHistory);   
        } catch (error) {
            console.log('Error while fetching message history', error);

            socket.emit('error', 'Could not retrive message history')
        }
    })

    socket.on('send-message', async (messageDate) => {

        try {
            const {content, createdBy, societyId} = messageDate;

            if (!content || !createdBy || !societyId) {
                socket.emit('error', 'Missing required fields');
                return;
            }

            io.to(societyId).emit('receiveMessage', messageDate);
    
            await Message.create({
                content,
                createdBy,
                societyId
            })    
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', 'Message could not be sent.');
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

connectDB()
.then(() => {
    server.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port: ${process.env.PORT || 5000}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!!", err);
})