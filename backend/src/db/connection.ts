import 'dotenv/config'
import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2"
import * as schema from "./schema"

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT!),
    password: process.env.DB_PASSWORD,
})
 
export const db = drizzle(connection, {
    schema,
    mode: "default"
})