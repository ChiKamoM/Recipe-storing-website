//RECIPE QUERIES
      //CREATE RECIPE 
      //UPDATE RECIPE
      //DELETE RECIPE
      //READ RECIPES (BASED ON USER)

//USER QUERIES
      //REGISTER
      //LOGIN
      //LOGOUT
import pool from './connection';

const userQueries = {
      getAllUsers: async () =>{
            const result = await pool.query(
                  'SELECT * FROM users ORDER BY id'
            )
            return result.rows;
      },
      getUserByEmail: async (userEmail) =>{
            const result = await pool.query(
                'SELECT (uuid,name,password_hash) FROM users WHERE email = $1',[userEmail]  
            );
            
            return result.rows
      },
      newUser: async (userEmail,passwordHash,name,uuid) =>{
            const result = await pool.query('INSERT INTO ')
      }
        
}

export default userQueries