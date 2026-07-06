import { api } from "../controllers/userController.js";

export async function router(req, res) {

    if (req.url === "/api") {
        return api(req, res);
    }

    res.writeHead(404);

    res.end("Not Found");
}