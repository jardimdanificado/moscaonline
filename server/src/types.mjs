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

export class Client
{
    constructor(username)
    {
        this.username = username
    }
}

export class Lobby
{
    connectedUsers = []
    creator = 'all'
    name = 'noname'
    constructor(lobbyid,username='all',tickrate=700)
    {
        this.name = lobbyid;
        this.creator = username;
        this.tickrate = tickrate;
    }
}

export class Time
{
    tostring = function(separator=':') 
    {
        return this.year + separator + this.month + separator + this.day + separator + this.hour + separator + this.minute + separator + this.second
    }
    constructor(year,month,day,hour,minute,second)
    {
        if (typeof year != 'undefined') 
        {
            this.year = year
            this.month = month
            this.day = day
            this.hour = hour
            this.minute = minute
            this.second = second    
        }
        else
        {
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.day = date.getDate();
            this.hour = date.getHours();
            this.minute = date.getMinutes();
            this.second = date.getSeconds();
        }
    }
}

//message types

export class Log
{
    constructor(message,time)
    {
        this.message = message
        this.time = time
    }
}
