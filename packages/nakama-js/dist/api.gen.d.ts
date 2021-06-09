export interface GroupUserListGroupUser {
    state?: number;
    user?: ApiUser;
}
export interface UserGroupListUserGroup {
    group?: ApiGroup;
    state?: number;
}
export declare enum ValidatedPurchaseEnvironment {
    UNKNOWN = 0,
    SANDBOX = 1,
    PRODUCTION = 2
}
export declare enum ValidatedPurchaseStore {
    APPLE_APP_STORE = 0,
    GOOGLE_PLAY_STORE = 1,
    HUAWEI_APP_GALLERY = 2
}
export interface WriteLeaderboardRecordRequestLeaderboardRecordWrite {
    metadata?: string;
    operator?: ApiOverrideOperator;
    score?: string;
    subscore?: string;
}
export interface WriteTournamentRecordRequestTournamentRecordWrite {
    metadata?: string;
    operator?: ApiOverrideOperator;
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
export interface ApiLinkSteamRequest {
    account?: ApiAccountSteam;
    sync?: boolean;
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
export declare enum ApiOverrideOperator {
    NO_OVERRIDE = 0,
    BEST = 1,
    SET = 2,
    INCREMENT = 3,
    DECREMENT = 4
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
export interface ApiSessionLogoutRequest {
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
export interface ApiValidatePurchaseAppleRequest {
    receipt?: string;
}
export interface ApiValidatePurchaseGoogleRequest {
    purchase?: string;
}
export interface ApiValidatePurchaseHuaweiRequest {
    purchase?: string;
    signature?: string;
}
export interface ApiValidatePurchaseResponse {
    validated_purchases?: Array<ApiValidatedPurchase>;
}
export interface ApiValidatedPurchase {
    create_time?: string;
    environment?: ValidatedPurchaseEnvironment;
    product_id?: string;
    provider_response?: string;
    purchase_time?: string;
    store?: ValidatedPurchaseStore;
    transaction_id?: string;
    update_time?: string;
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
    readonly serverKey: string;
    readonly basePath: string;
    readonly timeoutMs: number;
    constructor(serverKey: string, basePath: string, timeoutMs: number);
    healthcheck(bearerToken: string, options?: any): Promise<any>;
    getAccount(bearerToken: string, options?: any): Promise<ApiAccount>;
    updateAccount(bearerToken: string, body: ApiUpdateAccountRequest, options?: any): Promise<any>;
    authenticateApple(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountApple, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateCustom(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountCustom, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateDevice(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountDevice, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateEmail(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountEmail, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateFacebook(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountFacebook, create?: boolean, username?: string, sync?: boolean, options?: any): Promise<ApiSession>;
    authenticateFacebookInstantGame(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountFacebookInstantGame, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateGameCenter(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountGameCenter, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateGoogle(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountGoogle, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    authenticateSteam(basicAuthUsername: string, basicAuthPassword: string, body: ApiAccountSteam, create?: boolean, username?: string, sync?: boolean, options?: any): Promise<ApiSession>;
    linkApple(bearerToken: string, body: ApiAccountApple, options?: any): Promise<any>;
    linkCustom(bearerToken: string, body: ApiAccountCustom, options?: any): Promise<any>;
    linkDevice(bearerToken: string, body: ApiAccountDevice, options?: any): Promise<any>;
    linkEmail(bearerToken: string, body: ApiAccountEmail, options?: any): Promise<any>;
    linkFacebook(bearerToken: string, body: ApiAccountFacebook, sync?: boolean, options?: any): Promise<any>;
    linkFacebookInstantGame(bearerToken: string, body: ApiAccountFacebookInstantGame, options?: any): Promise<any>;
    linkGameCenter(bearerToken: string, body: ApiAccountGameCenter, options?: any): Promise<any>;
    linkGoogle(bearerToken: string, body: ApiAccountGoogle, options?: any): Promise<any>;
    linkSteam(bearerToken: string, body: ApiLinkSteamRequest, options?: any): Promise<any>;
    sessionRefresh(basicAuthUsername: string, basicAuthPassword: string, body: ApiSessionRefreshRequest, options?: any): Promise<ApiSession>;
    unlinkApple(bearerToken: string, body: ApiAccountApple, options?: any): Promise<any>;
    unlinkCustom(bearerToken: string, body: ApiAccountCustom, options?: any): Promise<any>;
    unlinkDevice(bearerToken: string, body: ApiAccountDevice, options?: any): Promise<any>;
    unlinkEmail(bearerToken: string, body: ApiAccountEmail, options?: any): Promise<any>;
    unlinkFacebook(bearerToken: string, body: ApiAccountFacebook, options?: any): Promise<any>;
    unlinkFacebookInstantGame(bearerToken: string, body: ApiAccountFacebookInstantGame, options?: any): Promise<any>;
    unlinkGameCenter(bearerToken: string, body: ApiAccountGameCenter, options?: any): Promise<any>;
    unlinkGoogle(bearerToken: string, body: ApiAccountGoogle, options?: any): Promise<any>;
    unlinkSteam(bearerToken: string, body: ApiAccountSteam, options?: any): Promise<any>;
    listChannelMessages(bearerToken: string, channelId: string, limit?: number, forward?: boolean, cursor?: string, options?: any): Promise<ApiChannelMessageList>;
    event(bearerToken: string, body: ApiEvent, options?: any): Promise<any>;
    deleteFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    listFriends(bearerToken: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiFriendList>;
    addFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    blockFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    importFacebookFriends(bearerToken: string, body: ApiAccountFacebook, reset?: boolean, options?: any): Promise<any>;
    importSteamFriends(bearerToken: string, body: ApiAccountSteam, reset?: boolean, options?: any): Promise<any>;
    listGroups(bearerToken: string, name?: string, cursor?: string, limit?: number, options?: any): Promise<ApiGroupList>;
    createGroup(bearerToken: string, body: ApiCreateGroupRequest, options?: any): Promise<ApiGroup>;
    deleteGroup(bearerToken: string, groupId: string, options?: any): Promise<any>;
    updateGroup(bearerToken: string, groupId: string, body: ApiUpdateGroupRequest, options?: any): Promise<any>;
    addGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    banGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    demoteGroupUsers(bearerToken: string, groupId: string, userIds: Array<string>, options?: any): Promise<any>;
    joinGroup(bearerToken: string, groupId: string, options?: any): Promise<any>;
    kickGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    leaveGroup(bearerToken: string, groupId: string, options?: any): Promise<any>;
    promoteGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    listGroupUsers(bearerToken: string, groupId: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiGroupUserList>;
    validatePurchaseApple(bearerToken: string, body: ApiValidatePurchaseAppleRequest, options?: any): Promise<ApiValidatePurchaseResponse>;
    validatePurchaseGoogle(bearerToken: string, body: ApiValidatePurchaseGoogleRequest, options?: any): Promise<ApiValidatePurchaseResponse>;
    validatePurchaseHuawei(bearerToken: string, body: ApiValidatePurchaseHuaweiRequest, options?: any): Promise<ApiValidatePurchaseResponse>;
    deleteLeaderboardRecord(bearerToken: string, leaderboardId: string, options?: any): Promise<any>;
    listLeaderboardRecords(bearerToken: string, leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string, options?: any): Promise<ApiLeaderboardRecordList>;
    writeLeaderboardRecord(bearerToken: string, leaderboardId: string, body: WriteLeaderboardRecordRequestLeaderboardRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    listLeaderboardRecordsAroundOwner(bearerToken: string, leaderboardId: string, ownerId: string, limit?: number, expiry?: string, options?: any): Promise<ApiLeaderboardRecordList>;
    listMatches(bearerToken: string, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number, query?: string, options?: any): Promise<ApiMatchList>;
    deleteNotifications(bearerToken: string, ids?: Array<string>, options?: any): Promise<any>;
    listNotifications(bearerToken: string, limit?: number, cacheableCursor?: string, options?: any): Promise<ApiNotificationList>;
    rpcFunc2(bearerToken: string, id: string, payload?: string, httpKey?: string, options?: any): Promise<ApiRpc>;
    rpcFunc(bearerToken: string, id: string, body: string, httpKey?: string, options?: any): Promise<ApiRpc>;
    sessionLogout(bearerToken: string, body: ApiSessionLogoutRequest, options?: any): Promise<any>;
    readStorageObjects(bearerToken: string, body: ApiReadStorageObjectsRequest, options?: any): Promise<ApiStorageObjects>;
    writeStorageObjects(bearerToken: string, body: ApiWriteStorageObjectsRequest, options?: any): Promise<ApiStorageObjectAcks>;
    deleteStorageObjects(bearerToken: string, body: ApiDeleteStorageObjectsRequest, options?: any): Promise<any>;
    listStorageObjects(bearerToken: string, collection: string, userId?: string, limit?: number, cursor?: string, options?: any): Promise<ApiStorageObjectList>;
    listStorageObjects2(bearerToken: string, collection: string, userId: string, limit?: number, cursor?: string, options?: any): Promise<ApiStorageObjectList>;
    listTournaments(bearerToken: string, categoryStart?: number, categoryEnd?: number, startTime?: number, endTime?: number, limit?: number, cursor?: string, options?: any): Promise<ApiTournamentList>;
    listTournamentRecords(bearerToken: string, tournamentId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string, options?: any): Promise<ApiTournamentRecordList>;
    writeTournamentRecord2(bearerToken: string, tournamentId: string, body: WriteTournamentRecordRequestTournamentRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    writeTournamentRecord(bearerToken: string, tournamentId: string, body: WriteTournamentRecordRequestTournamentRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    joinTournament(bearerToken: string, tournamentId: string, options?: any): Promise<any>;
    listTournamentRecordsAroundOwner(bearerToken: string, tournamentId: string, ownerId: string, limit?: number, expiry?: string, options?: any): Promise<ApiTournamentRecordList>;
    getUsers(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>, options?: any): Promise<ApiUsers>;
    listUserGroups(bearerToken: string, userId: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiUserGroupList>;
}
