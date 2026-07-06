import http from "http";
import { router } from "./routes/api.js";
import { pool } from "./config/database.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(router);

async function start() {
    try {
        await pool.query("SELECT NOW()");
        console.log("✅ Banco conectado.");

        server.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado na porta ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Erro ao iniciar a aplicação:");
        console.error(error.message);
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