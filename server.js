console.log("hoi");
const express = require("express");
const app= express();
const fs= require("fs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// const crypto = require("crypto");
// console.log(crypto.randomBytes(64).toString('hex'));
console.log("env"+process.env.ACCESS_TOKEN_SECRET);

app.use(bodyParser.json());  
//app.use(bodyParser.urlencoded({ extended: true }));                                   

app.post("/login", (req, res) => {
    try{
        if (!req.body.name) {
            return res.status(400).send("Name is required");
        }
        if (req.body.name.length < 3) {
            return res.status(400).send("Name must be at least 3 characters long");
        }
        const user = req.body.name; // Example user object
        const token = jwt.sign({ user }, 'ACCESS_TOKEN_SECRET', { expiresIn: '1s' });
        res.json({ token });    
     }
    catch (error) {
        console.error("Error in /login:", error);
        res.status(500).send("Internal Server Error");
    }
});
// const cont = fs.readFileSync("example.txt");
// app.get("/", (req, res) => {
//     res.send(cont.toString());
// });
// fs.appendFileSync("example.txt", "New facts content");
//  app.get("/add", (req, res) => {
//      res.send(cont.toString());
//     });
// app.get("/send",(req,res) => {
//     res.send("Hello World");
// });
app.listen(process.env.PORT, (req,res) => { 
    //res.send("Hello World");   
    console.log("Server is running on port 3000");
});
