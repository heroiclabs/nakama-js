import { WebSocketAdapter, SocketCloseHandler, SocketErrorHandler, SocketMessageHandler, SocketOpenHandler } from './web_socket_adapter';
export declare class WebSocketAdapterPb implements WebSocketAdapter {
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
