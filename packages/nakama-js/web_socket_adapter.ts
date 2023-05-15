/**
 * Copyright 2020 The Nakama Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { decode, encode } from "base64-arraybuffer";
import { btoa } from "js-base64"

/**
 * An interface used by Nakama's web socket to determine the payload protocol.
 */
export interface WebSocketAdapter {

    /**
     * Dispatched when the web socket closes.
     */
    onClose : SocketCloseHandler | null;

    /**
     * Dispatched when the web socket receives an error.
     */
    onError : SocketErrorHandler | null;

    /**
     * Dispatched when the web socket receives a normal message.
     */
    onMessage : SocketMessageHandler | null;

    /**
     * Dispatched when the web socket opens.
     */
    onOpen : SocketOpenHandler | null;

    isOpen(): boolean;
    close() : void;
    connect(scheme: string, host: string, port : string, createStatus: boolean, token : string) : void;
    send(message: any) : void;
}

/**
 * SocketCloseHandler defines a lambda that handles WebSocket close events.
 */
export interface SocketCloseHandler {
    (this : WebSocket, evt: CloseEvent): void;
}

/**
 * SocketErrorHandler defines a lambda that handles responses from the server via WebSocket
 * that indicate an error.
 */
export interface SocketErrorHandler {
    (this : WebSocket, evt: Event): void;
}

/**
 * SocketMessageHandler defines a lambda that handles valid WebSocket messages.
 */
export interface SocketMessageHandler {
    (message: any): void;
}

/**
 * SocketOpenHandler defines a lambda that handles WebSocket open events.
 */
export interface SocketOpenHandler {
    (this : WebSocket, evt : Event) : void
}

/**
 * A text-based socket adapter that accepts and transmits payloads over UTF-8.
 */
export class WebSocketAdapterText implements WebSocketAdapter {
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

                if (message.match_data && message.match_data.data) {
                    message.match_data.data = new Uint8Array(decode(message.match_data.data));
                } else if (message.party_data && message.party_data.data) {
                    message.party_data.data = new Uint8Array(decode(message.party_data.data));
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

    isOpen(): boolean {
        return this._socket?.readyState == WebSocket.OPEN;
    }

    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void {
        const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}`;
        this._socket = new WebSocket(url);
    }

    close() {
        this._socket!.close();
        this._socket = undefined;
    }

    send(msg: any): void {
        if (msg.match_data_send) {
            // according to protobuf docs, int64 is encoded to JSON as string.
            msg.match_data_send.op_code = msg.match_data_send.op_code.toString();
            let payload = msg.match_data_send.data;
            if (payload && payload instanceof Uint8Array) {
                msg.match_data_send.data = encode(payload.buffer);
            } else if (payload) { // it's a string
                msg.match_data_send.data = btoa(payload);
            }
        } else if (msg.party_data_send) {
            // according to protobuf docs, int64 is encoded to JSON as string.
            msg.party_data_send.op_code = msg.party_data_send.op_code.toString();
            let payload = msg.party_data_send.data;
            if (payload && payload instanceof Uint8Array) {
                msg.party_data_send.data = encode(payload.buffer);
            } else if (payload) { // it's a string
                msg.party_data_send.data = btoa(payload);
            }
        }

        this._socket!.send(JSON.stringify(msg));
    }
}
