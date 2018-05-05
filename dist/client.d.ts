import { ApiAccount, ApiAccountCustom, ApiAccountDevice, ApiAccountEmail, ApiAccountFacebook, ApiAccountGoogle, ApiCreateGroupRequest, ApiDeleteStorageObjectsRequest, ApiMatchList, ApiReadStorageObjectsRequest, ApiStorageObjectAcks, ApiUpdateAccountRequest, ApiUpdateGroupRequest } from "./api.gen";
import { Session } from "./session";
import { Socket } from "./socket";
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
}
export interface LeaderboardRecordList {
    next_cursor?: string;
    owner_records?: Array<LeaderboardRecord>;
    prev_cursor?: string;
    records?: Array<LeaderboardRecord>;
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
    message_id?: string;
    persistent?: boolean;
    reference_id?: string;
    sender_id?: string;
    update_time?: string;
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
}
export interface GroupUser {
    user?: User;
    state?: number;
}
export interface GroupUserList {
    group_users?: Array<GroupUser>;
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
export interface UserGroup {
    group?: Group;
    state?: number;
}
export interface UserGroupList {
    user_groups?: Array<UserGroup>;
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
    useSSL: boolean;
    timeout: number;
    verbose: boolean;
    private readonly apiClient;
    private readonly configuration;
    constructor(serverkey?: string, host?: string, port?: string, useSSL?: boolean, timeout?: number, verbose?: boolean);
    addGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    authenticateCustom(request: ApiAccountCustom): Promise<Session>;
    authenticateDevice(request: ApiAccountDevice): Promise<Session>;
    authenticateEmail(request: ApiAccountEmail): Promise<Session>;
    authenticateFacebook(request: ApiAccountFacebook): Promise<Session>;
    authenticateGoogle(request: ApiAccountGoogle): Promise<Session>;
    createGroup(session: Session, request: ApiCreateGroupRequest): Promise<Group>;
    createSocket(useSSL?: boolean, verbose?: boolean): Socket;
    deleteGroup(session: Session, groupId: string): Promise<boolean>;
    deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean>;
    deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean>;
    getAccount(session: Session): Promise<ApiAccount>;
    importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<Users>;
    joinGroup(session: Session, groupId: string): Promise<boolean>;
    kickGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    leaveGroup(session: Session, groupId: string): Promise<boolean>;
    listChannelMessages(session: Session, channelId: string, limit?: number, forward?: boolean, cursor?: string): Promise<ChannelMessageList>;
    listGroupUsers(session: Session, groupId: string): Promise<GroupUserList>;
    listUserGroups(session: Session, userId: string): Promise<UserGroupList>;
    linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    listFriends(session: Session): Promise<Friends>;
    listLeaderboardRecords(session: Session, leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string): Promise<LeaderboardRecordList>;
    listMatches(session: Session, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number): Promise<ApiMatchList>;
    listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<NotificationList>;
    listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList>;
    promoteGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean>;
    readStorageObjects(session: Session, request: ApiReadStorageObjectsRequest): Promise<StorageObjects>;
    rpc(session: Session, id: string, input: object): Promise<RpcResponse>;
    rpcGet(id: string, session?: Session, httpKey?: string, input?: object): Promise<RpcResponse>;
    unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean>;
    updateGroup(session: Session, groupId: string, request: ApiUpdateGroupRequest): Promise<boolean>;
    writeLeaderboardRecord(session: Session, leaderboardId: string, request: WriteLeaderboardRecord): Promise<LeaderboardRecord>;
    writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks>;
}
