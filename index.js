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





app.listen(port, ()=>{
      console.log(`app running on localhost:${port}`)
})



app.post("/register", async (req,res)=>{})




app.post("/login", async (req,res)=>{})

app.post("/new-recipe", async (req,res)=>{})


app.post("/get_recipe/:id", async(req,res)=>{})

app.post("/edit", async (req,res)=>{})

app.post("/delete", async (req,res) =>{})



app.post("/logout", (req,res)=>{})