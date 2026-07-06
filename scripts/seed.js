import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedsDir = path.join(__dirname, "..", "db", "seeds");

async function runSeeds() {
    try {
        const files = fs
            .readdirSync(seedsDir)
            .filter(file => file.endsWith(".sql"))
            .sort();

        for (const file of files) {
            console.log(`🌱 Executando seed: ${file}`);

            const sql = fs.readFileSync(
                path.join(seedsDir, file),
                "utf8"
            );

            await pool.query(sql);

            console.log(`✅ Seed ${file} executado.`);
        }

        console.log("🎉 Todos os seeds foram executados.");

    } catch (error) {
        console.error("❌ Erro ao executar seeds:");
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

runSeeds();