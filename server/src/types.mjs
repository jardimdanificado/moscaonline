import {newKeycode} from '../../shared/util.mjs'

export class User
{
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

export class Room
{
    allowedUsers = []
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
    constructor(roomname,username='all',allowed=[])
    {
        this.name = roomname
        this.username = username
        this.allowedUsers = allowed
        if (this.allowedUsers.length>0) 
        {
            this.allowedUsers.push(username)
        }
    }
}