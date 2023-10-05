import { User, Client, Lobby } from "./types.mjs";

export const login = (ws,message,db,clients) => {
    if (!db[message.username]) 
    {
        db[message.username] = new User(message.username,message.password);
        clients[message.username] = new Client(message.username);
        ws.user = clients[message.username];
        console.log(`Novo cliente: ${message.username}`);
        ws.send(JSON.stringify({type: 'spawnLobbyMenu',user:ws.user.username,log: 'open lobby menu.'}));
    }
    else 
    {
        if (db[message.username].password == message.password) 
        {
            clients[message.username] = new Client(message.username);
            ws.user = clients[message.username];
            console.log("Login bem sucedido: " + message.username); 
            ws.send(JSON.stringify({type: 'spawnLobbyMenu',user:ws.user.username,log: 'open lobby menu.'}));
        }
        else
        {
            console.log(`Login falhou: ${message.username}`);
        }
    }
}

let authenticate = function(ws,db,user,password,callback,args) 
{
    if (db[user] && db[user].password == password) 
    {
        if (callback) 
        {
            callback(args ? {...args} : null);
        }
        console.log(`authenticated: ${user}`);
        return true;
    }
    else
    {
        ws.send(JSON.stringify({type: 'close',user:user,log: 'connection rejected.'}));
        console.log(`authentication failed: ${user}`);
        return false;
    }
}

export const createLobby = (ws,message,db,clients,lobbies) => 
{
    if(!authenticate(ws,db,message.user,message.password))
        return;
    else 
    {
        lobbies[message.lobbyid] = new Lobby(message.lobbyid,message.user, message.tickrate);
        ws.send(JSON.stringify({type: 'spawnLobbyMenu',user:ws.user.username,log: 'open lobby menu.'}));
    }
}

export const getLobbyList = (ws,message,db,clients,lobbies) =>
{
    ws.send(JSON.stringify({type: 'updateLobbyList',lobbies:lobbies}));
}