export interface WebSocketAdapter {
    onClose: SocketCloseHandler | null;
    onError: SocketErrorHandler | null;
    onMessage: SocketMessageHandler | null;
    onOpen: SocketOpenHandler | null;
    readonly isConnected: boolean;
    close(): void;
    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void;
    send(msg: any): void;
}
export interface SocketCloseHandler {
    (this: WebSocket, evt: CloseEvent): void;
}
export interface SocketErrorHandler {
    (this: WebSocket, evt: Event): void;
}
export interface SocketMessageHandler {
    (message: any): void;
}
export interface SocketOpenHandler {
    (this: WebSocket, evt: Event): void;
}
