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
import { ApiAccount, ApiAccountCustom, ApiAccountDevice, ApiAccountEmail, ApiAccountFacebook, ApiAccountFacebookInstantGame, ApiAccountGoogle, ApiAccountGameCenter, ApiAccountSteam, ApiCreateGroupRequest, ApiDeleteStorageObjectsRequest, ApiEvent, ApiMatchList, ApiReadStorageObjectsRequest, ApiStorageObjectAcks, ApiUpdateAccountRequest, ApiUpdateGroupRequest, ApiAccountApple, ApiLinkSteamRequest, ApiValidatePurchaseResponse } from "./api.gen";
import { Session } from "./session";
import { Socket } from "./socket";
import { WebSocketAdapter } from "./web_socket_adapter";
/** Response for an RPC function executed on the server. */
export interface RpcResponse {
    id?: string;
    payload?: object;
}
/** Represents a complete leaderboard record with all scores and associated metadata. */
export interface LeaderboardRecord {
    create_time?: string;
    expiry_time?: string;
    leaderboard_id?: string;
    metadata?: object;
    num_score?: number;
    owner_id?: string;
    rank?: number;
    score?: number;
    subscore?: number;
    update_time?: string;
    username?: string;
    max_num_score?: number;
}
/** A set of leaderboard records, may be part of a leaderboard records page or a batch of individual records. */
export interface LeaderboardRecordList {
    next_cursor?: string;
    owner_records?: Array<LeaderboardRecord>;
    prev_cursor?: string;
    records?: Array<LeaderboardRecord>;
}
/** A Tournament on the server. */
export interface Tournament {
    id?: string;
    title?: string;
    description?: string;
    duration?: number;
    category?: number;
    sort_order?: number;
    size?: number;
    max_size?: number;
    max_num_score?: number;
    can_enter?: boolean;
    end_active?: number;
    next_reset?: number;
    metadata?: object;
    create_time?: string;
    start_time?: string;
    end_time?: string;
    start_active?: number;
}
/** A list of tournaments. */
export interface TournamentList {
    tournaments?: Array<Tournament>;
    cursor?: string;
}
/** A set of tournament records, may be part of a tournament records page or a batch of individual records. */
export interface TournamentRecordList {
    next_cursor?: string;
    owner_records?: Array<LeaderboardRecord>;
    prev_cursor?: string;
    records?: Array<LeaderboardRecord>;
}
/** Record values to write. */
export interface WriteTournamentRecord {
    metadata?: object;
    score?: string;
    subscore?: string;
}
/** Record values to write. */
export interface WriteLeaderboardRecord {
    metadata?: object;
    score?: string;
    subscore?: string;
}
export interface WriteStorageObject {
    collection?: string;
    key?: string;
    permission_read?: number;
    permission_write?: number;
    value?: object;
    version?: string;
}
export interface StorageObject {
    collection?: string;
    create_time?: string;
    key?: string;
    permission_read?: number;
    permission_write?: number;
    update_time?: string;
    user_id?: string;
    value?: object;
    version?: string;
}
export interface StorageObjectList {
    cursor?: string;
    objects: Array<StorageObject>;
}
export interface StorageObjects {
    objects: Array<StorageObject>;
}
/** A message sent on a channel. */
export interface ChannelMessage {
    channel_id?: string;
    code?: number;
    content?: object;
    create_time?: string;
    group_id?: string;
    message_id?: string;
    persistent?: boolean;
    room_name?: string;
    reference_id?: string;
    sender_id?: string;
    update_time?: string;
    user_id_one?: string;
    user_id_two?: string;
    username?: string;
}
/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
    cacheable_cursor?: string;
    messages?: Array<ChannelMessage>;
    next_cursor?: string;
    prev_cursor?: string;
}
/** A user in the system. */
export interface User {
    avatar_url?: string;
    create_time?: string;
    display_name?: string;
    edge_count?: number;
    facebook_id?: string;
    facebook_instant_game_id?: string;
    gamecenter_id?: string;
    google_id?: string;
    id?: string;
    lang_tag?: string;
    location?: string;
    metadata?: {};
    online?: boolean;
    steam_id?: string;
    timezone?: string;
    update_time?: string;
    username?: string;
}
/** A collection of zero or more users. */
export interface Users {
    users?: Array<User>;
}
/** A friend of a user. */
export interface Friend {
    state?: number;
    user?: User;
}
/** A collection of zero or more friends of the user. */
export interface Friends {
    friends?: Array<Friend>;
    cursor?: string;
}
/** A user-role pair representing the user's role in a group. */
export interface GroupUser {
    user?: User;
    state?: number;
}
/** A list of users belonging to a group along with their role in it. */
export interface GroupUserList {
    group_users?: Array<GroupUser>;
    cursor?: string;
}
/** A group in the server. */
export interface Group {
    avatar_url?: string;
    create_time?: string;
    creator_id?: string;
    description?: string;
    edge_count?: number;
    id?: string;
    lang_tag?: string;
    max_count?: number;
    metadata?: {};
    name?: string;
    open?: boolean;
    update_time?: string;
}
/** One or more groups returned from a listing operation. */
export interface GroupList {
    cursor?: string;
    groups?: Array<Group>;
}
/** A group-role pair representing the user's groups and their role in each. */
export interface UserGroup {
    group?: Group;
    state?: number;
}
/** A list of groups belonging to a user along with their role in it. */
export interface UserGroupList {
    user_groups?: Array<UserGroup>;
    cursor?: string;
}
/** A notification in the server. */
export interface Notification {
    code?: number;
    content?: {};
    create_time?: string;
    id?: string;
    persistent?: boolean;
    sender_id?: string;
    subject?: string;
}
/** A collection of zero or more notifications. */
export interface NotificationList {
    cacheable_cursor?: string;
    notifications?: Array<Notification>;
}
/** A client for Nakama server. */
export declare class Client {
    readonly serverkey: string;
    readonly host: string;
    readonly port: string;
    readonly useSSL: boolean;
    readonly timeout: number;
    readonly autoRefreshSession: boolean;
    expiredTimespanMs: number;
    private readonly apiClient;
    constructor(serverkey?: string, host?: string, port?: string, useSSL?: boolean, timeout?: number, autoRefreshSession?: boolean);
    /** Add users to a group, or accept their join requests. */
    addGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    /** Add friends by ID or username to a user's account. */
    addFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Authenticate a user with an Apple ID against the server. */
    authenticateApple(token: string, create?: boolean, username?: string, vars?: Map<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a custom id against the server. */
    authenticateCustom(id: string, create?: boolean, username?: string, vars?: Map<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a device id against the server. */
    authenticateDevice(id: string, create?: boolean, username?: string, vars?: Map<string, string>): Promise<Session>;
    /** Authenticate a user with an email+password against the server. */
    authenticateEmail(email: string, password: string, create?: boolean, username?: string, vars?: Map<string, string>): Promise<Session>;
    /** Authenticate a user with a Facebook Instant Game token against the server. */
    authenticateFacebookInstantGame(signedPlayerInfo: string, create?: boolean, username?: string, vars?: Map<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a Facebook OAuth token against the server. */
    authenticateFacebook(token: string, create?: boolean, username?: string, sync?: boolean, vars?: Map<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with Google against the server. */
    authenticateGoogle(token: string, create?: boolean, username?: string, vars?: Map<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with GameCenter against the server. */
    authenticateGameCenter(token: string, create?: boolean, username?: string, vars?: Map<string, string>): Promise<Session>;
    /** Authenticate a user with Steam against the server. */
    authenticateSteam(token: string, create?: boolean, username?: string, sync?: boolean, vars?: Map<string, string>): Promise<Session>;
    /** Ban users from a group. */
    banGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    /** Block one or more users by ID or username. */
    blockFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Create a new group with the current user as the creator and superadmin. */
    createGroup(session: Session, request: ApiCreateGroupRequest): Promise<Group>;
    /** A socket created with the client's configuration. */
    createSocket(useSSL?: boolean, verbose?: boolean, adapter?: WebSocketAdapter): Socket;
    /** Delete one or more users by ID or username. */
    deleteFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Delete a group the user is part of and has permissions to delete. */
    deleteGroup(session: Session, groupId: string): Promise<boolean>;
    /** Delete one or more notifications */
    deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean>;
    /** Delete one or more storage objects */
    deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean>;
    /** Demote a set of users in a group to the next role down. */
    demoteGroupUsers(session: Session, groupId: string, ids: Array<string>): Promise<boolean>;
    /** Submit an event for processing in the server's registered runtime custom events handler. */
    emitEvent(session: Session, request: ApiEvent): Promise<boolean>;
    /** Fetch the current user's account. */
    getAccount(session: Session): Promise<ApiAccount>;
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
    /** List leaderboard records */
    listLeaderboardRecords(session: Session, leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string): Promise<LeaderboardRecordList>;
    listLeaderboardRecordsAroundOwner(session: Session, leaderboardId: string, ownerId: string, limit?: number, expiry?: string): Promise<LeaderboardRecordList>;
    /** Fetch list of running matches. */
    listMatches(session: Session, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number, query?: string): Promise<ApiMatchList>;
    /** Fetch list of notifications. */
    listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<NotificationList>;
    /** List storage objects. */
    listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList>;
    /** List current or upcoming tournaments. */
    listTournaments(session: Session, categoryStart?: number, categoryEnd?: number, startTime?: number, endTime?: number, limit?: number, cursor?: string): Promise<TournamentList>;
    /** List tournament records from a given tournament. */
    listTournamentRecords(session: Session, tournamentId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string): Promise<TournamentRecordList>;
    /** List tournament records from a given tournament around the owner. */
    listTournamentRecordsAroundOwner(session: Session, tournamentId: string, ownerId: string, limit?: number, expiry?: string): Promise<TournamentRecordList>;
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
    sessionRefresh(session: Session, vars?: Map<string, string>): Promise<Session>;
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
    validatePurchaseApple(session: Session, receipt?: string): Promise<ApiValidatePurchaseResponse>;
    /** Validate a Google IAP receipt. */
    validatePurchaseGoogle(session: Session, purchase?: string): Promise<ApiValidatePurchaseResponse>;
    /** Validate a Huawei IAP receipt. */
    validatePurchaseHuawei(session: Session, purchase?: string, signature?: string): Promise<ApiValidatePurchaseResponse>;
    /** Write a record to a leaderboard. */
    writeLeaderboardRecord(session: Session, leaderboardId: string, request: WriteLeaderboardRecord): Promise<LeaderboardRecord>;
    /** Write storage objects. */
    writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks>;
    /** Write a record to a tournament. */
    writeTournamentRecord(session: Session, tournamentId: string, request: WriteTournamentRecord): Promise<LeaderboardRecord>;
}
