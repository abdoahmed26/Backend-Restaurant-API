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

export const connectDB = async()=>{
    try {
        await pool.connect();
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }
}

export default pool;