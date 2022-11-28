import { startServer } from "./handlers/setup";
import * as http from "http";

const server = http.createServer();

// start the server
export async function start() {
    let s = await startServer(server);

    server.listen(8080, "127.0.0.1", () => {
        console.log("[8Ball Pool] Server Started")
    });
}

export {server};