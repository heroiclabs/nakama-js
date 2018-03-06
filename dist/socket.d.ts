import { ApiNotification, ApiRpc } from "./api.gen";
import { Session } from "./session";
export interface StreamData {
    stream: {};
    streamPresence: {};
    data: string;
}
export interface StreamPresenceEvent {
    stream: {};
    joins: [{}];
    leaves: [{}];
}
export interface CreateMatch {
    matchCreate: {};
}
export interface JoinMatch {
    matchJoin: {
        matchId: string;
        token: string;
    };
}
export interface Rpc {
    rpc: ApiRpc;
}
export interface Socket {
    connect(session: Session): Promise<Session>;
    disconnect(fireDisconnectEvent: boolean): void;
    ondisconnect: (evt: Event) => void;
    onnotification: (notification: ApiNotification) => void;
    onstreampresence: (streamPresence: StreamPresenceEvent) => void;
    onstreamdata: (streamData: StreamData) => void;
}
export interface SocketError {
    code: number;
    message: string;
}
export declare class DefaultSocket implements Socket {
    readonly host: string;
    readonly port: string;
    readonly useSSL: boolean;
    verbose: boolean;
    private socket?;
    private readonly cIds;
    constructor(host: string, port: string, useSSL?: boolean, verbose?: boolean);
    generatecid(): string;
    connect(session: Session): Promise<Session>;
    disconnect(fireDisconnectEvent?: boolean): void;
    ondisconnect(evt: Event): void;
    onnotification(notification: ApiNotification): void;
    onstreampresence(streamPresence: StreamPresenceEvent): void;
    onstreamdata(streamData: StreamData): void;
    send(message: CreateMatch | JoinMatch | Rpc): Promise<{}>;
}
