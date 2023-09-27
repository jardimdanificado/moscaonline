import * as util from "../shared/util.mjs"
import express from 'express'
import cors from 'cors'
const app = express();



app.use(express.json());
app.use(cors());



var userdb = {},roomdb = {}



const allMethods = await import('./src/methods.mjs')



/*******************************************************************
 * 
 * 
    STEPS DECLARATION
 *
 *
*******************************************************************/


var PUT_STEPS = {...allMethods.put}


var POST_STEPS = {...allMethods.post}

POST_STEPS.login = function(data,res) 
{
    POST_STEPS._login(data,res,userdb)
}


var PATCH_STEPS = {...allMethods.patch}

PATCH_STEPS.createRoom = function(data,res) 
{
    PATCH_STEPS._createRoom(data,res,userdb,roomdb)
}


var GET_STEPS = {...allMethods.get}

GET_STEPS.getRoomList = function(data,res) 
{
    GET_STEPS._getRoomList(data,res,roomdb)
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
  console.log('Servidor está rodando na porta 8080');
});