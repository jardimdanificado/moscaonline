import { Room } from "./types.mjs";

export function _createRoom(data,res,userdb,roomdb) 
{
    if (userdb[data.user].key === data.key) 
    {
        roomdb[data.roomname] = (new Room(data.roomname,data.user,data.allowed))
    }
}