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

import {
  ApiAccount,
  ApiAccountCustom,
  ApiAccountDevice,
  ApiAccountEmail,
  ApiAccountFacebook,
  ApiAccountFacebookInstantGame,
  ApiAccountGoogle,
  ApiAccountGameCenter,
  ApiAccountSteam,
  ApiChannelMessageList,
  ApiCreateGroupRequest,
  ApiDeleteStorageObjectsRequest,
  ApiEvent,
  ApiFriendList,
  ApiGroup,
  ApiGroupList,
  ApiGroupUserList,
  ApiLeaderboardRecord,
  ApiLeaderboardRecordList,
  ApiMatchList,
  ApiNotificationList,
  ApiReadStorageObjectsRequest,
  ApiRpc,
  ApiStorageObjectAcks,
  ApiStorageObjectList,
  ApiStorageObjects,
  ApiTournamentList,
  ApiTournamentRecordList,
  ApiUpdateAccountRequest,
  ApiUpdateGroupRequest,
  ApiUsers,
  ApiUserGroupList,
  ApiWriteStorageObjectsRequest,
  NakamaApi,
  ApiSession,
  ApiAccountApple,
  ApiLinkSteamRequest,
  ApiValidatePurchaseResponse,
  ApiFriendsOfFriendsList,
  ApiStoreEnvironment,
  ApiStoreProvider,
  ApiValidateSubscriptionResponse,
  ApiValidatedSubscription,
} from "./api.gen";

import { Session } from "./session";
import { DefaultSocket, Socket } from "./socket";
import { WebSocketAdapter, WebSocketAdapterText } from "./web_socket_adapter";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7350";
const DEFAULT_SERVER_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;

/** Response for an RPC function executed on the server. */
export interface RpcResponse {
  /** The identifier of the function. */
  id?: string;
  /** The payload of the function which must be a JSON object. */
  payload?: object;
}

/** Represents a complete leaderboard record with all scores and associated metadata. */
export interface LeaderboardRecord {
  /** The UNIX time when the leaderboard record was created. */
  create_time?: string;
  /** The UNIX time when the leaderboard record expires. */
  expiry_time?: string;
  /** The ID of the leaderboard this score belongs to. */
  leaderboard_id?: string;
  /** Metadata. */
  metadata?: object;
  /** The number of submissions to this score record. */
  num_score?: number;
  /** The ID of the score owner, usually a user or group. */
  owner_id?: string;
  /** The rank of this record. */
  rank?: number;
  /** The score value. */
  score?: number;
  /** An optional subscore value. */
  subscore?: number;
  /** The UNIX time when the leaderboard record was updated. */
  update_time?: string;
  /** The username of the score owner, if the owner is a user. */
  username?: string;
  /** The maximum number of score updates allowed by the owner. */
  max_num_score?: number;
}

/** A set of leaderboard records, may be part of a leaderboard records page or a batch of individual records. */
export interface LeaderboardRecordList {
  /** The cursor to send when retrieving the next page, if any. */
  next_cursor?: string;
  /** A batched set of leaderboard records belonging to specified owners. */
  owner_records?: Array<LeaderboardRecord>;
  /** The cursor to send when retrieving the previous page, if any. */
  prev_cursor?: string;
  // The total number of ranks available.
  rank_count?: number;
  /** A list of leaderboard records. */
  records?: Array<LeaderboardRecord>;
}

/** A Tournament on the server. */
export interface Tournament {
  /** Whether the leaderboard was created authoritatively or not. */
  authoritative?: boolean;
  /** The ID of the tournament. */
  id?: string;
  /** The title for the tournament. */
  title?: string;
  /** The description of the tournament. May be blank. */
  description?: string;
  /** The UNIX timestamp for duration of a tournament. */
  duration?: number;
  /** The category of the tournament. e.g. "vip" could be category 1. */
  category?: number;
  /** ASC or DESC sort mode of scores in the tournament. */
  sort_order?: number;
  /** The current number of players in the tournament. */
  size?: number;
  /** The maximum number of players for the tournament. */
  max_size?: number;
  /** The maximum score updates allowed per player for the current tournament. */
  max_num_score?: number;
  /** True if the tournament is active and can enter. A computed value. */
  can_enter?: boolean;
  /** The UNIX timestamp when the tournament stops being active until next reset. A computed value. */
  end_active?: number;
  /** The UNIX timestamp when the tournament is next playable. A computed value. */
  next_reset?: number;
  /** Additional information stored as a JSON object. */
  metadata?: object;
  /** The UNIX time when the tournament was created. */
  create_time?: string;
  /** The UNIX time when the tournament will start. */
  start_time?: string;
  /** The UNIX time when the tournament will be stopped. */
  end_time?: string;
  /** The UNIX time when the tournament start being active. A computed value. */
  start_active?: number;
}

/** A list of tournaments. */
export interface TournamentList {
  /** The list of tournaments returned. */
  tournaments?: Array<Tournament>;
  /** A pagination cursor (optional). */
  cursor?: string,
}

/** A set of tournament records, may be part of a tournament records page or a batch of individual records. */
export interface TournamentRecordList {
  /** The cursor to send when retireving the next page, if any. */
  next_cursor?: string;
  /** A batched set of tournament records belonging to specified owners. */
  owner_records?: Array<LeaderboardRecord>;
  /** The cursor to send when retrieving the previous page, if any. */
  prev_cursor?: string;
  /** A list of tournament records. */
  records?: Array<LeaderboardRecord>;
}

/** Record values to write. */
export interface WriteTournamentRecord {
  /** Optional record metadata. */
  metadata?: object;
  /** The score value to submit. */
  score?: string;
  /** An optional secondary value. */
  subscore?: string;
}

/** Record values to write. */
export interface WriteLeaderboardRecord {
  /** Optional record metadata. */
  metadata?: object;
  /** The score value to submit. */
  score?: string;
  /** An optional secondary value. */
  subscore?: string;
}

/** The object to store. */
export interface WriteStorageObject {
  /** The collection to store the object. */
  collection?: string;
  /** The key for the object within the collection. */
  key?: string;
  /** The read access permissions for the object. */
  permission_read?: number;
  /** The write access permissions for the object. */
  permission_write?: number;
  /** The value of the object. */
  value?: object;
  /** The version hash of the object to check. Possible values are: ["", "*", "#hash#"]. */
  version?: string;
}

/** An object within the storage engine. */
export interface StorageObject {
  /** The collection which stores the object. */
  collection?: string;
  /** The UNIX time when the object was created. */
  create_time?: string;
  /** The key of the object within the collection. */
  key?: string;
  /** The read access permissions for the object. */
  permission_read?: number;
  /** The write access permissions for the object. */
  permission_write?: number;
  /** The UNIX time when the object was last updated. */
  update_time?: string;
  /** The user owner of the object. */
  user_id?: string;
  /** The value of the object. */
  value?: object;
  /** The version hash of the object. */
  version?: string;
}

/** List of storage objects. */
export interface StorageObjectList {
  /** The cursor associated with the query a page of results. */
  cursor?: string;
  /** The list of storage objects. */
  objects: Array<StorageObject>;
}

/** Batch of storage objects. */
export interface StorageObjects {
  /** The batch of storage objects. */
  objects: Array<StorageObject>;
}

/** A message sent on a channel. */
export interface ChannelMessage {
  /** The channel this message belongs to. */
  channel_id?: string;
  /** The code representing a message type or category. */
  code?: number;
  /** The content payload. */
  content?: object;
  /** The UNIX time when the message was created. */
  create_time?: string;
  /** The ID of the group, or an empty string if this message was not sent through a group channel. */
  group_id?: string;
  /** The unique ID of this message. */
  message_id?: string;
  /** True if the message was persisted to the channel's history, false otherwise. */
  persistent?: boolean;
  /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
  room_name?: string;
  /** Another message ID reference, if any. */
  reference_id?: string;
  /** Message sender, usually a user ID. */
  sender_id?: string;
  /** The UNIX time when the message was last updated. */
  update_time?: string;
  /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_one?: string;
  /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_two?: string;
  /** The username of the message sender, if any. */
  username?: string;
}

/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
  /** Cacheable cursor to list newer messages. Durable and designed to be stored, unlike next/prev cursors. */
  cacheable_cursor?: string;
  /** A list of messages. */
  messages?: Array<ChannelMessage>;
  /** The cursor to send when retireving the next page, if any. */
  next_cursor?: string;
  /** The cursor to send when retrieving the previous page, if any. */
  prev_cursor?: string;
}

/** A user in the system. */
export interface User {
  /** A URL for an avatar image. */
  avatar_url?: string;
  /** The UNIX time when the user was created. */
  create_time?: string;
  /** The display name of the user. */
  display_name?: string;
  /** Number of related edges to this user. */
  edge_count?: number;
  /** The Facebook id in the user's account. */
  facebook_id?: string;
  /** The Facebook Instant Game ID in the user's account. */
  facebook_instant_game_id?: string;
  /** The Apple Game Center in of the user's account. */
  gamecenter_id?: string;
  /** The Google id in the user's account. */
  google_id?: string;
  /** The id of the user's account. */
  id?: string;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag?: string;
  /** The location set by the user. */
  location?: string;
  /** Additional information stored as a JSON object. */
  metadata?: {};
  /** Indicates whether the user is currently online. */
  online?: boolean;
  /** The Steam id in the user's account. */
  steam_id?: string;
  /** The timezone set by the user. */
  timezone?: string;
  /** The UNIX time when the user was last updated. */
  update_time?: string;
  /** The username of the user's account. */
  username?: string;
}

/** A collection of zero or more users. */
export interface Users {
  /** The User objects. */
  users?: Array<User>;
}

/** A friend of a user. */
export interface Friend {
  /** The friend status. */
  state?: number;
  /** The user object. */
  user?: User;
}

/** A collection of zero or more friends of the user. */
export interface Friends {
  /** The Friend objects. */
  friends?: Array<Friend>;
  /** Cursor for the next page of results, if any. */
  cursor?: string;
}

/** A friend of a friend. */
export interface FriendOfFriend {
  // The user who referred its friend.
  referrer?: string;
  // User.
  user?: User;
}

/** Friends of the user's friends. */
export interface FriendsOfFriends {
  // Cursor for the next page of results, if any.
  cursor?: string;
  // User friends of friends.
  friends_of_friends?: Array<FriendOfFriend>;
}

/** A user-role pair representing the user's role in a group. */
export interface GroupUser {
  /** The user. */
  user?: User;
  /** Their role within the group. */
  state?: number;
}

/** A list of users belonging to a group along with their role in it. */
export interface GroupUserList {
  /** The user-role pairs. */
  group_users?: Array<GroupUser>;
  /** Cursor for the next page of results, if any. */
  cursor?: string;
}

/** A group in the server. */
export interface Group {
  /** A URL for an avatar image. */
  avatar_url?: string;
  /** The UNIX time when the group was created. */
  create_time?: string;
  /** The id of the user who created the group. */
  creator_id?: string;
  /** A description for the group. */
  description?: string;
  /** The current count of all members in the group. */
  edge_count?: number;
  /** The id of a group. */
  id?: string;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag?: string;
  /** The maximum number of members allowed. */
  max_count?: number;
  /** Additional information stored as a JSON object. */
  metadata?: {};
  /** The unique name of the group. */
  name?: string;
  /** Anyone can join open groups, otherwise only admins can accept members. */
  open?: boolean;
  /** The UNIX time when the group was last updated. */
  update_time?: string;
}

/** One or more groups returned from a listing operation. */
export interface GroupList {
  /** A cursor used to get the next page. */
  cursor?: string;
  /** One or more groups. */
  groups?: Array<Group>;
}

/** A group-role pair representing the user's groups and their role in each. */
export interface UserGroup {
  /** The group. */
  group?: Group;
  /** The user's role within the group. */
  state?: number;
}

/** A list of groups belonging to a user along with their role in it. */
export interface UserGroupList {
  /** The group-role pairs. */
  user_groups?: Array<UserGroup>;
  /** Cursor for the next page of results, if any. */
  cursor?: string;
}

/** A notification in the server. */
export interface Notification {
  /** Category code for this notification. */
  code?: number;
  /** Content of the notification in JSON. */
  content?: {};
  /** The UNIX time when the notification was created. */
  create_time?: string;
  /** ID of the Notification. */
  id?: string;
  /** True if this notification was persisted to the database. */
  persistent?: boolean;
  /** ID of the sender, if a user. Otherwise 'null'. */
  sender_id?: string;
  /** Subject of the notification. */
  subject?: string;
}

/** A collection of zero or more notifications. */
export interface NotificationList {
  /** Use this cursor to paginate notifications. Cache this to catch up to new notifications. */
  cacheable_cursor?: string;
  /** Collection of notifications. */
  notifications?: Array<Notification>;
}

/* A validated subscription stored by Nakama. */
export interface ValidatedSubscription {
  // Whether the subscription is currently active or not.
  active?: boolean;
  // UNIX Timestamp when the receipt validation was stored in DB.
  create_time?: string;
  // Whether the purchase was done in production or sandbox environment.
  environment?: ApiStoreEnvironment;
  // Subscription expiration time. The subscription can still be auto-renewed to extend the expiration time further.
  expiry_time?: string;
  // Purchase Original transaction ID (we only keep track of the original subscription, not subsequent renewals).
  original_transaction_id?: string;
  // Purchase Product ID.
  product_id?: string;
  // Raw provider notification body.
  provider_notification?: string;
  // Raw provider validation response body.
  provider_response?: string;
  // UNIX Timestamp when the purchase was done.
  purchase_time?: string;
  // Subscription refund time. If this time is set, the subscription was refunded.
  refund_time?: string;
  // The validation provider.
  store?: ApiStoreProvider;
  // UNIX Timestamp when the receipt validation was updated in DB.
  update_time?: string;
  // Subscription User ID.
  user_id?: string;
}

/** A list of validated subscriptions stored by Nakama. */
export interface SubscriptionList {
  // The cursor to send when retrieving the next page, if any.
  cursor?: string;
  // The cursor to send when retrieving the previous page, if any.
  prev_cursor?: string;
  // Stored validated subscriptions.
  validated_subscriptions?: Array<ValidatedSubscription>;
}

/** A client for Nakama server. */
export class Client {

  /** The expired timespan used to check session lifetime. */
  public expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;

  /** The low level API client for Nakama server. */
  private readonly apiClient: NakamaApi;

  constructor(
      readonly serverkey = DEFAULT_SERVER_KEY,
      readonly host = DEFAULT_HOST,
      readonly port = DEFAULT_PORT,
      readonly useSSL = false,
      readonly timeout = DEFAULT_TIMEOUT_MS,
      readonly autoRefreshSession = true) {
    const scheme = (useSSL) ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    this.apiClient = new NakamaApi(serverkey, basePath, timeout);
  }

  /** Add users to a group, or accept their join requests. */
  async addGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean> {

    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.addGroupUsers(session.token, groupId, ids).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add friends by ID or username to a user's account. */
  async addFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {

    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.addFriends(session.token, ids, usernames).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Authenticate a user with an Apple ID against the server. */
  async authenticateApple(token: string, create?: boolean, username?: string, vars: Record<string, string> = {}, options: any = {}) {

    const request = {
      "token": token,
      "vars": vars
    };

    return this.apiClient.authenticateApple(this.serverkey, "", request, create, username, options).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with a custom id against the server. */
  authenticateCustom(id: string, create?: boolean, username?: string, vars: Record<string, string> = {}, options: any = {}): Promise<Session> {
    const request = {
      "id": id,
      "vars": vars
    };
    return this.apiClient.authenticateCustom(this.serverkey, "", request, create, username, options).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with a device id against the server. */
  authenticateDevice(id : string, create?: boolean, username?: string, vars? : Record<string, string>): Promise<Session> {
    const request = {
      "id": id,
      "vars": vars
    };

    return this.apiClient.authenticateDevice(this.serverkey, "", request, create, username).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(email: string, password: string, create?: boolean, username?: string, vars?: Record<string,string>): Promise<Session> {
    const request = {
      "email": email,
      "password": password,
      "vars": vars
    };

    return this.apiClient.authenticateEmail(this.serverkey, "", request, create, username).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with a Facebook Instant Game token against the server. */
  authenticateFacebookInstantGame(signedPlayerInfo: string, create?: boolean, username?: string, vars?: Record<string, string>, options: any = {}): Promise<Session> {
    const request = {
      "signed_player_info": signedPlayerInfo,
      "vars": vars
    };

    return this.apiClient.authenticateFacebookInstantGame(this.serverkey, "",
      {signed_player_info: request.signed_player_info, vars: request.vars}, create, username, options).then((apiSession : ApiSession) => {
        return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
      });
  }

  /** Authenticate a user with a Facebook OAuth token against the server. */
  authenticateFacebook(token : string, create?: boolean, username?: string, sync?: boolean, vars? : Record<string, string>, options: any = {}): Promise<Session> {
    const request = {
      "token": token,
      "vars": vars
    };

    return this.apiClient.authenticateFacebook(this.serverkey, "", request, create, username, sync, options).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with Google against the server. */
  async authenticateGoogle(
    token: string,
    create?: boolean,
    username?: string,
    vars?: Record<string, string>,
    options: any = {}
  ): Promise<Session> {
    const request: ApiAccountGoogle = {
      token,
      vars,
    };

    const apiSession = await this.apiClient.authenticateGoogle(
      this.serverkey,
      "",
      request,
      create,
      username,
      options
    );

    return new Session(
      apiSession.token || "",
      apiSession.refresh_token || "",
      apiSession.created || false
    );
  }

  /** Authenticate a user with GameCenter against the server. */
  async authenticateGameCenter(
    bundleId: string,
    playerId: string,
    publicKeyUrl: string,
    salt: string,
    signature: string,
    timestamp: string,
    username?: string,
    create?: boolean,
    vars?: Record<string, string>,
    options: any = {},
  ): Promise<Session> {
    const request: ApiAccountGameCenter = {
      bundle_id: bundleId,
      player_id: playerId,
      public_key_url: publicKeyUrl,
      salt,
      signature,
      timestamp_seconds: timestamp,
      vars,
    };

    const apiSession = await this.apiClient.authenticateGameCenter(
      this.serverkey,
      "",
      request,
      create,
      username,
      options
    );

    return new Session(
      apiSession.token || "",
      apiSession.refresh_token || "",
      apiSession.created || false
    );
  }

  /** Authenticate a user with Steam against the server. */
  async authenticateSteam(token : string, create?: boolean, username?: string, sync?: boolean, vars? : Record<string, string>) : Promise<Session> {
    const request = {
      "token": token,
      "vars": vars,
      "sync": sync
    };

    return this.apiClient.authenticateSteam(this.serverkey, "", request, create, username).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

    /** Ban users from a group. */
 async banGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.banGroupUsers(session.token, groupId, ids).then((response: any) => {
        return response !== undefined;
    });
  }

  /** Block one or more users by ID or username. */
  async blockFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.blockFriends(session.token, ids, usernames).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Create a new group with the current user as the creator and superadmin. */
  async createGroup(session: Session, request: ApiCreateGroupRequest): Promise<Group> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.createGroup(session.token, request).then((response: ApiGroup) => {
      return Promise.resolve({
        avatar_url: response.avatar_url,
        create_time: response.create_time,
        creator_id: response.creator_id,
        description: response.description,
        edge_count: response.edge_count? Number(response.edge_count) : 0,
        id: response.id,
        lang_tag: response.lang_tag,
        max_count: response.max_count? Number(response.max_count) : 0,
        metadata: response.metadata ? JSON.parse(response.metadata) : undefined,
        name: response.name,
        open: response.open,
        update_time: response.update_time
      });
    });
  }

  /** A socket created with the client's configuration. */
  createSocket(useSSL = false, verbose: boolean = false, adapter : WebSocketAdapter = new WebSocketAdapterText(), sendTimeoutMs : number = DefaultSocket.DefaultSendTimeoutMs): Socket {
    return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter, sendTimeoutMs);
  }

  /** Delete the current user's account. */
  async deleteAccount(session: Session): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.deleteAccount(session.token).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete one or more users by ID or username. */
  async deleteFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteFriends(session.token, ids, usernames).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete a group the user is part of and has permissions to delete. */
  async deleteGroup(session: Session, groupId: string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteGroup(session.token, groupId).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete one or more notifications */
  async deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteNotifications(session.token, ids).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Delete one or more storage objects */
  async deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteStorageObjects(session.token, request).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Delete a tournament record. */
  async deleteTournamentRecord(session: Session, tournamentId: string): Promise<any> {
    return this.apiClient.deleteTournamentRecord(session.token, tournamentId);
  }

  /** Demote a set of users in a group to the next role down. */
  async demoteGroupUsers(session: Session, groupId: string, ids: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.demoteGroupUsers(session.token, groupId, ids).then((response: any) => {
        return Promise.resolve(response != undefined);
    });
  }

  /** Submit an event for processing in the server's registered runtime custom events handler. */
  async emitEvent(session: Session, request: ApiEvent): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.event(session.token, request).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Fetch the current user's account. */
  async getAccount(session: Session): Promise<ApiAccount> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.getAccount(session.token);
  }

  /** Get subscription by product id. */
  async getSubscription(session: Session, productId: string): Promise<ApiValidatedSubscription> {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.getSubscription(session.token, productId);
  }

  /** Import Facebook friends and add them to a user's account. */
  async importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.importFacebookFriends(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

    /** Import Steam friends and add them to a user's account. */
  async importSteamFriends(session: Session, request: ApiAccountSteam, reset: boolean): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.importSteamFriends(session.token, request, reset).then((response: any) => {
        return response !== undefined;
    });
}

  /** Fetch zero or more users by ID and/or username. */
  async getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<Users> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.getUsers(session.token, ids, usernames, facebookIds).then((response: ApiUsers) => {
      var result: Users = {
        users: []
      };

      if (response.users == null) {
        return Promise.resolve(result);
      }

      response.users!.forEach(u => {
        result.users!.push({
          avatar_url: u.avatar_url,
          create_time: u.create_time,
          display_name: u.display_name,
          edge_count: u.edge_count ? Number(u.edge_count) : 0,
          facebook_id: u.facebook_id,
          gamecenter_id: u.gamecenter_id,
          google_id: u.google_id,
          id: u.id,
          lang_tag: u.lang_tag,
          location: u.location,
          online: u.online,
          steam_id: u.steam_id,
          timezone: u.timezone,
          update_time: u.update_time,
          username: u.username,
          metadata: u.metadata ? JSON.parse(u.metadata) : undefined
        })
      });
      return Promise.resolve(result);
    });
  }

  /** Join a group that's open, or send a request to join a group that is closed. */
  async joinGroup(session: Session, groupId: string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.joinGroup(session.token, groupId, {}).then((response: any) => {
      return response !== undefined;
    });
  }

  async joinTournament(session: Session, tournamentId: string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.joinTournament(session.token, tournamentId, {}).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Kick users from a group, or decline their join requests. */
  async kickGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.kickGroupUsers(session.token, groupId, ids).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Leave a group the user is part of. */
  async leaveGroup(session: Session, groupId: string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.leaveGroup(session.token, groupId, {}).then((response: any) => {
      return response !== undefined;
    });
  }

  /** List a channel's message history. */
  async listChannelMessages(session: Session, channelId: string, limit?: number, forward?: boolean, cursor?: string): Promise<ChannelMessageList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listChannelMessages(session.token, channelId, limit, forward, cursor).then((response: ApiChannelMessageList) => {
      var result: ChannelMessageList = {
        messages: [],
        next_cursor: response.next_cursor,
        prev_cursor: response.prev_cursor,
        cacheable_cursor: response.cacheable_cursor
      };

      if (response.messages == null) {
        return Promise.resolve(result);
      }

      response.messages!.forEach(m => {
        result.messages!.push({
          channel_id: m.channel_id,
          code: m.code ? Number(m.code) : 0,
          create_time: m.create_time,
          message_id: m.message_id,
          persistent: m.persistent,
          sender_id: m.sender_id,
          update_time: m.update_time,
          username: m.username,
          content: m.content ? JSON.parse(m.content) : undefined,
          group_id: m.group_id,
          room_name: m.room_name,
          user_id_one: m.user_id_one,
          user_id_two: m.user_id_two
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List a group's users. */
  async listGroupUsers(session: Session, groupId: string, state?: number, limit?: number, cursor?: string): Promise<GroupUserList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listGroupUsers(session.token, groupId, limit, state, cursor).then((response: ApiGroupUserList) => {
      var result: GroupUserList = {
        group_users: [],
        cursor: response.cursor
      };

      if (response.group_users == null) {
        return Promise.resolve(result);
      }

      response.group_users!.forEach(gu => {
        result.group_users!.push({
          user: {
            avatar_url: gu.user!.avatar_url,
            create_time: gu.user!.create_time,
            display_name: gu.user!.display_name,
            edge_count: gu.user!.edge_count ? Number(gu.user!.edge_count): 0,
            facebook_id: gu.user!.facebook_id,
            gamecenter_id: gu.user!.gamecenter_id,
            google_id: gu.user!.google_id,
            id: gu.user!.id,
            lang_tag: gu.user!.lang_tag,
            location: gu.user!.location,
            online: gu.user!.online,
            steam_id: gu.user!.steam_id,
            timezone: gu.user!.timezone,
            update_time: gu.user!.update_time,
            username: gu.user!.username,
            metadata: gu.user!.metadata ? JSON.parse(gu.user!.metadata!) : undefined
          },
          state: gu.state ? Number(gu.state) : 0
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List a user's groups. */
  async listUserGroups(session: Session, userId: string, state?: number, limit?: number, cursor?: string,): Promise<UserGroupList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listUserGroups(session.token, userId, state, limit, cursor).then((response: ApiUserGroupList) => {
      var result: UserGroupList = {
        user_groups: [],
        cursor: response.cursor,
      };

      if (response.user_groups == null) {
        return Promise.resolve(result);
      }

      response.user_groups!.forEach(ug => {
        result.user_groups!.push({
          group: {
            avatar_url: ug.group!.avatar_url,
            create_time: ug.group!.create_time,
            creator_id: ug.group!.creator_id,
            description: ug.group!.description,
            edge_count: ug.group!.edge_count ? Number(ug.group!.edge_count) : 0,
            id: ug.group!.id,
            lang_tag: ug.group!.lang_tag,
            max_count: ug.group!.max_count,
            metadata: ug.group!.metadata ? JSON.parse(ug.group!.metadata!) : undefined,
            name: ug.group!.name,
            open: ug.group!.open,
            update_time: ug.group!.update_time
          },
          state: ug.state ? Number(ug.state) : 0
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List groups based on given filters. */
  async listGroups(session: Session, name?: string, cursor?: string, limit?: number): Promise<GroupList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listGroups(session.token, name, cursor, limit).then((response: ApiGroupList) => {
      var result: GroupList = {
        groups: []
      };

      if (response.groups == null) {
        return Promise.resolve(result);
      }

      result.cursor = response.cursor;
      response.groups!.forEach(ug => {
        result.groups!.push({
          avatar_url: ug!.avatar_url,
          create_time: ug!.create_time,
          creator_id: ug!.creator_id,
          description: ug!.description,
          edge_count: ug!.edge_count ? Number(ug!.edge_count) : 0,
          id: ug!.id,
          lang_tag: ug!.lang_tag,
          max_count: ug!.max_count,
          metadata: ug!.metadata ? JSON.parse(ug!.metadata!) : undefined,
          name: ug!.name,
          open: ug!.open,
          update_time: ug!.update_time
        });
      });
      return Promise.resolve(result);
    });
  }

  /** Add an Apple ID to the social profiles on the current user's account. */
  async linkApple(session: Session, request: ApiAccountApple): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkApple(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add a custom ID to the social profiles on the current user's account. */
  async linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkCustom(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add a device ID to the social profiles on the current user's account. */
  async linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkDevice(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add an email+password to the social profiles on the current user's account. */
  async linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkEmail(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add Facebook to the social profiles on the current user's account. */
  async linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkFacebook(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add Facebook Instant to the social profiles on the current user's account. */
  async linkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkFacebookInstantGame(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add Google to the social profiles on the current user's account. */
  async linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkGoogle(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add GameCenter to the social profiles on the current user's account. */
  async linkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkGameCenter(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add Steam to the social profiles on the current user's account. */
  async linkSteam(session: Session, request: ApiLinkSteamRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkSteam(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** List all friends for the current user. */
  async listFriends(session: Session, state?: number, limit?: number, cursor?: string): Promise<Friends> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listFriends(session.token, limit, state, cursor).then((response: ApiFriendList) => {

      var result: Friends = {
        friends: [],
        cursor: response.cursor
      };

      if (response.friends == null) {
        return Promise.resolve(result);
      }

      response.friends!.forEach(f => {
        result.friends!.push({
          user: {
            avatar_url: f.user!.avatar_url,
            create_time: f.user!.create_time,
            display_name: f.user!.display_name,
            edge_count: f.user!.edge_count ? Number(f.user!.edge_count) : 0,
            facebook_id: f.user!.facebook_id,
            gamecenter_id: f.user!.gamecenter_id,
            google_id: f.user!.google_id,
            id: f.user!.id,
            lang_tag: f.user!.lang_tag,
            location: f.user!.location,
            online: f.user!.online,
            steam_id: f.user!.steam_id,
            timezone: f.user!.timezone,
            update_time: f.user!.update_time,
            username: f.user!.username,
            metadata: f.user!.metadata ? JSON.parse(f.user!.metadata!) : undefined,
            facebook_instant_game_id: f.user!.facebook_instant_game_id!
          },
          state: f.state
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List friends of friends for the current user. */
  async listFriendsOfFriends(session: Session, limit?: number, cursor?: string) : Promise<FriendsOfFriends> {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.listFriendsOfFriends(session.token, limit, cursor).then((response: ApiFriendsOfFriendsList) => {
      var result: FriendsOfFriends = {
        friends_of_friends: [],
        cursor: response.cursor
      };

      if (response.friends_of_friends == null)
      {
        return Promise.resolve(result);
      }

      response.friends_of_friends!.forEach(f => {
        result.friends_of_friends!.push({
          referrer: f.referrer,
          user: {
            avatar_url: f.user!.avatar_url,
            create_time: f.user!.create_time,
            display_name: f.user!.display_name,
            edge_count: f.user!.edge_count ? Number(f.user!.edge_count) : 0,
            facebook_id: f.user!.facebook_id,
            gamecenter_id: f.user!.gamecenter_id,
            google_id: f.user!.google_id,
            id: f.user!.id,
            lang_tag: f.user!.lang_tag,
            location: f.user!.location,
            online: f.user!.online,
            steam_id: f.user!.steam_id,
            timezone: f.user!.timezone,
            update_time: f.user!.update_time,
            username: f.user!.username,
            metadata: f.user!.metadata ? JSON.parse(f.user!.metadata!) : undefined,
            facebook_instant_game_id: f.user!.facebook_instant_game_id!
          }
        })
      });

      return Promise.resolve(result);
    });
  }

  /** List leaderboard records */
  async listLeaderboardRecords(session: Session, leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string,): Promise<LeaderboardRecordList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listLeaderboardRecords(session.token, leaderboardId, ownerIds, limit, cursor, expiry).then((response: ApiLeaderboardRecordList) => {
      var list: LeaderboardRecordList = {
        next_cursor: response.next_cursor,
        prev_cursor: response.prev_cursor,
        rank_count: response.rank_count ? Number(response.rank_count) : 0,
        owner_records: [],
        records: []
      };

      if (response.owner_records != null) {
        response.owner_records!.forEach(o => {
          list.owner_records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score ? Number(o.num_score) : 0,
            owner_id: o.owner_id,
            rank: o.rank ? Number(o.rank) : 0,
            score: o.score ? Number(o.score) : 0,
            subscore: o.subscore ? Number(o.subscore) : 0,
            update_time: o.update_time,
            username: o.username,
            max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
          })
        })
      }

      if (response.records != null) {
        response.records!.forEach(o => {
          list.records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score ? Number(o.num_score): 0,
            owner_id: o.owner_id,
            rank: o.rank ? Number(o.rank) : 0,
            score: o.score ? Number(o.score) : 0,
            subscore: o.subscore ? Number(o.subscore) : 0,
            update_time: o.update_time,
            username: o.username,
            max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
          })
        })
      }

      return Promise.resolve(list);
    });
  }

  async listLeaderboardRecordsAroundOwner(session: Session, leaderboardId: string, ownerId: string, limit?: number, expiry?: string, cursor?: string): Promise<LeaderboardRecordList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listLeaderboardRecordsAroundOwner(session.token, leaderboardId, ownerId, limit, expiry, cursor).then((response: ApiLeaderboardRecordList) => {
      var list: LeaderboardRecordList = {
        next_cursor: response.next_cursor,
        prev_cursor: response.prev_cursor,
        rank_count: response.rank_count ? Number(response.rank_count) : 0,
        owner_records: [],
        records: []
      };

      if (response.owner_records != null) {
        response.owner_records!.forEach(o => {
          list.owner_records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score ? Number(o.num_score): 0,
            owner_id: o.owner_id,
            rank: o.rank ? Number(o.rank): 0,
            score: o.score ? Number(o.score): 0,
            subscore: o.subscore ? Number(o.subscore): 0,
            update_time: o.update_time,
            username: o.username,
            max_num_score: o.max_num_score ? Number(o.max_num_score): 0,
          })
        })
      }

      if (response.records != null) {
        response.records!.forEach(o => {
          list.records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score ? Number(o.num_score): 0,
            owner_id: o.owner_id,
            rank: o.rank ? Number(o.rank) : 0,
            score: o.score ? Number(o.score) : 0,
            subscore: o.subscore ? Number(o.subscore) : 0,
            update_time: o.update_time,
            username: o.username,
            max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
          })
        })
      }

      return Promise.resolve(list);
    });
  }

  /** Fetch list of running matches. */
  async listMatches(session: Session, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number, query?: string): Promise<ApiMatchList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listMatches(session.token, limit, authoritative, label, minSize, maxSize, query);
  }

  /** Fetch list of notifications. */
  async listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<NotificationList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listNotifications(session.token, limit, cacheableCursor).then((response: ApiNotificationList) => {
      var result: NotificationList = {
        cacheable_cursor: response.cacheable_cursor,
        notifications: [],
      };

      if (response.notifications == null) {
        return Promise.resolve(result);
      }

      response.notifications!.forEach(n => {
        result.notifications!.push({
          code: n.code ? Number(n.code) : 0,
          create_time: n.create_time,
          id: n.id,
          persistent: n.persistent,
          sender_id: n.sender_id,
          subject: n.subject,
          content: n.content ? JSON.parse(n.content) : undefined
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List storage objects. */
  async listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listStorageObjects(session.token, collection, userId, limit, cursor).then((response: ApiStorageObjectList) => {
      var result: StorageObjectList = {
        objects: [],
        cursor: response.cursor
      };

      if (response.objects == null) {
        return Promise.resolve(result);
      }

      response.objects!.forEach(o => {
        result.objects.push({
          collection: o.collection,
          key: o.key,
          permission_read: o.permission_read ? Number(o.permission_read) : 0,
          permission_write: o.permission_write ? Number(o.permission_write) : 0,
          value: o.value ? JSON.parse(o.value) : undefined,
          version: o.version,
          user_id: o.user_id,
          create_time: o.create_time,
          update_time: o.update_time
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List current or upcoming tournaments. */
  async listTournaments(session: Session, categoryStart?: number, categoryEnd?: number, startTime?: number, endTime?: number, limit?: number, cursor?: string): Promise<TournamentList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listTournaments(session.token, categoryStart, categoryEnd, startTime, endTime, limit, cursor).then((response: ApiTournamentList) => {
      var list: TournamentList = {
        cursor: response.cursor,
        tournaments: [],
      };

      if (response.tournaments != null) {
        response.tournaments!.forEach(o => {
          list.tournaments!.push({
            id: o.id,
            title: o.title,
            description: o.description,
            duration: o.duration ? Number(o.duration) : 0,
            category: o.category ? Number(o.category) : 0,
            sort_order: o.sort_order ? Number(o.sort_order) : 0,
            size: o.size ? Number(o.size) : 0,
            max_size: o.max_size ? Number(o.max_size) : 0,
            max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
            can_enter: o.can_enter,
            end_active: o.end_active ? Number(o.end_active) : 0,
            next_reset: o.next_reset ? Number(o.next_reset) : 0,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            create_time: o.create_time,
            start_time: o.start_time,
            end_time: o.end_time,
            start_active: o.start_active,
            authoritative: o.authoritative
          })
        })
      }

      return Promise.resolve(list);
    });
  }

  /** List user subscriptions. */
  async listSubscriptions(session: Session, cursor?: string, limit?: number) : Promise<SubscriptionList> {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.listSubscriptions(session.token, {
      cursor: cursor,
      limit: limit
    });
  }

  /** List tournament records from a given tournament. */
  async listTournamentRecords(session: Session, tournamentId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string): Promise<TournamentRecordList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listTournamentRecords(session.token, tournamentId, ownerIds, limit, cursor, expiry).then((response: ApiTournamentRecordList) => {
      var list: TournamentRecordList = {
        next_cursor: response.next_cursor,
        prev_cursor: response.prev_cursor,
        owner_records: [],
        records: []
      };

      if (response.owner_records != null) {
        response.owner_records!.forEach(o => {
          list.owner_records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score ? Number(o.num_score) : 0,
            owner_id: o.owner_id,
            rank: o.rank ? Number(o.rank) : 0,
            score: o.score ? Number(o.score) : 0,
            subscore: o.subscore ? Number(o.subscore) : 0,
            update_time: o.update_time,
            username: o.username,
            max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
          })
        })
      }

      if (response.records != null) {
        response.records!.forEach(o => {
          list.records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score ? Number(o.num_score) : 0,
            owner_id: o.owner_id,
            rank: o.rank ? Number(o.rank) : 0,
            score: o.score ? Number(o.score) : 0,
            subscore: o.subscore ? Number(o.subscore) : 0,
            update_time: o.update_time,
            username: o.username,
            max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
          })
        })
      }

      return Promise.resolve(list);
    });
  }

  /** List tournament records from a given tournament around the owner. */
  async listTournamentRecordsAroundOwner(session: Session, tournamentId: string, ownerId: string, limit?: number, expiry?: string, cursor?: string): Promise<TournamentRecordList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listTournamentRecordsAroundOwner(session.token, tournamentId, ownerId, limit, expiry, cursor).then((response: ApiTournamentRecordList) => {
      var list: TournamentRecordList = {
        next_cursor: response.next_cursor,
        prev_cursor: response.prev_cursor,
        owner_records: [],
        records: []
      };

      if (response.owner_records != null) {
        response.owner_records!.forEach(o => {
          list.owner_records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score ? Number(o.num_score) : 0,
            owner_id: o.owner_id,
            rank: o.rank ? Number(o.rank) : 0,
            score: o.score ? Number(o.score) : 0,
            subscore: o.subscore ? Number(o.subscore) : 0,
            update_time: o.update_time,
            username: o.username,
            max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
          })
        })
      }

      if (response.records != null) {
        response.records!.forEach(o => {
          list.records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score ? Number(o.num_score) : 0,
            owner_id: o.owner_id,
            rank: o.rank ? Number(o.rank) : 0,
            score: o.score ? Number(o.score) : 0,
            subscore: o.subscore ? Number(o.subscore) : 0,
            update_time: o.update_time,
            username: o.username,
            max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
          })
        })
      }

      return Promise.resolve(list);
    });
  }

  /** Promote users in a group to the next role up. */
  async promoteGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.promoteGroupUsers(session.token, groupId, ids);
  }

  /** Fetch storage objects. */
  async readStorageObjects(session: Session, request: ApiReadStorageObjectsRequest): Promise<StorageObjects> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.readStorageObjects(session.token, request).then((response: ApiStorageObjects) => {
      var result: StorageObjects = {objects: []};

      if (response.objects == null) {
        return Promise.resolve(result);
      }

      response.objects!.forEach(o => {
        result.objects.push({
          collection: o.collection,
          key: o.key,
          permission_read: o.permission_read ? Number(o.permission_read) : 0,
          permission_write: o.permission_write ? Number(o.permission_write) : 0,
          value: o.value ? JSON.parse(o.value) : undefined,
          version: o.version,
          user_id: o.user_id,
          create_time: o.create_time,
          update_time: o.update_time
        })
      });
      return Promise.resolve(result);
    });
  }

  /** Execute an RPC function on the server. */
  async rpc(session: Session, id: string, input: object): Promise<RpcResponse> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.rpcFunc(session.token, id, JSON.stringify(input)).then((response: ApiRpc) => {
      return Promise.resolve({
        id: response.id,
        payload: (!response.payload) ? undefined : JSON.parse(response.payload)
      });
    });
  }

  /** Execute an RPC function on the server. */
  async rpcHttpKey(httpKey: string, id: string, input?: object): Promise<RpcResponse> {
    return this.apiClient.rpcFunc2("", id, input && JSON.stringify(input) || "", httpKey)
      .then((response: ApiRpc) => {
        return Promise.resolve({
          id: response.id,
          payload: (!response.payload) ? undefined : JSON.parse(response.payload)
        });
      }).catch((err: any) => {
        throw err;
      });
  }

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  async sessionLogout(session: Session, token: string, refreshToken: string, ) : Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.sessionLogout(session.token, {refresh_token: refreshToken, token: token}).then((response: any) => {
        return response !== undefined;
    });
  }

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  async sessionRefresh(session: Session, vars: Record<string, string> = {}) : Promise<Session> {

    if (!session) {
        console.error("Cannot refresh a null session.");
        return session;
    }

    if (session.created && session.expires_at! - session.created_at < 70) {
        console.warn("Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/nakama/getting-started/configuration/#session");
    }

    if (session.created && session.refresh_expires_at! - session.created_at < 3700) {
        console.warn("Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/nakama/getting-started/configuration/#session");
    }

    const apiSession = await this.apiClient.sessionRefresh(this.serverkey, "", {token: session.refresh_token, vars: vars});
    session.update(apiSession.token!, apiSession.refresh_token!);
    return session;
  }

  /** Remove the Apple ID from the social profiles on the current user's account. */
  async unlinkApple(session: Session, request: ApiAccountApple): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkApple(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }


  /** Remove custom ID from the social profiles on the current user's account. */
  async unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkCustom(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove a device ID from the social profiles on the current user's account. */
  async unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkDevice(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove an email+password from the social profiles on the current user's account. */
  async unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkEmail(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove Facebook from the social profiles on the current user's account. */
  async unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkFacebook(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove Facebook Instant social profiles from the current user's account. */
  async unlinkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkFacebookInstantGame(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove Google from the social profiles on the current user's account. */
  async unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkGoogle(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove GameCenter from the social profiles on the current user's account. */
  async unlinkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkGameCenter(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove Steam from the social profiles on the current user's account. */
  async unlinkSteam(session: Session, request: ApiAccountSteam): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }
    return this.apiClient.unlinkSteam(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in the current user's account. */
  async updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateAccount(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update a group the user is part of and has permissions to update. */
  async updateGroup(session: Session, groupId: string, request: ApiUpdateGroupRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateGroup(session.token, groupId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Validate an Apple IAP receipt. */
  async validatePurchaseApple(session: Session, receipt?: string, persist: boolean = true)  : Promise<ApiValidatePurchaseResponse> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.validatePurchaseApple(session.token, {receipt: receipt, persist: persist})
  }

  /** Validate a FB Instant IAP receipt. */
  async validatePurchaseFacebookInstant(session: Session, signedRequest?: string, persist: boolean = true) : Promise<ApiValidatePurchaseResponse> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.validatePurchaseFacebookInstant(session.token, {signed_request: signedRequest, persist: persist})
  }

  /** Validate a Google IAP receipt. */
  async validatePurchaseGoogle(session: Session, purchase?: string, persist: boolean = true)  : Promise<ApiValidatePurchaseResponse> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.validatePurchaseGoogle(session.token, {purchase: purchase, persist: persist})
  }

  /** Validate a Huawei IAP receipt. */
  async validatePurchaseHuawei(session: Session, purchase?: string, signature?: string, persist: boolean = true) : Promise<ApiValidatePurchaseResponse> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.validatePurchaseHuawei(session.token, {purchase: purchase, signature: signature, persist: persist})
  }

  /** Validate Apple Subscription Receipt */
  async validateSubscriptionApple(session: Session, receipt: string, persist: boolean = true) : Promise<ApiValidateSubscriptionResponse> {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.validateSubscriptionApple(session.token, {receipt: receipt, persist: persist});
  }

  /** Validate Google Subscription Receipt */
  async validateSubscriptionGoogle(session: Session, receipt: string, persist: boolean = true) : Promise<ApiValidateSubscriptionResponse> {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.validateSubscriptionGoogle(session.token, {receipt: receipt, persist: persist});
  }

  /** Write a record to a leaderboard. */
  async writeLeaderboardRecord(session: Session, leaderboardId: string, request: WriteLeaderboardRecord): Promise<LeaderboardRecord> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.writeLeaderboardRecord(session.token, leaderboardId, {
      metadata: request.metadata ? JSON.stringify(request.metadata) : undefined,
      score: request.score,
      subscore: request.subscore
    }).then((response: ApiLeaderboardRecord) => {
      return Promise.resolve({
        expiry_time: response.expiry_time,
        leaderboard_id: response.leaderboard_id,
        metadata: response.metadata ? JSON.parse(response.metadata) : undefined,
        num_score: response.num_score ? Number(response.num_score) : 0,
        owner_id: response.owner_id,
        score: response.score ? Number(response.score) : 0,
        subscore: response.subscore ? Number(response.subscore) : 0,
        update_time: response.update_time,
        username: response.username,
        max_num_score: response.max_num_score ? Number(response.max_num_score) : 0,
        rank: response.rank ? Number(response.rank) : 0,
      });
    });
  }

  /** Write storage objects. */
  async writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    var request: ApiWriteStorageObjectsRequest = {objects: []};
    objects.forEach(o => {
      request.objects!.push({
        collection: o.collection,
        key: o.key,
        permission_read: o.permission_read,
        permission_write: o.permission_write,
        value: JSON.stringify(o.value),
        version: o.version
      })
    })

    return this.apiClient.writeStorageObjects(session.token, request);
  }

  /** Write a record to a tournament. */
  async writeTournamentRecord(session: Session, tournamentId: string, request: WriteTournamentRecord): Promise<LeaderboardRecord> {
    return this.apiClient.writeTournamentRecord(session.token, tournamentId, {
      metadata: request.metadata ? JSON.stringify(request.metadata) : undefined,
      score: request.score,
      subscore: request.subscore
    }).then((response: ApiLeaderboardRecord) => {
      return Promise.resolve({
        expiry_time: response.expiry_time,
        leaderboard_id: response.leaderboard_id,
        metadata: response.metadata ? JSON.parse(response.metadata) : undefined,
        num_score: response.num_score ? Number(response.num_score) : 0,
        owner_id: response.owner_id,
        score: response.score ? Number(response.score) : 0,
        subscore: response.subscore ? Number(response.subscore) : 0,
        update_time: response.update_time,
        username: response.username,
        max_num_score: response.max_num_score ? Number(response.max_num_score) : 0,
        rank: response.rank ? Number(response.rank) : 0,
      });
    });
  }
};
