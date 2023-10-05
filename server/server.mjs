import * as util from "../shared/util.mjs";
import * as WebSocket from "ws";
import {User,Client} from "./src/types.mjs";
import * as methods from "./src/methods.mjs";
var session = 
{
    db: 
    {
        user:{},
        lobby:{},
    },
    client: {},
};
const sendJSON = function(socket,obj,type) 
{
    obj.type = type;
    socket.send(JSON.stringify(obj));
}

const server = new WebSocket.WebSocketServer({ port: 8080 });
server.on('connection', (socket,request) => 
{
    socket.jsend = (data,type) =>
    {
        sendJSON(socket,data,type);
    }
    
    socket.on('message', (message) => 
    {
        if (message) 
            console.log(`Mensagem recebida: ${message}`);

        message = JSON.parse(message);
        if (message.type && methods[message.type]) 
        {
            methods[message.type](socket,request,message,session);
        }
    });

    socket.on('close', () => 
    {
        console.log('Cliente "' + socket.user.username + '" desconectado.');
        session.client[socket.user.username] = null;
    });
});

console.log('Servidor WebSocket está ouvindo na porta 8080');
