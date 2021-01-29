export interface ConfigurationParameters {
    basePath?: string;
    username?: string;
    password?: string;
    bearerToken?: string;
    timeoutMs?: number;
}
export interface GroupUserListGroupUser {
    state?: number;
    user?: ApiUser;
}
export interface UserGroupListUserGroup {
    group?: ApiGroup;
    state?: number;
}
export interface WriteLeaderboardRecordRequestLeaderboardRecordWrite {
    metadata?: string;
    score?: string;
    subscore?: string;
}
export interface WriteTournamentRecordRequestTournamentRecordWrite {
    metadata?: string;
    score?: string;
    subscore?: string;
}
export interface ApiAccount {
    custom_id?: string;
    devices?: Array<ApiAccountDevice>;
    disable_time?: string;
    email?: string;
    user?: ApiUser;
    verify_time?: string;
    wallet?: string;
}
export interface ApiAccountApple {
    token?: string;
    vars?: Map<string, string>;
}
export interface ApiAccountCustom {
    id?: string;
    vars?: Map<string, string>;
}
export interface ApiAccountDevice {
    id?: string;
    vars?: Map<string, string>;
}
export interface ApiAccountEmail {
    email?: string;
    password?: string;
    vars?: Map<string, string>;
}
export interface ApiAccountFacebook {
    token?: string;
    vars?: Map<string, string>;
}
export interface ApiAccountFacebookInstantGame {
    signed_player_info?: string;
    vars?: Map<string, string>;
}
export interface ApiAccountGameCenter {
    bundle_id?: string;
    player_id?: string;
    public_key_url?: string;
    salt?: string;
    signature?: string;
    timestamp_seconds?: string;
    vars?: Map<string, string>;
}
export interface ApiAccountGoogle {
    token?: string;
    vars?: Map<string, string>;
}
export interface ApiAccountSteam {
    token?: string;
    vars?: Map<string, string>;
}
export interface ApiChannelMessage {
    channel_id?: string;
    code?: number;
    content?: string;
    create_time?: string;
    group_id?: string;
    message_id?: string;
    persistent?: boolean;
    room_name?: string;
    sender_id?: string;
    update_time?: string;
    user_id_one?: string;
    user_id_two?: string;
    username?: string;
}
export interface ApiChannelMessageList {
    cacheable_cursor?: string;
    messages?: Array<ApiChannelMessage>;
    next_cursor?: string;
    prev_cursor?: string;
}
export interface ApiCreateGroupRequest {
    avatar_url?: string;
    description?: string;
    lang_tag?: string;
    max_count?: number;
    name?: string;
    open?: boolean;
}
export interface ApiDeleteStorageObjectId {
    collection?: string;
    key?: string;
    version?: string;
}
export interface ApiDeleteStorageObjectsRequest {
    object_ids?: Array<ApiDeleteStorageObjectId>;
}
export interface ApiEvent {
    external?: boolean;
    name?: string;
    properties?: Map<string, string>;
    timestamp?: string;
}
export interface ApiFriend {
    state?: number;
    update_time?: string;
    user?: ApiUser;
}
export interface ApiFriendList {
    cursor?: string;
    friends?: Array<ApiFriend>;
}
export interface ApiGroup {
    avatar_url?: string;
    create_time?: string;
    creator_id?: string;
    description?: string;
    edge_count?: number;
    id?: string;
    lang_tag?: string;
    max_count?: number;
    metadata?: string;
    name?: string;
    open?: boolean;
    update_time?: string;
}
export interface ApiGroupList {
    cursor?: string;
    groups?: Array<ApiGroup>;
}
export interface ApiGroupUserList {
    cursor?: string;
    group_users?: Array<GroupUserListGroupUser>;
}
export interface ApiLeaderboardRecord {
    create_time?: string;
    expiry_time?: string;
    leaderboard_id?: string;
    max_num_score?: number;
    metadata?: string;
    num_score?: number;
    owner_id?: string;
    rank?: string;
    score?: string;
    subscore?: string;
    update_time?: string;
    username?: string;
}
export interface ApiLeaderboardRecordList {
    next_cursor?: string;
    owner_records?: Array<ApiLeaderboardRecord>;
    prev_cursor?: string;
    records?: Array<ApiLeaderboardRecord>;
}
export interface ApiMatch {
    authoritative?: boolean;
    handler_name?: string;
    label?: string;
    match_id?: string;
    size?: number;
    tick_rate?: number;
}
export interface ApiMatchList {
    matches?: Array<ApiMatch>;
}
export interface ApiNotification {
    code?: number;
    content?: string;
    create_time?: string;
    id?: string;
    persistent?: boolean;
    sender_id?: string;
    subject?: string;
}
export interface ApiNotificationList {
    cacheable_cursor?: string;
    notifications?: Array<ApiNotification>;
}
export interface ApiReadStorageObjectId {
    collection?: string;
    key?: string;
    user_id?: string;
}
export interface ApiReadStorageObjectsRequest {
    object_ids?: Array<ApiReadStorageObjectId>;
}
export interface ApiRpc {
    http_key?: string;
    id?: string;
    payload?: string;
}
export interface ApiSession {
    created?: boolean;
    refresh_token?: string;
    token?: string;
}
export interface ApiSessionRefreshRequest {
    token?: string;
    vars?: Map<string, string>;
}
export interface ApiStorageObject {
    collection?: string;
    create_time?: string;
    key?: string;
    permission_read?: number;
    permission_write?: number;
    update_time?: string;
    user_id?: string;
    value?: string;
    version?: string;
}
export interface ApiStorageObjectAck {
    collection?: string;
    key?: string;
    user_id?: string;
    version?: string;
}
export interface ApiStorageObjectAcks {
    acks?: Array<ApiStorageObjectAck>;
}
export interface ApiStorageObjectList {
    cursor?: string;
    objects?: Array<ApiStorageObject>;
}
export interface ApiStorageObjects {
    objects?: Array<ApiStorageObject>;
}
export interface ApiTournament {
    can_enter?: boolean;
    category?: number;
    create_time?: string;
    description?: string;
    duration?: number;
    end_active?: number;
    end_time?: string;
    id?: string;
    max_num_score?: number;
    max_size?: number;
    metadata?: string;
    next_reset?: number;
    size?: number;
    sort_order?: number;
    start_active?: number;
    start_time?: string;
    title?: string;
}
export interface ApiTournamentList {
    cursor?: string;
    tournaments?: Array<ApiTournament>;
}
export interface ApiTournamentRecordList {
    next_cursor?: string;
    owner_records?: Array<ApiLeaderboardRecord>;
    prev_cursor?: string;
    records?: Array<ApiLeaderboardRecord>;
}
export interface ApiUpdateAccountRequest {
    avatar_url?: string;
    display_name?: string;
    lang_tag?: string;
    location?: string;
    timezone?: string;
    username?: string;
}
export interface ApiUpdateGroupRequest {
    avatar_url?: string;
    description?: string;
    group_id?: string;
    lang_tag?: string;
    name?: string;
    open?: boolean;
}
export interface ApiUser {
    apple_id?: string;
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
    metadata?: string;
    online?: boolean;
    steam_id?: string;
    timezone?: string;
    update_time?: string;
    username?: string;
}
export interface ApiUserGroupList {
    cursor?: string;
    user_groups?: Array<UserGroupListUserGroup>;
}
export interface ApiUsers {
    users?: Array<ApiUser>;
}
export interface ApiWriteStorageObject {
    collection?: string;
    key?: string;
    permission_read?: number;
    permission_write?: number;
    value?: string;
    version?: string;
}
export interface ApiWriteStorageObjectsRequest {
    objects?: Array<ApiWriteStorageObject>;
}
export interface ProtobufAny {
    type_url?: string;
    value?: string;
}
export interface RpcStatus {
    code?: number;
    details?: Array<ProtobufAny>;
    message?: string;
}
export declare class NakamaApi {
    configuration: ConfigurationParameters;
    constructor(configuration: ConfigurationParameters);
    doFetch(urlPath: string, method: string, queryParams: any, body?: any, options?: any): Promise<any>;
    healthcheck(options?: any): Promise<any>;
    getAccount(options?: any): Promise<ApiAccount>;
    updateAccount(body: ApiUpdateAccountRequest, options?: any): Promise<any>;
    authenticateApple(body: ApiAccountApple, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateCustom(body: ApiAccountCustom, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateDevice(body: ApiAccountDevice, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateEmail(body: ApiAccountEmail, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateFacebook(body: ApiAccountFacebook, create?: boolean, username?: string, sync?: boolean, options?: any): Promise<ApiSession>;
    authenticateFacebookInstantGame(body: ApiAccountFacebookInstantGame, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateGameCenter(body: ApiAccountGameCenter, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateGoogle(body: ApiAccountGoogle, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateSteam(body: ApiAccountSteam, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    linkApple(body: ApiAccountApple, options?: any): Promise<any>;
    linkCustom(body: ApiAccountCustom, options?: any): Promise<any>;
    linkDevice(body: ApiAccountDevice, options?: any): Promise<any>;
    linkEmail(body: ApiAccountEmail, options?: any): Promise<any>;
    linkFacebook(body: ApiAccountFacebook, sync?: boolean, options?: any): Promise<any>;
    linkFacebookInstantGame(body: ApiAccountFacebookInstantGame, options?: any): Promise<any>;
    linkGameCenter(body: ApiAccountGameCenter, options?: any): Promise<any>;
    linkGoogle(body: ApiAccountGoogle, options?: any): Promise<any>;
    linkSteam(body: ApiAccountSteam, options?: any): Promise<any>;
    sessionRefresh(body: ApiSessionRefreshRequest, options?: any): Promise<ApiSession>;
    unlinkApple(body: ApiAccountApple, options?: any): Promise<any>;
    unlinkCustom(body: ApiAccountCustom, options?: any): Promise<any>;
    unlinkDevice(body: ApiAccountDevice, options?: any): Promise<any>;
    unlinkEmail(body: ApiAccountEmail, options?: any): Promise<any>;
    unlinkFacebook(body: ApiAccountFacebook, options?: any): Promise<any>;
    unlinkFacebookInstantGame(body: ApiAccountFacebookInstantGame, options?: any): Promise<any>;
    unlinkGameCenter(body: ApiAccountGameCenter, options?: any): Promise<any>;
    unlinkGoogle(body: ApiAccountGoogle, options?: any): Promise<any>;
    unlinkSteam(body: ApiAccountSteam, options?: any): Promise<any>;
    listChannelMessages(channelId: string, limit?: number, forward?: boolean, cursor?: string, options?: any): Promise<ApiChannelMessageList>;
    event(body: ApiEvent, options?: any): Promise<any>;
    deleteFriends(ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    listFriends(limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiFriendList>;
    addFriends(ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    blockFriends(ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    importFacebookFriends(body: ApiAccountFacebook, reset?: boolean, options?: any): Promise<any>;
    listGroups(name?: string, cursor?: string, limit?: number, options?: any): Promise<ApiGroupList>;
    createGroup(body: ApiCreateGroupRequest, options?: any): Promise<ApiGroup>;
    deleteGroup(groupId: string, options?: any): Promise<any>;
    updateGroup(groupId: string, body: ApiUpdateGroupRequest, options?: any): Promise<any>;
    addGroupUsers(groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    banGroupUsers(groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    demoteGroupUsers(groupId: string, userIds: Array<string>, options?: any): Promise<any>;
    joinGroup(groupId: string, options?: any): Promise<any>;
    kickGroupUsers(groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    leaveGroup(groupId: string, options?: any): Promise<any>;
    promoteGroupUsers(groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    listGroupUsers(groupId: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiGroupUserList>;
    deleteLeaderboardRecord(leaderboardId: string, options?: any): Promise<any>;
    listLeaderboardRecords(leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string, options?: any): Promise<ApiLeaderboardRecordList>;
    writeLeaderboardRecord(leaderboardId: string, body: WriteLeaderboardRecordRequestLeaderboardRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    listLeaderboardRecordsAroundOwner(leaderboardId: string, ownerId: string, limit?: number, expiry?: string, options?: any): Promise<ApiLeaderboardRecordList>;
    listMatches(limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number, query?: string, options?: any): Promise<ApiMatchList>;
    deleteNotifications(ids?: Array<string>, options?: any): Promise<any>;
    listNotifications(limit?: number, cacheableCursor?: string, options?: any): Promise<ApiNotificationList>;
    rpcFunc2(id: string, payload?: string, httpKey?: string, options?: any): Promise<ApiRpc>;
    rpcFunc(id: string, body: string, httpKey?: string, options?: any): Promise<ApiRpc>;
    readStorageObjects(body: ApiReadStorageObjectsRequest, options?: any): Promise<ApiStorageObjects>;
    writeStorageObjects(body: ApiWriteStorageObjectsRequest, options?: any): Promise<ApiStorageObjectAcks>;
    deleteStorageObjects(body: ApiDeleteStorageObjectsRequest, options?: any): Promise<any>;
    listStorageObjects(collection: string, userId?: string, limit?: number, cursor?: string, options?: any): Promise<ApiStorageObjectList>;
    listStorageObjects2(collection: string, userId: string, limit?: number, cursor?: string, options?: any): Promise<ApiStorageObjectList>;
    listTournaments(categoryStart?: number, categoryEnd?: number, startTime?: number, endTime?: number, limit?: number, cursor?: string, options?: any): Promise<ApiTournamentList>;
    listTournamentRecords(tournamentId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string, options?: any): Promise<ApiTournamentRecordList>;
    writeTournamentRecord(tournamentId: string, body: WriteTournamentRecordRequestTournamentRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    joinTournament(tournamentId: string, options?: any): Promise<any>;
    listTournamentRecordsAroundOwner(tournamentId: string, ownerId: string, limit?: number, expiry?: string, options?: any): Promise<ApiTournamentRecordList>;
    getUsers(ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>, options?: any): Promise<ApiUsers>;
    listUserGroups(userId: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiUserGroupList>;
}
