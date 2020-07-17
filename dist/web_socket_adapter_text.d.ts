import { WebSocketAdapter, SocketCloseHandler, SocketErrorHandler, SocketMessageHandler, SocketOpenHandler } from './web_socket_adapter';
export declare class WebSocketAdapterText implements WebSocketAdapter {
    private _isConnected;
    private _socket?;
    onClose: SocketCloseHandler | null;
    onError: SocketErrorHandler | null;
    onMessage: SocketMessageHandler | null;
    onOpen: SocketOpenHandler | null;
    readonly isConnected: boolean;
    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void;
    close(): void;
    send(msg: any): void;
}
