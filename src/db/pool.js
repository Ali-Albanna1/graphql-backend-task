import pg from 'pg'

const {Pool} = pg

import dotenv from 'dotenv'
dotenv.config();
const connectionString = process.env.DATABASE_URI

const pool = new pool({
     connectionString,
})


export default pool