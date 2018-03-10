'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Hardcoded variable data for now
const database = {
    users: [
        {
            id : '124',
            name : 'John',
            email : 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id : '125',
            name : 'Sally',
            email : 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id: '987',
            hash: '',
            email : 'john@gmail.com'
        }
    ]
}

/*GET REQUEST FOR THE ROOT ROUTE*/
app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/login', (req, res) => {
    const {email,password} = req.body;
    /*Compare the entered password with the hashed database one*/ 
    bcrypt.compare(password,database.login[0].hash,(err,result)=>{
        if(err){
            res.json('Passwords do not match');
        }
        res.json('Follow the code....Passwords match');
    });
    database.users.forEach(user => {
        if(user.email === email && user.password === password){
            //allow login
            res.status(200).json('You are now login');
        }
        else{
            res.status(400).json('Error logging in');
        }
    });
});

app.post('/register', (req, res) => {
    /*Create a new user*/
    const {name,email,password} = req.body;
    /*Hash the password before storing it to the database*/ 
    bcrypt.hash(password,null,null,(err,hash) => {
        console.log(hash);
        database.login[0].hash = hash;
    });
    database.users.push({id: '126',name,email,password,entries:0,joined: new Date()});
    console.log(database.users);
    res.json(database.users[database.users.length - 1]);
});

//profile/:id GET request for user's homepage

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    });
    if(!found){
        res.status(404).json('No such user...NOT FOUND!');
    }
});

app.put('/image',(req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries += 1;
            return res.json(user.entries);
        }
    });
    if(!found){
        res.status(404).json('No such user found!!');
    }
});



const port = process.env.PORT || Math.floor(Math.random() * 10000) + 1;
app.listen(port, () => console.log(`Server running on port : ${port}`));