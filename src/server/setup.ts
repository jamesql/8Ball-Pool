import * as http from "http";
import * as ws from "ws";

export default async function startServer(): Promise<ws.WebSocketServer> {
    const s = new ws.Server();

    s.on("connection", require("./handlers/connection").default.bind(null, s));

    return s;
    
}