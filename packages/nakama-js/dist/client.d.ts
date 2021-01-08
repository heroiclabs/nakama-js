import { ApiAccount, ApiAccountCustom, ApiAccountDevice, ApiAccountEmail, ApiAccountFacebook, ApiAccountFacebookInstantGame, ApiAccountGoogle, ApiAccountGameCenter, ApiAccountSteam, ApiCreateGroupRequest, ApiDeleteStorageObjectsRequest, ApiEvent, ApiMatchList, ApiReadStorageObjectsRequest, ApiStorageObjectAcks, ApiUpdateAccountRequest, ApiUpdateGroupRequest, ApiAccountApple } from "./api.gen";
import { Session } from "./session";
import { Socket } from "./socket";
import { WebSocketAdapter } from "./web_socket_adapter";
export interface RpcResponse {
    id?: string;
    payload?: object;
}
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
export interface LeaderboardRecordList {
    next_cursor?: string;
    owner_records?: Array<LeaderboardRecord>;
    prev_cursor?: string;
    records?: Array<LeaderboardRecord>;
}
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
export interface TournamentList {
    tournaments?: Array<Tournament>;
    cursor?: string;
}
export interface TournamentRecordList {
    next_cursor?: string;
    owner_records?: Array<LeaderboardRecord>;
    prev_cursor?: string;
    records?: Array<LeaderboardRecord>;
}
export interface WriteTournamentRecord {
    metadata?: object;
    score?: string;
    subscore?: string;
}
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
export interface ChannelMessageList {
    messages?: Array<ChannelMessage>;
    next_cursor?: string;
    prev_cursor?: string;
}
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
export interface Users {
    users?: Array<User>;
}
export interface Friend {
    state?: number;
    user?: User;
}
export interface Friends {
    friends?: Array<Friend>;
    cursor?: string;
}
export interface GroupUser {
    user?: User;
    state?: number;
}
export interface GroupUserList {
    group_users?: Array<GroupUser>;
    cursor?: string;
}
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
export interface GroupList {
    cursor?: string;
    groups?: Array<Group>;
}
export interface UserGroup {
    group?: Group;
    state?: number;
}
export interface UserGroupList {
    user_groups?: Array<UserGroup>;
    cursor?: string;
}
export interface Notification {
    code?: number;
    content?: {};
    create_time?: string;
    id?: string;
    persistent?: boolean;
    sender_id?: string;
    subject?: string;
}
export interface NotificationList {
    cacheable_cursor?: string;
    notifications?: Array<Notification>;
}
export declare class Client {
    readonly serverkey: string;
    readonly host: string;
    readonly port: string;
    readonly useSSL: boolean;
    readonly timeout: number;
    private readonly apiClient;
    private readonly configuration;
    constructor(serverkey?: string, host?: string, port?: string, useSSL?: boolean, timeout?: number);
    addGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    addFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    authenticateApple(token: string, create?: boolean, username?: string, vars?: Map<string, string>, options?: any): Promise<Session>;
    authenticateCustom(id: string, create?: boolean, username?: string, vars?: Map<string, string>, options?: any): Promise<Session>;
    authenticateDevice(id: string, vars?: Map<string, string>): Promise<Session>;
    authenticateEmail(email: string, password: string, vars?: Map<string, string>): Promise<Session>;
    authenticateFacebookInstantGame(signedPlayerInfo: string, create?: boolean, username?: string, vars?: Map<string, string>, options?: any): Promise<Session>;
    authenticateFacebook(token: string, create?: boolean, username?: string, sync?: boolean, vars?: Map<string, string>, options?: any): Promise<Session>;
    authenticateGoogle(token: string, create?: boolean, username?: string, vars?: Map<string, string>, options?: any): Promise<Session>;
    authenticateGameCenter(token: string, vars?: Map<string, string>): Promise<Session>;
    authenticateSteam(token: string, vars?: Map<string, string>): Promise<Session>;
    banGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    blockFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    createGroup(session: Session, request: ApiCreateGroupRequest): Promise<Group>;
    createSocket(useSSL?: boolean, verbose?: boolean, adapter?: WebSocketAdapter): Socket;
    deleteFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    deleteGroup(session: Session, groupId: string): Promise<boolean>;
    deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean>;
    deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean>;
    demoteGroupUsers(session: Session, groupId: string, ids: Array<string>): Promise<boolean>;
    emitEvent(session: Session, request: ApiEvent): Promise<boolean>;
    getAccount(session: Session): Promise<ApiAccount>;
    importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<Users>;
    joinGroup(session: Session, groupId: string): Promise<boolean>;
    joinTournament(session: Session, tournamentId: string): Promise<boolean>;
    kickGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    leaveGroup(session: Session, groupId: string): Promise<boolean>;
    listChannelMessages(session: Session, channelId: string, limit?: number, forward?: boolean, cursor?: string): Promise<ChannelMessageList>;
    listGroupUsers(session: Session, groupId: string, state?: number, limit?: number, cursor?: string): Promise<GroupUserList>;
    listUserGroups(session: Session, userId: string, state?: number, limit?: number, cursor?: string): Promise<UserGroupList>;
    listGroups(session: Session, name?: string, cursor?: string, limit?: number): Promise<GroupList>;
    linkApple(session: Session, request: ApiAccountApple): Promise<boolean>;
    linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    linkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean>;
    linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    linkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean>;
    linkSteam(session: Session, request: ApiAccountSteam): Promise<boolean>;
    listFriends(session: Session, state?: number, limit?: number, cursor?: string): Promise<Friends>;
    listLeaderboardRecords(session: Session, leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string): Promise<LeaderboardRecordList>;
    listLeaderboardRecordsAroundOwner(session: Session, leaderboardId: string, ownerId: string, limit?: number, expiry?: string): Promise<LeaderboardRecordList>;
    listMatches(session: Session, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number, query?: string): Promise<ApiMatchList>;
    listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<NotificationList>;
    listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList>;
    listTournaments(session: Session, categoryStart?: number, categoryEnd?: number, startTime?: number, endTime?: number, limit?: number, cursor?: string): Promise<TournamentList>;
    listTournamentRecords(session: Session, tournamentId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string): Promise<TournamentRecordList>;
    listTournamentRecordsAroundOwner(session: Session, tournamentId: string, ownerId: string, limit?: number, expiry?: string): Promise<TournamentRecordList>;
    promoteGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    readStorageObjects(session: Session, request: ApiReadStorageObjectsRequest): Promise<StorageObjects>;
    rpc(session: Session, id: string, input: object): Promise<RpcResponse>;
    rpcGet(id: string, session?: Session, httpKey?: string, input?: object): Promise<RpcResponse>;
    unlinkApple(session: Session, request: ApiAccountApple): Promise<boolean>;
    unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    unlinkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean>;
    unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    unlinkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean>;
    unlinkSteam(session: Session, request: ApiAccountSteam): Promise<boolean>;
    updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean>;
    updateGroup(session: Session, groupId: string, request: ApiUpdateGroupRequest): Promise<boolean>;
    writeLeaderboardRecord(session: Session, leaderboardId: string, request: WriteLeaderboardRecord): Promise<LeaderboardRecord>;
    writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks>;
    writeTournamentRecord(session: Session, tournamentId: string, request: WriteTournamentRecord): Promise<LeaderboardRecord>;
}
