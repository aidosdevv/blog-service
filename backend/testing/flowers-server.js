const express = require("express")
const pool = require("./db")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const helmet = require("helmet")
const app = express()
app.use(express.json())


app.post("/register", async(req,res) => {
    const{username, age, password, email, gender} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    try{
        const result = await pool.query('insert into users(username, age, password, email, gender)Values($1, $2, $3, $4, $5)', [username, age, hashedPassword, email, gender])
        res.send("Saqtaldi!")
    }catch(error){
        console.log(error)
        res.status(400).send("Qate bar!")
    }
})

app.listen (3000,() => {
    console.log("server jumus istep tur")
})




