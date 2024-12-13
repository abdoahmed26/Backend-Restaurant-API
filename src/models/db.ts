import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const pool = new Pool({
    user:process.env.DB_USER,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:+(process.env.DB_PORT as string),
})

export default pool;