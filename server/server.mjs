import * as util from "../shared/util.mjs"
import express from 'express'
import cors from 'cors'
const app = express();



app.use(express.json());
app.use(cors());



var userdb = {},roomdb = {},connectedUsers = []



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

POST_STEPS.createRoom = function(data,res) 
{
    POST_STEPS._createRoom(data,res,userdb,roomdb)
}



//PATCH
//PATCH
//PATCH
var PATCH_STEPS = {...allMethods.PATCH}



//GET
//GET
//GET
var GET_STEPS = {...allMethods.GET}

GET_STEPS.getRoomList = function(data,res) 
{
    GET_STEPS._getRoomList(data,res,roomdb)
}

GET_STEPS.ping = function(data,res) 
{
    GET_STEPS._ping(data,res,userdb,roomdb)
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


app.listen(8080, () => {
  console.log('Servidor está rodando em localhost:8080');
});