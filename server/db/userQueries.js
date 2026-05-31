//USER QUERIES
      //REGISTER
      //LOGIN
      //LOGOUT
import pool from './connection';
import pg from pg;

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
            const result = await pool.query('INSERT INTO users (email,password_hash,name,uuid) VALUES ($1,$2,$3,$4) RETURNING *',[userEmail,passwordHash,name,uuid]);
            return result.rows;
      }

        
}

export default userQueries