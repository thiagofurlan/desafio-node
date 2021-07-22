const express = require('express');
const app = express();
const mysql = require('mysql');

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const port = 3000;

app.get('/', (req, res) => {

    let responseHTML = '<h1>Full CycleRocks!</h1>';

    const connection = mysql.createConnection(config);

    connection.query('SELECT name FROM people', function (err, result, fields) {

        if (err) throw err;

        responseHTML += '<ul>';

        result.forEach((element) => {
            responseHTML += `<li>${element.name}</li>`
        });

        responseHTML += '</ul>'

        connection.end()

        res.send(responseHTML)
    });

})

function insert(name, connection) {
    connection.query('INSERT INTO people(name) values(?)', name, function (err, result) {
        if (err) throw err;
    });
}

app.listen(port, () => {

    const connection = mysql.createConnection(config);

    connection.query("DROP TABLE IF EXISTS people");

    connection.query(`CREATE TABLE people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100)
    )`);

    insert('João', connection);
    insert('Maria', connection);
    insert('José', connection);

    connection.end()

    console.log(`Running on port ${port}`);
});
