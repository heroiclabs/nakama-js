/* eslint-disable */
// *
//  The realtime protocol for Nakama server.
//
import { ChannelMessage, Rpc, Notification } from '../api/api';
import { Timestamp } from '../../../../google/protobuf/timestamp';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';
import { BoolValue, Int32Value, StringValue } from '../../../../google/protobuf/wrappers';


/**
 *  An envelope for a realtime message.
 */
export interface Envelope {
  cid: string;
  /**
   * channel
   *  A response from a channel join operation.
   *
   * channel_join
   *  Join a realtime chat channel.
   *
   * channel_leave
   *  Leave a realtime chat channel.
   *
   * channel_message
   *  An incoming message on a realtime chat channel.
   *
   * channel_message_ack
   *  An acknowledgement received in response to sending a message on a chat channel.
   *
   * channel_message_send
   *  Send a message to a realtime chat channel.
   *
   * channel_message_update
   *  Update a message previously sent to a realtime chat channel.
   *
   * channel_message_remove
   *  Remove a message previously sent to a realtime chat channel.
   *
   * channel_presence_event
   *  Presence update for a particular realtime chat channel.
   *
   * error
   *  Describes an error which occurred on the server.
   *
   * match
   *  Incoming information about a realtime match.
   *
   * match_create
   *  A client to server request to create a realtime match.
   *
   * match_data
   *  Incoming realtime match data delivered from the server.
   *
   * match_data_send
   *  A client to server request to send data to a realtime match.
   *
   * match_join
   *  A client to server request to join a realtime match.
   *
   * match_leave
   *  A client to server request to leave a realtime match.
   *
   * match_presence_event
   *  Presence update for a particular realtime match.
   *
   * matchmaker_add
   *  Submit a new matchmaking process request.
   *
   * matchmaker_matched
   *  A successful matchmaking result.
   *
   * matchmaker_remove
   *  Cancel a matchmaking process using a ticket.
   *
   * matchmaker_ticket
   *  A response from starting a new matchmaking process.
   *
   * notifications
   *  Notifications send by the server.
   *
   * rpc
   *  RPC call or response.
   *
   * status
   *  An incoming status snapshot for some set of users.
   *
   * status_follow
   *  Start following some set of users to receive their status updates.
   *
   * status_presence_event
   *  An incoming status update.
   *
   * status_unfollow
   *  Stop following some set of users to no longer receive their status updates.
   *
   * status_update
   *  Set the user's own status.
   *
   * stream_data
   *  A data message delivered over a stream.
   *
   * stream_presence_event
   *  Presence update for a particular stream.
   *
   * ping
   *  Application-level heartbeat and connection check.
   *
   * pong
   *  Application-level heartbeat and connection check response.
   */
  message?: { $case: 'channel', channel: Channel } | { $case: 'channel_join', channel_join: ChannelJoin } | { $case: 'channel_leave', channel_leave: ChannelLeave } | { $case: 'channel_message', channel_message: ChannelMessage } | { $case: 'channel_message_ack', channel_message_ack: ChannelMessageAck } | { $case: 'channel_message_send', channel_message_send: ChannelMessageSend } | { $case: 'channel_message_update', channel_message_update: ChannelMessageUpdate } | { $case: 'channel_message_remove', channel_message_remove: ChannelMessageRemove } | { $case: 'channel_presence_event', channel_presence_event: ChannelPresenceEvent } | { $case: 'error', error: Error } | { $case: 'match', match: Match } | { $case: 'match_create', match_create: MatchCreate } | { $case: 'match_data', match_data: MatchData } | { $case: 'match_data_send', match_data_send: MatchDataSend } | { $case: 'match_join', match_join: MatchJoin } | { $case: 'match_leave', match_leave: MatchLeave } | { $case: 'match_presence_event', match_presence_event: MatchPresenceEvent } | { $case: 'matchmaker_add', matchmaker_add: MatchmakerAdd } | { $case: 'matchmaker_matched', matchmaker_matched: MatchmakerMatched } | { $case: 'matchmaker_remove', matchmaker_remove: MatchmakerRemove } | { $case: 'matchmaker_ticket', matchmaker_ticket: MatchmakerTicket } | { $case: 'notifications', notifications: Notifications } | { $case: 'rpc', rpc: Rpc } | { $case: 'status', status: Status } | { $case: 'status_follow', status_follow: StatusFollow } | { $case: 'status_presence_event', status_presence_event: StatusPresenceEvent } | { $case: 'status_unfollow', status_unfollow: StatusUnfollow } | { $case: 'status_update', status_update: StatusUpdate } | { $case: 'stream_data', stream_data: StreamData } | { $case: 'stream_presence_event', stream_presence_event: StreamPresenceEvent } | { $case: 'ping', ping: Ping } | { $case: 'pong', pong: Pong };
}

/**
 *  A realtime chat channel.
 */
export interface Channel {
  /**
   *  The ID of the channel.
   */
  id: string;
  /**
   *  The users currently in the channel.
   */
  presences: UserPresence[];
  /**
   *  A reference to the current user's presence in the channel.
   */
  self?: UserPresence;
  /**
   *  The name of the chat room, or an empty string if this message was not sent through a chat room.
   */
  room_name: string;
  /**
   *  The ID of the group, or an empty string if this message was not sent through a group channel.
   */
  group_id: string;
  /**
   *  The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
   */
  user_id_one: string;
  /**
   *  The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
   */
  user_id_two: string;
}

/**
 *  Join operation for a realtime chat channel.
 */
export interface ChannelJoin {
  /**
   *  The user ID to DM with, group ID to chat with, or room channel name to join.
   */
  target: string;
  /**
   *  The type of the chat channel.
   */
  type: number;
  /**
   *  Whether messages sent on this channel should be persistent.
   */
  persistence?: boolean;
  /**
   *  Whether the user should appear in the channel's presence list and events.
   */
  hidden?: boolean;
}

/**
 *  Leave a realtime channel.
 */
export interface ChannelLeave {
  /**
   *  The ID of the channel to leave.
   */
  channel_id: string;
}

/**
 *  A receipt reply from a channel message send operation.
 */
export interface ChannelMessageAck {
  /**
   *  The channel the message was sent to.
   */
  channel_id: string;
  /**
   *  The unique ID assigned to the message.
   */
  message_id: string;
  /**
   *  The code representing a message type or category.
   */
  code?: number;
  /**
   *  Username of the message sender.
   */
  username: string;
  /**
   *  The UNIX time when the message was created.
   */
  create_time?: Date;
  /**
   *  The UNIX time when the message was last updated.
   */
  update_time?: Date;
  /**
   *  True if the message was persisted to the channel's history, false otherwise.
   */
  persistent?: boolean;
  /**
   *  The name of the chat room, or an empty string if this message was not sent through a chat room.
   */
  room_name: string;
  /**
   *  The ID of the group, or an empty string if this message was not sent through a group channel.
   */
  group_id: string;
  /**
   *  The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
   */
  user_id_one: string;
  /**
   *  The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
   */
  user_id_two: string;
}

/**
 *  Send a message to a realtime channel.
 */
export interface ChannelMessageSend {
  /**
   *  The channel to sent to.
   */
  channel_id: string;
  /**
   *  Message content.
   */
  content: string;
}

/**
 *  Update a message previously sent to a realtime channel.
 */
export interface ChannelMessageUpdate {
  /**
   *  The channel the message was sent to.
   */
  channel_id: string;
  /**
   *  The ID assigned to the message to update.
   */
  message_id: string;
  /**
   *  New message content.
   */
  content: string;
}

/**
 *  Remove a message previously sent to a realtime channel.
 */
export interface ChannelMessageRemove {
  /**
   *  The channel the message was sent to.
   */
  channel_id: string;
  /**
   *  The ID assigned to the message to update.
   */
  message_id: string;
}

/**
 *  A set of joins and leaves on a particular channel.
 */
export interface ChannelPresenceEvent {
  /**
   *  The channel identifier this event is for.
   */
  channel_id: string;
  /**
   *  Presences joining the channel as part of this event, if any.
   */
  joins: UserPresence[];
  /**
   *  Presences leaving the channel as part of this event, if any.
   */
  leaves: UserPresence[];
  /**
   *  The name of the chat room, or an empty string if this message was not sent through a chat room.
   */
  room_name: string;
  /**
   *  The ID of the group, or an empty string if this message was not sent through a group channel.
   */
  group_id: string;
  /**
   *  The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
   */
  user_id_one: string;
  /**
   *  The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
   */
  user_id_two: string;
}

/**
 *  A logical error which may occur on the server.
 */
export interface Error {
  /**
   *  The error code which should be one of "Error.Code" enums.
   */
  code: number;
  /**
   *  A message in English to help developers debug the response.
   */
  message: string;
  /**
   *  Additional error details which may be different for each response.
   */
  context: { [key: string]: string };
}

export interface Error_ContextEntry {
  key: string;
  value: string;
}

/**
 *  A realtime match.
 */
export interface Match {
  /**
   *  The match unique ID.
   */
  match_id: string;
  /**
   *  True if it's an server-managed authoritative match, false otherwise.
   */
  authoritative: boolean;
  /**
   *  Match label, if any.
   */
  label?: string;
  /**
   *  The number of users currently in the match.
   */
  size: number;
  /**
   *  The users currently in the match.
   */
  presences: UserPresence[];
  /**
   *  A reference to the current user's presence in the match.
   */
  self?: UserPresence;
}

/**
 *  Create a new realtime match.
 */
export interface MatchCreate {
}

/**
 *  Realtime match data received from the server.
 */
export interface MatchData {
  /**
   *  The match unique ID.
   */
  match_id: string;
  /**
   *  A reference to the user presence that sent this data, if any.
   */
  presence?: UserPresence;
  /**
   *  Op code value.
   */
  op_code: number;
  /**
   *  Data payload, if any.
   */
  data: Uint8Array;
  /**
   *  True if this data was delivered reliably, false otherwise.
   */
  reliable: boolean;
}

/**
 *  Send realtime match data to the server.
 */
export interface MatchDataSend {
  /**
   *  The match unique ID.
   */
  match_id: string;
  /**
   *  Op code value.
   */
  op_code: number;
  /**
   *  Data payload, if any.
   */
  data: Uint8Array;
  /**
   *  List of presences in the match to deliver to, if filtering is required. Otherwise deliver to everyone in the match.
   */
  presences: UserPresence[];
  /**
   *  True if the data should be sent reliably, false otherwise.
   */
  reliable: boolean;
}

/**
 *  Join an existing realtime match.
 */
export interface MatchJoin {
  /**
   * match_id
   *  The match unique ID.
   *
   * token
   *  A matchmaking result token.
   */
  id?: { $case: 'match_id', match_id: string } | { $case: 'token', token: string };
  /**
   *  An optional set of key-value metadata pairs to be passed to the match handler, if any.
   */
  metadata: { [key: string]: string };
}

export interface MatchJoin_MetadataEntry {
  key: string;
  value: string;
}

/**
 *  Leave a realtime match.
 */
export interface MatchLeave {
  /**
   *  The match unique ID.
   */
  match_id: string;
}

/**
 *  A set of joins and leaves on a particular realtime match.
 */
export interface MatchPresenceEvent {
  /**
   *  The match unique ID.
   */
  match_id: string;
  /**
   *  User presences that have just joined the match.
   */
  joins: UserPresence[];
  /**
   *  User presences that have just left the match.
   */
  leaves: UserPresence[];
}

/**
 *  Start a new matchmaking process.
 */
export interface MatchmakerAdd {
  /**
   *  Minimum total user count to match together.
   */
  min_count: number;
  /**
   *  Maximum total user count to match together.
   */
  max_count: number;
  /**
   *  Filter query used to identify suitable users.
   */
  query: string;
  /**
   *  String properties.
   */
  string_properties: { [key: string]: string };
  /**
   *  Numeric properties.
   */
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

/**
 *  A successful matchmaking result.
 */
export interface MatchmakerMatched {
  /**
   *  The matchmaking ticket that has completed.
   */
  ticket: string;
  /**
   *  The match token or match ID to join.
   *
   * match_id
   *  Match ID.
   *
   * token
   *  Match join token.
   */
  id?: { $case: 'match_id', match_id: string } | { $case: 'token', token: string };
  /**
   *  The users that have been matched together, and information about their matchmaking data.
   */
  users: MatchmakerMatched_MatchmakerUser[];
  /**
   *  A reference to the current user and their properties.
   */
  self?: MatchmakerMatched_MatchmakerUser;
}

export interface MatchmakerMatched_MatchmakerUser {
  /**
   *  User info.
   */
  presence?: UserPresence;
  /**
   *  String properties.
   */
  string_properties: { [key: string]: string };
  /**
   *  Numeric properties.
   */
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

/**
 *  Cancel an existing ongoing matchmaking process.
 */
export interface MatchmakerRemove {
  /**
   *  The ticket to cancel.
   */
  ticket: string;
}

/**
 *  A ticket representing a new matchmaking process.
 */
export interface MatchmakerTicket {
  /**
   *  The ticket that can be used to cancel matchmaking.
   */
  ticket: string;
}

/**
 *  A collection of zero or more notifications.
 */
export interface Notifications {
  /**
   *  Collection of notifications.
   */
  notifications: Notification[];
}

/**
 *  Application-level heartbeat and connection check.
 */
export interface Ping {
}

/**
 *  Application-level heartbeat and connection check response.
 */
export interface Pong {
}

/**
 *  A snapshot of statuses for some set of users.
 */
export interface Status {
  /**
   *  User statuses.
   */
  presences: UserPresence[];
}

/**
 *  Start receiving status updates for some set of users.
 */
export interface StatusFollow {
  /**
   *  User IDs to follow.
   */
  user_ids: string[];
  /**
   *  Usernames to follow.
   */
  usernames: string[];
}

/**
 *  A batch of status updates for a given user.
 */
export interface StatusPresenceEvent {
  /**
   *  New statuses for the user.
   */
  joins: UserPresence[];
  /**
   *  Previous statuses for the user.
   */
  leaves: UserPresence[];
}

/**
 *  Stop receiving status updates for some set of users.
 */
export interface StatusUnfollow {
  /**
   *  Users to unfollow.
   */
  user_ids: string[];
}

/**
 *  Set the user's own status.
 */
export interface StatusUpdate {
  /**
   *  Status string to set, if not present the user will appear offline.
   */
  status?: string;
}

/**
 *  Represents identifying information for a stream.
 */
export interface Stream {
  /**
   *  Mode identifies the type of stream.
   */
  mode: number;
  /**
   *  Subject is the primary identifier, if any.
   */
  subject: string;
  /**
   *  Subcontext is a secondary identifier, if any.
   */
  subcontext: string;
  /**
   *  The label is an arbitrary identifying string, if the stream has one.
   */
  label: string;
}

/**
 *  A data message delivered over a stream.
 */
export interface StreamData {
  /**
   *  The stream this data message relates to.
   */
  stream?: Stream;
  /**
   *  The sender, if any.
   */
  sender?: UserPresence;
  /**
   *  Arbitrary contents of the data message.
   */
  data: string;
  /**
   *  True if this data was delivered reliably, false otherwise.
   */
  reliable: boolean;
}

/**
 *  A set of joins and leaves on a particular stream.
 */
export interface StreamPresenceEvent {
  /**
   *  The stream this event relates to.
   */
  stream?: Stream;
  /**
   *  Presences joining the stream as part of this event, if any.
   */
  joins: UserPresence[];
  /**
   *  Presences leaving the stream as part of this event, if any.
   */
  leaves: UserPresence[];
}

/**
 *  A user session associated to a stream, usually through a list operation or a join/leave event.
 */
export interface UserPresence {
  /**
   *  The user this presence belongs to.
   */
  user_id: string;
  /**
   *  A unique session ID identifying the particular connection, because the user may have many.
   */
  session_id: string;
  /**
   *  The username for display purposes.
   */
  username: string;
  /**
   *  Whether this presence generates persistent data/messages, if applicable for the stream type.
   */
  persistence: boolean;
  /**
   *  A user-set status message for this stream, if applicable.
   */
  status?: string;
}

const baseEnvelope: object = {
  cid: "",
};

const baseChannel: object = {
  id: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: "",
};

const baseChannelJoin: object = {
  target: "",
  type: 0,
};

const baseChannelLeave: object = {
  channel_id: "",
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

const baseChannelMessageSend: object = {
  channel_id: "",
  content: "",
};

const baseChannelMessageUpdate: object = {
  channel_id: "",
  message_id: "",
  content: "",
};

const baseChannelMessageRemove: object = {
  channel_id: "",
  message_id: "",
};

const baseChannelPresenceEvent: object = {
  channel_id: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: "",
};

const baseError: object = {
  code: 0,
  message: "",
};

const baseError_ContextEntry: object = {
  key: "",
  value: "",
};

const baseMatch: object = {
  match_id: "",
  authoritative: false,
  size: 0,
};

const baseMatchCreate: object = {
};

const baseMatchData: object = {
  match_id: "",
  op_code: 0,
  reliable: false,
};

const baseMatchDataSend: object = {
  match_id: "",
  op_code: 0,
  reliable: false,
};

const baseMatchJoin: object = {
};

const baseMatchJoin_MetadataEntry: object = {
  key: "",
  value: "",
};

const baseMatchLeave: object = {
  match_id: "",
};

const baseMatchPresenceEvent: object = {
  match_id: "",
};

const baseMatchmakerAdd: object = {
  min_count: 0,
  max_count: 0,
  query: "",
};

const baseMatchmakerAdd_StringPropertiesEntry: object = {
  key: "",
  value: "",
};

const baseMatchmakerAdd_NumericPropertiesEntry: object = {
  key: "",
  value: 0,
};

const baseMatchmakerMatched: object = {
  ticket: "",
};

const baseMatchmakerMatched_MatchmakerUser: object = {
};

const baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry: object = {
  key: "",
  value: "",
};

const baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry: object = {
  key: "",
  value: 0,
};

const baseMatchmakerRemove: object = {
  ticket: "",
};

const baseMatchmakerTicket: object = {
  ticket: "",
};

const baseNotifications: object = {
};

const basePing: object = {
};

const basePong: object = {
};

const baseStatus: object = {
};

const baseStatusFollow: object = {
  user_ids: "",
  usernames: "",
};

const baseStatusPresenceEvent: object = {
};

const baseStatusUnfollow: object = {
  user_ids: "",
};

const baseStatusUpdate: object = {
};

const baseStream: object = {
  mode: 0,
  subject: "",
  subcontext: "",
  label: "",
};

const baseStreamData: object = {
  data: "",
  reliable: false,
};

const baseStreamPresenceEvent: object = {
};

const baseUserPresence: object = {
  user_id: "",
  session_id: "",
  username: "",
  persistence: false,
};

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

/**  The type of chat channel.
 */
export const ChannelJoin_Type = {
  /** TYPE_UNSPECIFIED -  Default case. Assumed as ROOM type.
   */
  TYPE_UNSPECIFIED: 0 as const,
  /** ROOM -  A room which anyone can join to chat.
   */
  ROOM: 1 as const,
  /** DIRECT_MESSAGE -  A private channel for 1-on-1 chat.
   */
  DIRECT_MESSAGE: 2 as const,
  /** GROUP -  A channel for group chat.
   */
  GROUP: 3 as const,
  UNRECOGNIZED: -1 as const,
  fromJSON(object: any): ChannelJoin_Type {
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
  },
  toJSON(object: ChannelJoin_Type): string {
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
  },
}

export type ChannelJoin_Type = 0 | 1 | 2 | 3 | -1;

/**  The selection of possible error codes.
 */
export const Error_Code = {
  /** RUNTIME_EXCEPTION -  An unexpected result from the server.
   */
  RUNTIME_EXCEPTION: 0 as const,
  /** UNRECOGNIZED_PAYLOAD -  The server received a message which is not recognised.
   */
  UNRECOGNIZED_PAYLOAD: 1 as const,
  /** MISSING_PAYLOAD -  A message was expected but contains no content.
   */
  MISSING_PAYLOAD: 2 as const,
  /** BAD_INPUT -  Fields in the message have an invalid format.
   */
  BAD_INPUT: 3 as const,
  /** MATCH_NOT_FOUND -  The match id was not found.
   */
  MATCH_NOT_FOUND: 4 as const,
  /** MATCH_JOIN_REJECTED -  The match join was rejected.
   */
  MATCH_JOIN_REJECTED: 5 as const,
  /** RUNTIME_FUNCTION_NOT_FOUND -  The runtime function does not exist on the server.
   */
  RUNTIME_FUNCTION_NOT_FOUND: 6 as const,
  /** RUNTIME_FUNCTION_EXCEPTION -  The runtime function executed with an error.
   */
  RUNTIME_FUNCTION_EXCEPTION: 7 as const,
  UNRECOGNIZED: -1 as const,
  fromJSON(object: any): Error_Code {
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
  },
  toJSON(object: Error_Code): string {
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
  },
}

export type Error_Code = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1;

export const Envelope = {
  encode(message: Envelope, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cid);
    if (message.message?.$case === 'channel' && message.message?.channel !== undefined) {
      Channel.encode(message.message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (message.message?.$case === 'channel_join' && message.message?.channel_join !== undefined) {
      ChannelJoin.encode(message.message.channel_join, writer.uint32(26).fork()).ldelim();
    }
    if (message.message?.$case === 'channel_leave' && message.message?.channel_leave !== undefined) {
      ChannelLeave.encode(message.message.channel_leave, writer.uint32(34).fork()).ldelim();
    }
    if (message.message?.$case === 'channel_message' && message.message?.channel_message !== undefined) {
      ChannelMessage.encode(message.message.channel_message, writer.uint32(42).fork()).ldelim();
    }
    if (message.message?.$case === 'channel_message_ack' && message.message?.channel_message_ack !== undefined) {
      ChannelMessageAck.encode(message.message.channel_message_ack, writer.uint32(50).fork()).ldelim();
    }
    if (message.message?.$case === 'channel_message_send' && message.message?.channel_message_send !== undefined) {
      ChannelMessageSend.encode(message.message.channel_message_send, writer.uint32(58).fork()).ldelim();
    }
    if (message.message?.$case === 'channel_message_update' && message.message?.channel_message_update !== undefined) {
      ChannelMessageUpdate.encode(message.message.channel_message_update, writer.uint32(66).fork()).ldelim();
    }
    if (message.message?.$case === 'channel_message_remove' && message.message?.channel_message_remove !== undefined) {
      ChannelMessageRemove.encode(message.message.channel_message_remove, writer.uint32(74).fork()).ldelim();
    }
    if (message.message?.$case === 'channel_presence_event' && message.message?.channel_presence_event !== undefined) {
      ChannelPresenceEvent.encode(message.message.channel_presence_event, writer.uint32(82).fork()).ldelim();
    }
    if (message.message?.$case === 'error' && message.message?.error !== undefined) {
      Error.encode(message.message.error, writer.uint32(90).fork()).ldelim();
    }
    if (message.message?.$case === 'match' && message.message?.match !== undefined) {
      Match.encode(message.message.match, writer.uint32(98).fork()).ldelim();
    }
    if (message.message?.$case === 'match_create' && message.message?.match_create !== undefined) {
      MatchCreate.encode(message.message.match_create, writer.uint32(106).fork()).ldelim();
    }
    if (message.message?.$case === 'match_data' && message.message?.match_data !== undefined) {
      MatchData.encode(message.message.match_data, writer.uint32(114).fork()).ldelim();
    }
    if (message.message?.$case === 'match_data_send' && message.message?.match_data_send !== undefined) {
      MatchDataSend.encode(message.message.match_data_send, writer.uint32(122).fork()).ldelim();
    }
    if (message.message?.$case === 'match_join' && message.message?.match_join !== undefined) {
      MatchJoin.encode(message.message.match_join, writer.uint32(130).fork()).ldelim();
    }
    if (message.message?.$case === 'match_leave' && message.message?.match_leave !== undefined) {
      MatchLeave.encode(message.message.match_leave, writer.uint32(138).fork()).ldelim();
    }
    if (message.message?.$case === 'match_presence_event' && message.message?.match_presence_event !== undefined) {
      MatchPresenceEvent.encode(message.message.match_presence_event, writer.uint32(146).fork()).ldelim();
    }
    if (message.message?.$case === 'matchmaker_add' && message.message?.matchmaker_add !== undefined) {
      MatchmakerAdd.encode(message.message.matchmaker_add, writer.uint32(154).fork()).ldelim();
    }
    if (message.message?.$case === 'matchmaker_matched' && message.message?.matchmaker_matched !== undefined) {
      MatchmakerMatched.encode(message.message.matchmaker_matched, writer.uint32(162).fork()).ldelim();
    }
    if (message.message?.$case === 'matchmaker_remove' && message.message?.matchmaker_remove !== undefined) {
      MatchmakerRemove.encode(message.message.matchmaker_remove, writer.uint32(170).fork()).ldelim();
    }
    if (message.message?.$case === 'matchmaker_ticket' && message.message?.matchmaker_ticket !== undefined) {
      MatchmakerTicket.encode(message.message.matchmaker_ticket, writer.uint32(178).fork()).ldelim();
    }
    if (message.message?.$case === 'notifications' && message.message?.notifications !== undefined) {
      Notifications.encode(message.message.notifications, writer.uint32(186).fork()).ldelim();
    }
    if (message.message?.$case === 'rpc' && message.message?.rpc !== undefined) {
      Rpc.encode(message.message.rpc, writer.uint32(194).fork()).ldelim();
    }
    if (message.message?.$case === 'status' && message.message?.status !== undefined) {
      Status.encode(message.message.status, writer.uint32(202).fork()).ldelim();
    }
    if (message.message?.$case === 'status_follow' && message.message?.status_follow !== undefined) {
      StatusFollow.encode(message.message.status_follow, writer.uint32(210).fork()).ldelim();
    }
    if (message.message?.$case === 'status_presence_event' && message.message?.status_presence_event !== undefined) {
      StatusPresenceEvent.encode(message.message.status_presence_event, writer.uint32(218).fork()).ldelim();
    }
    if (message.message?.$case === 'status_unfollow' && message.message?.status_unfollow !== undefined) {
      StatusUnfollow.encode(message.message.status_unfollow, writer.uint32(226).fork()).ldelim();
    }
    if (message.message?.$case === 'status_update' && message.message?.status_update !== undefined) {
      StatusUpdate.encode(message.message.status_update, writer.uint32(234).fork()).ldelim();
    }
    if (message.message?.$case === 'stream_data' && message.message?.stream_data !== undefined) {
      StreamData.encode(message.message.stream_data, writer.uint32(242).fork()).ldelim();
    }
    if (message.message?.$case === 'stream_presence_event' && message.message?.stream_presence_event !== undefined) {
      StreamPresenceEvent.encode(message.message.stream_presence_event, writer.uint32(250).fork()).ldelim();
    }
    if (message.message?.$case === 'ping' && message.message?.ping !== undefined) {
      Ping.encode(message.message.ping, writer.uint32(258).fork()).ldelim();
    }
    if (message.message?.$case === 'pong' && message.message?.pong !== undefined) {
      Pong.encode(message.message.pong, writer.uint32(266).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Envelope {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnvelope } as Envelope;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.message = {$case: 'channel', channel: Channel.decode(reader, reader.uint32())};
          break;
        case 3:
          message.message = {$case: 'channel_join', channel_join: ChannelJoin.decode(reader, reader.uint32())};
          break;
        case 4:
          message.message = {$case: 'channel_leave', channel_leave: ChannelLeave.decode(reader, reader.uint32())};
          break;
        case 5:
          message.message = {$case: 'channel_message', channel_message: ChannelMessage.decode(reader, reader.uint32())};
          break;
        case 6:
          message.message = {$case: 'channel_message_ack', channel_message_ack: ChannelMessageAck.decode(reader, reader.uint32())};
          break;
        case 7:
          message.message = {$case: 'channel_message_send', channel_message_send: ChannelMessageSend.decode(reader, reader.uint32())};
          break;
        case 8:
          message.message = {$case: 'channel_message_update', channel_message_update: ChannelMessageUpdate.decode(reader, reader.uint32())};
          break;
        case 9:
          message.message = {$case: 'channel_message_remove', channel_message_remove: ChannelMessageRemove.decode(reader, reader.uint32())};
          break;
        case 10:
          message.message = {$case: 'channel_presence_event', channel_presence_event: ChannelPresenceEvent.decode(reader, reader.uint32())};
          break;
        case 11:
          message.message = {$case: 'error', error: Error.decode(reader, reader.uint32())};
          break;
        case 12:
          message.message = {$case: 'match', match: Match.decode(reader, reader.uint32())};
          break;
        case 13:
          message.message = {$case: 'match_create', match_create: MatchCreate.decode(reader, reader.uint32())};
          break;
        case 14:
          message.message = {$case: 'match_data', match_data: MatchData.decode(reader, reader.uint32())};
          break;
        case 15:
          message.message = {$case: 'match_data_send', match_data_send: MatchDataSend.decode(reader, reader.uint32())};
          break;
        case 16:
          message.message = {$case: 'match_join', match_join: MatchJoin.decode(reader, reader.uint32())};
          break;
        case 17:
          message.message = {$case: 'match_leave', match_leave: MatchLeave.decode(reader, reader.uint32())};
          break;
        case 18:
          message.message = {$case: 'match_presence_event', match_presence_event: MatchPresenceEvent.decode(reader, reader.uint32())};
          break;
        case 19:
          message.message = {$case: 'matchmaker_add', matchmaker_add: MatchmakerAdd.decode(reader, reader.uint32())};
          break;
        case 20:
          message.message = {$case: 'matchmaker_matched', matchmaker_matched: MatchmakerMatched.decode(reader, reader.uint32())};
          break;
        case 21:
          message.message = {$case: 'matchmaker_remove', matchmaker_remove: MatchmakerRemove.decode(reader, reader.uint32())};
          break;
        case 22:
          message.message = {$case: 'matchmaker_ticket', matchmaker_ticket: MatchmakerTicket.decode(reader, reader.uint32())};
          break;
        case 23:
          message.message = {$case: 'notifications', notifications: Notifications.decode(reader, reader.uint32())};
          break;
        case 24:
          message.message = {$case: 'rpc', rpc: Rpc.decode(reader, reader.uint32())};
          break;
        case 25:
          message.message = {$case: 'status', status: Status.decode(reader, reader.uint32())};
          break;
        case 26:
          message.message = {$case: 'status_follow', status_follow: StatusFollow.decode(reader, reader.uint32())};
          break;
        case 27:
          message.message = {$case: 'status_presence_event', status_presence_event: StatusPresenceEvent.decode(reader, reader.uint32())};
          break;
        case 28:
          message.message = {$case: 'status_unfollow', status_unfollow: StatusUnfollow.decode(reader, reader.uint32())};
          break;
        case 29:
          message.message = {$case: 'status_update', status_update: StatusUpdate.decode(reader, reader.uint32())};
          break;
        case 30:
          message.message = {$case: 'stream_data', stream_data: StreamData.decode(reader, reader.uint32())};
          break;
        case 31:
          message.message = {$case: 'stream_presence_event', stream_presence_event: StreamPresenceEvent.decode(reader, reader.uint32())};
          break;
        case 32:
          message.message = {$case: 'ping', ping: Ping.decode(reader, reader.uint32())};
          break;
        case 33:
          message.message = {$case: 'pong', pong: Pong.decode(reader, reader.uint32())};
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
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.message = {$case: 'channel', channel: Channel.fromJSON(object.channel)};
    }
    if (object.channel_join !== undefined && object.channel_join !== null) {
      message.message = {$case: 'channel_join', channel_join: ChannelJoin.fromJSON(object.channel_join)};
    }
    if (object.channel_leave !== undefined && object.channel_leave !== null) {
      message.message = {$case: 'channel_leave', channel_leave: ChannelLeave.fromJSON(object.channel_leave)};
    }
    if (object.channel_message !== undefined && object.channel_message !== null) {
      message.message = {$case: 'channel_message', channel_message: ChannelMessage.fromJSON(object.channel_message)};
    }
    if (object.channel_message_ack !== undefined && object.channel_message_ack !== null) {
      message.message = {$case: 'channel_message_ack', channel_message_ack: ChannelMessageAck.fromJSON(object.channel_message_ack)};
    }
    if (object.channel_message_send !== undefined && object.channel_message_send !== null) {
      message.message = {$case: 'channel_message_send', channel_message_send: ChannelMessageSend.fromJSON(object.channel_message_send)};
    }
    if (object.channel_message_update !== undefined && object.channel_message_update !== null) {
      message.message = {$case: 'channel_message_update', channel_message_update: ChannelMessageUpdate.fromJSON(object.channel_message_update)};
    }
    if (object.channel_message_remove !== undefined && object.channel_message_remove !== null) {
      message.message = {$case: 'channel_message_remove', channel_message_remove: ChannelMessageRemove.fromJSON(object.channel_message_remove)};
    }
    if (object.channel_presence_event !== undefined && object.channel_presence_event !== null) {
      message.message = {$case: 'channel_presence_event', channel_presence_event: ChannelPresenceEvent.fromJSON(object.channel_presence_event)};
    }
    if (object.error !== undefined && object.error !== null) {
      message.message = {$case: 'error', error: Error.fromJSON(object.error)};
    }
    if (object.match !== undefined && object.match !== null) {
      message.message = {$case: 'match', match: Match.fromJSON(object.match)};
    }
    if (object.match_create !== undefined && object.match_create !== null) {
      message.message = {$case: 'match_create', match_create: MatchCreate.fromJSON(object.match_create)};
    }
    if (object.match_data !== undefined && object.match_data !== null) {
      message.message = {$case: 'match_data', match_data: MatchData.fromJSON(object.match_data)};
    }
    if (object.match_data_send !== undefined && object.match_data_send !== null) {
      message.message = {$case: 'match_data_send', match_data_send: MatchDataSend.fromJSON(object.match_data_send)};
    }
    if (object.match_join !== undefined && object.match_join !== null) {
      message.message = {$case: 'match_join', match_join: MatchJoin.fromJSON(object.match_join)};
    }
    if (object.match_leave !== undefined && object.match_leave !== null) {
      message.message = {$case: 'match_leave', match_leave: MatchLeave.fromJSON(object.match_leave)};
    }
    if (object.match_presence_event !== undefined && object.match_presence_event !== null) {
      message.message = {$case: 'match_presence_event', match_presence_event: MatchPresenceEvent.fromJSON(object.match_presence_event)};
    }
    if (object.matchmaker_add !== undefined && object.matchmaker_add !== null) {
      message.message = {$case: 'matchmaker_add', matchmaker_add: MatchmakerAdd.fromJSON(object.matchmaker_add)};
    }
    if (object.matchmaker_matched !== undefined && object.matchmaker_matched !== null) {
      message.message = {$case: 'matchmaker_matched', matchmaker_matched: MatchmakerMatched.fromJSON(object.matchmaker_matched)};
    }
    if (object.matchmaker_remove !== undefined && object.matchmaker_remove !== null) {
      message.message = {$case: 'matchmaker_remove', matchmaker_remove: MatchmakerRemove.fromJSON(object.matchmaker_remove)};
    }
    if (object.matchmaker_ticket !== undefined && object.matchmaker_ticket !== null) {
      message.message = {$case: 'matchmaker_ticket', matchmaker_ticket: MatchmakerTicket.fromJSON(object.matchmaker_ticket)};
    }
    if (object.notifications !== undefined && object.notifications !== null) {
      message.message = {$case: 'notifications', notifications: Notifications.fromJSON(object.notifications)};
    }
    if (object.rpc !== undefined && object.rpc !== null) {
      message.message = {$case: 'rpc', rpc: Rpc.fromJSON(object.rpc)};
    }
    if (object.status !== undefined && object.status !== null) {
      message.message = {$case: 'status', status: Status.fromJSON(object.status)};
    }
    if (object.status_follow !== undefined && object.status_follow !== null) {
      message.message = {$case: 'status_follow', status_follow: StatusFollow.fromJSON(object.status_follow)};
    }
    if (object.status_presence_event !== undefined && object.status_presence_event !== null) {
      message.message = {$case: 'status_presence_event', status_presence_event: StatusPresenceEvent.fromJSON(object.status_presence_event)};
    }
    if (object.status_unfollow !== undefined && object.status_unfollow !== null) {
      message.message = {$case: 'status_unfollow', status_unfollow: StatusUnfollow.fromJSON(object.status_unfollow)};
    }
    if (object.status_update !== undefined && object.status_update !== null) {
      message.message = {$case: 'status_update', status_update: StatusUpdate.fromJSON(object.status_update)};
    }
    if (object.stream_data !== undefined && object.stream_data !== null) {
      message.message = {$case: 'stream_data', stream_data: StreamData.fromJSON(object.stream_data)};
    }
    if (object.stream_presence_event !== undefined && object.stream_presence_event !== null) {
      message.message = {$case: 'stream_presence_event', stream_presence_event: StreamPresenceEvent.fromJSON(object.stream_presence_event)};
    }
    if (object.ping !== undefined && object.ping !== null) {
      message.message = {$case: 'ping', ping: Ping.fromJSON(object.ping)};
    }
    if (object.pong !== undefined && object.pong !== null) {
      message.message = {$case: 'pong', pong: Pong.fromJSON(object.pong)};
    }
    return message;
  },
  fromPartial(object: DeepPartial<Envelope>): Envelope {
    const message = { ...baseEnvelope } as Envelope;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    }
    if (object.message?.$case === 'channel' && object.message?.channel !== undefined && object.message?.channel !== null) {
      message.message = {$case: 'channel', channel: Channel.fromPartial(object.message.channel)};
    }
    if (object.message?.$case === 'channel_join' && object.message?.channel_join !== undefined && object.message?.channel_join !== null) {
      message.message = {$case: 'channel_join', channel_join: ChannelJoin.fromPartial(object.message.channel_join)};
    }
    if (object.message?.$case === 'channel_leave' && object.message?.channel_leave !== undefined && object.message?.channel_leave !== null) {
      message.message = {$case: 'channel_leave', channel_leave: ChannelLeave.fromPartial(object.message.channel_leave)};
    }
    if (object.message?.$case === 'channel_message' && object.message?.channel_message !== undefined && object.message?.channel_message !== null) {
      message.message = {$case: 'channel_message', channel_message: ChannelMessage.fromPartial(object.message.channel_message)};
    }
    if (object.message?.$case === 'channel_message_ack' && object.message?.channel_message_ack !== undefined && object.message?.channel_message_ack !== null) {
      message.message = {$case: 'channel_message_ack', channel_message_ack: ChannelMessageAck.fromPartial(object.message.channel_message_ack)};
    }
    if (object.message?.$case === 'channel_message_send' && object.message?.channel_message_send !== undefined && object.message?.channel_message_send !== null) {
      message.message = {$case: 'channel_message_send', channel_message_send: ChannelMessageSend.fromPartial(object.message.channel_message_send)};
    }
    if (object.message?.$case === 'channel_message_update' && object.message?.channel_message_update !== undefined && object.message?.channel_message_update !== null) {
      message.message = {$case: 'channel_message_update', channel_message_update: ChannelMessageUpdate.fromPartial(object.message.channel_message_update)};
    }
    if (object.message?.$case === 'channel_message_remove' && object.message?.channel_message_remove !== undefined && object.message?.channel_message_remove !== null) {
      message.message = {$case: 'channel_message_remove', channel_message_remove: ChannelMessageRemove.fromPartial(object.message.channel_message_remove)};
    }
    if (object.message?.$case === 'channel_presence_event' && object.message?.channel_presence_event !== undefined && object.message?.channel_presence_event !== null) {
      message.message = {$case: 'channel_presence_event', channel_presence_event: ChannelPresenceEvent.fromPartial(object.message.channel_presence_event)};
    }
    if (object.message?.$case === 'error' && object.message?.error !== undefined && object.message?.error !== null) {
      message.message = {$case: 'error', error: Error.fromPartial(object.message.error)};
    }
    if (object.message?.$case === 'match' && object.message?.match !== undefined && object.message?.match !== null) {
      message.message = {$case: 'match', match: Match.fromPartial(object.message.match)};
    }
    if (object.message?.$case === 'match_create' && object.message?.match_create !== undefined && object.message?.match_create !== null) {
      message.message = {$case: 'match_create', match_create: MatchCreate.fromPartial(object.message.match_create)};
    }
    if (object.message?.$case === 'match_data' && object.message?.match_data !== undefined && object.message?.match_data !== null) {
      message.message = {$case: 'match_data', match_data: MatchData.fromPartial(object.message.match_data)};
    }
    if (object.message?.$case === 'match_data_send' && object.message?.match_data_send !== undefined && object.message?.match_data_send !== null) {
      message.message = {$case: 'match_data_send', match_data_send: MatchDataSend.fromPartial(object.message.match_data_send)};
    }
    if (object.message?.$case === 'match_join' && object.message?.match_join !== undefined && object.message?.match_join !== null) {
      message.message = {$case: 'match_join', match_join: MatchJoin.fromPartial(object.message.match_join)};
    }
    if (object.message?.$case === 'match_leave' && object.message?.match_leave !== undefined && object.message?.match_leave !== null) {
      message.message = {$case: 'match_leave', match_leave: MatchLeave.fromPartial(object.message.match_leave)};
    }
    if (object.message?.$case === 'match_presence_event' && object.message?.match_presence_event !== undefined && object.message?.match_presence_event !== null) {
      message.message = {$case: 'match_presence_event', match_presence_event: MatchPresenceEvent.fromPartial(object.message.match_presence_event)};
    }
    if (object.message?.$case === 'matchmaker_add' && object.message?.matchmaker_add !== undefined && object.message?.matchmaker_add !== null) {
      message.message = {$case: 'matchmaker_add', matchmaker_add: MatchmakerAdd.fromPartial(object.message.matchmaker_add)};
    }
    if (object.message?.$case === 'matchmaker_matched' && object.message?.matchmaker_matched !== undefined && object.message?.matchmaker_matched !== null) {
      message.message = {$case: 'matchmaker_matched', matchmaker_matched: MatchmakerMatched.fromPartial(object.message.matchmaker_matched)};
    }
    if (object.message?.$case === 'matchmaker_remove' && object.message?.matchmaker_remove !== undefined && object.message?.matchmaker_remove !== null) {
      message.message = {$case: 'matchmaker_remove', matchmaker_remove: MatchmakerRemove.fromPartial(object.message.matchmaker_remove)};
    }
    if (object.message?.$case === 'matchmaker_ticket' && object.message?.matchmaker_ticket !== undefined && object.message?.matchmaker_ticket !== null) {
      message.message = {$case: 'matchmaker_ticket', matchmaker_ticket: MatchmakerTicket.fromPartial(object.message.matchmaker_ticket)};
    }
    if (object.message?.$case === 'notifications' && object.message?.notifications !== undefined && object.message?.notifications !== null) {
      message.message = {$case: 'notifications', notifications: Notifications.fromPartial(object.message.notifications)};
    }
    if (object.message?.$case === 'rpc' && object.message?.rpc !== undefined && object.message?.rpc !== null) {
      message.message = {$case: 'rpc', rpc: Rpc.fromPartial(object.message.rpc)};
    }
    if (object.message?.$case === 'status' && object.message?.status !== undefined && object.message?.status !== null) {
      message.message = {$case: 'status', status: Status.fromPartial(object.message.status)};
    }
    if (object.message?.$case === 'status_follow' && object.message?.status_follow !== undefined && object.message?.status_follow !== null) {
      message.message = {$case: 'status_follow', status_follow: StatusFollow.fromPartial(object.message.status_follow)};
    }
    if (object.message?.$case === 'status_presence_event' && object.message?.status_presence_event !== undefined && object.message?.status_presence_event !== null) {
      message.message = {$case: 'status_presence_event', status_presence_event: StatusPresenceEvent.fromPartial(object.message.status_presence_event)};
    }
    if (object.message?.$case === 'status_unfollow' && object.message?.status_unfollow !== undefined && object.message?.status_unfollow !== null) {
      message.message = {$case: 'status_unfollow', status_unfollow: StatusUnfollow.fromPartial(object.message.status_unfollow)};
    }
    if (object.message?.$case === 'status_update' && object.message?.status_update !== undefined && object.message?.status_update !== null) {
      message.message = {$case: 'status_update', status_update: StatusUpdate.fromPartial(object.message.status_update)};
    }
    if (object.message?.$case === 'stream_data' && object.message?.stream_data !== undefined && object.message?.stream_data !== null) {
      message.message = {$case: 'stream_data', stream_data: StreamData.fromPartial(object.message.stream_data)};
    }
    if (object.message?.$case === 'stream_presence_event' && object.message?.stream_presence_event !== undefined && object.message?.stream_presence_event !== null) {
      message.message = {$case: 'stream_presence_event', stream_presence_event: StreamPresenceEvent.fromPartial(object.message.stream_presence_event)};
    }
    if (object.message?.$case === 'ping' && object.message?.ping !== undefined && object.message?.ping !== null) {
      message.message = {$case: 'ping', ping: Ping.fromPartial(object.message.ping)};
    }
    if (object.message?.$case === 'pong' && object.message?.pong !== undefined && object.message?.pong !== null) {
      message.message = {$case: 'pong', pong: Pong.fromPartial(object.message.pong)};
    }
    return message;
  },
  toJSON(message: Envelope): unknown {
    const obj: any = {};
    obj.cid = message.cid || "";
    obj.channel = message.message?.$case === 'channel' && message.message?.channel ? Channel.toJSON(message.message?.channel) : undefined;
    obj.channel_join = message.message?.$case === 'channel_join' && message.message?.channel_join ? ChannelJoin.toJSON(message.message?.channel_join) : undefined;
    obj.channel_leave = message.message?.$case === 'channel_leave' && message.message?.channel_leave ? ChannelLeave.toJSON(message.message?.channel_leave) : undefined;
    obj.channel_message = message.message?.$case === 'channel_message' && message.message?.channel_message ? ChannelMessage.toJSON(message.message?.channel_message) : undefined;
    obj.channel_message_ack = message.message?.$case === 'channel_message_ack' && message.message?.channel_message_ack ? ChannelMessageAck.toJSON(message.message?.channel_message_ack) : undefined;
    obj.channel_message_send = message.message?.$case === 'channel_message_send' && message.message?.channel_message_send ? ChannelMessageSend.toJSON(message.message?.channel_message_send) : undefined;
    obj.channel_message_update = message.message?.$case === 'channel_message_update' && message.message?.channel_message_update ? ChannelMessageUpdate.toJSON(message.message?.channel_message_update) : undefined;
    obj.channel_message_remove = message.message?.$case === 'channel_message_remove' && message.message?.channel_message_remove ? ChannelMessageRemove.toJSON(message.message?.channel_message_remove) : undefined;
    obj.channel_presence_event = message.message?.$case === 'channel_presence_event' && message.message?.channel_presence_event ? ChannelPresenceEvent.toJSON(message.message?.channel_presence_event) : undefined;
    obj.error = message.message?.$case === 'error' && message.message?.error ? Error.toJSON(message.message?.error) : undefined;
    obj.match = message.message?.$case === 'match' && message.message?.match ? Match.toJSON(message.message?.match) : undefined;
    obj.match_create = message.message?.$case === 'match_create' && message.message?.match_create ? MatchCreate.toJSON(message.message?.match_create) : undefined;
    obj.match_data = message.message?.$case === 'match_data' && message.message?.match_data ? MatchData.toJSON(message.message?.match_data) : undefined;
    obj.match_data_send = message.message?.$case === 'match_data_send' && message.message?.match_data_send ? MatchDataSend.toJSON(message.message?.match_data_send) : undefined;
    obj.match_join = message.message?.$case === 'match_join' && message.message?.match_join ? MatchJoin.toJSON(message.message?.match_join) : undefined;
    obj.match_leave = message.message?.$case === 'match_leave' && message.message?.match_leave ? MatchLeave.toJSON(message.message?.match_leave) : undefined;
    obj.match_presence_event = message.message?.$case === 'match_presence_event' && message.message?.match_presence_event ? MatchPresenceEvent.toJSON(message.message?.match_presence_event) : undefined;
    obj.matchmaker_add = message.message?.$case === 'matchmaker_add' && message.message?.matchmaker_add ? MatchmakerAdd.toJSON(message.message?.matchmaker_add) : undefined;
    obj.matchmaker_matched = message.message?.$case === 'matchmaker_matched' && message.message?.matchmaker_matched ? MatchmakerMatched.toJSON(message.message?.matchmaker_matched) : undefined;
    obj.matchmaker_remove = message.message?.$case === 'matchmaker_remove' && message.message?.matchmaker_remove ? MatchmakerRemove.toJSON(message.message?.matchmaker_remove) : undefined;
    obj.matchmaker_ticket = message.message?.$case === 'matchmaker_ticket' && message.message?.matchmaker_ticket ? MatchmakerTicket.toJSON(message.message?.matchmaker_ticket) : undefined;
    obj.notifications = message.message?.$case === 'notifications' && message.message?.notifications ? Notifications.toJSON(message.message?.notifications) : undefined;
    obj.rpc = message.message?.$case === 'rpc' && message.message?.rpc ? Rpc.toJSON(message.message?.rpc) : undefined;
    obj.status = message.message?.$case === 'status' && message.message?.status ? Status.toJSON(message.message?.status) : undefined;
    obj.status_follow = message.message?.$case === 'status_follow' && message.message?.status_follow ? StatusFollow.toJSON(message.message?.status_follow) : undefined;
    obj.status_presence_event = message.message?.$case === 'status_presence_event' && message.message?.status_presence_event ? StatusPresenceEvent.toJSON(message.message?.status_presence_event) : undefined;
    obj.status_unfollow = message.message?.$case === 'status_unfollow' && message.message?.status_unfollow ? StatusUnfollow.toJSON(message.message?.status_unfollow) : undefined;
    obj.status_update = message.message?.$case === 'status_update' && message.message?.status_update ? StatusUpdate.toJSON(message.message?.status_update) : undefined;
    obj.stream_data = message.message?.$case === 'stream_data' && message.message?.stream_data ? StreamData.toJSON(message.message?.stream_data) : undefined;
    obj.stream_presence_event = message.message?.$case === 'stream_presence_event' && message.message?.stream_presence_event ? StreamPresenceEvent.toJSON(message.message?.stream_presence_event) : undefined;
    obj.ping = message.message?.$case === 'ping' && message.message?.ping ? Ping.toJSON(message.message?.ping) : undefined;
    obj.pong = message.message?.$case === 'pong' && message.message?.pong ? Pong.toJSON(message.message?.pong) : undefined;
    return obj;
  },
};

export const Channel = {
  encode(message: Channel, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.self !== undefined && message.self !== undefined) {
      UserPresence.encode(message.self, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.room_name);
    writer.uint32(42).string(message.group_id);
    writer.uint32(50).string(message.user_id_one);
    writer.uint32(58).string(message.user_id_two);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Channel {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = String(object.room_name);
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Channel>): Channel {
    const message = { ...baseChannel } as Channel;
    message.presences = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = object.room_name;
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    }
    return message;
  },
  toJSON(message: Channel): unknown {
    const obj: any = {};
    obj.id = message.id || "";
    if (message.presences) {
      obj.presences = message.presences.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    obj.self = message.self ? UserPresence.toJSON(message.self) : undefined;
    obj.room_name = message.room_name || "";
    obj.group_id = message.group_id || "";
    obj.user_id_one = message.user_id_one || "";
    obj.user_id_two = message.user_id_two || "";
    return obj;
  },
};

export const ChannelJoin = {
  encode(message: ChannelJoin, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.target);
    writer.uint32(16).int32(message.type);
    if (message.persistence !== undefined && message.persistence !== undefined) {
      BoolValue.encode({ value: message.persistence! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.hidden !== undefined && message.hidden !== undefined) {
      BoolValue.encode({ value: message.hidden! }, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ChannelJoin {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = Number(object.type);
    }
    if (object.persistence !== undefined && object.persistence !== null) {
      message.persistence = Boolean(object.persistence);
    }
    if (object.hidden !== undefined && object.hidden !== null) {
      message.hidden = Boolean(object.hidden);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ChannelJoin>): ChannelJoin {
    const message = { ...baseChannelJoin } as ChannelJoin;
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.persistence !== undefined && object.persistence !== null) {
      message.persistence = object.persistence;
    }
    if (object.hidden !== undefined && object.hidden !== null) {
      message.hidden = object.hidden;
    }
    return message;
  },
  toJSON(message: ChannelJoin): unknown {
    const obj: any = {};
    obj.target = message.target || "";
    obj.type = message.type || 0;
    obj.persistence = message.persistence || undefined;
    obj.hidden = message.hidden || undefined;
    return obj;
  },
};

export const ChannelLeave = {
  encode(message: ChannelLeave, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.channel_id);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ChannelLeave {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    return message;
  },
  fromPartial(object: DeepPartial<ChannelLeave>): ChannelLeave {
    const message = { ...baseChannelLeave } as ChannelLeave;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    return message;
  },
  toJSON(message: ChannelLeave): unknown {
    const obj: any = {};
    obj.channel_id = message.channel_id || "";
    return obj;
  },
};

export const ChannelMessageAck = {
  encode(message: ChannelMessageAck, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.message_id);
    if (message.code !== undefined && message.code !== undefined) {
      Int32Value.encode({ value: message.code! }, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.username);
    if (message.create_time !== undefined && message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(42).fork()).ldelim();
    }
    if (message.update_time !== undefined && message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.persistent !== undefined && message.persistent !== undefined) {
      BoolValue.encode({ value: message.persistent! }, writer.uint32(58).fork()).ldelim();
    }
    writer.uint32(66).string(message.room_name);
    writer.uint32(74).string(message.group_id);
    writer.uint32(82).string(message.user_id_one);
    writer.uint32(90).string(message.user_id_two);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ChannelMessageAck {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = String(object.message_id);
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = Number(object.code);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    }
    if (object.persistent !== undefined && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = String(object.room_name);
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ChannelMessageAck>): ChannelMessageAck {
    const message = { ...baseChannelMessageAck } as ChannelMessageAck;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = object.message_id;
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    if (object.persistent !== undefined && object.persistent !== null) {
      message.persistent = object.persistent;
    }
    if (object.room_name !== undefined && object.room_name !== null) {
      message.room_name = object.room_name;
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    }
    return message;
  },
  toJSON(message: ChannelMessageAck): unknown {
    const obj: any = {};
    obj.channel_id = message.channel_id || "";
    obj.message_id = message.message_id || "";
    obj.code = message.code || undefined;
    obj.username = message.username || "";
    obj.create_time = message.create_time !== undefined ? message.create_time.toISOString() : null;
    obj.update_time = message.update_time !== undefined ? message.update_time.toISOString() : null;
    obj.persistent = message.persistent || undefined;
    obj.room_name = message.room_name || "";
    obj.group_id = message.group_id || "";
    obj.user_id_one = message.user_id_one || "";
    obj.user_id_two = message.user_id_two || "";
    return obj;
  },
};

export const ChannelMessageSend = {
  encode(message: ChannelMessageSend, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.content);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ChannelMessageSend {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ChannelMessageSend>): ChannelMessageSend {
    const message = { ...baseChannelMessageSend } as ChannelMessageSend;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    }
    return message;
  },
  toJSON(message: ChannelMessageSend): unknown {
    const obj: any = {};
    obj.channel_id = message.channel_id || "";
    obj.content = message.content || "";
    return obj;
  },
};

export const ChannelMessageUpdate = {
  encode(message: ChannelMessageUpdate, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.message_id);
    writer.uint32(26).string(message.content);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ChannelMessageUpdate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = String(object.message_id);
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ChannelMessageUpdate>): ChannelMessageUpdate {
    const message = { ...baseChannelMessageUpdate } as ChannelMessageUpdate;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = object.message_id;
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    }
    return message;
  },
  toJSON(message: ChannelMessageUpdate): unknown {
    const obj: any = {};
    obj.channel_id = message.channel_id || "";
    obj.message_id = message.message_id || "";
    obj.content = message.content || "";
    return obj;
  },
};

export const ChannelMessageRemove = {
  encode(message: ChannelMessageRemove, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.message_id);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ChannelMessageRemove {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = String(object.message_id);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ChannelMessageRemove>): ChannelMessageRemove {
    const message = { ...baseChannelMessageRemove } as ChannelMessageRemove;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = object.message_id;
    }
    return message;
  },
  toJSON(message: ChannelMessageRemove): unknown {
    const obj: any = {};
    obj.channel_id = message.channel_id || "";
    obj.message_id = message.message_id || "";
    return obj;
  },
};

export const ChannelPresenceEvent = {
  encode(message: ChannelPresenceEvent, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.channel_id);
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.room_name);
    writer.uint32(42).string(message.group_id);
    writer.uint32(50).string(message.user_id_one);
    writer.uint32(58).string(message.user_id_two);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ChannelPresenceEvent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ChannelPresenceEvent>): ChannelPresenceEvent {
    const message = { ...baseChannelPresenceEvent } as ChannelPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
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
    }
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_id_one !== undefined && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    }
    if (object.user_id_two !== undefined && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    }
    return message;
  },
  toJSON(message: ChannelPresenceEvent): unknown {
    const obj: any = {};
    obj.channel_id = message.channel_id || "";
    if (message.joins) {
      obj.joins = message.joins.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.leaves = [];
    }
    obj.room_name = message.room_name || "";
    obj.group_id = message.group_id || "";
    obj.user_id_one = message.user_id_one || "";
    obj.user_id_two = message.user_id_two || "";
    return obj;
  },
};

export const Error = {
  encode(message: Error, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.code);
    writer.uint32(18).string(message.message);
    Object.entries(message.context).forEach(([key, value]) => {
      Error_ContextEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Error {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    }
    if (object.context !== undefined && object.context !== null) {
      Object.entries(object.context).forEach(([key, value]) => {
        message.context[key] = String(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<Error>): Error {
    const message = { ...baseError } as Error;
    message.context = {};
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    }
    if (object.context !== undefined && object.context !== null) {
      Object.entries(object.context).forEach(([key, value]) => {
        if (value !== undefined) {
          message.context[key] = String(value);
        }
      })
    }
    return message;
  },
  toJSON(message: Error): unknown {
    const obj: any = {};
    obj.code = message.code || 0;
    obj.message = message.message || "";
    obj.context = message.context || undefined;
    return obj;
  },
};

export const Error_ContextEntry = {
  encode(message: Error_ContextEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Error_ContextEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Error_ContextEntry>): Error_ContextEntry {
    const message = { ...baseError_ContextEntry } as Error_ContextEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: Error_ContextEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value || "";
    return obj;
  },
};

export const Match = {
  encode(message: Match, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.match_id);
    writer.uint32(16).bool(message.authoritative);
    if (message.label !== undefined && message.label !== undefined) {
      StringValue.encode({ value: message.label! }, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(32).int32(message.size);
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.self !== undefined && message.self !== undefined) {
      UserPresence.encode(message.self, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Match {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.authoritative !== undefined && object.authoritative !== null) {
      message.authoritative = Boolean(object.authoritative);
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Match>): Match {
    const message = { ...baseMatch } as Match;
    message.presences = [];
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    if (object.authoritative !== undefined && object.authoritative !== null) {
      message.authoritative = object.authoritative;
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    }
    return message;
  },
  toJSON(message: Match): unknown {
    const obj: any = {};
    obj.match_id = message.match_id || "";
    obj.authoritative = message.authoritative || false;
    obj.label = message.label || undefined;
    obj.size = message.size || 0;
    if (message.presences) {
      obj.presences = message.presences.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    obj.self = message.self ? UserPresence.toJSON(message.self) : undefined;
    return obj;
  },
};

export const MatchCreate = {
  encode(_: MatchCreate, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchCreate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  fromPartial(_: DeepPartial<MatchCreate>): MatchCreate {
    const message = { ...baseMatchCreate } as MatchCreate;
    return message;
  },
  toJSON(_: MatchCreate): unknown {
    const obj: any = {};
    return obj;
  },
};

export const MatchData = {
  encode(message: MatchData, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.match_id);
    if (message.presence !== undefined && message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int64(message.op_code);
    writer.uint32(34).bytes(message.data);
    writer.uint32(40).bool(message.reliable);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchData {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchData } as MatchData;
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
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchData>): MatchData {
    const message = { ...baseMatchData } as MatchData;
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = object.op_code;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = object.reliable;
    }
    return message;
  },
  toJSON(message: MatchData): unknown {
    const obj: any = {};
    obj.match_id = message.match_id || "";
    obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined;
    obj.op_code = message.op_code || 0;
    obj.data = message.data !== undefined ? base64FromBytes(message.data) : undefined;
    obj.reliable = message.reliable || false;
    return obj;
  },
};

export const MatchDataSend = {
  encode(message: MatchDataSend, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.match_id);
    writer.uint32(16).int64(message.op_code);
    writer.uint32(26).bytes(message.data);
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(40).bool(message.reliable);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchDataSend {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchDataSend } as MatchDataSend;
    message.presences = [];
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
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = String(object.match_id);
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = Number(object.op_code);
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
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchDataSend>): MatchDataSend {
    const message = { ...baseMatchDataSend } as MatchDataSend;
    message.presences = [];
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    if (object.op_code !== undefined && object.op_code !== null) {
      message.op_code = object.op_code;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    }
    if (object.presences !== undefined && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = object.reliable;
    }
    return message;
  },
  toJSON(message: MatchDataSend): unknown {
    const obj: any = {};
    obj.match_id = message.match_id || "";
    obj.op_code = message.op_code || 0;
    obj.data = message.data !== undefined ? base64FromBytes(message.data) : undefined;
    if (message.presences) {
      obj.presences = message.presences.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    obj.reliable = message.reliable || false;
    return obj;
  },
};

export const MatchJoin = {
  encode(message: MatchJoin, writer: Writer = Writer.create()): Writer {
    if (message.id?.$case === 'match_id' && message.id?.match_id !== "") {
      writer.uint32(10).string(message.id.match_id);
    }
    if (message.id?.$case === 'token' && message.id?.token !== "") {
      writer.uint32(18).string(message.id.token);
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      MatchJoin_MetadataEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchJoin {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchJoin } as MatchJoin;
    message.metadata = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = {$case: 'match_id', match_id: reader.string()};
          break;
        case 2:
          message.id = {$case: 'token', token: reader.string()};
          break;
        case 3:
          const entry3 = MatchJoin_MetadataEntry.decode(reader, reader.uint32());
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
      message.id = {$case: 'match_id', match_id: String(object.match_id)};
    }
    if (object.token !== undefined && object.token !== null) {
      message.id = {$case: 'token', token: String(object.token)};
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      Object.entries(object.metadata).forEach(([key, value]) => {
        message.metadata[key] = String(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchJoin>): MatchJoin {
    const message = { ...baseMatchJoin } as MatchJoin;
    message.metadata = {};
    if (object.id?.$case === 'match_id' && object.id?.match_id !== undefined && object.id?.match_id !== null) {
      message.id = {$case: 'match_id', match_id: object.id.match_id};
    }
    if (object.id?.$case === 'token' && object.id?.token !== undefined && object.id?.token !== null) {
      message.id = {$case: 'token', token: object.id.token};
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      Object.entries(object.metadata).forEach(([key, value]) => {
        if (value !== undefined) {
          message.metadata[key] = String(value);
        }
      })
    }
    return message;
  },
  toJSON(message: MatchJoin): unknown {
    const obj: any = {};
    obj.match_id = message.id?.$case === 'match_id' && message.id?.match_id || undefined;
    obj.token = message.id?.$case === 'token' && message.id?.token || undefined;
    obj.metadata = message.metadata || undefined;
    return obj;
  },
};

export const MatchJoin_MetadataEntry = {
  encode(message: MatchJoin_MetadataEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchJoin_MetadataEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchJoin_MetadataEntry } as MatchJoin_MetadataEntry;
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
    const message = { ...baseMatchJoin_MetadataEntry } as MatchJoin_MetadataEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchJoin_MetadataEntry>): MatchJoin_MetadataEntry {
    const message = { ...baseMatchJoin_MetadataEntry } as MatchJoin_MetadataEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: MatchJoin_MetadataEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value || "";
    return obj;
  },
};

export const MatchLeave = {
  encode(message: MatchLeave, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.match_id);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchLeave {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchLeave>): MatchLeave {
    const message = { ...baseMatchLeave } as MatchLeave;
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    return message;
  },
  toJSON(message: MatchLeave): unknown {
    const obj: any = {};
    obj.match_id = message.match_id || "";
    return obj;
  },
};

export const MatchPresenceEvent = {
  encode(message: MatchPresenceEvent, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.match_id);
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchPresenceEvent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  fromPartial(object: DeepPartial<MatchPresenceEvent>): MatchPresenceEvent {
    const message = { ...baseMatchPresenceEvent } as MatchPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.match_id !== undefined && object.match_id !== null) {
      message.match_id = object.match_id;
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
  toJSON(message: MatchPresenceEvent): unknown {
    const obj: any = {};
    obj.match_id = message.match_id || "";
    if (message.joins) {
      obj.joins = message.joins.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.leaves = [];
    }
    return obj;
  },
};

export const MatchmakerAdd = {
  encode(message: MatchmakerAdd, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.min_count);
    writer.uint32(16).int32(message.max_count);
    writer.uint32(26).string(message.query);
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerAdd_StringPropertiesEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    })
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerAdd_NumericPropertiesEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerAdd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
          const entry4 = MatchmakerAdd_StringPropertiesEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.string_properties[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 = MatchmakerAdd_NumericPropertiesEntry.decode(reader, reader.uint32());
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
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = String(object.query);
    }
    if (object.string_properties !== undefined && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        message.string_properties[key] = String(value);
      })
    }
    if (object.numeric_properties !== undefined && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        message.numeric_properties[key] = Number(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerAdd>): MatchmakerAdd {
    const message = { ...baseMatchmakerAdd } as MatchmakerAdd;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.min_count !== undefined && object.min_count !== null) {
      message.min_count = object.min_count;
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = object.max_count;
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = object.query;
    }
    if (object.string_properties !== undefined && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.string_properties[key] = String(value);
        }
      })
    }
    if (object.numeric_properties !== undefined && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.numeric_properties[key] = Number(value);
        }
      })
    }
    return message;
  },
  toJSON(message: MatchmakerAdd): unknown {
    const obj: any = {};
    obj.min_count = message.min_count || 0;
    obj.max_count = message.max_count || 0;
    obj.query = message.query || "";
    obj.string_properties = message.string_properties || undefined;
    obj.numeric_properties = message.numeric_properties || undefined;
    return obj;
  },
};

export const MatchmakerAdd_StringPropertiesEntry = {
  encode(message: MatchmakerAdd_StringPropertiesEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerAdd_StringPropertiesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerAdd_StringPropertiesEntry } as MatchmakerAdd_StringPropertiesEntry;
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
    const message = { ...baseMatchmakerAdd_StringPropertiesEntry } as MatchmakerAdd_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerAdd_StringPropertiesEntry>): MatchmakerAdd_StringPropertiesEntry {
    const message = { ...baseMatchmakerAdd_StringPropertiesEntry } as MatchmakerAdd_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: MatchmakerAdd_StringPropertiesEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value || "";
    return obj;
  },
};

export const MatchmakerAdd_NumericPropertiesEntry = {
  encode(message: MatchmakerAdd_NumericPropertiesEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(17).double(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerAdd_NumericPropertiesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerAdd_NumericPropertiesEntry } as MatchmakerAdd_NumericPropertiesEntry;
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
    const message = { ...baseMatchmakerAdd_NumericPropertiesEntry } as MatchmakerAdd_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerAdd_NumericPropertiesEntry>): MatchmakerAdd_NumericPropertiesEntry {
    const message = { ...baseMatchmakerAdd_NumericPropertiesEntry } as MatchmakerAdd_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: MatchmakerAdd_NumericPropertiesEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value || 0;
    return obj;
  },
};

export const MatchmakerMatched = {
  encode(message: MatchmakerMatched, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.ticket);
    if (message.id?.$case === 'match_id' && message.id?.match_id !== "") {
      writer.uint32(18).string(message.id.match_id);
    }
    if (message.id?.$case === 'token' && message.id?.token !== "") {
      writer.uint32(26).string(message.id.token);
    }
    for (const v of message.users) {
      MatchmakerMatched_MatchmakerUser.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.self !== undefined && message.self !== undefined) {
      MatchmakerMatched_MatchmakerUser.encode(message.self, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerMatched {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
          message.id = {$case: 'match_id', match_id: reader.string()};
          break;
        case 3:
          message.id = {$case: 'token', token: reader.string()};
          break;
        case 4:
          message.users.push(MatchmakerMatched_MatchmakerUser.decode(reader, reader.uint32()));
          break;
        case 5:
          message.self = MatchmakerMatched_MatchmakerUser.decode(reader, reader.uint32());
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
    }
    if (object.match_id !== undefined && object.match_id !== null) {
      message.id = {$case: 'match_id', match_id: String(object.match_id)};
    }
    if (object.token !== undefined && object.token !== null) {
      message.id = {$case: 'token', token: String(object.token)};
    }
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(MatchmakerMatched_MatchmakerUser.fromJSON(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = MatchmakerMatched_MatchmakerUser.fromJSON(object.self);
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerMatched>): MatchmakerMatched {
    const message = { ...baseMatchmakerMatched } as MatchmakerMatched;
    message.users = [];
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    }
    if (object.id?.$case === 'match_id' && object.id?.match_id !== undefined && object.id?.match_id !== null) {
      message.id = {$case: 'match_id', match_id: object.id.match_id};
    }
    if (object.id?.$case === 'token' && object.id?.token !== undefined && object.id?.token !== null) {
      message.id = {$case: 'token', token: object.id.token};
    }
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(MatchmakerMatched_MatchmakerUser.fromPartial(e));
      }
    }
    if (object.self !== undefined && object.self !== null) {
      message.self = MatchmakerMatched_MatchmakerUser.fromPartial(object.self);
    }
    return message;
  },
  toJSON(message: MatchmakerMatched): unknown {
    const obj: any = {};
    obj.ticket = message.ticket || "";
    obj.match_id = message.id?.$case === 'match_id' && message.id?.match_id || undefined;
    obj.token = message.id?.$case === 'token' && message.id?.token || undefined;
    if (message.users) {
      obj.users = message.users.map(e => e ? MatchmakerMatched_MatchmakerUser.toJSON(e) : undefined);
    } else {
      obj.users = [];
    }
    obj.self = message.self ? MatchmakerMatched_MatchmakerUser.toJSON(message.self) : undefined;
    return obj;
  },
};

export const MatchmakerMatched_MatchmakerUser = {
  encode(message: MatchmakerMatched_MatchmakerUser, writer: Writer = Writer.create()): Writer {
    if (message.presence !== undefined && message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    })
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerMatched_MatchmakerUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerMatched_MatchmakerUser } as MatchmakerMatched_MatchmakerUser;
    message.string_properties = {};
    message.numeric_properties = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 5:
          const entry5 = MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.decode(reader, reader.uint32());
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
    const message = { ...baseMatchmakerMatched_MatchmakerUser } as MatchmakerMatched_MatchmakerUser;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    if (object.string_properties !== undefined && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        message.string_properties[key] = String(value);
      })
    }
    if (object.numeric_properties !== undefined && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        message.numeric_properties[key] = Number(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser>): MatchmakerMatched_MatchmakerUser {
    const message = { ...baseMatchmakerMatched_MatchmakerUser } as MatchmakerMatched_MatchmakerUser;
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.presence !== undefined && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    if (object.string_properties !== undefined && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.string_properties[key] = String(value);
        }
      })
    }
    if (object.numeric_properties !== undefined && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.numeric_properties[key] = Number(value);
        }
      })
    }
    return message;
  },
  toJSON(message: MatchmakerMatched_MatchmakerUser): unknown {
    const obj: any = {};
    obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined;
    obj.string_properties = message.string_properties || undefined;
    obj.numeric_properties = message.numeric_properties || undefined;
    return obj;
  },
};

export const MatchmakerMatched_MatchmakerUser_StringPropertiesEntry = {
  encode(message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry } as MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
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
  fromJSON(object: any): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    const message = { ...baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry } as MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser_StringPropertiesEntry>): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    const message = { ...baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry } as MatchmakerMatched_MatchmakerUser_StringPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value || "";
    return obj;
  },
};

export const MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry = {
  encode(message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(17).double(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry } as MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
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
  fromJSON(object: any): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    const message = { ...baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry } as MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry>): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    const message = { ...baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry } as MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value || 0;
    return obj;
  },
};

export const MatchmakerRemove = {
  encode(message: MatchmakerRemove, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.ticket);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerRemove {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerRemove>): MatchmakerRemove {
    const message = { ...baseMatchmakerRemove } as MatchmakerRemove;
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    }
    return message;
  },
  toJSON(message: MatchmakerRemove): unknown {
    const obj: any = {};
    obj.ticket = message.ticket || "";
    return obj;
  },
};

export const MatchmakerTicket = {
  encode(message: MatchmakerTicket, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.ticket);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MatchmakerTicket {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    return message;
  },
  fromPartial(object: DeepPartial<MatchmakerTicket>): MatchmakerTicket {
    const message = { ...baseMatchmakerTicket } as MatchmakerTicket;
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    }
    return message;
  },
  toJSON(message: MatchmakerTicket): unknown {
    const obj: any = {};
    obj.ticket = message.ticket || "";
    return obj;
  },
};

export const Notifications = {
  encode(message: Notifications, writer: Writer = Writer.create()): Writer {
    for (const v of message.notifications) {
      Notification.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Notifications {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNotifications } as Notifications;
    message.notifications = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notifications.push(Notification.decode(reader, reader.uint32()));
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
  toJSON(message: Notifications): unknown {
    const obj: any = {};
    if (message.notifications) {
      obj.notifications = message.notifications.map(e => e ? Notification.toJSON(e) : undefined);
    } else {
      obj.notifications = [];
    }
    return obj;
  },
};

export const Ping = {
  encode(_: Ping, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Ping {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  fromPartial(_: DeepPartial<Ping>): Ping {
    const message = { ...basePing } as Ping;
    return message;
  },
  toJSON(_: Ping): unknown {
    const obj: any = {};
    return obj;
  },
};

export const Pong = {
  encode(_: Pong, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Pong {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  fromPartial(_: DeepPartial<Pong>): Pong {
    const message = { ...basePong } as Pong;
    return message;
  },
  toJSON(_: Pong): unknown {
    const obj: any = {};
    return obj;
  },
};

export const Status = {
  encode(message: Status, writer: Writer = Writer.create()): Writer {
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Status {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  toJSON(message: Status): unknown {
    const obj: any = {};
    if (message.presences) {
      obj.presences = message.presences.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    return obj;
  },
};

export const StatusFollow = {
  encode(message: StatusFollow, writer: Writer = Writer.create()): Writer {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StatusFollow {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  toJSON(message: StatusFollow): unknown {
    const obj: any = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map(e => e || "");
    } else {
      obj.user_ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map(e => e || "");
    } else {
      obj.usernames = [];
    }
    return obj;
  },
};

export const StatusPresenceEvent = {
  encode(message: StatusPresenceEvent, writer: Writer = Writer.create()): Writer {
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StatusPresenceEvent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  toJSON(message: StatusPresenceEvent): unknown {
    const obj: any = {};
    if (message.joins) {
      obj.joins = message.joins.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.leaves = [];
    }
    return obj;
  },
};

export const StatusUnfollow = {
  encode(message: StatusUnfollow, writer: Writer = Writer.create()): Writer {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StatusUnfollow {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  toJSON(message: StatusUnfollow): unknown {
    const obj: any = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map(e => e || "");
    } else {
      obj.user_ids = [];
    }
    return obj;
  },
};

export const StatusUpdate = {
  encode(message: StatusUpdate, writer: Writer = Writer.create()): Writer {
    if (message.status !== undefined && message.status !== undefined) {
      StringValue.encode({ value: message.status! }, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StatusUpdate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    return message;
  },
  fromPartial(object: DeepPartial<StatusUpdate>): StatusUpdate {
    const message = { ...baseStatusUpdate } as StatusUpdate;
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toJSON(message: StatusUpdate): unknown {
    const obj: any = {};
    obj.status = message.status || undefined;
    return obj;
  },
};

export const Stream = {
  encode(message: Stream, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.mode);
    writer.uint32(18).string(message.subject);
    writer.uint32(26).string(message.subcontext);
    writer.uint32(34).string(message.label);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Stream {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject);
    }
    if (object.subcontext !== undefined && object.subcontext !== null) {
      message.subcontext = String(object.subcontext);
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Stream>): Stream {
    const message = { ...baseStream } as Stream;
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = object.mode;
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject;
    }
    if (object.subcontext !== undefined && object.subcontext !== null) {
      message.subcontext = object.subcontext;
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    return message;
  },
  toJSON(message: Stream): unknown {
    const obj: any = {};
    obj.mode = message.mode || 0;
    obj.subject = message.subject || "";
    obj.subcontext = message.subcontext || "";
    obj.label = message.label || "";
    return obj;
  },
};

export const StreamData = {
  encode(message: StreamData, writer: Writer = Writer.create()): Writer {
    if (message.stream !== undefined && message.stream !== undefined) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    if (message.sender !== undefined && message.sender !== undefined) {
      UserPresence.encode(message.sender, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).string(message.data);
    writer.uint32(32).bool(message.reliable);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StreamData {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = UserPresence.fromJSON(object.sender);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data);
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    }
    return message;
  },
  fromPartial(object: DeepPartial<StreamData>): StreamData {
    const message = { ...baseStreamData } as StreamData;
    if (object.stream !== undefined && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = UserPresence.fromPartial(object.sender);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    }
    if (object.reliable !== undefined && object.reliable !== null) {
      message.reliable = object.reliable;
    }
    return message;
  },
  toJSON(message: StreamData): unknown {
    const obj: any = {};
    obj.stream = message.stream ? Stream.toJSON(message.stream) : undefined;
    obj.sender = message.sender ? UserPresence.toJSON(message.sender) : undefined;
    obj.data = message.data || "";
    obj.reliable = message.reliable || false;
    return obj;
  },
};

export const StreamPresenceEvent = {
  encode(message: StreamPresenceEvent, writer: Writer = Writer.create()): Writer {
    if (message.stream !== undefined && message.stream !== undefined) {
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
  decode(input: Uint8Array | Reader, length?: number): StreamPresenceEvent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
  fromPartial(object: DeepPartial<StreamPresenceEvent>): StreamPresenceEvent {
    const message = { ...baseStreamPresenceEvent } as StreamPresenceEvent;
    message.joins = [];
    message.leaves = [];
    if (object.stream !== undefined && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
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
  toJSON(message: StreamPresenceEvent): unknown {
    const obj: any = {};
    obj.stream = message.stream ? Stream.toJSON(message.stream) : undefined;
    if (message.joins) {
      obj.joins = message.joins.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(e => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.leaves = [];
    }
    return obj;
  },
};

export const UserPresence = {
  encode(message: UserPresence, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.user_id);
    writer.uint32(18).string(message.session_id);
    writer.uint32(26).string(message.username);
    writer.uint32(32).bool(message.persistence);
    if (message.status !== undefined && message.status !== undefined) {
      StringValue.encode({ value: message.status! }, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UserPresence {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    }
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = String(object.session_id);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.persistence !== undefined && object.persistence !== null) {
      message.persistence = Boolean(object.persistence);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = String(object.status);
    }
    return message;
  },
  fromPartial(object: DeepPartial<UserPresence>): UserPresence {
    const message = { ...baseUserPresence } as UserPresence;
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = object.user_id;
    }
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = object.session_id;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    if (object.persistence !== undefined && object.persistence !== null) {
      message.persistence = object.persistence;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toJSON(message: UserPresence): unknown {
    const obj: any = {};
    obj.user_id = message.user_id || "";
    obj.session_id = message.session_id || "";
    obj.username = message.username || "";
    obj.persistence = message.persistence || false;
    obj.status = message.status || undefined;
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]> } & { $case: T['$case'] }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;