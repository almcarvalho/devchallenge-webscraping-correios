import express from 'express';
const app = express();
var axios = require('axios');
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    try {
        var { cep } = req.query;
        //console.log(cep);
        if (cep === undefined) {
            res.status(403).json({ error: "invalid cep, inform the cep, example:  <url>/?cep=49030213" });
        }

        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(function (resposta: any) {
            console.log(resposta.data);
            res.status(200).json(resposta.data);
        }).catch(function (e: any) {
            res.status(403).json({ error: "cep not found" });
        });
    }
    catch (err) {
        res.status(403).json({ error: "erro na api" });
    }

});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`My api is runing on http://localhost:${port}`)).on('error', function (err) {
    console.log("erro interno na api");
});;