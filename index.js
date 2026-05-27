import express from "express";
import bodyParser from "body-parser";


import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';



const app = express()
const port = 3000;








app.listen(port, ()=>{
      console.log(`app running on localhost:${port}`)
})



