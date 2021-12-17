const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/ToDoDB';
const user = require('./routes/user');
//const todo  = require('./routes/todo');

const app = express()

app.use(express.json());

mongoose.connect(url, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', ()=>{
    console.log('connected...');
});

app.use('/user', user);
//app.use('/todo', todo);

app.listen(9000, ()=>{
    console.log('server started');
});