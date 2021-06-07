import _m0 from "protobufjs/minimal";
import { Notification, ChannelMessage, Rpc } from "../api/api";
export declare const protobufPackage = "nakama.realtime";
export interface Envelope {
    cid: string;
    message?: {
        $case: "channel";
        channel: Channel;
    } | {
        $case: "channel_join";
        channel_join: ChannelJoin;
    } | {
        $case: "channel_leave";
        channel_leave: ChannelLeave;
    } | {
        $case: "channel_message";
        channel_message: ChannelMessage;
    } | {
        $case: "channel_message_ack";
        channel_message_ack: ChannelMessageAck;
    } | {
        $case: "channel_message_send";
        channel_message_send: ChannelMessageSend;
    } | {
        $case: "channel_message_update";
        channel_message_update: ChannelMessageUpdate;
    } | {
        $case: "channel_message_remove";
        channel_message_remove: ChannelMessageRemove;
    } | {
        $case: "channel_presence_event";
        channel_presence_event: ChannelPresenceEvent;
    } | {
        $case: "error";
        error: Error;
    } | {
        $case: "match";
        match: Match;
    } | {
        $case: "match_create";
        match_create: MatchCreate;
    } | {
        $case: "match_data";
        match_data: MatchData;
    } | {
        $case: "match_data_send";
        match_data_send: MatchDataSend;
    } | {
        $case: "match_join";
        match_join: MatchJoin;
    } | {
        $case: "match_leave";
        match_leave: MatchLeave;
    } | {
        $case: "match_presence_event";
        match_presence_event: MatchPresenceEvent;
    } | {
        $case: "matchmaker_add";
        matchmaker_add: MatchmakerAdd;
    } | {
        $case: "matchmaker_matched";
        matchmaker_matched: MatchmakerMatched;
    } | {
        $case: "matchmaker_remove";
        matchmaker_remove: MatchmakerRemove;
    } | {
        $case: "matchmaker_ticket";
        matchmaker_ticket: MatchmakerTicket;
    } | {
        $case: "notifications";
        notifications: Notifications;
    } | {
        $case: "rpc";
        rpc: Rpc;
    } | {
        $case: "status";
        status: Status;
    } | {
        $case: "status_follow";
        status_follow: StatusFollow;
    } | {
        $case: "status_presence_event";
        status_presence_event: StatusPresenceEvent;
    } | {
        $case: "status_unfollow";
        status_unfollow: StatusUnfollow;
    } | {
        $case: "status_update";
        status_update: StatusUpdate;
    } | {
        $case: "stream_data";
        stream_data: StreamData;
    } | {
        $case: "stream_presence_event";
        stream_presence_event: StreamPresenceEvent;
    } | {
        $case: "ping";
        ping: Ping;
    } | {
        $case: "pong";
        pong: Pong;
    } | {
        $case: "party";
        party: Party;
    } | {
        $case: "party_create";
        party_create: PartyCreate;
    } | {
        $case: "party_join";
        party_join: PartyJoin;
    } | {
        $case: "party_leave";
        party_leave: PartyLeave;
    } | {
        $case: "party_promote";
        party_promote: PartyPromote;
    } | {
        $case: "party_leader";
        party_leader: PartyLeader;
    } | {
        $case: "party_accept";
        party_accept: PartyAccept;
    } | {
        $case: "party_remove";
        party_remove: PartyRemove;
    } | {
        $case: "party_close";
        party_close: PartyClose;
    } | {
        $case: "party_join_request_list";
        party_join_request_list: PartyJoinRequestList;
    } | {
        $case: "party_join_request";
        party_join_request: PartyJoinRequest;
    } | {
        $case: "party_matchmaker_add";
        party_matchmaker_add: PartyMatchmakerAdd;
    } | {
        $case: "party_matchmaker_remove";
        party_matchmaker_remove: PartyMatchmakerRemove;
    } | {
        $case: "party_matchmaker_ticket";
        party_matchmaker_ticket: PartyMatchmakerTicket;
    } | {
        $case: "party_data";
        party_data: PartyData;
    } | {
        $case: "party_data_send";
        party_data_send: PartyDataSend;
    } | {
        $case: "party_presence_event";
        party_presence_event: PartyPresenceEvent;
    };
}
export interface Channel {
    id: string;
    presences: UserPresence[];
    self?: UserPresence;
    room_name: string;
    group_id: string;
    user_id_one: string;
    user_id_two: string;
}
export interface ChannelJoin {
    target: string;
    type: number;
    persistence?: boolean;
    hidden?: boolean;
}
export declare enum ChannelJoin_Type {
    TYPE_UNSPECIFIED = 0,
    ROOM = 1,
    DIRECT_MESSAGE = 2,
    GROUP = 3,
    UNRECOGNIZED = -1
}
export declare function channelJoin_TypeFromJSON(object: any): ChannelJoin_Type;
export declare function channelJoin_TypeToJSON(object: ChannelJoin_Type): string;
export interface ChannelLeave {
    channel_id: string;
}
export interface ChannelMessageAck {
    channel_id: string;
    message_id: string;
    code?: number;
    username: string;
    create_time?: Date;
    update_time?: Date;
    persistent?: boolean;
    room_name: string;
    group_id: string;
    user_id_one: string;
    user_id_two: string;
}
export interface ChannelMessageSend {
    channel_id: string;
    content: string;
}
export interface ChannelMessageUpdate {
    channel_id: string;
    message_id: string;
    content: string;
}
export interface ChannelMessageRemove {
    channel_id: string;
    message_id: string;
}
export interface ChannelPresenceEvent {
    channel_id: string;
    joins: UserPresence[];
    leaves: UserPresence[];
    room_name: string;
    group_id: string;
    user_id_one: string;
    user_id_two: string;
}
export interface Error {
    code: number;
    message: string;
    context: {
        [key: string]: string;
    };
}
export declare enum Error_Code {
    RUNTIME_EXCEPTION = 0,
    UNRECOGNIZED_PAYLOAD = 1,
    MISSING_PAYLOAD = 2,
    BAD_INPUT = 3,
    MATCH_NOT_FOUND = 4,
    MATCH_JOIN_REJECTED = 5,
    RUNTIME_FUNCTION_NOT_FOUND = 6,
    RUNTIME_FUNCTION_EXCEPTION = 7,
    UNRECOGNIZED = -1
}
export declare function error_CodeFromJSON(object: any): Error_Code;
export declare function error_CodeToJSON(object: Error_Code): string;
export interface Error_ContextEntry {
    key: string;
    value: string;
}
export interface Match {
    match_id: string;
    authoritative: boolean;
    label?: string;
    size: number;
    presences: UserPresence[];
    self?: UserPresence;
}
export interface MatchCreate {
}
export interface MatchData {
    match_id: string;
    presence?: UserPresence;
    op_code: number;
    data: Uint8Array;
    reliable: boolean;
}
export interface MatchDataSend {
    match_id: string;
    op_code: number;
    data: Uint8Array;
    presences: UserPresence[];
    reliable: boolean;
}
export interface MatchJoin {
    id?: {
        $case: "match_id";
        match_id: string;
    } | {
        $case: "token";
        token: string;
    };
    metadata: {
        [key: string]: string;
    };
}
export interface MatchJoin_MetadataEntry {
    key: string;
    value: string;
}
export interface MatchLeave {
    match_id: string;
}
export interface MatchPresenceEvent {
    match_id: string;
    joins: UserPresence[];
    leaves: UserPresence[];
}
export interface MatchmakerAdd {
    min_count: number;
    max_count: number;
    query: string;
    string_properties: {
        [key: string]: string;
    };
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
export interface MatchmakerMatched {
    ticket: string;
    id?: {
        $case: "match_id";
        match_id: string;
    } | {
        $case: "token";
        token: string;
    };
    users: MatchmakerMatched_MatchmakerUser[];
    self?: MatchmakerMatched_MatchmakerUser;
}
export interface MatchmakerMatched_MatchmakerUser {
    presence?: UserPresence;
    party_id: string;
    string_properties: {
        [key: string]: string;
    };
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
export interface MatchmakerRemove {
    ticket: string;
}
export interface MatchmakerTicket {
    ticket: string;
}
export interface Notifications {
    notifications: Notification[];
}
export interface Party {
    party_id: string;
    open: boolean;
    max_size: number;
    self?: UserPresence;
    leader?: UserPresence;
    presences: UserPresence[];
}
export interface PartyCreate {
    open: boolean;
    max_size: number;
}
export interface PartyJoin {
    party_id: string;
}
export interface PartyLeave {
    party_id: string;
}
export interface PartyPromote {
    party_id: string;
    presence?: UserPresence;
}
export interface PartyLeader {
    party_id: string;
    presence?: UserPresence;
}
export interface PartyAccept {
    party_id: string;
    presence?: UserPresence;
}
export interface PartyRemove {
    party_id: string;
    presence?: UserPresence;
}
export interface PartyClose {
    party_id: string;
}
export interface PartyJoinRequestList {
    party_id: string;
}
export interface PartyJoinRequest {
    party_id: string;
    presences: UserPresence[];
}
export interface PartyMatchmakerAdd {
    party_id: string;
    min_count: number;
    max_count: number;
    query: string;
    string_properties: {
        [key: string]: string;
    };
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
export interface PartyMatchmakerRemove {
    party_id: string;
    ticket: string;
}
export interface PartyMatchmakerTicket {
    party_id: string;
    ticket: string;
}
export interface PartyData {
    party_id: string;
    presence?: UserPresence;
    op_code: number;
    data: Uint8Array;
}
export interface PartyDataSend {
    party_id: string;
    op_code: number;
    data: Uint8Array;
}
export interface PartyPresenceEvent {
    party_id: string;
    joins: UserPresence[];
    leaves: UserPresence[];
}
export interface Ping {
}
export interface Pong {
}
export interface Status {
    presences: UserPresence[];
}
export interface StatusFollow {
    user_ids: string[];
    usernames: string[];
}
export interface StatusPresenceEvent {
    joins: UserPresence[];
    leaves: UserPresence[];
}
export interface StatusUnfollow {
    user_ids: string[];
}
export interface StatusUpdate {
    status?: string;
}
export interface Stream {
    mode: number;
    subject: string;
    subcontext: string;
    label: string;
}
export interface StreamData {
    stream?: Stream;
    sender?: UserPresence;
    data: string;
    reliable: boolean;
}
export interface StreamPresenceEvent {
    stream?: Stream;
    joins: UserPresence[];
    leaves: UserPresence[];
}
export interface UserPresence {
    user_id: string;
    session_id: string;
    username: string;
    persistence: boolean;
    status?: string;
}
export declare const Envelope: {
    encode(message: Envelope, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Envelope;
    fromJSON(object: any): Envelope;
    toJSON(message: Envelope): unknown;
    fromPartial(object: DeepPartial<Envelope>): Envelope;
};
export declare const Channel: {
    encode(message: Channel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Channel;
    fromJSON(object: any): Channel;
    toJSON(message: Channel): unknown;
    fromPartial(object: DeepPartial<Channel>): Channel;
};
export declare const ChannelJoin: {
    encode(message: ChannelJoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelJoin;
    fromJSON(object: any): ChannelJoin;
    toJSON(message: ChannelJoin): unknown;
    fromPartial(object: DeepPartial<ChannelJoin>): ChannelJoin;
};
export declare const ChannelLeave: {
    encode(message: ChannelLeave, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelLeave;
    fromJSON(object: any): ChannelLeave;
    toJSON(message: ChannelLeave): unknown;
    fromPartial(object: DeepPartial<ChannelLeave>): ChannelLeave;
};
export declare const ChannelMessageAck: {
    encode(message: ChannelMessageAck, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelMessageAck;
    fromJSON(object: any): ChannelMessageAck;
    toJSON(message: ChannelMessageAck): unknown;
    fromPartial(object: DeepPartial<ChannelMessageAck>): ChannelMessageAck;
};
export declare const ChannelMessageSend: {
    encode(message: ChannelMessageSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelMessageSend;
    fromJSON(object: any): ChannelMessageSend;
    toJSON(message: ChannelMessageSend): unknown;
    fromPartial(object: DeepPartial<ChannelMessageSend>): ChannelMessageSend;
};
export declare const ChannelMessageUpdate: {
    encode(message: ChannelMessageUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelMessageUpdate;
    fromJSON(object: any): ChannelMessageUpdate;
    toJSON(message: ChannelMessageUpdate): unknown;
    fromPartial(object: DeepPartial<ChannelMessageUpdate>): ChannelMessageUpdate;
};
export declare const ChannelMessageRemove: {
    encode(message: ChannelMessageRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelMessageRemove;
    fromJSON(object: any): ChannelMessageRemove;
    toJSON(message: ChannelMessageRemove): unknown;
    fromPartial(object: DeepPartial<ChannelMessageRemove>): ChannelMessageRemove;
};
export declare const ChannelPresenceEvent: {
    encode(message: ChannelPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelPresenceEvent;
    fromJSON(object: any): ChannelPresenceEvent;
    toJSON(message: ChannelPresenceEvent): unknown;
    fromPartial(object: DeepPartial<ChannelPresenceEvent>): ChannelPresenceEvent;
};
export declare const Error: {
    encode(message: Error, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Error;
    fromJSON(object: any): Error;
    toJSON(message: Error): unknown;
    fromPartial(object: DeepPartial<Error>): Error;
};
export declare const Error_ContextEntry: {
    encode(message: Error_ContextEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Error_ContextEntry;
    fromJSON(object: any): Error_ContextEntry;
    toJSON(message: Error_ContextEntry): unknown;
    fromPartial(object: DeepPartial<Error_ContextEntry>): Error_ContextEntry;
};
export declare const Match: {
    encode(message: Match, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Match;
    fromJSON(object: any): Match;
    toJSON(message: Match): unknown;
    fromPartial(object: DeepPartial<Match>): Match;
};
export declare const MatchCreate: {
    encode(_: MatchCreate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchCreate;
    fromJSON(_: any): MatchCreate;
    toJSON(_: MatchCreate): unknown;
    fromPartial(_: DeepPartial<MatchCreate>): MatchCreate;
};
export declare const MatchData: {
    encode(message: MatchData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchData;
    fromJSON(object: any): MatchData;
    toJSON(message: MatchData): unknown;
    fromPartial(object: DeepPartial<MatchData>): MatchData;
};
export declare const MatchDataSend: {
    encode(message: MatchDataSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchDataSend;
    fromJSON(object: any): MatchDataSend;
    toJSON(message: MatchDataSend): unknown;
    fromPartial(object: DeepPartial<MatchDataSend>): MatchDataSend;
};
export declare const MatchJoin: {
    encode(message: MatchJoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchJoin;
    fromJSON(object: any): MatchJoin;
    toJSON(message: MatchJoin): unknown;
    fromPartial(object: DeepPartial<MatchJoin>): MatchJoin;
};
export declare const MatchJoin_MetadataEntry: {
    encode(message: MatchJoin_MetadataEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchJoin_MetadataEntry;
    fromJSON(object: any): MatchJoin_MetadataEntry;
    toJSON(message: MatchJoin_MetadataEntry): unknown;
    fromPartial(object: DeepPartial<MatchJoin_MetadataEntry>): MatchJoin_MetadataEntry;
};
export declare const MatchLeave: {
    encode(message: MatchLeave, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchLeave;
    fromJSON(object: any): MatchLeave;
    toJSON(message: MatchLeave): unknown;
    fromPartial(object: DeepPartial<MatchLeave>): MatchLeave;
};
export declare const MatchPresenceEvent: {
    encode(message: MatchPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchPresenceEvent;
    fromJSON(object: any): MatchPresenceEvent;
    toJSON(message: MatchPresenceEvent): unknown;
    fromPartial(object: DeepPartial<MatchPresenceEvent>): MatchPresenceEvent;
};
export declare const MatchmakerAdd: {
    encode(message: MatchmakerAdd, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerAdd;
    fromJSON(object: any): MatchmakerAdd;
    toJSON(message: MatchmakerAdd): unknown;
    fromPartial(object: DeepPartial<MatchmakerAdd>): MatchmakerAdd;
};
export declare const MatchmakerAdd_StringPropertiesEntry: {
    encode(message: MatchmakerAdd_StringPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerAdd_StringPropertiesEntry;
    fromJSON(object: any): MatchmakerAdd_StringPropertiesEntry;
    toJSON(message: MatchmakerAdd_StringPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<MatchmakerAdd_StringPropertiesEntry>): MatchmakerAdd_StringPropertiesEntry;
};
export declare const MatchmakerAdd_NumericPropertiesEntry: {
    encode(message: MatchmakerAdd_NumericPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerAdd_NumericPropertiesEntry;
    fromJSON(object: any): MatchmakerAdd_NumericPropertiesEntry;
    toJSON(message: MatchmakerAdd_NumericPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<MatchmakerAdd_NumericPropertiesEntry>): MatchmakerAdd_NumericPropertiesEntry;
};
export declare const MatchmakerMatched: {
    encode(message: MatchmakerMatched, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerMatched;
    fromJSON(object: any): MatchmakerMatched;
    toJSON(message: MatchmakerMatched): unknown;
    fromPartial(object: DeepPartial<MatchmakerMatched>): MatchmakerMatched;
};
export declare const MatchmakerMatched_MatchmakerUser: {
    encode(message: MatchmakerMatched_MatchmakerUser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerMatched_MatchmakerUser;
    fromJSON(object: any): MatchmakerMatched_MatchmakerUser;
    toJSON(message: MatchmakerMatched_MatchmakerUser): unknown;
    fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser>): MatchmakerMatched_MatchmakerUser;
};
export declare const MatchmakerMatched_MatchmakerUser_StringPropertiesEntry: {
    encode(message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    fromJSON(object: any): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    toJSON(message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser_StringPropertiesEntry>): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
};
export declare const MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry: {
    encode(message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    fromJSON(object: any): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    toJSON(message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry>): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
};
export declare const MatchmakerRemove: {
    encode(message: MatchmakerRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerRemove;
    fromJSON(object: any): MatchmakerRemove;
    toJSON(message: MatchmakerRemove): unknown;
    fromPartial(object: DeepPartial<MatchmakerRemove>): MatchmakerRemove;
};
export declare const MatchmakerTicket: {
    encode(message: MatchmakerTicket, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchmakerTicket;
    fromJSON(object: any): MatchmakerTicket;
    toJSON(message: MatchmakerTicket): unknown;
    fromPartial(object: DeepPartial<MatchmakerTicket>): MatchmakerTicket;
};
export declare const Notifications: {
    encode(message: Notifications, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Notifications;
    fromJSON(object: any): Notifications;
    toJSON(message: Notifications): unknown;
    fromPartial(object: DeepPartial<Notifications>): Notifications;
};
export declare const Party: {
    encode(message: Party, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Party;
    fromJSON(object: any): Party;
    toJSON(message: Party): unknown;
    fromPartial(object: DeepPartial<Party>): Party;
};
export declare const PartyCreate: {
    encode(message: PartyCreate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyCreate;
    fromJSON(object: any): PartyCreate;
    toJSON(message: PartyCreate): unknown;
    fromPartial(object: DeepPartial<PartyCreate>): PartyCreate;
};
export declare const PartyJoin: {
    encode(message: PartyJoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyJoin;
    fromJSON(object: any): PartyJoin;
    toJSON(message: PartyJoin): unknown;
    fromPartial(object: DeepPartial<PartyJoin>): PartyJoin;
};
export declare const PartyLeave: {
    encode(message: PartyLeave, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyLeave;
    fromJSON(object: any): PartyLeave;
    toJSON(message: PartyLeave): unknown;
    fromPartial(object: DeepPartial<PartyLeave>): PartyLeave;
};
export declare const PartyPromote: {
    encode(message: PartyPromote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyPromote;
    fromJSON(object: any): PartyPromote;
    toJSON(message: PartyPromote): unknown;
    fromPartial(object: DeepPartial<PartyPromote>): PartyPromote;
};
export declare const PartyLeader: {
    encode(message: PartyLeader, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyLeader;
    fromJSON(object: any): PartyLeader;
    toJSON(message: PartyLeader): unknown;
    fromPartial(object: DeepPartial<PartyLeader>): PartyLeader;
};
export declare const PartyAccept: {
    encode(message: PartyAccept, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyAccept;
    fromJSON(object: any): PartyAccept;
    toJSON(message: PartyAccept): unknown;
    fromPartial(object: DeepPartial<PartyAccept>): PartyAccept;
};
export declare const PartyRemove: {
    encode(message: PartyRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyRemove;
    fromJSON(object: any): PartyRemove;
    toJSON(message: PartyRemove): unknown;
    fromPartial(object: DeepPartial<PartyRemove>): PartyRemove;
};
export declare const PartyClose: {
    encode(message: PartyClose, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyClose;
    fromJSON(object: any): PartyClose;
    toJSON(message: PartyClose): unknown;
    fromPartial(object: DeepPartial<PartyClose>): PartyClose;
};
export declare const PartyJoinRequestList: {
    encode(message: PartyJoinRequestList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyJoinRequestList;
    fromJSON(object: any): PartyJoinRequestList;
    toJSON(message: PartyJoinRequestList): unknown;
    fromPartial(object: DeepPartial<PartyJoinRequestList>): PartyJoinRequestList;
};
export declare const PartyJoinRequest: {
    encode(message: PartyJoinRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyJoinRequest;
    fromJSON(object: any): PartyJoinRequest;
    toJSON(message: PartyJoinRequest): unknown;
    fromPartial(object: DeepPartial<PartyJoinRequest>): PartyJoinRequest;
};
export declare const PartyMatchmakerAdd: {
    encode(message: PartyMatchmakerAdd, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyMatchmakerAdd;
    fromJSON(object: any): PartyMatchmakerAdd;
    toJSON(message: PartyMatchmakerAdd): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerAdd>): PartyMatchmakerAdd;
};
export declare const PartyMatchmakerAdd_StringPropertiesEntry: {
    encode(message: PartyMatchmakerAdd_StringPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyMatchmakerAdd_StringPropertiesEntry;
    fromJSON(object: any): PartyMatchmakerAdd_StringPropertiesEntry;
    toJSON(message: PartyMatchmakerAdd_StringPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerAdd_StringPropertiesEntry>): PartyMatchmakerAdd_StringPropertiesEntry;
};
export declare const PartyMatchmakerAdd_NumericPropertiesEntry: {
    encode(message: PartyMatchmakerAdd_NumericPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyMatchmakerAdd_NumericPropertiesEntry;
    fromJSON(object: any): PartyMatchmakerAdd_NumericPropertiesEntry;
    toJSON(message: PartyMatchmakerAdd_NumericPropertiesEntry): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerAdd_NumericPropertiesEntry>): PartyMatchmakerAdd_NumericPropertiesEntry;
};
export declare const PartyMatchmakerRemove: {
    encode(message: PartyMatchmakerRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyMatchmakerRemove;
    fromJSON(object: any): PartyMatchmakerRemove;
    toJSON(message: PartyMatchmakerRemove): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerRemove>): PartyMatchmakerRemove;
};
export declare const PartyMatchmakerTicket: {
    encode(message: PartyMatchmakerTicket, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyMatchmakerTicket;
    fromJSON(object: any): PartyMatchmakerTicket;
    toJSON(message: PartyMatchmakerTicket): unknown;
    fromPartial(object: DeepPartial<PartyMatchmakerTicket>): PartyMatchmakerTicket;
};
export declare const PartyData: {
    encode(message: PartyData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyData;
    fromJSON(object: any): PartyData;
    toJSON(message: PartyData): unknown;
    fromPartial(object: DeepPartial<PartyData>): PartyData;
};
export declare const PartyDataSend: {
    encode(message: PartyDataSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyDataSend;
    fromJSON(object: any): PartyDataSend;
    toJSON(message: PartyDataSend): unknown;
    fromPartial(object: DeepPartial<PartyDataSend>): PartyDataSend;
};
export declare const PartyPresenceEvent: {
    encode(message: PartyPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PartyPresenceEvent;
    fromJSON(object: any): PartyPresenceEvent;
    toJSON(message: PartyPresenceEvent): unknown;
    fromPartial(object: DeepPartial<PartyPresenceEvent>): PartyPresenceEvent;
};
export declare const Ping: {
    encode(_: Ping, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Ping;
    fromJSON(_: any): Ping;
    toJSON(_: Ping): unknown;
    fromPartial(_: DeepPartial<Ping>): Ping;
};
export declare const Pong: {
    encode(_: Pong, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Pong;
    fromJSON(_: any): Pong;
    toJSON(_: Pong): unknown;
    fromPartial(_: DeepPartial<Pong>): Pong;
};
export declare const Status: {
    encode(message: Status, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Status;
    fromJSON(object: any): Status;
    toJSON(message: Status): unknown;
    fromPartial(object: DeepPartial<Status>): Status;
};
export declare const StatusFollow: {
    encode(message: StatusFollow, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StatusFollow;
    fromJSON(object: any): StatusFollow;
    toJSON(message: StatusFollow): unknown;
    fromPartial(object: DeepPartial<StatusFollow>): StatusFollow;
};
export declare const StatusPresenceEvent: {
    encode(message: StatusPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StatusPresenceEvent;
    fromJSON(object: any): StatusPresenceEvent;
    toJSON(message: StatusPresenceEvent): unknown;
    fromPartial(object: DeepPartial<StatusPresenceEvent>): StatusPresenceEvent;
};
export declare const StatusUnfollow: {
    encode(message: StatusUnfollow, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StatusUnfollow;
    fromJSON(object: any): StatusUnfollow;
    toJSON(message: StatusUnfollow): unknown;
    fromPartial(object: DeepPartial<StatusUnfollow>): StatusUnfollow;
};
export declare const StatusUpdate: {
    encode(message: StatusUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StatusUpdate;
    fromJSON(object: any): StatusUpdate;
    toJSON(message: StatusUpdate): unknown;
    fromPartial(object: DeepPartial<StatusUpdate>): StatusUpdate;
};
export declare const Stream: {
    encode(message: Stream, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Stream;
    fromJSON(object: any): Stream;
    toJSON(message: Stream): unknown;
    fromPartial(object: DeepPartial<Stream>): Stream;
};
export declare const StreamData: {
    encode(message: StreamData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StreamData;
    fromJSON(object: any): StreamData;
    toJSON(message: StreamData): unknown;
    fromPartial(object: DeepPartial<StreamData>): StreamData;
};
export declare const StreamPresenceEvent: {
    encode(message: StreamPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StreamPresenceEvent;
    fromJSON(object: any): StreamPresenceEvent;
    toJSON(message: StreamPresenceEvent): unknown;
    fromPartial(object: DeepPartial<StreamPresenceEvent>): StreamPresenceEvent;
};
export declare const UserPresence: {
    encode(message: UserPresence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UserPresence;
    fromJSON(object: any): UserPresence;
    toJSON(message: UserPresence): unknown;
    fromPartial(object: DeepPartial<UserPresence>): UserPresence;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]>;
} & {
    $case: T["$case"];
} : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
