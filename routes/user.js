const { response, request, json } = require('express');
const express = require('express');
require('dotenv').config();
const users = require('../model/user')
const todos = require('../model/todo')
const user = express.Router();
const jwt = require('jsonwebtoken');

 //creating users
 user.post('/user/create', async(requeest, response)=>{    
     try{
         const userData =await users.find();
         const data = userData.find(user =>user.email == requeest.body.email) 
        if(data == null){           
           const newUser = new  users({
              email : requeest.body.email,
              password : requeest.body.password
           });
           const res = await newUser.save();  
           response.json(res);
         }else{
           response.send("User Already exists")
         }
      }catch{
          response.status(500).send()
      }   
 })

//login 
user.post('/user/login', async(request, response)=>{
  try{

    const data =await users.find();
    const userData = data.find(user =>user.email =request.body.email)
    console.log(`user ====`,userData)
    if(userData == null){
        return response.status(400).send("Cannot find user")
    }
    if(request.body.password ==  userData.password){
          const username = request.body.email;
          const user = {email : username}
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          response.json({accessToken : accessToken});
                     
      }else{
          response.send('Wrong Password')
      }
     }
     catch{
      response.status(500).send()
  }
 })
 
 // creating todos
 user.post('/todo/create', authenticateToken, async(requeest, response)=>{    
  try{
      const newTodo = new todos({
        email : requeest.user.email,
        title : requeest.body.title
      })
      const res = await newTodo.save();  
      response.json(res);
   }catch{
       response.status(500).send()
   }   
})


// geting todos of autherized users
user.get('/todo/list', authenticateToken, async(request, response)=>{
  try{
    const todoList = await todos.find()
    const res = todoList.filter(todo =>todo.email == request.user.email)
    response.json(res);
  }catch{
   response.status(500).send()
  }  
})

// geting all todos
 user.get('/todo/alllist' , async(requeest, response)=>{
   try{
     const todoList = await todos.find()
     response.json(todoList);
   }catch{
    response.status(500).send()
   }  
 })

 function authenticateToken(request, response, next){
      const authHeader = request.headers['authorization']
      const token = authHeader &&  authHeader.split(' ')[1]
        if (token == null){
            return response.sendStatus(401)
        }
       
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
            if(err) return response.sendStatus(403)
            request.user = user
            next()              
        })
 }


// get all users 
user.get('/user', async(request, response)=>{
   
  try{     
      const userData =await users.find();
      console.log(JSON.stringify(users))
      response.json(userData);
 }catch(err){
   response.send('error ')
 }

});
user.delete('/user', async(request, response)=>{   
try{
  const userData = await users.deleteMany() ;
  
   response.json(userData);
 }catch(err){
 response.send('error ')
}
});
user.delete('/user:id', async(request, response)=>{
try{
     const data =await users.findById(request.params.id);
     
     const res = await data.remove()
     response.json(data);
}catch{
  response.send('error '+ err)
}
});


module.exports = user;