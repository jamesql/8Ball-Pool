export {};

declare global {
        namespace Socket {
            type Server = import("ws").Server;
            type WebSocket = import("ws");
            
            interface SocketServer extends Server {
                clients: Set<SocketClient>;
            }

            interface SocketClient extends WebSocket {
                type: "client";
                authenticated: boolean;

                props: {
                    sequence: number;
                    lastHeartbeat: number;
                    username: String
                };

                sendAsync(data: any): Promise<void>;

            }
        }

        namespace Network {
            interface Lobby {
                host: Socket.SocketClient;
                player: Socket.SocketClient;
                isOpen: Boolean;
            }
        }
}