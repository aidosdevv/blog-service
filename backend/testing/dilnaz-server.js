const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const helmet=require('helmet')
const cors=require('cors')
const pool=require('./db')
const rateLimit = require('express-rate-limit');

const app=express()

app.use(express.json())
app.use(cors())
app.use(helmet())


const loginlimit=rateLimit({
    windowsMs:30000,
    max:3,
    message:{
        status:429,
        error:'Kop suranys zhazdynyz.Sizge 30s ban beryldy!'
    },
  standardHeaders: true,
  legacyHeaders: false,
})


app.post('/register',async(req,res)=>{
    const {username,email,password,is_enalable,address,price,quantity}=req.body
    const hashed = await bcrypt.hash(password, 10);

    try {
      await pool.query('INSERT INTO users(username,price,password,email,address,quantity,is_enalable)VALUES($1,$2,$3,$4,$5,$6,$7)',
      [username,price,hashed,email,address,quantity,is_enalable])
      res.json({ message: 'Тіркелу сәтті өтті' });
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Пайдаланушыны тіркеу кезінде қате болды' });
    }
  });

  

  app.listen(4000,()=>{
    console.log('Server is running')
  })

