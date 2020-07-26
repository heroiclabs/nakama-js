import { WebSocketAdapter, SocketCloseHandler, SocketErrorHandler, SocketMessageHandler, SocketOpenHandler } from './web_socket_adapter'
import * as protobuf from "./github.com/heroiclabs/nakama-common/rtapi/realtime"
export class WebSocketAdapterPb implements WebSocketAdapter {

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
                const buffer : ArrayBuffer = evt.data;
                const uintBuffer : Uint8Array = new Uint8Array(buffer);
                const envelopeProto = protobuf.Envelope.decode(uintBuffer);
                const envelope = protobuf.Envelope.toJSON(envelopeProto);
                value!(envelope);                
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

    close() {
        this._isConnected = false;
        this._socket!.close();
        this._socket = undefined;
    }

    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void {
        const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}&format=protobuf`;
        this._socket = new WebSocket(url);
        this._socket.binaryType = "arraybuffer";
        this._isConnected = true;
    }

    send(msg : any): void {

        const envelope = protobuf.Envelope.fromJSON(msg);
        const envelopeWriter = protobuf.Envelope.encode(envelope);
        const encodedMsg = envelopeWriter.finish();
        this._socket!.send(encodedMsg);
    }
}
