import pool from '../db/pool.js'

export const resolver = {

    Query: {
    
        posts: async (_, {options}) => {
            const page = options?.paginate?.page || 1

            const limit = options?.paginate?.limit || 10

            const offset = (page - 1) * limit

            const result = await pool.query(
                'SELECT * FROM posts LIMIT $1 OFFSET $2',[limit, offset]
            )

            return {data: result.rows}
            
        }, 

        post: async (_, {id}) => {
            const result = await pool.query(
                'SELECT * FROM posts  WHERE id= $1', [id]
            )

            return result.rows[0] //single row
        },

    },

    Mutation: {

        createPost: async (_, {input}) =>{
           
            const {title, body} = input

            const result = await pool.query(
                'INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING *',
                [title, body]
            )

            return result.rows[0] // return created post 
        }, 

        updatePost: async (_, {id, input})=>{
             const {title, body} = input

             const result = await pool.query(
                'UPDATE posts SET title =$1, body=$2 WHERE id = $3 RETURNING *',
                [title, body, id]
             )
             return result.rows[0]
        },

        

    }
}