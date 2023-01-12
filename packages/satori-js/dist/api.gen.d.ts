/** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
export interface ApiAuthenticateLogoutRequest {
    refresh_token?: string;
    token?: string;
}
/** Authenticate against the server with a refresh token. */
export interface ApiAuthenticateRefreshRequest {
    refresh_token?: string;
}
/**  */
export interface ApiAuthenticateRequest {
    id?: string;
}
/** A single event. Usually, but not necessarily, part of a batch. */
export interface ApiEvent {
    id?: string;
    metadata?: Record<string, string>;
    name?: string;
    timestamp?: string;
    value?: string;
}
/**  */
export interface ApiEventRequest {
    events?: Array<ApiEvent>;
}
/** An experiment that this user is partaking. */
export interface ApiExperiment {
    name?: string;
    value?: string;
}
/** All experiments that this identity is involved with. */
export interface ApiExperimentList {
    experiments?: Array<ApiExperiment>;
}
/** Feature flag available to the identity. */
export interface ApiFlag {
    condition_changed?: boolean;
    name?: string;
    value?: string;
}
/**  */
export interface ApiFlagList {
    flags?: Array<ApiFlag>;
}
/** Enrich/replace the current session with a new ID. */
export interface ApiIdentifyRequest {
    custom?: Record<string, string>;
    default?: Record<string, string>;
    id?: string;
}
/** A single live event. */
export interface ApiLiveEvent {
    active_end_time_sec?: string;
    active_start_time_sec?: string;
    description?: string;
    name?: string;
    value?: string;
}
/** List of Live events. */
export interface ApiLiveEventList {
    live_events?: Array<ApiLiveEvent>;
}
/** Properties associated with an identity. */
export interface ApiProperties {
    computed?: Record<string, string>;
    custom?: Record<string, string>;
    default?: Record<string, string>;
}
/** A session. */
export interface ApiSession {
    properties?: ApiProperties;
    refresh_token?: string;
    token?: string;
}
/** Update Properties associated with this identity. */
export interface ApiUpdatePropertiesRequest {
    custom?: Record<string, string>;
    default?: Record<string, string>;
}
/**  */
export interface ProtobufAny {
    type?: string;
}
/**  */
export interface RpcStatus {
    code?: number;
    details?: Array<ProtobufAny>;
    message?: string;
}
export declare class SatoriApi {
    readonly serverKey: string;
    readonly basePath: string;
    readonly timeoutMs: number;
    constructor(serverKey: string, basePath: string, timeoutMs: number);
    /** A healthcheck which load balancers can use to check the service. */
    satoriHealthcheck(bearerToken: string, options?: any): Promise<any>;
    /** A readycheck which load balancers can use to check the service. */
    satoriReadycheck(bearerToken: string, options?: any): Promise<any>;
    /** Authenticate against the server. */
    satoriAuthenticate(basicAuthUsername: string, basicAuthPassword: string, body: ApiAuthenticateRequest, options?: any): Promise<ApiSession>;
    /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
    satoriAuthenticateLogout(bearerToken: string, body: ApiAuthenticateLogoutRequest, options?: any): Promise<any>;
    /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
    satoriAuthenticateRefresh(basicAuthUsername: string, basicAuthPassword: string, body: ApiAuthenticateRefreshRequest, options?: any): Promise<ApiSession>;
    /** Publish an event for this session. */
    satoriEvent(bearerToken: string, body: ApiEventRequest, options?: any): Promise<any>;
    /** Get or list all available experiments for this identity. */
    satoriGetExperiments(bearerToken: string, names?: Array<string>, options?: any): Promise<ApiExperimentList>;
    /** List all available flags for this identity. */
    satoriGetFlags(bearerToken: string, names?: Array<string>, options?: any): Promise<ApiFlagList>;
    /** Enrich/replace the current session with new identifier. */
    satoriIdentify(bearerToken: string, body: ApiIdentifyRequest, options?: any): Promise<ApiSession>;
    /** List available live events. */
    satoriGetLiveEvents(bearerToken: string, names?: Array<string>, options?: any): Promise<ApiLiveEventList>;
    /** List properties associated with this identity. */
    satoriListProperties(bearerToken: string, options?: any): Promise<ApiProperties>;
    /** Update identity properties. */
    satoriUpdateProperties(bearerToken: string, body: ApiUpdatePropertiesRequest, options?: any): Promise<any>;
    buildFullUrl(basePath: string, fragment: string, queryParams: Map<string, any>): string;
}
