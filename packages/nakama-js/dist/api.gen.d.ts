/** A friend of a friend. */
export interface FriendsOfFriendsListFriendOfFriend {
    referrer?: string;
    user?: ApiUser;
}
/** A single user-role pair. */
export interface GroupUserListGroupUser {
    state?: number;
    user?: ApiUser;
}
/** A single group-role pair. */
export interface UserGroupListUserGroup {
    group?: ApiGroup;
    state?: number;
}
/** Record values to write. */
export interface WriteLeaderboardRecordRequestLeaderboardRecordWrite {
    metadata?: string;
    operator?: ApiOperator;
    score?: string;
    subscore?: string;
}
/** Record values to write. */
export interface WriteTournamentRecordRequestTournamentRecordWrite {
    metadata?: string;
    operator?: ApiOperator;
    score?: string;
    subscore?: string;
}
/** A user with additional account details. Always the current user. */
export interface ApiAccount {
    custom_id?: string;
    devices?: Array<ApiAccountDevice>;
    disable_time?: string;
    email?: string;
    user?: ApiUser;
    verify_time?: string;
    wallet?: string;
}
/** Send a Apple Sign In token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountApple {
    token?: string;
    vars?: Record<string, string>;
}
/** Send a custom ID to the server. Used with authenticate/link/unlink. */
export interface ApiAccountCustom {
    id?: string;
    vars?: Record<string, string>;
}
/** Send a device to the server. Used with authenticate/link/unlink and user. */
export interface ApiAccountDevice {
    id?: string;
    vars?: Record<string, string>;
}
/** Send an email with password to the server. Used with authenticate/link/unlink. */
export interface ApiAccountEmail {
    email?: string;
    password?: string;
    vars?: Record<string, string>;
}
/** Send a Facebook token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountFacebook {
    token?: string;
    vars?: Record<string, string>;
}
/** Send a Facebook Instant Game token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountFacebookInstantGame {
    signed_player_info?: string;
    vars?: Record<string, string>;
}
/** Send Apple's Game Center account credentials to the server. Used with authenticate/link/unlink.

https://developer.apple.com/documentation/gamekit/gklocalplayer/1515407-generateidentityverificationsign */
export interface ApiAccountGameCenter {
    bundle_id?: string;
    player_id?: string;
    public_key_url?: string;
    salt?: string;
    signature?: string;
    timestamp_seconds?: string;
    vars?: Record<string, string>;
}
/** Send a Google token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountGoogle {
    token?: string;
    vars?: Record<string, string>;
}
/** Send a Steam token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountSteam {
    token?: string;
    vars?: Record<string, string>;
}
/** A message sent on a channel. */
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
/** A list of channel messages, usually a result of a list operation. */
export interface ApiChannelMessageList {
    cacheable_cursor?: string;
    messages?: Array<ApiChannelMessage>;
    next_cursor?: string;
    prev_cursor?: string;
}
/** Create a group with the current user as owner. */
export interface ApiCreateGroupRequest {
    avatar_url?: string;
    description?: string;
    lang_tag?: string;
    max_count?: number;
    name?: string;
    open?: boolean;
}
/** Storage objects to delete. */
export interface ApiDeleteStorageObjectId {
    collection?: string;
    key?: string;
    version?: string;
}
/** Batch delete storage objects. */
export interface ApiDeleteStorageObjectsRequest {
    object_ids?: Array<ApiDeleteStorageObjectId>;
}
/** Represents an event to be passed through the server to registered event handlers. */
export interface ApiEvent {
    external?: boolean;
    name?: string;
    properties?: Record<string, string>;
    timestamp?: string;
}
/** A friend of a user. */
export interface ApiFriend {
    state?: number;
    update_time?: string;
    user?: ApiUser;
}
/** A collection of zero or more friends of the user. */
export interface ApiFriendList {
    cursor?: string;
    friends?: Array<ApiFriend>;
}
/**  */
export interface ApiFriendsOfFriendsList {
    cursor?: string;
    friends_of_friends?: Array<FriendsOfFriendsListFriendOfFriend>;
}
/** A group in the server. */
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
/** One or more groups returned from a listing operation. */
export interface ApiGroupList {
    cursor?: string;
    groups?: Array<ApiGroup>;
}
/** A list of users belonging to a group, along with their role. */
export interface ApiGroupUserList {
    cursor?: string;
    group_users?: Array<GroupUserListGroupUser>;
}
/** Represents a complete leaderboard record with all scores and associated metadata. */
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
/** A set of leaderboard records, may be part of a leaderboard records page or a batch of individual records. */
export interface ApiLeaderboardRecordList {
    next_cursor?: string;
    owner_records?: Array<ApiLeaderboardRecord>;
    prev_cursor?: string;
    rank_count?: string;
    records?: Array<ApiLeaderboardRecord>;
}
/** Link Steam to the current user's account. */
export interface ApiLinkSteamRequest {
    account?: ApiAccountSteam;
    sync?: boolean;
}
/** List user subscriptions. */
export interface ApiListSubscriptionsRequest {
    cursor?: string;
    limit?: number;
}
/** Represents a realtime match. */
export interface ApiMatch {
    authoritative?: boolean;
    handler_name?: string;
    label?: string;
    match_id?: string;
    size?: number;
    tick_rate?: number;
}
/** A list of realtime matches. */
export interface ApiMatchList {
    matches?: Array<ApiMatch>;
}
/** A notification in the server. */
export interface ApiNotification {
    code?: number;
    content?: string;
    create_time?: string;
    id?: string;
    persistent?: boolean;
    sender_id?: string;
    subject?: string;
}
/** A collection of zero or more notifications. */
export interface ApiNotificationList {
    cacheable_cursor?: string;
    notifications?: Array<ApiNotification>;
}
/**
* Operator that can be used to override the one set in the leaderboard.
*/
export declare enum ApiOperator {
    NO_OVERRIDE = 0,
    BEST = 1,
    SET = 2,
    INCREMENT = 3,
    DECREMENT = 4
}
/** Storage objects to get. */
export interface ApiReadStorageObjectId {
    collection?: string;
    key?: string;
    user_id?: string;
}
/** Batch get storage objects. */
export interface ApiReadStorageObjectsRequest {
    object_ids?: Array<ApiReadStorageObjectId>;
}
/** Execute an Lua function on the server. */
export interface ApiRpc {
    http_key?: string;
    id?: string;
    payload?: string;
}
/** A user's session used to authenticate messages. */
export interface ApiSession {
    created?: boolean;
    refresh_token?: string;
    token?: string;
}
/** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
export interface ApiSessionLogoutRequest {
    refresh_token?: string;
    token?: string;
}
/** Authenticate against the server with a refresh token. */
export interface ApiSessionRefreshRequest {
    token?: string;
    vars?: Record<string, string>;
}
/** An object within the storage engine. */
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
/** A storage acknowledgement. */
export interface ApiStorageObjectAck {
    collection?: string;
    create_time?: string;
    key?: string;
    update_time?: string;
    user_id?: string;
    version?: string;
}
/** Batch of acknowledgements for the storage object write. */
export interface ApiStorageObjectAcks {
    acks?: Array<ApiStorageObjectAck>;
}
/** List of storage objects. */
export interface ApiStorageObjectList {
    cursor?: string;
    objects?: Array<ApiStorageObject>;
}
/** Batch of storage objects. */
export interface ApiStorageObjects {
    objects?: Array<ApiStorageObject>;
}
/**
* Environment where a purchase/subscription took place,
*/
export declare enum ApiStoreEnvironment {
    UNKNOWN = 0,
    SANDBOX = 1,
    PRODUCTION = 2
}
/**
* Validation Provider,
*/
export declare enum ApiStoreProvider {
    APPLE_APP_STORE = 0,
    GOOGLE_PLAY_STORE = 1,
    HUAWEI_APP_GALLERY = 2,
    FACEBOOK_INSTANT_STORE = 3
}
/** A list of validated subscriptions stored by Nakama. */
export interface ApiSubscriptionList {
    cursor?: string;
    prev_cursor?: string;
    validated_subscriptions?: Array<ApiValidatedSubscription>;
}
/** A tournament on the server. */
export interface ApiTournament {
    authoritative?: boolean;
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
    operator?: ApiOperator;
    prev_reset?: number;
    size?: number;
    sort_order?: number;
    start_active?: number;
    start_time?: string;
    title?: string;
}
/** A list of tournaments. */
export interface ApiTournamentList {
    cursor?: string;
    tournaments?: Array<ApiTournament>;
}
/** A set of tournament records which may be part of a tournament records page or a batch of individual records. */
export interface ApiTournamentRecordList {
    next_cursor?: string;
    owner_records?: Array<ApiLeaderboardRecord>;
    prev_cursor?: string;
    rank_count?: string;
    records?: Array<ApiLeaderboardRecord>;
}
/** Update a user's account details. */
export interface ApiUpdateAccountRequest {
    avatar_url?: string;
    display_name?: string;
    lang_tag?: string;
    location?: string;
    timezone?: string;
    username?: string;
}
/** Update fields in a given group. */
export interface ApiUpdateGroupRequest {
    avatar_url?: string;
    description?: string;
    group_id?: string;
    lang_tag?: string;
    name?: string;
    open?: boolean;
}
/** A user in the server. */
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
/** A list of groups belonging to a user, along with the user's role in each group. */
export interface ApiUserGroupList {
    cursor?: string;
    user_groups?: Array<UserGroupListUserGroup>;
}
/** A collection of zero or more users. */
export interface ApiUsers {
    users?: Array<ApiUser>;
}
/**  */
export interface ApiValidatePurchaseAppleRequest {
    persist?: boolean;
    receipt?: string;
}
/**  */
export interface ApiValidatePurchaseFacebookInstantRequest {
    persist?: boolean;
    signed_request?: string;
}
/**  */
export interface ApiValidatePurchaseGoogleRequest {
    persist?: boolean;
    purchase?: string;
}
/**  */
export interface ApiValidatePurchaseHuaweiRequest {
    persist?: boolean;
    purchase?: string;
    signature?: string;
}
/** Validate IAP response. */
export interface ApiValidatePurchaseResponse {
    validated_purchases?: Array<ApiValidatedPurchase>;
}
/**  */
export interface ApiValidateSubscriptionAppleRequest {
    persist?: boolean;
    receipt?: string;
}
/**  */
export interface ApiValidateSubscriptionGoogleRequest {
    persist?: boolean;
    receipt?: string;
}
/** Validate Subscription response. */
export interface ApiValidateSubscriptionResponse {
    validated_subscription?: ApiValidatedSubscription;
}
/** Validated Purchase stored by Nakama. */
export interface ApiValidatedPurchase {
    create_time?: string;
    environment?: ApiStoreEnvironment;
    product_id?: string;
    provider_response?: string;
    purchase_time?: string;
    refund_time?: string;
    seen_before?: boolean;
    store?: ApiStoreProvider;
    transaction_id?: string;
    update_time?: string;
    user_id?: string;
}
/**  */
export interface ApiValidatedSubscription {
    active?: boolean;
    create_time?: string;
    environment?: ApiStoreEnvironment;
    expiry_time?: string;
    original_transaction_id?: string;
    product_id?: string;
    provider_notification?: string;
    provider_response?: string;
    purchase_time?: string;
    refund_time?: string;
    store?: ApiStoreProvider;
    update_time?: string;
    user_id?: string;
}
/** The object to store. */
export interface ApiWriteStorageObject {
    collection?: string;
    key?: string;
    permission_read?: number;
    permission_write?: number;
    value?: string;
    version?: string;
}
/** Write objects to the storage engine. */
export interface ApiWriteStorageObjectsRequest {
    objects?: Array<ApiWriteStorageObject>;
}
export declare class NakamaApi {
    readonly serverKey: string;
    readonly basePath: string;
    readonly timeoutMs: number;
    constructor(serverKey: string, basePath: string, timeoutMs: number);
    /** A healthcheck which load balancers can use to check the service. */
    healthcheck(bearerToken: string, options?: any): Promise<any>;
    /** Delete the current user's account. */
    deleteAccount(bearerToken: string, options?: any): Promise<any>;
    /** Fetch the current user's account. */
    getAccount(bearerToken: string, options?: any): Promise<ApiAccount>;
    /** Update fields in the current user's account. */
    updateAccount(bearerToken: string, body: ApiUpdateAccountRequest, options?: any): Promise<any>;
    /** Authenticate a user with an Apple ID against the server. */
    authenticateApple(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountApple, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with a custom id against the server. */
    authenticateCustom(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountCustom, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with a device id against the server. */
    authenticateDevice(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountDevice, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with an email+password against the server. */
    authenticateEmail(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountEmail, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with a Facebook OAuth token against the server. */
    authenticateFacebook(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountFacebook, create?: boolean, username?: string, sync?: boolean, options?: any): Promise<ApiSession>;
    /** Authenticate a user with a Facebook Instant Game token against the server. */
    authenticateFacebookInstantGame(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountFacebookInstantGame, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with Apple's GameCenter against the server. */
    authenticateGameCenter(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountGameCenter, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with Google against the server. */
    authenticateGoogle(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountGoogle, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with Steam against the server. */
    authenticateSteam(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountSteam, create?: boolean, username?: string, sync?: boolean, options?: any): Promise<ApiSession>;
    /** Add an Apple ID to the social profiles on the current user's account. */
    linkApple(bearerToken: string, body: ApiAccountApple, options?: any): Promise<any>;
    /** Add a custom ID to the social profiles on the current user's account. */
    linkCustom(bearerToken: string, body: ApiAccountCustom, options?: any): Promise<any>;
    /** Add a device ID to the social profiles on the current user's account. */
    linkDevice(bearerToken: string, body: ApiAccountDevice, options?: any): Promise<any>;
    /** Add an email+password to the social profiles on the current user's account. */
    linkEmail(bearerToken: string, body: ApiAccountEmail, options?: any): Promise<any>;
    /** Add Facebook to the social profiles on the current user's account. */
    linkFacebook(bearerToken: string, account: ApiAccountFacebook, sync?: boolean, options?: any): Promise<any>;
    /** Add Facebook Instant Game to the social profiles on the current user's account. */
    linkFacebookInstantGame(bearerToken: string, body: ApiAccountFacebookInstantGame, options?: any): Promise<any>;
    /** Add Apple's GameCenter to the social profiles on the current user's account. */
    linkGameCenter(bearerToken: string, body: ApiAccountGameCenter, options?: any): Promise<any>;
    /** Add Google to the social profiles on the current user's account. */
    linkGoogle(bearerToken: string, body: ApiAccountGoogle, options?: any): Promise<any>;
    /** Add Steam to the social profiles on the current user's account. */
    linkSteam(bearerToken: string, body: ApiLinkSteamRequest, options?: any): Promise<any>;
    /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
    sessionRefresh(basicAuthUsername: string, basicAuthPassword: string, body: ApiSessionRefreshRequest, options?: any): Promise<ApiSession>;
    /** Remove the Apple ID from the social profiles on the current user's account. */
    unlinkApple(bearerToken: string, body: ApiAccountApple, options?: any): Promise<any>;
    /** Remove the custom ID from the social profiles on the current user's account. */
    unlinkCustom(bearerToken: string, body: ApiAccountCustom, options?: any): Promise<any>;
    /** Remove the device ID from the social profiles on the current user's account. */
    unlinkDevice(bearerToken: string, body: ApiAccountDevice, options?: any): Promise<any>;
    /** Remove the email+password from the social profiles on the current user's account. */
    unlinkEmail(bearerToken: string, body: ApiAccountEmail, options?: any): Promise<any>;
    /** Remove Facebook from the social profiles on the current user's account. */
    unlinkFacebook(bearerToken: string, body: ApiAccountFacebook, options?: any): Promise<any>;
    /** Remove Facebook Instant Game profile from the social profiles on the current user's account. */
    unlinkFacebookInstantGame(bearerToken: string, body: ApiAccountFacebookInstantGame, options?: any): Promise<any>;
    /** Remove Apple's GameCenter from the social profiles on the current user's account. */
    unlinkGameCenter(bearerToken: string, body: ApiAccountGameCenter, options?: any): Promise<any>;
    /** Remove Google from the social profiles on the current user's account. */
    unlinkGoogle(bearerToken: string, body: ApiAccountGoogle, options?: any): Promise<any>;
    /** Remove Steam from the social profiles on the current user's account. */
    unlinkSteam(bearerToken: string, body: ApiAccountSteam, options?: any): Promise<any>;
    /** List a channel's message history. */
    listChannelMessages(bearerToken: string, channelId: string, limit?: number, forward?: boolean, cursor?: string, options?: any): Promise<ApiChannelMessageList>;
    /** Submit an event for processing in the server's registered runtime custom events handler. */
    event(bearerToken: string, body: ApiEvent, options?: any): Promise<any>;
    /** Delete one or more users by ID or username. */
    deleteFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    /** List all friends for the current user. */
    listFriends(bearerToken: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiFriendList>;
    /** Add friends by ID or username to a user's account. */
    addFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    /** Block one or more users by ID or username. */
    blockFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    /** Import Facebook friends and add them to a user's account. */
    importFacebookFriends(bearerToken: string, account: ApiAccountFacebook, reset?: boolean, options?: any): Promise<any>;
    /** List friends of friends for the current user. */
    listFriendsOfFriends(bearerToken: string, limit?: number, cursor?: string, options?: any): Promise<ApiFriendsOfFriendsList>;
    /** Import Steam friends and add them to a user's account. */
    importSteamFriends(bearerToken: string, account: ApiAccountSteam, reset?: boolean, options?: any): Promise<any>;
    /** List groups based on given filters. */
    listGroups(bearerToken: string, name?: string, cursor?: string, limit?: number, langTag?: string, members?: number, open?: boolean, options?: any): Promise<ApiGroupList>;
    /** Create a new group with the current user as the owner. */
    createGroup(bearerToken: string, body: ApiCreateGroupRequest, options?: any): Promise<ApiGroup>;
    /** Delete a group by ID. */
    deleteGroup(bearerToken: string, groupId: string, options?: any): Promise<any>;
    /** Update fields in a given group. */
    updateGroup(bearerToken: string, groupId: string, body: ApiUpdateGroupRequest, options?: any): Promise<any>;
    /** Add users to a group. */
    addGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** Ban a set of users from a group. */
    banGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** Demote a set of users in a group to the next role down. */
    demoteGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** Immediately join an open group, or request to join a closed one. */
    joinGroup(bearerToken: string, groupId: string, options?: any): Promise<any>;
    /** Kick a set of users from a group. */
    kickGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** Leave a group the user is a member of. */
    leaveGroup(bearerToken: string, groupId: string, options?: any): Promise<any>;
    /** Promote a set of users in a group to the next role up. */
    promoteGroupUsers(bearerToken: string, groupId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** List all users that are part of a group. */
    listGroupUsers(bearerToken: string, groupId: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiGroupUserList>;
    /** Validate Apple IAP Receipt */
    validatePurchaseApple(bearerToken: string, body: ApiValidatePurchaseAppleRequest, options?: any): Promise<ApiValidatePurchaseResponse>;
    /** Validate FB Instant IAP Receipt */
    validatePurchaseFacebookInstant(bearerToken: string, body: ApiValidatePurchaseFacebookInstantRequest, options?: any): Promise<ApiValidatePurchaseResponse>;
    /** Validate Google IAP Receipt */
    validatePurchaseGoogle(bearerToken: string, body: ApiValidatePurchaseGoogleRequest, options?: any): Promise<ApiValidatePurchaseResponse>;
    /** Validate Huawei IAP Receipt */
    validatePurchaseHuawei(bearerToken: string, body: ApiValidatePurchaseHuaweiRequest, options?: any): Promise<ApiValidatePurchaseResponse>;
    /** List user's subscriptions. */
    listSubscriptions(bearerToken: string, body: ApiListSubscriptionsRequest, options?: any): Promise<ApiSubscriptionList>;
    /** Validate Apple Subscription Receipt */
    validateSubscriptionApple(bearerToken: string, body: ApiValidateSubscriptionAppleRequest, options?: any): Promise<ApiValidateSubscriptionResponse>;
    /** Validate Google Subscription Receipt */
    validateSubscriptionGoogle(bearerToken: string, body: ApiValidateSubscriptionGoogleRequest, options?: any): Promise<ApiValidateSubscriptionResponse>;
    /** Get subscription by product id. */
    getSubscription(bearerToken: string, productId: string, options?: any): Promise<ApiValidatedSubscription>;
    /** Delete a leaderboard record. */
    deleteLeaderboardRecord(bearerToken: string, leaderboardId: string, options?: any): Promise<any>;
    /** List leaderboard records. */
    listLeaderboardRecords(bearerToken: string, leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string, options?: any): Promise<ApiLeaderboardRecordList>;
    /** Write a record to a leaderboard. */
    writeLeaderboardRecord(bearerToken: string, leaderboardId: string, record: WriteLeaderboardRecordRequestLeaderboardRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    /** List leaderboard records that belong to a user. */
    listLeaderboardRecordsAroundOwner(bearerToken: string, leaderboardId: string, ownerId: string, limit?: number, expiry?: string, cursor?: string, options?: any): Promise<ApiLeaderboardRecordList>;
    /** Fetch list of running matches. */
    listMatches(bearerToken: string, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number, query?: string, options?: any): Promise<ApiMatchList>;
    /** Delete one or more notifications for the current user. */
    deleteNotifications(bearerToken: string, ids?: Array<string>, options?: any): Promise<any>;
    /** Fetch list of notifications. */
    listNotifications(bearerToken: string, limit?: number, cacheableCursor?: string, options?: any): Promise<ApiNotificationList>;
    /** Execute a Lua function on the server. */
    rpcFunc2(bearerToken: string, id: string, payload?: string, httpKey?: string, options?: any): Promise<ApiRpc>;
    /** Execute a Lua function on the server. */
    rpcFunc(bearerToken: string, id: string, body: string, httpKey?: string, options?: any): Promise<ApiRpc>;
    /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
    sessionLogout(bearerToken: string, body: ApiSessionLogoutRequest, options?: any): Promise<any>;
    /** Get storage objects. */
    readStorageObjects(bearerToken: string, body: ApiReadStorageObjectsRequest, options?: any): Promise<ApiStorageObjects>;
    /** Write objects into the storage engine. */
    writeStorageObjects(bearerToken: string, body: ApiWriteStorageObjectsRequest, options?: any): Promise<ApiStorageObjectAcks>;
    /** Delete one or more objects by ID or username. */
    deleteStorageObjects(bearerToken: string, body: ApiDeleteStorageObjectsRequest, options?: any): Promise<any>;
    /** List publicly readable storage objects in a given collection. */
    listStorageObjects(bearerToken: string, collection: string, userId?: string, limit?: number, cursor?: string, options?: any): Promise<ApiStorageObjectList>;
    /** List publicly readable storage objects in a given collection. */
    listStorageObjects2(bearerToken: string, collection: string, userId: string, limit?: number, cursor?: string, options?: any): Promise<ApiStorageObjectList>;
    /** List current or upcoming tournaments. */
    listTournaments(bearerToken: string, categoryStart?: number, categoryEnd?: number, startTime?: number, endTime?: number, limit?: number, cursor?: string, options?: any): Promise<ApiTournamentList>;
    /** Delete a tournament record. */
    deleteTournamentRecord(bearerToken: string, tournamentId: string, options?: any): Promise<any>;
    /** List tournament records. */
    listTournamentRecords(bearerToken: string, tournamentId: string, ownerIds?: Array<string>, limit?: number, cursor?: string, expiry?: string, options?: any): Promise<ApiTournamentRecordList>;
    /** Write a record to a tournament. */
    writeTournamentRecord2(bearerToken: string, tournamentId: string, record: WriteTournamentRecordRequestTournamentRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    /** Write a record to a tournament. */
    writeTournamentRecord(bearerToken: string, tournamentId: string, record: WriteTournamentRecordRequestTournamentRecordWrite, options?: any): Promise<ApiLeaderboardRecord>;
    /** Attempt to join an open and running tournament. */
    joinTournament(bearerToken: string, tournamentId: string, options?: any): Promise<any>;
    /** List tournament records for a given owner. */
    listTournamentRecordsAroundOwner(bearerToken: string, tournamentId: string, ownerId: string, limit?: number, expiry?: string, cursor?: string, options?: any): Promise<ApiTournamentRecordList>;
    /** Fetch zero or more users by ID and/or username. */
    getUsers(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>, options?: any): Promise<ApiUsers>;
    /** List groups the current user belongs to. */
    listUserGroups(bearerToken: string, userId: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiUserGroupList>;
    buildFullUrl(basePath: string, fragment: string, queryParams: Map<string, any>): string;
}
