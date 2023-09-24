import * as util from "./src/util.mjs"
import express from 'express'
import cors from 'cors'
const app = express();

var db = {}

var PUT_STEPS = {...await import('./src/put.mjs')}
PUT_STEPS.login = function(data,res) 
{
    PUT_STEPS._login(data,res,db)
}

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
    const data = req.body; // Os dados enviados pelo cliente estão em req.body
    
    // Responda ao cliente (opcional)
    res.send({ message: 'Dados recebidos com sucesso!' });
});

app.put('/', (req, res) => 
{
    const data = req.body; // Os dados enviados pelo cliente estão em req.body         
    PUT_STEPS[data.type](data,res)
});

app.listen(8080, () => {
  console.log('Servidor está rodando na porta 8080');
});
