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
export declare class WebSocketAdapterText implements WebSocketAdapter {
    private _isConnected;
    private _socket?;
    get onClose(): SocketCloseHandler | null;
    set onClose(value: SocketCloseHandler | null);
    get onError(): SocketErrorHandler | null;
    set onError(value: SocketErrorHandler | null);
    get onMessage(): SocketMessageHandler | null;
    set onMessage(value: SocketMessageHandler | null);
    get onOpen(): SocketOpenHandler | null;
    set onOpen(value: SocketOpenHandler | null);
    get isConnected(): boolean;
    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void;
    close(): void;
    send(msg: any): void;
}
