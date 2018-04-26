import { ApiAccount, ApiAccountCustom, ApiAccountDevice, ApiAccountEmail, ApiAccountFacebook, ApiAccountGoogle, ApiDeleteStorageObjectsRequest, ApiFriends, ApiMatchList, ApiReadStorageObjectsRequest, ApiStorageObjectAcks, ApiUpdateAccountRequest, ApiUsers } from "./api.gen";
import { Session } from "./session";
import { Socket } from "./socket";
export interface RpcResponse {
    id?: string;
    payload?: object;
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
    authenticateCustom(request: ApiAccountCustom): Promise<Session>;
    authenticateDevice(request: ApiAccountDevice): Promise<Session>;
    authenticateEmail(request: ApiAccountEmail): Promise<Session>;
    authenticateFacebook(request: ApiAccountFacebook): Promise<Session>;
    authenticateGoogle(request: ApiAccountGoogle): Promise<Session>;
    createSocket(useSSL?: boolean, verbose?: boolean): Socket;
    deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean>;
    getAccount(session: Session): Promise<ApiAccount>;
    importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<ApiUsers>;
    listChannelMessages(session: Session, channelId?: string, limit?: number, forward?: boolean, cursor?: string): Promise<ChannelMessageList>;
    linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    listFriends(session: Session): Promise<ApiFriends>;
    listMatches(session: Session, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number): Promise<ApiMatchList>;
    listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<ApiUsers>;
    listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList>;
    readStorageObjects(session: Session, request: ApiReadStorageObjectsRequest): Promise<StorageObjects>;
    rpc(session: Session, id: string, input: object): Promise<RpcResponse>;
    rpcGet(id: string, session?: Session, httpKey?: string, input?: object): Promise<RpcResponse>;
    unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean>;
    writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks>;
}
