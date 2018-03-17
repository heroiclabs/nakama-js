export interface ConfigurationParameters {
    basePath?: string;
    username?: string;
    password?: string;
    bearerToken?: string;
    timeoutMs?: number;
}
export interface CreateGroupsRequestNewGroup {
    avatarUrl?: string;
    description?: string;
    langTag?: string;
    metadata?: string;
    name?: string;
    private?: boolean;
}
export interface ApiAccount {
    customId?: string;
    devices?: Array<ApiAccountDevice>;
    email?: string;
    user?: ApiUser;
    verifyTime?: string;
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
    bundleId?: string;
    playerId?: string;
    publicKeyUrl?: string;
    salt?: string;
    signature?: string;
    timestampSeconds?: string;
}
export interface ApiAccountGoogle {
    token?: string;
}
export interface ApiAccountSteam {
    token?: string;
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
    objectIds?: Array<ApiDeleteStorageObjectId>;
}
export interface ApiFriend {
    state?: number;
    user?: ApiUser;
}
export interface ApiFriends {
    friends?: Array<ApiFriend>;
}
export interface ApiGroup {
    avatarUrl?: string;
    count?: number;
    createTime?: string;
    creatorId?: string;
    description?: string;
    id?: string;
    langTag?: string;
    metadata?: string;
    name?: string;
    private?: boolean;
    updateTime?: string;
}
export interface ApiGroups {
    groups?: Array<ApiGroup>;
}
export interface ApiMatch {
    authoritative?: boolean;
    label?: string;
    matchId?: string;
    size?: number;
}
export interface ApiMatchList {
    matches?: Array<ApiMatch>;
}
export interface ApiNotification {
    code?: number;
    content?: string;
    createTime?: string;
    id?: string;
    persistent?: boolean;
    senderId?: string;
    subject?: string;
}
export interface ApiNotificationList {
    cacheableCursor?: string;
    notifications?: Array<ApiNotification>;
}
export interface ApiReadStorageObjectId {
    collection?: string;
    key?: string;
    userId?: string;
}
export interface ApiReadStorageObjectsRequest {
    objectIds?: Array<ApiReadStorageObjectId>;
}
export interface ApiRpc {
    httpKey?: string;
    id?: string;
    payload?: string;
}
export interface ApiSession {
    created?: boolean;
    token?: string;
    udpToken?: string;
}
export interface ApiStorageObject {
    collection?: string;
    createTime?: string;
    key?: string;
    permissionRead?: number;
    permissionWrite?: number;
    updateTime?: string;
    userId?: string;
    value?: string;
    version?: string;
}
export interface ApiStorageObjectAck {
    collection?: string;
    key?: string;
    userId?: string;
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
    avatarUrl?: string;
    displayName?: string;
    langTag?: string;
    location?: string;
    timezone?: string;
    username?: string;
}
export interface ApiUser {
    avatarUrl?: string;
    createTime?: string;
    displayName?: string;
    edgeCount?: number;
    facebookId?: string;
    gamecenterId?: string;
    googleId?: string;
    id?: string;
    langTag?: string;
    location?: string;
    metadata?: string;
    online?: boolean;
    steamId?: string;
    timezone?: string;
    updateTime?: string;
    username?: string;
}
export interface ApiUsers {
    users?: Array<ApiUser>;
}
export interface ApiWriteStorageObject {
    collection?: string;
    key?: string;
    permissionRead?: number;
    permissionWrite?: number;
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
    deleteFriends(options?: any): Promise<ProtobufEmpty>;
    listFriends(options?: any): Promise<ApiFriends>;
    addFriends(options?: any): Promise<ProtobufEmpty>;
    blockFriends(options?: any): Promise<ProtobufEmpty>;
    importFacebookFriends(body: ApiAccountFacebook, options?: any): Promise<ProtobufEmpty>;
    createGroup(body: ApiCreateGroupsRequest, options?: any): Promise<ApiGroups>;
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
