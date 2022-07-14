const express = require('express');
const app = express();
app.use(express.static('.'))
app.use(express.json())

const mysql = require('mysql2');

// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

// const conn = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"1234",
//     database:"db_order"
// })

app.listen('8080', () => {
    // conn.connect(err => {
    //     if(err){
    //         console.log(err);
    //     }

    //     console.log("connected");
    // })
})

const rootRouter = require('./routes/index')

app.use("/api", rootRouter)

//GET
// app.get("/api/getUser",(req,res)=> {
//     const sql = "SELECT * FROM users";

//     conn.query(sql,(error,result) => {
//         if(error){
//             res.status(500).send("Error")
//         }
//         res.status(200).send(result)
//     })
// })

// //GET ID
// app.get("/api/getUser/:id", (req,res)=> {
//     const {id} = req.params;
//     const sql = `SELECT * FROM users WHERE user_id = ${id}`;
    

//     conn.query(sql, (error,result) => {
//         if(error){
//             res.status(500).send("Error")
//         }

//         res.status(200).send(result)
//     })
// })

// //POST 
// app.post("/api/addUser", (req,res) => {
//     const {user_name,user_password,first_name,last_name,sdt,type_id} = req.body;

//     const sql = `INSERT INTO users (user_name,user_password,first_name,last_name,sdt,type_id) VALUES ('${user_name}','${user_password}','${first_name}','${last_name}','${sdt}',${type_id});`;

//     conn.query(sql, (error,result) => {
//         if(error){
//             res.status(500).send("Error")
//         }
//         res.status(200).send(result)
//     })
// })

// app.post("/api/login",(req,res)=> {
//     const {username,password} = req.body;
//     const sql = `SELECT * FROM users WHERE user_name = '${username}' AND user_password = '${password}'`;

//     conn.query(sql, (error,result) => {
//         if(error){
//             res.status(500).send(error)
//         }

//         if(result.length > 0){
//             res.status(200).send("Login success")
//         }else{
//             res.status(200).send("Login fail")
//         }
//     })
// })