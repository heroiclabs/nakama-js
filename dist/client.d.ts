import { ApiAccount, ApiAccountCustom, ApiAccountDevice, ApiAccountEmail, ApiAccountFacebook, ApiAccountGoogle, ApiFriends, ApiUpdateAccountRequest, ApiUsers } from "./api.gen";
import { Session } from "./session";
import { Socket } from "./socket";
export interface RpcResponse {
    id?: string;
    payload?: object;
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
    getAccount(session: Session): Promise<ApiAccount>;
    importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<ApiUsers>;
    linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    listFriends(session: Session): Promise<ApiFriends>;
    listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<ApiUsers>;
    rpc(session: Session, id: string, input: object): Promise<RpcResponse>;
    rpcGet(id: string, session?: Session, httpKey?: string): Promise<RpcResponse>;
    unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean>;
}
