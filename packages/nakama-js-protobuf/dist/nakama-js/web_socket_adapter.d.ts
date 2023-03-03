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
/**
 * An interface used by Nakama's web socket to determine the payload protocol.
 */
export interface WebSocketAdapter {
    /**
     * Dispatched when the web socket closes.
     */
    onClose: SocketCloseHandler | null;
    /**
     * Dispatched when the web socket receives an error.
     */
    onError: SocketErrorHandler | null;
    /**
     * Dispatched when the web socket receives a normal message.
     */
    onMessage: SocketMessageHandler | null;
    /**
     * Dispatched when the web socket opens.
     */
    onOpen: SocketOpenHandler | null;
    isOpen(): boolean;
    close(): void;
    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void;
    send(message: any): void;
}
/**
 * SocketCloseHandler defines a lambda that handles WebSocket close events.
 */
export interface SocketCloseHandler {
    (this: WebSocket, evt: CloseEvent): void;
}
/**
 * SocketErrorHandler defines a lambda that handles responses from the server via WebSocket
 * that indicate an error.
 */
export interface SocketErrorHandler {
    (this: WebSocket, evt: Event): void;
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
    (this: WebSocket, evt: Event): void;
}
/**
 * A text-based socket adapter that accepts and transmits payloads over UTF-8.
 */
export declare class WebSocketAdapterText implements WebSocketAdapter {
    private _socket?;
    get onClose(): SocketCloseHandler | null;
    set onClose(value: SocketCloseHandler | null);
    get onError(): SocketErrorHandler | null;
    set onError(value: SocketErrorHandler | null);
    get onMessage(): SocketMessageHandler | null;
    set onMessage(value: SocketMessageHandler | null);
    get onOpen(): SocketOpenHandler | null;
    set onOpen(value: SocketOpenHandler | null);
    isOpen(): boolean;
    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void;
    close(): void;
    send(msg: any): void;
}
