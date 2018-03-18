'use strict';
const express = require('express');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client : 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'postgres'
    }
});

const app = express();

app.use(cors());
app.use(express.json());

app.post('/signin',signin.handleSignIn(db,bcrypt));
app.post('/register',(req,res) => register.handleRegister(req,res,db,bcrypt));
app.get('/profile/:id',(req, res) => profile.handleProfile(req,res,db));
app.put('/image',(req, res) => image.handleImage(req,res,db));
app.post('/imageurl',(req, res) => image.handleApiCall(req, res));

const port = process.env.PORT || 4000;
app.listen(port,() => console.log(`app is running on port : ${port}`));