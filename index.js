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
let currentUser

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
            res.render("login.ejs");
         } else{
            res.send("user already exists. Try logging in")
         }
         
      } catch (error) {
            console.log(error)
            res.redirect("/")
            
      }
})

app.get("/login", (req,res)=>{
      res.render("login.ejs")
})

app.post("/login", async (req,res)=>{
    
      try {
            const {email, password} = req.body;
            let result = await db.query("SELECT * FROM users WHERE email = $1",[email])
            const user = result.rows[0];
            if(result.rows.length > 0){
                  bcrypt.compare(password,user.password, (err, check)=>{
                        if(err){
                              console.log("Error comparing password", err)
                        } else{
                              if(check){
                                    console.log(user.id)
                                    loggedIn = true
                                    currentUser = user.id
                                    console.log(currentUser)
                                    res.redirect("/")
                              }else{
                                    res.send("incorrect password")
                              }
                        }
                  })
            }else{
                  res.send("user not found")
            }     
      } catch (error) {
        console.log(error)      
      }


})

app.post("/new-recipe", async (req,res)=>{
      let {name,type,ingredients, quantity,steps} = req.body;
      console.log(`("INSERT INTO recipes (recipe_name,user_id,dish_type) VALUES (${name},${currentUser},${type})`)
      let id
      try {            
            let result = await db.query ("INSERT INTO recipes (recipe_name,user_id,dish_type) VALUES ($1,$2,$3) RETURNING recipe_id",[name,currentUser,type])

            id = result.rows[0].recipe_id

            for (let i = 0; i < ingredients.length; i++) {
                  result = await db.query("INSERT INTO ingredients (ingredient_name, recipe_id, quantity) VALUES($1,$2,$3)",[ingredients[i],id,quantity[i]])               
            }
            // result = await db.query("INSERT INTO instructions (instruction,recipe_id) VALUES($1, $2)",[steps[i], id])
           
            steps.foreach(async step =>{
                  result = await db.query("INSERT INTO instructions (instruction,recipe_id) VALUES($1, $2)",[step, id]) 
            })   

            console.log("Recipe inserted successfully")
      } catch (error) {
            console.log("Error inputing recipe", error)
      }
 
      res.redirect("/")
})