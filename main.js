const express = require("express");
const bodyParser = require ("body-parser");
const cors = require('cors');
const app = express();
const port = 3000;
const db = require("./modules/db");
const { stringify } = require("querystring");

app.use(bodyParser.json());
app.use(cors());

app.get("/exibir", async (req, res) => {
    console.log(`Requisição EXIBIR atendida`);
    let produtos = await db.selectProdutos();
    res.send(JSON.stringify(produtos)) ;
});


app.listen(port, () => {console.clear;console.log(`Servidor rodando na porta ${port}`)});

/*
async app.post("/inserir", (req, res) => {
    let produtos = await db.selectProdutos();
    res.send(stringify(produtos));
});*/

/*
(async () => {
    //INSERI DADOS NO BANCO
    await db.insertProdutos({nome:"sapato",valor: 30});
    

    //SELECIONA DADOS DO BANDO
    let produtos = await db.selectProdutos();
    console.log(produtos);


    //ATUALIZA DADOS DO BANCO
 
    await db.updateProdutos(1, {nome:"sapato",valor: 50});

    //APAGA DADOS DO BANCO
    await db.deleteProdutos(1);
    console.log(produtos);

})();
*/
