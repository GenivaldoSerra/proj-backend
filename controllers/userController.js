import { getUserInfo } from "../services/userService.js";

export async function api(req, res) {

    try {

        const data = await getUserInfo();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(data));

    } catch (err) {

        res.writeHead(500);

        res.end(
            JSON.stringify({
                error: err.message
            })
        );

    }

}