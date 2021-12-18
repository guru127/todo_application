const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/ToDoDB';
const router = require('./routes/router');

const app = express()

app.use(express.json());

mongoose.connect(url, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', ()=>{
    console.log('connected...');
});

app.use('/', router);

app.listen(9000, ()=>{
    console.log('server started');
});