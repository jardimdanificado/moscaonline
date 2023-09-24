import * as util from "./util.mjs"
import express from 'express'
import cors from 'cors'
const app = express();

let _tempdb = {}
let _tempkeys = {}

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
    const receivedData = req.body; // Os dados enviados pelo cliente estão em req.body
    

    // Faça algo com os dados recebidos

    // Responda ao cliente (opcional)
    res.send({ message: 'Dados recebidos com sucesso!' });
});

app.put('/', (req, res) => {
    const receivedData = req.body; // Os dados enviados pelo cliente estão em req.body         
    if (_tempdb[receivedData.user]) 
    {
        if (_tempdb[receivedData.user] == receivedData.password) 
        {
            _tempkeys[receivedData.user] = receivedData.user + util.randi(100000000,999999999)
            res.status(200).json({ message: ('bem vind ' + receivedData.user + '!'),key:_tempkeys[receivedData.user] });         
        }
        else
            res.status(404).json({ message: ('senha invalida!') });           
    }
    else
    {
        _tempdb[receivedData.user] = receivedData.password
        _tempkeys[receivedData.user] = receivedData.user + util.randi(100000000,999999999)
        res.status(200).json({ message: receivedData.user + ' registrado!' ,key:_tempkeys[receivedData.user]});
    }
});

app.listen(8080, () => {
  console.log('Servidor está rodando na porta 8080');
});
