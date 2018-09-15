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
    email?: string;
    user?: ApiUser;
    verify_time?: string;
    wallet?: string;
}
export interface ApiAccountCustom {
    id?: string;
}
export interface ApiAccountDevice {
    id?: string;
}
export interface ApiAccountEmail {
    email?: string;
    password?: string;
}
export interface ApiAccountFacebook {
    token?: string;
}
export interface ApiAccountGameCenter {
    bundle_id?: string;
    player_id?: string;
    public_key_url?: string;
    salt?: string;
    signature?: string;
    timestamp_seconds?: string;
}
export interface ApiAccountGoogle {
    token?: string;
}
export interface ApiAccountSteam {
    token?: string;
}
export interface ApiChannelMessage {
    channel_id?: string;
    code?: number;
    content?: string;
    create_time?: string;
    message_id?: string;
    persistent?: boolean;
    sender_id?: string;
    update_time?: string;
    username?: string;
}
export interface ApiChannelMessageList {
    messages?: Array<ApiChannelMessage>;
    next_cursor?: string;
    prev_cursor?: string;
}
export interface ApiCreateGroupRequest {
    avatar_url?: string;
    description?: string;
    lang_tag?: string;
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
export interface ApiFriend {
    state?: number;
    user?: ApiUser;
}
export interface ApiFriends {
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
    label?: string;
    match_id?: string;
    size?: number;
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
    token?: string;
    udp_token?: string;
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
    end_active?: number;
    end_time?: string;
    id?: string;
    max_num_score?: number;
    max_size?: number;
    metadata?: string;
    next_reset?: number;
    size?: number;
    sort_order?: number;
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
    avatar_url?: string;
    create_time?: string;
    display_name?: string;
    edge_count?: number;
    facebook_id?: string;
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
export interface ProtobufEmpty {
}
export declare const NakamaApi: (configuration?: ConfigurationParameters) => {
    healthcheck(options?: any): Promise<ProtobufEmpty>;
    getAccount(options?: any): Promise<ApiAccount>;
    updateAccount(body: ApiUpdateAccountRequest, options?: any): Promise<ProtobufEmpty>;
    authenticateCustom(body: ApiAccountCustom, create?: boolean | undefined, username?: string | undefined, options?: any): Promise<ApiSession>;
    authenticateDevice(body: ApiAccountDevice, create?: boolean | undefined, username?: string | undefined, options?: any): Promise<ApiSession>;
    authenticateEmail(body: ApiAccountEmail, create?: boolean | undefined, username?: string | undefined, options?: any): Promise<ApiSession>;
    authenticateFacebook(body: ApiAccountFacebook, create?: boolean | undefined, username?: string | undefined, import_?: boolean | undefined, options?: any): Promise<ApiSession>;
    authenticateGameCenter(body: ApiAccountGameCenter, create?: boolean | undefined, username?: string | undefined, options?: any): Promise<ApiSession>;
    authenticateGoogle(body: ApiAccountGoogle, create?: boolean | undefined, username?: string | undefined, options?: any): Promise<ApiSession>;
    authenticateSteam(body: ApiAccountSteam, create?: boolean | undefined, username?: string | undefined, options?: any): Promise<ApiSession>;
    linkCustom(body: ApiAccountCustom, options?: any): Promise<ProtobufEmpty>;
    linkDevice(body: ApiAccountDevice, options?: any): Promise<ProtobufEmpty>;
    linkEmail(body: ApiAccountEmail, options?: any): Promise<ProtobufEmpty>;
    linkFacebook(body: ApiAccountFacebook, import_?: boolean | undefined, options?: any): Promise<ProtobufEmpty>;
    linkGameCenter(body: ApiAccountGameCenter, options?: any): Promise<ProtobufEmpty>;
    linkGoogle(body: ApiAccountGoogle, options?: any): Promise<ProtobufEmpty>;
    linkSteam(body: ApiAccountSteam, options?: any): Promise<ProtobufEmpty>;
    unlinkCustom(body: ApiAccountCustom, options?: any): Promise<ProtobufEmpty>;
    unlinkDevice(body: ApiAccountDevice, options?: any): Promise<ProtobufEmpty>;
    unlinkEmail(body: ApiAccountEmail, options?: any): Promise<ProtobufEmpty>;
    unlinkFacebook(body: ApiAccountFacebook, options?: any): Promise<ProtobufEmpty>;
    unlinkGameCenter(body: ApiAccountGameCenter, options?: any): Promise<ProtobufEmpty>;
    unlinkGoogle(body: ApiAccountGoogle, options?: any): Promise<ProtobufEmpty>;
    unlinkSteam(body: ApiAccountSteam, options?: any): Promise<ProtobufEmpty>;
    listChannelMessages(channelId: string, limit?: number | undefined, forward?: boolean | undefined, cursor?: string | undefined, options?: any): Promise<ApiChannelMessageList>;
    deleteFriends(ids?: string[] | undefined, usernames?: string[] | undefined, options?: any): Promise<ProtobufEmpty>;
    listFriends(options?: any): Promise<ApiFriends>;
    addFriends(options?: any): Promise<ProtobufEmpty>;
    blockFriends(options?: any): Promise<ProtobufEmpty>;
    importFacebookFriends(body: ApiAccountFacebook, reset?: boolean | undefined, options?: any): Promise<ProtobufEmpty>;
    listGroups(name?: string | undefined, cursor?: string | undefined, limit?: number | undefined, options?: any): Promise<ApiGroupList>;
    createGroup(body: ApiCreateGroupRequest, options?: any): Promise<ApiGroup>;
    deleteGroup(groupId: string, options?: any): Promise<ProtobufEmpty>;
    updateGroup(groupId: string, body: ApiUpdateGroupRequest, options?: any): Promise<ProtobufEmpty>;
    addGroupUsers(groupId: string, options?: any): Promise<ProtobufEmpty>;
    joinGroup(groupId: string, options?: any): Promise<ProtobufEmpty>;
    kickGroupUsers(groupId: string, options?: any): Promise<ProtobufEmpty>;
    leaveGroup(groupId: string, options?: any): Promise<ProtobufEmpty>;
    promoteGroupUsers(groupId: string, options?: any): Promise<ProtobufEmpty>;
    listGroupUsers(groupId: string, options?: any): Promise<ApiGroupUserList>;
    deleteLeaderboardRecord(leaderboardId: string, options?: any): Promise<ProtobufEmpty>;
    listLeaderboardRecords(leaderboardId: string, ownerIds?: string[] | undefined, limit?: number | undefined, cursor?: string | undefined, options?: any): Promise<ApiLeaderboardRecordList>;
    writeLeaderboardRecord(leaderboardId: string, body: WriteLeaderboardRecordRequestLeaderboardRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    listLeaderboardRecordsAroundOwner(leaderboardId: string, ownerId: string, limit?: number | undefined, options?: any): Promise<ApiLeaderboardRecordList>;
    listMatches(limit?: number | undefined, authoritative?: boolean | undefined, label?: string | undefined, minSize?: number | undefined, maxSize?: number | undefined, options?: any): Promise<ApiMatchList>;
    deleteNotifications(ids?: string[] | undefined, options?: any): Promise<ProtobufEmpty>;
    listNotifications(limit?: number | undefined, cacheableCursor?: string | undefined, options?: any): Promise<ApiNotificationList>;
    rpcFunc2(id: string, payload?: string | undefined, httpKey?: string | undefined, options?: any): Promise<ApiRpc>;
    rpcFunc(id: string, body: string, options?: any): Promise<ApiRpc>;
    readStorageObjects(body: ApiReadStorageObjectsRequest, options?: any): Promise<ApiStorageObjects>;
    writeStorageObjects(body: ApiWriteStorageObjectsRequest, options?: any): Promise<ApiStorageObjectAcks>;
    deleteStorageObjects(body: ApiDeleteStorageObjectsRequest, options?: any): Promise<ProtobufEmpty>;
    listStorageObjects(collection: string, userId?: string | undefined, limit?: number | undefined, cursor?: string | undefined, options?: any): Promise<ApiStorageObjectList>;
    listStorageObjects2(collection: string, userId: string, limit?: number | undefined, cursor?: string | undefined, options?: any): Promise<ApiStorageObjectList>;
    listTournaments(categoryStart?: number | undefined, categoryEnd?: number | undefined, startTime?: number | undefined, endTime?: number | undefined, limit?: number | undefined, cursor?: string | undefined, options?: any): Promise<ApiTournamentList>;
    listTournamentRecords(tournamentId: string, ownerIds?: string[] | undefined, limit?: number | undefined, cursor?: string | undefined, options?: any): Promise<ApiTournamentRecordList>;
    writeTournamentRecord(tournamentId: string, body: WriteTournamentRecordRequestTournamentRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    joinTournament(tournamentId: string, options?: any): Promise<ProtobufEmpty>;
    listTournamentRecordsAroundOwner(tournamentId: string, ownerId: string, limit?: number | undefined, options?: any): Promise<ApiTournamentRecordList>;
    getUsers(ids?: string[] | undefined, usernames?: string[] | undefined, facebookIds?: string[] | undefined, options?: any): Promise<ApiUsers>;
    listUserGroups(userId: string, options?: any): Promise<ApiUserGroupList>;
};
