import { ApiRpc } from "./api.gen";
import { Session } from "./session";
import { Notification } from "./client";
declare type RequireKeys<T, K extends keyof T> = Omit<Partial<T>, K> & Pick<T, K>;
export interface Presence {
    user_id: string;
    session_id: string;
    username: string;
    node: string;
}
export interface Channel {
    id: string;
    presences: Presence[];
    self: Presence;
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
    content: any;
    create_time: string;
    update_time: string;
    persistent: boolean;
    group_id: string;
    room_name: string;
    user_id_one: string;
    user_id_two: string;
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
        content: any;
    };
}
export interface ChannelMessageUpdate {
    channel_message_update: {
        channel_id: string;
        message_id: string;
        content: any;
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
    joins: Presence[];
    leaves: Presence[];
}
export interface StreamId {
    mode: number;
    subject: string;
    descriptor: string;
    label: string;
}
export interface StreamData {
    stream: StreamId;
    stream_presence: Presence;
    data: string;
}
export interface StreamPresenceEvent {
    stream: StreamId;
    joins: Presence[];
    leaves: Presence[];
}
export interface MatchPresenceEvent {
    match_id: string;
    joins: Presence[];
    leaves: Presence[];
}
export interface MatchmakerAdd {
    matchmaker_add: {
        min_count: number;
        max_count: number;
        query: string;
        string_properties?: Record<string, string>;
        numeric_properties?: Record<string, number>;
    };
}
export interface MatchmakerRemove {
    matchmaker_remove: {
        ticket: string;
    };
}
export interface MatchmakerUser {
    presence: Presence;
    string_properties?: Record<string, string>;
    numeric_properties?: Record<string, number>;
}
export interface MatchmakerMatched {
    ticket: string;
    match_id: string;
    token: string;
    users: MatchmakerUser[];
    self: MatchmakerUser;
}
export interface Match {
    match_id: string;
    authoritative: boolean;
    label?: string;
    size: number;
    presences: Presence[];
    self: Presence;
}
export interface CreateMatch {
    match_create: {};
}
export interface JoinMatch {
    match_join: {
        match_id?: string;
        token?: string;
        metadata?: {};
    };
}
export interface LeaveMatch {
    match_leave: {
        match_id: string;
    };
}
export interface MatchData {
    match_id: string;
    op_code: number;
    data: any;
    presence: Presence;
}
export interface MatchDataSend {
    match_data_send: RequireKeys<MatchData, "match_id" | "op_code" | "data">;
}
export interface Rpc {
    rpc: ApiRpc;
}
export interface Status {
    presences: Presence[];
}
export interface StatusFollow {
    status_follow: {
        user_ids: string[];
    };
}
export interface StatusPresenceEvent {
    joins: Presence[];
    leaves: Presence[];
}
export interface StatusUnfollow {
    status_unfollow: {
        user_ids: string[];
    };
}
export interface StatusUpdate {
    status_update: {
        status?: string;
    };
}
export interface Socket {
    connect(session: Session, createStatus: boolean): Promise<Session>;
    disconnect(fireDisconnectEvent: boolean): void;
    send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | ChannelMessageRemove | CreateMatch | JoinMatch | LeaveMatch | MatchDataSend | MatchmakerAdd | MatchmakerRemove | Rpc | StatusFollow | StatusUnfollow | StatusUpdate): Promise<any>;
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
    private nextCid;
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
    send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | ChannelMessageRemove | CreateMatch | JoinMatch | LeaveMatch | MatchDataSend | MatchmakerAdd | MatchmakerRemove | Rpc | StatusFollow | StatusUnfollow | StatusUpdate): Promise<any>;
}
export {};
