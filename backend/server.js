const http = require('http');
const app = require('./app');
const initializeSocket = require('./socket');
const sendMessageToSocketId = require('./socket');
const port  = process.env.PORT || 3000;
const server = http.createServer(app);

initializeSocket(server);
sendMessageToSocketId('123','Hello World');

server.listen(port,()=>{
    console.log("Server Runnig.....");
});