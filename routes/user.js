const { response, request, json } = require('express');
const express = require('express');
const user = express.Router();
const users = require('../model/user')

user.get('/', async(request, response)=>{
   
    try{
        const userData =await users.find();
        console.log(users)
        response.json(userData);
   }catch(err){
     response.send('error ')
   }

 });



module.exports = user;