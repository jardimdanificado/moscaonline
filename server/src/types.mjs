import {newKeycode} from '../../shared/util.mjs'

export class User
{
    ping = false
    lostPing = 0
    currentLobby
    updateKey = function() 
    {
        this.key = this.username + '@' + newKeycode()
        return this.key
    }
    constructor(username,password)
    {
        this.username = username
        this.password = password
        this.updateKey()
    }
}

export class Lobby
{
    allowedUsers = []
    connectedUsers = []
    creator = 'all'
    name = 'noname'
    allowPlayer = function(username)
    {
        this.allowedUsers.push(username)
    }
    denyPlayer = function(username)
    {
        for (let i = 0; i < this.allowedUsers.length; i++) 
        {
            if(this.allowedUsers[i] == username)
                this.allowedUsers.splice(i,1);
        }
    }
    constructor(lobbyid,username='all',allowed=[])
    {
        this.name = lobbyid
        this.username = username
        this.allowedUsers = allowed
        if (this.allowedUsers.length>0) 
        {
            this.allowedUsers.push(username)
        }
    }
}