const express = require("express");
const session = require('express-session')
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();
require('./routes/meta-auth.js') // For Facebook Auth

const app = express ();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbUri = process.env.ATLAS_URI;
mongoose.connect(dbUri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

/* 
    - If more API_End_Point files (routes) have been added in the routes folder, only need to make changes in this section
    - Currently, routers for only two routes have been set up
    - In the routers below, need to give path to the js file containing the routes/API_End_Points
*/

const usersRouter = require('./routes/users');
const interestRouter = require('./routes/interests');

app.use('/api', usersRouter);
app.use('/api', interestRouter);

//
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
app.use(passport.initialize());
app.use(passport.session());
app.get('/',(req,res)=>{
  res.send(`Hello world ${req.user.displayName}`)
})
app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
   res.redirect('/');
});

//
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})