import pg from 'pg'

const {Pool} = pg

import dotenv from 'dotenv'
dotenv.config();
const connectionString = process.env.DATABASE_URI

const pool = new Pool({
     connectionString,
})

pool.connect()
  .then(() => console.log('Database connected successfully ✅'))
  .catch((err) => console.error('Database connection failed ❌', err))

export default pool