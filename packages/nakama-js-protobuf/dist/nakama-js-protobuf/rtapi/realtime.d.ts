import _m0 from "protobufjs/minimal";
import { ChannelMessage, Rpc, Notification } from "../api/api";
export declare const protobufPackage = "nakama.realtime";
/** The realtime protocol for Nakama server. */
/** An envelope for a realtime message. */
export interface Envelope {
    cid: string;
    /** A response from a channel join operation. */
    channel: Channel | undefined;
    /** Join a realtime chat channel. */
    channel_join: ChannelJoin | undefined;
    /** Leave a realtime chat channel. */
    channel_leave: ChannelLeave | undefined;
    /** An incoming message on a realtime chat channel. */
    channel_message: ChannelMessage | undefined;
    /** An acknowledgement received in response to sending a message on a chat channel. */
    channel_message_ack: ChannelMessageAck | undefined;
    /** Send a message to a realtime chat channel. */
    channel_message_send: ChannelMessageSend | undefined;
    /** Update a message previously sent to a realtime chat channel. */
    channel_message_update: ChannelMessageUpdate | undefined;
    /** Remove a message previously sent to a realtime chat channel. */
    channel_message_remove: ChannelMessageRemove | undefined;
    /** Presence update for a particular realtime chat channel. */
    channel_presence_event: ChannelPresenceEvent | undefined;
    /** Describes an error which occurred on the server. */
    error: Error | undefined;
    /** Incoming information about a realtime match. */
    match: Match | undefined;
    /** A client to server request to create a realtime match. */
    match_create: MatchCreate | undefined;
    /** Incoming realtime match data delivered from the server. */
    match_data: MatchData | undefined;
    /** A client to server request to send data to a realtime match. */
    match_data_send: MatchDataSend | undefined;
    /** A client to server request to join a realtime match. */
    match_join: MatchJoin | undefined;
    /** A client to server request to leave a realtime match. */
    match_leave: MatchLeave | undefined;
    /** Presence update for a particular realtime match. */
    match_presence_event: MatchPresenceEvent | undefined;
    /** Submit a new matchmaking process request. */
    matchmaker_add: MatchmakerAdd | undefined;
    /** A successful matchmaking result. */
    matchmaker_matched: MatchmakerMatched | undefined;
    /** Cancel a matchmaking process using a ticket. */
    matchmaker_remove: MatchmakerRemove | undefined;
    /** A response from starting a new matchmaking process. */
    matchmaker_ticket: MatchmakerTicket | undefined;
    /** Notifications send by the server. */
    notifications: Notifications | undefined;
    /** RPC call or response. */
    rpc: Rpc | undefined;
    /** An incoming status snapshot for some set of users. */
    status: Status | undefined;
    /** Start following some set of users to receive their status updates. */
    status_follow: StatusFollow | undefined;
    /** An incoming status update. */
    status_presence_event: StatusPresenceEvent | undefined;
    /** Stop following some set of users to no longer receive their status updates. */
    status_unfollow: StatusUnfollow | undefined;
    /** Set the user's own status. */
    status_update: StatusUpdate | undefined;
    /** A data message delivered over a stream. */
    stream_data: StreamData | undefined;
    /** Presence update for a particular stream. */
    stream_presence_event: StreamPresenceEvent | undefined;
    /** Application-level heartbeat and connection check. */
    ping: Ping | undefined;
    /** Application-level heartbeat and connection check response. */
    pong: Pong | undefined;
    /** Incoming information about a party. */
    party: Party | undefined;
    /** Create a party. */
    party_create: PartyCreate | undefined;
    /** Join a party, or request to join if the party is not open. */
    party_join: PartyJoin | undefined;
    /** Leave a party. */
    party_leave: PartyLeave | undefined;
    /** Promote a new party leader. */
    party_promote: PartyPromote | undefined;
    /** Announcement of a new party leader. */
    party_leader: PartyLeader | undefined;
    /** Accept a request to join. */
    party_accept: PartyAccept | undefined;
    /** Kick a party member, or decline a request to join. */
    party_remove: PartyRemove | undefined;
    /** End a party, kicking all party members and closing it. */
    party_close: PartyClose | undefined;
    /** Request a list of pending join requests for a party. */
    party_join_request_list: PartyJoinRequestList | undefined;
    /** Incoming notification for one or more new presences attempting to join the party. */
    party_join_request: PartyJoinRequest | undefined;
    /** Begin matchmaking as a party. */
    party_matchmaker_add: PartyMatchmakerAdd | undefined;
    /** Cancel a party matchmaking process using a ticket. */
    party_matchmaker_remove: PartyMatchmakerRemove | undefined;
    /** A response from starting a new party matchmaking process. */
    party_matchmaker_ticket: PartyMatchmakerTicket | undefined;
    /** Incoming party data delivered from the server. */
    party_data: PartyData | undefined;
    /** A client to server request to send data to a party. */
    party_data_send: PartyDataSend | undefined;
    /** Presence update for a particular party. */
    party_presence_event: PartyPresenceEvent | undefined;
}
/** A realtime chat channel. */
export interface Channel {
    /** The ID of the channel. */
    id: string;
    /** The users currently in the channel. */
    presences: UserPresence[];
    /** A reference to the current user's presence in the channel. */
    self: UserPresence | undefined;
    /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
    room_name: string;
    /** The ID of the group, or an empty string if this message was not sent through a group channel. */
    group_id: string;
    /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_one: string;
    /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_two: string;
}
/** Join operation for a realtime chat channel. */
export interface ChannelJoin {
    /** The user ID to DM with, group ID to chat with, or room channel name to join. */
    target: string;
    /** The type of the chat channel. */
    type: number;
    /** Whether messages sent on this channel should be persistent. */
    persistence: boolean | undefined;
    /** Whether the user should appear in the channel's presence list and events. */
    hidden: boolean | undefined;
}
/** The type of chat channel. */
export declare enum ChannelJoin_Type {
    /** TYPE_UNSPECIFIED - Default case. Assumed as ROOM type. */
    TYPE_UNSPECIFIED = 0,
    /** ROOM - A room which anyone can join to chat. */
    ROOM = 1,
    /** DIRECT_MESSAGE - A private channel for 1-on-1 chat. */
    DIRECT_MESSAGE = 2,
    /** GROUP - A channel for group chat. */
    GROUP = 3,
    UNRECOGNIZED = -1
}
export declare function channelJoin_TypeFromJSON(object: any): ChannelJoin_Type;
export declare function channelJoin_TypeToJSON(object: ChannelJoin_Type): string;
/** Leave a realtime channel. */
export interface ChannelLeave {
    /** The ID of the channel to leave. */
    channel_id: string;
}
/** A receipt reply from a channel message send operation. */
export interface ChannelMessageAck {
    /** The channel the message was sent to. */
    channel_id: string;
    /** The unique ID assigned to the message. */
    message_id: string;
    /** The code representing a message type or category. */
    code: number | undefined;
    /** Username of the message sender. */
    username: string;
    /** The UNIX time when the message was created. */
    create_time: Date | undefined;
    /** The UNIX time when the message was last updated. */
    update_time: Date | undefined;
    /** True if the message was persisted to the channel's history, false otherwise. */
    persistent: boolean | undefined;
    /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
    room_name: string;
    /** The ID of the group, or an empty string if this message was not sent through a group channel. */
    group_id: string;
    /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_one: string;
    /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_two: string;
}
/** Send a message to a realtime channel. */
export interface ChannelMessageSend {
    /** The channel to sent to. */
    channel_id: string;
    /** Message content. */
    content: string;
}
/** Update a message previously sent to a realtime channel. */
export interface ChannelMessageUpdate {
    /** The channel the message was sent to. */
    channel_id: string;
    /** The ID assigned to the message to update. */
    message_id: string;
    /** New message content. */
    content: string;
}
/** Remove a message previously sent to a realtime channel. */
export interface ChannelMessageRemove {
    /** The channel the message was sent to. */
    channel_id: string;
    /** The ID assigned to the message to update. */
    message_id: string;
}
/** A set of joins and leaves on a particular channel. */
export interface ChannelPresenceEvent {
    /** The channel identifier this event is for. */
    channel_id: string;
    /** Presences joining the channel as part of this event, if any. */
    joins: UserPresence[];
    /** Presences leaving the channel as part of this event, if any. */
    leaves: UserPresence[];
    /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
    room_name: string;
    /** The ID of the group, or an empty string if this message was not sent through a group channel. */
    group_id: string;
    /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_one: string;
    /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_two: string;
}
/** A logical error which may occur on the server. */
export interface Error {
    /** The error code which should be one of "Error.Code" enums. */
    code: number;
    /** A message in English to help developers debug the response. */
    message: string;
    /** Additional error details which may be different for each response. */
    context: {
        [key: string]: string;
    };
}
/** The selection of possible error codes. */
export declare enum Error_Code {
    /** RUNTIME_EXCEPTION - An unexpected result from the server. */
    RUNTIME_EXCEPTION = 0,
    /** UNRECOGNIZED_PAYLOAD - The server received a message which is not recognised. */
    UNRECOGNIZED_PAYLOAD = 1,
    /** MISSING_PAYLOAD - A message was expected but contains no content. */
    MISSING_PAYLOAD = 2,
    /** BAD_INPUT - Fields in the message have an invalid format. */
    BAD_INPUT = 3,
    /** MATCH_NOT_FOUND - The match id was not found. */
    MATCH_NOT_FOUND = 4,
    /** MATCH_JOIN_REJECTED - The match join was rejected. */
    MATCH_JOIN_REJECTED = 5,
    /** RUNTIME_FUNCTION_NOT_FOUND - The runtime function does not exist on the server. */
    RUNTIME_FUNCTION_NOT_FOUND = 6,
    /** RUNTIME_FUNCTION_EXCEPTION - The runtime function executed with an error. */
    RUNTIME_FUNCTION_EXCEPTION = 7,
    UNRECOGNIZED = -1
}
export declare function error_CodeFromJSON(object: any): Error_Code;
export declare function error_CodeToJSON(object: Error_Code): string;
export interface Error_ContextEntry {
    key: string;
    value: string;
}
/** A realtime match. */
export interface Match {
    /** The match unique ID. */
    match_id: string;
    /** True if it's an server-managed authoritative match, false otherwise. */
    authoritative: boolean;
    /** Match label, if any. */
    label: string | undefined;
    /** The number of users currently in the match. */
    size: number;
    /** The users currently in the match. */
    presences: UserPresence[];
    /** A reference to the current user's presence in the match. */
    self: UserPresence | undefined;
}
/** Create a new realtime match. */
export interface MatchCreate {
}
/** Realtime match data received from the server. */
export interface MatchData {
    /** The match unique ID. */
    match_id: string;
    /** A reference to the user presence that sent this data, if any. */
    presence: UserPresence | undefined;
    /** Op code value. */
    op_code: number;
    /** Data payload, if any. */
    data: Uint8Array;
    /** True if this data was delivered reliably, false otherwise. */
    reliable: boolean;
}
/** Send realtime match data to the server. */
export interface MatchDataSend {
    /** The match unique ID. */
    match_id: string;
    /** Op code value. */
    op_code: number;
    /** Data payload, if any. */
    data: Uint8Array;
    /** List of presences in the match to deliver to, if filtering is required. Otherwise deliver to everyone in the match. */
    presences: UserPresence[];
    /** True if the data should be sent reliably, false otherwise. */
    reliable: boolean;
}
/** Join an existing realtime match. */
export interface MatchJoin {
    /** The match unique ID. */
    match_id: string | undefined;
    /** A matchmaking result token. */
    token: string | undefined;
    /** An optional set of key-value metadata pairs to be passed to the match handler, if any. */
    metadata: {
        [key: string]: string;
    };
}
export interface MatchJoin_MetadataEntry {
    key: string;
    value: string;
}
/** Leave a realtime match. */
export interface MatchLeave {
    /** The match unique ID. */
    match_id: string;
}
/** A set of joins and leaves on a particular realtime match. */
export interface MatchPresenceEvent {
    /** The match unique ID. */
    match_id: string;
    /** User presences that have just joined the match. */
    joins: UserPresence[];
    /** User presences that have just left the match. */
    leaves: UserPresence[];
}
/** Start a new matchmaking process. */
export interface MatchmakerAdd {
    /** Minimum total user count to match together. */
    min_count: number;
    /** Maximum total user count to match together. */
    max_count: number;
    /** Filter query used to identify suitable users. */
    query: string;
    /** String properties. */
    string_properties: {
        [key: string]: string;
    };
    /** Numeric properties. */
    numeric_properties: {
        [key: string]: number;
    };
}
export interface MatchmakerAdd_StringPropertiesEntry {
    key: string;
    value: string;
}
export interface MatchmakerAdd_NumericPropertiesEntry {
    key: string;
    value: number;
}
/** A successful matchmaking result. */
export interface MatchmakerMatched {
    /** The matchmaking ticket that has completed. */
    ticket: string;
    /** Match ID. */
    match_id: string | undefined;
    /** Match join token. */
    token: string | undefined;
    /** The users that have been matched together, and information about their matchmaking data. */
    users: MatchmakerMatched_MatchmakerUser[];
    /** A reference to the current user and their properties. */
    self: MatchmakerMatched_MatchmakerUser | undefined;
}
export interface MatchmakerMatched_MatchmakerUser {
    /** User info. */
    presence: UserPresence | undefined;
    /** Party identifier, if this user was matched as a party member. */
    party_id: string;
    /** String properties. */
    string_properties: {
        [key: string]: string;
    };
    /** Numeric properties. */
    numeric_properties: {
        [key: string]: number;
    };
}
export interface MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    key: string;
    value: string;
}
export interface MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    key: string;
    value: number;
}
/** Cancel an existing ongoing matchmaking process. */
export interface MatchmakerRemove {
    /** The ticket to cancel. */
    ticket: string;
}
/** A ticket representing a new matchmaking process. */
export interface MatchmakerTicket {
    /** The ticket that can be used to cancel matchmaking. */
    ticket: string;
}
/** A collection of zero or more notifications. */
export interface Notifications {
    /** Collection of notifications. */
    notifications: Notification[];
}
/** Incoming information about a party. */
export interface Party {
    /** Unique party identifier. */
    party_id: string;
    /** Open flag. */
    open: boolean;
    /** Maximum number of party members. */
    max_size: number;
    /** Self. */
    self: UserPresence | undefined;
    /** Leader. */
    leader: UserPresence | undefined;
    /** All current party members. */
    presences: UserPresence[];
}
/** Create a party. */
export interface PartyCreate {
    /** Whether or not the party will require join requests to be approved by the party leader. */
    open: boolean;
    /** Maximum number of party members. */
    max_size: number;
}
/** Join a party, or request to join if the party is not open. */
export interface PartyJoin {
    /** Party ID to join. */
    party_id: string;
}
/** Leave a party. */
export interface PartyLeave {
    /** Party ID to leave. */
    party_id: string;
}
/** Promote a new party leader. */
export interface PartyPromote {
    /** Party ID to promote a new leader for. */
    party_id: string;
    /** The presence of an existing party member to promote as the new leader. */
    presence: UserPresence | undefined;
}
/** Announcement of a new party leader. */
export interface PartyLeader {
    /** Party ID to announce the new leader for. */
    party_id: string;
    /** The presence of the new party leader. */
    presence: UserPresence | undefined;
}
/** Accept a request to join. */
export interface PartyAccept {
    /** Party ID to accept a join request for. */
    party_id: string;
    /** The presence to accept as a party member. */
    presence: UserPresence | undefined;
}
/** Kick a party member, or decline a request to join. */
export interface PartyRemove {
    /** Party ID to remove/reject from. */
    party_id: string;
    /** The presence to remove or reject. */
    presence: UserPresence | undefined;
}
/** End a party, kicking all party members and closing it. */
export interface PartyClose {
    /** Party ID to close. */
    party_id: string;
}
/** Request a list of pending join requests for a party. */
export interface PartyJoinRequestList {
    /** Party ID to get a list of join requests for. */
    party_id: string;
}
/** Incoming notification for one or more new presences attempting to join the party. */
export interface PartyJoinRequest {
    /** Party ID these presences are attempting to join. */
    party_id: string;
    /** Presences attempting to join. */
    presences: UserPresence[];
}
/** Begin matchmaking as a party. */
export interface PartyMatchmakerAdd {
    /** Party ID. */
    party_id: string;
    /** Minimum total user count to match together. */
    min_count: number;
    /** Maximum total user count to match together. */
    max_count: number;
    /** Filter query used to identify suitable users. */
    query: string;
    /** String properties. */
    string_properties: {
        [key: string]: string;
    };
    /** Numeric properties. */
    numeric_properties: {
        [key: string]: number;
    };
}
export interface PartyMatchmakerAdd_StringPropertiesEntry {
    key: string;
    value: string;
}
export interface PartyMatchmakerAdd_NumericPropertiesEntry {
    key: string;
    value: number;
}
/** Cancel a party matchmaking process using a ticket. */
export interface PartyMatchmakerRemove {
    /** Party ID. */
    party_id: string;
    /** The ticket to cancel. */
    ticket: string;
}
/** A response from starting a new party matchmaking process. */
export interface PartyMatchmakerTicket {
    /** Party ID. */
    party_id: string;
    /** The ticket that can be used to cancel matchmaking. */
    ticket: string;
}
/** Incoming party data delivered from the server. */
export interface PartyData {
    /** The party ID. */
    party_id: string;
    /** A reference to the user presence that sent this data, if any. */
    presence: UserPresence | undefined;
    /** Op code value. */
    op_code: number;
    /** Data payload, if any. */
    data: Uint8Array;
}
/** Send data to a party. */
export interface PartyDataSend {
    /** Party ID to send to. */
    party_id: string;
    /** Op code value. */
    op_code: number;
    /** Data payload, if any. */
    data: Uint8Array;
}
/** Presence update for a particular party. */
export interface PartyPresenceEvent {
    /** The party ID. */
    party_id: string;
    /** User presences that have just joined the party. */
    joins: UserPresence[];
    /** User presences that have just left the party. */
    leaves: UserPresence[];
}
/** Application-level heartbeat and connection check. */
export interface Ping {
}
/** Application-level heartbeat and connection check response. */
export interface Pong {
}
/** A snapshot of statuses for some set of users. */
export interface Status {
    /** User statuses. */
    presences: UserPresence[];
}
/** Start receiving status updates for some set of users. */
export interface StatusFollow {
    /** User IDs to follow. */
    user_ids: string[];
    /** Usernames to follow. */
    usernames: string[];
}
/** A batch of status updates for a given user. */
export interface StatusPresenceEvent {
    /** New statuses for the user. */
    joins: UserPresence[];
    /** Previous statuses for the user. */
    leaves: UserPresence[];
}
/** Stop receiving status updates for some set of users. */
export interface StatusUnfollow {
    /** Users to unfollow. */
    user_ids: string[];
}
/** Set the user's own status. */
export interface StatusUpdate {
    /** Status string to set, if not present the user will appear offline. */
    status: string | undefined;
}
/** Represents identifying information for a stream. */
export interface Stream {
    /** Mode identifies the type of stream. */
    mode: number;
    /** Subject is the primary identifier, if any. */
    subject: string;
    /** Subcontext is a secondary identifier, if any. */
    subcontext: string;
    /** The label is an arbitrary identifying string, if the stream has one. */
    label: string;
}
/** A data message delivered over a stream. */
export interface StreamData {
    /** The stream this data message relates to. */
    stream: Stream | undefined;
    /** The sender, if any. */
    sender: UserPresence | undefined;
    /** Arbitrary contents of the data message. */
    data: string;
    /** True if this data was delivered reliably, false otherwise. */
    reliable: boolean;
}
/** A set of joins and leaves on a particular stream. */
export interface StreamPresenceEvent {
    /** The stream this event relates to. */
    stream: Stream | undefined;
    /** Presences joining the stream as part of this event, if any. */
    joins: UserPresence[];
    /** Presences leaving the stream as part of this event, if any. */
    leaves: UserPresence[];
}
/** A user session associated to a stream, usually through a list operation or a join/leave event. */
export interface UserPresence {
    /** The user this presence belongs to. */
    user_id: string;
    /** A unique session ID identifying the particular connection, because the user may have many. */
    session_id: string;
    /** The username for display purposes. */
    username: string;
    /** Whether this presence generates persistent data/messages, if applicable for the stream type. */
    persistence: boolean;
    /** A user-set status message for this stream, if applicable. */
    status: string | undefined;
}
export declare const Envelope: {
    encode(message: Envelope, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Envelope;
    fromJSON(object: any): Envelope;
    toJSON(message: Envelope): unknown;
    fromPartial(object: DeepPartial<Envelope>): Envelope;
};
export declare const Channel: {
    encode(message: Channel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Channel;
    fromJSON(object: any): Channel;
    toJSON(message: Channel): unknown;
    fromPartial(object: DeepPartial<Channel>): Channel;
};
export declare const ChannelJoin: {
    encode(message: ChannelJoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelJoin;
    fromJSON(object: any): ChannelJoin;
    toJSON(message: ChannelJoin): unknown;
    fromPartial(object: DeepPartial<ChannelJoin>): ChannelJoin;
};
export declare const ChannelLeave: {
    encode(message: ChannelLeave, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelLeave;
    fromJSON(object: any): ChannelLeave;
    toJSON(message: ChannelLeave): unknown;
    fromPartial(object: DeepPartial<ChannelLeave>): ChannelLeave;
};
export declare const ChannelMessageAck: {
    encode(message: ChannelMessageAck, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageAck;
    fromJSON(object: any): ChannelMessageAck;
    toJSON(message: ChannelMessageAck): unknown;
    fromPartial(object: DeepPartial<ChannelMessageAck>): ChannelMessageAck;
};
export declare const ChannelMessageSend: {
    encode(message: ChannelMessageSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageSend;
    fromJSON(object: any): ChannelMessageSend;
    toJSON(message: ChannelMessageSend): unknown;
    fromPartial(object: DeepPartial<ChannelMessageSend>): ChannelMessageSend;
};
export declare const ChannelMessageUpdate: {
    encode(message: ChannelMessageUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageUpdate;
    fromJSON(object: any): ChannelMessageUpdate;
    toJSON(message: ChannelMessageUpdate): unknown;
    fromPartial(object: DeepPartial<ChannelMessageUpdate>): ChannelMessageUpdate;
};
export declare const ChannelMessageRemove: {
    encode(message: ChannelMessageRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageRemove;
    fromJSON(object: any): ChannelMessageRemove;
    toJSON(message: ChannelMessageRemove): unknown;
    fromPartial(object: DeepPartial<ChannelMessageRemove>): ChannelMessageRemove;
};
export declare const ChannelPresenceEvent: {
    encode(message: ChannelPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelPresenceEvent;
    fromJSON(object: any): ChannelPresenceEvent;
    toJSON(message: ChannelPresenceEvent): unknown;
    fromPartial(object: DeepPartial<ChannelPresenceEvent>): ChannelPresenceEvent;
};
export declare const Error: {
    encode(message: Error, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Error;
    fromJSON(object: any): Error;
    toJSON(message: Error): unknown;
    fromPartial(object: DeepPartial<Error>): Error;
};
export declare const Error_ContextEntry: {
    encode(message: Error_ContextEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Error_ContextEntry;
    fromJSON(object: any): Error_ContextEntry;
    toJSON(message: Error_ContextEntry): unknown;
    fromPartial(object: DeepPartial<Error_ContextEntry>): Error_ContextEntry;
};
export declare const Match: {
    encode(message: Match, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Match;
    fromJSON(object: any): Match;
    toJSON(message: Match): unknown;
    fromPartial(object: DeepPartial<Match>): Match;
};
export declare const MatchCreate: {
    encode(_: MatchCreate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchCreate;
    fromJSON(_: any): MatchCreate;
    toJSON(_: MatchCreate): unknown;
    fromPartial(_: DeepPartial<MatchCreate>): MatchCreate;
};
export declare const MatchData: {
    encode(message: MatchData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchData;
    fromJSON(object: any): MatchData;
    toJSON(message: MatchData): unknown;
    fromPartial(object: DeepPartial<MatchData>): MatchData;
};
export declare const MatchDataSend: {
    encode(message: MatchDataSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchDataSend;
    fromJSON(object: any): MatchDataSend;
    toJSON(message: MatchDataSend): unknown;
    fromPartial(object: DeepPartial<MatchDataSend>): MatchDataSend;
};
export declare const MatchJoin: {
    encode(message: MatchJoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchJoin;
    fromJSON(object: any): MatchJoin;
    toJSON(message: MatchJoin): unknown;
    fromPartial(object: DeepPartial<MatchJoin>): MatchJoin;
};
export declare const MatchJoin_MetadataEntry: {
    encode(message: MatchJoin_MetadataEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchJoin_MetadataEntry;
    fromJSON(object: any): MatchJoin_MetadataEntry;
    toJSON(message: MatchJoin_MetadataEntry): unknown;
    fromPartial(object: DeepPartial<MatchJoin_MetadataEntry>): MatchJoin_MetadataEntry;
};
export declare const MatchLeave: {
    encode(message: MatchLeave, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchLeave;
    fromJSON(object: any): MatchLeave;
    toJSON(message: MatchLeave): unknown;
    fromPartial(object: DeepPartial<MatchLeave>): MatchLeave;
};
export declare const MatchPresenceEvent: {
    encode(message: MatchPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchPresenceEvent;
    fromJSON(object: any): MatchPresenceEvent;
    toJSON(message: MatchPresenceEvent): unknown;
    fromPartial(object: DeepPartial<MatchPresenceEvent>): MatchPresenceEvent;
};
export declare const MatchmakerAdd: {
    encode(message: MatchmakerAdd, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerAdd;
    fromJSON(object: any): MatchmakerAdd;
    toJSON(message: MatchmakerAdd): unknown;
    fromPartial(object: DeepPartial<MatchmakerAdd>): MatchmakerAdd;
};
export declare const MatchmakerAdd_StringPropertiesEntry: {
    encode(message: MatchmakerAdd_StringPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerAdd_StringPropertiesEntry;
    fromJSON(object: any): MatchmakerAdd_StringPropertiesEntry;
    toJSON(message: MatchmakerAdd_StringPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<MatchmakerAdd_StringPropertiesEntry>): MatchmakerAdd_StringPropertiesEntry;
};
export declare const MatchmakerAdd_NumericPropertiesEntry: {
    encode(message: MatchmakerAdd_NumericPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerAdd_NumericPropertiesEntry;
    fromJSON(object: any): MatchmakerAdd_NumericPropertiesEntry;
    toJSON(message: MatchmakerAdd_NumericPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<MatchmakerAdd_NumericPropertiesEntry>): MatchmakerAdd_NumericPropertiesEntry;
};
export declare const MatchmakerMatched: {
    encode(message: MatchmakerMatched, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched;
    fromJSON(object: any): MatchmakerMatched;
    toJSON(message: MatchmakerMatched): unknown;
    fromPartial(object: DeepPartial<MatchmakerMatched>): MatchmakerMatched;
};
export declare const MatchmakerMatched_MatchmakerUser: {
    encode(message: MatchmakerMatched_MatchmakerUser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched_MatchmakerUser;
    fromJSON(object: any): MatchmakerMatched_MatchmakerUser;
    toJSON(message: MatchmakerMatched_MatchmakerUser): unknown;
    fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser>): MatchmakerMatched_MatchmakerUser;
};
export declare const MatchmakerMatched_MatchmakerUser_StringPropertiesEntry: {
    encode(message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    fromJSON(object: any): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    toJSON(message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser_StringPropertiesEntry>): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
};
export declare const MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry: {
    encode(message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    fromJSON(object: any): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    toJSON(message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry>): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
};
export declare const MatchmakerRemove: {
    encode(message: MatchmakerRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerRemove;
    fromJSON(object: any): MatchmakerRemove;
    toJSON(message: MatchmakerRemove): unknown;
    fromPartial(object: DeepPartial<MatchmakerRemove>): MatchmakerRemove;
};
export declare const MatchmakerTicket: {
    encode(message: MatchmakerTicket, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerTicket;
    fromJSON(object: any): MatchmakerTicket;
    toJSON(message: MatchmakerTicket): unknown;
    fromPartial(object: DeepPartial<MatchmakerTicket>): MatchmakerTicket;
};
export declare const Notifications: {
    encode(message: Notifications, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Notifications;
    fromJSON(object: any): Notifications;
    toJSON(message: Notifications): unknown;
    fromPartial(object: DeepPartial<Notifications>): Notifications;
};
export declare const Party: {
    encode(message: Party, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Party;
    fromJSON(object: any): Party;
    toJSON(message: Party): unknown;
    fromPartial(object: DeepPartial<Party>): Party;
};
export declare const PartyCreate: {
    encode(message: PartyCreate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyCreate;
    fromJSON(object: any): PartyCreate;
    toJSON(message: PartyCreate): unknown;
    fromPartial(object: DeepPartial<PartyCreate>): PartyCreate;
};
export declare const PartyJoin: {
    encode(message: PartyJoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoin;
    fromJSON(object: any): PartyJoin;
    toJSON(message: PartyJoin): unknown;
    fromPartial(object: DeepPartial<PartyJoin>): PartyJoin;
};
export declare const PartyLeave: {
    encode(message: PartyLeave, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyLeave;
    fromJSON(object: any): PartyLeave;
    toJSON(message: PartyLeave): unknown;
    fromPartial(object: DeepPartial<PartyLeave>): PartyLeave;
};
export declare const PartyPromote: {
    encode(message: PartyPromote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyPromote;
    fromJSON(object: any): PartyPromote;
    toJSON(message: PartyPromote): unknown;
    fromPartial(object: DeepPartial<PartyPromote>): PartyPromote;
};
export declare const PartyLeader: {
    encode(message: PartyLeader, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyLeader;
    fromJSON(object: any): PartyLeader;
    toJSON(message: PartyLeader): unknown;
    fromPartial(object: DeepPartial<PartyLeader>): PartyLeader;
};
export declare const PartyAccept: {
    encode(message: PartyAccept, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyAccept;
    fromJSON(object: any): PartyAccept;
    toJSON(message: PartyAccept): unknown;
    fromPartial(object: DeepPartial<PartyAccept>): PartyAccept;
};
export declare const PartyRemove: {
    encode(message: PartyRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyRemove;
    fromJSON(object: any): PartyRemove;
    toJSON(message: PartyRemove): unknown;
    fromPartial(object: DeepPartial<PartyRemove>): PartyRemove;
};
export declare const PartyClose: {
    encode(message: PartyClose, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyClose;
    fromJSON(object: any): PartyClose;
    toJSON(message: PartyClose): unknown;
    fromPartial(object: DeepPartial<PartyClose>): PartyClose;
};
export declare const PartyJoinRequestList: {
    encode(message: PartyJoinRequestList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoinRequestList;
    fromJSON(object: any): PartyJoinRequestList;
    toJSON(message: PartyJoinRequestList): unknown;
    fromPartial(object: DeepPartial<PartyJoinRequestList>): PartyJoinRequestList;
};
export declare const PartyJoinRequest: {
    encode(message: PartyJoinRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoinRequest;
    fromJSON(object: any): PartyJoinRequest;
    toJSON(message: PartyJoinRequest): unknown;
    fromPartial(object: DeepPartial<PartyJoinRequest>): PartyJoinRequest;
};
export declare const PartyMatchmakerAdd: {
    encode(message: PartyMatchmakerAdd, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd;
    fromJSON(object: any): PartyMatchmakerAdd;
    toJSON(message: PartyMatchmakerAdd): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerAdd>): PartyMatchmakerAdd;
};
export declare const PartyMatchmakerAdd_StringPropertiesEntry: {
    encode(message: PartyMatchmakerAdd_StringPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd_StringPropertiesEntry;
    fromJSON(object: any): PartyMatchmakerAdd_StringPropertiesEntry;
    toJSON(message: PartyMatchmakerAdd_StringPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerAdd_StringPropertiesEntry>): PartyMatchmakerAdd_StringPropertiesEntry;
};
export declare const PartyMatchmakerAdd_NumericPropertiesEntry: {
    encode(message: PartyMatchmakerAdd_NumericPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd_NumericPropertiesEntry;
    fromJSON(object: any): PartyMatchmakerAdd_NumericPropertiesEntry;
    toJSON(message: PartyMatchmakerAdd_NumericPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerAdd_NumericPropertiesEntry>): PartyMatchmakerAdd_NumericPropertiesEntry;
};
export declare const PartyMatchmakerRemove: {
    encode(message: PartyMatchmakerRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerRemove;
    fromJSON(object: any): PartyMatchmakerRemove;
    toJSON(message: PartyMatchmakerRemove): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerRemove>): PartyMatchmakerRemove;
};
export declare const PartyMatchmakerTicket: {
    encode(message: PartyMatchmakerTicket, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerTicket;
    fromJSON(object: any): PartyMatchmakerTicket;
    toJSON(message: PartyMatchmakerTicket): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerTicket>): PartyMatchmakerTicket;
};
export declare const PartyData: {
    encode(message: PartyData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyData;
    fromJSON(object: any): PartyData;
    toJSON(message: PartyData): unknown;
    fromPartial(object: DeepPartial<PartyData>): PartyData;
};
export declare const PartyDataSend: {
    encode(message: PartyDataSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyDataSend;
    fromJSON(object: any): PartyDataSend;
    toJSON(message: PartyDataSend): unknown;
    fromPartial(object: DeepPartial<PartyDataSend>): PartyDataSend;
};
export declare const PartyPresenceEvent: {
    encode(message: PartyPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyPresenceEvent;
    fromJSON(object: any): PartyPresenceEvent;
    toJSON(message: PartyPresenceEvent): unknown;
    fromPartial(object: DeepPartial<PartyPresenceEvent>): PartyPresenceEvent;
};
export declare const Ping: {
    encode(_: Ping, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Ping;
    fromJSON(_: any): Ping;
    toJSON(_: Ping): unknown;
    fromPartial(_: DeepPartial<Ping>): Ping;
};
export declare const Pong: {
    encode(_: Pong, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Pong;
    fromJSON(_: any): Pong;
    toJSON(_: Pong): unknown;
    fromPartial(_: DeepPartial<Pong>): Pong;
};
export declare const Status: {
    encode(message: Status, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Status;
    fromJSON(object: any): Status;
    toJSON(message: Status): unknown;
    fromPartial(object: DeepPartial<Status>): Status;
};
export declare const StatusFollow: {
    encode(message: StatusFollow, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusFollow;
    fromJSON(object: any): StatusFollow;
    toJSON(message: StatusFollow): unknown;
    fromPartial(object: DeepPartial<StatusFollow>): StatusFollow;
};
export declare const StatusPresenceEvent: {
    encode(message: StatusPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusPresenceEvent;
    fromJSON(object: any): StatusPresenceEvent;
    toJSON(message: StatusPresenceEvent): unknown;
    fromPartial(object: DeepPartial<StatusPresenceEvent>): StatusPresenceEvent;
};
export declare const StatusUnfollow: {
    encode(message: StatusUnfollow, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusUnfollow;
    fromJSON(object: any): StatusUnfollow;
    toJSON(message: StatusUnfollow): unknown;
    fromPartial(object: DeepPartial<StatusUnfollow>): StatusUnfollow;
};
export declare const StatusUpdate: {
    encode(message: StatusUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusUpdate;
    fromJSON(object: any): StatusUpdate;
    toJSON(message: StatusUpdate): unknown;
    fromPartial(object: DeepPartial<StatusUpdate>): StatusUpdate;
};
export declare const Stream: {
    encode(message: Stream, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Stream;
    fromJSON(object: any): Stream;
    toJSON(message: Stream): unknown;
    fromPartial(object: DeepPartial<Stream>): Stream;
};
export declare const StreamData: {
    encode(message: StreamData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StreamData;
    fromJSON(object: any): StreamData;
    toJSON(message: StreamData): unknown;
    fromPartial(object: DeepPartial<StreamData>): StreamData;
};
export declare const StreamPresenceEvent: {
    encode(message: StreamPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StreamPresenceEvent;
    fromJSON(object: any): StreamPresenceEvent;
    toJSON(message: StreamPresenceEvent): unknown;
    fromPartial(object: DeepPartial<StreamPresenceEvent>): StreamPresenceEvent;
};
export declare const UserPresence: {
    encode(message: UserPresence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UserPresence;
    fromJSON(object: any): UserPresence;
    toJSON(message: UserPresence): unknown;
    fromPartial(object: DeepPartial<UserPresence>): UserPresence;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
