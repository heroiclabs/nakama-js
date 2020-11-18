import { ApiRpc } from "./api.gen";
import { Session } from "./session";
import { Notification } from "./client";
import { WebSocketAdapter } from "./web_socket_adapter";
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
    presences: Presence[];
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
    addMatchmaker(query: string, minCount: number, maxCount: number, stringProperties?: Record<string, string>, numericProperties?: Record<string, number>): Promise<MatchmakerMatched>;
    createMatch(): Promise<Match>;
    followUsers(user_ids: string[]): Promise<Status>;
    joinChat(target: string, type: number, persistence: boolean, hidden: boolean): Promise<Channel>;
    joinMatch(match_id?: string, token?: string, metadata?: {}): Promise<Match>;
    leaveChat(channel_id: string): Promise<void>;
    leaveMatch(matchId: string): Promise<void>;
    removeChatMessage(channel_id: string, message_id: string): Promise<ChannelMessageAck>;
    removeMatchmaker(ticket: string): Promise<void>;
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    sendMatchState(matchId: string, opCode: number, data: any, presence?: Presence[]): Promise<void>;
    unfollowUsers(user_ids: string[]): Promise<void>;
    updateChatMessage(channel_id: string, message_id: string, content: any): Promise<ChannelMessageAck>;
    updateStatus(status?: string): Promise<void>;
    writeChatMessage(channel_id: string, content: any): Promise<ChannelMessageAck>;
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
    readonly adapter: WebSocketAdapter;
    private readonly cIds;
    private nextCid;
    constructor(host: string, port: string, useSSL?: boolean, verbose?: boolean, adapter?: WebSocketAdapter);
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
    addMatchmaker(query: string, minCount: number, maxCount: number, stringProperties?: Record<string, string>, numericProperties?: Record<string, number>): Promise<MatchmakerMatched>;
    createMatch(): Promise<Match>;
    followUsers(userIds: string[]): Promise<Status>;
    joinChat(target: string, type: number, persistence: boolean, hidden: boolean): Promise<Channel>;
    joinMatch(match_id?: string, token?: string, metadata?: {}): Promise<Match>;
    leaveChat(channel_id: string): Promise<void>;
    leaveMatch(matchId: string): Promise<void>;
    removeChatMessage(channel_id: string, message_id: string): Promise<ChannelMessageAck>;
    removeMatchmaker(ticket: string): Promise<void>;
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    sendMatchState(matchId: string, opCode: number, data: any, presences?: Presence[]): Promise<void>;
    unfollowUsers(user_ids: string[]): Promise<void>;
    updateChatMessage(channel_id: string, message_id: string, content: any): Promise<ChannelMessageAck>;
    updateStatus(status?: string): Promise<void>;
    writeChatMessage(channel_id: string, content: any): Promise<ChannelMessageAck>;
}
export {};
