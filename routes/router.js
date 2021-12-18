const { response, request, json } = require('express');
const express = require('express');
require('dotenv').config();
const users = require('../model/user')
const todos = require('../model/todo')
const router = express.Router();
const jwt = require('jsonwebtoken');

 //creating users
 router.post('/user/create', async(requeest, response)=>{    
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
router.post('/user/login', async(request, response)=>{
    try{

        const data =await users.find();
        const userData = data.find(user =>user.email =request.body.email)
        
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
      }catch{
         response.status(500).send()
     }
  })
 
 // creating todos
 router.post('/todo/create', authenticateToken, async(requeest, response)=>{    
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


//geting todos of autherized users
router.get('/todo/list', authenticateToken, async(request, response)=>{
        try{
            const todoList = await todos.find()
            const res = todoList.filter(todo =>todo.email == request.user.email)
            response.json(res);
        }catch{
            response.status(500).send()
        }  
 })

// update todo 
router.patch('/todo/update/:id', authenticateToken, async(request, response) =>{
        try{
            console.log(request.params.id)
            const data = await todos.findById(request.params.id);

            if (data.email == request.user.email){
                data.title = request.body.title;
                const res = await data.save()
                response.json(data);
            }else{
               response.send('Not autherized to change')
            }
        }catch{
            response.status(500).send()
        }
 })

// delete todo 
router.delete('/todo/delete/:id', authenticateToken, async(request, response) =>{
        try{
            console.log(request.params.id)
            const data = await todos.findById(request.params.id);

            if (data.email == request.user.email){     
                const res = await data.remove()
                response.json(res);
            }else{
                response.send('Not autherized to delete')
            }
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


module.exports = router;