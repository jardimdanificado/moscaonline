import { Lobby, User } from "./types.mjs";



var GET={},PUT={},POST={},PATCH={},DELETE={};



/*******************************************************************
 *
 *
    GET
 *
 *
*******************************************************************/



GET._getLobbyList = function(data,res,lobbydb) 
{
    const nomeUsuario = data.username;
    let lista = []
    for (let lobbyid in lobbydb)
    {
        let lobby = lobbydb[lobbyid]
        if (lobby.allowedUsers.includes(nomeUsuario) || lobby.allowedUsers.length == 0) 
        {
            lista.push(lobby)
        }
    }
    res.json(lista);
}



GET._ping = function(data,res,userdb,lobbydb)
{
    let done = false;
    if (!userdb[data.user]) 
    {
        res.status(404).json({log:'user ' + data.user + ' not found.'});
        done = true;
    }
    else if (!userdb[data.user].currentLobby) 
    {
        res.status(404).json({log:data.user + ' is not connected to any lobby.'});
        done = true;
    }
    else if (!lobbydb[userdb[data.user].currentLobby]) 
    {
        res.status(404).json({log:'lobby ' + userdb[data.user].currentLobby + ' not found.'});
        done = true;
    }
    else
    {
        let localLobby = lobbydb[userdb[data.user].currentLobby]
        for (const cUser of localLobby.connectedUsers) 
        {
            if(cUser === data.user) 
            {
                res.status(200).json({log:'ok'});
                done = true;
            }
        }
    }
    if(!done)
        res.status(404).json({log:'something went wrong'})
}



/*******************************************************************
 * 
 * 
    POST
 *
 *
*******************************************************************/



POST._login = function(data,res,userdb) 
{
    if (userdb[data.user]) 
    {
        if (userdb[data.user].password == data.password) 
        {
            userdb[data.user].updateKey()
            console.log('user ' + data.user + ' logged on.')
            res.json({ message: ('bem vindo(a) ' + data.user + '!'), key:userdb[data.user].key });         
        }
        else
        {
            console.log('user ' + data.user + ' unsucceful logon.')
            res.json({ message: ('senha invalida!') });           
        }
    }
    else
    {
        console.log('user ' + data.user + ' registered.')
        userdb[data.user] = new User(data.user,data.password)
        res.json({ message: 'usuario ' + data.user + ' registrado!', key:userdb[data.user].key});
    }
}



POST._createLobby = function(data,res,userdb,lobbydb)
{
    if (userdb[data.user].key === data.key) 
    {
        lobbydb[data.lobbyname] = new Lobby(data.lobbyname,data.user,data.allowed)
        console.log("lobby " + data.lobbyname + " has been created by " + data.user)
    }
}



/*******************************************************************
 * 
 * 
    PATCH
 *
 *
*******************************************************************/



PATCH._joinLobby = function(data,res,userdb,lobbydb)
{
    if(!userdb[data.user])
    {
        res.status(404).json({log:'lobby ' + data.lobbyname + ' does not exist.'})
    }
    else if (!lobbydb[data.lobbyname]) 
    {
        res.status(404).json({log:'user ' + data.user + ' does not exist.'})
    }
    else if (userdb[data.user].key === data.key) 
    {
        lobbydb[data.lobbyname].connectedUsers.push(data.user);
        userdb[data.user].currentLobby = data.lobbyname;
        console.log('user ' + data.user + ' joined "' + data.lobbyname + '" lobby');
        res.status(200).json({log:'joined'})
    }
    else
    {
        res.status(404)
    }
}



/*******************************************************************
 * 
 * 
    PUT
 *
 *
*******************************************************************/





/*******************************************************************
 * 
 * 
    DELETE
 *
 *
*******************************************************************/



DELETE._deleteLobby = function(data,res,userdb,lobbydb)
{
    if (userdb[data.user].key === data.key) 
    {
        delete lobbydb[data.lobbyname];
        console.log("lobby " + data.lobbyname + " has been deleted.")
    }
}



//export
export {GET,POST,PUT,PATCH,DELETE};