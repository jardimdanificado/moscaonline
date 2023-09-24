import {newKeycode} from './util.mjs'

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