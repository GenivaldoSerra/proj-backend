import http from "http";
import { router } from "./routes/api.js";
import { pool } from "./config/database.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(router);

async function start() {
    try {
        console.log("🔄 Validando conexão com o banco de dados...");

        await pool.query("SELECT NOW()");

        console.log("✅ Banco de dados conectado.");

        server.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado na porta ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Falha ao iniciar a aplicação.");
        console.error(`Motivo: ${error.message}`);

        await pool.end().catch(() => {});

        process.exit(1);
    }
}

process.on("SIGINT", async () => {
    console.log("\n🛑 Recebido SIGINT. Encerrando aplicação...");

    try {
        await pool.end();
        console.log("✅ Pool de conexões encerrado.");
    } catch (error) {
        console.error("Erro ao encerrar pool:", error.message);
    }

    server.close(() => {
        console.log("✅ Servidor HTTP encerrado.");
        process.exit(0);
    });
});

start();