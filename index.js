import http from "http";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
});

async function checkDatabaseConnection() {
    try {
        const client = await pool.connect();
        console.log("✅ Banco de dados conectado com sucesso.");
        client.release();
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco:");
        console.error(error.message);
        process.exit(1);
    }
}

const server = http.createServer(async (req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    res.setHeader("Content-Type", "application/json");

    if (req.url !== "/api") {
        res.writeHead(404);
        return res.end(
            JSON.stringify({
                message: "Rota não encontrada"
            })
        );
    }

    try {
        const { rows } = await pool.query(
            "SELECT * FROM users LIMIT 1"
        );

        const user = rows[0];

        res.writeHead(200);

        res.end(
            JSON.stringify({
                database: true,
                userAdmin: user?.role === "admin",
                user: user?.name ?? null
            })
        );

    } catch (error) {
        console.error("Erro ao consultar banco:");
        console.error(error.message);

        res.writeHead(500);

        res.end(
            JSON.stringify({
                database: false,
                error: "Erro interno ao consultar o banco de dados."
            })
        );
    }
});

async function start() {
    await checkDatabaseConnection();

    server.listen(PORT, () => {
        console.log(`🚀 Servidor iniciado`);
        console.log(`🌐 http://localhost:${PORT}/api`);
    });
}

start();

process.on("SIGINT", async () => {
    console.log("\nEncerrando servidor...");

    await pool.end();

    console.log("Conexões com PostgreSQL encerradas.");

    process.exit(0);
});