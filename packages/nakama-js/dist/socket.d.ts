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
import { ApiRpc } from "./api.gen";
import { Session } from "./session";
import { Notification } from "./client";
import { WebSocketAdapter } from "./web_socket_adapter";
/** Requires the set of keys K to exist in type T. */
declare type RequireKeys<T, K extends keyof T> = Omit<Partial<T>, K> & Pick<T, K>;
export interface Presence {
    user_id: string;
    session_id: string;
    username: string;
    node: string;
}
/** A response fron a channel join operation. */
export interface Channel {
    id: string;
    presences: Presence[];
    self: Presence;
}
/** Join a realtime chat channel. */
interface ChannelJoin {
    channel_join: {
        target: string;
        type: number;
        persistence: boolean;
        hidden: boolean;
    };
}
/** Leave a realtime chat channel. */
interface ChannelLeave {
    channel_leave: {
        channel_id: string;
    };
}
/** An incoming message on a realtime chat channel. */
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
/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
    channel_id: string;
    message_id: string;
    code: number;
    username: string;
    create_time: string;
    update_time: string;
    persistence: boolean;
}
/** Send a message to a realtime chat channel. */
interface ChannelMessageSend {
    channel_message_send: {
        channel_id: string;
        content: any;
    };
}
/** Update a message previously sent to a realtime chat channel. */
interface ChannelMessageUpdate {
    channel_message_update: {
        channel_id: string;
        message_id: string;
        content: any;
    };
}
/** Remove a message previously sent to a realtime chat channel. */
interface ChannelMessageRemove {
    channel_message_remove: {
        channel_id: string;
        message_id: string;
    };
}
/** Presence update for a particular realtime chat channel. */
export interface ChannelPresenceEvent {
    channel_id: string;
    joins: Presence[];
    leaves: Presence[];
}
/** Stream identifier */
export interface StreamId {
    mode: number;
    subject: string;
    descriptor: string;
    label: string;
}
/** Stream data. */
export interface StreamData {
    stream: StreamId;
    stream_presence: Presence;
    data: string;
}
/** Presence updates. */
export interface StreamPresenceEvent {
    stream: StreamId;
    joins: Presence[];
    leaves: Presence[];
}
/** Match presence updates. */
export interface MatchPresenceEvent {
    match_id: string;
    joins: Presence[];
    leaves: Presence[];
}
/** Start a matchmaking process. */
interface MatchmakerAdd {
    matchmaker_add: {
        min_count: number;
        max_count: number;
        query: string;
        string_properties?: Record<string, string>;
        numeric_properties?: Record<string, number>;
    };
}
/** The matchmaker ticket received from the server. */
export interface MatchmakerTicket {
    ticket: string;
}
/** Cancel a matchmaking process. */
interface MatchmakerRemove {
    matchmaker_remove: {
        ticket: string;
    };
}
/** A reference to a user and their matchmaking properties. */
export interface MatchmakerUser {
    presence: Presence;
    party_id: string;
    string_properties?: Record<string, string>;
    numeric_properties?: Record<string, number>;
}
/** Matchmaking result. */
export interface MatchmakerMatched {
    ticket: string;
    match_id: string;
    token: string;
    users: MatchmakerUser[];
    self: MatchmakerUser;
}
/** A realtime match */
export interface Match {
    match_id: string;
    authoritative: boolean;
    label?: string;
    size: number;
    presences: Presence[];
    self: Presence;
}
/** Create a multiplayer match. */
interface CreateMatch {
    match_create: {};
}
/** Join a multiplayer match. */
interface JoinMatch {
    match_join: {
        match_id?: string;
        token?: string;
        metadata?: {};
    };
}
/** Leave a multiplayer match. */
interface LeaveMatch {
    match_leave: {
        match_id: string;
    };
}
/** Match data */
export interface MatchData {
    match_id: string;
    op_code: number;
    data: any;
    presences: Presence[];
}
/** Send a message contains match data. */
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
/** Execute an Lua function on the server. */
interface Rpc {
    rpc: ApiRpc;
}
/** A snapshot of statuses for some set of users. */
export interface Status {
    presences: Presence[];
}
/** Start receiving status updates for some set of users. */
interface StatusFollow {
    status_follow: {
        user_ids: string[];
    };
}
/** A batch of status updates for a given user. */
export interface StatusPresenceEvent {
    joins: Presence[];
    leaves: Presence[];
}
/** Stop receiving status updates for some set of users. */
interface StatusUnfollow {
    status_unfollow: {
        user_ids: string[];
    };
}
/** Set the user's own status. */
interface StatusUpdate {
    status_update: {
        status?: string;
    };
}
/** A socket connection to Nakama server. */
export interface Socket {
    connect(session: Session, createStatus: boolean): Promise<Session>;
    disconnect(fireDisconnectEvent: boolean): void;
    acceptPartyMember(party_id: string, presence: Presence): Promise<void>;
    addMatchmaker(query: string, minCount: number, maxCount: number, stringProperties?: Record<string, string>, numericProperties?: Record<string, number>): Promise<MatchmakerTicket>;
    addMatchmakerParty(party_id: string, query: string, min_count: number, max_count: number, string_properties?: Record<string, string>, numericProperties?: Record<string, number>): Promise<PartyMatchmakerTicket>;
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
    onmatchmakerticket: (matchmakerTicket: MatchmakerTicket) => void;
    onmatchmakermatched: (matchmakerMatched: MatchmakerMatched) => void;
    onparty: (party: Party) => void;
    onpartyclose: (partyClose: PartyClose) => void;
    onpartydata: (partyData: PartyData) => void;
    onpartyjoinrequest: (partyJoinRequest: PartyJoinRequest) => void;
    onpartyleader: (partyLeader: PartyLeader) => void;
    onpartypresence: (partyPresence: PartyPresenceEvent) => void;
    onpartymatchmakerticket: (partyMatchmakerMatched: PartyMatchmakerTicket) => void;
    onstatuspresence: (statusPresence: StatusPresenceEvent) => void;
    onstreampresence: (streamPresence: StreamPresenceEvent) => void;
    onstreamdata: (streamData: StreamData) => void;
    onchannelmessage: (channelMessage: ChannelMessage) => void;
    onchannelpresence: (channelPresence: ChannelPresenceEvent) => void;
}
/** Reports an error received from a socket message. */
export interface SocketError {
    code: number;
    message: string;
}
/** A socket connection to Nakama server implemented with the DOM's WebSocket API. */
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
    onmatchmakerticket(matchmakerTicket: MatchmakerTicket): void;
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
    addMatchmaker(query: string, min_count: number, max_count: number, string_properties?: Record<string, string>, numeric_properties?: Record<string, number>): Promise<MatchmakerTicket>;
    addMatchmakerParty(party_id: string, query: string, min_count: number, max_count: number, string_properties?: Record<string, string>, numeric_properties?: Record<string, number>): Promise<PartyMatchmakerTicket>;
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
