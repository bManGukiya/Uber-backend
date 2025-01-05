const socketIo = require('socket.io');
const usermodel = require('./models/user.model');
const captainmodel = require('./models/captain.model');

let io;


function initializeSocket(server) {
    io = socketIo(server, {
    cors:{
        origin: '*',
        methods: ['GET', 'POST']
    }
});
    io.on('connection', (socket) => {
        console.log(`Client connected ${socket.id}`);
        
        socket.on('join',async(data)=>{
            const {userId,userType} = data;
            if(userType==='user'){
                await usermodel.findByIdAndUpdate(userId,{socketId:socket.id});
            }
            else if(userType==='captain'){
                await captainmodel.findByIdAndUpdate(userId,{socketId:socket.id});}
        })
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if(io){
        io.to(socketId).emit('message', message);
    }
    else{
        console.log("Socket not initialized");
    }
}

module.exports = initializeSocket, sendMessageToSocketId;