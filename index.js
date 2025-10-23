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

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));


let loggedIn = true;
let currentUser = 1
let recipes


app.listen(port, ()=>{
      console.log(`app running on localhost:${port}`)
})


app.get("/", async (req,res)=>{

      if(loggedIn){
            try {
                  let result = await db.query("SELECT recipe_id,recipe_name FROM recipes WHERE user_id = $1", [currentUser]);
                  if(result.rows.length > 0){
                        recipes = result.rows;
                        res.render("index.ejs",{recipes:recipes})
                        
                  }else{
                        res.render("index.ejs")
                  }                     
            } catch (error) {
                  
            }            
            
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
           for (let i = 0; i < steps.length; i++) {
                  result = await db.query("INSERT INTO instructions (instruction,recipe_id) VALUES($1, $2)",[steps[i], id]) 
            }
            console.log(steps)

            console.log("Recipe inserted successfully")
      } catch (error) {
            console.log("Error inputing recipe", error)
      }
 
      res.redirect("/")
})

app.post("/get_recipe/:id", async(req,res)=>{
      let recipeID = req.params.id
      try {
            const instructionsResult = await db.query("SELECT recipes.recipe_name, recipes.recipe_id, instructions.instruction,instructions.instruction_id FROM recipes INNER JOIN instructions on recipes.recipe_id = instructions.recipe_id WHERE instructions.recipe_id = $1 ORDER BY instructions.instruction_id", [recipeID])
            const instructions =  instructionsResult.rows

            const ingredientsResult = await db.query("SELECT recipes.recipe_name, ingredients.ingredient_name, ingredients.quantity, ingredients.ingredient_id FROM recipes INNER JOIN ingredients on recipes.recipe_id = ingredients.recipe_id WHERE ingredients.recipe_id = $1 ORDER BY ingredients.ingredient_id", [recipeID] )
            const ingredients = ingredientsResult.rows

            res.render("index.ejs", {instructions:instructions, ingredients:ingredients, recipes:recipes})
      } catch (error) {
            console.log(error)
      }
      
})

app.post("/edit", async (req,res)=>{
      console.log(req.body)
      const value = req.body.value;
      const table = req.body.table;
      const id = req.body.id;
      const column = req.body.column;
      let idCol

      if(table == "ingredients"){
            idCol = "ingredient_id"
      }else{
            idCol = "instruction_id"
      }
      console.log(value,table,id,column,idCol)
      const query = `UPDATE ${table} SET ${column} = $1 WHERE ${idCol} = $2`
      
      try {
            const result = await db.query(query,[value,id])
            console.log(result.rows)
            res.redirect("/")
      } catch (error) {
            console.log(error)
            res.send("error updating recipe")
      }


      
})

app.post("/delete", async (req,res) =>{
      console.log(req.body)
      res.redirect("/")
})