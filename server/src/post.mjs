import {User} from './types.mjs'

export function _login(data,res,userdb) 
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