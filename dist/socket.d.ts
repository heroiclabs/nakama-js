import { ApiNotification, ApiRpc } from "./api.gen";
import { Session } from "./session";
export interface Channel {
    id: string;
    presences: [{}];
    self: {};
}
export interface ChannelJoin {
    target: string;
    type: number;
    persistence: boolean;
    hidden: boolean;
}
export interface ChannelLeave {
    channel_id: string;
}
export interface ChannelMessage {
    channel_id: string;
    message_id: string;
    code: number;
    sender_id: string;
    username: string;
    content: object;
    reference_id: string;
    create_time: string;
    update_time: string;
    persistent: boolean;
}
export interface ChannelMessageAck {
    channel_id: string;
    message_id: string;
    username: string;
    create_time: string;
    update_time: string;
    persistence: boolean;
}
export interface ChannelMessageSend {
    channel_id: string;
    content: object;
}
export interface ChannelMessageUpdate {
    channel_id: string;
    message_id: string;
    content: object;
}
export interface ChannelPresenceEvent {
    channel_id: string;
    joins: [{}];
    leaves: [{}];
}
export interface StreamData {
    stream: {};
    stream_presence: {};
    data: string;
}
export interface StreamPresenceEvent {
    stream: {};
    joins: [{}];
    leaves: [{}];
}
export interface MatchPresenceEvent {
    match_id: string;
    joins: [{}];
    leaves: [{}];
}
export interface CreateMatch {
    match_create: {};
}
export interface JoinMatch {
    match_join: {
        match_id: string;
        token: string;
    };
}
export interface LeaveMatch {
    match_leave: {
        match_id: string;
    };
}
export interface MatchData {
    match_data_send: {
        match_id: string;
        op_code: number;
        data: {};
        presence: [{}];
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
    onmatchdata: (matchData: MatchData) => void;
    onmatchpresence: (matchPresence: MatchPresenceEvent) => void;
    onstreampresence: (streamPresence: StreamPresenceEvent) => void;
    onstreamdata: (streamData: StreamData) => void;
    onchannelmessage: (channelMessage: ChannelMessage) => void;
    onchannelpresence: (channelPresence: ChannelPresenceEvent) => void;
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
    onmatchdata(matchData: MatchData): void;
    onmatchpresence(matchPresence: MatchPresenceEvent): void;
    onstreampresence(streamPresence: StreamPresenceEvent): void;
    onstreamdata(streamData: StreamData): void;
    onchannelmessage(channelMessage: ChannelMessage): void;
    onchannelpresence(channelPresence: ChannelPresenceEvent): void;
    send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | CreateMatch | JoinMatch | LeaveMatch | MatchData | Rpc): Promise<{}>;
}
