
const express=require('express');

const router=express.Router();

const {Accounts}=require('../models')

const bcrypt=require('bcrypt');

const { sign }=require('jsonwebtoken');

router.post("/login", async (req, res) => {
     const { username, password } = req.body;
 
     const user = await Accounts.findOne({ where: { username: username } });
 
     if (!user) {
         return res.json({ error: "User does not exist" });
     }
 
     bcrypt.compare(password, user.password).then((match) => {
         if (!match) return res.json({ error: "Wrong username and password combination" });
 
         const accessToken = sign({ username: user.username, id: user.id }, "importantSecret");
 
         res.json(accessToken);
     });
 });

router.post("/", async (req,res)=>{


    const {username, password}=req.body;
    bcrypt.hash(password, 10).then((hash)=>{

         Accounts.create({
            username:username,
            password:hash,
         });

    })
    
    

    res.json("Account added with succes");
    
    


});






module.exports=router

