export interface WebSocketAdapter {
    
    onClose : SocketCloseHandler | null;
    onError : SocketErrorHandler | null;
    onMessage : SocketMessageHandler | null;
    onOpen : SocketOpenHandler | null;

    readonly isConnected: boolean;
    close() : void;
    connect(scheme: string, host: string, port : string, createStatus: boolean, token : string) : void;
    send(msg : any) : void;
}

export interface SocketCloseHandler {
    (this : WebSocket, evt: CloseEvent): void;
}

export interface SocketErrorHandler {
    (this : WebSocket, evt: Event): void;
}

export interface SocketMessageHandler {
    (message: any): void;
}

export interface SocketOpenHandler {
    (this : WebSocket, evt : Event) : void
}

export class WebSocketAdapterText implements WebSocketAdapter {

    private _isConnected: boolean = false;

    private _socket?: WebSocket;

    get onClose(): SocketCloseHandler | null {
        return this._socket!.onclose;
    }

    set onClose(value: SocketCloseHandler | null) {
        this._socket!.onclose = value;
    }

    get onError(): SocketErrorHandler | null {
        return this._socket!.onerror;
    }

    set onError(value: SocketErrorHandler | null) {
        this._socket!.onerror = value;
    }

    get onMessage(): SocketMessageHandler | null {
        return this._socket!.onmessage;
    }

    set onMessage(value: SocketMessageHandler | null) {

        if (value) {
            this._socket!.onmessage = (evt: MessageEvent) => {
                const message: any = JSON.parse(evt.data);                
                value!(message);
            };
        }
        else {
            value = null;
        }
    }

    get onOpen(): SocketOpenHandler | null {
        return this._socket!.onopen;
    }

    set onOpen(value: SocketOpenHandler | null) {
        this._socket!.onopen = value;
    }

    get isConnected(): boolean {
        return this._isConnected;
    }

    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void {
        const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}`;
        this._socket = new WebSocket(url);
        this._isConnected = true;
    }

    close() {
        this._isConnected = false;
        this._socket!.close();
        this._socket = undefined;
    }

    send(msg: any): void {
        if (msg.match_data_send)
        {
            // TODO document why this is necessary? 
            msg.match_data_send.op_code = msg.match_data_send.op_code.toString();
        }
        
        this._socket!.send(JSON.stringify(msg));
    }
}
