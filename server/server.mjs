import * as util from "../shared/util.mjs"
import express from 'express'
import cors from 'cors'
const app = express();



app.use(express.json());
app.use(cors());



var userdb = {},
lobbydb = {},
connectedUsers = [];
var currentFrame = 0;
var tickIntervalID;


const allMethods = await import('./src/methods.mjs')



/*******************************************************************
 * 
 * 
    STEPS DECLARATION
 *
 *
*******************************************************************/

//PUT
//PUT
//PUT
var PUT_STEPS = {...allMethods.PUT}



//POST
//POST
//POST
var POST_STEPS = {...allMethods.POST}

POST_STEPS.login = function(data,res) 
{
    POST_STEPS._login(data,res,userdb)
}

POST_STEPS.createLobby = function(data,res) 
{
    POST_STEPS._createLobby(data,res,userdb,lobbydb)
}



//PATCH
//PATCH
//PATCH
var PATCH_STEPS = {...allMethods.PATCH}



PATCH_STEPS.joinLobby = function(data,res) 
{
    PATCH_STEPS._joinLobby(data,res,userdb,lobbydb)
}



//GET
//GET
//GET
var GET_STEPS = {...allMethods.GET}

GET_STEPS.getLobbyList = function(data,res) 
{
    GET_STEPS._getLobbyList(data,res,lobbydb)
}

GET_STEPS.ping = function(data,res) 
{
    GET_STEPS._ping(data,res,userdb,lobbydb)
}



/*******************************************************************
 * 
 * 
    WRAPPERS
 *
 *
*******************************************************************/



app.post('/', (req, res) => 
{
    const data = req.body;
    POST_STEPS[data.type](data,res)
});


app.patch('/', (req, res) => 
{
    const data = req.body;
    PATCH_STEPS[data.type](data,res)
});


app.put('/', (req, res) => 
{
    const data = req.body;         
    PUT_STEPS[data.type](data,res)
});


app.get('/', (req, res) => 
{
    let data = req.query;
    GET_STEPS[data.type](data,res);
});



/*******************************************************************
 * 
 * 
    LOOPS
 *
 *
*******************************************************************/



app.listen(8080, () => 
{
  console.log('Servidor está rodando em localhost:8080');
  tickIntervalID = setInterval(() => 
  {
    currentFrame++;
    for (let i = 0; i < connectedUsers.length; i++) 
    {
        if (!connectedUsers[i].ping)
        {
            connectedUsers[i].lostPing++;
        }
        else if (lostPing > 7) 
        {
            console.log(connectedUsers[i].username + ' disconnected');
            connectedUsers.splice(i,1);
        }
        else
        {
            connectedUsers[i].ping = false;
            connectedUsers[i].lostPing = 0;
        }
    }
  }, 500)
});