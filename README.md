# todo_application
todo backend application using NodeJS, Express, MogoDB, Jwt_Athentication..

it is todo list aplication.
user can rigister.
after rigistering they can login, on login they will recieve a token.  
with token user can crete todo list and get todo list of theire own. and update or delete theire own todo list.
user canot able see or do any alteration on todo list of other users.

for url check request.rest file in folder. 

packege ussed and installed are as follows

npm init -- to initlize app

npm install express

npm i jsonwebtoken dotenv     

npm install mongodb

npm install mongoose

npm install nodemon --save-dev   - or -   npm install -g nodemon --save-dev

node ->
require('crypto').randomBytes(64).toString('hex')        -  to get secreet tokens and place it in .env file

Nodemon run start        - to strat the aplication
