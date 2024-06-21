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
import { ApiAccount, ApiAccountCustom, ApiAccountDevice, ApiAccountEmail, ApiAccountFacebook, ApiAccountFacebookInstantGame, ApiAccountGoogle, ApiAccountGameCenter, ApiAccountSteam, ApiCreateGroupRequest, ApiDeleteStorageObjectsRequest, ApiEvent, ApiMatchList, ApiReadStorageObjectsRequest, ApiStorageObjectAcks, ApiUpdateAccountRequest, ApiUpdateGroupRequest, ApiAccountApple, ApiLinkSteamRequest, ApiValidatePurchaseResponse, ApiStoreEnvironment, ApiStoreProvider, ApiValidateSubscriptionResponse, ApiValidatedSubscription } from "./api.gen";
import { Session } from "./session";
import { Socket } from "./socket";
import { WebSocketAdapter } from "./web_socket_adapter";
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
    cursor?: string;
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
    referrer?: string;
    user?: User;
}
/** Friends of the user's friends. */
export interface FriendsOfFriends {
    cursor?: string;
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
export interface ValidatedSubscription {
    active?: boolean;
    create_time?: string;
    environment?: ApiStoreEnvironment;
    expiry_time?: string;
    original_transaction_id?: string;
    product_id?: string;
    provider_notification?: string;
    provider_response?: string;
    purchase_time?: string;
    refund_time?: string;
    store?: ApiStoreProvider;
    update_time?: string;
    user_id?: string;
}
/** A list of validated subscriptions stored by Nakama. */
export interface SubscriptionList {
    cursor?: string;
    prev_cursor?: string;
    validated_subscriptions?: Array<ValidatedSubscription>;
}
/** A client for Nakama server. */
export declare class Client {
    readonly serverkey: string;
    readonly host: string;
    readonly port: string;
    readonly useSSL: boolean;
    readonly timeout: number;
    readonly autoRefreshSession: boolean;
    /** The expired timespan used to check session lifetime. */
    expiredTimespanMs: number;
    /** The low level API client for Nakama server. */
    private readonly apiClient;
    constructor(serverkey?: string, host?: string, port?: string, useSSL?: boolean, timeout?: number, autoRefreshSession?: boolean);
    /** Add users to a group, or accept their join requests. */
    addGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    /** Add friends by ID or username to a user's account. */
    addFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Authenticate a user with an Apple ID against the server. */
    authenticateApple(token: string, create?: boolean, username?: string, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a custom id against the server. */
    authenticateCustom(id: string, create?: boolean, username?: string, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a device id against the server. */
    authenticateDevice(id: string, create?: boolean, username?: string, vars?: Record<string, string>): Promise<Session>;
    /** Authenticate a user with an email+password against the server. */
    authenticateEmail(email: string, password: string, create?: boolean, username?: string, vars?: Record<string, string>): Promise<Session>;
    /** Authenticate a user with a Facebook Instant Game token against the server. */
    authenticateFacebookInstantGame(signedPlayerInfo: string, create?: boolean, username?: string, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a Facebook OAuth token against the server. */
    authenticateFacebook(token: string, create?: boolean, username?: string, sync?: boolean, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with Google against the server. */
    authenticateGoogle(token: string, create?: boolean, username?: string, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with GameCenter against the server. */
    authenticateGameCenter(bundleId: string, playerId: string, publicKeyUrl: string, salt: string, signature: string, timestamp: string, username?: string, create?: boolean, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with Steam against the server. */
    authenticateSteam(token: string, create?: boolean, username?: string, sync?: boolean, vars?: Record<string, string>): Promise<Session>;
    /** Ban users from a group. */
    banGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    /** Block one or more users by ID or username. */
    blockFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Create a new group with the current user as the creator and superadmin. */
    createGroup(session: Session, request: ApiCreateGroupRequest): Promise<Group>;
    /** A socket created with the client's configuration. */
    createSocket(useSSL?: boolean, verbose?: boolean, adapter?: WebSocketAdapter, sendTimeoutMs?: number): Socket;
    /** Delete the current user's account. */
    deleteAccount(session: Session): Promise<boolean>;
    /** Delete one or more users by ID or username. */
    deleteFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Delete a group the user is part of and has permissions to delete. */
    deleteGroup(session: Session, groupId: string): Promise<boolean>;
    /** Delete one or more notifications */
    deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean>;
    /** Delete one or more storage objects */
    deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean>;
    /** Delete a tournament record. */
    deleteTournamentRecord(session: Session, tournamentId: string): Promise<any>;
    /** Demote a set of users in a group to the next role down. */
    demoteGroupUsers(session: Session, groupId: string, ids: Array<string>): Promise<boolean>;
    /** Submit an event for processing in the server's registered runtime custom events handler. */
    emitEvent(session: Session, request: ApiEvent): Promise<boolean>;
    /** Fetch the current user's account. */
    getAccount(session: Session): Promise<ApiAccount>;
    /** Get subscription by product id. */
    getSubscription(session: Session, productId: string): Promise<ApiValidatedSubscription>;
    /** Import Facebook friends and add them to a user's account. */
    importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    /** Import Steam friends and add them to a user's account. */
    importSteamFriends(session: Session, request: ApiAccountSteam, reset: boolean): Promise<boolean>;
    /** Fetch zero or more users by ID and/or username. */
    getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<Users>;
    /** Join a group that's open, or send a request to join a group that is closed. */
    joinGroup(session: Session, groupId: string): Promise<boolean>;
    joinTournament(session: Session, tournamentId: string): Promise<boolean>;
    /** Kick users from a group, or decline their join requests. */
    kickGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    /** Leave a group the user is part of. */
    leaveGroup(session: Session, groupId: string): Promise<boolean>;
    /** List a channel's message history. */
    listChannelMessages(session: Session, channelId: string, limit?: number, forward?: boolean, cursor?: string): Promise<ChannelMessageList>;
    /** List a group's users. */
    listGroupUsers(session: Session, groupId: string, state?: number, limit?: number, cursor?: string): Promise<GroupUserList>;
    /** List a user's groups. */
    listUserGroups(session: Session, userId: string, state?: number, limit?: number, cursor?: string): Promise<UserGroupList>;
    /** List groups based on given filters. */
    listGroups(session: Session, name?: string, cursor?: string, limit?: number): Promise<GroupList>;
    /** Add an Apple ID to the social profiles on the current user's account. */
    linkApple(session: Session, request: ApiAccountApple): Promise<boolean>;
    /** Add a custom ID to the social profiles on the current user's account. */
    linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    /** Add a device ID to the social profiles on the current user's account. */
    linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    /** Add an email+password to the social profiles on the current user's account. */
    linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    /** Add Facebook to the social profiles on the current user's account. */
    linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    /** Add Facebook Instant to the social profiles on the current user's account. */
    linkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean>;
    /** Add Google to the social profiles on the current user's account. */
    linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    /** Add GameCenter to the social profiles on the current user's account. */
    linkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean>;
    /** Add Steam to the social profiles on the current user's account. */
    linkSteam(session: Session, request: ApiLinkSteamRequest): Promise<boolean>;
    /** List all friends for the current user. */
    listFriends(session: Session, state?: number, limit?: number, cursor?: string): Promise<Friends>;
    /** List friends of friends for the current user. */
    listFriendsOfFriends(session: Session, limit?: number, cursor?: string): Promise<FriendsOfFriends>;
    /** List leaderboard records */
    listLeaderboardRecords(session: Session, leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string): Promise<LeaderboardRecordList>;
    listLeaderboardRecordsAroundOwner(session: Session, leaderboardId: string, ownerId: string, limit?: number, expiry?: string, cursor?: string): Promise<LeaderboardRecordList>;
    /** Fetch list of running matches. */
    listMatches(session: Session, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number, query?: string): Promise<ApiMatchList>;
    /** Fetch list of notifications. */
    listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<NotificationList>;
    /** List storage objects. */
    listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList>;
    /** List current or upcoming tournaments. */
    listTournaments(session: Session, categoryStart?: number, categoryEnd?: number, startTime?: number, endTime?: number, limit?: number, cursor?: string): Promise<TournamentList>;
    /** List user subscriptions. */
    listSubscriptions(session: Session, cursor?: string, limit?: number): Promise<SubscriptionList>;
    /** List tournament records from a given tournament. */
    listTournamentRecords(session: Session, tournamentId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string): Promise<TournamentRecordList>;
    /** List tournament records from a given tournament around the owner. */
    listTournamentRecordsAroundOwner(session: Session, tournamentId: string, ownerId: string, limit?: number, expiry?: string, cursor?: string): Promise<TournamentRecordList>;
    /** Promote users in a group to the next role up. */
    promoteGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    /** Fetch storage objects. */
    readStorageObjects(session: Session, request: ApiReadStorageObjectsRequest): Promise<StorageObjects>;
    /** Execute an RPC function on the server. */
    rpc(session: Session, id: string, input: object): Promise<RpcResponse>;
    /** Execute an RPC function on the server. */
    rpcHttpKey(httpKey: string, id: string, input?: object): Promise<RpcResponse>;
    /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
    sessionLogout(session: Session, token: string, refreshToken: string): Promise<boolean>;
    /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
    sessionRefresh(session: Session, vars?: Record<string, string>): Promise<Session>;
    /** Remove the Apple ID from the social profiles on the current user's account. */
    unlinkApple(session: Session, request: ApiAccountApple): Promise<boolean>;
    /** Remove custom ID from the social profiles on the current user's account. */
    unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    /** Remove a device ID from the social profiles on the current user's account. */
    unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    /** Remove an email+password from the social profiles on the current user's account. */
    unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    /** Remove Facebook from the social profiles on the current user's account. */
    unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    /** Remove Facebook Instant social profiles from the current user's account. */
    unlinkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean>;
    /** Remove Google from the social profiles on the current user's account. */
    unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    /** Remove GameCenter from the social profiles on the current user's account. */
    unlinkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean>;
    /** Remove Steam from the social profiles on the current user's account. */
    unlinkSteam(session: Session, request: ApiAccountSteam): Promise<boolean>;
    /** Update fields in the current user's account. */
    updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean>;
    /** Update a group the user is part of and has permissions to update. */
    updateGroup(session: Session, groupId: string, request: ApiUpdateGroupRequest): Promise<boolean>;
    /** Validate an Apple IAP receipt. */
    validatePurchaseApple(session: Session, receipt?: string, persist?: boolean): Promise<ApiValidatePurchaseResponse>;
    /** Validate a FB Instant IAP receipt. */
    validatePurchaseFacebookInstant(session: Session, signedRequest?: string, persist?: boolean): Promise<ApiValidatePurchaseResponse>;
    /** Validate a Google IAP receipt. */
    validatePurchaseGoogle(session: Session, purchase?: string, persist?: boolean): Promise<ApiValidatePurchaseResponse>;
    /** Validate a Huawei IAP receipt. */
    validatePurchaseHuawei(session: Session, purchase?: string, signature?: string, persist?: boolean): Promise<ApiValidatePurchaseResponse>;
    /** Validate Apple Subscription Receipt */
    validateSubscriptionApple(session: Session, receipt: string, persist?: boolean): Promise<ApiValidateSubscriptionResponse>;
    /** Validate Google Subscription Receipt */
    validateSubscriptionGoogle(session: Session, receipt: string, persist?: boolean): Promise<ApiValidateSubscriptionResponse>;
    /** Write a record to a leaderboard. */
    writeLeaderboardRecord(session: Session, leaderboardId: string, request: WriteLeaderboardRecord): Promise<LeaderboardRecord>;
    /** Write storage objects. */
    writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks>;
    /** Write a record to a tournament. */
    writeTournamentRecord(session: Session, tournamentId: string, request: WriteTournamentRecord): Promise<LeaderboardRecord>;
}
