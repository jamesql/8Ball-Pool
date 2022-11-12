import WebSocket from "ws";

Object.defineProperty(WebSocket.prototype, "sendAsync", {
    async value(this: Socket.SocketClient, d: any) {
		if (this.readyState !== WebSocket.OPEN) return;
        console.log(`[Socket] [Server>>Client] Sent OP Code >${d.op}< to ${this.props.username}`);
		return new Promise<void>((a, b) =>
			this.send(typeof d !== "string" ? JSON.stringify({
				...d,
				s: d.s ?? ++this.props.sequence
			}) : d, (e) => !e ? a() : b(e))
		);
	}
});