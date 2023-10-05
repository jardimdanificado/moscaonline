import { User, Client, Lobby } from "./types.mjs";

export const authenticate = function(socket,request,msg,session) 
{
    if (session.db.user[msg.username] && session.db.user[msg.username].password == msg.password) 
    {
        session.client[msg.username] = new Client(msg.username,socket,request.connection.remoteAddress);
        socket.client = session.client[msg.username];
        console.log(`authenticated: ${msg.username}`);
        return true;
    }
    else
    {
        socket.send({log: 'connection rejected.'},'close');
        socket.close();
        return false;
    }
}

export const login = (socket,request,message,session) => 
{
    if (!session.db.user[message.username]) 
    {
        session.db.user[message.username] = new User(message.username,message.password);
        console.log(`Novo cliente: ${message.username}`);
        if(!authenticate(socket,session.db.user,message.username,message.password))
            return;
        socket.jsend({log: 'open lobby menu.'},'spawnLobbyMenu');
    }
    else 
    {
        if(!authenticate(socket,session.db.user,message.username,message.password))
        {
            console.log("Login bem sucedido: " + message.username); 
            socket.jsend({log: 'open lobby menu.'},'spawnLobbyMenu');
        }
        else
        {
            console.log(`Login falhou: ${message.username}`);
            return;
        }
    }
}

export const createLobby = (socket,request,message,session) => 
{
    if(!authenticate(socket,db,message.username,message.password))
        return;
    else 
    {
        session.db.lobby[message.lobbyid] = new Lobby(message.lobbyid,message.user, message.tickrate);
        socket.send(JSON.stringify({type: 'spawnLobbyMenu',user:socket.user.username,log: 'open lobby menu.'}));
    }
}

export const getLobbyList = (socket,request,message,session) =>
{
    socket.send(JSON.stringify({type: 'updateLobbyList',lobbies:session.db.lobby}));
}