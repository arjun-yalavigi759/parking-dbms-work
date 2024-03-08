import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
    schema: './src/db/schema.ts',
    out: './src/db/migrations/',
    driver: 'mysql2',
    dbCredentials: {
        host: process.env.DB_HOST!,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME!,
        port: parseInt(process.env.DB_PORT!),
    },
} satisfies Config;