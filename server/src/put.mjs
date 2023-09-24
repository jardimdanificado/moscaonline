import {User} from './types.mjs'

export function _login(data,res,db) 
{
    if (db[data.user]) 
    {
        if (db[data.user].password == data.password) 
        {
            db[data.user].updateKey()
            console.log('user ' + data.user + ' logged on.')
            res.status(200).json({ message: ('bem vindo(a) ' + data.user + '!'), key:db[data.user].key });         
        }
        else
        {
            console.log('user ' + data.user + ' unsucceful logon.')
            res.status(404).json({ message: ('senha invalida!') });           
        }
    }
    else
    {
        console.log('user ' + data.user + ' registered.')
        db[data.user] = new User(data.user,data.password)
        res.status(200).json({ message: 'usuario ' + data.user + ' registrado!', key:db[data.user].key});
    }
}