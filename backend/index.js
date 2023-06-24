const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const port = process.env.PORT;
const connectDB = require('./config/dbConn');

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log('App listening on port', port)
})