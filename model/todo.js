const mongoose = require('mongoose');

 const todoSchema = new mongoose.Schema({
     email: {
         type:String,
         required: true
     },
     task:{
         type: String,
         required: true
     }
     
 })
 
 module.exports = mongoose.todo('todo', todoSchema)