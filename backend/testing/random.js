const express = require ("express")
const app = express ()
app.use(express.json())
const cors = require ("cors")
const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")
const pool = require('./db')
const SECRET_KEY = "qwertyuiop"


app.post("/reg", async (req, res) => {
    const {name, password, email, age} = req.body
    try{
        if(!name || !password || !email || !age){
            return res.json("kate")
        }

        const hashedPsd = await bcrypt.hash(password, 10)

        const result = await pool.query('INSERT INTO users (name, password, email, age) VALUES ($1, $2, $3, $4)',
            [name, hashedPsd, email, age]
        )

        res.json("tirkeldi" + result)



    }catch(error){
        res.json(error)
    }


})

app.post('/', async (req, res)=>{
    const {password, email} = req.body
    
    try {
        const result = await pool.query("SELECT * FROM users where email=$1", [email])
        const user = await result.rows[0]
        const hashedPassword = await bcrypt.compare(password, user.password)

        if(!hashedPassword){
            return res.status(401).json({message: "parol qate"})
        }
        const token = jwt.sign ({id:user.id, email:user.email}, SECRET_KEY, {expiresIn:"10m"})
        res.send(token)
    } catch (error) {
        res.json(error)
    }
})







app.listen (3000,() => {
    console.log("server jumus istep tur")
})

