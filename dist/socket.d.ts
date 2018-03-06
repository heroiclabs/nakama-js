import { ApiNotification, ApiRpc } from "./api.gen";
import { Session } from "./session";
export interface CreateMatch {
    matchCreate: {};
}
export interface Rpc {
    rpc: ApiRpc;
}
export interface Socket {
    connect(session: Session): Promise<Session>;
    disconnect(fireDisconnectEvent: boolean): void;
    ondisconnect: (evt: Event) => void;
    onnotification: (notification: ApiNotification) => void;
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
    send(message: CreateMatch | Rpc): Promise<{}>;
}
