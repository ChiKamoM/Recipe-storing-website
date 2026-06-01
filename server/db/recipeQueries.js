import pool from "./connection";
import pg from "pg"

export const recipeQueries = {
      getAllRecipes: async () =>{
            const reesult = await pool.query('SELECT recipe_name,recipe_difficulty')
      }
}

