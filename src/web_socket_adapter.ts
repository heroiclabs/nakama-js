export interface WebSocketAdapter {
    // TODO return value as the adapter should totally wrap socket
    connect(scheme: string, host: string, port : string, createStatus: boolean, token : string) : WebSocket;
}