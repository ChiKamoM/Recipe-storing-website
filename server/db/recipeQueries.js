import pool from "./connection";
import pg from "pg"

export const recipeQueries = {
      getAllRecipes: async (userId) =>{
            const result = await pool.query('SELECT recipe_name,difficulty,recipe_id,preptime,cooktime,image_url FROM recipes WHERE user_id = $1',[userId]);
            return result.rows;
      },
      getRecipeDetails: async (recipeID) =>{
            const result = await pool.query('SELECT recipe_name,difficulty,recipe_id,preptime,cooktime,image_url FROM recipes WHERE recipe_id = $1', [recipeID]),
            return result.rows
      },
      getInstructions: async (recipeID) =>{
            const result = await pool.query('SELECT step_number,instruction FROM recipes WHERE recipe_id = $1', [recipeID]),
            return result.rows
      },
      getIngredients: async (recipeID)=>{
            const result = await pool.query('SELECT quantity FROM recipe_ingredients INNER JOIN ingredients ON recipe_ingredients_id =  ')
      }
}

