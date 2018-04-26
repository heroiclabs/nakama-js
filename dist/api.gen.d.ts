export interface ConfigurationParameters {
    basePath?: string;
    username?: string;
    password?: string;
    bearerToken?: string;
    timeoutMs?: number;
}
export interface CreateGroupsRequestNewGroup {
    avatar_url?: string;
    description?: string;
    lang_tag?: string;
    metadata?: string;
    name?: string;
    private?: boolean;
}
export interface WriteLeaderboardRecordRequestLeaderboardRecordWrite {
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
    reference_id?: string;
    sender_id?: string;
    update_time?: string;
    username?: string;
}
export interface ApiChannelMessageList {
    messages?: Array<ApiChannelMessage>;
    next_cursor?: string;
    prev_cursor?: string;
}
export interface ApiCreateGroupsRequest {
    groups?: Array<CreateGroupsRequestNewGroup>;
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
    count?: number;
    create_time?: string;
    creator_id?: string;
    description?: string;
    id?: string;
    lang_tag?: string;
    metadata?: string;
    name?: string;
    private?: boolean;
    update_time?: string;
}
export interface ApiGroups {
    groups?: Array<ApiGroup>;
}
export interface ApiLeaderboardRecord {
    create_time?: string;
    expiry_time?: string;
    leaderboard_id?: string;
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
export interface ApiUpdateAccountRequest {
    avatar_url?: string;
    display_name?: string;
    lang_tag?: string;
    location?: string;
    timezone?: string;
    username?: string;
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
export interface ProtobufBoolValue {
    value?: boolean;
}
export interface ProtobufEmpty {
}
export interface ProtobufInt32Value {
    value?: number;
}
export interface ProtobufStringValue {
    value?: string;
}
export declare const NakamaApi: (configuration?: ConfigurationParameters) => {
    healthcheck(options?: any): Promise<ProtobufEmpty>;
    getAccount(options?: any): Promise<ApiAccount>;
    updateAccount(body: ApiUpdateAccountRequest, options?: any): Promise<ProtobufEmpty>;
    authenticateCustom(body: ApiAccountCustom, options?: any): Promise<ApiSession>;
    authenticateDevice(body: ApiAccountDevice, options?: any): Promise<ApiSession>;
    authenticateEmail(body: ApiAccountEmail, options?: any): Promise<ApiSession>;
    authenticateFacebook(body: ApiAccountFacebook, options?: any): Promise<ApiSession>;
    authenticateGameCenter(body: ApiAccountGameCenter, options?: any): Promise<ApiSession>;
    authenticateGoogle(body: ApiAccountGoogle, options?: any): Promise<ApiSession>;
    authenticateSteam(body: ApiAccountSteam, options?: any): Promise<ApiSession>;
    linkCustom(body: ApiAccountCustom, options?: any): Promise<ProtobufEmpty>;
    linkDevice(body: ApiAccountDevice, options?: any): Promise<ProtobufEmpty>;
    linkEmail(body: ApiAccountEmail, options?: any): Promise<ProtobufEmpty>;
    linkFacebook(body: ApiAccountFacebook, options?: any): Promise<ProtobufEmpty>;
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
    listChannelMessages(channelId?: string | undefined, limit?: number | undefined, forward?: boolean | undefined, cursor?: string | undefined, options?: any): Promise<ApiChannelMessageList>;
    deleteFriends(options?: any): Promise<ProtobufEmpty>;
    listFriends(options?: any): Promise<ApiFriends>;
    addFriends(options?: any): Promise<ProtobufEmpty>;
    blockFriends(options?: any): Promise<ProtobufEmpty>;
    importFacebookFriends(body: ApiAccountFacebook, options?: any): Promise<ProtobufEmpty>;
    createGroup(body: ApiCreateGroupsRequest, options?: any): Promise<ApiGroups>;
    deleteLeaderboardRecord(leaderboardId: string, options?: any): Promise<ProtobufEmpty>;
    listLeaderboardRecords(leaderboardId: string, ownerIds?: string[] | undefined, limit?: number | undefined, cursor?: string | undefined, options?: any): Promise<ApiLeaderboardRecordList>;
    writeLeaderboardRecord(leaderboardId: string, body: WriteLeaderboardRecordRequestLeaderboardRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    listMatches(limit?: number | undefined, authoritative?: boolean | undefined, label?: string | undefined, minSize?: number | undefined, maxSize?: number | undefined, options?: any): Promise<ApiMatchList>;
    deleteNotifications(options?: any): Promise<ProtobufEmpty>;
    listNotifications(limit?: number | undefined, cacheableCursor?: string | undefined, options?: any): Promise<ApiNotificationList>;
    rpcFunc2(id: string, payload?: string | undefined, httpKey?: string | undefined, options?: any): Promise<ApiRpc>;
    rpcFunc(id: string, body: string, options?: any): Promise<ApiRpc>;
    readStorageObjects(body: ApiReadStorageObjectsRequest, options?: any): Promise<ApiStorageObjects>;
    writeStorageObjects(body: ApiWriteStorageObjectsRequest, options?: any): Promise<ApiStorageObjectAcks>;
    deleteStorageObjects(body: ApiDeleteStorageObjectsRequest, options?: any): Promise<ProtobufEmpty>;
    listStorageObjects(collection: string, userId?: string | undefined, limit?: number | undefined, cursor?: string | undefined, options?: any): Promise<ApiStorageObjectList>;
    listStorageObjects2(collection: string, userId: string, limit?: number | undefined, cursor?: string | undefined, options?: any): Promise<ApiStorageObjectList>;
    getUsers(ids?: string[] | undefined, usernames?: string[] | undefined, facebookIds?: string[] | undefined, options?: any): Promise<ApiUsers>;
};
