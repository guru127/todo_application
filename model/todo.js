const mongoose = require('mongoose');

 const todoSchema = new mongoose.Schema({
     email: {
         type:String,
         required: true
     },
     title:{
         type: String,
         required: true
     }
     
 })
 
 module.exports = mongoose.model('todo', todoSchema)