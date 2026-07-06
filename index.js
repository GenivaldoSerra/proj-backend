import http from "http";
import { router } from "./routes/api.js";
import { pool } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function start() {

    await pool.query("SELECT NOW()");

    console.log("Banco conectado.");

    http.createServer(router)
        .listen(PORT, () => {

            console.log(`Servidor iniciado na porta ${PORT}`);

        });

}

start();