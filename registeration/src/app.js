require('dotenv').config();

const express=require('express');
const path=require('path');
const hbs=require('hbs');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const cookieParser=require('cookie-parser')
const auth=require("./middlewares/auth")

const app=express();

require('./db/conn');

const Register =require("./models/register");
const port=process.env.PORT || 3100;

const static_path=path.join(__dirname,"../public");
const template_path= path.join(__dirname,  '../templates/views' ); 
const partial_path= path.join(__dirname,  '../templates/partials' ); 

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


 app.get('/',(req,res)=>
 {
     res.render('index');
 });
 app.get('/register',(req,res)=>
 {
     res.render('register');
 });
 app.get('/login',(req,res)=>
 {
     res.render('login');
 });
  
 app.get("/secret", auth,(req, res)=>{
//  console.log( `this is the cookie awesome  ${req.cookies.jwt}`)
 res.render("secret")
 });

 app.get("/logout", auth, async(req, res) =>{
    try {
        req.user.tokens= req.user.tokens.filter((currElement) =>{
        return currElement.token = req.token
        });
        res.clearCookie("jwt");
        console.log("logout successfully")
        // await req.user.save();
        res.render("login");
     } catch (error) {
        res.status(500).send(error);
    }
} )
                                         
 app.post("/register", async (req, res) =>{
    try {
      const password = req.body.password;
      const cpassword = req.body.confirmpassword;
      if(password === cpassword)
      {
        const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email:req.body.email,
            gender:req.body.gender,
            phone:req.body.phone,
            age:req.body.age,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword
        });

        const token= await registerEmployee.generateAuthToken();
        // console.log(token);

        // The res.cookie() function is used to set the cookie name to value.
        // The value parameter may be a string or object converted to JSON.
        
         res.cookie("jwt", token,
         {
            expires:new Date(Date.now() + 30000),
            httponly:true,
            // secure:true,
        
         });
        // console.log(cookie);

        const registered = await registerEmployee.save();
         res.status(201).render('login');
      }
      else{
          res.send("password are not matching")
      }
     } catch (error) {
        res.status(400).send("mistake");
    }
});

app.post("/login", async(req, res) =>{
    try {
         const email = req.body.email;
         const password = req.body.password;
         const useremail = await Register.findOne({email:email});
         const isMatch= bcrypt.compare(password, useremail.password);
         const token= await useremail.generateAuthToken();
         // console.log(token);

         res.cookie("jwt", token ,{
            expires:new Date(Date.now() + 30000),
            httponly:true,
            // secure:true,
        });

         if(isMatch){
             res.status(201).sendFile(__dirname+'/index.html');
            // window.location.href="cart.html"
         }else{
            res.send("Invalid details");
    } 
}
     catch (error) {
        res.status(400).send("Invalid details")
    }
 });

 



 app.listen(port,()=>
 {
     console.log("server is running");
 })