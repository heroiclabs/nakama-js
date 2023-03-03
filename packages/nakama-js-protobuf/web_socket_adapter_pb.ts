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

import { WebSocketAdapter, SocketCloseHandler, SocketErrorHandler, SocketMessageHandler, SocketOpenHandler } from "../nakama-js/web_socket_adapter"
import * as tsproto from "./rtapi/realtime"

/**
 * A protocol buffer socket adapter that accepts and transmits payloads using the protobuf binary wire format.
 */
export class WebSocketAdapterPb implements WebSocketAdapter {

    private _socket?: WebSocket;

    constructor() {
    }

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
                const buffer: ArrayBuffer = evt.data;
                const uintBuffer: Uint8Array = new Uint8Array(buffer);
                const envelope = tsproto.Envelope.decode(uintBuffer);

                if (envelope.channel_message) {
                    if (envelope.channel_message.code == undefined) {
                        //protobuf plugin does not default-initialize missing Int32Value fields
                        envelope.channel_message.code = 0;
                    }
                    if (envelope.channel_message.persistent == undefined) {
                        //protobuf plugin does not default-initialize missing BoolValue fields
                        envelope.channel_message.persistent = false;
                    }
                }

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

    get isOpen(): boolean {
        return this._socket?.readyState == WebSocket.OPEN;
    }

    close() {
        this._socket!.close();
        this._socket = undefined;
    }

    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void {
        const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}&format=protobuf`;
        this._socket = new WebSocket(url);
        this._socket.binaryType = "arraybuffer";
    }

    send(msg: any): void {

        if (msg.match_data_send) {
            let payload = msg.match_data_send.data;
            // can't send a string over protobuf
            if (typeof payload == "string") {
                msg.match_data_send.data = new TextEncoder().encode(payload);
            }
        } else if (msg.party_data_send) {
            let payload = msg.party_data_send.data;
            // can't send a string over protobuf
            if (typeof payload == "string") {
                msg.party_data_send.data = new TextEncoder().encode(payload);
            }
        }

        const envelopeWriter = tsproto.Envelope.encode(tsproto.Envelope.fromPartial(msg));
        const encodedMsg = envelopeWriter.finish();
        this._socket!.send(encodedMsg);
    }
}
