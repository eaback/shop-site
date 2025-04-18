import mysql from "mysql2/promise"

interface InsertResult {
    insertId: number
    affectedRows: number
    [key: string]: unknown
}

export async function getConnection() {
    try {
        console.log("Creating database connection with params:", {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD ? "[REDACTED]" : "",
        database: process.env.DB_NAME || "ecommerce",
        })

        const pool = mysql.createPool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "ecommerce",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        })

        const connection = await pool.getConnection()
        console.log("Database connection successful")
        connection.release()

        return pool
    } catch (error) {
        console.error("Error creating database connection:", error)
        throw error
    }
}

export async function executeQuery<T>(query: string, params: (string | number)[] = []): Promise<T> {
    const connection = await getConnection()
    try {
        console.log("Executing query:", query)
        console.log("With params:", params)

        const [results] = await connection.execute(query, params)
        console.log("Query results:", results)

        return results as T
    } catch (error) {
        console.error("Database query error:", error)
        throw error
    }
}

export async function executeInsert(query: string, params: (string | number)[] = []): Promise<InsertResult> {
    const connection = await getConnection()
    try {
        console.log("Executing insert query:", query)
        console.log(
        "With params:",
        params.map((p, i) => (i === 3 ? "[HASHED PASSWORD]" : p)),
        )

        const [result] = await connection.execute(query, params)
        console.log("Insert result:", result)

        return result as unknown as InsertResult
    } catch (error) {
        console.error("Database insert error:", error)
        throw error
    }
}

