/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { ChannelMessage, Rpc, Notification } from "../api/api";
import {
  BoolValue,
  Int32Value,
  StringValue,
} from "../google/protobuf/wrappers";

export const protobufPackage = "nakama.realtime";

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
export enum ChannelJoin_Type {
  /** TYPE_UNSPECIFIED - Default case. Assumed as ROOM type. */
  TYPE_UNSPECIFIED = 0,
  /** ROOM - A room which anyone can join to chat. */
  ROOM = 1,
  /** DIRECT_MESSAGE - A private channel for 1-on-1 chat. */
  DIRECT_MESSAGE = 2,
  /** GROUP - A channel for group chat. */
  GROUP = 3,
  UNRECOGNIZED = -1,
}

export function channelJoin_TypeFromJSON(object: any): ChannelJoin_Type {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return ChannelJoin_Type.TYPE_UNSPECIFIED;
    case 1:
    case "ROOM":
      return ChannelJoin_Type.ROOM;
    case 2:
    case "DIRECT_MESSAGE":
      return ChannelJoin_Type.DIRECT_MESSAGE;
    case 3:
    case "GROUP":
      return ChannelJoin_Type.GROUP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChannelJoin_Type.UNRECOGNIZED;
  }
}

export function channelJoin_TypeToJSON(object: ChannelJoin_Type): string {
  switch (object) {
    case ChannelJoin_Type.TYPE_UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case ChannelJoin_Type.ROOM:
      return "ROOM";
    case ChannelJoin_Type.DIRECT_MESSAGE:
      return "DIRECT_MESSAGE";
    case ChannelJoin_Type.GROUP:
      return "GROUP";
    default:
      return "UNKNOWN";
  }
}

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
  context: { [key: string]: string };
}

/** The selection of possible error codes. */
export enum Error_Code {
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
  UNRECOGNIZED = -1,
}

export function error_CodeFromJSON(object: any): Error_Code {
  switch (object) {
    case 0:
    case "RUNTIME_EXCEPTION":
      return Error_Code.RUNTIME_EXCEPTION;
    case 1:
    case "UNRECOGNIZED_PAYLOAD":
      return Error_Code.UNRECOGNIZED_PAYLOAD;
    case 2:
    case "MISSING_PAYLOAD":
      return Error_Code.MISSING_PAYLOAD;
    case 3:
    case "BAD_INPUT":
      return Error_Code.BAD_INPUT;
    case 4:
    case "MATCH_NOT_FOUND":
      return Error_Code.MATCH_NOT_FOUND;
    case 5:
    case "MATCH_JOIN_REJECTED":
      return Error_Code.MATCH_JOIN_REJECTED;
    case 6:
    case "RUNTIME_FUNCTION_NOT_FOUND":
      return Error_Code.RUNTIME_FUNCTION_NOT_FOUND;
    case 7:
    case "RUNTIME_FUNCTION_EXCEPTION":
      return Error_Code.RUNTIME_FUNCTION_EXCEPTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Error_Code.UNRECOGNIZED;
  }
}

export function error_CodeToJSON(object: Error_Code): string {
  switch (object) {
    case Error_Code.RUNTIME_EXCEPTION:
      return "RUNTIME_EXCEPTION";
    case Error_Code.UNRECOGNIZED_PAYLOAD:
      return "UNRECOGNIZED_PAYLOAD";
    case Error_Code.MISSING_PAYLOAD:
      return "MISSING_PAYLOAD";
    case Error_Code.BAD_INPUT:
      return "BAD_INPUT";
    case Error_Code.MATCH_NOT_FOUND:
      return "MATCH_NOT_FOUND";
    case Error_Code.MATCH_JOIN_REJECTED:
      return "MATCH_JOIN_REJECTED";
    case Error_Code.RUNTIME_FUNCTION_NOT_FOUND:
      return "RUNTIME_FUNCTION_NOT_FOUND";
    case Error_Code.RUNTIME_FUNCTION_EXCEPTION:
      return "RUNTIME_FUNCTION_EXCEPTION";
    default:
      return "UNKNOWN";
  }
}

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
export interface MatchCreate {}

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
  metadata: { [key: string]: string };
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
  string_properties: { [key: string]: string };
  /** Numeric properties. */
  numeric_properties: { [key: string]: number };
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
  string_properties: { [key: string]: string };
  /** Numeric properties. */
  numeric_properties: { [key: string]: number };
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
  string_properties: { [key: string]: string };
  /** Numeric properties. */
  numeric_properties: { [key: string]: number };
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
export interface Ping {}

/** Application-level heartbeat and connection check response. */
export interface Pong {}

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

const baseEnvelope: object = { cid: "" };

export const Envelope = {
  encode(
    message: Envelope,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (message.channel_join !== undefined) {
      ChannelJoin.encode(
        message.channel_join,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.channel_leave !== undefined) {
      ChannelLeave.encode(
        message.channel_leave,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.channel_message !== undefined) {
      ChannelMessage.encode(
        message.channel_message,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.channel_message_ack !== undefined) {
      ChannelMessageAck.encode(
        message.channel_message_ack,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.channel_message_send !== undefined) {
      ChannelMessageSend.encode(
        message.channel_message_send,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.channel_message_update !== undefined) {
      ChannelMessageUpdate.encode(
        message.channel_message_update,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.channel_message_remove !== undefined) {
      ChannelMessageRemove.encode(
        message.channel_message_remove,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.channel_presence_event !== undefined) {
      ChannelPresenceEvent.encode(
        message.channel_presence_event,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(90).fork()).ldelim();
    }
    if (message.match !== undefined) {
      Match.encode(message.match, writer.uint32(98).fork()).ldelim();
    }
    if (message.match_create !== undefined) {
      MatchCreate.encode(
        message.match_create,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.match_data !== undefined) {
      MatchData.encode(message.match_data, writer.uint32(114).fork()).ldelim();
    }
    if (message.match_data_send !== undefined) {
      MatchDataSend.encode(
        message.match_data_send,
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.match_join !== undefined) {
      MatchJoin.encode(message.match_join, writer.uint32(130).fork()).ldelim();
    }
    if (message.match_leave !== undefined) {
      MatchLeave.encode(
        message.match_leave,
        writer.uint32(138).fork()
      ).ldelim();
    }
    if (message.match_presence_event !== undefined) {
      MatchPresenceEvent.encode(
        message.match_presence_event,
        writer.uint32(146).fork()
      ).ldelim();
    }
    if (message.matchmaker_add !== undefined) {
      MatchmakerAdd.encode(
        message.matchmaker_add,
        writer.uint32(154).fork()
      ).ldelim();
    }
    if (message.matchmaker_matched !== undefined) {
      MatchmakerMatched.encode(
        message.matchmaker_matched,
        writer.uint32(162).fork()
      ).ldelim();
    }
    if (message.matchmaker_remove !== undefined) {
      MatchmakerRemove.encode(
        message.matchmaker_remove,
        writer.uint32(170).fork()
      ).ldelim();
    }
    if (message.matchmaker_ticket !== undefined) {
      MatchmakerTicket.encode(
        message.matchmaker_ticket,
        writer.uint32(178).fork()
      ).ldelim();
    }
    if (message.notifications !== undefined) {
      Notifications.encode(
        message.notifications,
        writer.uint32(186).fork()
      ).ldelim();
    }
    if (message.rpc !== undefined) {
      Rpc.encode(message.rpc, writer.uint32(194).fork()).ldelim();
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(202).fork()).ldelim();
    }
    if (message.status_follow !== undefined) {
      StatusFollow.encode(
        message.status_follow,
        writer.uint32(210).fork()
      ).ldelim();
    }
    if (message.status_presence_event !== undefined) {
      StatusPresenceEvent.encode(
        message.status_presence_event,
        writer.uint32(218).fork()
      ).ldelim();
    }
    if (message.status_unfollow !== undefined) {
      StatusUnfollow.encode(
        message.status_unfollow,
        writer.uint32(226).fork()
      ).ldelim();
    }
    if (message.status_update !== undefined) {
      StatusUpdate.encode(
        message.status_update,
        writer.uint32(234).fork()
      ).ldelim();
    }
    if (message.stream_data !== undefined) {
      StreamData.encode(
        message.stream_data,
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.stream_presence_event !== undefined) {
      StreamPresenceEvent.encode(
        message.stream_presence_event,
        writer.uint32(250).fork()
      ).ldelim();
    }
    if (message.ping !== undefined) {
      Ping.encode(message.ping, writer.uint32(258).fork()).ldelim();
    }
    if (message.pong !== undefined) {
      Pong.encode(message.pong, writer.uint32(266).fork()).ldelim();
    }
    if (message.party !== undefined) {
      Party.encode(message.party, writer.uint32(274).fork()).ldelim();
    }
    if (message.party_create !== undefined) {
      PartyCreate.encode(
        message.party_create,
        writer.uint32(282).fork()
      ).ldelim();
    }
    if (message.party_join !== undefined) {
      PartyJoin.encode(message.party_join, writer.uint32(290).fork()).ldelim();
    }
    if (message.party_leave !== undefined) {
      PartyLeave.encode(
        message.party_leave,
        writer.uint32(298).fork()
      ).ldelim();
    }
    if (message.party_promote !== undefined) {
      PartyPromote.encode(
        message.party_promote,
        writer.uint32(306).fork()
      ).ldelim();
    }
    if (message.party_leader !== undefined) {
      PartyLeader.encode(
        message.party_leader,
        writer.uint32(314).fork()
      ).ldelim();
    }
    if (message.party_accept !== undefined) {
      PartyAccept.encode(
        message.party_accept,
        writer.uint32(322).fork()
      ).ldelim();
    }
    if (message.party_remove !== undefined) {
      PartyRemove.encode(
        message.party_remove,
        writer.uint32(330).fork()
      ).ldelim();
    }
    if (message.party_close !== undefined) {
      PartyClose.encode(
        message.party_close,
        writer.uint32(338).fork()
      ).ldelim();
    }
    if (message.party_join_request_list !== undefined) {
      PartyJoinRequestList.encode(
        message.party_join_request_list,
        writer.uint32(346).fork()
      ).ldelim();
    }
    if (message.party_join_request !== undefined) {
      PartyJoinRequest.encode(
        message.party_join_request,
        writer.uint32(354).fork()
      ).ldelim();
    }
    if (message.party_matchmaker_add !== undefined) {
      PartyMatchmakerAdd.encode(
        message.party_matchmaker_add,
        writer.uint32(362).fork()
      ).ldelim();
    }
    if (message.party_matchmaker_remove !== undefined) {
      PartyMatchmakerRemove.encode(
        message.party_matchmaker_remove,
        writer.uint32(370).fork()
      ).ldelim();
    }
    if (message.party_matchmaker_ticket !== undefined) {
      PartyMatchmakerTicket.encode(
        message.party_matchmaker_ticket,
        writer.uint32(378).fork()
      ).ldelim();
    }
    if (message.party_data !== undefined) {
      PartyData.encode(message.party_data, writer.uint32(386).fork()).ldelim();
    }
    if (message.party_data_send !== undefined) {
      PartyDataSend.encode(
        message.party_data_send,
        writer.uint32(394).fork()
      ).ldelim();
    }
    if (message.party_presence_event !== undefined) {
      PartyPresenceEvent.encode(
        message.party_presence_event,
        writer.uint32(402).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Envelope {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnvelope } as Envelope;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 3:
          message.channel_join = ChannelJoin.decode(reader, reader.uint32());
          break;
        case 4:
          message.channel_leave = ChannelLeave.decode(reader, reader.uint32());
          break;
        case 5:
          message.channel_message = ChannelMessage.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.channel_message_ack = ChannelMessageAck.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.channel_message_send = ChannelMessageSend.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.channel_message_update = ChannelMessageUpdate.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.channel_message_remove = ChannelMessageRemove.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.channel_presence_event = ChannelPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 12:
          message.match = Match.decode(reader, reader.uint32());
          break;
        case 13:
          message.match_create = MatchCreate.decode(reader, reader.uint32());
          break;
        case 14:
          message.match_data = MatchData.decode(reader, reader.uint32());
          break;
        case 15:
          message.match_data_send = MatchDataSend.decode(
            reader,
            reader.uint32()
          );
          break;
        case 16:
          message.match_join = MatchJoin.decode(reader, reader.uint32());
          break;
        case 17:
          message.match_leave = MatchLeave.decode(reader, reader.uint32());
          break;
        case 18:
          message.match_presence_event = MatchPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 19:
          message.matchmaker_add = MatchmakerAdd.decode(
            reader,
            reader.uint32()
          );
          break;
        case 20:
          message.matchmaker_matched = MatchmakerMatched.decode(
            reader,
            reader.uint32()
          );
          break;
        case 21:
          message.matchmaker_remove = MatchmakerRemove.decode(
            reader,
            reader.uint32()
          );
          break;
        case 22:
          message.matchmaker_ticket = MatchmakerTicket.decode(
            reader,
            reader.uint32()
          );
          break;
        case 23:
          message.notifications = Notifications.decode(reader, reader.uint32());
          break;
        case 24:
          message.rpc = Rpc.decode(reader, reader.uint32());
          break;
        case 25:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 26:
          message.status_follow = StatusFollow.decode(reader, reader.uint32());
          break;
        case 27:
          message.status_presence_event = StatusPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 28:
          message.status_unfollow = StatusUnfollow.decode(
            reader,
            reader.uint32()
          );
          break;
        case 29:
          message.status_update = StatusUpdate.decode(reader, reader.uint32());
          break;
        case 30:
          message.stream_data = StreamData.decode(reader, reader.uint32());
          break;
        case 31:
          message.stream_presence_event = StreamPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 32:
          message.ping = Ping.decode(reader, reader.uint32());
          break;
        case 33:
          message.pong = Pong.decode(reader, reader.uint32());
          break;
        case 34:
          message.party = Party.decode(reader, reader.uint32());
          break;
        case 35:
          message.party_create = PartyCreate.decode(reader, reader.uint32());
          break;
        case 36:
          message.party_join = PartyJoin.decode(reader, reader.uint32());
          break;
        case 37:
          message.party_leave = PartyLeave.decode(reader, reader.uint32());
          break;
        case 38:
          message.party_promote = PartyPromote.decode(reader, reader.uint32());
          break;
        case 39:
          message.party_leader = PartyLeader.decode(reader, reader.uint32());
          break;
        case 40:
          message.party_accept = PartyAccept.decode(reader, reader.uint32());
          break;
        case 41:
          message.party_remove = PartyRemove.decode(reader, reader.uint32());
          break;
        case 42:
          message.party_close = PartyClose.decode(reader, reader.uint32());
          break;
        case 43:
          message.party_join_request_list = PartyJoinRequestList.decode(
            reader,
            reader.uint32()
          );
          break;
        case 44:
          message.party_join_request = PartyJoinRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 45:
          message.party_matchmaker_add = PartyMatchmakerAdd.decode(
            reader,
            reader.uint32()
          );
          break;
        case 46:
          message.party_matchmaker_remove = PartyMatchmakerRemove.decode(
            reader,
            reader.uint32()
          );
          break;
        case 47:
          message.party_matchmaker_ticket = PartyMatchmakerTicket.decode(
            reader,
            reader.uint32()
          );
          break;
        case 48:
          message.party_data = PartyData.decode(reader, reader.uint32());
          break;
        case 49:
          message.party_data_send = PartyDataSend.decode(
            reader,
            reader.uint32()
          );
          break;
        case 50:
          message.party_presence_event = PartyPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Envelope {
    const message = { ...baseEnvelope } as Envelope;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = Channel.fromJSON(object.channel);
    } else {
      message.channel = undefined;
    }
    if (object.channel_join !== undefined && object.channel_join !== null) {
      message.channel_join = ChannelJoin.fromJSON(object.channel_join);
    } else {
      message.channel_join = undefined;
    }
    if (object.channel_leave !== undefined && object.channel_leave !== null) {
      message.channel_leave = ChannelLeave.fromJSON(object.channel_leave);
    } else {
      message.channel_leave = undefined;
    }
    if (
      object.channel_message !== undefined &&
      object.channel_message !== null
    ) {
      message.channel_message = ChannelMessage.fromJSON(object.channel_message);
    } else {
      message.channel_message = undefined;
    }
    if (
      object.channel_message_ack !== undefined &&
      object.channel_message_ack !== null
    ) {
      message.channel_message_ack = ChannelMessageAck.fromJSON(
        object.channel_message_ack
      );
    } else {
      message.channel_message_ack = undefined;
    }
    if (
      object.channel_message_send !== undefined &&
      object.channel_message_send !== null
    ) {
      message.channel_message_send = ChannelMessageSend.fromJSON(
        object.channel_message_send
      );
    } else {
      message.channel_message_send = undefined;
    }
    if (
      object.channel_message_update !== undefined &&
      object.channel_message_update !== null
    ) {
      message.channel_message_update = ChannelMessageUpdate.fromJSON(
        object.channel_message_update
      );
    } else {
      message.channel_message_update = undefined;
    }
    if (
      object.channel_message_remove !== undefined &&
      object.channel_message_remove !== null
    ) {
      message.channel_message_remove = ChannelMessageRemove.fromJSON(
        object.channel_message_remove
      );
    } else {
      message.channel_message_remove = undefined;
    }
    if (
      object.channel_presence_event !== undefined &&
      object.channel_presence_event !== null
    ) {
      message.channel_presence_event = ChannelPresenceEvent.fromJSON(
        object.channel_presence_event
      );
    } else {
      message.channel_presence_event = undefined;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = Error.fromJSON(object.error);
    } else {
      message.error = undefined;
    }
    if (object.match !== undefined && object.match !== null) {
      message.match = Match.fromJSON(object.match);
    } else {
      message.match = undefined;
    }
    if (object.match_create !== undefined && object.match_create !== null) {
      message.match_create = MatchCreate.fromJSON(object.match_create);
    } else {
      message.match_create = undefined;
    }
    if (object.match_data !== undefined && object.match_data !== null) {
      message.match_data = MatchData.fromJSON(object.match_data);
    } else {
      message.match_data = undefined;
    }
    if (
      object.match_data_send !== undefined &&
      object.match_data_send !== null
    ) {
      message.match_data_send = MatchDataSend.fromJSON(object.match_data_send);
    } else {
      message.match_data_send = undefined;
    }
    if (object.match_join !== undefined && object.match_join !== null) {
      message.match_join = MatchJoin.fromJSON(object.match_join);
    } else {
      message.match_join = undefined;
    }
    if (object.match_leave !== undefined && object.match_leave !== null) {
      message.match_leave = MatchLeave.fromJSON(object.match_leave);
    } else {
      message.match_leave = undefined;
    }
    if (
      object.match_presence_event !== undefined &&
      object.match_presence_event !== null
    ) {
      message.match_presence_event = MatchPresenceEvent.fromJSON(
        object.match_presence_event
      );
    } else {
      message.match_presence_event = undefined;
    }
    if (object.matchmaker_add !== undefined && object.matchmaker_add !== null) {
      message.matchmaker_add = MatchmakerAdd.fromJSON(object.matchmaker_add);
    } else {
      message.matchmaker_add = undefined;
    }
    if (
      object.matchmaker_matched !== undefined &&
      object.matchmaker_matched !== null
    ) {
      message.matchmaker_matched = MatchmakerMatched.fromJSON(
        object.matchmaker_matched
      );
    } else {
      message.matchmaker_matched = undefined;
    }
    if (
      object.matchmaker_remove !== undefined &&
      object.matchmaker_remove !== null
    ) {
      message.matchmaker_remove = MatchmakerRemove.fromJSON(
        object.matchmaker_remove
      );
    } else {
      message.matchmaker_remove = undefined;
    }
    if (
      object.matchmaker_ticket !== undefined &&
      object.matchmaker_ticket !== null
    ) {
      message.matchmaker_ticket = MatchmakerTicket.fromJSON(
        object.matchmaker_ticket
      );
    } else {
      message.matchmaker_ticket = undefined;
    }
    if (object.notifications !== undefined && object.notifications !== null) {
      message.notifications = Notifications.fromJSON(object.notifications);
    } else {
      message.notifications = undefined;
    }
    if (object.rpc !== undefined && object.rpc !== null) {
      message.rpc = Rpc.fromJSON(object.rpc);
    } else {
      message.rpc = undefined;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Status.fromJSON(object.status);
    } else {
      message.status = undefined;
    }
    if (object.status_follow !== undefined && object.status_follow !== null) {
      message.status_follow = StatusFollow.fromJSON(object.status_follow);
    } else {
      message.status_follow = undefined;
    }
    if (
      object.status_presence_event !== undefined &&
      object.status_presence_event !== null
    ) {
      message.status_presence_event = StatusPresenceEvent.fromJSON(
        object.status_presence_event
      );
    } else {
      message.status_presence_event = undefined;
    }
    if (
      object.status_unfollow !== undefined &&
      object.status_unfollow !== null
    ) {
      message.status_unfollow = StatusUnfollow.fromJSON(object.status_unfollow);
    } else {
      message.status_unfollow = undefined;
    }
    if (object.status_update !== undefined && object.status_update !== null) {
      message.status_update = StatusUpdate.fromJSON(object.status_update);
    } else {
      message.status_update = undefined;
    }
    if (object.stream_data !== undefined && object.stream_data !== null) {
      message.stream_data = StreamData.fromJSON(object.stream_data);
    } else {
      message.stream_data = undefined;
    }
    if (
      object.stream_presence_event !== undefined &&
      object.stream_presence_event !== null
    ) {
      message.stream_presence_event = StreamPresenceEvent.fromJSON(
        object.stream_presence_event
      );
    } else {
      message.stream_presence_event = undefined;
    }
    if (object.ping !== undefined && object.ping !== null) {
      message.ping = Ping.fromJSON(object.ping);
    } else {
      message.ping = undefined;
    }
    if (object.pong !== undefined && object.pong !== null) {
      message.pong = Pong.fromJSON(object.pong);
    } else {
      message.pong = undefined;
    }
    if (object.party !== undefined && object.party !== null) {
      message.party = Party.fromJSON(object.party);
    } else {
      message.party = undefined;
    }
    if (object.party_create !== undefined && object.party_create !== null) {
      message.party_create = PartyCreate.fromJSON(object.party_create);
    } else {
      message.party_create = undefined;
    }
    if (object.party_join !== undefined && object.party_join !== null) {
      message.party_join = PartyJoin.fromJSON(object.party_join);
    } else {
      message.party_join = undefined;
    }
    if (object.party_leave !== undefined && object.party_leave !== null) {
      message.party_leave = PartyLeave.fromJSON(object.party_leave);
    } else {
      message.party_leave = undefined;
    }
    if (object.party_promote !== undefined && object.party_promote !== null) {
      message.party_promote = PartyPromote.fromJSON(object.party_promote);
    } else {
      message.party_promote = undefined;
    }
    if (object.party_leader !== undefined && object.party_leader !== null) {
      message.party_leader = PartyLeader.fromJSON(object.party_leader);
    } else {
      message.party_leader = undefined;
    }
    if (object.party_accept !== undefined && object.party_accept !== null) {
      message.party_accept = PartyAccept.fromJSON(object.party_accept);
    } else {
      message.party_accept = undefined;
    }
    if (object.party_remove !== undefined && object.party_remove !== null) {
      message.party_remove = PartyRemove.fromJSON(object.party_remove);
    } else {
      message.party_remove = undefined;
    }
    if (object.party_close !== undefined && object.party_close !== null) {
      message.party_close = PartyClose.fromJSON(object.party_close);
    } else {
      message.party_close = undefined;
    }
    if (
      object.party_join_request_list !== undefined &&
      object.party_join_request_list !== null
    ) {
      message.party_join_request_list = PartyJoinRequestList.fromJSON(
        object.party_join_request_list
      );
    } else {
      message.party_join_request_list = undefined;
    }
    if (
      object.party_join_request !== undefined &&
      object.party_join_request !== null
    ) {
      message.party_join_request = PartyJoinRequest.fromJSON(
        object.party_join_request
      );
    } else {
      message.party_join_request = undefined;
    }
    if (
      object.party_matchmaker_add !== undefined &&
      object.party_matchmaker_add !== null
    ) {
      message.party_matchmaker_add = PartyMatchmakerAdd.fromJSON(
        object.party_matchmaker_add
      );
    } else {
      message.party_matchmaker_add = undefined;
    }
    if (
      object.party_matchmaker_remove !== undefined &&
      object.party_matchmaker_remove !== null
    ) {
      message.party_matchmaker_remove = PartyMatchmakerRemove.fromJSON(
        object.party_matchmaker_remove
      );
    } else {
      message.party_matchmaker_remove = undefined;
    }
    if (
      object.party_matchmaker_ticket !== undefined &&
      object.party_matchmaker_ticket !== null
    ) {
      message.party_matchmaker_ticket = PartyMatchmakerTicket.fromJSON(
        object.party_matchmaker_ticket
      );
    } else {
      message.party_matchmaker_ticket = undefined;
    }
    if (object.party_data !== undefined && object.party_data !== null) {
      message.party_data = PartyData.fromJSON(object.party_data);
    } else {
      message.party_data = undefined;
    }
    if (
      object.party_data_send !== undefined &&
      object.party_data_send !== null
    ) {
      message.party_data_send = PartyDataSend.fromJSON(object.party_data_send);
    } else {
      message.party_data_send = undefined;
    }
    if (
      object.party_presence_event !== undefined &&
      object.party_presence_event !== null
    ) {
      message.party_presence_event = PartyPresenceEvent.fromJSON(
        object.party_presence_event
      );
    } else {
      message.party_presence_event = undefined;
    }
    return message;
  },

  toJSON(message: Envelope): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.channel !== undefined &&
      (obj.channel = message.channel
        ? Channel.toJSON(message.channel)
        : undefined);
    message.channel_join !== undefined &&
      (obj.channel_join = message.channel_join
        ? ChannelJoin.toJSON(message.channel_join)
        : undefined);
    message.channel_leave !== undefined &&
      (obj.channel_leave = message.channel_leave
        ? ChannelLeave.toJSON(message.channel_leave)
        : undefined);
    message.channel_message !== undefined &&
      (obj.channel_message = message.channel_message
        ? ChannelMessage.toJSON(message.channel_message)
        : undefined);
    message.channel_message_ack !== undefined &&
      (obj.channel_message_ack = message.channel_message_ack
        ? ChannelMessageAck.toJSON(message.channel_message_ack)
        : undefined);
    message.channel_message_send !== undefined &&
      (obj.channel_message_send = message.channel_message_send
        ? ChannelMessageSend.toJSON(message.channel_message_send)
        : undefined);
    message.channel_message_update !== undefined &&
      (obj.channel_message_update = message.channel_message_update
        ? ChannelMessageUpdate.toJSON(message.channel_message_update)
        : undefined);
    message.channel_message_remove !== undefined &&
      (obj.channel_message_remove = message.channel_message_remove
        ? ChannelMessageRemove.toJSON(message.channel_message_remove)
        : undefined);
    message.channel_presence_event !== undefined &&
      (obj.channel_presence_event = message.channel_presence_event
        ? ChannelPresenceEvent.toJSON(message.channel_presence_event)
        : undefined);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.match !== undefined &&
      (obj.match = message.match ? Match.toJSON(message.match) : undefined);
    message.match_create !== undefined &&
      (obj.match_create = message.match_create
        ? MatchCreate.toJSON(message.match_create)
        : undefined);
    message.match_data !== undefined &&
      (obj.match_data = message.match_data
        ? MatchData.toJSON(message.match_data)
        : undefined);
    message.match_data_send !== undefined &&
      (obj.match_data_send = message.match_data_send
        ? MatchDataSend.toJSON(message.match_data_send)
        : undefined);
    message.match_join !== undefined &&
      (obj.match_join = message.match_join
        ? MatchJoin.toJSON(message.match_join)
        : undefined);
    message.match_leave !== undefined &&
      (obj.match_leave = message.match_leave
        ? MatchLeave.toJSON(message.match_leave)
        : undefined);
    message.match_presence_event !== undefined &&
      (obj.match_presence_event = message.match_presence_event
        ? MatchPresenceEvent.toJSON(message.match_presence_event)
        : undefined);
    message.matchmaker_add !== undefined &&
      (obj.matchmaker_add = message.matchmaker_add
        ? MatchmakerAdd.toJSON(message.matchmaker_add)
        : undefined);
    message.matchmaker_matched !== undefined &&
      (obj.matchmaker_matched = message.matchmaker_matched
        ? MatchmakerMatched.toJSON(message.matchmaker_matched)
        : undefined);
    message.matchmaker_remove !== undefined &&
      (obj.matchmaker_remove = message.matchmaker_remove
        ? MatchmakerRemove.toJSON(message.matchmaker_remove)
        : undefined);
    message.matchmaker_ticket !== undefined &&
      (obj.matchmaker_ticket = message.matchmaker_ticket
        ? MatchmakerTicket.toJSON(message.matchmaker_ticket)
        : undefined);
    message.notifications !== undefined &&
      (obj.notifications = message.notifications
        ? Notifications.toJSON(message.notifications)
        : undefined);
    message.rpc !== undefined &&
      (obj.rpc = message.rpc ? Rpc.toJSON(message.rpc) : undefined);
    message.status !== undefined &&
      (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    message.status_follow !== undefined &&
      (obj.status_follow = message.status_follow
        ? StatusFollow.toJSON(message.status_follow)
        : undefined);
    message.status_presence_event !== undefined &&
      (obj.status_presence_event = message.status_presence_event
        ? StatusPresenceEvent.toJSON(message.status_presence_event)
        : undefined);
    message.status_unfollow !== undefined &&
      (obj.status_unfollow = message.status_unfollow
        ? StatusUnfollow.toJSON(message.status_unfollow)
        : undefined);
    message.status_update !== undefined &&
      (obj.status_update = message.status_update
        ? StatusUpdate.toJSON(message.status_update)
        : undefined);
    message.stream_data !== undefined &&
      (obj.stream_data = message.stream_data
        ? StreamData.toJSON(message.stream_data)
        : undefined);
    message.stream_presence_event !== undefined &&
      (obj.stream_presence_event = message.stream_presence_event
        ? StreamPresenceEvent.toJSON(message.stream_presence_event)
        : undefined);
    message.ping !== undefined &&
      (obj.ping = message.ping ? Ping.toJSON(message.ping) : undefined);
    message.pong !== undefined &&
      (obj.pong = message.pong ? Pong.toJSON(message.pong) : undefined);
    message.party !== undefined &&
      (obj.party = message.party ? Party.toJSON(message.party) : undefined);
    message.party_create !== undefined &&
      (obj.party_create = message.party_create
        ? PartyCreate.toJSON(message.party_create)
        : undefined);
    message.party_join !== undefined &&
      (obj.party_join = message.party_join
        ? PartyJoin.toJSON(message.party_join)
        : undefined);
    message.party_leave !== undefined &&
      (obj.party_leave = message.party_leave
        ? PartyLeave.toJSON(message.party_leave)
        : undefined);
    message.party_promote !== undefined &&
      (obj.party_promote = message.party_promote
        ? PartyPromote.toJSON(message.party_promote)
        : undefined);
    message.party_leader !== undefined &&
      (obj.party_leader = message.party_leader
        ? PartyLeader.toJSON(message.party_leader)
        : undefined);
    message.party_accept !== undefined &&
      (obj.party_accept = message.party_accept
        ? PartyAccept.toJSON(message.party_accept)
        : undefined);
    message.party_remove !== undefined &&
      (obj.party_remove = message.party_remove
        ? PartyRemove.toJSON(message.party_remove)
        : undefined);
    message.party_close !== undefined &&
      (obj.party_close = message.party_close
        ? PartyClose.toJSON(message.party_close)
        : undefined);
    message.party_join_request_list !== undefined &&
      (obj.party_join_request_list = message.party_join_request_list
        ? PartyJoinRequestList.toJSON(message.party_join_request_list)
        : undefined);
    message.party_join_request !== undefined &&
      (obj.party_join_request = message.party_join_request
        ? PartyJoinRequest.toJSON(message.party_join_request)
        : undefined);
    message.party_matchmaker_add !== undefined &&
      (obj.party_matchmaker_add = message.party_matchmaker_add
        ? PartyMatchmakerAdd.toJSON(message.party_matchmaker_add)
        : undefined);
    message.party_matchmaker_remove !== undefined &&
      (obj.party_matchmaker_remove = message.party_matchmaker_remove
        ? PartyMatchmakerRemove.toJSON(message.party_matchmaker_remove)
        : undefined);
    message.party_matchmaker_ticket !== undefined &&
      (obj.party_matchmaker_ticket = message.party_matchmaker_ticket
        ? PartyMatchmakerTicket.toJSON(message.party_matchmaker_ticket)
        : undefined);
    message.party_data !== undefined &&
      (obj.party_data = message.party_data
        ? PartyData.toJSON(message.party_data)
        : undefined);
    message.party_data_send !== undefined &&
      (obj.party_data_send = message.party_data_send
        ? PartyDataSend.toJSON(message.party_data_send)
        : undefined);
    message.party_presence_event !== undefined &&
      (obj.party_presence_event = message.party_presence_event
        ? PartyPresenceEvent.toJSON(message.party_presence_event)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Envelope>): Envelope {
    const message = { ...baseEnvelope } as Envelope;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = Channel.fromPartial(object.channel);
    } else {
      message.channel = undefined;
    }
    if (object.channel_join !== undefined && object.channel_join !== null) {
      message.channel_join = ChannelJoin.fromPartial(object.channel_join);
    } else {
      message.channel_join = undefined;
    }
    if (object.channel_leave !== undefined && object.channel_leave !== null) {
      message.channel_leave = ChannelLeave.fromPartial(object.channel_leave);
    } else {
      message.channel_leave = undefined;
    }
    if (
      object.channel_message !== undefined &&
      object.channel_message !== null
    ) {
      message.channel_message = ChannelMessage.fromPartial(
        object.channel_message
      );
    } else {
      message.channel_message = undefined;
    }
    if (
      object.channel_message_ack !== undefined &&
      object.channel_message_ack !== null
    ) {
      message.channel_message_ack = ChannelMessageAck.fromPartial(
        object.channel_message_ack
      );
    } else {
      message.channel_message_ack = undefined;
    }
    if (
      object.channel_message_send !== undefined &&
      object.channel_message_send !== null
    ) {
      message.channel_message_send = ChannelMessageSend.fromPartial(
        object.channel_message_send
      );
    } else {
      message.channel_message_send = undefined;
    }
    if (
      object.channel_message_update !== undefined &&
      object.channel_message_update !== null
    ) {
      message.channel_message_update = ChannelMessageUpdate.fromPartial(
        object.channel_message_update
      );
    } else {
      message.channel_message_update = undefined;
    }
    if (
      object.channel_message_remove !== undefined &&
      object.channel_message_remove !== null
    ) {
      message.channel_message_remove = ChannelMessageRemove.fromPartial(
        object.channel_message_remove
      );
    } else {
      message.channel_message_remove = undefined;
    }
    if (
      object.channel_presence_event !== undefined &&
      object.channel_presence_event !== null
    ) {
      message.channel_presence_event = ChannelPresenceEvent.fromPartial(
        object.channel_presence_event
      );
    } else {
      message.channel_presence_event = undefined;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = Error.fromPartial(object.error);
    } else {
      message.error = undefined;
    }
    if (object.match !== undefined && object.match !== null) {
      message.match = Match.fromPartial(object.match);
    } else {
      message.match = undefined;
    }
    if (object.match_create !== undefined && object.match_create !== null) {
      message.match_create = MatchCreate.fromPartial(object.match_create);
    } else {
      message.match_create = undefined;
    }
    if (object.match_data !== undefined && object.match_data !== null) {
      message.match_data = MatchData.fromPartial(object.match_data);
    } else {
      message.match_data = undefined;
    }
    if (
      object.match_data_send !== undefined &&
      object.match_data_send !== null
    ) {
      message.match_data_send = MatchDataSend.fromPartial(
        object.match_data_send
      );
    } else {
      message.match_data_send = undefined;
    }
    if (object.match_join !== undefined && object.match_join !== null) {
      message.match_join = MatchJoin.fromPartial(object.match_join);
    } else {
      message.match_join = undefined;
    }
    if (object.match_leave !== undefined && object.match_leave !== null) {
      message.match_leave = MatchLeave.fromPartial(object.match_leave);
    } else {
      message.match_leave = undefined;
    }
    if (
      object.match_presence_event !== undefined &&
      object.match_presence_event !== null
    ) {
      message.match_presence_event = MatchPresenceEvent.fromPartial(
        object.match_presence_event
      );
    } else {
      message.match_presence_event = undefined;
    }
    if (object.matchmaker_add !== undefined && object.matchmaker_add !== null) {
      message.matchmaker_add = MatchmakerAdd.fromPartial(object.matchmaker_add);
    } else {
      message.matchmaker_add = undefined;
    }
    if (
      object.matchmaker_matched !== undefined &&
      object.matchmaker_matched !== null
    ) {
      message.matchmaker_matched = MatchmakerMatched.fromPartial(
        object.matchmaker_matched
      );
    } else {
      message.matchmaker_matched = undefined;
    }
    if (
      object.matchmaker_remove !== undefined &&
      object.matchmaker_remove !== null
    ) {
      message.matchmaker_remove = MatchmakerRemove.fromPartial(
        object.matchmaker_remove
      );
    } else {
      message.matchmaker_remove = undefined;
    }
    if (
      object.matchmaker_ticket !== undefined &&
      object.matchmaker_ticket !== null
    ) {
      message.matchmaker_ticket = MatchmakerTicket.fromPartial(
        object.matchmaker_ticket
      );
    } else {
      message.matchmaker_ticket = undefined;
    }
    if (object.notifications !== undefined && object.notifications !== null) {
      message.notifications = Notifications.fromPartial(object.notifications);
    } else {
      message.notifications = undefined;
    }
    if (object.rpc !== undefined && object.rpc !== null) {
      message.rpc = Rpc.fromPartial(object.rpc);
    } else {
      message.rpc = undefined;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Status.fromPartial(object.status);
    } else {
      message.status = undefined;
    }
    if (object.status_follow !== undefined && object.status_follow !== null) {
      message.status_follow = StatusFollow.fromPartial(object.status_follow);
    } else {
      message.status_follow = undefined;
    }
    if (
      object.status_presence_event !== undefined &&
      object.status_presence_event !== null
    ) {
      message.status_presence_event = StatusPresenceEvent.fromPartial(
        object.status_presence_event
      );
    } else {
      message.status_presence_event = undefined;
    }
    if (
      object.status_unfollow !== undefined &&
      object.status_unfollow !== null
    ) {
      message.status_unfollow = StatusUnfollow.fromPartial(
        object.status_unfollow
      );
    } else {
      message.status_unfollow = undefined;
    }
    if (object.status_update !== undefined && object.status_update !== null) {
      message.status_update = StatusUpdate.fromPartial(object.status_update);
    } else {
      message.status_update = undefined;
    }
    if (object.stream_data !== undefined && object.stream_data !== null) {
      message.stream_data = StreamData.fromPartial(object.stream_data);
    } else {
      message.stream_data = undefined;
    }
    if (
      object.stream_presence_event !== undefined &&
      object.stream_presence_event !== null
    ) {
      message.stream_presence_event = StreamPresenceEvent.fromPartial(
        object.stream_presence_event
      );
    } else {
      message.stream_presence_event = undefined;
    }
    if (object.ping !== undefined && object.ping !== null) {
      message.ping = Ping.fromPartial(object.ping);
    } else {
      message.ping = undefined;
    }
    if (object.pong !== undefined && object.pong !== null) {
      message.pong = Pong.fromPartial(object.pong);
    } else {
      message.pong = undefined;
    }
    if (object.party !== undefined && object.party !== null) {
      message.party = Party.fromPartial(object.party);
    } else {
      message.party = undefined;
    }
    if (object.party_create !== undefined && object.party_create !== null) {
      message.party_create = PartyCreate.fromPartial(object.party_create);
    } else {
      message.party_create = undefined;
    }
    if (object.party_join !== undefined && object.party_join !== null) {
      message.party_join = PartyJoin.fromPartial(object.party_join);
    } else {
      message.party_join = undefined;
    }
    if (object.party_leave !== undefined && object.party_leave !== null) {
      message.party_leave = PartyLeave.fromPartial(object.party_leave);
    } else {
      message.party_leave = undefined;
    }
    if (object.party_promote !== undefined && object.party_promote !== null) {
      message.party_promote = PartyPromote.fromPartial(object.party_promote);
    } else {
      message.party_promote = undefined;
    }
    if (object.party_leader !== undefined && object.party_leader !== null) {
      message.party_leader = PartyLeader.fromPartial(object.party_leader);
    } else {
      message.party_leader = undefined;
    }
    if (object.party_accept !== undefined && object.party_accept !== null) {
      message.party_accept = PartyAccept.fromPartial(object.party_accept);
    } else {
      message.party_accept = undefined;
    }
    if (object.party_remove !== undefined && object.party_remove !== null) {
      message.party_remove = PartyRemove.fromPartial(object.party_remove);
    } else {
      message.party_remove = undefined;
    }
    if (object.party_close !== undefined && object.party_close !== null) {
      message.party_close = PartyClose.fromPartial(object.party_close);
    } else {
      message.party_close = undefined;
    }
    if (
      object.party_join_request_list !== undefined &&
      object.party_join_request_list !== null
    ) {
      message.party_join_request_list = PartyJoinRequestList.fromPartial(
        object.party_join_request_list
      );
    } else {
      message.party_join_request_list = undefined;
    }
    if (
      object.party_join_request !== undefined &&
      object.party_join_request !== null
    ) {
      message.party_join_request = PartyJoinRequest.fromPartial(
        object.party_join_request
      );
    } else {
      message.party_join_request = undefined;
    }
    if (
      object.party_matchmaker_add !== undefined &&
      object.party_matchmaker_add !== null
    ) {
      message.party_matchmaker_add = PartyMatchmakerAdd.fromPartial(
        object.party_matchmaker_add
      );
    } else {
      message.party_matchmaker_add = undefined;
    }
    if (
      object.party_matchmaker_remove !== undefined &&
      object.party_matchmaker_remove !== null
    ) {
      message.party_matchmaker_remove = PartyMatchmakerRemove.fromPartial(
        object.party_matchmaker_remove
      );
    } else {
      message.party_matchmaker_remove = undefined;
    }
    if (
      object.party_matchmaker_ticket !== undefined &&
      object.party_matchmaker_ticket !== null
    ) {
      message.party_matchmaker_ticket = PartyMatchmakerTicket.fromPartial(
        object.party_matchmaker_ticket
      );
    } else {
      message.party_matchmaker_ticket = undefined;
    }
    if (object.party_data !== undefined && object.party_data !== null) {
      message.party_data = PartyData.fromPartial(object.party_data);
    } else {
      message.party_data = undefined;
    }
    if (
      object.party_data_send !== undefined &&
      object.party_data_send !== null
    ) {
      message.party_data_send = PartyDataSend.fromPartial(
        object.party_data_send
      );
    } else {
      message.party_data_send = undefined;
    }
    if (
      object.party_presence_event !== undefined &&
      object.party_presence_event !== null
    ) {
      message.party_presence_event = PartyPresenceEvent.fromPartial(
        object.party_presence_event
      );
    } else {
      message.party_presence_event = undefined;
    }
    return message;
  },
};

const baseChannel: object = {
  id: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: "",
};

export const Channel = {
  encode(
    message: Channel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.self !== undefined) {
      UserPresence.encode(message.self, writer.uint32(26).fork()).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(34).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(42).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(50).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(58).string(message.user_id_two);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Channel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannel } as Channel;
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        case 4:
          message.room_name = reader.string();
          break;
        case 5:
          message.group_id = reader.string();
          break;
        case 6:
          message.user_id_one = reader.string();
          break;
        case 7:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Channel {
    const message = { ...baseChannel } as Channel;
    message.presences = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    } else {
      message.self = undefined;
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = String(object.room_name);
    } else {
      message.room_name = "";
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    } else {
      message.user_id_two = "";
    }
    return message;
  },

  toJSON(message: Channel): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.presences) {
      obj.presences = message.presences.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.presences = [];
    }
    message.self !== undefined &&
      (obj.self = message.self ? UserPresence.toJSON(message.self) : undefined);
    message.room_name !== undefined && (obj.room_name = message.room_name);
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.user_id_one !== undefined &&
      (obj.user_id_one = message.user_id_one);
    message.user_id_two !== undefined &&
      (obj.user_id_two = message.user_id_two);
    return obj;
  },

  fromPartial(object: DeepPartial<Channel>): Channel {
    const message = { ...baseChannel } as Channel;
    message.presences = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    } else {
      message.self = undefined;
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = object.room_name;
    } else {
      message.room_name = "";
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    } else {
      message.user_id_two = "";
    }
    return message;
  },
};

const baseChannelJoin: object = { target: "", type: 0 };

export const ChannelJoin = {
  encode(
    message: ChannelJoin,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.target !== "") {
      writer.uint32(10).string(message.target);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.persistence !== undefined) {
      BoolValue.encode(
        { value: message.persistence! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.hidden !== undefined) {
      BoolValue.encode(
        { value: message.hidden! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelJoin } as ChannelJoin;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.target = reader.string();
          break;
        case 2:
          message.type = reader.int32();
          break;
        case 3:
          message.persistence = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.hidden = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelJoin {
    const message = { ...baseChannelJoin } as ChannelJoin;
    if (object.target !== undefined && object.target !== null) {
      message.target = String(object.target);
    } else {
      message.target = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = Number(object.type);
    } else {
      message.type = 0;
    }
    if (object.persistence !== undefined && object.persistence !== null) {
      message.persistence = Boolean(object.persistence);
    } else {
      message.persistence = undefined;
    }
    if (object.hidden !== undefined && object.hidden !== null) {
      message.hidden = Boolean(object.hidden);
    } else {
      message.hidden = undefined;
    }
    return message;
  },

  toJSON(message: ChannelJoin): unknown {
    const obj: any = {};
    message.target !== undefined && (obj.target = message.target);
    message.type !== undefined && (obj.type = message.type);
    message.persistence !== undefined &&
      (obj.persistence = message.persistence);
    message.hidden !== undefined && (obj.hidden = message.hidden);
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelJoin>): ChannelJoin {
    const message = { ...baseChannelJoin } as ChannelJoin;
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target;
    } else {
      message.target = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.persistence !== undefined && object.persistence !== null) {
      message.persistence = object.persistence;
    } else {
      message.persistence = undefined;
    }
    if (object.hidden !== undefined && object.hidden !== null) {
      message.hidden = object.hidden;
    } else {
      message.hidden = undefined;
    }
    return message;
  },
};

const baseChannelLeave: object = { channel_id: "" };

export const ChannelLeave = {
  encode(
    message: ChannelLeave,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelLeave {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelLeave } as ChannelLeave;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelLeave {
    const message = { ...baseChannelLeave } as ChannelLeave;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    } else {
      message.channel_id = "";
    }
    return message;
  },

  toJSON(message: ChannelLeave): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelLeave>): ChannelLeave {
    const message = { ...baseChannelLeave } as ChannelLeave;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    return message;
  },
};

const baseChannelMessageAck: object = {
  channel_id: "",
  message_id: "",
  username: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: "",
};

export const ChannelMessageAck = {
  encode(
    message: ChannelMessageAck,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.code !== undefined) {
      Int32Value.encode(
        { value: message.code! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.persistent !== undefined) {
      BoolValue.encode(
        { value: message.persistent! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(66).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(74).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(82).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(90).string(message.user_id_two);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelMessageAck } as ChannelMessageAck;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.code = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.persistent = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.room_name = reader.string();
          break;
        case 9:
          message.group_id = reader.string();
          break;
        case 10:
          message.user_id_one = reader.string();
          break;
        case 11:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageAck {
    const message = { ...baseChannelMessageAck } as ChannelMessageAck;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = String(object.message_id);
    } else {
      message.message_id = "";
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = Number(object.code);
    } else {
      message.code = undefined;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    } else {
      message.create_time = undefined;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    } else {
      message.update_time = undefined;
    }
    if (object.persistent !== undefined && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    } else {
      message.persistent = undefined;
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = String(object.room_name);
    } else {
      message.room_name = "";
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    } else {
      message.user_id_two = "";
    }
    return message;
  },

  toJSON(message: ChannelMessageAck): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.code !== undefined && (obj.code = message.code);
    message.username !== undefined && (obj.username = message.username);
    message.create_time !== undefined &&
      (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined &&
      (obj.update_time = message.update_time.toISOString());
    message.persistent !== undefined && (obj.persistent = message.persistent);
    message.room_name !== undefined && (obj.room_name = message.room_name);
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.user_id_one !== undefined &&
      (obj.user_id_one = message.user_id_one);
    message.user_id_two !== undefined &&
      (obj.user_id_two = message.user_id_two);
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelMessageAck>): ChannelMessageAck {
    const message = { ...baseChannelMessageAck } as ChannelMessageAck;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = object.message_id;
    } else {
      message.message_id = "";
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = undefined;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    } else {
      message.create_time = undefined;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    } else {
      message.update_time = undefined;
    }
    if (object.persistent !== undefined && object.persistent !== null) {
      message.persistent = object.persistent;
    } else {
      message.persistent = undefined;
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = object.room_name;
    } else {
      message.room_name = "";
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    } else {
      message.user_id_two = "";
    }
    return message;
  },
};

const baseChannelMessageSend: object = { channel_id: "", content: "" };

export const ChannelMessageSend = {
  encode(
    message: ChannelMessageSend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelMessageSend } as ChannelMessageSend;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageSend {
    const message = { ...baseChannelMessageSend } as ChannelMessageSend;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    } else {
      message.channel_id = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    return message;
  },

  toJSON(message: ChannelMessageSend): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.content !== undefined && (obj.content = message.content);
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelMessageSend>): ChannelMessageSend {
    const message = { ...baseChannelMessageSend } as ChannelMessageSend;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    return message;
  },
};

const baseChannelMessageUpdate: object = {
  channel_id: "",
  message_id: "",
  content: "",
};

export const ChannelMessageUpdate = {
  encode(
    message: ChannelMessageUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ChannelMessageUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelMessageUpdate } as ChannelMessageUpdate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageUpdate {
    const message = { ...baseChannelMessageUpdate } as ChannelMessageUpdate;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = String(object.message_id);
    } else {
      message.message_id = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    return message;
  },

  toJSON(message: ChannelMessageUpdate): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.content !== undefined && (obj.content = message.content);
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelMessageUpdate>): ChannelMessageUpdate {
    const message = { ...baseChannelMessageUpdate } as ChannelMessageUpdate;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = object.message_id;
    } else {
      message.message_id = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    return message;
  },
};

const baseChannelMessageRemove: object = { channel_id: "", message_id: "" };

export const ChannelMessageRemove = {
  encode(
    message: ChannelMessageRemove,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ChannelMessageRemove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelMessageRemove } as ChannelMessageRemove;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageRemove {
    const message = { ...baseChannelMessageRemove } as ChannelMessageRemove;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = String(object.message_id);
    } else {
      message.message_id = "";
    }
    return message;
  },

  toJSON(message: ChannelMessageRemove): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelMessageRemove>): ChannelMessageRemove {
    const message = { ...baseChannelMessageRemove } as ChannelMessageRemove;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = object.message_id;
    } else {
      message.message_id = "";
    }
    return message;
  },
};

const baseChannelPresenceEvent: object = {
  channel_id: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: "",
};

export const ChannelPresenceEvent = {
  encode(
    message: ChannelPresenceEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(34).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(42).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(50).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(58).string(message.user_id_two);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ChannelPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelPresenceEvent } as ChannelPresenceEvent;
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 4:
          message.room_name = reader.string();
          break;
        case 5:
          message.group_id = reader.string();
          break;
        case 6:
          message.user_id_one = reader.string();
          break;
        case 7:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelPresenceEvent {
    const message = { ...baseChannelPresenceEvent } as ChannelPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    } else {
      message.channel_id = "";
    }
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = String(object.room_name);
    } else {
      message.room_name = "";
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    } else {
      message.user_id_two = "";
    }
    return message;
  },

  toJSON(message: ChannelPresenceEvent): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.leaves = [];
    }
    message.room_name !== undefined && (obj.room_name = message.room_name);
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.user_id_one !== undefined &&
      (obj.user_id_one = message.user_id_one);
    message.user_id_two !== undefined &&
      (obj.user_id_two = message.user_id_two);
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelPresenceEvent>): ChannelPresenceEvent {
    const message = { ...baseChannelPresenceEvent } as ChannelPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = object.room_name;
    } else {
      message.room_name = "";
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    } else {
      message.user_id_two = "";
    }
    return message;
  },
};

const baseError: object = { code: 0, message: "" };

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    Object.entries(message.context).forEach(([key, value]) => {
      Error_ContextEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseError } as Error;
    message.context = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          const entry3 = Error_ContextEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.context[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error {
    const message = { ...baseError } as Error;
    message.context = {};
    if (object.code !== undefined && object.code !== null) {
      message.code = Number(object.code);
    } else {
      message.code = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.context !== undefined && object.context !== null) {
      Object.entries(object.context).forEach(([key, value]) => {
        message.context[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = message.code);
    message.message !== undefined && (obj.message = message.message);
    obj.context = {};
    if (message.context) {
      Object.entries(message.context).forEach(([k, v]) => {
        obj.context[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Error>): Error {
    const message = { ...baseError } as Error;
    message.context = {};
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.context !== undefined && object.context !== null) {
      Object.entries(object.context).forEach(([key, value]) => {
        if (value !== undefined) {
          message.context[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseError_ContextEntry: object = { key: "", value: "" };

export const Error_ContextEntry = {
  encode(
    message: Error_ContextEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error_ContextEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseError_ContextEntry } as Error_ContextEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error_ContextEntry {
    const message = { ...baseError_ContextEntry } as Error_ContextEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: Error_ContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<Error_ContextEntry>): Error_ContextEntry {
    const message = { ...baseError_ContextEntry } as Error_ContextEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

const baseMatch: object = { match_id: "", authoritative: false, size: 0 };

export const Match = {
  encode(message: Match, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.authoritative === true) {
      writer.uint32(16).bool(message.authoritative);
    }
    if (message.label !== undefined) {
      StringValue.encode(
        { value: message.label! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(32).int32(message.size);
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.self !== undefined) {
      UserPresence.encode(message.self, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Match {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatch } as Match;
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.authoritative = reader.bool();
          break;
        case 3:
          message.label = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.size = reader.int32();
          break;
        case 5:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 6:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Match {
    const message = { ...baseMatch } as Match;
    message.presences = [];
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = "";
    }
    if (object.authoritative !== undefined && object.authoritative !== null) {
      message.authoritative = Boolean(object.authoritative);
    } else {
      message.authoritative = false;
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = undefined;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = 0;
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    } else {
      message.self = undefined;
    }
    return message;
  },

  toJSON(message: Match): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.authoritative !== undefined &&
      (obj.authoritative = message.authoritative);
    message.label !== undefined && (obj.label = message.label);
    message.size !== undefined && (obj.size = message.size);
    if (message.presences) {
      obj.presences = message.presences.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.presences = [];
    }
    message.self !== undefined &&
      (obj.self = message.self ? UserPresence.toJSON(message.self) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Match>): Match {
    const message = { ...baseMatch } as Match;
    message.presences = [];
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    if (object.authoritative !== undefined && object.authoritative !== null) {
      message.authoritative = object.authoritative;
    } else {
      message.authoritative = false;
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = undefined;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    } else {
      message.size = 0;
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    } else {
      message.self = undefined;
    }
    return message;
  },
};

const baseMatchCreate: object = {};

export const MatchCreate = {
  encode(_: MatchCreate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchCreate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchCreate } as MatchCreate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MatchCreate {
    const message = { ...baseMatchCreate } as MatchCreate;
    return message;
  },

  toJSON(_: MatchCreate): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MatchCreate>): MatchCreate {
    const message = { ...baseMatchCreate } as MatchCreate;
    return message;
  },
};

const baseMatchData: object = { match_id: "", op_code: 0, reliable: false };

export const MatchData = {
  encode(
    message: MatchData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    if (message.op_code !== 0) {
      writer.uint32(24).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.reliable === true) {
      writer.uint32(40).bool(message.reliable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchData } as MatchData;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.op_code = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchData {
    const message = { ...baseMatchData } as MatchData;
    message.data = new Uint8Array();
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = undefined;
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    } else {
      message.op_code = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    } else {
      message.reliable = false;
    }
    return message;
  },

  toJSON(message: MatchData): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.presence !== undefined &&
      (obj.presence = message.presence
        ? UserPresence.toJSON(message.presence)
        : undefined);
    message.op_code !== undefined && (obj.op_code = message.op_code);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.reliable !== undefined && (obj.reliable = message.reliable);
    return obj;
  },

  fromPartial(object: DeepPartial<MatchData>): MatchData {
    const message = { ...baseMatchData } as MatchData;
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = undefined;
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = object.op_code;
    } else {
      message.op_code = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = object.reliable;
    } else {
      message.reliable = false;
    }
    return message;
  },
};

const baseMatchDataSend: object = { match_id: "", op_code: 0, reliable: false };

export const MatchDataSend = {
  encode(
    message: MatchDataSend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.op_code !== 0) {
      writer.uint32(16).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.reliable === true) {
      writer.uint32(40).bool(message.reliable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchDataSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchDataSend } as MatchDataSend;
    message.presences = [];
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.op_code = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.data = reader.bytes();
          break;
        case 4:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 5:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchDataSend {
    const message = { ...baseMatchDataSend } as MatchDataSend;
    message.presences = [];
    message.data = new Uint8Array();
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = "";
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    } else {
      message.op_code = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    } else {
      message.reliable = false;
    }
    return message;
  },

  toJSON(message: MatchDataSend): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.op_code !== undefined && (obj.op_code = message.op_code);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    if (message.presences) {
      obj.presences = message.presences.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.presences = [];
    }
    message.reliable !== undefined && (obj.reliable = message.reliable);
    return obj;
  },

  fromPartial(object: DeepPartial<MatchDataSend>): MatchDataSend {
    const message = { ...baseMatchDataSend } as MatchDataSend;
    message.presences = [];
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = object.op_code;
    } else {
      message.op_code = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = object.reliable;
    } else {
      message.reliable = false;
    }
    return message;
  },
};

const baseMatchJoin: object = {};

export const MatchJoin = {
  encode(
    message: MatchJoin,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.match_id !== undefined) {
      writer.uint32(10).string(message.match_id);
    }
    if (message.token !== undefined) {
      writer.uint32(18).string(message.token);
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      MatchJoin_MetadataEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchJoin } as MatchJoin;
    message.metadata = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          const entry3 = MatchJoin_MetadataEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry3.value !== undefined) {
            message.metadata[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchJoin {
    const message = { ...baseMatchJoin } as MatchJoin;
    message.metadata = {};
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = undefined;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      Object.entries(object.metadata).forEach(([key, value]) => {
        message.metadata[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: MatchJoin): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.token !== undefined && (obj.token = message.token);
    obj.metadata = {};
    if (message.metadata) {
      Object.entries(message.metadata).forEach(([k, v]) => {
        obj.metadata[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MatchJoin>): MatchJoin {
    const message = { ...baseMatchJoin } as MatchJoin;
    message.metadata = {};
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = undefined;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      Object.entries(object.metadata).forEach(([key, value]) => {
        if (value !== undefined) {
          message.metadata[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseMatchJoin_MetadataEntry: object = { key: "", value: "" };

export const MatchJoin_MetadataEntry = {
  encode(
    message: MatchJoin_MetadataEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MatchJoin_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMatchJoin_MetadataEntry,
    } as MatchJoin_MetadataEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchJoin_MetadataEntry {
    const message = {
      ...baseMatchJoin_MetadataEntry,
    } as MatchJoin_MetadataEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: MatchJoin_MetadataEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MatchJoin_MetadataEntry>
  ): MatchJoin_MetadataEntry {
    const message = {
      ...baseMatchJoin_MetadataEntry,
    } as MatchJoin_MetadataEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

const baseMatchLeave: object = { match_id: "" };

export const MatchLeave = {
  encode(
    message: MatchLeave,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchLeave {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchLeave } as MatchLeave;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchLeave {
    const message = { ...baseMatchLeave } as MatchLeave;
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = "";
    }
    return message;
  },

  toJSON(message: MatchLeave): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    return obj;
  },

  fromPartial(object: DeepPartial<MatchLeave>): MatchLeave {
    const message = { ...baseMatchLeave } as MatchLeave;
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    return message;
  },
};

const baseMatchPresenceEvent: object = { match_id: "" };

export const MatchPresenceEvent = {
  encode(
    message: MatchPresenceEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchPresenceEvent } as MatchPresenceEvent;
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchPresenceEvent {
    const message = { ...baseMatchPresenceEvent } as MatchPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = "";
    }
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MatchPresenceEvent): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.leaves = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MatchPresenceEvent>): MatchPresenceEvent {
    const message = { ...baseMatchPresenceEvent } as MatchPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMatchmakerAdd: object = { min_count: 0, max_count: 0, query: "" };

export const MatchmakerAdd = {
  encode(
    message: MatchmakerAdd,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.min_count !== 0) {
      writer.uint32(8).int32(message.min_count);
    }
    if (message.max_count !== 0) {
      writer.uint32(16).int32(message.max_count);
    }
    if (message.query !== "") {
      writer.uint32(26).string(message.query);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerAdd_StringPropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(34).fork()
      ).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerAdd_NumericPropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerAdd {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerAdd } as MatchmakerAdd;
    message.string_properties = {};
    message.numeric_properties = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.min_count = reader.int32();
          break;
        case 2:
          message.max_count = reader.int32();
          break;
        case 3:
          message.query = reader.string();
          break;
        case 4:
          const entry4 = MatchmakerAdd_StringPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry4.value !== undefined) {
            message.string_properties[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 = MatchmakerAdd_NumericPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry5.value !== undefined) {
            message.numeric_properties[entry5.key] = entry5.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerAdd {
    const message = { ...baseMatchmakerAdd } as MatchmakerAdd;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.min_count !== undefined && object.min_count !== null) {
      message.min_count = Number(object.min_count);
    } else {
      message.min_count = 0;
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    } else {
      message.max_count = 0;
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = String(object.query);
    } else {
      message.query = "";
    }
    if (
      object.string_properties !== undefined &&
      object.string_properties !== null
    ) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        message.string_properties[key] = String(value);
      });
    }
    if (
      object.numeric_properties !== undefined &&
      object.numeric_properties !== null
    ) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        message.numeric_properties[key] = Number(value);
      });
    }
    return message;
  },

  toJSON(message: MatchmakerAdd): unknown {
    const obj: any = {};
    message.min_count !== undefined && (obj.min_count = message.min_count);
    message.max_count !== undefined && (obj.max_count = message.max_count);
    message.query !== undefined && (obj.query = message.query);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MatchmakerAdd>): MatchmakerAdd {
    const message = { ...baseMatchmakerAdd } as MatchmakerAdd;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.min_count !== undefined && object.min_count !== null) {
      message.min_count = object.min_count;
    } else {
      message.min_count = 0;
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = object.max_count;
    } else {
      message.max_count = 0;
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = object.query;
    } else {
      message.query = "";
    }
    if (
      object.string_properties !== undefined &&
      object.string_properties !== null
    ) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.string_properties[key] = String(value);
        }
      });
    }
    if (
      object.numeric_properties !== undefined &&
      object.numeric_properties !== null
    ) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.numeric_properties[key] = Number(value);
        }
      });
    }
    return message;
  },
};

const baseMatchmakerAdd_StringPropertiesEntry: object = { key: "", value: "" };

export const MatchmakerAdd_StringPropertiesEntry = {
  encode(
    message: MatchmakerAdd_StringPropertiesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MatchmakerAdd_StringPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMatchmakerAdd_StringPropertiesEntry,
    } as MatchmakerAdd_StringPropertiesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerAdd_StringPropertiesEntry {
    const message = {
      ...baseMatchmakerAdd_StringPropertiesEntry,
    } as MatchmakerAdd_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: MatchmakerAdd_StringPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MatchmakerAdd_StringPropertiesEntry>
  ): MatchmakerAdd_StringPropertiesEntry {
    const message = {
      ...baseMatchmakerAdd_StringPropertiesEntry,
    } as MatchmakerAdd_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

const baseMatchmakerAdd_NumericPropertiesEntry: object = { key: "", value: 0 };

export const MatchmakerAdd_NumericPropertiesEntry = {
  encode(
    message: MatchmakerAdd_NumericPropertiesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MatchmakerAdd_NumericPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMatchmakerAdd_NumericPropertiesEntry,
    } as MatchmakerAdd_NumericPropertiesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerAdd_NumericPropertiesEntry {
    const message = {
      ...baseMatchmakerAdd_NumericPropertiesEntry,
    } as MatchmakerAdd_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },

  toJSON(message: MatchmakerAdd_NumericPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MatchmakerAdd_NumericPropertiesEntry>
  ): MatchmakerAdd_NumericPropertiesEntry {
    const message = {
      ...baseMatchmakerAdd_NumericPropertiesEntry,
    } as MatchmakerAdd_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    return message;
  },
};

const baseMatchmakerMatched: object = { ticket: "" };

export const MatchmakerMatched = {
  encode(
    message: MatchmakerMatched,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    if (message.match_id !== undefined) {
      writer.uint32(18).string(message.match_id);
    }
    if (message.token !== undefined) {
      writer.uint32(26).string(message.token);
    }
    for (const v of message.users) {
      MatchmakerMatched_MatchmakerUser.encode(
        v!,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.self !== undefined) {
      MatchmakerMatched_MatchmakerUser.encode(
        message.self,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerMatched } as MatchmakerMatched;
    message.users = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        case 2:
          message.match_id = reader.string();
          break;
        case 3:
          message.token = reader.string();
          break;
        case 4:
          message.users.push(
            MatchmakerMatched_MatchmakerUser.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.self = MatchmakerMatched_MatchmakerUser.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerMatched {
    const message = { ...baseMatchmakerMatched } as MatchmakerMatched;
    message.users = [];
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = undefined;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = undefined;
    }
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(MatchmakerMatched_MatchmakerUser.fromJSON(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = MatchmakerMatched_MatchmakerUser.fromJSON(object.self);
    } else {
      message.self = undefined;
    }
    return message;
  },

  toJSON(message: MatchmakerMatched): unknown {
    const obj: any = {};
    message.ticket !== undefined && (obj.ticket = message.ticket);
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.token !== undefined && (obj.token = message.token);
    if (message.users) {
      obj.users = message.users.map((e) =>
        e ? MatchmakerMatched_MatchmakerUser.toJSON(e) : undefined
      );
    } else {
      obj.users = [];
    }
    message.self !== undefined &&
      (obj.self = message.self
        ? MatchmakerMatched_MatchmakerUser.toJSON(message.self)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MatchmakerMatched>): MatchmakerMatched {
    const message = { ...baseMatchmakerMatched } as MatchmakerMatched;
    message.users = [];
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = undefined;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = undefined;
    }
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(MatchmakerMatched_MatchmakerUser.fromPartial(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = MatchmakerMatched_MatchmakerUser.fromPartial(object.self);
    } else {
      message.self = undefined;
    }
    return message;
  },
};

const baseMatchmakerMatched_MatchmakerUser: object = { party_id: "" };

export const MatchmakerMatched_MatchmakerUser = {
  encode(
    message: MatchmakerMatched_MatchmakerUser,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(10).fork()).ldelim();
    }
    if (message.party_id !== "") {
      writer.uint32(18).string(message.party_id);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(50).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MatchmakerMatched_MatchmakerUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser,
    } as MatchmakerMatched_MatchmakerUser;
    message.string_properties = {};
    message.numeric_properties = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 2:
          message.party_id = reader.string();
          break;
        case 5:
          const entry5 = MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry5.value !== undefined) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry6.value !== undefined) {
            message.numeric_properties[entry6.key] = entry6.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerMatched_MatchmakerUser {
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser,
    } as MatchmakerMatched_MatchmakerUser;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = undefined;
    }
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (
      object.string_properties !== undefined &&
      object.string_properties !== null
    ) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        message.string_properties[key] = String(value);
      });
    }
    if (
      object.numeric_properties !== undefined &&
      object.numeric_properties !== null
    ) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        message.numeric_properties[key] = Number(value);
      });
    }
    return message;
  },

  toJSON(message: MatchmakerMatched_MatchmakerUser): unknown {
    const obj: any = {};
    message.presence !== undefined &&
      (obj.presence = message.presence
        ? UserPresence.toJSON(message.presence)
        : undefined);
    message.party_id !== undefined && (obj.party_id = message.party_id);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MatchmakerMatched_MatchmakerUser>
  ): MatchmakerMatched_MatchmakerUser {
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser,
    } as MatchmakerMatched_MatchmakerUser;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = undefined;
    }
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (
      object.string_properties !== undefined &&
      object.string_properties !== null
    ) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.string_properties[key] = String(value);
        }
      });
    }
    if (
      object.numeric_properties !== undefined &&
      object.numeric_properties !== null
    ) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.numeric_properties[key] = Number(value);
        }
      });
    }
    return message;
  },
};

const baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry: object = {
  key: "",
  value: "",
};

export const MatchmakerMatched_MatchmakerUser_StringPropertiesEntry = {
  encode(
    message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry,
    } as MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(
    object: any
  ): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry,
    } as MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(
    message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry
  ): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MatchmakerMatched_MatchmakerUser_StringPropertiesEntry>
  ): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry,
    } as MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

const baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry: object = {
  key: "",
  value: 0,
};

export const MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry = {
  encode(
    message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry,
    } as MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(
    object: any
  ): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry,
    } as MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },

  toJSON(
    message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry
  ): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry>
  ): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    const message = {
      ...baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry,
    } as MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    return message;
  },
};

const baseMatchmakerRemove: object = { ticket: "" };

export const MatchmakerRemove = {
  encode(
    message: MatchmakerRemove,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerRemove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerRemove } as MatchmakerRemove;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerRemove {
    const message = { ...baseMatchmakerRemove } as MatchmakerRemove;
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    return message;
  },

  toJSON(message: MatchmakerRemove): unknown {
    const obj: any = {};
    message.ticket !== undefined && (obj.ticket = message.ticket);
    return obj;
  },

  fromPartial(object: DeepPartial<MatchmakerRemove>): MatchmakerRemove {
    const message = { ...baseMatchmakerRemove } as MatchmakerRemove;
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    return message;
  },
};

const baseMatchmakerTicket: object = { ticket: "" };

export const MatchmakerTicket = {
  encode(
    message: MatchmakerTicket,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerTicket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerTicket } as MatchmakerTicket;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerTicket {
    const message = { ...baseMatchmakerTicket } as MatchmakerTicket;
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    return message;
  },

  toJSON(message: MatchmakerTicket): unknown {
    const obj: any = {};
    message.ticket !== undefined && (obj.ticket = message.ticket);
    return obj;
  },

  fromPartial(object: DeepPartial<MatchmakerTicket>): MatchmakerTicket {
    const message = { ...baseMatchmakerTicket } as MatchmakerTicket;
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    return message;
  },
};

const baseNotifications: object = {};

export const Notifications = {
  encode(
    message: Notifications,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.notifications) {
      Notification.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notifications {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNotifications } as Notifications;
    message.notifications = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notifications.push(
            Notification.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Notifications {
    const message = { ...baseNotifications } as Notifications;
    message.notifications = [];
    if (object.notifications !== undefined && object.notifications !== null) {
      for (const e of object.notifications) {
        message.notifications.push(Notification.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Notifications): unknown {
    const obj: any = {};
    if (message.notifications) {
      obj.notifications = message.notifications.map((e) =>
        e ? Notification.toJSON(e) : undefined
      );
    } else {
      obj.notifications = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Notifications>): Notifications {
    const message = { ...baseNotifications } as Notifications;
    message.notifications = [];
    if (object.notifications !== undefined && object.notifications !== null) {
      for (const e of object.notifications) {
        message.notifications.push(Notification.fromPartial(e));
      }
    }
    return message;
  },
};

const baseParty: object = { party_id: "", open: false, max_size: 0 };

export const Party = {
  encode(message: Party, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.open === true) {
      writer.uint32(16).bool(message.open);
    }
    if (message.max_size !== 0) {
      writer.uint32(24).int32(message.max_size);
    }
    if (message.self !== undefined) {
      UserPresence.encode(message.self, writer.uint32(34).fork()).ldelim();
    }
    if (message.leader !== undefined) {
      UserPresence.encode(message.leader, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Party {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParty } as Party;
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.open = reader.bool();
          break;
        case 3:
          message.max_size = reader.int32();
          break;
        case 4:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        case 5:
          message.leader = UserPresence.decode(reader, reader.uint32());
          break;
        case 6:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Party {
    const message = { ...baseParty } as Party;
    message.presences = [];
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = Boolean(object.open);
    } else {
      message.open = false;
    }
    if (object.max_size !== undefined && object.max_size !== null) {
      message.max_size = Number(object.max_size);
    } else {
      message.max_size = 0;
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    } else {
      message.self = undefined;
    }
    if (object.leader !== undefined && object.leader !== null) {
      message.leader = UserPresence.fromJSON(object.leader);
    } else {
      message.leader = undefined;
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Party): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.open !== undefined && (obj.open = message.open);
    message.max_size !== undefined && (obj.max_size = message.max_size);
    message.self !== undefined &&
      (obj.self = message.self ? UserPresence.toJSON(message.self) : undefined);
    message.leader !== undefined &&
      (obj.leader = message.leader
        ? UserPresence.toJSON(message.leader)
        : undefined);
    if (message.presences) {
      obj.presences = message.presences.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.presences = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Party>): Party {
    const message = { ...baseParty } as Party;
    message.presences = [];
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = object.open;
    } else {
      message.open = false;
    }
    if (object.max_size !== undefined && object.max_size !== null) {
      message.max_size = object.max_size;
    } else {
      message.max_size = 0;
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    } else {
      message.self = undefined;
    }
    if (object.leader !== undefined && object.leader !== null) {
      message.leader = UserPresence.fromPartial(object.leader);
    } else {
      message.leader = undefined;
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
};

const basePartyCreate: object = { open: false, max_size: 0 };

export const PartyCreate = {
  encode(
    message: PartyCreate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.open === true) {
      writer.uint32(8).bool(message.open);
    }
    if (message.max_size !== 0) {
      writer.uint32(16).int32(message.max_size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyCreate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyCreate } as PartyCreate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.open = reader.bool();
          break;
        case 2:
          message.max_size = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyCreate {
    const message = { ...basePartyCreate } as PartyCreate;
    if (object.open !== undefined && object.open !== null) {
      message.open = Boolean(object.open);
    } else {
      message.open = false;
    }
    if (object.max_size !== undefined && object.max_size !== null) {
      message.max_size = Number(object.max_size);
    } else {
      message.max_size = 0;
    }
    return message;
  },

  toJSON(message: PartyCreate): unknown {
    const obj: any = {};
    message.open !== undefined && (obj.open = message.open);
    message.max_size !== undefined && (obj.max_size = message.max_size);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyCreate>): PartyCreate {
    const message = { ...basePartyCreate } as PartyCreate;
    if (object.open !== undefined && object.open !== null) {
      message.open = object.open;
    } else {
      message.open = false;
    }
    if (object.max_size !== undefined && object.max_size !== null) {
      message.max_size = object.max_size;
    } else {
      message.max_size = 0;
    }
    return message;
  },
};

const basePartyJoin: object = { party_id: "" };

export const PartyJoin = {
  encode(
    message: PartyJoin,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyJoin } as PartyJoin;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyJoin {
    const message = { ...basePartyJoin } as PartyJoin;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    return message;
  },

  toJSON(message: PartyJoin): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyJoin>): PartyJoin {
    const message = { ...basePartyJoin } as PartyJoin;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    return message;
  },
};

const basePartyLeave: object = { party_id: "" };

export const PartyLeave = {
  encode(
    message: PartyLeave,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyLeave {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyLeave } as PartyLeave;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyLeave {
    const message = { ...basePartyLeave } as PartyLeave;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    return message;
  },

  toJSON(message: PartyLeave): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyLeave>): PartyLeave {
    const message = { ...basePartyLeave } as PartyLeave;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    return message;
  },
};

const basePartyPromote: object = { party_id: "" };

export const PartyPromote = {
  encode(
    message: PartyPromote,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyPromote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyPromote } as PartyPromote;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyPromote {
    const message = { ...basePartyPromote } as PartyPromote;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = undefined;
    }
    return message;
  },

  toJSON(message: PartyPromote): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence
        ? UserPresence.toJSON(message.presence)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyPromote>): PartyPromote {
    const message = { ...basePartyPromote } as PartyPromote;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = undefined;
    }
    return message;
  },
};

const basePartyLeader: object = { party_id: "" };

export const PartyLeader = {
  encode(
    message: PartyLeader,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyLeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyLeader } as PartyLeader;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyLeader {
    const message = { ...basePartyLeader } as PartyLeader;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = undefined;
    }
    return message;
  },

  toJSON(message: PartyLeader): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence
        ? UserPresence.toJSON(message.presence)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyLeader>): PartyLeader {
    const message = { ...basePartyLeader } as PartyLeader;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = undefined;
    }
    return message;
  },
};

const basePartyAccept: object = { party_id: "" };

export const PartyAccept = {
  encode(
    message: PartyAccept,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyAccept {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyAccept } as PartyAccept;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyAccept {
    const message = { ...basePartyAccept } as PartyAccept;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = undefined;
    }
    return message;
  },

  toJSON(message: PartyAccept): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence
        ? UserPresence.toJSON(message.presence)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyAccept>): PartyAccept {
    const message = { ...basePartyAccept } as PartyAccept;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = undefined;
    }
    return message;
  },
};

const basePartyRemove: object = { party_id: "" };

export const PartyRemove = {
  encode(
    message: PartyRemove,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyRemove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyRemove } as PartyRemove;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyRemove {
    const message = { ...basePartyRemove } as PartyRemove;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = undefined;
    }
    return message;
  },

  toJSON(message: PartyRemove): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence
        ? UserPresence.toJSON(message.presence)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyRemove>): PartyRemove {
    const message = { ...basePartyRemove } as PartyRemove;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = undefined;
    }
    return message;
  },
};

const basePartyClose: object = { party_id: "" };

export const PartyClose = {
  encode(
    message: PartyClose,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyClose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyClose } as PartyClose;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyClose {
    const message = { ...basePartyClose } as PartyClose;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    return message;
  },

  toJSON(message: PartyClose): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyClose>): PartyClose {
    const message = { ...basePartyClose } as PartyClose;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    return message;
  },
};

const basePartyJoinRequestList: object = { party_id: "" };

export const PartyJoinRequestList = {
  encode(
    message: PartyJoinRequestList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PartyJoinRequestList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyJoinRequestList } as PartyJoinRequestList;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyJoinRequestList {
    const message = { ...basePartyJoinRequestList } as PartyJoinRequestList;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    return message;
  },

  toJSON(message: PartyJoinRequestList): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    return obj;
  },

  fromPartial(object: DeepPartial<PartyJoinRequestList>): PartyJoinRequestList {
    const message = { ...basePartyJoinRequestList } as PartyJoinRequestList;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    return message;
  },
};

const basePartyJoinRequest: object = { party_id: "" };

export const PartyJoinRequest = {
  encode(
    message: PartyJoinRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoinRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyJoinRequest } as PartyJoinRequest;
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyJoinRequest {
    const message = { ...basePartyJoinRequest } as PartyJoinRequest;
    message.presences = [];
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: PartyJoinRequest): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    if (message.presences) {
      obj.presences = message.presences.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.presences = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<PartyJoinRequest>): PartyJoinRequest {
    const message = { ...basePartyJoinRequest } as PartyJoinRequest;
    message.presences = [];
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
};

const basePartyMatchmakerAdd: object = {
  party_id: "",
  min_count: 0,
  max_count: 0,
  query: "",
};

export const PartyMatchmakerAdd = {
  encode(
    message: PartyMatchmakerAdd,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.min_count !== 0) {
      writer.uint32(16).int32(message.min_count);
    }
    if (message.max_count !== 0) {
      writer.uint32(24).int32(message.max_count);
    }
    if (message.query !== "") {
      writer.uint32(34).string(message.query);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      PartyMatchmakerAdd_StringPropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      PartyMatchmakerAdd_NumericPropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(50).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyMatchmakerAdd } as PartyMatchmakerAdd;
    message.string_properties = {};
    message.numeric_properties = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.min_count = reader.int32();
          break;
        case 3:
          message.max_count = reader.int32();
          break;
        case 4:
          message.query = reader.string();
          break;
        case 5:
          const entry5 = PartyMatchmakerAdd_StringPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry5.value !== undefined) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = PartyMatchmakerAdd_NumericPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry6.value !== undefined) {
            message.numeric_properties[entry6.key] = entry6.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerAdd {
    const message = { ...basePartyMatchmakerAdd } as PartyMatchmakerAdd;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.min_count !== undefined && object.min_count !== null) {
      message.min_count = Number(object.min_count);
    } else {
      message.min_count = 0;
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    } else {
      message.max_count = 0;
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = String(object.query);
    } else {
      message.query = "";
    }
    if (
      object.string_properties !== undefined &&
      object.string_properties !== null
    ) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        message.string_properties[key] = String(value);
      });
    }
    if (
      object.numeric_properties !== undefined &&
      object.numeric_properties !== null
    ) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        message.numeric_properties[key] = Number(value);
      });
    }
    return message;
  },

  toJSON(message: PartyMatchmakerAdd): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.min_count !== undefined && (obj.min_count = message.min_count);
    message.max_count !== undefined && (obj.max_count = message.max_count);
    message.query !== undefined && (obj.query = message.query);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<PartyMatchmakerAdd>): PartyMatchmakerAdd {
    const message = { ...basePartyMatchmakerAdd } as PartyMatchmakerAdd;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.min_count !== undefined && object.min_count !== null) {
      message.min_count = object.min_count;
    } else {
      message.min_count = 0;
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = object.max_count;
    } else {
      message.max_count = 0;
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = object.query;
    } else {
      message.query = "";
    }
    if (
      object.string_properties !== undefined &&
      object.string_properties !== null
    ) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.string_properties[key] = String(value);
        }
      });
    }
    if (
      object.numeric_properties !== undefined &&
      object.numeric_properties !== null
    ) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.numeric_properties[key] = Number(value);
        }
      });
    }
    return message;
  },
};

const basePartyMatchmakerAdd_StringPropertiesEntry: object = {
  key: "",
  value: "",
};

export const PartyMatchmakerAdd_StringPropertiesEntry = {
  encode(
    message: PartyMatchmakerAdd_StringPropertiesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PartyMatchmakerAdd_StringPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...basePartyMatchmakerAdd_StringPropertiesEntry,
    } as PartyMatchmakerAdd_StringPropertiesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerAdd_StringPropertiesEntry {
    const message = {
      ...basePartyMatchmakerAdd_StringPropertiesEntry,
    } as PartyMatchmakerAdd_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: PartyMatchmakerAdd_StringPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<PartyMatchmakerAdd_StringPropertiesEntry>
  ): PartyMatchmakerAdd_StringPropertiesEntry {
    const message = {
      ...basePartyMatchmakerAdd_StringPropertiesEntry,
    } as PartyMatchmakerAdd_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

const basePartyMatchmakerAdd_NumericPropertiesEntry: object = {
  key: "",
  value: 0,
};

export const PartyMatchmakerAdd_NumericPropertiesEntry = {
  encode(
    message: PartyMatchmakerAdd_NumericPropertiesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PartyMatchmakerAdd_NumericPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...basePartyMatchmakerAdd_NumericPropertiesEntry,
    } as PartyMatchmakerAdd_NumericPropertiesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerAdd_NumericPropertiesEntry {
    const message = {
      ...basePartyMatchmakerAdd_NumericPropertiesEntry,
    } as PartyMatchmakerAdd_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },

  toJSON(message: PartyMatchmakerAdd_NumericPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<PartyMatchmakerAdd_NumericPropertiesEntry>
  ): PartyMatchmakerAdd_NumericPropertiesEntry {
    const message = {
      ...basePartyMatchmakerAdd_NumericPropertiesEntry,
    } as PartyMatchmakerAdd_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    return message;
  },
};

const basePartyMatchmakerRemove: object = { party_id: "", ticket: "" };

export const PartyMatchmakerRemove = {
  encode(
    message: PartyMatchmakerRemove,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.ticket !== "") {
      writer.uint32(18).string(message.ticket);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PartyMatchmakerRemove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyMatchmakerRemove } as PartyMatchmakerRemove;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerRemove {
    const message = { ...basePartyMatchmakerRemove } as PartyMatchmakerRemove;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    return message;
  },

  toJSON(message: PartyMatchmakerRemove): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.ticket !== undefined && (obj.ticket = message.ticket);
    return obj;
  },

  fromPartial(
    object: DeepPartial<PartyMatchmakerRemove>
  ): PartyMatchmakerRemove {
    const message = { ...basePartyMatchmakerRemove } as PartyMatchmakerRemove;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    return message;
  },
};

const basePartyMatchmakerTicket: object = { party_id: "", ticket: "" };

export const PartyMatchmakerTicket = {
  encode(
    message: PartyMatchmakerTicket,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.ticket !== "") {
      writer.uint32(18).string(message.ticket);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PartyMatchmakerTicket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyMatchmakerTicket } as PartyMatchmakerTicket;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerTicket {
    const message = { ...basePartyMatchmakerTicket } as PartyMatchmakerTicket;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    return message;
  },

  toJSON(message: PartyMatchmakerTicket): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.ticket !== undefined && (obj.ticket = message.ticket);
    return obj;
  },

  fromPartial(
    object: DeepPartial<PartyMatchmakerTicket>
  ): PartyMatchmakerTicket {
    const message = { ...basePartyMatchmakerTicket } as PartyMatchmakerTicket;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    return message;
  },
};

const basePartyData: object = { party_id: "", op_code: 0 };

export const PartyData = {
  encode(
    message: PartyData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    if (message.op_code !== 0) {
      writer.uint32(24).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyData } as PartyData;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.op_code = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyData {
    const message = { ...basePartyData } as PartyData;
    message.data = new Uint8Array();
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = undefined;
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    } else {
      message.op_code = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },

  toJSON(message: PartyData): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence
        ? UserPresence.toJSON(message.presence)
        : undefined);
    message.op_code !== undefined && (obj.op_code = message.op_code);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<PartyData>): PartyData {
    const message = { ...basePartyData } as PartyData;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = undefined;
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = object.op_code;
    } else {
      message.op_code = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    return message;
  },
};

const basePartyDataSend: object = { party_id: "", op_code: 0 };

export const PartyDataSend = {
  encode(
    message: PartyDataSend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.op_code !== 0) {
      writer.uint32(16).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyDataSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyDataSend } as PartyDataSend;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.op_code = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyDataSend {
    const message = { ...basePartyDataSend } as PartyDataSend;
    message.data = new Uint8Array();
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    } else {
      message.op_code = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },

  toJSON(message: PartyDataSend): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.op_code !== undefined && (obj.op_code = message.op_code);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<PartyDataSend>): PartyDataSend {
    const message = { ...basePartyDataSend } as PartyDataSend;
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = object.op_code;
    } else {
      message.op_code = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    return message;
  },
};

const basePartyPresenceEvent: object = { party_id: "" };

export const PartyPresenceEvent = {
  encode(
    message: PartyPresenceEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePartyPresenceEvent } as PartyPresenceEvent;
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyPresenceEvent {
    const message = { ...basePartyPresenceEvent } as PartyPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: PartyPresenceEvent): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.leaves = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<PartyPresenceEvent>): PartyPresenceEvent {
    const message = { ...basePartyPresenceEvent } as PartyPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.party_id !== undefined && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
};

const basePing: object = {};

export const Ping = {
  encode(_: Ping, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ping {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePing } as Ping;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Ping {
    const message = { ...basePing } as Ping;
    return message;
  },

  toJSON(_: Ping): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<Ping>): Ping {
    const message = { ...basePing } as Ping;
    return message;
  },
};

const basePong: object = {};

export const Pong = {
  encode(_: Pong, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pong {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePong } as Pong;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Pong {
    const message = { ...basePong } as Pong;
    return message;
  },

  toJSON(_: Pong): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<Pong>): Pong {
    const message = { ...basePong } as Pong;
    return message;
  },
};

const baseStatus: object = {};

export const Status = {
  encode(
    message: Status,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Status {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStatus } as Status;
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Status {
    const message = { ...baseStatus } as Status;
    message.presences = [];
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Status): unknown {
    const obj: any = {};
    if (message.presences) {
      obj.presences = message.presences.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.presences = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Status>): Status {
    const message = { ...baseStatus } as Status;
    message.presences = [];
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
};

const baseStatusFollow: object = { user_ids: "", usernames: "" };

export const StatusFollow = {
  encode(
    message: StatusFollow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusFollow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStatusFollow } as StatusFollow;
    message.user_ids = [];
    message.usernames = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusFollow {
    const message = { ...baseStatusFollow } as StatusFollow;
    message.user_ids = [];
    message.usernames = [];
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    if (object.usernames !== undefined && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: StatusFollow): unknown {
    const obj: any = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StatusFollow>): StatusFollow {
    const message = { ...baseStatusFollow } as StatusFollow;
    message.user_ids = [];
    message.usernames = [];
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    if (object.usernames !== undefined && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(e);
      }
    }
    return message;
  },
};

const baseStatusPresenceEvent: object = {};

export const StatusPresenceEvent = {
  encode(
    message: StatusPresenceEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStatusPresenceEvent } as StatusPresenceEvent;
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusPresenceEvent {
    const message = { ...baseStatusPresenceEvent } as StatusPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: StatusPresenceEvent): unknown {
    const obj: any = {};
    if (message.joins) {
      obj.joins = message.joins.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.leaves = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StatusPresenceEvent>): StatusPresenceEvent {
    const message = { ...baseStatusPresenceEvent } as StatusPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
};

const baseStatusUnfollow: object = { user_ids: "" };

export const StatusUnfollow = {
  encode(
    message: StatusUnfollow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusUnfollow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStatusUnfollow } as StatusUnfollow;
    message.user_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusUnfollow {
    const message = { ...baseStatusUnfollow } as StatusUnfollow;
    message.user_ids = [];
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: StatusUnfollow): unknown {
    const obj: any = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StatusUnfollow>): StatusUnfollow {
    const message = { ...baseStatusUnfollow } as StatusUnfollow;
    message.user_ids = [];
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    return message;
  },
};

const baseStatusUpdate: object = {};

export const StatusUpdate = {
  encode(
    message: StatusUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== undefined) {
      StringValue.encode(
        { value: message.status! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStatusUpdate } as StatusUpdate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusUpdate {
    const message = { ...baseStatusUpdate } as StatusUpdate;
    if (object.status !== undefined && object.status !== null) {
      message.status = String(object.status);
    } else {
      message.status = undefined;
    }
    return message;
  },

  toJSON(message: StatusUpdate): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial(object: DeepPartial<StatusUpdate>): StatusUpdate {
    const message = { ...baseStatusUpdate } as StatusUpdate;
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = undefined;
    }
    return message;
  },
};

const baseStream: object = { mode: 0, subject: "", subcontext: "", label: "" };

export const Stream = {
  encode(
    message: Stream,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subcontext !== "") {
      writer.uint32(26).string(message.subcontext);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stream {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStream } as Stream;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32();
          break;
        case 2:
          message.subject = reader.string();
          break;
        case 3:
          message.subcontext = reader.string();
          break;
        case 4:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Stream {
    const message = { ...baseStream } as Stream;
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = Number(object.mode);
    } else {
      message.mode = 0;
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject);
    } else {
      message.subject = "";
    }
    if (object.subcontext !== undefined && object.subcontext !== null) {
      message.subcontext = String(object.subcontext);
    } else {
      message.subcontext = "";
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = "";
    }
    return message;
  },

  toJSON(message: Stream): unknown {
    const obj: any = {};
    message.mode !== undefined && (obj.mode = message.mode);
    message.subject !== undefined && (obj.subject = message.subject);
    message.subcontext !== undefined && (obj.subcontext = message.subcontext);
    message.label !== undefined && (obj.label = message.label);
    return obj;
  },

  fromPartial(object: DeepPartial<Stream>): Stream {
    const message = { ...baseStream } as Stream;
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = object.mode;
    } else {
      message.mode = 0;
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject;
    } else {
      message.subject = "";
    }
    if (object.subcontext !== undefined && object.subcontext !== null) {
      message.subcontext = object.subcontext;
    } else {
      message.subcontext = "";
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = "";
    }
    return message;
  },
};

const baseStreamData: object = { data: "", reliable: false };

export const StreamData = {
  encode(
    message: StreamData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stream !== undefined) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    if (message.sender !== undefined) {
      UserPresence.encode(message.sender, writer.uint32(18).fork()).ldelim();
    }
    if (message.data !== "") {
      writer.uint32(26).string(message.data);
    }
    if (message.reliable === true) {
      writer.uint32(32).bool(message.reliable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStreamData } as StreamData;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        case 2:
          message.sender = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.data = reader.string();
          break;
        case 4:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamData {
    const message = { ...baseStreamData } as StreamData;
    if (object.stream !== undefined && object.stream !== null) {
      message.stream = Stream.fromJSON(object.stream);
    } else {
      message.stream = undefined;
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = UserPresence.fromJSON(object.sender);
    } else {
      message.sender = undefined;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data);
    } else {
      message.data = "";
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    } else {
      message.reliable = false;
    }
    return message;
  },

  toJSON(message: StreamData): unknown {
    const obj: any = {};
    message.stream !== undefined &&
      (obj.stream = message.stream ? Stream.toJSON(message.stream) : undefined);
    message.sender !== undefined &&
      (obj.sender = message.sender
        ? UserPresence.toJSON(message.sender)
        : undefined);
    message.data !== undefined && (obj.data = message.data);
    message.reliable !== undefined && (obj.reliable = message.reliable);
    return obj;
  },

  fromPartial(object: DeepPartial<StreamData>): StreamData {
    const message = { ...baseStreamData } as StreamData;
    if (object.stream !== undefined && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
    } else {
      message.stream = undefined;
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = UserPresence.fromPartial(object.sender);
    } else {
      message.sender = undefined;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = "";
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = object.reliable;
    } else {
      message.reliable = false;
    }
    return message;
  },
};

const baseStreamPresenceEvent: object = {};

export const StreamPresenceEvent = {
  encode(
    message: StreamPresenceEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stream !== undefined) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStreamPresenceEvent } as StreamPresenceEvent;
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamPresenceEvent {
    const message = { ...baseStreamPresenceEvent } as StreamPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.stream !== undefined && object.stream !== null) {
      message.stream = Stream.fromJSON(object.stream);
    } else {
      message.stream = undefined;
    }
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: StreamPresenceEvent): unknown {
    const obj: any = {};
    message.stream !== undefined &&
      (obj.stream = message.stream ? Stream.toJSON(message.stream) : undefined);
    if (message.joins) {
      obj.joins = message.joins.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) =>
        e ? UserPresence.toJSON(e) : undefined
      );
    } else {
      obj.leaves = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StreamPresenceEvent>): StreamPresenceEvent {
    const message = { ...baseStreamPresenceEvent } as StreamPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.stream !== undefined && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
    } else {
      message.stream = undefined;
    }
    if (object.joins !== undefined && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== undefined && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
};

const baseUserPresence: object = {
  user_id: "",
  session_id: "",
  username: "",
  persistence: false,
};

export const UserPresence = {
  encode(
    message: UserPresence,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.session_id !== "") {
      writer.uint32(18).string(message.session_id);
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.persistence === true) {
      writer.uint32(32).bool(message.persistence);
    }
    if (message.status !== undefined) {
      StringValue.encode(
        { value: message.status! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserPresence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUserPresence } as UserPresence;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.session_id = reader.string();
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.persistence = reader.bool();
          break;
        case 5:
          message.status = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserPresence {
    const message = { ...baseUserPresence } as UserPresence;
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = String(object.user_id);
    } else {
      message.user_id = "";
    }
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = String(object.session_id);
    } else {
      message.session_id = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.persistence !== undefined && object.persistence !== null) {
      message.persistence = Boolean(object.persistence);
    } else {
      message.persistence = false;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = String(object.status);
    } else {
      message.status = undefined;
    }
    return message;
  },

  toJSON(message: UserPresence): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.session_id !== undefined && (obj.session_id = message.session_id);
    message.username !== undefined && (obj.username = message.username);
    message.persistence !== undefined &&
      (obj.persistence = message.persistence);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial(object: DeepPartial<UserPresence>): UserPresence {
    const message = { ...baseUserPresence } as UserPresence;
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = object.user_id;
    } else {
      message.user_id = "";
    }
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = object.session_id;
    } else {
      message.session_id = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.persistence !== undefined && object.persistence !== null) {
      message.persistence = object.persistence;
    } else {
      message.persistence = false;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = undefined;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
