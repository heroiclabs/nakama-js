/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import {
  BoolValue,
  Int32Value,
  StringValue,
  UInt32Value,
  Int64Value,
} from "../google/protobuf/wrappers";

export const protobufPackage = "nakama.api";

/** The Nakama server RPC protocol for games and apps. */

/** Operator that can be used to override the one set in the leaderboard. */
export enum OverrideOperator {
  /** NO_OVERRIDE - Do not override the leaderboard operator. */
  NO_OVERRIDE = 0,
  /** BEST - Override the leaderboard operator with BEST. */
  BEST = 1,
  /** SET - Override the leaderboard operator with SET. */
  SET = 2,
  /** INCREMENT - Override the leaderboard operator with INCREMENT. */
  INCREMENT = 3,
  /** DECREMENT - Override the leaderboard operator with DECREMENT. */
  DECREMENT = 4,
  UNRECOGNIZED = -1,
}

export function overrideOperatorFromJSON(object: any): OverrideOperator {
  switch (object) {
    case 0:
    case "NO_OVERRIDE":
      return OverrideOperator.NO_OVERRIDE;
    case 1:
    case "BEST":
      return OverrideOperator.BEST;
    case 2:
    case "SET":
      return OverrideOperator.SET;
    case 3:
    case "INCREMENT":
      return OverrideOperator.INCREMENT;
    case 4:
    case "DECREMENT":
      return OverrideOperator.DECREMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OverrideOperator.UNRECOGNIZED;
  }
}

export function overrideOperatorToJSON(object: OverrideOperator): string {
  switch (object) {
    case OverrideOperator.NO_OVERRIDE:
      return "NO_OVERRIDE";
    case OverrideOperator.BEST:
      return "BEST";
    case OverrideOperator.SET:
      return "SET";
    case OverrideOperator.INCREMENT:
      return "INCREMENT";
    case OverrideOperator.DECREMENT:
      return "DECREMENT";
    default:
      return "UNKNOWN";
  }
}

/** A user with additional account details. Always the current user. */
export interface Account {
  /** The user object. */
  user?: User;
  /** The user's wallet data. */
  wallet: string;
  /** The email address of the user. */
  email: string;
  /** The devices which belong to the user's account. */
  devices: AccountDevice[];
  /** The custom id in the user's account. */
  custom_id: string;
  /** The UNIX time when the user's email was verified. */
  verify_time?: Date;
  /** The UNIX time when the user's account was disabled/banned. */
  disable_time?: Date;
}

/** Obtain a new authentication token using a refresh token. */
export interface AccountRefresh {
  /** Refresh token. */
  token: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountRefresh_VarsEntry {
  key: string;
  value: string;
}

/** Send a Apple Sign In token to the server. Used with authenticate/link/unlink. */
export interface AccountApple {
  /** The ID token received from Apple to validate. */
  token: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountApple_VarsEntry {
  key: string;
  value: string;
}

/** Send a custom ID to the server. Used with authenticate/link/unlink. */
export interface AccountCustom {
  /** A custom identifier. */
  id: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountCustom_VarsEntry {
  key: string;
  value: string;
}

/** Send a device to the server. Used with authenticate/link/unlink and user. */
export interface AccountDevice {
  /** A device identifier. Should be obtained by a platform-specific device API. */
  id: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountDevice_VarsEntry {
  key: string;
  value: string;
}

/** Send an email with password to the server. Used with authenticate/link/unlink. */
export interface AccountEmail {
  /** A valid RFC-5322 email address. */
  email: string;
  /** A password for the user account. */
  password: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountEmail_VarsEntry {
  key: string;
  value: string;
}

/** Send a Facebook token to the server. Used with authenticate/link/unlink. */
export interface AccountFacebook {
  /** The OAuth token received from Facebook to access their profile API. */
  token: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountFacebook_VarsEntry {
  key: string;
  value: string;
}

/** Send a Facebook Instant Game token to the server. Used with authenticate/link/unlink. */
export interface AccountFacebookInstantGame {
  /** The OAuth token received from a Facebook Instant Game that may be decoded with the Application Secret (must be available with the nakama configuration) */
  signed_player_info: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountFacebookInstantGame_VarsEntry {
  key: string;
  value: string;
}

/** Send Apple's Game Center account credentials to the server. Used with authenticate/link/unlink. */
export interface AccountGameCenter {
  /** Player ID (generated by GameCenter). */
  player_id: string;
  /** Bundle ID (generated by GameCenter). */
  bundle_id: string;
  /** Time since UNIX epoch when the signature was created. */
  timestamp_seconds: number;
  /** A random "NSString" used to compute the hash and keep it randomized. */
  salt: string;
  /** The verification signature data generated. */
  signature: string;
  /** The URL for the public encryption key. */
  public_key_url: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountGameCenter_VarsEntry {
  key: string;
  value: string;
}

/** Send a Google token to the server. Used with authenticate/link/unlink. */
export interface AccountGoogle {
  /** The OAuth token received from Google to access their profile API. */
  token: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountGoogle_VarsEntry {
  key: string;
  value: string;
}

/** Send a Steam token to the server. Used with authenticate/link/unlink. */
export interface AccountSteam {
  /** The account token received from Steam to access their profile API. */
  token: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface AccountSteam_VarsEntry {
  key: string;
  value: string;
}

/** Add one or more friends to the current user. */
export interface AddFriendsRequest {
  /** The account id of a user. */
  ids: string[];
  /** The account username of a user. */
  usernames: string[];
}

/** Add users to a group. */
export interface AddGroupUsersRequest {
  /** The group to add users to. */
  group_id: string;
  /** The users to add. */
  user_ids: string[];
}

/** Authenticate against the server with a refresh token. */
export interface SessionRefreshRequest {
  /** Refresh token. */
  token: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
}

export interface SessionRefreshRequest_VarsEntry {
  key: string;
  value: string;
}

/** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
export interface SessionLogoutRequest {
  /** Session token to log out. */
  token: string;
  /** Refresh token to invalidate. */
  refresh_token: string;
}

/** Authenticate against the server with Apple Sign In. */
export interface AuthenticateAppleRequest {
  /** The Apple account details. */
  account?: AccountApple;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with a custom ID. */
export interface AuthenticateCustomRequest {
  /** The custom account details. */
  account?: AccountCustom;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with a device ID. */
export interface AuthenticateDeviceRequest {
  /** The device account details. */
  account?: AccountDevice;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with email+password. */
export interface AuthenticateEmailRequest {
  /** The email account details. */
  account?: AccountEmail;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with Facebook. */
export interface AuthenticateFacebookRequest {
  /** The Facebook account details. */
  account?: AccountFacebook;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
  /** Import Facebook friends for the user. */
  sync?: boolean;
}

/** Authenticate against the server with Facebook Instant Game token. */
export interface AuthenticateFacebookInstantGameRequest {
  /** The Facebook Instant Game account details. */
  account?: AccountFacebookInstantGame;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with Apple's Game Center. */
export interface AuthenticateGameCenterRequest {
  /** The Game Center account details. */
  account?: AccountGameCenter;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with Google. */
export interface AuthenticateGoogleRequest {
  /** The Google account details. */
  account?: AccountGoogle;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with Steam. */
export interface AuthenticateSteamRequest {
  /** The Steam account details. */
  account?: AccountSteam;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username: string;
  /** Import Steam friends for the user. */
  sync?: boolean;
}

/** Ban users from a group. */
export interface BanGroupUsersRequest {
  /** The group to ban users from. */
  group_id: string;
  /** The users to ban. */
  user_ids: string[];
}

/** Block one or more friends for the current user. */
export interface BlockFriendsRequest {
  /** The account id of a user. */
  ids: string[];
  /** The account username of a user. */
  usernames: string[];
}

/** A message sent on a channel. */
export interface ChannelMessage {
  /** The channel this message belongs to. */
  channel_id: string;
  /** The unique ID of this message. */
  message_id: string;
  /** The code representing a message type or category. */
  code?: number;
  /** Message sender, usually a user ID. */
  sender_id: string;
  /** The username of the message sender, if any. */
  username: string;
  /** The content payload. */
  content: string;
  /** The UNIX time when the message was created. */
  create_time?: Date;
  /** The UNIX time when the message was last updated. */
  update_time?: Date;
  /** True if the message was persisted to the channel's history, false otherwise. */
  persistent?: boolean;
  /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
  room_name: string;
  /** The ID of the group, or an empty string if this message was not sent through a group channel. */
  group_id: string;
  /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_one: string;
  /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_two: string;
}

/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
  /** A list of messages. */
  messages: ChannelMessage[];
  /** The cursor to send when retrieving the next page, if any. */
  next_cursor: string;
  /** The cursor to send when retrieving the previous page, if any. */
  prev_cursor: string;
  /** Cacheable cursor to list newer messages. Durable and designed to be stored, unlike next/prev cursors. */
  cacheable_cursor: string;
}

/** Create a group with the current user as owner. */
export interface CreateGroupRequest {
  /** A unique name for the group. */
  name: string;
  /** A description for the group. */
  description: string;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag: string;
  /** A URL for an avatar image. */
  avatar_url: string;
  /** Mark a group as open or not where only admins can accept members. */
  open: boolean;
  /** Maximum number of group members. */
  max_count: number;
}

/** Delete one or more friends for the current user. */
export interface DeleteFriendsRequest {
  /** The account id of a user. */
  ids: string[];
  /** The account username of a user. */
  usernames: string[];
}

/** Delete a group the user has access to. */
export interface DeleteGroupRequest {
  /** The id of a group. */
  group_id: string;
}

/** Delete a leaderboard record. */
export interface DeleteLeaderboardRecordRequest {
  /** The leaderboard ID to delete from. */
  leaderboard_id: string;
}

/** Delete one or more notifications for the current user. */
export interface DeleteNotificationsRequest {
  /** The id of notifications. */
  ids: string[];
}

/** Storage objects to delete. */
export interface DeleteStorageObjectId {
  /** The collection which stores the object. */
  collection: string;
  /** The key of the object within the collection. */
  key: string;
  /** The version hash of the object. */
  version: string;
}

/** Batch delete storage objects. */
export interface DeleteStorageObjectsRequest {
  /** Batch of storage objects. */
  object_ids: DeleteStorageObjectId[];
}

/** Represents an event to be passed through the server to registered event handlers. */
export interface Event {
  /** An event name, type, category, or identifier. */
  name: string;
  /** Arbitrary event property values. */
  properties: { [key: string]: string };
  /** The time when the event was triggered. */
  timestamp?: Date;
  /** True if the event came directly from a client call, false otherwise. */
  external: boolean;
}

export interface Event_PropertiesEntry {
  key: string;
  value: string;
}

/** A friend of a user. */
export interface Friend {
  /** The user object. */
  user?: User;
  /** The friend status. */
  state?: number;
  /** Time of the latest relationship update. */
  update_time?: Date;
}

/** The friendship status. */
export enum Friend_State {
  /** FRIEND - The user is a friend of the current user. */
  FRIEND = 0,
  /** INVITE_SENT - The current user has sent an invite to the user. */
  INVITE_SENT = 1,
  /** INVITE_RECEIVED - The current user has received an invite from this user. */
  INVITE_RECEIVED = 2,
  /** BLOCKED - The current user has blocked this user. */
  BLOCKED = 3,
  UNRECOGNIZED = -1,
}

export function friend_StateFromJSON(object: any): Friend_State {
  switch (object) {
    case 0:
    case "FRIEND":
      return Friend_State.FRIEND;
    case 1:
    case "INVITE_SENT":
      return Friend_State.INVITE_SENT;
    case 2:
    case "INVITE_RECEIVED":
      return Friend_State.INVITE_RECEIVED;
    case 3:
    case "BLOCKED":
      return Friend_State.BLOCKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Friend_State.UNRECOGNIZED;
  }
}

export function friend_StateToJSON(object: Friend_State): string {
  switch (object) {
    case Friend_State.FRIEND:
      return "FRIEND";
    case Friend_State.INVITE_SENT:
      return "INVITE_SENT";
    case Friend_State.INVITE_RECEIVED:
      return "INVITE_RECEIVED";
    case Friend_State.BLOCKED:
      return "BLOCKED";
    default:
      return "UNKNOWN";
  }
}

/** A collection of zero or more friends of the user. */
export interface FriendList {
  /** The Friend objects. */
  friends: Friend[];
  /** Cursor for the next page of results, if any. */
  cursor: string;
}

/** Fetch a batch of zero or more users from the server. */
export interface GetUsersRequest {
  /** The account id of a user. */
  ids: string[];
  /** The account username of a user. */
  usernames: string[];
  /** The Facebook ID of a user. */
  facebook_ids: string[];
}

/** A group in the server. */
export interface Group {
  /** The id of a group. */
  id: string;
  /** The id of the user who created the group. */
  creator_id: string;
  /** The unique name of the group. */
  name: string;
  /** A description for the group. */
  description: string;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag: string;
  /** Additional information stored as a JSON object. */
  metadata: string;
  /** A URL for an avatar image. */
  avatar_url: string;
  /** Anyone can join open groups, otherwise only admins can accept members. */
  open?: boolean;
  /** The current count of all members in the group. */
  edge_count: number;
  /** The maximum number of members allowed. */
  max_count: number;
  /** The UNIX time when the group was created. */
  create_time?: Date;
  /** The UNIX time when the group was last updated. */
  update_time?: Date;
}

/** One or more groups returned from a listing operation. */
export interface GroupList {
  /** One or more groups. */
  groups: Group[];
  /** A cursor used to get the next page. */
  cursor: string;
}

/** A list of users belonging to a group, along with their role. */
export interface GroupUserList {
  /** User-role pairs for a group. */
  group_users: GroupUserList_GroupUser[];
  /** Cursor for the next page of results, if any. */
  cursor: string;
}

/** A single user-role pair. */
export interface GroupUserList_GroupUser {
  /** User. */
  user?: User;
  /** Their relationship to the group. */
  state?: number;
}

/** The group role status. */
export enum GroupUserList_GroupUser_State {
  /** SUPERADMIN - The user is a superadmin with full control of the group. */
  SUPERADMIN = 0,
  /** ADMIN - The user is an admin with additional privileges. */
  ADMIN = 1,
  /** MEMBER - The user is a regular member. */
  MEMBER = 2,
  /** JOIN_REQUEST - The user has requested to join the group */
  JOIN_REQUEST = 3,
  UNRECOGNIZED = -1,
}

export function groupUserList_GroupUser_StateFromJSON(
  object: any
): GroupUserList_GroupUser_State {
  switch (object) {
    case 0:
    case "SUPERADMIN":
      return GroupUserList_GroupUser_State.SUPERADMIN;
    case 1:
    case "ADMIN":
      return GroupUserList_GroupUser_State.ADMIN;
    case 2:
    case "MEMBER":
      return GroupUserList_GroupUser_State.MEMBER;
    case 3:
    case "JOIN_REQUEST":
      return GroupUserList_GroupUser_State.JOIN_REQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GroupUserList_GroupUser_State.UNRECOGNIZED;
  }
}

export function groupUserList_GroupUser_StateToJSON(
  object: GroupUserList_GroupUser_State
): string {
  switch (object) {
    case GroupUserList_GroupUser_State.SUPERADMIN:
      return "SUPERADMIN";
    case GroupUserList_GroupUser_State.ADMIN:
      return "ADMIN";
    case GroupUserList_GroupUser_State.MEMBER:
      return "MEMBER";
    case GroupUserList_GroupUser_State.JOIN_REQUEST:
      return "JOIN_REQUEST";
    default:
      return "UNKNOWN";
  }
}

/** Import Facebook friends into the current user's account. */
export interface ImportFacebookFriendsRequest {
  /** The Facebook account details. */
  account?: AccountFacebook;
  /** Reset the current user's friends list. */
  reset?: boolean;
}

/** Import Facebook friends into the current user's account. */
export interface ImportSteamFriendsRequest {
  /** The Facebook account details. */
  account?: AccountSteam;
  /** Reset the current user's friends list. */
  reset?: boolean;
}

/** Immediately join an open group, or request to join a closed one. */
export interface JoinGroupRequest {
  /** The group ID to join. The group must already exist. */
  group_id: string;
}

/** The request to join a tournament. */
export interface JoinTournamentRequest {
  /** The ID of the tournament to join. The tournament must already exist. */
  tournament_id: string;
}

/** Kick a set of users from a group. */
export interface KickGroupUsersRequest {
  /** The group ID to kick from. */
  group_id: string;
  /** The users to kick. */
  user_ids: string[];
}

/** Represents a complete leaderboard record with all scores and associated metadata. */
export interface LeaderboardRecord {
  /** The ID of the leaderboard this score belongs to. */
  leaderboard_id: string;
  /** The ID of the score owner, usually a user or group. */
  owner_id: string;
  /** The username of the score owner, if the owner is a user. */
  username?: string;
  /** The score value. */
  score: number;
  /** An optional subscore value. */
  subscore: number;
  /** The number of submissions to this score record. */
  num_score: number;
  /** Metadata. */
  metadata: string;
  /** The UNIX time when the leaderboard record was created. */
  create_time?: Date;
  /** The UNIX time when the leaderboard record was updated. */
  update_time?: Date;
  /** The UNIX time when the leaderboard record expires. */
  expiry_time?: Date;
  /** The rank of this record. */
  rank: number;
  /** The maximum number of score updates allowed by the owner. */
  max_num_score: number;
}

/** A set of leaderboard records, may be part of a leaderboard records page or a batch of individual records. */
export interface LeaderboardRecordList {
  /** A list of leaderboard records. */
  records: LeaderboardRecord[];
  /** A batched set of leaderboard records belonging to specified owners. */
  owner_records: LeaderboardRecord[];
  /** The cursor to send when retrieving the next page, if any. */
  next_cursor: string;
  /** The cursor to send when retrieving the previous page, if any. */
  prev_cursor: string;
}

/** Leave a group. */
export interface LeaveGroupRequest {
  /** The group ID to leave. */
  group_id: string;
}

/** Link Facebook to the current user's account. */
export interface LinkFacebookRequest {
  /** The Facebook account details. */
  account?: AccountFacebook;
  /** Import Facebook friends for the user. */
  sync?: boolean;
}

/** Link Steam to the current user's account. */
export interface LinkSteamRequest {
  /** The Facebook account details. */
  account?: AccountSteam;
  /** Import Steam friends for the user. */
  sync?: boolean;
}

/** List a channel's message history. */
export interface ListChannelMessagesRequest {
  /** The channel ID to list from. */
  channel_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** True if listing should be older messages to newer, false if reverse. */
  forward?: boolean;
  /** A pagination cursor, if any. */
  cursor: string;
}

/** List friends for a user. */
export interface ListFriendsRequest {
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** The friend state to list. */
  state?: number;
  /** An optional next page cursor. */
  cursor: string;
}

/** List groups based on given filters. */
export interface ListGroupsRequest {
  /** List groups that contain this value in their names. */
  name: string;
  /** Optional pagination cursor. */
  cursor: string;
  /** Max number of groups to return. Between 1 and 100. */
  limit?: number;
}

/** List all users that are part of a group. */
export interface ListGroupUsersRequest {
  /** The group ID to list from. */
  group_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** The group user state to list. */
  state?: number;
  /** An optional next page cursor. */
  cursor: string;
}

/** List leaerboard records from a given leaderboard around the owner. */
export interface ListLeaderboardRecordsAroundOwnerRequest {
  /** The ID of the tournament to list for. */
  leaderboard_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** The owner to retrieve records around. */
  owner_id: string;
  /** Expiry in seconds (since epoch) to begin fetching records from. */
  expiry?: number;
}

/** List leaderboard records from a given leaderboard. */
export interface ListLeaderboardRecordsRequest {
  /** The ID of the leaderboard to list for. */
  leaderboard_id: string;
  /** One or more owners to retrieve records for. */
  owner_ids: string[];
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** A next or previous page cursor. */
  cursor: string;
  /** Expiry in seconds (since epoch) to begin fetching records from. Optional. 0 means from current time. */
  expiry?: number;
}

/** List realtime matches. */
export interface ListMatchesRequest {
  /** Limit the number of returned matches. */
  limit?: number;
  /** Authoritative or relayed matches. */
  authoritative?: boolean;
  /** Label filter. */
  label?: string;
  /** Minimum user count. */
  min_size?: number;
  /** Maximum user count. */
  max_size?: number;
  /** Arbitrary label query. */
  query?: string;
}

/** Get a list of unexpired notifications. */
export interface ListNotificationsRequest {
  /** The number of notifications to get. Between 1 and 100. */
  limit?: number;
  /** A cursor to page through notifications. May be cached by clients to get from point in time forwards. */
  cacheable_cursor: string;
}

/** List publicly readable storage objects in a given collection. */
export interface ListStorageObjectsRequest {
  /** ID of the user. */
  user_id: string;
  /** The collection which stores the object. */
  collection: string;
  /** The number of storage objects to list. Between 1 and 100. */
  limit?: number;
  /** The cursor to page through results from. */
  cursor: string;
}

/** List tournament records from a given tournament around the owner. */
export interface ListTournamentRecordsAroundOwnerRequest {
  /** The ID of the tournament to list for. */
  tournament_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** The owner to retrieve records around. */
  owner_id: string;
  /** Expiry in seconds (since epoch) to begin fetching records from. */
  expiry?: number;
}

/** List tournament records from a given tournament. */
export interface ListTournamentRecordsRequest {
  /** The ID of the tournament to list for. */
  tournament_id: string;
  /** One or more owners to retrieve records for. */
  owner_ids: string[];
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** A next or previous page cursor. */
  cursor: string;
  /** Expiry in seconds (since epoch) to begin fetching records from. */
  expiry?: number;
}

/** List active/upcoming tournaments based on given filters. */
export interface ListTournamentsRequest {
  /** The start of the categories to include. Defaults to 0. */
  category_start?: number;
  /** The end of the categories to include. Defaults to 128. */
  category_end?: number;
  /** The start time for tournaments. Defaults to epoch. */
  start_time?: number;
  /** The end time for tournaments. Defaults to +1 year from current Unix time. */
  end_time?: number;
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** A next page cursor for listings (optional). */
  cursor: string;
}

/** List the groups a user is part of, and their relationship to each. */
export interface ListUserGroupsRequest {
  /** ID of the user. */
  user_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit?: number;
  /** The user group state to list. */
  state?: number;
  /** An optional next page cursor. */
  cursor: string;
}

/** Represents a realtime match. */
export interface Match {
  /** The ID of the match, can be used to join. */
  match_id: string;
  /** True if it's an server-managed authoritative match, false otherwise. */
  authoritative: boolean;
  /** Match label, if any. */
  label?: string;
  /** Current number of users in the match. */
  size: number;
  /** Tick Rate */
  tick_rate: number;
  /** Handler name */
  handler_name: string;
}

/** A list of realtime matches. */
export interface MatchList {
  /** A number of matches corresponding to a list operation. */
  matches: Match[];
}

/** A notification in the server. */
export interface Notification {
  /** ID of the Notification. */
  id: string;
  /** Subject of the notification. */
  subject: string;
  /** Content of the notification in JSON. */
  content: string;
  /** Category code for this notification. */
  code: number;
  /** ID of the sender, if a user. Otherwise 'null'. */
  sender_id: string;
  /** The UNIX time when the notification was created. */
  create_time?: Date;
  /** True if this notification was persisted to the database. */
  persistent: boolean;
}

/** A collection of zero or more notifications. */
export interface NotificationList {
  /** Collection of notifications. */
  notifications: Notification[];
  /** Use this cursor to paginate notifications. Cache this to catch up to new notifications. */
  cacheable_cursor: string;
}

/** Promote a set of users in a group to the next role up. */
export interface PromoteGroupUsersRequest {
  /** The group ID to promote in. */
  group_id: string;
  /** The users to promote. */
  user_ids: string[];
}

/** Demote a set of users in a group to the next role down. */
export interface DemoteGroupUsersRequest {
  /** The group ID to demote in. */
  group_id: string;
  /** The users to demote. */
  user_ids: string[];
}

/** Storage objects to get. */
export interface ReadStorageObjectId {
  /** The collection which stores the object. */
  collection: string;
  /** The key of the object within the collection. */
  key: string;
  /** The user owner of the object. */
  user_id: string;
}

/** Batch get storage objects. */
export interface ReadStorageObjectsRequest {
  /** Batch of storage objects. */
  object_ids: ReadStorageObjectId[];
}

/** Execute an Lua function on the server. */
export interface Rpc {
  /** The identifier of the function. */
  id: string;
  /** The payload of the function which must be a JSON object. */
  payload: string;
  /** The authentication key used when executed as a non-client HTTP request. */
  http_key: string;
}

/** A user's session used to authenticate messages. */
export interface Session {
  /** True if the corresponding account was just created, false otherwise. */
  created: boolean;
  /** Authentication credentials. */
  token: string;
  /** Refresh token that can be used for session token renewal. */
  refresh_token: string;
}

/** An object within the storage engine. */
export interface StorageObject {
  /** The collection which stores the object. */
  collection: string;
  /** The key of the object within the collection. */
  key: string;
  /** The user owner of the object. */
  user_id: string;
  /** The value of the object. */
  value: string;
  /** The version hash of the object. */
  version: string;
  /** The read access permissions for the object. */
  permission_read: number;
  /** The write access permissions for the object. */
  permission_write: number;
  /** The UNIX time when the object was created. */
  create_time?: Date;
  /** The UNIX time when the object was last updated. */
  update_time?: Date;
}

/** A storage acknowledgement. */
export interface StorageObjectAck {
  /** The collection which stores the object. */
  collection: string;
  /** The key of the object within the collection. */
  key: string;
  /** The version hash of the object. */
  version: string;
  /** The owner of the object. */
  user_id: string;
}

/** Batch of acknowledgements for the storage object write. */
export interface StorageObjectAcks {
  /** Batch of storage write acknowledgements. */
  acks: StorageObjectAck[];
}

/** Batch of storage objects. */
export interface StorageObjects {
  /** The batch of storage objects. */
  objects: StorageObject[];
}

/** List of storage objects. */
export interface StorageObjectList {
  /** The list of storage objects. */
  objects: StorageObject[];
  /** The cursor for the next page of results, if any. */
  cursor: string;
}

/** A tournament on the server. */
export interface Tournament {
  /** The ID of the tournament. */
  id: string;
  /** The title for the tournament. */
  title: string;
  /** The description of the tournament. May be blank. */
  description: string;
  /** The category of the tournament. e.g. "vip" could be category 1. */
  category: number;
  /** ASC or DESC sort mode of scores in the tournament. */
  sort_order: number;
  /** The current number of players in the tournament. */
  size: number;
  /** The maximum number of players for the tournament. */
  max_size: number;
  /** The maximum score updates allowed per player for the current tournament. */
  max_num_score: number;
  /** True if the tournament is active and can enter. A computed value. */
  can_enter: boolean;
  /** The UNIX time when the tournament stops being active until next reset. A computed value. */
  end_active: number;
  /** The UNIX time when the tournament is next playable. A computed value. */
  next_reset: number;
  /** Additional information stored as a JSON object. */
  metadata: string;
  /** The UNIX time when the tournament was created. */
  create_time?: Date;
  /** The UNIX time when the tournament will start. */
  start_time?: Date;
  /** The UNIX time when the tournament will be stopped. */
  end_time?: Date;
  /** Duration of the tournament in seconds. */
  duration: number;
  /** The UNIX time when the tournament start being active. A computed value. */
  start_active: number;
}

/** A list of tournaments. */
export interface TournamentList {
  /** The list of tournaments returned. */
  tournaments: Tournament[];
  /** A pagination cursor (optional). */
  cursor: string;
}

/** A set of tournament records which may be part of a tournament records page or a batch of individual records. */
export interface TournamentRecordList {
  /** A list of tournament records. */
  records: LeaderboardRecord[];
  /** A batched set of tournament records belonging to specified owners. */
  owner_records: LeaderboardRecord[];
  /** The cursor to send when retireving the next page (optional). */
  next_cursor: string;
  /** The cursor to send when retrieving the previous page (optional). */
  prev_cursor: string;
}

/** Update a user's account details. */
export interface UpdateAccountRequest {
  /** The username of the user's account. */
  username?: string;
  /** The display name of the user. */
  display_name?: string;
  /** A URL for an avatar image. */
  avatar_url?: string;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag?: string;
  /** The location set by the user. */
  location?: string;
  /** The timezone set by the user. */
  timezone?: string;
}

/** Update fields in a given group. */
export interface UpdateGroupRequest {
  /** The ID of the group to update. */
  group_id: string;
  /** Name. */
  name?: string;
  /** Description string. */
  description?: string;
  /** Lang tag. */
  lang_tag?: string;
  /** Avatar URL. */
  avatar_url?: string;
  /** Open is true if anyone should be allowed to join, or false if joins must be approved by a group admin. */
  open?: boolean;
}

/** A user in the server. */
export interface User {
  /** The id of the user's account. */
  id: string;
  /** The username of the user's account. */
  username: string;
  /** The display name of the user. */
  display_name: string;
  /** A URL for an avatar image. */
  avatar_url: string;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag: string;
  /** The location set by the user. */
  location: string;
  /** The timezone set by the user. */
  timezone: string;
  /** Additional information stored as a JSON object. */
  metadata: string;
  /** The Facebook id in the user's account. */
  facebook_id: string;
  /** The Google id in the user's account. */
  google_id: string;
  /** The Apple Game Center in of the user's account. */
  gamecenter_id: string;
  /** The Steam id in the user's account. */
  steam_id: string;
  /** Indicates whether the user is currently online. */
  online: boolean;
  /** Number of related edges to this user. */
  edge_count: number;
  /** The UNIX time when the user was created. */
  create_time?: Date;
  /** The UNIX time when the user was last updated. */
  update_time?: Date;
  /** The Facebook Instant Game ID in the user's account. */
  facebook_instant_game_id: string;
  /** The Apple Sign In ID in the user's account. */
  apple_id: string;
}

/** A list of groups belonging to a user, along with the user's role in each group. */
export interface UserGroupList {
  /** Group-role pairs for a user. */
  user_groups: UserGroupList_UserGroup[];
  /** Cursor for the next page of results, if any. */
  cursor: string;
}

/** A single group-role pair. */
export interface UserGroupList_UserGroup {
  /** Group. */
  group?: Group;
  /** The user's relationship to the group. */
  state?: number;
}

/** The group role status. */
export enum UserGroupList_UserGroup_State {
  /** SUPERADMIN - The user is a superadmin with full control of the group. */
  SUPERADMIN = 0,
  /** ADMIN - The user is an admin with additional privileges. */
  ADMIN = 1,
  /** MEMBER - The user is a regular member. */
  MEMBER = 2,
  /** JOIN_REQUEST - The user has requested to join the group */
  JOIN_REQUEST = 3,
  UNRECOGNIZED = -1,
}

export function userGroupList_UserGroup_StateFromJSON(
  object: any
): UserGroupList_UserGroup_State {
  switch (object) {
    case 0:
    case "SUPERADMIN":
      return UserGroupList_UserGroup_State.SUPERADMIN;
    case 1:
    case "ADMIN":
      return UserGroupList_UserGroup_State.ADMIN;
    case 2:
    case "MEMBER":
      return UserGroupList_UserGroup_State.MEMBER;
    case 3:
    case "JOIN_REQUEST":
      return UserGroupList_UserGroup_State.JOIN_REQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserGroupList_UserGroup_State.UNRECOGNIZED;
  }
}

export function userGroupList_UserGroup_StateToJSON(
  object: UserGroupList_UserGroup_State
): string {
  switch (object) {
    case UserGroupList_UserGroup_State.SUPERADMIN:
      return "SUPERADMIN";
    case UserGroupList_UserGroup_State.ADMIN:
      return "ADMIN";
    case UserGroupList_UserGroup_State.MEMBER:
      return "MEMBER";
    case UserGroupList_UserGroup_State.JOIN_REQUEST:
      return "JOIN_REQUEST";
    default:
      return "UNKNOWN";
  }
}

/** A collection of zero or more users. */
export interface Users {
  /** The User objects. */
  users: User[];
}

/** Apple IAP Purchases validation request */
export interface ValidatePurchaseAppleRequest {
  /** Base64 encoded Apple receipt data payload. */
  receipt: string;
}

/** Google IAP Purchase validation request */
export interface ValidatePurchaseGoogleRequest {
  /** JSON encoded Google purchase payload. */
  purchase: string;
}

/** Huawei IAP Purchase validation request */
export interface ValidatePurchaseHuaweiRequest {
  /** JSON encoded Huawei InAppPurchaseData. */
  purchase: string;
  /** InAppPurchaseData signature. */
  signature: string;
}

/** Validated Purchase stored by Nakama. */
export interface ValidatedPurchase {
  /** Purchase Product ID. */
  product_id: string;
  /** Purchase Transaction ID. */
  transaction_id: string;
  /** Store identifier */
  store: ValidatedPurchase_Store;
  /** UNIX Timestamp when the purchase was done. */
  purchase_time?: Date;
  /** UNIX Timestamp when the receipt validation was stored in DB. */
  create_time?: Date;
  /** UNIX Timestamp when the receipt validation was updated in DB. */
  update_time?: Date;
  /** Raw provider validation response. */
  provider_response: string;
  /** Whether the purchase was done in production or sandbox environment. */
  environment: ValidatedPurchase_Environment;
}

/** Validation Provider */
export enum ValidatedPurchase_Store {
  /** APPLE_APP_STORE - Apple App Store */
  APPLE_APP_STORE = 0,
  /** GOOGLE_PLAY_STORE - Google Play Store */
  GOOGLE_PLAY_STORE = 1,
  /** HUAWEI_APP_GALLERY - Huawei App Gallery */
  HUAWEI_APP_GALLERY = 2,
  UNRECOGNIZED = -1,
}

export function validatedPurchase_StoreFromJSON(
  object: any
): ValidatedPurchase_Store {
  switch (object) {
    case 0:
    case "APPLE_APP_STORE":
      return ValidatedPurchase_Store.APPLE_APP_STORE;
    case 1:
    case "GOOGLE_PLAY_STORE":
      return ValidatedPurchase_Store.GOOGLE_PLAY_STORE;
    case 2:
    case "HUAWEI_APP_GALLERY":
      return ValidatedPurchase_Store.HUAWEI_APP_GALLERY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValidatedPurchase_Store.UNRECOGNIZED;
  }
}

export function validatedPurchase_StoreToJSON(
  object: ValidatedPurchase_Store
): string {
  switch (object) {
    case ValidatedPurchase_Store.APPLE_APP_STORE:
      return "APPLE_APP_STORE";
    case ValidatedPurchase_Store.GOOGLE_PLAY_STORE:
      return "GOOGLE_PLAY_STORE";
    case ValidatedPurchase_Store.HUAWEI_APP_GALLERY:
      return "HUAWEI_APP_GALLERY";
    default:
      return "UNKNOWN";
  }
}

/** Environment where the purchase took place */
export enum ValidatedPurchase_Environment {
  /** UNKNOWN - Unknown environment. */
  UNKNOWN = 0,
  /** SANDBOX - Sandbox/test environment. */
  SANDBOX = 1,
  /** PRODUCTION - Production environment. */
  PRODUCTION = 2,
  UNRECOGNIZED = -1,
}

export function validatedPurchase_EnvironmentFromJSON(
  object: any
): ValidatedPurchase_Environment {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ValidatedPurchase_Environment.UNKNOWN;
    case 1:
    case "SANDBOX":
      return ValidatedPurchase_Environment.SANDBOX;
    case 2:
    case "PRODUCTION":
      return ValidatedPurchase_Environment.PRODUCTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValidatedPurchase_Environment.UNRECOGNIZED;
  }
}

export function validatedPurchase_EnvironmentToJSON(
  object: ValidatedPurchase_Environment
): string {
  switch (object) {
    case ValidatedPurchase_Environment.UNKNOWN:
      return "UNKNOWN";
    case ValidatedPurchase_Environment.SANDBOX:
      return "SANDBOX";
    case ValidatedPurchase_Environment.PRODUCTION:
      return "PRODUCTION";
    default:
      return "UNKNOWN";
  }
}

/** Validate IAP response */
export interface ValidatePurchaseResponse {
  /** Newly seen validated purchases. */
  validated_purchases: ValidatedPurchase[];
}

/** A list of validated purchases stored by Nakama. */
export interface PurchaseList {
  /** Stored validated purchases. */
  validated_purchases: ValidatedPurchase[];
  /** The cursor to send when retrieving the next page, if any. */
  cursor: string;
}

/** A request to submit a score to a leaderboard. */
export interface WriteLeaderboardRecordRequest {
  /** The ID of the leaderboard to write to. */
  leaderboard_id: string;
  /** Record input. */
  record?: WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
}

/** Record values to write. */
export interface WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
  /** The score value to submit. */
  score: number;
  /** An optional secondary value. */
  subscore: number;
  /** Optional record metadata. */
  metadata: string;
  /** Operator override. */
  operator: OverrideOperator;
}

/** The object to store. */
export interface WriteStorageObject {
  /** The collection to store the object. */
  collection: string;
  /** The key for the object within the collection. */
  key: string;
  /** The value of the object. */
  value: string;
  /** The version hash of the object to check. Possible values are: ["", "*", "#hash#"]. */
  version: string;
  /** The read access permissions for the object. */
  permission_read?: number;
  /** The write access permissions for the object. */
  permission_write?: number;
}

/** Write objects to the storage engine. */
export interface WriteStorageObjectsRequest {
  /** The objects to store on the server. */
  objects: WriteStorageObject[];
}

/** A request to submit a score to a tournament. */
export interface WriteTournamentRecordRequest {
  /** The tournament ID to write the record for. */
  tournament_id: string;
  /** Record input. */
  record?: WriteTournamentRecordRequest_TournamentRecordWrite;
}

/** Record values to write. */
export interface WriteTournamentRecordRequest_TournamentRecordWrite {
  /** The score value to submit. */
  score: number;
  /** An optional secondary value. */
  subscore: number;
  /** A JSON object of additional properties (optional). */
  metadata: string;
  /** Operator override. */
  operator: OverrideOperator;
}

const baseAccount: object = { wallet: "", email: "", custom_id: "" };

export const Account = {
  encode(
    message: Account,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.wallet !== "") {
      writer.uint32(18).string(message.wallet);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    for (const v of message.devices) {
      AccountDevice.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.custom_id !== "") {
      writer.uint32(42).string(message.custom_id);
    }
    if (message.verify_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.verify_time),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.disable_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.disable_time),
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccount } as Account;
    message.devices = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.wallet = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.devices.push(AccountDevice.decode(reader, reader.uint32()));
          break;
        case 5:
          message.custom_id = reader.string();
          break;
        case 6:
          message.verify_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.disable_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Account {
    const message = { ...baseAccount } as Account;
    message.devices = [];
    if (object.user !== undefined && object.user !== null) {
      message.user = User.fromJSON(object.user);
    }
    if (object.wallet !== undefined && object.wallet !== null) {
      message.wallet = String(object.wallet);
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    }
    if (object.devices !== undefined && object.devices !== null) {
      for (const e of object.devices) {
        message.devices.push(AccountDevice.fromJSON(e));
      }
    }
    if (object.custom_id !== undefined && object.custom_id !== null) {
      message.custom_id = String(object.custom_id);
    }
    if (object.verify_time !== undefined && object.verify_time !== null) {
      message.verify_time = fromJsonTimestamp(object.verify_time);
    }
    if (object.disable_time !== undefined && object.disable_time !== null) {
      message.disable_time = fromJsonTimestamp(object.disable_time);
    }
    return message;
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.wallet !== undefined && (obj.wallet = message.wallet);
    message.email !== undefined && (obj.email = message.email);
    if (message.devices) {
      obj.devices = message.devices.map((e) =>
        e ? AccountDevice.toJSON(e) : undefined
      );
    } else {
      obj.devices = [];
    }
    message.custom_id !== undefined && (obj.custom_id = message.custom_id);
    message.verify_time !== undefined &&
      (obj.verify_time = message.verify_time.toISOString());
    message.disable_time !== undefined &&
      (obj.disable_time = message.disable_time.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Account>): Account {
    const message = { ...baseAccount } as Account;
    message.devices = [];
    if (object.user !== undefined && object.user !== null) {
      message.user = User.fromPartial(object.user);
    }
    if (object.wallet !== undefined && object.wallet !== null) {
      message.wallet = object.wallet;
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    }
    if (object.devices !== undefined && object.devices !== null) {
      for (const e of object.devices) {
        message.devices.push(AccountDevice.fromPartial(e));
      }
    }
    if (object.custom_id !== undefined && object.custom_id !== null) {
      message.custom_id = object.custom_id;
    }
    if (object.verify_time !== undefined && object.verify_time !== null) {
      message.verify_time = object.verify_time;
    }
    if (object.disable_time !== undefined && object.disable_time !== null) {
      message.disable_time = object.disable_time;
    }
    return message;
  },
};

const baseAccountRefresh: object = { token: "" };

export const AccountRefresh = {
  encode(
    message: AccountRefresh,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountRefresh_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountRefresh {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountRefresh } as AccountRefresh;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountRefresh_VarsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountRefresh {
    const message = { ...baseAccountRefresh } as AccountRefresh;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountRefresh): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountRefresh>): AccountRefresh {
    const message = { ...baseAccountRefresh } as AccountRefresh;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountRefresh_VarsEntry: object = { key: "", value: "" };

export const AccountRefresh_VarsEntry = {
  encode(
    message: AccountRefresh_VarsEntry,
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
  ): AccountRefresh_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAccountRefresh_VarsEntry,
    } as AccountRefresh_VarsEntry;
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

  fromJSON(object: any): AccountRefresh_VarsEntry {
    const message = {
      ...baseAccountRefresh_VarsEntry,
    } as AccountRefresh_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountRefresh_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountRefresh_VarsEntry>
  ): AccountRefresh_VarsEntry {
    const message = {
      ...baseAccountRefresh_VarsEntry,
    } as AccountRefresh_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountApple: object = { token: "" };

export const AccountApple = {
  encode(
    message: AccountApple,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountApple_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountApple {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountApple } as AccountApple;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountApple_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountApple {
    const message = { ...baseAccountApple } as AccountApple;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountApple): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountApple>): AccountApple {
    const message = { ...baseAccountApple } as AccountApple;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountApple_VarsEntry: object = { key: "", value: "" };

export const AccountApple_VarsEntry = {
  encode(
    message: AccountApple_VarsEntry,
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
  ): AccountApple_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountApple_VarsEntry } as AccountApple_VarsEntry;
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

  fromJSON(object: any): AccountApple_VarsEntry {
    const message = { ...baseAccountApple_VarsEntry } as AccountApple_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountApple_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountApple_VarsEntry>
  ): AccountApple_VarsEntry {
    const message = { ...baseAccountApple_VarsEntry } as AccountApple_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountCustom: object = { id: "" };

export const AccountCustom = {
  encode(
    message: AccountCustom,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountCustom_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountCustom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountCustom } as AccountCustom;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          const entry2 = AccountCustom_VarsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountCustom {
    const message = { ...baseAccountCustom } as AccountCustom;
    message.vars = {};
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountCustom): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountCustom>): AccountCustom {
    const message = { ...baseAccountCustom } as AccountCustom;
    message.vars = {};
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountCustom_VarsEntry: object = { key: "", value: "" };

export const AccountCustom_VarsEntry = {
  encode(
    message: AccountCustom_VarsEntry,
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
  ): AccountCustom_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAccountCustom_VarsEntry,
    } as AccountCustom_VarsEntry;
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

  fromJSON(object: any): AccountCustom_VarsEntry {
    const message = {
      ...baseAccountCustom_VarsEntry,
    } as AccountCustom_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountCustom_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountCustom_VarsEntry>
  ): AccountCustom_VarsEntry {
    const message = {
      ...baseAccountCustom_VarsEntry,
    } as AccountCustom_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountDevice: object = { id: "" };

export const AccountDevice = {
  encode(
    message: AccountDevice,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountDevice_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountDevice {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountDevice } as AccountDevice;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          const entry2 = AccountDevice_VarsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountDevice {
    const message = { ...baseAccountDevice } as AccountDevice;
    message.vars = {};
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountDevice): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountDevice>): AccountDevice {
    const message = { ...baseAccountDevice } as AccountDevice;
    message.vars = {};
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountDevice_VarsEntry: object = { key: "", value: "" };

export const AccountDevice_VarsEntry = {
  encode(
    message: AccountDevice_VarsEntry,
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
  ): AccountDevice_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAccountDevice_VarsEntry,
    } as AccountDevice_VarsEntry;
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

  fromJSON(object: any): AccountDevice_VarsEntry {
    const message = {
      ...baseAccountDevice_VarsEntry,
    } as AccountDevice_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountDevice_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountDevice_VarsEntry>
  ): AccountDevice_VarsEntry {
    const message = {
      ...baseAccountDevice_VarsEntry,
    } as AccountDevice_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountEmail: object = { email: "", password: "" };

export const AccountEmail = {
  encode(
    message: AccountEmail,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountEmail_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountEmail {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountEmail } as AccountEmail;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        case 3:
          const entry3 = AccountEmail_VarsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.vars[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountEmail {
    const message = { ...baseAccountEmail } as AccountEmail;
    message.vars = {};
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = String(object.password);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountEmail): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountEmail>): AccountEmail {
    const message = { ...baseAccountEmail } as AccountEmail;
    message.vars = {};
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = object.password;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountEmail_VarsEntry: object = { key: "", value: "" };

export const AccountEmail_VarsEntry = {
  encode(
    message: AccountEmail_VarsEntry,
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
  ): AccountEmail_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountEmail_VarsEntry } as AccountEmail_VarsEntry;
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

  fromJSON(object: any): AccountEmail_VarsEntry {
    const message = { ...baseAccountEmail_VarsEntry } as AccountEmail_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountEmail_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountEmail_VarsEntry>
  ): AccountEmail_VarsEntry {
    const message = { ...baseAccountEmail_VarsEntry } as AccountEmail_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountFacebook: object = { token: "" };

export const AccountFacebook = {
  encode(
    message: AccountFacebook,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountFacebook_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebook {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountFacebook } as AccountFacebook;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountFacebook_VarsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountFacebook {
    const message = { ...baseAccountFacebook } as AccountFacebook;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountFacebook): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountFacebook>): AccountFacebook {
    const message = { ...baseAccountFacebook } as AccountFacebook;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountFacebook_VarsEntry: object = { key: "", value: "" };

export const AccountFacebook_VarsEntry = {
  encode(
    message: AccountFacebook_VarsEntry,
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
  ): AccountFacebook_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAccountFacebook_VarsEntry,
    } as AccountFacebook_VarsEntry;
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

  fromJSON(object: any): AccountFacebook_VarsEntry {
    const message = {
      ...baseAccountFacebook_VarsEntry,
    } as AccountFacebook_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountFacebook_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountFacebook_VarsEntry>
  ): AccountFacebook_VarsEntry {
    const message = {
      ...baseAccountFacebook_VarsEntry,
    } as AccountFacebook_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountFacebookInstantGame: object = { signed_player_info: "" };

export const AccountFacebookInstantGame = {
  encode(
    message: AccountFacebookInstantGame,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signed_player_info !== "") {
      writer.uint32(10).string(message.signed_player_info);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountFacebookInstantGame_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AccountFacebookInstantGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAccountFacebookInstantGame,
    } as AccountFacebookInstantGame;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signed_player_info = reader.string();
          break;
        case 2:
          const entry2 = AccountFacebookInstantGame_VarsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountFacebookInstantGame {
    const message = {
      ...baseAccountFacebookInstantGame,
    } as AccountFacebookInstantGame;
    message.vars = {};
    if (
      object.signed_player_info !== undefined &&
      object.signed_player_info !== null
    ) {
      message.signed_player_info = String(object.signed_player_info);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountFacebookInstantGame): unknown {
    const obj: any = {};
    message.signed_player_info !== undefined &&
      (obj.signed_player_info = message.signed_player_info);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountFacebookInstantGame>
  ): AccountFacebookInstantGame {
    const message = {
      ...baseAccountFacebookInstantGame,
    } as AccountFacebookInstantGame;
    message.vars = {};
    if (
      object.signed_player_info !== undefined &&
      object.signed_player_info !== null
    ) {
      message.signed_player_info = object.signed_player_info;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountFacebookInstantGame_VarsEntry: object = { key: "", value: "" };

export const AccountFacebookInstantGame_VarsEntry = {
  encode(
    message: AccountFacebookInstantGame_VarsEntry,
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
  ): AccountFacebookInstantGame_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAccountFacebookInstantGame_VarsEntry,
    } as AccountFacebookInstantGame_VarsEntry;
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

  fromJSON(object: any): AccountFacebookInstantGame_VarsEntry {
    const message = {
      ...baseAccountFacebookInstantGame_VarsEntry,
    } as AccountFacebookInstantGame_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountFacebookInstantGame_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountFacebookInstantGame_VarsEntry>
  ): AccountFacebookInstantGame_VarsEntry {
    const message = {
      ...baseAccountFacebookInstantGame_VarsEntry,
    } as AccountFacebookInstantGame_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountGameCenter: object = {
  player_id: "",
  bundle_id: "",
  timestamp_seconds: 0,
  salt: "",
  signature: "",
  public_key_url: "",
};

export const AccountGameCenter = {
  encode(
    message: AccountGameCenter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.player_id !== "") {
      writer.uint32(10).string(message.player_id);
    }
    if (message.bundle_id !== "") {
      writer.uint32(18).string(message.bundle_id);
    }
    if (message.timestamp_seconds !== 0) {
      writer.uint32(24).int64(message.timestamp_seconds);
    }
    if (message.salt !== "") {
      writer.uint32(34).string(message.salt);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    if (message.public_key_url !== "") {
      writer.uint32(50).string(message.public_key_url);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountGameCenter_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(58).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountGameCenter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountGameCenter } as AccountGameCenter;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.player_id = reader.string();
          break;
        case 2:
          message.bundle_id = reader.string();
          break;
        case 3:
          message.timestamp_seconds = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.salt = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        case 6:
          message.public_key_url = reader.string();
          break;
        case 7:
          const entry7 = AccountGameCenter_VarsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry7.value !== undefined) {
            message.vars[entry7.key] = entry7.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountGameCenter {
    const message = { ...baseAccountGameCenter } as AccountGameCenter;
    message.vars = {};
    if (object.player_id !== undefined && object.player_id !== null) {
      message.player_id = String(object.player_id);
    }
    if (object.bundle_id !== undefined && object.bundle_id !== null) {
      message.bundle_id = String(object.bundle_id);
    }
    if (
      object.timestamp_seconds !== undefined &&
      object.timestamp_seconds !== null
    ) {
      message.timestamp_seconds = Number(object.timestamp_seconds);
    }
    if (object.salt !== undefined && object.salt !== null) {
      message.salt = String(object.salt);
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = String(object.signature);
    }
    if (object.public_key_url !== undefined && object.public_key_url !== null) {
      message.public_key_url = String(object.public_key_url);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountGameCenter): unknown {
    const obj: any = {};
    message.player_id !== undefined && (obj.player_id = message.player_id);
    message.bundle_id !== undefined && (obj.bundle_id = message.bundle_id);
    message.timestamp_seconds !== undefined &&
      (obj.timestamp_seconds = message.timestamp_seconds);
    message.salt !== undefined && (obj.salt = message.salt);
    message.signature !== undefined && (obj.signature = message.signature);
    message.public_key_url !== undefined &&
      (obj.public_key_url = message.public_key_url);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountGameCenter>): AccountGameCenter {
    const message = { ...baseAccountGameCenter } as AccountGameCenter;
    message.vars = {};
    if (object.player_id !== undefined && object.player_id !== null) {
      message.player_id = object.player_id;
    }
    if (object.bundle_id !== undefined && object.bundle_id !== null) {
      message.bundle_id = object.bundle_id;
    }
    if (
      object.timestamp_seconds !== undefined &&
      object.timestamp_seconds !== null
    ) {
      message.timestamp_seconds = object.timestamp_seconds;
    }
    if (object.salt !== undefined && object.salt !== null) {
      message.salt = object.salt;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    if (object.public_key_url !== undefined && object.public_key_url !== null) {
      message.public_key_url = object.public_key_url;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountGameCenter_VarsEntry: object = { key: "", value: "" };

export const AccountGameCenter_VarsEntry = {
  encode(
    message: AccountGameCenter_VarsEntry,
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
  ): AccountGameCenter_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAccountGameCenter_VarsEntry,
    } as AccountGameCenter_VarsEntry;
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

  fromJSON(object: any): AccountGameCenter_VarsEntry {
    const message = {
      ...baseAccountGameCenter_VarsEntry,
    } as AccountGameCenter_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountGameCenter_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountGameCenter_VarsEntry>
  ): AccountGameCenter_VarsEntry {
    const message = {
      ...baseAccountGameCenter_VarsEntry,
    } as AccountGameCenter_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountGoogle: object = { token: "" };

export const AccountGoogle = {
  encode(
    message: AccountGoogle,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountGoogle_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountGoogle {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountGoogle } as AccountGoogle;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountGoogle_VarsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountGoogle {
    const message = { ...baseAccountGoogle } as AccountGoogle;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountGoogle): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountGoogle>): AccountGoogle {
    const message = { ...baseAccountGoogle } as AccountGoogle;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountGoogle_VarsEntry: object = { key: "", value: "" };

export const AccountGoogle_VarsEntry = {
  encode(
    message: AccountGoogle_VarsEntry,
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
  ): AccountGoogle_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAccountGoogle_VarsEntry,
    } as AccountGoogle_VarsEntry;
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

  fromJSON(object: any): AccountGoogle_VarsEntry {
    const message = {
      ...baseAccountGoogle_VarsEntry,
    } as AccountGoogle_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountGoogle_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountGoogle_VarsEntry>
  ): AccountGoogle_VarsEntry {
    const message = {
      ...baseAccountGoogle_VarsEntry,
    } as AccountGoogle_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAccountSteam: object = { token: "" };

export const AccountSteam = {
  encode(
    message: AccountSteam,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountSteam_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountSteam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountSteam } as AccountSteam;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountSteam_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountSteam {
    const message = { ...baseAccountSteam } as AccountSteam;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: AccountSteam): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AccountSteam>): AccountSteam {
    const message = { ...baseAccountSteam } as AccountSteam;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseAccountSteam_VarsEntry: object = { key: "", value: "" };

export const AccountSteam_VarsEntry = {
  encode(
    message: AccountSteam_VarsEntry,
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
  ): AccountSteam_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccountSteam_VarsEntry } as AccountSteam_VarsEntry;
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

  fromJSON(object: any): AccountSteam_VarsEntry {
    const message = { ...baseAccountSteam_VarsEntry } as AccountSteam_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: AccountSteam_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AccountSteam_VarsEntry>
  ): AccountSteam_VarsEntry {
    const message = { ...baseAccountSteam_VarsEntry } as AccountSteam_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseAddFriendsRequest: object = { ids: "", usernames: "" };

export const AddFriendsRequest = {
  encode(
    message: AddFriendsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAddFriendsRequest } as AddFriendsRequest;
    message.ids = [];
    message.usernames = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
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

  fromJSON(object: any): AddFriendsRequest {
    const message = { ...baseAddFriendsRequest } as AddFriendsRequest;
    message.ids = [];
    message.usernames = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    if (object.usernames !== undefined && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: AddFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AddFriendsRequest>): AddFriendsRequest {
    const message = { ...baseAddFriendsRequest } as AddFriendsRequest;
    message.ids = [];
    message.usernames = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(e);
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

const baseAddGroupUsersRequest: object = { group_id: "", user_ids: "" };

export const AddGroupUsersRequest = {
  encode(
    message: AddGroupUsersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAddGroupUsersRequest } as AddGroupUsersRequest;
    message.user_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddGroupUsersRequest {
    const message = { ...baseAddGroupUsersRequest } as AddGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: AddGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<AddGroupUsersRequest>): AddGroupUsersRequest {
    const message = { ...baseAddGroupUsersRequest } as AddGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    return message;
  },
};

const baseSessionRefreshRequest: object = { token: "" };

export const SessionRefreshRequest = {
  encode(
    message: SessionRefreshRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      SessionRefreshRequest_VarsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SessionRefreshRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSessionRefreshRequest } as SessionRefreshRequest;
    message.vars = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = SessionRefreshRequest_VarsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionRefreshRequest {
    const message = { ...baseSessionRefreshRequest } as SessionRefreshRequest;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        message.vars[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: SessionRefreshRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<SessionRefreshRequest>
  ): SessionRefreshRequest {
    const message = { ...baseSessionRefreshRequest } as SessionRefreshRequest;
    message.vars = {};
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.vars !== undefined && object.vars !== null) {
      Object.entries(object.vars).forEach(([key, value]) => {
        if (value !== undefined) {
          message.vars[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseSessionRefreshRequest_VarsEntry: object = { key: "", value: "" };

export const SessionRefreshRequest_VarsEntry = {
  encode(
    message: SessionRefreshRequest_VarsEntry,
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
  ): SessionRefreshRequest_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSessionRefreshRequest_VarsEntry,
    } as SessionRefreshRequest_VarsEntry;
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

  fromJSON(object: any): SessionRefreshRequest_VarsEntry {
    const message = {
      ...baseSessionRefreshRequest_VarsEntry,
    } as SessionRefreshRequest_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: SessionRefreshRequest_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<SessionRefreshRequest_VarsEntry>
  ): SessionRefreshRequest_VarsEntry {
    const message = {
      ...baseSessionRefreshRequest_VarsEntry,
    } as SessionRefreshRequest_VarsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseSessionLogoutRequest: object = { token: "", refresh_token: "" };

export const SessionLogoutRequest = {
  encode(
    message: SessionLogoutRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.refresh_token !== "") {
      writer.uint32(18).string(message.refresh_token);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SessionLogoutRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSessionLogoutRequest } as SessionLogoutRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          message.refresh_token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionLogoutRequest {
    const message = { ...baseSessionLogoutRequest } as SessionLogoutRequest;
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    }
    if (object.refresh_token !== undefined && object.refresh_token !== null) {
      message.refresh_token = String(object.refresh_token);
    }
    return message;
  },

  toJSON(message: SessionLogoutRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    message.refresh_token !== undefined &&
      (obj.refresh_token = message.refresh_token);
    return obj;
  },

  fromPartial(object: DeepPartial<SessionLogoutRequest>): SessionLogoutRequest {
    const message = { ...baseSessionLogoutRequest } as SessionLogoutRequest;
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.refresh_token !== undefined && object.refresh_token !== null) {
      message.refresh_token = object.refresh_token;
    }
    return message;
  },
};

const baseAuthenticateAppleRequest: object = { username: "" };

export const AuthenticateAppleRequest = {
  encode(
    message: AuthenticateAppleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountApple.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateAppleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateAppleRequest,
    } as AuthenticateAppleRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountApple.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateAppleRequest {
    const message = {
      ...baseAuthenticateAppleRequest,
    } as AuthenticateAppleRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountApple.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    return message;
  },

  toJSON(message: AuthenticateAppleRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountApple.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateAppleRequest>
  ): AuthenticateAppleRequest {
    const message = {
      ...baseAuthenticateAppleRequest,
    } as AuthenticateAppleRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountApple.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    return message;
  },
};

const baseAuthenticateCustomRequest: object = { username: "" };

export const AuthenticateCustomRequest = {
  encode(
    message: AuthenticateCustomRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountCustom.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateCustomRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateCustomRequest,
    } as AuthenticateCustomRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountCustom.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateCustomRequest {
    const message = {
      ...baseAuthenticateCustomRequest,
    } as AuthenticateCustomRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountCustom.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    return message;
  },

  toJSON(message: AuthenticateCustomRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountCustom.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateCustomRequest>
  ): AuthenticateCustomRequest {
    const message = {
      ...baseAuthenticateCustomRequest,
    } as AuthenticateCustomRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountCustom.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    return message;
  },
};

const baseAuthenticateDeviceRequest: object = { username: "" };

export const AuthenticateDeviceRequest = {
  encode(
    message: AuthenticateDeviceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountDevice.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateDeviceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateDeviceRequest,
    } as AuthenticateDeviceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountDevice.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateDeviceRequest {
    const message = {
      ...baseAuthenticateDeviceRequest,
    } as AuthenticateDeviceRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountDevice.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    return message;
  },

  toJSON(message: AuthenticateDeviceRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountDevice.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateDeviceRequest>
  ): AuthenticateDeviceRequest {
    const message = {
      ...baseAuthenticateDeviceRequest,
    } as AuthenticateDeviceRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountDevice.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    return message;
  },
};

const baseAuthenticateEmailRequest: object = { username: "" };

export const AuthenticateEmailRequest = {
  encode(
    message: AuthenticateEmailRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountEmail.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateEmailRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateEmailRequest,
    } as AuthenticateEmailRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountEmail.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateEmailRequest {
    const message = {
      ...baseAuthenticateEmailRequest,
    } as AuthenticateEmailRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountEmail.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    return message;
  },

  toJSON(message: AuthenticateEmailRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountEmail.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateEmailRequest>
  ): AuthenticateEmailRequest {
    const message = {
      ...baseAuthenticateEmailRequest,
    } as AuthenticateEmailRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountEmail.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    return message;
  },
};

const baseAuthenticateFacebookRequest: object = { username: "" };

export const AuthenticateFacebookRequest = {
  encode(
    message: AuthenticateFacebookRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountFacebook.encode(
        message.account,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.sync !== undefined) {
      BoolValue.encode(
        { value: message.sync! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateFacebookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateFacebookRequest,
    } as AuthenticateFacebookRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountFacebook.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateFacebookRequest {
    const message = {
      ...baseAuthenticateFacebookRequest,
    } as AuthenticateFacebookRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountFacebook.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.sync !== undefined && object.sync !== null) {
      message.sync = Boolean(object.sync);
    }
    return message;
  },

  toJSON(message: AuthenticateFacebookRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountFacebook.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateFacebookRequest>
  ): AuthenticateFacebookRequest {
    const message = {
      ...baseAuthenticateFacebookRequest,
    } as AuthenticateFacebookRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountFacebook.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    if (object.sync !== undefined && object.sync !== null) {
      message.sync = object.sync;
    }
    return message;
  },
};

const baseAuthenticateFacebookInstantGameRequest: object = { username: "" };

export const AuthenticateFacebookInstantGameRequest = {
  encode(
    message: AuthenticateFacebookInstantGameRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountFacebookInstantGame.encode(
        message.account,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateFacebookInstantGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateFacebookInstantGameRequest,
    } as AuthenticateFacebookInstantGameRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountFacebookInstantGame.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateFacebookInstantGameRequest {
    const message = {
      ...baseAuthenticateFacebookInstantGameRequest,
    } as AuthenticateFacebookInstantGameRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountFacebookInstantGame.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    return message;
  },

  toJSON(message: AuthenticateFacebookInstantGameRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountFacebookInstantGame.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateFacebookInstantGameRequest>
  ): AuthenticateFacebookInstantGameRequest {
    const message = {
      ...baseAuthenticateFacebookInstantGameRequest,
    } as AuthenticateFacebookInstantGameRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountFacebookInstantGame.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    return message;
  },
};

const baseAuthenticateGameCenterRequest: object = { username: "" };

export const AuthenticateGameCenterRequest = {
  encode(
    message: AuthenticateGameCenterRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountGameCenter.encode(
        message.account,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateGameCenterRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateGameCenterRequest,
    } as AuthenticateGameCenterRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountGameCenter.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateGameCenterRequest {
    const message = {
      ...baseAuthenticateGameCenterRequest,
    } as AuthenticateGameCenterRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountGameCenter.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    return message;
  },

  toJSON(message: AuthenticateGameCenterRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountGameCenter.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateGameCenterRequest>
  ): AuthenticateGameCenterRequest {
    const message = {
      ...baseAuthenticateGameCenterRequest,
    } as AuthenticateGameCenterRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountGameCenter.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    return message;
  },
};

const baseAuthenticateGoogleRequest: object = { username: "" };

export const AuthenticateGoogleRequest = {
  encode(
    message: AuthenticateGoogleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountGoogle.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateGoogleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateGoogleRequest,
    } as AuthenticateGoogleRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountGoogle.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateGoogleRequest {
    const message = {
      ...baseAuthenticateGoogleRequest,
    } as AuthenticateGoogleRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountGoogle.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    return message;
  },

  toJSON(message: AuthenticateGoogleRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountGoogle.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateGoogleRequest>
  ): AuthenticateGoogleRequest {
    const message = {
      ...baseAuthenticateGoogleRequest,
    } as AuthenticateGoogleRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountGoogle.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    return message;
  },
};

const baseAuthenticateSteamRequest: object = { username: "" };

export const AuthenticateSteamRequest = {
  encode(
    message: AuthenticateSteamRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountSteam.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode(
        { value: message.create! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.sync !== undefined) {
      BoolValue.encode(
        { value: message.sync! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticateSteamRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAuthenticateSteamRequest,
    } as AuthenticateSteamRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountSteam.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateSteamRequest {
    const message = {
      ...baseAuthenticateSteamRequest,
    } as AuthenticateSteamRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountSteam.fromJSON(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = Boolean(object.create);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.sync !== undefined && object.sync !== null) {
      message.sync = Boolean(object.sync);
    }
    return message;
  },

  toJSON(message: AuthenticateSteamRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountSteam.toJSON(message.account)
        : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AuthenticateSteamRequest>
  ): AuthenticateSteamRequest {
    const message = {
      ...baseAuthenticateSteamRequest,
    } as AuthenticateSteamRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountSteam.fromPartial(object.account);
    }
    if (object.create !== undefined && object.create !== null) {
      message.create = object.create;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    if (object.sync !== undefined && object.sync !== null) {
      message.sync = object.sync;
    }
    return message;
  },
};

const baseBanGroupUsersRequest: object = { group_id: "", user_ids: "" };

export const BanGroupUsersRequest = {
  encode(
    message: BanGroupUsersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BanGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBanGroupUsersRequest } as BanGroupUsersRequest;
    message.user_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BanGroupUsersRequest {
    const message = { ...baseBanGroupUsersRequest } as BanGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: BanGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<BanGroupUsersRequest>): BanGroupUsersRequest {
    const message = { ...baseBanGroupUsersRequest } as BanGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    return message;
  },
};

const baseBlockFriendsRequest: object = { ids: "", usernames: "" };

export const BlockFriendsRequest = {
  encode(
    message: BlockFriendsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBlockFriendsRequest } as BlockFriendsRequest;
    message.ids = [];
    message.usernames = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
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

  fromJSON(object: any): BlockFriendsRequest {
    const message = { ...baseBlockFriendsRequest } as BlockFriendsRequest;
    message.ids = [];
    message.usernames = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    if (object.usernames !== undefined && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: BlockFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<BlockFriendsRequest>): BlockFriendsRequest {
    const message = { ...baseBlockFriendsRequest } as BlockFriendsRequest;
    message.ids = [];
    message.usernames = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(e);
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

const baseChannelMessage: object = {
  channel_id: "",
  message_id: "",
  sender_id: "",
  username: "",
  content: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: "",
};

export const ChannelMessage = {
  encode(
    message: ChannelMessage,
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
    if (message.sender_id !== "") {
      writer.uint32(34).string(message.sender_id);
    }
    if (message.username !== "") {
      writer.uint32(42).string(message.username);
    }
    if (message.content !== "") {
      writer.uint32(50).string(message.content);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.persistent !== undefined) {
      BoolValue.encode(
        { value: message.persistent! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(82).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(90).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(98).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(106).string(message.user_id_two);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelMessage } as ChannelMessage;
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
          message.sender_id = reader.string();
          break;
        case 5:
          message.username = reader.string();
          break;
        case 6:
          message.content = reader.string();
          break;
        case 7:
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.persistent = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 10:
          message.room_name = reader.string();
          break;
        case 11:
          message.group_id = reader.string();
          break;
        case 12:
          message.user_id_one = reader.string();
          break;
        case 13:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessage {
    const message = { ...baseChannelMessage } as ChannelMessage;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = String(object.message_id);
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = Number(object.code);
    }
    if (object.sender_id !== undefined && object.sender_id !== null) {
      message.sender_id = String(object.sender_id);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
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

  toJSON(message: ChannelMessage): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.code !== undefined && (obj.code = message.code);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.username !== undefined && (obj.username = message.username);
    message.content !== undefined && (obj.content = message.content);
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

  fromPartial(object: DeepPartial<ChannelMessage>): ChannelMessage {
    const message = { ...baseChannelMessage } as ChannelMessage;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.message_id !== undefined && object.message_id !== null) {
      message.message_id = object.message_id;
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    }
    if (object.sender_id !== undefined && object.sender_id !== null) {
      message.sender_id = object.sender_id;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
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
};

const baseChannelMessageList: object = {
  next_cursor: "",
  prev_cursor: "",
  cacheable_cursor: "",
};

export const ChannelMessageList = {
  encode(
    message: ChannelMessageList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.messages) {
      ChannelMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.next_cursor !== "") {
      writer.uint32(18).string(message.next_cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(26).string(message.prev_cursor);
    }
    if (message.cacheable_cursor !== "") {
      writer.uint32(34).string(message.cacheable_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChannelMessageList } as ChannelMessageList;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(ChannelMessage.decode(reader, reader.uint32()));
          break;
        case 2:
          message.next_cursor = reader.string();
          break;
        case 3:
          message.prev_cursor = reader.string();
          break;
        case 4:
          message.cacheable_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageList {
    const message = { ...baseChannelMessageList } as ChannelMessageList;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ChannelMessage.fromJSON(e));
      }
    }
    if (object.next_cursor !== undefined && object.next_cursor !== null) {
      message.next_cursor = String(object.next_cursor);
    }
    if (object.prev_cursor !== undefined && object.prev_cursor !== null) {
      message.prev_cursor = String(object.prev_cursor);
    }
    if (
      object.cacheable_cursor !== undefined &&
      object.cacheable_cursor !== null
    ) {
      message.cacheable_cursor = String(object.cacheable_cursor);
    }
    return message;
  },

  toJSON(message: ChannelMessageList): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? ChannelMessage.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    message.next_cursor !== undefined &&
      (obj.next_cursor = message.next_cursor);
    message.prev_cursor !== undefined &&
      (obj.prev_cursor = message.prev_cursor);
    message.cacheable_cursor !== undefined &&
      (obj.cacheable_cursor = message.cacheable_cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<ChannelMessageList>): ChannelMessageList {
    const message = { ...baseChannelMessageList } as ChannelMessageList;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ChannelMessage.fromPartial(e));
      }
    }
    if (object.next_cursor !== undefined && object.next_cursor !== null) {
      message.next_cursor = object.next_cursor;
    }
    if (object.prev_cursor !== undefined && object.prev_cursor !== null) {
      message.prev_cursor = object.prev_cursor;
    }
    if (
      object.cacheable_cursor !== undefined &&
      object.cacheable_cursor !== null
    ) {
      message.cacheable_cursor = object.cacheable_cursor;
    }
    return message;
  },
};

const baseCreateGroupRequest: object = {
  name: "",
  description: "",
  lang_tag: "",
  avatar_url: "",
  open: false,
  max_count: 0,
};

export const CreateGroupRequest = {
  encode(
    message: CreateGroupRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.lang_tag !== "") {
      writer.uint32(26).string(message.lang_tag);
    }
    if (message.avatar_url !== "") {
      writer.uint32(34).string(message.avatar_url);
    }
    if (message.open === true) {
      writer.uint32(40).bool(message.open);
    }
    if (message.max_count !== 0) {
      writer.uint32(48).int32(message.max_count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateGroupRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateGroupRequest } as CreateGroupRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.lang_tag = reader.string();
          break;
        case 4:
          message.avatar_url = reader.string();
          break;
        case 5:
          message.open = reader.bool();
          break;
        case 6:
          message.max_count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateGroupRequest {
    const message = { ...baseCreateGroupRequest } as CreateGroupRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = String(object.lang_tag);
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = String(object.avatar_url);
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = Boolean(object.open);
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    }
    return message;
  },

  toJSON(message: CreateGroupRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.open !== undefined && (obj.open = message.open);
    message.max_count !== undefined && (obj.max_count = message.max_count);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateGroupRequest>): CreateGroupRequest {
    const message = { ...baseCreateGroupRequest } as CreateGroupRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = object.lang_tag;
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = object.avatar_url;
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = object.open;
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = object.max_count;
    }
    return message;
  },
};

const baseDeleteFriendsRequest: object = { ids: "", usernames: "" };

export const DeleteFriendsRequest = {
  encode(
    message: DeleteFriendsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteFriendsRequest } as DeleteFriendsRequest;
    message.ids = [];
    message.usernames = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
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

  fromJSON(object: any): DeleteFriendsRequest {
    const message = { ...baseDeleteFriendsRequest } as DeleteFriendsRequest;
    message.ids = [];
    message.usernames = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    if (object.usernames !== undefined && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: DeleteFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteFriendsRequest>): DeleteFriendsRequest {
    const message = { ...baseDeleteFriendsRequest } as DeleteFriendsRequest;
    message.ids = [];
    message.usernames = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(e);
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

const baseDeleteGroupRequest: object = { group_id: "" };

export const DeleteGroupRequest = {
  encode(
    message: DeleteGroupRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteGroupRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteGroupRequest } as DeleteGroupRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteGroupRequest {
    const message = { ...baseDeleteGroupRequest } as DeleteGroupRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    return message;
  },

  toJSON(message: DeleteGroupRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteGroupRequest>): DeleteGroupRequest {
    const message = { ...baseDeleteGroupRequest } as DeleteGroupRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    return message;
  },
};

const baseDeleteLeaderboardRecordRequest: object = { leaderboard_id: "" };

export const DeleteLeaderboardRecordRequest = {
  encode(
    message: DeleteLeaderboardRecordRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteLeaderboardRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteLeaderboardRecordRequest,
    } as DeleteLeaderboardRecordRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaderboard_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteLeaderboardRecordRequest {
    const message = {
      ...baseDeleteLeaderboardRecordRequest,
    } as DeleteLeaderboardRecordRequest;
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = String(object.leaderboard_id);
    }
    return message;
  },

  toJSON(message: DeleteLeaderboardRecordRequest): unknown {
    const obj: any = {};
    message.leaderboard_id !== undefined &&
      (obj.leaderboard_id = message.leaderboard_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteLeaderboardRecordRequest>
  ): DeleteLeaderboardRecordRequest {
    const message = {
      ...baseDeleteLeaderboardRecordRequest,
    } as DeleteLeaderboardRecordRequest;
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = object.leaderboard_id;
    }
    return message;
  },
};

const baseDeleteNotificationsRequest: object = { ids: "" };

export const DeleteNotificationsRequest = {
  encode(
    message: DeleteNotificationsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteNotificationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteNotificationsRequest,
    } as DeleteNotificationsRequest;
    message.ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteNotificationsRequest {
    const message = {
      ...baseDeleteNotificationsRequest,
    } as DeleteNotificationsRequest;
    message.ids = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: DeleteNotificationsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteNotificationsRequest>
  ): DeleteNotificationsRequest {
    const message = {
      ...baseDeleteNotificationsRequest,
    } as DeleteNotificationsRequest;
    message.ids = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(e);
      }
    }
    return message;
  },
};

const baseDeleteStorageObjectId: object = {
  collection: "",
  key: "",
  version: "",
};

export const DeleteStorageObjectId = {
  encode(
    message: DeleteStorageObjectId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteStorageObjectId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteStorageObjectId } as DeleteStorageObjectId;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteStorageObjectId {
    const message = { ...baseDeleteStorageObjectId } as DeleteStorageObjectId;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = String(object.collection);
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    }
    return message;
  },

  toJSON(message: DeleteStorageObjectId): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteStorageObjectId>
  ): DeleteStorageObjectId {
    const message = { ...baseDeleteStorageObjectId } as DeleteStorageObjectId;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = object.collection;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    return message;
  },
};

const baseDeleteStorageObjectsRequest: object = {};

export const DeleteStorageObjectsRequest = {
  encode(
    message: DeleteStorageObjectsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.object_ids) {
      DeleteStorageObjectId.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteStorageObjectsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteStorageObjectsRequest,
    } as DeleteStorageObjectsRequest;
    message.object_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.object_ids.push(
            DeleteStorageObjectId.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteStorageObjectsRequest {
    const message = {
      ...baseDeleteStorageObjectsRequest,
    } as DeleteStorageObjectsRequest;
    message.object_ids = [];
    if (object.object_ids !== undefined && object.object_ids !== null) {
      for (const e of object.object_ids) {
        message.object_ids.push(DeleteStorageObjectId.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: DeleteStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.object_ids) {
      obj.object_ids = message.object_ids.map((e) =>
        e ? DeleteStorageObjectId.toJSON(e) : undefined
      );
    } else {
      obj.object_ids = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteStorageObjectsRequest>
  ): DeleteStorageObjectsRequest {
    const message = {
      ...baseDeleteStorageObjectsRequest,
    } as DeleteStorageObjectsRequest;
    message.object_ids = [];
    if (object.object_ids !== undefined && object.object_ids !== null) {
      for (const e of object.object_ids) {
        message.object_ids.push(DeleteStorageObjectId.fromPartial(e));
      }
    }
    return message;
  },
};

const baseEvent: object = { name: "", external: false };

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.properties).forEach(([key, value]) => {
      Event_PropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.external === true) {
      writer.uint32(32).bool(message.external);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvent } as Event;
    message.properties = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          const entry2 = Event_PropertiesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.properties[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.external = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    const message = { ...baseEvent } as Event;
    message.properties = {};
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    }
    if (object.properties !== undefined && object.properties !== null) {
      Object.entries(object.properties).forEach(([key, value]) => {
        message.properties[key] = String(value);
      });
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp);
    }
    if (object.external !== undefined && object.external !== null) {
      message.external = Boolean(object.external);
    }
    return message;
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    obj.properties = {};
    if (message.properties) {
      Object.entries(message.properties).forEach(([k, v]) => {
        obj.properties[k] = v;
      });
    }
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.external !== undefined && (obj.external = message.external);
    return obj;
  },

  fromPartial(object: DeepPartial<Event>): Event {
    const message = { ...baseEvent } as Event;
    message.properties = {};
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.properties !== undefined && object.properties !== null) {
      Object.entries(object.properties).forEach(([key, value]) => {
        if (value !== undefined) {
          message.properties[key] = String(value);
        }
      });
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    }
    if (object.external !== undefined && object.external !== null) {
      message.external = object.external;
    }
    return message;
  },
};

const baseEvent_PropertiesEntry: object = { key: "", value: "" };

export const Event_PropertiesEntry = {
  encode(
    message: Event_PropertiesEntry,
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
  ): Event_PropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvent_PropertiesEntry } as Event_PropertiesEntry;
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

  fromJSON(object: any): Event_PropertiesEntry {
    const message = { ...baseEvent_PropertiesEntry } as Event_PropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },

  toJSON(message: Event_PropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Event_PropertiesEntry>
  ): Event_PropertiesEntry {
    const message = { ...baseEvent_PropertiesEntry } as Event_PropertiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
};

const baseFriend: object = {};

export const Friend = {
  encode(
    message: Friend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode(
        { value: message.state! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Friend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFriend } as Friend;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Friend {
    const message = { ...baseFriend } as Friend;
    if (object.user !== undefined && object.user !== null) {
      message.user = User.fromJSON(object.user);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = Number(object.state);
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    }
    return message;
  },

  toJSON(message: Friend): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.state !== undefined && (obj.state = message.state);
    message.update_time !== undefined &&
      (obj.update_time = message.update_time.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Friend>): Friend {
    const message = { ...baseFriend } as Friend;
    if (object.user !== undefined && object.user !== null) {
      message.user = User.fromPartial(object.user);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    return message;
  },
};

const baseFriendList: object = { cursor: "" };

export const FriendList = {
  encode(
    message: FriendList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.friends) {
      Friend.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FriendList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFriendList } as FriendList;
    message.friends = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.friends.push(Friend.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FriendList {
    const message = { ...baseFriendList } as FriendList;
    message.friends = [];
    if (object.friends !== undefined && object.friends !== null) {
      for (const e of object.friends) {
        message.friends.push(Friend.fromJSON(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: FriendList): unknown {
    const obj: any = {};
    if (message.friends) {
      obj.friends = message.friends.map((e) =>
        e ? Friend.toJSON(e) : undefined
      );
    } else {
      obj.friends = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<FriendList>): FriendList {
    const message = { ...baseFriendList } as FriendList;
    message.friends = [];
    if (object.friends !== undefined && object.friends !== null) {
      for (const e of object.friends) {
        message.friends.push(Friend.fromPartial(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseGetUsersRequest: object = {
  ids: "",
  usernames: "",
  facebook_ids: "",
};

export const GetUsersRequest = {
  encode(
    message: GetUsersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.facebook_ids) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetUsersRequest } as GetUsersRequest;
    message.ids = [];
    message.usernames = [];
    message.facebook_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        case 3:
          message.facebook_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUsersRequest {
    const message = { ...baseGetUsersRequest } as GetUsersRequest;
    message.ids = [];
    message.usernames = [];
    message.facebook_ids = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    if (object.usernames !== undefined && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(String(e));
      }
    }
    if (object.facebook_ids !== undefined && object.facebook_ids !== null) {
      for (const e of object.facebook_ids) {
        message.facebook_ids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: GetUsersRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    if (message.facebook_ids) {
      obj.facebook_ids = message.facebook_ids.map((e) => e);
    } else {
      obj.facebook_ids = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GetUsersRequest>): GetUsersRequest {
    const message = { ...baseGetUsersRequest } as GetUsersRequest;
    message.ids = [];
    message.usernames = [];
    message.facebook_ids = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(e);
      }
    }
    if (object.usernames !== undefined && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(e);
      }
    }
    if (object.facebook_ids !== undefined && object.facebook_ids !== null) {
      for (const e of object.facebook_ids) {
        message.facebook_ids.push(e);
      }
    }
    return message;
  },
};

const baseGroup: object = {
  id: "",
  creator_id: "",
  name: "",
  description: "",
  lang_tag: "",
  metadata: "",
  avatar_url: "",
  edge_count: 0,
  max_count: 0,
};

export const Group = {
  encode(message: Group, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.creator_id !== "") {
      writer.uint32(18).string(message.creator_id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.lang_tag !== "") {
      writer.uint32(42).string(message.lang_tag);
    }
    if (message.metadata !== "") {
      writer.uint32(50).string(message.metadata);
    }
    if (message.avatar_url !== "") {
      writer.uint32(58).string(message.avatar_url);
    }
    if (message.open !== undefined) {
      BoolValue.encode(
        { value: message.open! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.edge_count !== 0) {
      writer.uint32(72).int32(message.edge_count);
    }
    if (message.max_count !== 0) {
      writer.uint32(80).int32(message.max_count);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(98).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Group {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroup } as Group;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.creator_id = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.lang_tag = reader.string();
          break;
        case 6:
          message.metadata = reader.string();
          break;
        case 7:
          message.avatar_url = reader.string();
          break;
        case 8:
          message.open = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 9:
          message.edge_count = reader.int32();
          break;
        case 10:
          message.max_count = reader.int32();
          break;
        case 11:
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 12:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Group {
    const message = { ...baseGroup } as Group;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.creator_id !== undefined && object.creator_id !== null) {
      message.creator_id = String(object.creator_id);
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = String(object.lang_tag);
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = String(object.avatar_url);
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = Boolean(object.open);
    }
    if (object.edge_count !== undefined && object.edge_count !== null) {
      message.edge_count = Number(object.edge_count);
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    }
    return message;
  },

  toJSON(message: Group): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.open !== undefined && (obj.open = message.open);
    message.edge_count !== undefined && (obj.edge_count = message.edge_count);
    message.max_count !== undefined && (obj.max_count = message.max_count);
    message.create_time !== undefined &&
      (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined &&
      (obj.update_time = message.update_time.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Group>): Group {
    const message = { ...baseGroup } as Group;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.creator_id !== undefined && object.creator_id !== null) {
      message.creator_id = object.creator_id;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = object.lang_tag;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = object.avatar_url;
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = object.open;
    }
    if (object.edge_count !== undefined && object.edge_count !== null) {
      message.edge_count = object.edge_count;
    }
    if (object.max_count !== undefined && object.max_count !== null) {
      message.max_count = object.max_count;
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    return message;
  },
};

const baseGroupList: object = { cursor: "" };

export const GroupList = {
  encode(
    message: GroupList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.groups) {
      Group.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupList } as GroupList;
    message.groups = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groups.push(Group.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupList {
    const message = { ...baseGroupList } as GroupList;
    message.groups = [];
    if (object.groups !== undefined && object.groups !== null) {
      for (const e of object.groups) {
        message.groups.push(Group.fromJSON(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: GroupList): unknown {
    const obj: any = {};
    if (message.groups) {
      obj.groups = message.groups.map((e) => (e ? Group.toJSON(e) : undefined));
    } else {
      obj.groups = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupList>): GroupList {
    const message = { ...baseGroupList } as GroupList;
    message.groups = [];
    if (object.groups !== undefined && object.groups !== null) {
      for (const e of object.groups) {
        message.groups.push(Group.fromPartial(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseGroupUserList: object = { cursor: "" };

export const GroupUserList = {
  encode(
    message: GroupUserList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.group_users) {
      GroupUserList_GroupUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupUserList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupUserList } as GroupUserList;
    message.group_users = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_users.push(
            GroupUserList_GroupUser.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupUserList {
    const message = { ...baseGroupUserList } as GroupUserList;
    message.group_users = [];
    if (object.group_users !== undefined && object.group_users !== null) {
      for (const e of object.group_users) {
        message.group_users.push(GroupUserList_GroupUser.fromJSON(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: GroupUserList): unknown {
    const obj: any = {};
    if (message.group_users) {
      obj.group_users = message.group_users.map((e) =>
        e ? GroupUserList_GroupUser.toJSON(e) : undefined
      );
    } else {
      obj.group_users = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupUserList>): GroupUserList {
    const message = { ...baseGroupUserList } as GroupUserList;
    message.group_users = [];
    if (object.group_users !== undefined && object.group_users !== null) {
      for (const e of object.group_users) {
        message.group_users.push(GroupUserList_GroupUser.fromPartial(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseGroupUserList_GroupUser: object = {};

export const GroupUserList_GroupUser = {
  encode(
    message: GroupUserList_GroupUser,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode(
        { value: message.state! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GroupUserList_GroupUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGroupUserList_GroupUser,
    } as GroupUserList_GroupUser;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupUserList_GroupUser {
    const message = {
      ...baseGroupUserList_GroupUser,
    } as GroupUserList_GroupUser;
    if (object.user !== undefined && object.user !== null) {
      message.user = User.fromJSON(object.user);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = Number(object.state);
    }
    return message;
  },

  toJSON(message: GroupUserList_GroupUser): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GroupUserList_GroupUser>
  ): GroupUserList_GroupUser {
    const message = {
      ...baseGroupUserList_GroupUser,
    } as GroupUserList_GroupUser;
    if (object.user !== undefined && object.user !== null) {
      message.user = User.fromPartial(object.user);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    return message;
  },
};

const baseImportFacebookFriendsRequest: object = {};

export const ImportFacebookFriendsRequest = {
  encode(
    message: ImportFacebookFriendsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountFacebook.encode(
        message.account,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.reset !== undefined) {
      BoolValue.encode(
        { value: message.reset! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ImportFacebookFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseImportFacebookFriendsRequest,
    } as ImportFacebookFriendsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountFacebook.decode(reader, reader.uint32());
          break;
        case 2:
          message.reset = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImportFacebookFriendsRequest {
    const message = {
      ...baseImportFacebookFriendsRequest,
    } as ImportFacebookFriendsRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountFacebook.fromJSON(object.account);
    }
    if (object.reset !== undefined && object.reset !== null) {
      message.reset = Boolean(object.reset);
    }
    return message;
  },

  toJSON(message: ImportFacebookFriendsRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountFacebook.toJSON(message.account)
        : undefined);
    message.reset !== undefined && (obj.reset = message.reset);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ImportFacebookFriendsRequest>
  ): ImportFacebookFriendsRequest {
    const message = {
      ...baseImportFacebookFriendsRequest,
    } as ImportFacebookFriendsRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountFacebook.fromPartial(object.account);
    }
    if (object.reset !== undefined && object.reset !== null) {
      message.reset = object.reset;
    }
    return message;
  },
};

const baseImportSteamFriendsRequest: object = {};

export const ImportSteamFriendsRequest = {
  encode(
    message: ImportSteamFriendsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountSteam.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.reset !== undefined) {
      BoolValue.encode(
        { value: message.reset! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ImportSteamFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseImportSteamFriendsRequest,
    } as ImportSteamFriendsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountSteam.decode(reader, reader.uint32());
          break;
        case 2:
          message.reset = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImportSteamFriendsRequest {
    const message = {
      ...baseImportSteamFriendsRequest,
    } as ImportSteamFriendsRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountSteam.fromJSON(object.account);
    }
    if (object.reset !== undefined && object.reset !== null) {
      message.reset = Boolean(object.reset);
    }
    return message;
  },

  toJSON(message: ImportSteamFriendsRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountSteam.toJSON(message.account)
        : undefined);
    message.reset !== undefined && (obj.reset = message.reset);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ImportSteamFriendsRequest>
  ): ImportSteamFriendsRequest {
    const message = {
      ...baseImportSteamFriendsRequest,
    } as ImportSteamFriendsRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountSteam.fromPartial(object.account);
    }
    if (object.reset !== undefined && object.reset !== null) {
      message.reset = object.reset;
    }
    return message;
  },
};

const baseJoinGroupRequest: object = { group_id: "" };

export const JoinGroupRequest = {
  encode(
    message: JoinGroupRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinGroupRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJoinGroupRequest } as JoinGroupRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinGroupRequest {
    const message = { ...baseJoinGroupRequest } as JoinGroupRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    return message;
  },

  toJSON(message: JoinGroupRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    return obj;
  },

  fromPartial(object: DeepPartial<JoinGroupRequest>): JoinGroupRequest {
    const message = { ...baseJoinGroupRequest } as JoinGroupRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    return message;
  },
};

const baseJoinTournamentRequest: object = { tournament_id: "" };

export const JoinTournamentRequest = {
  encode(
    message: JoinTournamentRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinTournamentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJoinTournamentRequest } as JoinTournamentRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tournament_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinTournamentRequest {
    const message = { ...baseJoinTournamentRequest } as JoinTournamentRequest;
    if (object.tournament_id !== undefined && object.tournament_id !== null) {
      message.tournament_id = String(object.tournament_id);
    }
    return message;
  },

  toJSON(message: JoinTournamentRequest): unknown {
    const obj: any = {};
    message.tournament_id !== undefined &&
      (obj.tournament_id = message.tournament_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<JoinTournamentRequest>
  ): JoinTournamentRequest {
    const message = { ...baseJoinTournamentRequest } as JoinTournamentRequest;
    if (object.tournament_id !== undefined && object.tournament_id !== null) {
      message.tournament_id = object.tournament_id;
    }
    return message;
  },
};

const baseKickGroupUsersRequest: object = { group_id: "", user_ids: "" };

export const KickGroupUsersRequest = {
  encode(
    message: KickGroupUsersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): KickGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKickGroupUsersRequest } as KickGroupUsersRequest;
    message.user_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KickGroupUsersRequest {
    const message = { ...baseKickGroupUsersRequest } as KickGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: KickGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<KickGroupUsersRequest>
  ): KickGroupUsersRequest {
    const message = { ...baseKickGroupUsersRequest } as KickGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    return message;
  },
};

const baseLeaderboardRecord: object = {
  leaderboard_id: "",
  owner_id: "",
  score: 0,
  subscore: 0,
  num_score: 0,
  metadata: "",
  rank: 0,
  max_num_score: 0,
};

export const LeaderboardRecord = {
  encode(
    message: LeaderboardRecord,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    if (message.owner_id !== "") {
      writer.uint32(18).string(message.owner_id);
    }
    if (message.username !== undefined) {
      StringValue.encode(
        { value: message.username! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.score !== 0) {
      writer.uint32(32).int64(message.score);
    }
    if (message.subscore !== 0) {
      writer.uint32(40).int64(message.subscore);
    }
    if (message.num_score !== 0) {
      writer.uint32(48).int32(message.num_score);
    }
    if (message.metadata !== "") {
      writer.uint32(58).string(message.metadata);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.expiry_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.expiry_time),
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.rank !== 0) {
      writer.uint32(88).int64(message.rank);
    }
    if (message.max_num_score !== 0) {
      writer.uint32(96).uint32(message.max_num_score);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLeaderboardRecord } as LeaderboardRecord;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaderboard_id = reader.string();
          break;
        case 2:
          message.owner_id = reader.string();
          break;
        case 3:
          message.username = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.score = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.subscore = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.num_score = reader.int32();
          break;
        case 7:
          message.metadata = reader.string();
          break;
        case 8:
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 10:
          message.expiry_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 11:
          message.rank = longToNumber(reader.int64() as Long);
          break;
        case 12:
          message.max_num_score = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeaderboardRecord {
    const message = { ...baseLeaderboardRecord } as LeaderboardRecord;
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = String(object.leaderboard_id);
    }
    if (object.owner_id !== undefined && object.owner_id !== null) {
      message.owner_id = String(object.owner_id);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.score !== undefined && object.score !== null) {
      message.score = Number(object.score);
    }
    if (object.subscore !== undefined && object.subscore !== null) {
      message.subscore = Number(object.subscore);
    }
    if (object.num_score !== undefined && object.num_score !== null) {
      message.num_score = Number(object.num_score);
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    }
    if (object.expiry_time !== undefined && object.expiry_time !== null) {
      message.expiry_time = fromJsonTimestamp(object.expiry_time);
    }
    if (object.rank !== undefined && object.rank !== null) {
      message.rank = Number(object.rank);
    }
    if (object.max_num_score !== undefined && object.max_num_score !== null) {
      message.max_num_score = Number(object.max_num_score);
    }
    return message;
  },

  toJSON(message: LeaderboardRecord): unknown {
    const obj: any = {};
    message.leaderboard_id !== undefined &&
      (obj.leaderboard_id = message.leaderboard_id);
    message.owner_id !== undefined && (obj.owner_id = message.owner_id);
    message.username !== undefined && (obj.username = message.username);
    message.score !== undefined && (obj.score = message.score);
    message.subscore !== undefined && (obj.subscore = message.subscore);
    message.num_score !== undefined && (obj.num_score = message.num_score);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.create_time !== undefined &&
      (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined &&
      (obj.update_time = message.update_time.toISOString());
    message.expiry_time !== undefined &&
      (obj.expiry_time = message.expiry_time.toISOString());
    message.rank !== undefined && (obj.rank = message.rank);
    message.max_num_score !== undefined &&
      (obj.max_num_score = message.max_num_score);
    return obj;
  },

  fromPartial(object: DeepPartial<LeaderboardRecord>): LeaderboardRecord {
    const message = { ...baseLeaderboardRecord } as LeaderboardRecord;
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = object.leaderboard_id;
    }
    if (object.owner_id !== undefined && object.owner_id !== null) {
      message.owner_id = object.owner_id;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    if (object.score !== undefined && object.score !== null) {
      message.score = object.score;
    }
    if (object.subscore !== undefined && object.subscore !== null) {
      message.subscore = object.subscore;
    }
    if (object.num_score !== undefined && object.num_score !== null) {
      message.num_score = object.num_score;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    if (object.expiry_time !== undefined && object.expiry_time !== null) {
      message.expiry_time = object.expiry_time;
    }
    if (object.rank !== undefined && object.rank !== null) {
      message.rank = object.rank;
    }
    if (object.max_num_score !== undefined && object.max_num_score !== null) {
      message.max_num_score = object.max_num_score;
    }
    return message;
  },
};

const baseLeaderboardRecordList: object = { next_cursor: "", prev_cursor: "" };

export const LeaderboardRecordList = {
  encode(
    message: LeaderboardRecordList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.records) {
      LeaderboardRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.owner_records) {
      LeaderboardRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.next_cursor !== "") {
      writer.uint32(26).string(message.next_cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(34).string(message.prev_cursor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): LeaderboardRecordList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLeaderboardRecordList } as LeaderboardRecordList;
    message.records = [];
    message.owner_records = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.records.push(
            LeaderboardRecord.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.owner_records.push(
            LeaderboardRecord.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.next_cursor = reader.string();
          break;
        case 4:
          message.prev_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeaderboardRecordList {
    const message = { ...baseLeaderboardRecordList } as LeaderboardRecordList;
    message.records = [];
    message.owner_records = [];
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(LeaderboardRecord.fromJSON(e));
      }
    }
    if (object.owner_records !== undefined && object.owner_records !== null) {
      for (const e of object.owner_records) {
        message.owner_records.push(LeaderboardRecord.fromJSON(e));
      }
    }
    if (object.next_cursor !== undefined && object.next_cursor !== null) {
      message.next_cursor = String(object.next_cursor);
    }
    if (object.prev_cursor !== undefined && object.prev_cursor !== null) {
      message.prev_cursor = String(object.prev_cursor);
    }
    return message;
  },

  toJSON(message: LeaderboardRecordList): unknown {
    const obj: any = {};
    if (message.records) {
      obj.records = message.records.map((e) =>
        e ? LeaderboardRecord.toJSON(e) : undefined
      );
    } else {
      obj.records = [];
    }
    if (message.owner_records) {
      obj.owner_records = message.owner_records.map((e) =>
        e ? LeaderboardRecord.toJSON(e) : undefined
      );
    } else {
      obj.owner_records = [];
    }
    message.next_cursor !== undefined &&
      (obj.next_cursor = message.next_cursor);
    message.prev_cursor !== undefined &&
      (obj.prev_cursor = message.prev_cursor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<LeaderboardRecordList>
  ): LeaderboardRecordList {
    const message = { ...baseLeaderboardRecordList } as LeaderboardRecordList;
    message.records = [];
    message.owner_records = [];
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(LeaderboardRecord.fromPartial(e));
      }
    }
    if (object.owner_records !== undefined && object.owner_records !== null) {
      for (const e of object.owner_records) {
        message.owner_records.push(LeaderboardRecord.fromPartial(e));
      }
    }
    if (object.next_cursor !== undefined && object.next_cursor !== null) {
      message.next_cursor = object.next_cursor;
    }
    if (object.prev_cursor !== undefined && object.prev_cursor !== null) {
      message.prev_cursor = object.prev_cursor;
    }
    return message;
  },
};

const baseLeaveGroupRequest: object = { group_id: "" };

export const LeaveGroupRequest = {
  encode(
    message: LeaveGroupRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaveGroupRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLeaveGroupRequest } as LeaveGroupRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeaveGroupRequest {
    const message = { ...baseLeaveGroupRequest } as LeaveGroupRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    return message;
  },

  toJSON(message: LeaveGroupRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    return obj;
  },

  fromPartial(object: DeepPartial<LeaveGroupRequest>): LeaveGroupRequest {
    const message = { ...baseLeaveGroupRequest } as LeaveGroupRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    return message;
  },
};

const baseLinkFacebookRequest: object = {};

export const LinkFacebookRequest = {
  encode(
    message: LinkFacebookRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountFacebook.encode(
        message.account,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.sync !== undefined) {
      BoolValue.encode(
        { value: message.sync! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LinkFacebookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLinkFacebookRequest } as LinkFacebookRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountFacebook.decode(reader, reader.uint32());
          break;
        case 2:
          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LinkFacebookRequest {
    const message = { ...baseLinkFacebookRequest } as LinkFacebookRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountFacebook.fromJSON(object.account);
    }
    if (object.sync !== undefined && object.sync !== null) {
      message.sync = Boolean(object.sync);
    }
    return message;
  },

  toJSON(message: LinkFacebookRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountFacebook.toJSON(message.account)
        : undefined);
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  fromPartial(object: DeepPartial<LinkFacebookRequest>): LinkFacebookRequest {
    const message = { ...baseLinkFacebookRequest } as LinkFacebookRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountFacebook.fromPartial(object.account);
    }
    if (object.sync !== undefined && object.sync !== null) {
      message.sync = object.sync;
    }
    return message;
  },
};

const baseLinkSteamRequest: object = {};

export const LinkSteamRequest = {
  encode(
    message: LinkSteamRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      AccountSteam.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.sync !== undefined) {
      BoolValue.encode(
        { value: message.sync! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LinkSteamRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLinkSteamRequest } as LinkSteamRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountSteam.decode(reader, reader.uint32());
          break;
        case 2:
          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LinkSteamRequest {
    const message = { ...baseLinkSteamRequest } as LinkSteamRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountSteam.fromJSON(object.account);
    }
    if (object.sync !== undefined && object.sync !== null) {
      message.sync = Boolean(object.sync);
    }
    return message;
  },

  toJSON(message: LinkSteamRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account
        ? AccountSteam.toJSON(message.account)
        : undefined);
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  fromPartial(object: DeepPartial<LinkSteamRequest>): LinkSteamRequest {
    const message = { ...baseLinkSteamRequest } as LinkSteamRequest;
    if (object.account !== undefined && object.account !== null) {
      message.account = AccountSteam.fromPartial(object.account);
    }
    if (object.sync !== undefined && object.sync !== null) {
      message.sync = object.sync;
    }
    return message;
  },
};

const baseListChannelMessagesRequest: object = { channel_id: "", cursor: "" };

export const ListChannelMessagesRequest = {
  encode(
    message: ListChannelMessagesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.forward !== undefined) {
      BoolValue.encode(
        { value: message.forward! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListChannelMessagesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListChannelMessagesRequest,
    } as ListChannelMessagesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.forward = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListChannelMessagesRequest {
    const message = {
      ...baseListChannelMessagesRequest,
    } as ListChannelMessagesRequest;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.forward !== undefined && object.forward !== null) {
      message.forward = Boolean(object.forward);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: ListChannelMessagesRequest): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.forward !== undefined && (obj.forward = message.forward);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListChannelMessagesRequest>
  ): ListChannelMessagesRequest {
    const message = {
      ...baseListChannelMessagesRequest,
    } as ListChannelMessagesRequest;
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.forward !== undefined && object.forward !== null) {
      message.forward = object.forward;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseListFriendsRequest: object = { cursor: "" };

export const ListFriendsRequest = {
  encode(
    message: ListFriendsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode(
        { value: message.state! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(26).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListFriendsRequest } as ListFriendsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListFriendsRequest {
    const message = { ...baseListFriendsRequest } as ListFriendsRequest;
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = Number(object.state);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: ListFriendsRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<ListFriendsRequest>): ListFriendsRequest {
    const message = { ...baseListFriendsRequest } as ListFriendsRequest;
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseListGroupsRequest: object = { name: "", cursor: "" };

export const ListGroupsRequest = {
  encode(
    message: ListGroupsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListGroupsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListGroupsRequest } as ListGroupsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.cursor = reader.string();
          break;
        case 3:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListGroupsRequest {
    const message = { ...baseListGroupsRequest } as ListGroupsRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    return message;
  },

  toJSON(message: ListGroupsRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.limit !== undefined && (obj.limit = message.limit);
    return obj;
  },

  fromPartial(object: DeepPartial<ListGroupsRequest>): ListGroupsRequest {
    const message = { ...baseListGroupsRequest } as ListGroupsRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    return message;
  },
};

const baseListGroupUsersRequest: object = { group_id: "", cursor: "" };

export const ListGroupUsersRequest = {
  encode(
    message: ListGroupUsersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode(
        { value: message.state! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListGroupUsersRequest } as ListGroupUsersRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListGroupUsersRequest {
    const message = { ...baseListGroupUsersRequest } as ListGroupUsersRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = Number(object.state);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: ListGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListGroupUsersRequest>
  ): ListGroupUsersRequest {
    const message = { ...baseListGroupUsersRequest } as ListGroupUsersRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseListLeaderboardRecordsAroundOwnerRequest: object = {
  leaderboard_id: "",
  owner_id: "",
};

export const ListLeaderboardRecordsAroundOwnerRequest = {
  encode(
    message: ListLeaderboardRecordsAroundOwnerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    if (message.limit !== undefined) {
      UInt32Value.encode(
        { value: message.limit! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.owner_id !== "") {
      writer.uint32(26).string(message.owner_id);
    }
    if (message.expiry !== undefined) {
      Int64Value.encode(
        { value: message.expiry! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListLeaderboardRecordsAroundOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListLeaderboardRecordsAroundOwnerRequest,
    } as ListLeaderboardRecordsAroundOwnerRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaderboard_id = reader.string();
          break;
        case 2:
          message.limit = UInt32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.owner_id = reader.string();
          break;
        case 4:
          message.expiry = Int64Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListLeaderboardRecordsAroundOwnerRequest {
    const message = {
      ...baseListLeaderboardRecordsAroundOwnerRequest,
    } as ListLeaderboardRecordsAroundOwnerRequest;
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = String(object.leaderboard_id);
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.owner_id !== undefined && object.owner_id !== null) {
      message.owner_id = String(object.owner_id);
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = Number(object.expiry);
    }
    return message;
  },

  toJSON(message: ListLeaderboardRecordsAroundOwnerRequest): unknown {
    const obj: any = {};
    message.leaderboard_id !== undefined &&
      (obj.leaderboard_id = message.leaderboard_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.owner_id !== undefined && (obj.owner_id = message.owner_id);
    message.expiry !== undefined && (obj.expiry = message.expiry);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListLeaderboardRecordsAroundOwnerRequest>
  ): ListLeaderboardRecordsAroundOwnerRequest {
    const message = {
      ...baseListLeaderboardRecordsAroundOwnerRequest,
    } as ListLeaderboardRecordsAroundOwnerRequest;
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = object.leaderboard_id;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.owner_id !== undefined && object.owner_id !== null) {
      message.owner_id = object.owner_id;
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = object.expiry;
    }
    return message;
  },
};

const baseListLeaderboardRecordsRequest: object = {
  leaderboard_id: "",
  owner_ids: "",
  cursor: "",
};

export const ListLeaderboardRecordsRequest = {
  encode(
    message: ListLeaderboardRecordsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    for (const v of message.owner_ids) {
      writer.uint32(18).string(v!);
    }
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    if (message.expiry !== undefined) {
      Int64Value.encode(
        { value: message.expiry! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListLeaderboardRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListLeaderboardRecordsRequest,
    } as ListLeaderboardRecordsRequest;
    message.owner_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaderboard_id = reader.string();
          break;
        case 2:
          message.owner_ids.push(reader.string());
          break;
        case 3:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        case 5:
          message.expiry = Int64Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListLeaderboardRecordsRequest {
    const message = {
      ...baseListLeaderboardRecordsRequest,
    } as ListLeaderboardRecordsRequest;
    message.owner_ids = [];
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = String(object.leaderboard_id);
    }
    if (object.owner_ids !== undefined && object.owner_ids !== null) {
      for (const e of object.owner_ids) {
        message.owner_ids.push(String(e));
      }
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = Number(object.expiry);
    }
    return message;
  },

  toJSON(message: ListLeaderboardRecordsRequest): unknown {
    const obj: any = {};
    message.leaderboard_id !== undefined &&
      (obj.leaderboard_id = message.leaderboard_id);
    if (message.owner_ids) {
      obj.owner_ids = message.owner_ids.map((e) => e);
    } else {
      obj.owner_ids = [];
    }
    message.limit !== undefined && (obj.limit = message.limit);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.expiry !== undefined && (obj.expiry = message.expiry);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListLeaderboardRecordsRequest>
  ): ListLeaderboardRecordsRequest {
    const message = {
      ...baseListLeaderboardRecordsRequest,
    } as ListLeaderboardRecordsRequest;
    message.owner_ids = [];
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = object.leaderboard_id;
    }
    if (object.owner_ids !== undefined && object.owner_ids !== null) {
      for (const e of object.owner_ids) {
        message.owner_ids.push(e);
      }
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = object.expiry;
    }
    return message;
  },
};

const baseListMatchesRequest: object = {};

export const ListMatchesRequest = {
  encode(
    message: ListMatchesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.authoritative !== undefined) {
      BoolValue.encode(
        { value: message.authoritative! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.label !== undefined) {
      StringValue.encode(
        { value: message.label! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.min_size !== undefined) {
      Int32Value.encode(
        { value: message.min_size! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.max_size !== undefined) {
      Int32Value.encode(
        { value: message.max_size! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.query !== undefined) {
      StringValue.encode(
        { value: message.query! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMatchesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListMatchesRequest } as ListMatchesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.authoritative = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.label = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.min_size = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.max_size = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.query = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListMatchesRequest {
    const message = { ...baseListMatchesRequest } as ListMatchesRequest;
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.authoritative !== undefined && object.authoritative !== null) {
      message.authoritative = Boolean(object.authoritative);
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    }
    if (object.min_size !== undefined && object.min_size !== null) {
      message.min_size = Number(object.min_size);
    }
    if (object.max_size !== undefined && object.max_size !== null) {
      message.max_size = Number(object.max_size);
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = String(object.query);
    }
    return message;
  },

  toJSON(message: ListMatchesRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.authoritative !== undefined &&
      (obj.authoritative = message.authoritative);
    message.label !== undefined && (obj.label = message.label);
    message.min_size !== undefined && (obj.min_size = message.min_size);
    message.max_size !== undefined && (obj.max_size = message.max_size);
    message.query !== undefined && (obj.query = message.query);
    return obj;
  },

  fromPartial(object: DeepPartial<ListMatchesRequest>): ListMatchesRequest {
    const message = { ...baseListMatchesRequest } as ListMatchesRequest;
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.authoritative !== undefined && object.authoritative !== null) {
      message.authoritative = object.authoritative;
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    if (object.min_size !== undefined && object.min_size !== null) {
      message.min_size = object.min_size;
    }
    if (object.max_size !== undefined && object.max_size !== null) {
      message.max_size = object.max_size;
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = object.query;
    }
    return message;
  },
};

const baseListNotificationsRequest: object = { cacheable_cursor: "" };

export const ListNotificationsRequest = {
  encode(
    message: ListNotificationsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.cacheable_cursor !== "") {
      writer.uint32(18).string(message.cacheable_cursor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListNotificationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListNotificationsRequest,
    } as ListNotificationsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.cacheable_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListNotificationsRequest {
    const message = {
      ...baseListNotificationsRequest,
    } as ListNotificationsRequest;
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (
      object.cacheable_cursor !== undefined &&
      object.cacheable_cursor !== null
    ) {
      message.cacheable_cursor = String(object.cacheable_cursor);
    }
    return message;
  },

  toJSON(message: ListNotificationsRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.cacheable_cursor !== undefined &&
      (obj.cacheable_cursor = message.cacheable_cursor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListNotificationsRequest>
  ): ListNotificationsRequest {
    const message = {
      ...baseListNotificationsRequest,
    } as ListNotificationsRequest;
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (
      object.cacheable_cursor !== undefined &&
      object.cacheable_cursor !== null
    ) {
      message.cacheable_cursor = object.cacheable_cursor;
    }
    return message;
  },
};

const baseListStorageObjectsRequest: object = {
  user_id: "",
  collection: "",
  cursor: "",
};

export const ListStorageObjectsRequest = {
  encode(
    message: ListStorageObjectsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.collection !== "") {
      writer.uint32(18).string(message.collection);
    }
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStorageObjectsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListStorageObjectsRequest,
    } as ListStorageObjectsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.collection = reader.string();
          break;
        case 3:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStorageObjectsRequest {
    const message = {
      ...baseListStorageObjectsRequest,
    } as ListStorageObjectsRequest;
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = String(object.user_id);
    }
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = String(object.collection);
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: ListStorageObjectsRequest): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.collection !== undefined && (obj.collection = message.collection);
    message.limit !== undefined && (obj.limit = message.limit);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListStorageObjectsRequest>
  ): ListStorageObjectsRequest {
    const message = {
      ...baseListStorageObjectsRequest,
    } as ListStorageObjectsRequest;
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = object.user_id;
    }
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = object.collection;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseListTournamentRecordsAroundOwnerRequest: object = {
  tournament_id: "",
  owner_id: "",
};

export const ListTournamentRecordsAroundOwnerRequest = {
  encode(
    message: ListTournamentRecordsAroundOwnerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    if (message.limit !== undefined) {
      UInt32Value.encode(
        { value: message.limit! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.owner_id !== "") {
      writer.uint32(26).string(message.owner_id);
    }
    if (message.expiry !== undefined) {
      Int64Value.encode(
        { value: message.expiry! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListTournamentRecordsAroundOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListTournamentRecordsAroundOwnerRequest,
    } as ListTournamentRecordsAroundOwnerRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tournament_id = reader.string();
          break;
        case 2:
          message.limit = UInt32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.owner_id = reader.string();
          break;
        case 4:
          message.expiry = Int64Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListTournamentRecordsAroundOwnerRequest {
    const message = {
      ...baseListTournamentRecordsAroundOwnerRequest,
    } as ListTournamentRecordsAroundOwnerRequest;
    if (object.tournament_id !== undefined && object.tournament_id !== null) {
      message.tournament_id = String(object.tournament_id);
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.owner_id !== undefined && object.owner_id !== null) {
      message.owner_id = String(object.owner_id);
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = Number(object.expiry);
    }
    return message;
  },

  toJSON(message: ListTournamentRecordsAroundOwnerRequest): unknown {
    const obj: any = {};
    message.tournament_id !== undefined &&
      (obj.tournament_id = message.tournament_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.owner_id !== undefined && (obj.owner_id = message.owner_id);
    message.expiry !== undefined && (obj.expiry = message.expiry);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListTournamentRecordsAroundOwnerRequest>
  ): ListTournamentRecordsAroundOwnerRequest {
    const message = {
      ...baseListTournamentRecordsAroundOwnerRequest,
    } as ListTournamentRecordsAroundOwnerRequest;
    if (object.tournament_id !== undefined && object.tournament_id !== null) {
      message.tournament_id = object.tournament_id;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.owner_id !== undefined && object.owner_id !== null) {
      message.owner_id = object.owner_id;
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = object.expiry;
    }
    return message;
  },
};

const baseListTournamentRecordsRequest: object = {
  tournament_id: "",
  owner_ids: "",
  cursor: "",
};

export const ListTournamentRecordsRequest = {
  encode(
    message: ListTournamentRecordsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    for (const v of message.owner_ids) {
      writer.uint32(18).string(v!);
    }
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    if (message.expiry !== undefined) {
      Int64Value.encode(
        { value: message.expiry! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListTournamentRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListTournamentRecordsRequest,
    } as ListTournamentRecordsRequest;
    message.owner_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tournament_id = reader.string();
          break;
        case 2:
          message.owner_ids.push(reader.string());
          break;
        case 3:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        case 5:
          message.expiry = Int64Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListTournamentRecordsRequest {
    const message = {
      ...baseListTournamentRecordsRequest,
    } as ListTournamentRecordsRequest;
    message.owner_ids = [];
    if (object.tournament_id !== undefined && object.tournament_id !== null) {
      message.tournament_id = String(object.tournament_id);
    }
    if (object.owner_ids !== undefined && object.owner_ids !== null) {
      for (const e of object.owner_ids) {
        message.owner_ids.push(String(e));
      }
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = Number(object.expiry);
    }
    return message;
  },

  toJSON(message: ListTournamentRecordsRequest): unknown {
    const obj: any = {};
    message.tournament_id !== undefined &&
      (obj.tournament_id = message.tournament_id);
    if (message.owner_ids) {
      obj.owner_ids = message.owner_ids.map((e) => e);
    } else {
      obj.owner_ids = [];
    }
    message.limit !== undefined && (obj.limit = message.limit);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.expiry !== undefined && (obj.expiry = message.expiry);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListTournamentRecordsRequest>
  ): ListTournamentRecordsRequest {
    const message = {
      ...baseListTournamentRecordsRequest,
    } as ListTournamentRecordsRequest;
    message.owner_ids = [];
    if (object.tournament_id !== undefined && object.tournament_id !== null) {
      message.tournament_id = object.tournament_id;
    }
    if (object.owner_ids !== undefined && object.owner_ids !== null) {
      for (const e of object.owner_ids) {
        message.owner_ids.push(e);
      }
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    if (object.expiry !== undefined && object.expiry !== null) {
      message.expiry = object.expiry;
    }
    return message;
  },
};

const baseListTournamentsRequest: object = { cursor: "" };

export const ListTournamentsRequest = {
  encode(
    message: ListTournamentsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.category_start !== undefined) {
      UInt32Value.encode(
        { value: message.category_start! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.category_end !== undefined) {
      UInt32Value.encode(
        { value: message.category_end! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.start_time !== undefined) {
      UInt32Value.encode(
        { value: message.start_time! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.end_time !== undefined) {
      UInt32Value.encode(
        { value: message.end_time! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(66).string(message.cursor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListTournamentsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListTournamentsRequest } as ListTournamentsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.category_start = UInt32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.category_end = UInt32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.start_time = UInt32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.end_time = UInt32Value.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListTournamentsRequest {
    const message = { ...baseListTournamentsRequest } as ListTournamentsRequest;
    if (object.category_start !== undefined && object.category_start !== null) {
      message.category_start = Number(object.category_start);
    }
    if (object.category_end !== undefined && object.category_end !== null) {
      message.category_end = Number(object.category_end);
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.start_time = Number(object.start_time);
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = Number(object.end_time);
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: ListTournamentsRequest): unknown {
    const obj: any = {};
    message.category_start !== undefined &&
      (obj.category_start = message.category_start);
    message.category_end !== undefined &&
      (obj.category_end = message.category_end);
    message.start_time !== undefined && (obj.start_time = message.start_time);
    message.end_time !== undefined && (obj.end_time = message.end_time);
    message.limit !== undefined && (obj.limit = message.limit);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListTournamentsRequest>
  ): ListTournamentsRequest {
    const message = { ...baseListTournamentsRequest } as ListTournamentsRequest;
    if (object.category_start !== undefined && object.category_start !== null) {
      message.category_start = object.category_start;
    }
    if (object.category_end !== undefined && object.category_end !== null) {
      message.category_end = object.category_end;
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.start_time = object.start_time;
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = object.end_time;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseListUserGroupsRequest: object = { user_id: "", cursor: "" };

export const ListUserGroupsRequest = {
  encode(
    message: ListUserGroupsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode(
        { value: message.limit! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode(
        { value: message.state! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListUserGroupsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListUserGroupsRequest } as ListUserGroupsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUserGroupsRequest {
    const message = { ...baseListUserGroupsRequest } as ListUserGroupsRequest;
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = String(object.user_id);
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = Number(object.state);
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: ListUserGroupsRequest): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListUserGroupsRequest>
  ): ListUserGroupsRequest {
    const message = { ...baseListUserGroupsRequest } as ListUserGroupsRequest;
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = object.user_id;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseMatch: object = {
  match_id: "",
  authoritative: false,
  size: 0,
  tick_rate: 0,
  handler_name: "",
};

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
    if (message.tick_rate !== 0) {
      writer.uint32(40).int32(message.tick_rate);
    }
    if (message.handler_name !== "") {
      writer.uint32(50).string(message.handler_name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Match {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatch } as Match;
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
          message.tick_rate = reader.int32();
          break;
        case 6:
          message.handler_name = reader.string();
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
    if (object.tick_rate !== undefined && object.tick_rate !== null) {
      message.tick_rate = Number(object.tick_rate);
    }
    if (object.handler_name !== undefined && object.handler_name !== null) {
      message.handler_name = String(object.handler_name);
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
    message.tick_rate !== undefined && (obj.tick_rate = message.tick_rate);
    message.handler_name !== undefined &&
      (obj.handler_name = message.handler_name);
    return obj;
  },

  fromPartial(object: DeepPartial<Match>): Match {
    const message = { ...baseMatch } as Match;
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
    if (object.tick_rate !== undefined && object.tick_rate !== null) {
      message.tick_rate = object.tick_rate;
    }
    if (object.handler_name !== undefined && object.handler_name !== null) {
      message.handler_name = object.handler_name;
    }
    return message;
  },
};

const baseMatchList: object = {};

export const MatchList = {
  encode(
    message: MatchList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.matches) {
      Match.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchList } as MatchList;
    message.matches = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.matches.push(Match.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchList {
    const message = { ...baseMatchList } as MatchList;
    message.matches = [];
    if (object.matches !== undefined && object.matches !== null) {
      for (const e of object.matches) {
        message.matches.push(Match.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MatchList): unknown {
    const obj: any = {};
    if (message.matches) {
      obj.matches = message.matches.map((e) =>
        e ? Match.toJSON(e) : undefined
      );
    } else {
      obj.matches = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MatchList>): MatchList {
    const message = { ...baseMatchList } as MatchList;
    message.matches = [];
    if (object.matches !== undefined && object.matches !== null) {
      for (const e of object.matches) {
        message.matches.push(Match.fromPartial(e));
      }
    }
    return message;
  },
};

const baseNotification: object = {
  id: "",
  subject: "",
  content: "",
  code: 0,
  sender_id: "",
  persistent: false,
};

export const Notification = {
  encode(
    message: Notification,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.code !== 0) {
      writer.uint32(32).int32(message.code);
    }
    if (message.sender_id !== "") {
      writer.uint32(42).string(message.sender_id);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.persistent === true) {
      writer.uint32(56).bool(message.persistent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNotification } as Notification;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.subject = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        case 4:
          message.code = reader.int32();
          break;
        case 5:
          message.sender_id = reader.string();
          break;
        case 6:
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.persistent = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Notification {
    const message = { ...baseNotification } as Notification;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject);
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = Number(object.code);
    }
    if (object.sender_id !== undefined && object.sender_id !== null) {
      message.sender_id = String(object.sender_id);
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.persistent !== undefined && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    }
    return message;
  },

  toJSON(message: Notification): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.subject !== undefined && (obj.subject = message.subject);
    message.content !== undefined && (obj.content = message.content);
    message.code !== undefined && (obj.code = message.code);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.create_time !== undefined &&
      (obj.create_time = message.create_time.toISOString());
    message.persistent !== undefined && (obj.persistent = message.persistent);
    return obj;
  },

  fromPartial(object: DeepPartial<Notification>): Notification {
    const message = { ...baseNotification } as Notification;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject;
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    }
    if (object.sender_id !== undefined && object.sender_id !== null) {
      message.sender_id = object.sender_id;
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.persistent !== undefined && object.persistent !== null) {
      message.persistent = object.persistent;
    }
    return message;
  },
};

const baseNotificationList: object = { cacheable_cursor: "" };

export const NotificationList = {
  encode(
    message: NotificationList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.notifications) {
      Notification.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cacheable_cursor !== "") {
      writer.uint32(18).string(message.cacheable_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NotificationList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNotificationList } as NotificationList;
    message.notifications = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notifications.push(
            Notification.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.cacheable_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NotificationList {
    const message = { ...baseNotificationList } as NotificationList;
    message.notifications = [];
    if (object.notifications !== undefined && object.notifications !== null) {
      for (const e of object.notifications) {
        message.notifications.push(Notification.fromJSON(e));
      }
    }
    if (
      object.cacheable_cursor !== undefined &&
      object.cacheable_cursor !== null
    ) {
      message.cacheable_cursor = String(object.cacheable_cursor);
    }
    return message;
  },

  toJSON(message: NotificationList): unknown {
    const obj: any = {};
    if (message.notifications) {
      obj.notifications = message.notifications.map((e) =>
        e ? Notification.toJSON(e) : undefined
      );
    } else {
      obj.notifications = [];
    }
    message.cacheable_cursor !== undefined &&
      (obj.cacheable_cursor = message.cacheable_cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<NotificationList>): NotificationList {
    const message = { ...baseNotificationList } as NotificationList;
    message.notifications = [];
    if (object.notifications !== undefined && object.notifications !== null) {
      for (const e of object.notifications) {
        message.notifications.push(Notification.fromPartial(e));
      }
    }
    if (
      object.cacheable_cursor !== undefined &&
      object.cacheable_cursor !== null
    ) {
      message.cacheable_cursor = object.cacheable_cursor;
    }
    return message;
  },
};

const basePromoteGroupUsersRequest: object = { group_id: "", user_ids: "" };

export const PromoteGroupUsersRequest = {
  encode(
    message: PromoteGroupUsersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PromoteGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...basePromoteGroupUsersRequest,
    } as PromoteGroupUsersRequest;
    message.user_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PromoteGroupUsersRequest {
    const message = {
      ...basePromoteGroupUsersRequest,
    } as PromoteGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: PromoteGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<PromoteGroupUsersRequest>
  ): PromoteGroupUsersRequest {
    const message = {
      ...basePromoteGroupUsersRequest,
    } as PromoteGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    return message;
  },
};

const baseDemoteGroupUsersRequest: object = { group_id: "", user_ids: "" };

export const DemoteGroupUsersRequest = {
  encode(
    message: DemoteGroupUsersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DemoteGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDemoteGroupUsersRequest,
    } as DemoteGroupUsersRequest;
    message.user_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DemoteGroupUsersRequest {
    const message = {
      ...baseDemoteGroupUsersRequest,
    } as DemoteGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: DemoteGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<DemoteGroupUsersRequest>
  ): DemoteGroupUsersRequest {
    const message = {
      ...baseDemoteGroupUsersRequest,
    } as DemoteGroupUsersRequest;
    message.user_ids = [];
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_ids !== undefined && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    return message;
  },
};

const baseReadStorageObjectId: object = {
  collection: "",
  key: "",
  user_id: "",
};

export const ReadStorageObjectId = {
  encode(
    message: ReadStorageObjectId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.user_id !== "") {
      writer.uint32(26).string(message.user_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadStorageObjectId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReadStorageObjectId } as ReadStorageObjectId;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.user_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReadStorageObjectId {
    const message = { ...baseReadStorageObjectId } as ReadStorageObjectId;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = String(object.collection);
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = String(object.user_id);
    }
    return message;
  },

  toJSON(message: ReadStorageObjectId): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    return obj;
  },

  fromPartial(object: DeepPartial<ReadStorageObjectId>): ReadStorageObjectId {
    const message = { ...baseReadStorageObjectId } as ReadStorageObjectId;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = object.collection;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = object.user_id;
    }
    return message;
  },
};

const baseReadStorageObjectsRequest: object = {};

export const ReadStorageObjectsRequest = {
  encode(
    message: ReadStorageObjectsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.object_ids) {
      ReadStorageObjectId.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ReadStorageObjectsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseReadStorageObjectsRequest,
    } as ReadStorageObjectsRequest;
    message.object_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.object_ids.push(
            ReadStorageObjectId.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReadStorageObjectsRequest {
    const message = {
      ...baseReadStorageObjectsRequest,
    } as ReadStorageObjectsRequest;
    message.object_ids = [];
    if (object.object_ids !== undefined && object.object_ids !== null) {
      for (const e of object.object_ids) {
        message.object_ids.push(ReadStorageObjectId.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ReadStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.object_ids) {
      obj.object_ids = message.object_ids.map((e) =>
        e ? ReadStorageObjectId.toJSON(e) : undefined
      );
    } else {
      obj.object_ids = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ReadStorageObjectsRequest>
  ): ReadStorageObjectsRequest {
    const message = {
      ...baseReadStorageObjectsRequest,
    } as ReadStorageObjectsRequest;
    message.object_ids = [];
    if (object.object_ids !== undefined && object.object_ids !== null) {
      for (const e of object.object_ids) {
        message.object_ids.push(ReadStorageObjectId.fromPartial(e));
      }
    }
    return message;
  },
};

const baseRpc: object = { id: "", payload: "", http_key: "" };

export const Rpc = {
  encode(message: Rpc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.http_key !== "") {
      writer.uint32(26).string(message.http_key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rpc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRpc } as Rpc;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.http_key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Rpc {
    const message = { ...baseRpc } as Rpc;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = String(object.payload);
    }
    if (object.http_key !== undefined && object.http_key !== null) {
      message.http_key = String(object.http_key);
    }
    return message;
  },

  toJSON(message: Rpc): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.payload !== undefined && (obj.payload = message.payload);
    message.http_key !== undefined && (obj.http_key = message.http_key);
    return obj;
  },

  fromPartial(object: DeepPartial<Rpc>): Rpc {
    const message = { ...baseRpc } as Rpc;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = object.payload;
    }
    if (object.http_key !== undefined && object.http_key !== null) {
      message.http_key = object.http_key;
    }
    return message;
  },
};

const baseSession: object = { created: false, token: "", refresh_token: "" };

export const Session = {
  encode(
    message: Session,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.created === true) {
      writer.uint32(8).bool(message.created);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.refresh_token !== "") {
      writer.uint32(26).string(message.refresh_token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Session {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSession } as Session;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.created = reader.bool();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          message.refresh_token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Session {
    const message = { ...baseSession } as Session;
    if (object.created !== undefined && object.created !== null) {
      message.created = Boolean(object.created);
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    }
    if (object.refresh_token !== undefined && object.refresh_token !== null) {
      message.refresh_token = String(object.refresh_token);
    }
    return message;
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.created !== undefined && (obj.created = message.created);
    message.token !== undefined && (obj.token = message.token);
    message.refresh_token !== undefined &&
      (obj.refresh_token = message.refresh_token);
    return obj;
  },

  fromPartial(object: DeepPartial<Session>): Session {
    const message = { ...baseSession } as Session;
    if (object.created !== undefined && object.created !== null) {
      message.created = object.created;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.refresh_token !== undefined && object.refresh_token !== null) {
      message.refresh_token = object.refresh_token;
    }
    return message;
  },
};

const baseStorageObject: object = {
  collection: "",
  key: "",
  user_id: "",
  value: "",
  version: "",
  permission_read: 0,
  permission_write: 0,
};

export const StorageObject = {
  encode(
    message: StorageObject,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.user_id !== "") {
      writer.uint32(26).string(message.user_id);
    }
    if (message.value !== "") {
      writer.uint32(34).string(message.value);
    }
    if (message.version !== "") {
      writer.uint32(42).string(message.version);
    }
    if (message.permission_read !== 0) {
      writer.uint32(48).int32(message.permission_read);
    }
    if (message.permission_write !== 0) {
      writer.uint32(56).int32(message.permission_write);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(74).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObject {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStorageObject } as StorageObject;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.user_id = reader.string();
          break;
        case 4:
          message.value = reader.string();
          break;
        case 5:
          message.version = reader.string();
          break;
        case 6:
          message.permission_read = reader.int32();
          break;
        case 7:
          message.permission_write = reader.int32();
          break;
        case 8:
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObject {
    const message = { ...baseStorageObject } as StorageObject;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = String(object.collection);
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = String(object.user_id);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    }
    if (
      object.permission_read !== undefined &&
      object.permission_read !== null
    ) {
      message.permission_read = Number(object.permission_read);
    }
    if (
      object.permission_write !== undefined &&
      object.permission_write !== null
    ) {
      message.permission_write = Number(object.permission_write);
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    }
    return message;
  },

  toJSON(message: StorageObject): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.value !== undefined && (obj.value = message.value);
    message.version !== undefined && (obj.version = message.version);
    message.permission_read !== undefined &&
      (obj.permission_read = message.permission_read);
    message.permission_write !== undefined &&
      (obj.permission_write = message.permission_write);
    message.create_time !== undefined &&
      (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined &&
      (obj.update_time = message.update_time.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<StorageObject>): StorageObject {
    const message = { ...baseStorageObject } as StorageObject;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = object.collection;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = object.user_id;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    if (
      object.permission_read !== undefined &&
      object.permission_read !== null
    ) {
      message.permission_read = object.permission_read;
    }
    if (
      object.permission_write !== undefined &&
      object.permission_write !== null
    ) {
      message.permission_write = object.permission_write;
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    return message;
  },
};

const baseStorageObjectAck: object = {
  collection: "",
  key: "",
  version: "",
  user_id: "",
};

export const StorageObjectAck = {
  encode(
    message: StorageObjectAck,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.user_id !== "") {
      writer.uint32(34).string(message.user_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStorageObjectAck } as StorageObjectAck;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.user_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObjectAck {
    const message = { ...baseStorageObjectAck } as StorageObjectAck;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = String(object.collection);
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    }
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = String(object.user_id);
    }
    return message;
  },

  toJSON(message: StorageObjectAck): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.version !== undefined && (obj.version = message.version);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    return obj;
  },

  fromPartial(object: DeepPartial<StorageObjectAck>): StorageObjectAck {
    const message = { ...baseStorageObjectAck } as StorageObjectAck;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = object.collection;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    if (object.user_id !== undefined && object.user_id !== null) {
      message.user_id = object.user_id;
    }
    return message;
  },
};

const baseStorageObjectAcks: object = {};

export const StorageObjectAcks = {
  encode(
    message: StorageObjectAcks,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.acks) {
      StorageObjectAck.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectAcks {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStorageObjectAcks } as StorageObjectAcks;
    message.acks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.acks.push(StorageObjectAck.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObjectAcks {
    const message = { ...baseStorageObjectAcks } as StorageObjectAcks;
    message.acks = [];
    if (object.acks !== undefined && object.acks !== null) {
      for (const e of object.acks) {
        message.acks.push(StorageObjectAck.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: StorageObjectAcks): unknown {
    const obj: any = {};
    if (message.acks) {
      obj.acks = message.acks.map((e) =>
        e ? StorageObjectAck.toJSON(e) : undefined
      );
    } else {
      obj.acks = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StorageObjectAcks>): StorageObjectAcks {
    const message = { ...baseStorageObjectAcks } as StorageObjectAcks;
    message.acks = [];
    if (object.acks !== undefined && object.acks !== null) {
      for (const e of object.acks) {
        message.acks.push(StorageObjectAck.fromPartial(e));
      }
    }
    return message;
  },
};

const baseStorageObjects: object = {};

export const StorageObjects = {
  encode(
    message: StorageObjects,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.objects) {
      StorageObject.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjects {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStorageObjects } as StorageObjects;
    message.objects = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.objects.push(StorageObject.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObjects {
    const message = { ...baseStorageObjects } as StorageObjects;
    message.objects = [];
    if (object.objects !== undefined && object.objects !== null) {
      for (const e of object.objects) {
        message.objects.push(StorageObject.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: StorageObjects): unknown {
    const obj: any = {};
    if (message.objects) {
      obj.objects = message.objects.map((e) =>
        e ? StorageObject.toJSON(e) : undefined
      );
    } else {
      obj.objects = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StorageObjects>): StorageObjects {
    const message = { ...baseStorageObjects } as StorageObjects;
    message.objects = [];
    if (object.objects !== undefined && object.objects !== null) {
      for (const e of object.objects) {
        message.objects.push(StorageObject.fromPartial(e));
      }
    }
    return message;
  },
};

const baseStorageObjectList: object = { cursor: "" };

export const StorageObjectList = {
  encode(
    message: StorageObjectList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.objects) {
      StorageObject.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStorageObjectList } as StorageObjectList;
    message.objects = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.objects.push(StorageObject.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObjectList {
    const message = { ...baseStorageObjectList } as StorageObjectList;
    message.objects = [];
    if (object.objects !== undefined && object.objects !== null) {
      for (const e of object.objects) {
        message.objects.push(StorageObject.fromJSON(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: StorageObjectList): unknown {
    const obj: any = {};
    if (message.objects) {
      obj.objects = message.objects.map((e) =>
        e ? StorageObject.toJSON(e) : undefined
      );
    } else {
      obj.objects = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<StorageObjectList>): StorageObjectList {
    const message = { ...baseStorageObjectList } as StorageObjectList;
    message.objects = [];
    if (object.objects !== undefined && object.objects !== null) {
      for (const e of object.objects) {
        message.objects.push(StorageObject.fromPartial(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseTournament: object = {
  id: "",
  title: "",
  description: "",
  category: 0,
  sort_order: 0,
  size: 0,
  max_size: 0,
  max_num_score: 0,
  can_enter: false,
  end_active: 0,
  next_reset: 0,
  metadata: "",
  duration: 0,
  start_active: 0,
};

export const Tournament = {
  encode(
    message: Tournament,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.category !== 0) {
      writer.uint32(32).uint32(message.category);
    }
    if (message.sort_order !== 0) {
      writer.uint32(40).uint32(message.sort_order);
    }
    if (message.size !== 0) {
      writer.uint32(48).uint32(message.size);
    }
    if (message.max_size !== 0) {
      writer.uint32(56).uint32(message.max_size);
    }
    if (message.max_num_score !== 0) {
      writer.uint32(64).uint32(message.max_num_score);
    }
    if (message.can_enter === true) {
      writer.uint32(72).bool(message.can_enter);
    }
    if (message.end_active !== 0) {
      writer.uint32(80).uint32(message.end_active);
    }
    if (message.next_reset !== 0) {
      writer.uint32(88).uint32(message.next_reset);
    }
    if (message.metadata !== "") {
      writer.uint32(98).string(message.metadata);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.start_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.start_time),
        writer.uint32(114).fork()
      ).ldelim();
    }
    if (message.end_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.end_time),
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.duration !== 0) {
      writer.uint32(128).uint32(message.duration);
    }
    if (message.start_active !== 0) {
      writer.uint32(136).uint32(message.start_active);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tournament {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTournament } as Tournament;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.category = reader.uint32();
          break;
        case 5:
          message.sort_order = reader.uint32();
          break;
        case 6:
          message.size = reader.uint32();
          break;
        case 7:
          message.max_size = reader.uint32();
          break;
        case 8:
          message.max_num_score = reader.uint32();
          break;
        case 9:
          message.can_enter = reader.bool();
          break;
        case 10:
          message.end_active = reader.uint32();
          break;
        case 11:
          message.next_reset = reader.uint32();
          break;
        case 12:
          message.metadata = reader.string();
          break;
        case 13:
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 14:
          message.start_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 15:
          message.end_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 16:
          message.duration = reader.uint32();
          break;
        case 17:
          message.start_active = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tournament {
    const message = { ...baseTournament } as Tournament;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    }
    if (object.category !== undefined && object.category !== null) {
      message.category = Number(object.category);
    }
    if (object.sort_order !== undefined && object.sort_order !== null) {
      message.sort_order = Number(object.sort_order);
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    }
    if (object.max_size !== undefined && object.max_size !== null) {
      message.max_size = Number(object.max_size);
    }
    if (object.max_num_score !== undefined && object.max_num_score !== null) {
      message.max_num_score = Number(object.max_num_score);
    }
    if (object.can_enter !== undefined && object.can_enter !== null) {
      message.can_enter = Boolean(object.can_enter);
    }
    if (object.end_active !== undefined && object.end_active !== null) {
      message.end_active = Number(object.end_active);
    }
    if (object.next_reset !== undefined && object.next_reset !== null) {
      message.next_reset = Number(object.next_reset);
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.start_time = fromJsonTimestamp(object.start_time);
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = fromJsonTimestamp(object.end_time);
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Number(object.duration);
    }
    if (object.start_active !== undefined && object.start_active !== null) {
      message.start_active = Number(object.start_active);
    }
    return message;
  },

  toJSON(message: Tournament): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.category !== undefined && (obj.category = message.category);
    message.sort_order !== undefined && (obj.sort_order = message.sort_order);
    message.size !== undefined && (obj.size = message.size);
    message.max_size !== undefined && (obj.max_size = message.max_size);
    message.max_num_score !== undefined &&
      (obj.max_num_score = message.max_num_score);
    message.can_enter !== undefined && (obj.can_enter = message.can_enter);
    message.end_active !== undefined && (obj.end_active = message.end_active);
    message.next_reset !== undefined && (obj.next_reset = message.next_reset);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.create_time !== undefined &&
      (obj.create_time = message.create_time.toISOString());
    message.start_time !== undefined &&
      (obj.start_time = message.start_time.toISOString());
    message.end_time !== undefined &&
      (obj.end_time = message.end_time.toISOString());
    message.duration !== undefined && (obj.duration = message.duration);
    message.start_active !== undefined &&
      (obj.start_active = message.start_active);
    return obj;
  },

  fromPartial(object: DeepPartial<Tournament>): Tournament {
    const message = { ...baseTournament } as Tournament;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.category !== undefined && object.category !== null) {
      message.category = object.category;
    }
    if (object.sort_order !== undefined && object.sort_order !== null) {
      message.sort_order = object.sort_order;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    }
    if (object.max_size !== undefined && object.max_size !== null) {
      message.max_size = object.max_size;
    }
    if (object.max_num_score !== undefined && object.max_num_score !== null) {
      message.max_num_score = object.max_num_score;
    }
    if (object.can_enter !== undefined && object.can_enter !== null) {
      message.can_enter = object.can_enter;
    }
    if (object.end_active !== undefined && object.end_active !== null) {
      message.end_active = object.end_active;
    }
    if (object.next_reset !== undefined && object.next_reset !== null) {
      message.next_reset = object.next_reset;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.start_time = object.start_time;
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = object.end_time;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = object.duration;
    }
    if (object.start_active !== undefined && object.start_active !== null) {
      message.start_active = object.start_active;
    }
    return message;
  },
};

const baseTournamentList: object = { cursor: "" };

export const TournamentList = {
  encode(
    message: TournamentList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.tournaments) {
      Tournament.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TournamentList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTournamentList } as TournamentList;
    message.tournaments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tournaments.push(Tournament.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TournamentList {
    const message = { ...baseTournamentList } as TournamentList;
    message.tournaments = [];
    if (object.tournaments !== undefined && object.tournaments !== null) {
      for (const e of object.tournaments) {
        message.tournaments.push(Tournament.fromJSON(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: TournamentList): unknown {
    const obj: any = {};
    if (message.tournaments) {
      obj.tournaments = message.tournaments.map((e) =>
        e ? Tournament.toJSON(e) : undefined
      );
    } else {
      obj.tournaments = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<TournamentList>): TournamentList {
    const message = { ...baseTournamentList } as TournamentList;
    message.tournaments = [];
    if (object.tournaments !== undefined && object.tournaments !== null) {
      for (const e of object.tournaments) {
        message.tournaments.push(Tournament.fromPartial(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseTournamentRecordList: object = { next_cursor: "", prev_cursor: "" };

export const TournamentRecordList = {
  encode(
    message: TournamentRecordList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.records) {
      LeaderboardRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.owner_records) {
      LeaderboardRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.next_cursor !== "") {
      writer.uint32(26).string(message.next_cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(34).string(message.prev_cursor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TournamentRecordList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTournamentRecordList } as TournamentRecordList;
    message.records = [];
    message.owner_records = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.records.push(
            LeaderboardRecord.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.owner_records.push(
            LeaderboardRecord.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.next_cursor = reader.string();
          break;
        case 4:
          message.prev_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TournamentRecordList {
    const message = { ...baseTournamentRecordList } as TournamentRecordList;
    message.records = [];
    message.owner_records = [];
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(LeaderboardRecord.fromJSON(e));
      }
    }
    if (object.owner_records !== undefined && object.owner_records !== null) {
      for (const e of object.owner_records) {
        message.owner_records.push(LeaderboardRecord.fromJSON(e));
      }
    }
    if (object.next_cursor !== undefined && object.next_cursor !== null) {
      message.next_cursor = String(object.next_cursor);
    }
    if (object.prev_cursor !== undefined && object.prev_cursor !== null) {
      message.prev_cursor = String(object.prev_cursor);
    }
    return message;
  },

  toJSON(message: TournamentRecordList): unknown {
    const obj: any = {};
    if (message.records) {
      obj.records = message.records.map((e) =>
        e ? LeaderboardRecord.toJSON(e) : undefined
      );
    } else {
      obj.records = [];
    }
    if (message.owner_records) {
      obj.owner_records = message.owner_records.map((e) =>
        e ? LeaderboardRecord.toJSON(e) : undefined
      );
    } else {
      obj.owner_records = [];
    }
    message.next_cursor !== undefined &&
      (obj.next_cursor = message.next_cursor);
    message.prev_cursor !== undefined &&
      (obj.prev_cursor = message.prev_cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<TournamentRecordList>): TournamentRecordList {
    const message = { ...baseTournamentRecordList } as TournamentRecordList;
    message.records = [];
    message.owner_records = [];
    if (object.records !== undefined && object.records !== null) {
      for (const e of object.records) {
        message.records.push(LeaderboardRecord.fromPartial(e));
      }
    }
    if (object.owner_records !== undefined && object.owner_records !== null) {
      for (const e of object.owner_records) {
        message.owner_records.push(LeaderboardRecord.fromPartial(e));
      }
    }
    if (object.next_cursor !== undefined && object.next_cursor !== null) {
      message.next_cursor = object.next_cursor;
    }
    if (object.prev_cursor !== undefined && object.prev_cursor !== null) {
      message.prev_cursor = object.prev_cursor;
    }
    return message;
  },
};

const baseUpdateAccountRequest: object = {};

export const UpdateAccountRequest = {
  encode(
    message: UpdateAccountRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.username !== undefined) {
      StringValue.encode(
        { value: message.username! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.display_name !== undefined) {
      StringValue.encode(
        { value: message.display_name! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.avatar_url !== undefined) {
      StringValue.encode(
        { value: message.avatar_url! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.lang_tag !== undefined) {
      StringValue.encode(
        { value: message.lang_tag! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.location !== undefined) {
      StringValue.encode(
        { value: message.location! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.timezone !== undefined) {
      StringValue.encode(
        { value: message.timezone! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.display_name = StringValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.avatar_url = StringValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.lang_tag = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.location = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.timezone = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateAccountRequest {
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.display_name !== undefined && object.display_name !== null) {
      message.display_name = String(object.display_name);
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = String(object.avatar_url);
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = String(object.lang_tag);
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    }
    if (object.timezone !== undefined && object.timezone !== null) {
      message.timezone = String(object.timezone);
    }
    return message;
  },

  toJSON(message: UpdateAccountRequest): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.display_name !== undefined &&
      (obj.display_name = message.display_name);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.location !== undefined && (obj.location = message.location);
    message.timezone !== undefined && (obj.timezone = message.timezone);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateAccountRequest>): UpdateAccountRequest {
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    if (object.display_name !== undefined && object.display_name !== null) {
      message.display_name = object.display_name;
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = object.avatar_url;
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = object.lang_tag;
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = object.location;
    }
    if (object.timezone !== undefined && object.timezone !== null) {
      message.timezone = object.timezone;
    }
    return message;
  },
};

const baseUpdateGroupRequest: object = { group_id: "" };

export const UpdateGroupRequest = {
  encode(
    message: UpdateGroupRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    if (message.name !== undefined) {
      StringValue.encode(
        { value: message.name! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.description !== undefined) {
      StringValue.encode(
        { value: message.description! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.lang_tag !== undefined) {
      StringValue.encode(
        { value: message.lang_tag! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.avatar_url !== undefined) {
      StringValue.encode(
        { value: message.avatar_url! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.open !== undefined) {
      BoolValue.encode(
        { value: message.open! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGroupRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateGroupRequest } as UpdateGroupRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.name = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.description = StringValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.lang_tag = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.avatar_url = StringValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.open = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateGroupRequest {
    const message = { ...baseUpdateGroupRequest } as UpdateGroupRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = String(object.lang_tag);
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = String(object.avatar_url);
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = Boolean(object.open);
    }
    return message;
  },

  toJSON(message: UpdateGroupRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.open !== undefined && (obj.open = message.open);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateGroupRequest>): UpdateGroupRequest {
    const message = { ...baseUpdateGroupRequest } as UpdateGroupRequest;
    if (object.group_id !== undefined && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = object.lang_tag;
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = object.avatar_url;
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = object.open;
    }
    return message;
  },
};

const baseUser: object = {
  id: "",
  username: "",
  display_name: "",
  avatar_url: "",
  lang_tag: "",
  location: "",
  timezone: "",
  metadata: "",
  facebook_id: "",
  google_id: "",
  gamecenter_id: "",
  steam_id: "",
  online: false,
  edge_count: 0,
  facebook_instant_game_id: "",
  apple_id: "",
};

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.display_name !== "") {
      writer.uint32(26).string(message.display_name);
    }
    if (message.avatar_url !== "") {
      writer.uint32(34).string(message.avatar_url);
    }
    if (message.lang_tag !== "") {
      writer.uint32(42).string(message.lang_tag);
    }
    if (message.location !== "") {
      writer.uint32(50).string(message.location);
    }
    if (message.timezone !== "") {
      writer.uint32(58).string(message.timezone);
    }
    if (message.metadata !== "") {
      writer.uint32(66).string(message.metadata);
    }
    if (message.facebook_id !== "") {
      writer.uint32(74).string(message.facebook_id);
    }
    if (message.google_id !== "") {
      writer.uint32(82).string(message.google_id);
    }
    if (message.gamecenter_id !== "") {
      writer.uint32(90).string(message.gamecenter_id);
    }
    if (message.steam_id !== "") {
      writer.uint32(98).string(message.steam_id);
    }
    if (message.online === true) {
      writer.uint32(104).bool(message.online);
    }
    if (message.edge_count !== 0) {
      writer.uint32(112).int32(message.edge_count);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(130).fork()
      ).ldelim();
    }
    if (message.facebook_instant_game_id !== "") {
      writer.uint32(138).string(message.facebook_instant_game_id);
    }
    if (message.apple_id !== "") {
      writer.uint32(146).string(message.apple_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUser } as User;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.display_name = reader.string();
          break;
        case 4:
          message.avatar_url = reader.string();
          break;
        case 5:
          message.lang_tag = reader.string();
          break;
        case 6:
          message.location = reader.string();
          break;
        case 7:
          message.timezone = reader.string();
          break;
        case 8:
          message.metadata = reader.string();
          break;
        case 9:
          message.facebook_id = reader.string();
          break;
        case 10:
          message.google_id = reader.string();
          break;
        case 11:
          message.gamecenter_id = reader.string();
          break;
        case 12:
          message.steam_id = reader.string();
          break;
        case 13:
          message.online = reader.bool();
          break;
        case 14:
          message.edge_count = reader.int32();
          break;
        case 15:
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 16:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 17:
          message.facebook_instant_game_id = reader.string();
          break;
        case 18:
          message.apple_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    const message = { ...baseUser } as User;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.display_name !== undefined && object.display_name !== null) {
      message.display_name = String(object.display_name);
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = String(object.avatar_url);
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = String(object.lang_tag);
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    }
    if (object.timezone !== undefined && object.timezone !== null) {
      message.timezone = String(object.timezone);
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    }
    if (object.facebook_id !== undefined && object.facebook_id !== null) {
      message.facebook_id = String(object.facebook_id);
    }
    if (object.google_id !== undefined && object.google_id !== null) {
      message.google_id = String(object.google_id);
    }
    if (object.gamecenter_id !== undefined && object.gamecenter_id !== null) {
      message.gamecenter_id = String(object.gamecenter_id);
    }
    if (object.steam_id !== undefined && object.steam_id !== null) {
      message.steam_id = String(object.steam_id);
    }
    if (object.online !== undefined && object.online !== null) {
      message.online = Boolean(object.online);
    }
    if (object.edge_count !== undefined && object.edge_count !== null) {
      message.edge_count = Number(object.edge_count);
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    }
    if (
      object.facebook_instant_game_id !== undefined &&
      object.facebook_instant_game_id !== null
    ) {
      message.facebook_instant_game_id = String(
        object.facebook_instant_game_id
      );
    }
    if (object.apple_id !== undefined && object.apple_id !== null) {
      message.apple_id = String(object.apple_id);
    }
    return message;
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.username !== undefined && (obj.username = message.username);
    message.display_name !== undefined &&
      (obj.display_name = message.display_name);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.location !== undefined && (obj.location = message.location);
    message.timezone !== undefined && (obj.timezone = message.timezone);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.facebook_id !== undefined &&
      (obj.facebook_id = message.facebook_id);
    message.google_id !== undefined && (obj.google_id = message.google_id);
    message.gamecenter_id !== undefined &&
      (obj.gamecenter_id = message.gamecenter_id);
    message.steam_id !== undefined && (obj.steam_id = message.steam_id);
    message.online !== undefined && (obj.online = message.online);
    message.edge_count !== undefined && (obj.edge_count = message.edge_count);
    message.create_time !== undefined &&
      (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined &&
      (obj.update_time = message.update_time.toISOString());
    message.facebook_instant_game_id !== undefined &&
      (obj.facebook_instant_game_id = message.facebook_instant_game_id);
    message.apple_id !== undefined && (obj.apple_id = message.apple_id);
    return obj;
  },

  fromPartial(object: DeepPartial<User>): User {
    const message = { ...baseUser } as User;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    }
    if (object.display_name !== undefined && object.display_name !== null) {
      message.display_name = object.display_name;
    }
    if (object.avatar_url !== undefined && object.avatar_url !== null) {
      message.avatar_url = object.avatar_url;
    }
    if (object.lang_tag !== undefined && object.lang_tag !== null) {
      message.lang_tag = object.lang_tag;
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = object.location;
    }
    if (object.timezone !== undefined && object.timezone !== null) {
      message.timezone = object.timezone;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.facebook_id !== undefined && object.facebook_id !== null) {
      message.facebook_id = object.facebook_id;
    }
    if (object.google_id !== undefined && object.google_id !== null) {
      message.google_id = object.google_id;
    }
    if (object.gamecenter_id !== undefined && object.gamecenter_id !== null) {
      message.gamecenter_id = object.gamecenter_id;
    }
    if (object.steam_id !== undefined && object.steam_id !== null) {
      message.steam_id = object.steam_id;
    }
    if (object.online !== undefined && object.online !== null) {
      message.online = object.online;
    }
    if (object.edge_count !== undefined && object.edge_count !== null) {
      message.edge_count = object.edge_count;
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    if (
      object.facebook_instant_game_id !== undefined &&
      object.facebook_instant_game_id !== null
    ) {
      message.facebook_instant_game_id = object.facebook_instant_game_id;
    }
    if (object.apple_id !== undefined && object.apple_id !== null) {
      message.apple_id = object.apple_id;
    }
    return message;
  },
};

const baseUserGroupList: object = { cursor: "" };

export const UserGroupList = {
  encode(
    message: UserGroupList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.user_groups) {
      UserGroupList_UserGroup.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGroupList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUserGroupList } as UserGroupList;
    message.user_groups = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_groups.push(
            UserGroupList_UserGroup.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserGroupList {
    const message = { ...baseUserGroupList } as UserGroupList;
    message.user_groups = [];
    if (object.user_groups !== undefined && object.user_groups !== null) {
      for (const e of object.user_groups) {
        message.user_groups.push(UserGroupList_UserGroup.fromJSON(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: UserGroupList): unknown {
    const obj: any = {};
    if (message.user_groups) {
      obj.user_groups = message.user_groups.map((e) =>
        e ? UserGroupList_UserGroup.toJSON(e) : undefined
      );
    } else {
      obj.user_groups = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<UserGroupList>): UserGroupList {
    const message = { ...baseUserGroupList } as UserGroupList;
    message.user_groups = [];
    if (object.user_groups !== undefined && object.user_groups !== null) {
      for (const e of object.user_groups) {
        message.user_groups.push(UserGroupList_UserGroup.fromPartial(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseUserGroupList_UserGroup: object = {};

export const UserGroupList_UserGroup = {
  encode(
    message: UserGroupList_UserGroup,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group !== undefined) {
      Group.encode(message.group, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode(
        { value: message.state! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UserGroupList_UserGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUserGroupList_UserGroup,
    } as UserGroupList_UserGroup;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group = Group.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserGroupList_UserGroup {
    const message = {
      ...baseUserGroupList_UserGroup,
    } as UserGroupList_UserGroup;
    if (object.group !== undefined && object.group !== null) {
      message.group = Group.fromJSON(object.group);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = Number(object.state);
    }
    return message;
  },

  toJSON(message: UserGroupList_UserGroup): unknown {
    const obj: any = {};
    message.group !== undefined &&
      (obj.group = message.group ? Group.toJSON(message.group) : undefined);
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UserGroupList_UserGroup>
  ): UserGroupList_UserGroup {
    const message = {
      ...baseUserGroupList_UserGroup,
    } as UserGroupList_UserGroup;
    if (object.group !== undefined && object.group !== null) {
      message.group = Group.fromPartial(object.group);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    }
    return message;
  },
};

const baseUsers: object = {};

export const Users = {
  encode(message: Users, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Users {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUsers } as Users;
    message.users = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.users.push(User.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Users {
    const message = { ...baseUsers } as Users;
    message.users = [];
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(User.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Users): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) => (e ? User.toJSON(e) : undefined));
    } else {
      obj.users = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Users>): Users {
    const message = { ...baseUsers } as Users;
    message.users = [];
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(User.fromPartial(e));
      }
    }
    return message;
  },
};

const baseValidatePurchaseAppleRequest: object = { receipt: "" };

export const ValidatePurchaseAppleRequest = {
  encode(
    message: ValidatePurchaseAppleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.receipt !== "") {
      writer.uint32(10).string(message.receipt);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ValidatePurchaseAppleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseValidatePurchaseAppleRequest,
    } as ValidatePurchaseAppleRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receipt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseAppleRequest {
    const message = {
      ...baseValidatePurchaseAppleRequest,
    } as ValidatePurchaseAppleRequest;
    if (object.receipt !== undefined && object.receipt !== null) {
      message.receipt = String(object.receipt);
    }
    return message;
  },

  toJSON(message: ValidatePurchaseAppleRequest): unknown {
    const obj: any = {};
    message.receipt !== undefined && (obj.receipt = message.receipt);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ValidatePurchaseAppleRequest>
  ): ValidatePurchaseAppleRequest {
    const message = {
      ...baseValidatePurchaseAppleRequest,
    } as ValidatePurchaseAppleRequest;
    if (object.receipt !== undefined && object.receipt !== null) {
      message.receipt = object.receipt;
    }
    return message;
  },
};

const baseValidatePurchaseGoogleRequest: object = { purchase: "" };

export const ValidatePurchaseGoogleRequest = {
  encode(
    message: ValidatePurchaseGoogleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.purchase !== "") {
      writer.uint32(10).string(message.purchase);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ValidatePurchaseGoogleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseValidatePurchaseGoogleRequest,
    } as ValidatePurchaseGoogleRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.purchase = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseGoogleRequest {
    const message = {
      ...baseValidatePurchaseGoogleRequest,
    } as ValidatePurchaseGoogleRequest;
    if (object.purchase !== undefined && object.purchase !== null) {
      message.purchase = String(object.purchase);
    }
    return message;
  },

  toJSON(message: ValidatePurchaseGoogleRequest): unknown {
    const obj: any = {};
    message.purchase !== undefined && (obj.purchase = message.purchase);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ValidatePurchaseGoogleRequest>
  ): ValidatePurchaseGoogleRequest {
    const message = {
      ...baseValidatePurchaseGoogleRequest,
    } as ValidatePurchaseGoogleRequest;
    if (object.purchase !== undefined && object.purchase !== null) {
      message.purchase = object.purchase;
    }
    return message;
  },
};

const baseValidatePurchaseHuaweiRequest: object = {
  purchase: "",
  signature: "",
};

export const ValidatePurchaseHuaweiRequest = {
  encode(
    message: ValidatePurchaseHuaweiRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.purchase !== "") {
      writer.uint32(10).string(message.purchase);
    }
    if (message.signature !== "") {
      writer.uint32(18).string(message.signature);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ValidatePurchaseHuaweiRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseValidatePurchaseHuaweiRequest,
    } as ValidatePurchaseHuaweiRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.purchase = reader.string();
          break;
        case 2:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseHuaweiRequest {
    const message = {
      ...baseValidatePurchaseHuaweiRequest,
    } as ValidatePurchaseHuaweiRequest;
    if (object.purchase !== undefined && object.purchase !== null) {
      message.purchase = String(object.purchase);
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = String(object.signature);
    }
    return message;
  },

  toJSON(message: ValidatePurchaseHuaweiRequest): unknown {
    const obj: any = {};
    message.purchase !== undefined && (obj.purchase = message.purchase);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ValidatePurchaseHuaweiRequest>
  ): ValidatePurchaseHuaweiRequest {
    const message = {
      ...baseValidatePurchaseHuaweiRequest,
    } as ValidatePurchaseHuaweiRequest;
    if (object.purchase !== undefined && object.purchase !== null) {
      message.purchase = object.purchase;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
};

const baseValidatedPurchase: object = {
  product_id: "",
  transaction_id: "",
  store: 0,
  provider_response: "",
  environment: 0,
};

export const ValidatedPurchase = {
  encode(
    message: ValidatedPurchase,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.product_id !== "") {
      writer.uint32(10).string(message.product_id);
    }
    if (message.transaction_id !== "") {
      writer.uint32(18).string(message.transaction_id);
    }
    if (message.store !== 0) {
      writer.uint32(24).int32(message.store);
    }
    if (message.purchase_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.purchase_time),
        writer.uint32(34).fork()
      ).ldelim();
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
    if (message.provider_response !== "") {
      writer.uint32(58).string(message.provider_response);
    }
    if (message.environment !== 0) {
      writer.uint32(64).int32(message.environment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatedPurchase {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidatedPurchase } as ValidatedPurchase;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.product_id = reader.string();
          break;
        case 2:
          message.transaction_id = reader.string();
          break;
        case 3:
          message.store = reader.int32() as any;
          break;
        case 4:
          message.purchase_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
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
          message.provider_response = reader.string();
          break;
        case 8:
          message.environment = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatedPurchase {
    const message = { ...baseValidatedPurchase } as ValidatedPurchase;
    if (object.product_id !== undefined && object.product_id !== null) {
      message.product_id = String(object.product_id);
    }
    if (object.transaction_id !== undefined && object.transaction_id !== null) {
      message.transaction_id = String(object.transaction_id);
    }
    if (object.store !== undefined && object.store !== null) {
      message.store = validatedPurchase_StoreFromJSON(object.store);
    }
    if (object.purchase_time !== undefined && object.purchase_time !== null) {
      message.purchase_time = fromJsonTimestamp(object.purchase_time);
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    }
    if (
      object.provider_response !== undefined &&
      object.provider_response !== null
    ) {
      message.provider_response = String(object.provider_response);
    }
    if (object.environment !== undefined && object.environment !== null) {
      message.environment = validatedPurchase_EnvironmentFromJSON(
        object.environment
      );
    }
    return message;
  },

  toJSON(message: ValidatedPurchase): unknown {
    const obj: any = {};
    message.product_id !== undefined && (obj.product_id = message.product_id);
    message.transaction_id !== undefined &&
      (obj.transaction_id = message.transaction_id);
    message.store !== undefined &&
      (obj.store = validatedPurchase_StoreToJSON(message.store));
    message.purchase_time !== undefined &&
      (obj.purchase_time = message.purchase_time.toISOString());
    message.create_time !== undefined &&
      (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined &&
      (obj.update_time = message.update_time.toISOString());
    message.provider_response !== undefined &&
      (obj.provider_response = message.provider_response);
    message.environment !== undefined &&
      (obj.environment = validatedPurchase_EnvironmentToJSON(
        message.environment
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ValidatedPurchase>): ValidatedPurchase {
    const message = { ...baseValidatedPurchase } as ValidatedPurchase;
    if (object.product_id !== undefined && object.product_id !== null) {
      message.product_id = object.product_id;
    }
    if (object.transaction_id !== undefined && object.transaction_id !== null) {
      message.transaction_id = object.transaction_id;
    }
    if (object.store !== undefined && object.store !== null) {
      message.store = object.store;
    }
    if (object.purchase_time !== undefined && object.purchase_time !== null) {
      message.purchase_time = object.purchase_time;
    }
    if (object.create_time !== undefined && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.update_time !== undefined && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    if (
      object.provider_response !== undefined &&
      object.provider_response !== null
    ) {
      message.provider_response = object.provider_response;
    }
    if (object.environment !== undefined && object.environment !== null) {
      message.environment = object.environment;
    }
    return message;
  },
};

const baseValidatePurchaseResponse: object = {};

export const ValidatePurchaseResponse = {
  encode(
    message: ValidatePurchaseResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.validated_purchases) {
      ValidatedPurchase.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ValidatePurchaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseValidatePurchaseResponse,
    } as ValidatePurchaseResponse;
    message.validated_purchases = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validated_purchases.push(
            ValidatedPurchase.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseResponse {
    const message = {
      ...baseValidatePurchaseResponse,
    } as ValidatePurchaseResponse;
    message.validated_purchases = [];
    if (
      object.validated_purchases !== undefined &&
      object.validated_purchases !== null
    ) {
      for (const e of object.validated_purchases) {
        message.validated_purchases.push(ValidatedPurchase.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ValidatePurchaseResponse): unknown {
    const obj: any = {};
    if (message.validated_purchases) {
      obj.validated_purchases = message.validated_purchases.map((e) =>
        e ? ValidatedPurchase.toJSON(e) : undefined
      );
    } else {
      obj.validated_purchases = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ValidatePurchaseResponse>
  ): ValidatePurchaseResponse {
    const message = {
      ...baseValidatePurchaseResponse,
    } as ValidatePurchaseResponse;
    message.validated_purchases = [];
    if (
      object.validated_purchases !== undefined &&
      object.validated_purchases !== null
    ) {
      for (const e of object.validated_purchases) {
        message.validated_purchases.push(ValidatedPurchase.fromPartial(e));
      }
    }
    return message;
  },
};

const basePurchaseList: object = { cursor: "" };

export const PurchaseList = {
  encode(
    message: PurchaseList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.validated_purchases) {
      ValidatedPurchase.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PurchaseList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePurchaseList } as PurchaseList;
    message.validated_purchases = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validated_purchases.push(
            ValidatedPurchase.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PurchaseList {
    const message = { ...basePurchaseList } as PurchaseList;
    message.validated_purchases = [];
    if (
      object.validated_purchases !== undefined &&
      object.validated_purchases !== null
    ) {
      for (const e of object.validated_purchases) {
        message.validated_purchases.push(ValidatedPurchase.fromJSON(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    }
    return message;
  },

  toJSON(message: PurchaseList): unknown {
    const obj: any = {};
    if (message.validated_purchases) {
      obj.validated_purchases = message.validated_purchases.map((e) =>
        e ? ValidatedPurchase.toJSON(e) : undefined
      );
    } else {
      obj.validated_purchases = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  fromPartial(object: DeepPartial<PurchaseList>): PurchaseList {
    const message = { ...basePurchaseList } as PurchaseList;
    message.validated_purchases = [];
    if (
      object.validated_purchases !== undefined &&
      object.validated_purchases !== null
    ) {
      for (const e of object.validated_purchases) {
        message.validated_purchases.push(ValidatedPurchase.fromPartial(e));
      }
    }
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    }
    return message;
  },
};

const baseWriteLeaderboardRecordRequest: object = { leaderboard_id: "" };

export const WriteLeaderboardRecordRequest = {
  encode(
    message: WriteLeaderboardRecordRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    if (message.record !== undefined) {
      WriteLeaderboardRecordRequest_LeaderboardRecordWrite.encode(
        message.record,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WriteLeaderboardRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseWriteLeaderboardRecordRequest,
    } as WriteLeaderboardRecordRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaderboard_id = reader.string();
          break;
        case 2:
          message.record = WriteLeaderboardRecordRequest_LeaderboardRecordWrite.decode(
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

  fromJSON(object: any): WriteLeaderboardRecordRequest {
    const message = {
      ...baseWriteLeaderboardRecordRequest,
    } as WriteLeaderboardRecordRequest;
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = String(object.leaderboard_id);
    }
    if (object.record !== undefined && object.record !== null) {
      message.record = WriteLeaderboardRecordRequest_LeaderboardRecordWrite.fromJSON(
        object.record
      );
    }
    return message;
  },

  toJSON(message: WriteLeaderboardRecordRequest): unknown {
    const obj: any = {};
    message.leaderboard_id !== undefined &&
      (obj.leaderboard_id = message.leaderboard_id);
    message.record !== undefined &&
      (obj.record = message.record
        ? WriteLeaderboardRecordRequest_LeaderboardRecordWrite.toJSON(
            message.record
          )
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<WriteLeaderboardRecordRequest>
  ): WriteLeaderboardRecordRequest {
    const message = {
      ...baseWriteLeaderboardRecordRequest,
    } as WriteLeaderboardRecordRequest;
    if (object.leaderboard_id !== undefined && object.leaderboard_id !== null) {
      message.leaderboard_id = object.leaderboard_id;
    }
    if (object.record !== undefined && object.record !== null) {
      message.record = WriteLeaderboardRecordRequest_LeaderboardRecordWrite.fromPartial(
        object.record
      );
    }
    return message;
  },
};

const baseWriteLeaderboardRecordRequest_LeaderboardRecordWrite: object = {
  score: 0,
  subscore: 0,
  metadata: "",
  operator: 0,
};

export const WriteLeaderboardRecordRequest_LeaderboardRecordWrite = {
  encode(
    message: WriteLeaderboardRecordRequest_LeaderboardRecordWrite,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.score !== 0) {
      writer.uint32(8).int64(message.score);
    }
    if (message.subscore !== 0) {
      writer.uint32(16).int64(message.subscore);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.operator !== 0) {
      writer.uint32(32).int32(message.operator);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseWriteLeaderboardRecordRequest_LeaderboardRecordWrite,
    } as WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.score = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.subscore = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.operator = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    const message = {
      ...baseWriteLeaderboardRecordRequest_LeaderboardRecordWrite,
    } as WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
    if (object.score !== undefined && object.score !== null) {
      message.score = Number(object.score);
    }
    if (object.subscore !== undefined && object.subscore !== null) {
      message.subscore = Number(object.subscore);
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    }
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = overrideOperatorFromJSON(object.operator);
    }
    return message;
  },

  toJSON(
    message: WriteLeaderboardRecordRequest_LeaderboardRecordWrite
  ): unknown {
    const obj: any = {};
    message.score !== undefined && (obj.score = message.score);
    message.subscore !== undefined && (obj.subscore = message.subscore);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.operator !== undefined &&
      (obj.operator = overrideOperatorToJSON(message.operator));
    return obj;
  },

  fromPartial(
    object: DeepPartial<WriteLeaderboardRecordRequest_LeaderboardRecordWrite>
  ): WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    const message = {
      ...baseWriteLeaderboardRecordRequest_LeaderboardRecordWrite,
    } as WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
    if (object.score !== undefined && object.score !== null) {
      message.score = object.score;
    }
    if (object.subscore !== undefined && object.subscore !== null) {
      message.subscore = object.subscore;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = object.operator;
    }
    return message;
  },
};

const baseWriteStorageObject: object = {
  collection: "",
  key: "",
  value: "",
  version: "",
};

export const WriteStorageObject = {
  encode(
    message: WriteStorageObject,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.permission_read !== undefined) {
      Int32Value.encode(
        { value: message.permission_read! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.permission_write !== undefined) {
      Int32Value.encode(
        { value: message.permission_write! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteStorageObject {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWriteStorageObject } as WriteStorageObject;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.value = reader.string();
          break;
        case 4:
          message.version = reader.string();
          break;
        case 5:
          message.permission_read = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.permission_write = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WriteStorageObject {
    const message = { ...baseWriteStorageObject } as WriteStorageObject;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = String(object.collection);
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    }
    if (
      object.permission_read !== undefined &&
      object.permission_read !== null
    ) {
      message.permission_read = Number(object.permission_read);
    }
    if (
      object.permission_write !== undefined &&
      object.permission_write !== null
    ) {
      message.permission_write = Number(object.permission_write);
    }
    return message;
  },

  toJSON(message: WriteStorageObject): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    message.version !== undefined && (obj.version = message.version);
    message.permission_read !== undefined &&
      (obj.permission_read = message.permission_read);
    message.permission_write !== undefined &&
      (obj.permission_write = message.permission_write);
    return obj;
  },

  fromPartial(object: DeepPartial<WriteStorageObject>): WriteStorageObject {
    const message = { ...baseWriteStorageObject } as WriteStorageObject;
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = object.collection;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    if (
      object.permission_read !== undefined &&
      object.permission_read !== null
    ) {
      message.permission_read = object.permission_read;
    }
    if (
      object.permission_write !== undefined &&
      object.permission_write !== null
    ) {
      message.permission_write = object.permission_write;
    }
    return message;
  },
};

const baseWriteStorageObjectsRequest: object = {};

export const WriteStorageObjectsRequest = {
  encode(
    message: WriteStorageObjectsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.objects) {
      WriteStorageObject.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WriteStorageObjectsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseWriteStorageObjectsRequest,
    } as WriteStorageObjectsRequest;
    message.objects = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.objects.push(
            WriteStorageObject.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WriteStorageObjectsRequest {
    const message = {
      ...baseWriteStorageObjectsRequest,
    } as WriteStorageObjectsRequest;
    message.objects = [];
    if (object.objects !== undefined && object.objects !== null) {
      for (const e of object.objects) {
        message.objects.push(WriteStorageObject.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: WriteStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.objects) {
      obj.objects = message.objects.map((e) =>
        e ? WriteStorageObject.toJSON(e) : undefined
      );
    } else {
      obj.objects = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<WriteStorageObjectsRequest>
  ): WriteStorageObjectsRequest {
    const message = {
      ...baseWriteStorageObjectsRequest,
    } as WriteStorageObjectsRequest;
    message.objects = [];
    if (object.objects !== undefined && object.objects !== null) {
      for (const e of object.objects) {
        message.objects.push(WriteStorageObject.fromPartial(e));
      }
    }
    return message;
  },
};

const baseWriteTournamentRecordRequest: object = { tournament_id: "" };

export const WriteTournamentRecordRequest = {
  encode(
    message: WriteTournamentRecordRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    if (message.record !== undefined) {
      WriteTournamentRecordRequest_TournamentRecordWrite.encode(
        message.record,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WriteTournamentRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseWriteTournamentRecordRequest,
    } as WriteTournamentRecordRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tournament_id = reader.string();
          break;
        case 2:
          message.record = WriteTournamentRecordRequest_TournamentRecordWrite.decode(
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

  fromJSON(object: any): WriteTournamentRecordRequest {
    const message = {
      ...baseWriteTournamentRecordRequest,
    } as WriteTournamentRecordRequest;
    if (object.tournament_id !== undefined && object.tournament_id !== null) {
      message.tournament_id = String(object.tournament_id);
    }
    if (object.record !== undefined && object.record !== null) {
      message.record = WriteTournamentRecordRequest_TournamentRecordWrite.fromJSON(
        object.record
      );
    }
    return message;
  },

  toJSON(message: WriteTournamentRecordRequest): unknown {
    const obj: any = {};
    message.tournament_id !== undefined &&
      (obj.tournament_id = message.tournament_id);
    message.record !== undefined &&
      (obj.record = message.record
        ? WriteTournamentRecordRequest_TournamentRecordWrite.toJSON(
            message.record
          )
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<WriteTournamentRecordRequest>
  ): WriteTournamentRecordRequest {
    const message = {
      ...baseWriteTournamentRecordRequest,
    } as WriteTournamentRecordRequest;
    if (object.tournament_id !== undefined && object.tournament_id !== null) {
      message.tournament_id = object.tournament_id;
    }
    if (object.record !== undefined && object.record !== null) {
      message.record = WriteTournamentRecordRequest_TournamentRecordWrite.fromPartial(
        object.record
      );
    }
    return message;
  },
};

const baseWriteTournamentRecordRequest_TournamentRecordWrite: object = {
  score: 0,
  subscore: 0,
  metadata: "",
  operator: 0,
};

export const WriteTournamentRecordRequest_TournamentRecordWrite = {
  encode(
    message: WriteTournamentRecordRequest_TournamentRecordWrite,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.score !== 0) {
      writer.uint32(8).int64(message.score);
    }
    if (message.subscore !== 0) {
      writer.uint32(16).int64(message.subscore);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.operator !== 0) {
      writer.uint32(32).int32(message.operator);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WriteTournamentRecordRequest_TournamentRecordWrite {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseWriteTournamentRecordRequest_TournamentRecordWrite,
    } as WriteTournamentRecordRequest_TournamentRecordWrite;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.score = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.subscore = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.operator = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WriteTournamentRecordRequest_TournamentRecordWrite {
    const message = {
      ...baseWriteTournamentRecordRequest_TournamentRecordWrite,
    } as WriteTournamentRecordRequest_TournamentRecordWrite;
    if (object.score !== undefined && object.score !== null) {
      message.score = Number(object.score);
    }
    if (object.subscore !== undefined && object.subscore !== null) {
      message.subscore = Number(object.subscore);
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    }
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = overrideOperatorFromJSON(object.operator);
    }
    return message;
  },

  toJSON(message: WriteTournamentRecordRequest_TournamentRecordWrite): unknown {
    const obj: any = {};
    message.score !== undefined && (obj.score = message.score);
    message.subscore !== undefined && (obj.subscore = message.subscore);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.operator !== undefined &&
      (obj.operator = overrideOperatorToJSON(message.operator));
    return obj;
  },

  fromPartial(
    object: DeepPartial<WriteTournamentRecordRequest_TournamentRecordWrite>
  ): WriteTournamentRecordRequest_TournamentRecordWrite {
    const message = {
      ...baseWriteTournamentRecordRequest_TournamentRecordWrite,
    } as WriteTournamentRecordRequest_TournamentRecordWrite;
    if (object.score !== undefined && object.score !== null) {
      message.score = object.score;
    }
    if (object.subscore !== undefined && object.subscore !== null) {
      message.subscore = object.subscore;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = object.operator;
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
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & {
      $case: T["$case"];
    }
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
