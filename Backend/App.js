const express = require("express");

const app = express();

app.use(express.json());

const mysql = require("mysql2");

require('dotenv').config();

const Routes = require("./Routes/Routes");


const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});



connection.connect((error) => {
    if(error) {
        throw error;
    };

    console.log("connected to mysql");
});

app.set("mysqlConnection", connection);

app.use("/api", Routes);

app.listen(3001, () => {
    console.log("connected on port 3001");
});