import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import 'dotenv/config';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';


const app = express()
const port = 3000;
const db = new pg.Client({
      user:process.env.PG_USER,
      host:process.env.PG_HOST,
      database:process.env.PG_DATABASE,
      password:process.env.PG_PASSWORD,
      port:process.env.PG_PORT
})
db.connect();
const saltRounds = 1

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended:true }));


let loggedIn = false;

app.listen(port, ()=>{
      console.log(`app running on localhost:${port}`)
})


app.get("/", (req,res)=>{

      if(loggedIn){
            res.render("index.ejs")
      }else{
            res.render("register.ejs")
      }
      
})

app.post("/register", async (req,res)=>{
      const {name,email, password} = req.body;
      let uuid = uuidv4().slice(0,4)
      try {
         let result = await db.query("SELECT * FROM users WHERE email = $1", [email])
         console.log(result.rows)
         if(result.rows < 1){
            const hash = await bcrypt.hash(password, saltRounds)
            result = await db.query("INSERT INTO users (uuid,name,email,password) VALUES ($1,$2,$3,$4)",[uuid,name,email,hash])
            console.log(result)
            loggedIn = true;
            res.redirect("/");
         } else{
            res.send("user already exists. Try logging in")
         }
         
      } catch (error) {
            console.log(error)
            res.redirect("/")
            
      }
})