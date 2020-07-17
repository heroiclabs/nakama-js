import {WebSocketAdapter} from './web_socket_adapter'

export class WebSocketAdapterText implements WebSocketAdapter {
    
    constructor() {

    }

    connect(scheme: string, host: string, port : string, createStatus: boolean, token : string): WebSocket {
        const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}`;
        return new WebSocket(url);
    }
}