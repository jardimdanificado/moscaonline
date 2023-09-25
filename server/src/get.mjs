import { Room } from "./types.mjs";

export function _getRoomList(data,res,roomdb) 
{
    const nomeUsuario = data.username;
    let lista = [new Room('teste','debug')]
    for (let roomid in roomdb)
    {
        let room = roomdb[roomid]
        console.log(room)
        if (room.allowedUsers.includes(nomeUsuario) || room.allowedUsers.length == 0) 
        {
            lista.push(room.name)
        }
    }
    res.json(lista);
}