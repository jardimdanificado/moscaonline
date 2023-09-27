import { Room, User } from "./types.mjs";



var GET={},PUT={},POST={},PATCH={},DELETE={};



/*******************************************************************
 *
 *
    GET
 *
 *
*******************************************************************/



GET._getRoomList = function(data,res,roomdb) 
{
    const nomeUsuario = data.username;
    let lista = []
    for (let roomid in roomdb)
    {
        let room = roomdb[roomid]
        if (room.allowedUsers.includes(nomeUsuario) || room.allowedUsers.length == 0) 
        {
            lista.push(room)
        }
    }
    res.json(lista);
}



GET._ping = function(data,res,userdb,roomdb)
{
    res.status(200).send('ok')
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



POST._createRoom = function(data,res,userdb,roomdb)
{
    if (userdb[data.user].key === data.key) 
    {
        roomdb[data.roomname] = new Room(data.roomname,data.user,data.allowed)
        console.log("room " + data.roomname + " has been created by " + data.user)
    }
}



/*******************************************************************
 * 
 * 
    PATCH
 *
 *
*******************************************************************/







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



DELETE._deleteRoom = function(data,res,userdb,roomdb)
{
    if (userdb[data.user].key === data.key) 
    {
        delete roomdb[data.roomname];
        console.log("room " + data.roomname + " has been deleted.")
    }
}



//export
export {GET,POST,PUT,PATCH,DELETE};