const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const ejs = require('ejs');
const passport = require("passport"); 


const app = express();
//bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const question = require("./routes/api/questions");

//Middle ware
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


//mongoDB configuration
const db = require('./setup/myurl').mongoURL

//attemp to connect to databse
mongoose.connect(db ,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('MongoDB connected successfully'))
.catch((err)=>console.log(err));

//Passport middleware
app.use(passport.initialize());

//config for JWT strategy
require("./strategies/jsonwtStrategies")(passport);

//server conection
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is running at ${port}`);
})

//actual route
app.get("/",(req,res)=>{
    res.render('register');
})
app.get("/login",(req,res)=>{
    res.render('login');
})


app.use("/api/auth",auth);
app.use("/api/profile",profile);
app.use("/api/questions",question);
app.use("/api/auth/register",auth);


// app.get("/",(req,res)=>{
//     res.send("hello sourav");
// })

