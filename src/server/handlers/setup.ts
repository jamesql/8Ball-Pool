/// <reference path="../../util/@types/global.d.ts" />

import * as http from "http";
import * as ws from "ws";

export async function startServer(s: http.Server): Promise<ws.WebSocketServer> {
    const x = new ws.Server({
        server:s
    });

    x.on("connection", require("./connection").default.bind(null, s));

    return x;
    
}