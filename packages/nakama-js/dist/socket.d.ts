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
interface ChannelJoin {
    channel_join: {
        target: string;
        type: number;
        persistence: boolean;
        hidden: boolean;
    };
}
interface ChannelLeave {
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
interface ChannelMessageSend {
    channel_message_send: {
        channel_id: string;
        content: any;
    };
}
interface ChannelMessageUpdate {
    channel_message_update: {
        channel_id: string;
        message_id: string;
        content: any;
    };
}
interface ChannelMessageRemove {
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
interface MatchmakerAdd {
    matchmaker_add: {
        min_count: number;
        max_count: number;
        query: string;
        string_properties?: Record<string, string>;
        numeric_properties?: Record<string, number>;
    };
}
interface MatchmakerRemove {
    matchmaker_remove: {
        ticket: string;
    };
}
export interface MatchmakerUser {
    presence: Presence;
    party_id: string;
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
interface CreateMatch {
    match_create: {};
}
interface JoinMatch {
    match_join: {
        match_id?: string;
        token?: string;
        metadata?: {};
    };
}
interface LeaveMatch {
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
interface MatchDataSend {
    match_data_send: RequireKeys<MatchData, "match_id" | "op_code" | "data">;
}
export interface Party {
    party_id: string;
    open: boolean;
    max_size: number;
    self: Presence;
    leader: Presence;
    presences: Presence[];
}
export interface PartyCreate {
    party_create: {
        open: boolean;
        max_size: number;
    };
}
interface PartyJoin {
    party_join: {
        party_id: string;
    };
}
interface PartyLeave {
    party_leave: {
        party_id: string;
    };
}
interface PartyPromote {
    party_promote: {
        party_id: string;
        presence: Presence;
    };
}
export interface PartyLeader {
    party_id: string;
    presence: Presence;
}
interface PartyAccept {
    party_accept: {
        party_id: string;
        presence: Presence;
    };
}
interface PartyClose {
    party_close: {
        party_id: string;
    };
}
export interface PartyData {
    party_id: string;
    presence: Presence;
    op_code: number;
    data: any;
}
interface PartyDataSend {
    party_data_send: {
        party_id: string;
        op_code: number;
        data: any;
    };
}
export interface PartyJoinRequest {
    party_id: string;
    presences: Presence[];
}
export interface PartyJoinRequestList {
    party_join_request_list: {
        party_id: string;
    };
}
interface PartyMatchmakerAdd {
    party_matchmaker_add: {
        party_id: string;
        min_count: number;
        max_count: number;
        query: string;
        string_properties?: Record<string, string>;
        numeric_properties?: Record<string, number>;
    };
}
interface PartyMatchmakerRemove {
    party_matchmaker_remove: {
        party_id: string;
        ticket: string;
    };
}
export interface PartyMatchmakerTicket {
    party_id: string;
    ticket: string;
}
export interface PartyPresenceEvent {
    party_id: string;
    joins: Presence[];
    leaves: Presence[];
}
interface PartyRemove {
    party_remove: {
        party_id: string;
        presence: Presence;
    };
}
interface Rpc {
    rpc: ApiRpc;
}
export interface Status {
    presences: Presence[];
}
interface StatusFollow {
    status_follow: {
        user_ids: string[];
    };
}
export interface StatusPresenceEvent {
    joins: Presence[];
    leaves: Presence[];
}
interface StatusUnfollow {
    status_unfollow: {
        user_ids: string[];
    };
}
interface StatusUpdate {
    status_update: {
        status?: string;
    };
}
export interface Socket {
    connect(session: Session, createStatus: boolean): Promise<Session>;
    disconnect(fireDisconnectEvent: boolean): void;
    acceptPartyMember(party_id: string, presence: Presence): Promise<void>;
    addMatchmaker(query: string, minCount: number, maxCount: number, stringProperties?: Record<string, string>, numericProperties?: Record<string, number>): Promise<MatchmakerMatched>;
    addMatchmakerParty(party_id: string, query: string, min_count: number, max_count: number, string_properties?: Record<string, string>, numericProperties?: Record<string, number>): Promise<void>;
    closeParty(party_id: string): Promise<void>;
    createMatch(): Promise<Match>;
    createParty(open: boolean, max_size: number): Promise<Party>;
    followUsers(user_ids: string[]): Promise<Status>;
    joinChat(target: string, type: number, persistence: boolean, hidden: boolean): Promise<Channel>;
    joinParty(party_id: string): Promise<void>;
    joinMatch(match_id?: string, token?: string, metadata?: {}): Promise<Match>;
    leaveChat(channel_id: string): Promise<void>;
    leaveMatch(matchId: string): Promise<void>;
    leaveParty(party_id: string): Promise<void>;
    listPartyJoinRequests(party_id: string): Promise<PartyJoinRequest>;
    promotePartyMember(party_id: string, party_member: Presence): Promise<PartyLeader>;
    removeChatMessage(channel_id: string, message_id: string): Promise<ChannelMessageAck>;
    removeMatchmaker(ticket: string): Promise<void>;
    removeMatchmakerParty(party_id: string, ticket: string): Promise<void>;
    removePartyMember(party_id: string, presence: Presence): Promise<void>;
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    sendMatchState(matchId: string, opCode: number, data: any, presence?: Presence[]): Promise<void>;
    sendPartyData(party_id: string, opcode: number, data: any): Promise<void>;
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
    onparty: (party: Party) => void;
    onpartyclose: (partyClose: PartyClose) => void;
    onpartydata: (partyData: PartyData) => void;
    onpartyjoinrequest: (partyJoinRequest: PartyJoinRequest) => void;
    onpartyleader: (partyLeader: PartyLeader) => void;
    onpartypresence: (partyPresence: PartyPresenceEvent) => void;
    onpartymatchmakerticket: (matchmakerMatched: PartyMatchmakerTicket) => void;
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
    onparty(party: Party): void;
    onpartyclose(): void;
    onpartyjoinrequest(partyJoinRequest: PartyJoinRequest): void;
    onpartydata(partyData: PartyData): void;
    onpartyleader(partyLeader: PartyLeader): void;
    onpartymatchmakerticket(partyMatched: PartyMatchmakerTicket): void;
    onpartypresence(partyPresence: PartyPresenceEvent): void;
    onstatuspresence(statusPresence: StatusPresenceEvent): void;
    onstreampresence(streamPresence: StreamPresenceEvent): void;
    onstreamdata(streamData: StreamData): void;
    send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | ChannelMessageRemove | CreateMatch | JoinMatch | LeaveMatch | MatchDataSend | MatchmakerAdd | MatchmakerRemove | PartyAccept | PartyClose | PartyCreate | PartyDataSend | PartyJoin | PartyJoinRequestList | PartyLeave | PartyMatchmakerAdd | PartyMatchmakerRemove | PartyPromote | PartyRemove | Rpc | StatusFollow | StatusUnfollow | StatusUpdate): Promise<any>;
    acceptPartyMember(party_id: string, presence: Presence): Promise<void>;
    addMatchmaker(query: string, min_count: number, max_count: number, string_properties?: Record<string, string>, numeric_properties?: Record<string, number>): Promise<MatchmakerMatched>;
    addMatchmakerParty(party_id: string, query: string, min_count: number, max_count: number, string_properties?: Record<string, string>, numeric_properties?: Record<string, number>): Promise<void>;
    closeParty(party_id: string): Promise<void>;
    createMatch(): Promise<Match>;
    createParty(open: boolean, max_size: number): Promise<Party>;
    followUsers(userIds: string[]): Promise<Status>;
    joinChat(target: string, type: number, persistence: boolean, hidden: boolean): Promise<Channel>;
    joinMatch(match_id?: string, token?: string, metadata?: {}): Promise<Match>;
    joinParty(party_id: string): Promise<void>;
    leaveChat(channel_id: string): Promise<void>;
    leaveMatch(matchId: string): Promise<void>;
    leaveParty(party_id: string): Promise<void>;
    listPartyJoinRequests(party_id: string): Promise<PartyJoinRequest>;
    promotePartyMember(party_id: string, party_member: Presence): Promise<PartyLeader>;
    removeChatMessage(channel_id: string, message_id: string): Promise<ChannelMessageAck>;
    removeMatchmaker(ticket: string): Promise<void>;
    removeMatchmakerParty(party_id: string, ticket: string): Promise<void>;
    removePartyMember(party_id: string, member: Presence): Promise<void>;
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    sendMatchState(matchId: string, opCode: number, data: any, presences?: Presence[]): Promise<void>;
    sendPartyData(party_id: string, op_code: number, data: any): Promise<void>;
    unfollowUsers(user_ids: string[]): Promise<void>;
    updateChatMessage(channel_id: string, message_id: string, content: any): Promise<ChannelMessageAck>;
    updateStatus(status?: string): Promise<void>;
    writeChatMessage(channel_id: string, content: any): Promise<ChannelMessageAck>;
}
export {};
