const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken');
const passport = require('passport');
const dbkey = require('../../setup/myurl');



//@type POST 
//$route /api/auth/
//@desc route for testing
//@access PUBLIC
router.get("/",(req,res)=>{
   res.json({name : "Auth page is here"});
})
//Import schema
const Person = require("../../models/person");
//@type POST 
//$route /api/auth/register
//@desc route for registration
//@access PUBLIC
router.post("/register",(req,res)=>{
   Person.findOne({email : req.body.email})
   .then((person)=>{
      if(person)
         return res.status(400).json({emilaerror : "User already register"});
      else{
         const newPerson = new Person({
            name : req.body.name,
            gender : req.body.gender,
            email : req.body.email,
            password : req.body.password
         })
         bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newPerson.password, salt, function(err, hash) {
                // Store hash in your password DB.
                newPerson.password = hash;
                newPerson.save()
                .then(person => {
                   res.render('login');
                })
                .catch(err=>console.log(err));
            });
        });

      }
   })
   .catch(err => console.log(err));
})

//@type POST 
//$route /api/auth/login
//@desc route for login
//@access PUBLIC
router.post("/login",(req,res)=>{
   const email = req.body.email;
   const password = req.body.password;

   Person.findOne({email})
   .then(person =>{
      if(!person){
         return res.status(400).json({emailerror : "User not found,please register"});
      }
      bcrypt.compare(password,person.password)
      .then(isCorrect =>{
         if(isCorrect){
            res.redirect('profile');
            console.log(isCorrect);
         }else{
            console.log(isCorrect);
         }
      })
      .catch(err => console.log(err));
       
   })
   .catch(err => console.log(err));
})

//@type POST 
//$route /api/auth/profile
//@desc route for profile
//@access PUBLIC
router.get("/profile",(req,res)=>{
   res.render('profile');
})
module.exports = router;