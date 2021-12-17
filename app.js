const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/ToDoDB';

const app = express()

mongoose.connect(url, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', ()=>{
    console.log('connected...');
});

app.listen(9000, ()=>{
    console.log('server started');
});