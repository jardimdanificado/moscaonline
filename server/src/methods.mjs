import { Room, User } from "./types.mjs";



var get={},put={},post={},patch={};



/*******************************************************************
 *
 *
    GET
 *
 *
*******************************************************************/



get._getRoomList = function(data,res,roomdb) 
{
    const nomeUsuario = data.username;
    let lista = [new Room('teste','debug')]
    for (let roomid in roomdb)
    {
        let room = roomdb[roomid]
        console.log(room,roomid)
        if (room.allowedUsers.includes(nomeUsuario) || room.allowedUsers.length == 0) 
        {
            lista.push(room)
        }
    }
    res.json(lista);
}



/*******************************************************************
 * 
 * 
    POST
 *
 *
*******************************************************************/



post._login = function(data,res,userdb) 
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



/*******************************************************************
 * 
 * 
    PATCH
 *
 *
*******************************************************************/



patch._createRoom = function(data,res,userdb,roomdb) 
{
    if (userdb[data.user].key === data.key) 
    {
        roomdb[data.roomname] = new Room(data.roomname,data.user,data.allowed)
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

//export
export {get,post,put,patch};