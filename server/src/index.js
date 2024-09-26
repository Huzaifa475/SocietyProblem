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
        origin: "https://societyproblem-client.onrender.com",
        methods: ['POST', 'GET'],
        transports: ['websocket'],
        credentials: true, 
    }
})

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', async (societyName) => {
        try {
            socket.join(societyName);

            console.log(`User joined society: ${societyName}`);
    
            const messageHistory = await Message.find({societyName}).sort({createdAt: 1});
    
            socket.emit('messageHistory', messageHistory);   
        } catch (error) {
            console.log('Error while fetching message history', error);

            socket.emit('error', 'Could not retrive message history')
        }
    })

    socket.on('send-message', async (messageDate) => {

        try {
            const {content, createdBy, societyName} = messageDate;

            if (!content || !createdBy || !societyName) {
                socket.emit('error', 'Missing required fields');
                return;
            }

            const message = await Message.create({
                content,
                createdBy,
                societyName
            })    

            io.to(societyName).emit('receiveMessage', message);
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', 'Message could not be sent.');
        }
    });

    socket.on('delete-message', async (societyName) => {
        try {
            
            await Message.deleteMany({societyName: societyName})

        } catch (error) {
            console.error('Error while deleting message', error);
            socket.emit('error', 'Message could not delete.');
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

io.on('connect_error', (err) => {
    console.log(`Connect Error: ${err.message}`);
});

connectDB()
.then(() => {
    server.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port: ${process.env.PORT || 5000}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!!", err);
})

export {io}