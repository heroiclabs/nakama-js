import { ApiRpc } from "./api.gen";
import { Session } from "./session";
import { Notification } from "./client";
export interface Channel {
    id: string;
    presences: [{}];
    self: {};
}
export interface ChannelJoin {
    channel_join: {
        target: string;
        type: number;
        persistence: boolean;
        hidden: boolean;
    };
}
export interface ChannelLeave {
    channel_leave: {
        channel_id: string;
    };
}
export interface ChannelMessage {
    channel_id: string;
    message_id: string;
    code: number;
    sender_id: string;
    username: string;
    content: {};
    create_time: string;
    update_time: string;
    persistent: boolean;
}
export interface ChannelMessageAck {
    channel_id: string;
    message_id: string;
    code: number;
    username: string;
    create_time: string;
    update_time: string;
    persistence: boolean;
}
export interface ChannelMessageSend {
    channel_message_send: {
        channel_id: string;
        content: {};
    };
}
export interface ChannelMessageUpdate {
    channel_message_update: {
        channel_id: string;
        message_id: string;
        content: {};
    };
}
export interface ChannelMessageRemove {
    channel_message_remove: {
        channel_id: string;
        message_id: string;
    };
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
export interface MatchmakerAdd {
    matchmaker_add: {
        min_count: number;
        max_count: number;
        query: string;
        string_properties: {};
        numeric_properties: {};
    };
}
export interface MatchmakerRemove {
    matchmaker_remove: {
        ticket: string;
    };
}
export interface MatchmakerMatched {
    ticket: string;
    match_id: string;
    token: string;
    users: [{}];
    self: {};
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
export interface Status {
    presences: object;
}
export interface StatusFollow {
    user_ids: Array<string>;
}
export interface StatusPresenceEvent {
    joins: [{}];
    leaves: [{}];
}
export interface StatusUnfollow {
    user_ids: Array<string>;
}
export interface StatusUpdate {
    status: string;
}
export interface Socket {
    connect(session: Session, createStatus: boolean): Promise<Session>;
    disconnect(fireDisconnectEvent: boolean): void;
    ondisconnect: (evt: Event) => void;
    onerror: (evt: Event) => void;
    onnotification: (notification: Notification) => void;
    onmatchdata: (matchData: MatchData) => void;
    onmatchpresence: (matchPresence: MatchPresenceEvent) => void;
    onmatchmakermatched: (matchmakerMatched: MatchmakerMatched) => void;
    onstatuspresence: (statusPresence: StatusPresenceEvent) => void;
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
    connect(session: Session, createStatus?: boolean): Promise<Session>;
    disconnect(fireDisconnectEvent?: boolean): void;
    ondisconnect(evt: Event): void;
    onerror(evt: Event): void;
    onchannelmessage(channelMessage: ChannelMessage): void;
    onchannelpresence(channelPresence: ChannelPresenceEvent): void;
    onnotification(notification: Notification): void;
    onmatchdata(matchData: MatchData): void;
    onmatchpresence(matchPresence: MatchPresenceEvent): void;
    onmatchmakermatched(matchmakerMatched: MatchmakerMatched): void;
    onstatuspresence(statusPresence: StatusPresenceEvent): void;
    onstreampresence(streamPresence: StreamPresenceEvent): void;
    onstreamdata(streamData: StreamData): void;
    send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | ChannelMessageRemove | CreateMatch | JoinMatch | LeaveMatch | MatchData | MatchmakerAdd | MatchmakerRemove | Rpc | StatusFollow | StatusUnfollow | StatusUpdate): Promise<{}>;
}
