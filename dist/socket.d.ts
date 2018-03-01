import { ApiNotification } from "./api.gen";
import { Session } from "./session";
export interface SocketError {
    code: number;
    message: string;
}
export interface Socket {
    connect(session: Session): Promise<Session>;
    disconnect(fireDisconnectEvent: boolean): void;
    ondisconnect: (evt: Event) => void;
    onnotification: (notification: ApiNotification) => void;
}
export declare class DefaultSocket implements Socket {
    readonly session: Session;
    readonly host: string;
    readonly port: string;
    readonly useSSL: boolean;
    verbose: boolean;
    private socket?;
    private readonly cIds;
    constructor(session: Session, host: string, port: string, useSSL?: boolean, verbose?: boolean);
    generatecid(): string;
    connect(session?: Session): Promise<Session>;
    disconnect(fireDisconnectEvent?: boolean): void;
    ondisconnect(evt: Event): void;
    onnotification(notification: ApiNotification): void;
    send(message: any): Promise<{}>;
}
