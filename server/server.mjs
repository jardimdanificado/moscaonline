import * as util from "../shared/util.mjs";
import * as WebSocket from "ws";
import {User,Client} from "./src/types.mjs";
import * as methods from "./src/methods.mjs";
var db = {};
var clients = {};
var lobbydb = {}

const server = new WebSocket.WebSocketServer({ port: 8080 });
server.on('connection', (ws) => {
    ws.on('message', (message) => {
        //console.log(message);
        message = JSON.parse(message);
        if (message.type && methods[message.type]) 
        {
            methods[message.type](ws,message,db,clients,lobbydb);
        }
        if (message) 
        {
            console.log(`Mensagem recebida: ${JSON.stringify(message)}`);
        }
    });

    ws.on('close', () => 
    {
        console.log('Cliente "' + ws.user.username + '" desconectado.');
        clients[ws.user.username] = null;
    });
});

console.log('Servidor WebSocket está ouvindo na porta 8080');
