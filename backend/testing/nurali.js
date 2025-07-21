const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const rateLimit = require("express-rate-limit")
const app = express()
app.use(express.json())
const SECRET_KEY = '129035AA'
app.use(helmet())
app.use(cors())

app.post('/register', async (req, res)=>{
    const {username, email, password, address} = req.body
    if(!username || !email || !password || !address){
        res.send('pustoi')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const result = await pool.query("insert into users(username, email, password, address) values($1, $2, $3 , $4)", [username, email, hashedPassword, address])
        
        res.json("sen tirkeldin")
    } catch (error) {
       console.log(error);
    }
})

const loginController = rateLimit ({
    windowMs: 10000,
    max: 3,
    message: 'kate',
    statusCode: 429
})


app.post('/login', loginController, async (req, res) => {
    const {username, password} = req.body
  
    if(!username || !password){
        return res.send("kate")
    }

    try{

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        if(!user){
            return res.json("user zhok")
        }

        const check = await bcrypt.compare(password, user.rows[0].password)
        if(!check){
            return('pasword -')
        }

        const token = jwt.sign({username: user.rows[0].username, }, SECRET_KEY, {expiresIn: '100h'})

        res.json("login is successful, " + token)

    }catch(error){
        console.log(error);
        
    }


} )

app.listen(3000, ()=>{
    console.log("server is running");
})