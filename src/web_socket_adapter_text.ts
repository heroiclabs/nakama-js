import { WebSocketAdapter, SocketCloseHandler, SocketErrorHandler, SocketMessageHandler, SocketOpenHandler } from './web_socket_adapter'

import { b64EncodeUnicode } from "./utils";
import { ApiNotification } from './api.gen';

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
                if (message.notifications) {
                    message.notifications.notifications.forEach((n: ApiNotification) => {
                        n.content = n.content ? JSON.parse(n.content) : undefined;
                    });
                }

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

        if (msg.match_data_send) {
            msg.match_data_send.data = b64EncodeUnicode(JSON.stringify(msg.match_data_send.data));
            msg.match_data_send.op_code = msg.match_data_send.op_code.toString();
        }

        if (msg.channel_message_send) {
            msg.channel_message_send.content = JSON.stringify(msg.channel_message_send.content);
        } else if (msg.channel_message_update) {
            msg.channel_message_update.content = JSON.stringify(msg.channel_message_update.content);
        }

        this._socket!.send(JSON.stringify(msg));
    }
}