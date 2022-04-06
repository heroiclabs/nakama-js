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
/** Incoming information about a party. */
export interface Party {
    party_id: string;
    open: boolean;
    max_size: number;
    self: Presence;
    leader: Presence;
    presences: Presence[];
}
/** Create a party. */
export interface PartyCreate {
    party_create: {
        open: boolean;
        max_size: number;
    };
}
/** Join a party. */
interface PartyJoin {
    party_join: {
        party_id: string;
    };
}
/** Leave a party. */
interface PartyLeave {
    party_leave: {
        party_id: string;
    };
}
/** Promote a new party leader. */
interface PartyPromote {
    party_promote: {
        party_id: string;
        presence: Presence;
    };
}
/** Announcement of a new party leader. */
export interface PartyLeader {
    party_id: string;
    presence: Presence;
}
/** Accept a request to join. */
interface PartyAccept {
    party_accept: {
        party_id: string;
        presence: Presence;
    };
}
/** End a party, kicking all party members and closing it. */
interface PartyClose {
    party_close: {
        party_id: string;
    };
}
/** Incoming party data delivered from the server. */
export interface PartyData {
    party_id: string;
    presence: Presence;
    op_code: number;
    data: any;
}
/** A client to server request to send data to a party. */
interface PartyDataSend {
    party_data_send: {
        party_id: string;
        op_code: number;
        data: any;
    };
}
/** Incoming notification for one or more new presences attempting to join the party. */
export interface PartyJoinRequest {
    party_id: string;
    presences: Presence[];
}
/** Request a list of pending join requests for a party. */
export interface PartyJoinRequestList {
    party_join_request_list: {
        party_id: string;
    };
}
/** Begin matchmaking as a party. */
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
/** Cancel a party matchmaking process using a ticket. */
interface PartyMatchmakerRemove {
    party_matchmaker_remove: {
        party_id: string;
        ticket: string;
    };
}
/** A response from starting a new party matchmaking process. */
export interface PartyMatchmakerTicket {
    party_id: string;
    ticket: string;
}
/** Presence update for a particular party. */
export interface PartyPresenceEvent {
    party_id: string;
    joins: Presence[];
    leaves: Presence[];
}
/** Kick a party member, or decline a request to join. */
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
    /** Connect to the server. */
    connect(session: Session, createStatus: boolean): Promise<Session>;
    /** Disconnect from the server. */
    disconnect(fireDisconnectEvent: boolean): void;
    /** Accept a request to join. */
    acceptPartyMember(party_id: string, presence: Presence): Promise<void>;
    /** Join the matchmaker pool and search for opponents on the server. */
    addMatchmaker(query: string, minCount: number, maxCount: number, stringProperties?: Record<string, string>, numericProperties?: Record<string, number>): Promise<MatchmakerTicket>;
    /** Begin matchmaking as a party. */
    addMatchmakerParty(party_id: string, query: string, min_count: number, max_count: number, string_properties?: Record<string, string>, numericProperties?: Record<string, number>): Promise<PartyMatchmakerTicket>;
    /** End a party, kicking all party members and closing it. */
    closeParty(party_id: string): Promise<void>;
    /** Create a multiplayer match on the server. */
    createMatch(): Promise<Match>;
    /** Create a party. */
    createParty(open: boolean, max_size: number): Promise<Party>;
    /** Subscribe to one or more users for their status updates. */
    followUsers(user_ids: string[]): Promise<Status>;
    /** Join a chat channel on the server. */
    joinChat(target: string, type: number, persistence: boolean, hidden: boolean): Promise<Channel>;
    /** Join a party. */
    joinParty(party_id: string): Promise<void>;
    /** Join a multiplayer match. */
    joinMatch(match_id?: string, token?: string, metadata?: {}): Promise<Match>;
    /** Leave a chat channel on the server. */
    leaveChat(channel_id: string): Promise<void>;
    /** Leave a multiplayer match on the server. */
    leaveMatch(matchId: string): Promise<void>;
    /** Leave a party. */
    leaveParty(party_id: string): Promise<void>;
    /** Request a list of pending join requests for a party. */
    listPartyJoinRequests(party_id: string): Promise<PartyJoinRequest>;
    /** Promote a new party leader. */
    promotePartyMember(party_id: string, party_member: Presence): Promise<PartyLeader>;
    /** Remove a chat message from a chat channel on the server. */
    removeChatMessage(channel_id: string, message_id: string): Promise<ChannelMessageAck>;
    /** Leave the matchmaker pool with the provided ticket. */
    removeMatchmaker(ticket: string): Promise<void>;
    /** Cancel a party matchmaking process using a ticket. */
    removeMatchmakerParty(party_id: string, ticket: string): Promise<void>;
    /** Kick a party member, or decline a request to join. */
    removePartyMember(party_id: string, presence: Presence): Promise<void>;
    /** Execute an RPC function to the server. */
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    /** Send input to a multiplayer match on the server. */
    /** When no presences are supplied the new match state will be sent to all presences. */
    sendMatchState(matchId: string, opCode: number, data: any, presence?: Presence[]): Promise<void>;
    /** Send data to a party. */
    sendPartyData(party_id: string, opcode: number, data: any): Promise<void>;
    /** Unfollow one or more users from their status updates. */
    unfollowUsers(user_ids: string[]): Promise<void>;
    /** Update a chat message on a chat channel in the server. */
    updateChatMessage(channel_id: string, message_id: string, content: any): Promise<ChannelMessageAck>;
    /** Update the status for the current user online. */
    updateStatus(status?: string): Promise<void>;
    /** Send a chat message to a chat channel on the server. */
    writeChatMessage(channel_id: string, content: any): Promise<ChannelMessageAck>;
    /** Handle disconnect events received from the socket. */
    ondisconnect: (evt: Event) => void;
    /** Handle error events received from the socket. */
    onerror: (evt: Event) => void;
    /** Receive notifications from the socket. */
    onnotification: (notification: Notification) => void;
    /** Receive match data updates. */
    onmatchdata: (matchData: MatchData) => void;
    /** Receive match presence updates. */
    onmatchpresence: (matchPresence: MatchPresenceEvent) => void;
    /** Receive a matchmaker ticket. */
    onmatchmakerticket: (matchmakerTicket: MatchmakerTicket) => void;
    /** Receive matchmaking results. */
    onmatchmakermatched: (matchmakerMatched: MatchmakerMatched) => void;
    /** Receive party events. */
    onparty: (party: Party) => void;
    /** Receive party close events. */
    onpartyclose: (partyClose: PartyClose) => void;
    /** Receive party data updates. */
    onpartydata: (partyData: PartyData) => void;
    /** Receive party join requests, if party leader. */
    onpartyjoinrequest: (partyJoinRequest: PartyJoinRequest) => void;
    /** Receive announcements of a new party leader. */
    onpartyleader: (partyLeader: PartyLeader) => void;
    /** Receive a presence update for a party. */
    onpartypresence: (partyPresence: PartyPresenceEvent) => void;
    /** Receive matchmaking results. */
    onpartymatchmakerticket: (partyMatchmakerMatched: PartyMatchmakerTicket) => void;
    /** Receive status presence updates. */
    onstatuspresence: (statusPresence: StatusPresenceEvent) => void;
    /** Receive stream presence updates. */
    onstreampresence: (streamPresence: StreamPresenceEvent) => void;
    /** Receive stream data. */
    onstreamdata: (streamData: StreamData) => void;
    /** Receive channel message. */
    onchannelmessage: (channelMessage: ChannelMessage) => void;
    /** Receive channel presence updates. */
    onchannelpresence: (channelPresence: ChannelPresenceEvent) => void;
}
/** Reports an error received from a socket message. */
export interface SocketError {
    /** The error code. */
    code: number;
    /** A message in English to help developers debug the response. */
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
