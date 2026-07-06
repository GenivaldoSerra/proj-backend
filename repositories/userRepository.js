import { pool } from "../config/database.js";

export async function getFirstUser() {
    const { rows } = await pool.query(
        "SELECT * FROM users LIMIT 1"
    );

    return rows[0];
}