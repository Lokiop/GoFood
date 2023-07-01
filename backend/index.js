const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const port = process.env.PORT;
const connectDB = require('./config/dbConn');

connectDB();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World' });
})

app.use('/api', require('./routes/Routes'))

app.listen(port, () => {
    console.log('App listening on port', port)
})