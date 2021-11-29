async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/loja");
    console.log("Conectou no Mysql");
    global.connection = connection;
    return connection;
}
//connect();

async function selectProdutos() {
    const conn = await connect();
    const [linhas] = await conn.query('SELECT * FROM produtos;');
    return linhas;
}

async function insertProdutos(prod){
    const conn = await connect();
    const sql = ('INSERT INTO produtos(nome,valor) VALUES (?,?);');
    const values = [prod.nome, prod.valor];
    return await conn.query(sql, values); //return opcional para ver logs
}

async function updateProdutos(id, prod) {
    const conn = await connect();
    const sql = 'UPDATE produtos SET nome=?, valor=? WHERE id=?';
    const values = [prod.nome, prod.valor, id];
    return await conn.query(sql, values);
}

async function deleteProdutos(id) {
    const conn = await connect();
    const sql = 'DELETE FROM produtos WHERE id=?';
    const values = [id];
    return await conn.query(sql, values);
}


module.exports = {selectProdutos, insertProdutos, updateProdutos, deleteProdutos}