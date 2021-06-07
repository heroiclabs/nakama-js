import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "nakama.api";
export declare enum OverrideOperator {
    NO_OVERRIDE = 0,
    BEST = 1,
    SET = 2,
    INCREMENT = 3,
    DECREMENT = 4,
    UNRECOGNIZED = -1
}
export declare function overrideOperatorFromJSON(object: any): OverrideOperator;
export declare function overrideOperatorToJSON(object: OverrideOperator): string;
export interface Account {
    user?: User;
    wallet: string;
    email: string;
    devices: AccountDevice[];
    custom_id: string;
    verify_time?: Date;
    disable_time?: Date;
}
export interface AccountRefresh {
    token: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountRefresh_VarsEntry {
    key: string;
    value: string;
}
export interface AccountApple {
    token: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountApple_VarsEntry {
    key: string;
    value: string;
}
export interface AccountCustom {
    id: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountCustom_VarsEntry {
    key: string;
    value: string;
}
export interface AccountDevice {
    id: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountDevice_VarsEntry {
    key: string;
    value: string;
}
export interface AccountEmail {
    email: string;
    password: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountEmail_VarsEntry {
    key: string;
    value: string;
}
export interface AccountFacebook {
    token: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountFacebook_VarsEntry {
    key: string;
    value: string;
}
export interface AccountFacebookInstantGame {
    signed_player_info: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountFacebookInstantGame_VarsEntry {
    key: string;
    value: string;
}
export interface AccountGameCenter {
    player_id: string;
    bundle_id: string;
    timestamp_seconds: number;
    salt: string;
    signature: string;
    public_key_url: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountGameCenter_VarsEntry {
    key: string;
    value: string;
}
export interface AccountGoogle {
    token: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountGoogle_VarsEntry {
    key: string;
    value: string;
}
export interface AccountSteam {
    token: string;
    vars: {
        [key: string]: string;
    };
}
export interface AccountSteam_VarsEntry {
    key: string;
    value: string;
}
export interface AddFriendsRequest {
    ids: string[];
    usernames: string[];
}
export interface AddGroupUsersRequest {
    group_id: string;
    user_ids: string[];
}
export interface SessionRefreshRequest {
    token: string;
    vars: {
        [key: string]: string;
    };
}
export interface SessionRefreshRequest_VarsEntry {
    key: string;
    value: string;
}
export interface SessionLogoutRequest {
    token: string;
    refresh_token: string;
}
export interface AuthenticateAppleRequest {
    account?: AccountApple;
    create?: boolean;
    username: string;
}
export interface AuthenticateCustomRequest {
    account?: AccountCustom;
    create?: boolean;
    username: string;
}
export interface AuthenticateDeviceRequest {
    account?: AccountDevice;
    create?: boolean;
    username: string;
}
export interface AuthenticateEmailRequest {
    account?: AccountEmail;
    create?: boolean;
    username: string;
}
export interface AuthenticateFacebookRequest {
    account?: AccountFacebook;
    create?: boolean;
    username: string;
    sync?: boolean;
}
export interface AuthenticateFacebookInstantGameRequest {
    account?: AccountFacebookInstantGame;
    create?: boolean;
    username: string;
}
export interface AuthenticateGameCenterRequest {
    account?: AccountGameCenter;
    create?: boolean;
    username: string;
}
export interface AuthenticateGoogleRequest {
    account?: AccountGoogle;
    create?: boolean;
    username: string;
}
export interface AuthenticateSteamRequest {
    account?: AccountSteam;
    create?: boolean;
    username: string;
    sync?: boolean;
}
export interface BanGroupUsersRequest {
    group_id: string;
    user_ids: string[];
}
export interface BlockFriendsRequest {
    ids: string[];
    usernames: string[];
}
export interface ChannelMessage {
    channel_id: string;
    message_id: string;
    code?: number;
    sender_id: string;
    username: string;
    content: string;
    create_time?: Date;
    update_time?: Date;
    persistent?: boolean;
    room_name: string;
    group_id: string;
    user_id_one: string;
    user_id_two: string;
}
export interface ChannelMessageList {
    messages: ChannelMessage[];
    next_cursor: string;
    prev_cursor: string;
    cacheable_cursor: string;
}
export interface CreateGroupRequest {
    name: string;
    description: string;
    lang_tag: string;
    avatar_url: string;
    open: boolean;
    max_count: number;
}
export interface DeleteFriendsRequest {
    ids: string[];
    usernames: string[];
}
export interface DeleteGroupRequest {
    group_id: string;
}
export interface DeleteLeaderboardRecordRequest {
    leaderboard_id: string;
}
export interface DeleteNotificationsRequest {
    ids: string[];
}
export interface DeleteStorageObjectId {
    collection: string;
    key: string;
    version: string;
}
export interface DeleteStorageObjectsRequest {
    object_ids: DeleteStorageObjectId[];
}
export interface Event {
    name: string;
    properties: {
        [key: string]: string;
    };
    timestamp?: Date;
    external: boolean;
}
export interface Event_PropertiesEntry {
    key: string;
    value: string;
}
export interface Friend {
    user?: User;
    state?: number;
    update_time?: Date;
}
export declare enum Friend_State {
    FRIEND = 0,
    INVITE_SENT = 1,
    INVITE_RECEIVED = 2,
    BLOCKED = 3,
    UNRECOGNIZED = -1
}
export declare function friend_StateFromJSON(object: any): Friend_State;
export declare function friend_StateToJSON(object: Friend_State): string;
export interface FriendList {
    friends: Friend[];
    cursor: string;
}
export interface GetUsersRequest {
    ids: string[];
    usernames: string[];
    facebook_ids: string[];
}
export interface Group {
    id: string;
    creator_id: string;
    name: string;
    description: string;
    lang_tag: string;
    metadata: string;
    avatar_url: string;
    open?: boolean;
    edge_count: number;
    max_count: number;
    create_time?: Date;
    update_time?: Date;
}
export interface GroupList {
    groups: Group[];
    cursor: string;
}
export interface GroupUserList {
    group_users: GroupUserList_GroupUser[];
    cursor: string;
}
export interface GroupUserList_GroupUser {
    user?: User;
    state?: number;
}
export declare enum GroupUserList_GroupUser_State {
    SUPERADMIN = 0,
    ADMIN = 1,
    MEMBER = 2,
    JOIN_REQUEST = 3,
    UNRECOGNIZED = -1
}
export declare function groupUserList_GroupUser_StateFromJSON(object: any): GroupUserList_GroupUser_State;
export declare function groupUserList_GroupUser_StateToJSON(object: GroupUserList_GroupUser_State): string;
export interface ImportFacebookFriendsRequest {
    account?: AccountFacebook;
    reset?: boolean;
}
export interface ImportSteamFriendsRequest {
    account?: AccountSteam;
    reset?: boolean;
}
export interface JoinGroupRequest {
    group_id: string;
}
export interface JoinTournamentRequest {
    tournament_id: string;
}
export interface KickGroupUsersRequest {
    group_id: string;
    user_ids: string[];
}
export interface LeaderboardRecord {
    leaderboard_id: string;
    owner_id: string;
    username?: string;
    score: number;
    subscore: number;
    num_score: number;
    metadata: string;
    create_time?: Date;
    update_time?: Date;
    expiry_time?: Date;
    rank: number;
    max_num_score: number;
}
export interface LeaderboardRecordList {
    records: LeaderboardRecord[];
    owner_records: LeaderboardRecord[];
    next_cursor: string;
    prev_cursor: string;
}
export interface LeaveGroupRequest {
    group_id: string;
}
export interface LinkFacebookRequest {
    account?: AccountFacebook;
    sync?: boolean;
}
export interface LinkSteamRequest {
    account?: AccountSteam;
    sync?: boolean;
}
export interface ListChannelMessagesRequest {
    channel_id: string;
    limit?: number;
    forward?: boolean;
    cursor: string;
}
export interface ListFriendsRequest {
    limit?: number;
    state?: number;
    cursor: string;
}
export interface ListGroupsRequest {
    name: string;
    cursor: string;
    limit?: number;
}
export interface ListGroupUsersRequest {
    group_id: string;
    limit?: number;
    state?: number;
    cursor: string;
}
export interface ListLeaderboardRecordsAroundOwnerRequest {
    leaderboard_id: string;
    limit?: number;
    owner_id: string;
    expiry?: number;
}
export interface ListLeaderboardRecordsRequest {
    leaderboard_id: string;
    owner_ids: string[];
    limit?: number;
    cursor: string;
    expiry?: number;
}
export interface ListMatchesRequest {
    limit?: number;
    authoritative?: boolean;
    label?: string;
    min_size?: number;
    max_size?: number;
    query?: string;
}
export interface ListNotificationsRequest {
    limit?: number;
    cacheable_cursor: string;
}
export interface ListStorageObjectsRequest {
    user_id: string;
    collection: string;
    limit?: number;
    cursor: string;
}
export interface ListTournamentRecordsAroundOwnerRequest {
    tournament_id: string;
    limit?: number;
    owner_id: string;
    expiry?: number;
}
export interface ListTournamentRecordsRequest {
    tournament_id: string;
    owner_ids: string[];
    limit?: number;
    cursor: string;
    expiry?: number;
}
export interface ListTournamentsRequest {
    category_start?: number;
    category_end?: number;
    start_time?: number;
    end_time?: number;
    limit?: number;
    cursor: string;
}
export interface ListUserGroupsRequest {
    user_id: string;
    limit?: number;
    state?: number;
    cursor: string;
}
export interface Match {
    match_id: string;
    authoritative: boolean;
    label?: string;
    size: number;
    tick_rate: number;
    handler_name: string;
}
export interface MatchList {
    matches: Match[];
}
export interface Notification {
    id: string;
    subject: string;
    content: string;
    code: number;
    sender_id: string;
    create_time?: Date;
    persistent: boolean;
}
export interface NotificationList {
    notifications: Notification[];
    cacheable_cursor: string;
}
export interface PromoteGroupUsersRequest {
    group_id: string;
    user_ids: string[];
}
export interface DemoteGroupUsersRequest {
    group_id: string;
    user_ids: string[];
}
export interface ReadStorageObjectId {
    collection: string;
    key: string;
    user_id: string;
}
export interface ReadStorageObjectsRequest {
    object_ids: ReadStorageObjectId[];
}
export interface Rpc {
    id: string;
    payload: string;
    http_key: string;
}
export interface Session {
    created: boolean;
    token: string;
    refresh_token: string;
}
export interface StorageObject {
    collection: string;
    key: string;
    user_id: string;
    value: string;
    version: string;
    permission_read: number;
    permission_write: number;
    create_time?: Date;
    update_time?: Date;
}
export interface StorageObjectAck {
    collection: string;
    key: string;
    version: string;
    user_id: string;
}
export interface StorageObjectAcks {
    acks: StorageObjectAck[];
}
export interface StorageObjects {
    objects: StorageObject[];
}
export interface StorageObjectList {
    objects: StorageObject[];
    cursor: string;
}
export interface Tournament {
    id: string;
    title: string;
    description: string;
    category: number;
    sort_order: number;
    size: number;
    max_size: number;
    max_num_score: number;
    can_enter: boolean;
    end_active: number;
    next_reset: number;
    metadata: string;
    create_time?: Date;
    start_time?: Date;
    end_time?: Date;
    duration: number;
    start_active: number;
}
export interface TournamentList {
    tournaments: Tournament[];
    cursor: string;
}
export interface TournamentRecordList {
    records: LeaderboardRecord[];
    owner_records: LeaderboardRecord[];
    next_cursor: string;
    prev_cursor: string;
}
export interface UpdateAccountRequest {
    username?: string;
    display_name?: string;
    avatar_url?: string;
    lang_tag?: string;
    location?: string;
    timezone?: string;
}
export interface UpdateGroupRequest {
    group_id: string;
    name?: string;
    description?: string;
    lang_tag?: string;
    avatar_url?: string;
    open?: boolean;
}
export interface User {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string;
    lang_tag: string;
    location: string;
    timezone: string;
    metadata: string;
    facebook_id: string;
    google_id: string;
    gamecenter_id: string;
    steam_id: string;
    online: boolean;
    edge_count: number;
    create_time?: Date;
    update_time?: Date;
    facebook_instant_game_id: string;
    apple_id: string;
}
export interface UserGroupList {
    user_groups: UserGroupList_UserGroup[];
    cursor: string;
}
export interface UserGroupList_UserGroup {
    group?: Group;
    state?: number;
}
export declare enum UserGroupList_UserGroup_State {
    SUPERADMIN = 0,
    ADMIN = 1,
    MEMBER = 2,
    JOIN_REQUEST = 3,
    UNRECOGNIZED = -1
}
export declare function userGroupList_UserGroup_StateFromJSON(object: any): UserGroupList_UserGroup_State;
export declare function userGroupList_UserGroup_StateToJSON(object: UserGroupList_UserGroup_State): string;
export interface Users {
    users: User[];
}
export interface ValidatePurchaseAppleRequest {
    receipt: string;
}
export interface ValidatePurchaseGoogleRequest {
    purchase: string;
}
export interface ValidatePurchaseHuaweiRequest {
    purchase: string;
    signature: string;
}
export interface ValidatedPurchase {
    product_id: string;
    transaction_id: string;
    store: ValidatedPurchase_Store;
    purchase_time?: Date;
    create_time?: Date;
    update_time?: Date;
    provider_response: string;
    environment: ValidatedPurchase_Environment;
}
export declare enum ValidatedPurchase_Store {
    APPLE_APP_STORE = 0,
    GOOGLE_PLAY_STORE = 1,
    HUAWEI_APP_GALLERY = 2,
    UNRECOGNIZED = -1
}
export declare function validatedPurchase_StoreFromJSON(object: any): ValidatedPurchase_Store;
export declare function validatedPurchase_StoreToJSON(object: ValidatedPurchase_Store): string;
export declare enum ValidatedPurchase_Environment {
    UNKNOWN = 0,
    SANDBOX = 1,
    PRODUCTION = 2,
    UNRECOGNIZED = -1
}
export declare function validatedPurchase_EnvironmentFromJSON(object: any): ValidatedPurchase_Environment;
export declare function validatedPurchase_EnvironmentToJSON(object: ValidatedPurchase_Environment): string;
export interface ValidatePurchaseResponse {
    validated_purchases: ValidatedPurchase[];
}
export interface PurchaseList {
    validated_purchases: ValidatedPurchase[];
    cursor: string;
}
export interface WriteLeaderboardRecordRequest {
    leaderboard_id: string;
    record?: WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
}
export interface WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    score: number;
    subscore: number;
    metadata: string;
    operator: OverrideOperator;
}
export interface WriteStorageObject {
    collection: string;
    key: string;
    value: string;
    version: string;
    permission_read?: number;
    permission_write?: number;
}
export interface WriteStorageObjectsRequest {
    objects: WriteStorageObject[];
}
export interface WriteTournamentRecordRequest {
    tournament_id: string;
    record?: WriteTournamentRecordRequest_TournamentRecordWrite;
}
export interface WriteTournamentRecordRequest_TournamentRecordWrite {
    score: number;
    subscore: number;
    metadata: string;
    operator: OverrideOperator;
}
export declare const Account: {
    encode(message: Account, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Account;
    fromJSON(object: any): Account;
    toJSON(message: Account): unknown;
    fromPartial(object: DeepPartial<Account>): Account;
};
export declare const AccountRefresh: {
    encode(message: AccountRefresh, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountRefresh;
    fromJSON(object: any): AccountRefresh;
    toJSON(message: AccountRefresh): unknown;
    fromPartial(object: DeepPartial<AccountRefresh>): AccountRefresh;
};
export declare const AccountRefresh_VarsEntry: {
    encode(message: AccountRefresh_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountRefresh_VarsEntry;
    fromJSON(object: any): AccountRefresh_VarsEntry;
    toJSON(message: AccountRefresh_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountRefresh_VarsEntry>): AccountRefresh_VarsEntry;
};
export declare const AccountApple: {
    encode(message: AccountApple, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountApple;
    fromJSON(object: any): AccountApple;
    toJSON(message: AccountApple): unknown;
    fromPartial(object: DeepPartial<AccountApple>): AccountApple;
};
export declare const AccountApple_VarsEntry: {
    encode(message: AccountApple_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountApple_VarsEntry;
    fromJSON(object: any): AccountApple_VarsEntry;
    toJSON(message: AccountApple_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountApple_VarsEntry>): AccountApple_VarsEntry;
};
export declare const AccountCustom: {
    encode(message: AccountCustom, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountCustom;
    fromJSON(object: any): AccountCustom;
    toJSON(message: AccountCustom): unknown;
    fromPartial(object: DeepPartial<AccountCustom>): AccountCustom;
};
export declare const AccountCustom_VarsEntry: {
    encode(message: AccountCustom_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountCustom_VarsEntry;
    fromJSON(object: any): AccountCustom_VarsEntry;
    toJSON(message: AccountCustom_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountCustom_VarsEntry>): AccountCustom_VarsEntry;
};
export declare const AccountDevice: {
    encode(message: AccountDevice, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountDevice;
    fromJSON(object: any): AccountDevice;
    toJSON(message: AccountDevice): unknown;
    fromPartial(object: DeepPartial<AccountDevice>): AccountDevice;
};
export declare const AccountDevice_VarsEntry: {
    encode(message: AccountDevice_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountDevice_VarsEntry;
    fromJSON(object: any): AccountDevice_VarsEntry;
    toJSON(message: AccountDevice_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountDevice_VarsEntry>): AccountDevice_VarsEntry;
};
export declare const AccountEmail: {
    encode(message: AccountEmail, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountEmail;
    fromJSON(object: any): AccountEmail;
    toJSON(message: AccountEmail): unknown;
    fromPartial(object: DeepPartial<AccountEmail>): AccountEmail;
};
export declare const AccountEmail_VarsEntry: {
    encode(message: AccountEmail_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountEmail_VarsEntry;
    fromJSON(object: any): AccountEmail_VarsEntry;
    toJSON(message: AccountEmail_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountEmail_VarsEntry>): AccountEmail_VarsEntry;
};
export declare const AccountFacebook: {
    encode(message: AccountFacebook, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountFacebook;
    fromJSON(object: any): AccountFacebook;
    toJSON(message: AccountFacebook): unknown;
    fromPartial(object: DeepPartial<AccountFacebook>): AccountFacebook;
};
export declare const AccountFacebook_VarsEntry: {
    encode(message: AccountFacebook_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountFacebook_VarsEntry;
    fromJSON(object: any): AccountFacebook_VarsEntry;
    toJSON(message: AccountFacebook_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountFacebook_VarsEntry>): AccountFacebook_VarsEntry;
};
export declare const AccountFacebookInstantGame: {
    encode(message: AccountFacebookInstantGame, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountFacebookInstantGame;
    fromJSON(object: any): AccountFacebookInstantGame;
    toJSON(message: AccountFacebookInstantGame): unknown;
    fromPartial(object: DeepPartial<AccountFacebookInstantGame>): AccountFacebookInstantGame;
};
export declare const AccountFacebookInstantGame_VarsEntry: {
    encode(message: AccountFacebookInstantGame_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountFacebookInstantGame_VarsEntry;
    fromJSON(object: any): AccountFacebookInstantGame_VarsEntry;
    toJSON(message: AccountFacebookInstantGame_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountFacebookInstantGame_VarsEntry>): AccountFacebookInstantGame_VarsEntry;
};
export declare const AccountGameCenter: {
    encode(message: AccountGameCenter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountGameCenter;
    fromJSON(object: any): AccountGameCenter;
    toJSON(message: AccountGameCenter): unknown;
    fromPartial(object: DeepPartial<AccountGameCenter>): AccountGameCenter;
};
export declare const AccountGameCenter_VarsEntry: {
    encode(message: AccountGameCenter_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountGameCenter_VarsEntry;
    fromJSON(object: any): AccountGameCenter_VarsEntry;
    toJSON(message: AccountGameCenter_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountGameCenter_VarsEntry>): AccountGameCenter_VarsEntry;
};
export declare const AccountGoogle: {
    encode(message: AccountGoogle, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountGoogle;
    fromJSON(object: any): AccountGoogle;
    toJSON(message: AccountGoogle): unknown;
    fromPartial(object: DeepPartial<AccountGoogle>): AccountGoogle;
};
export declare const AccountGoogle_VarsEntry: {
    encode(message: AccountGoogle_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountGoogle_VarsEntry;
    fromJSON(object: any): AccountGoogle_VarsEntry;
    toJSON(message: AccountGoogle_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountGoogle_VarsEntry>): AccountGoogle_VarsEntry;
};
export declare const AccountSteam: {
    encode(message: AccountSteam, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountSteam;
    fromJSON(object: any): AccountSteam;
    toJSON(message: AccountSteam): unknown;
    fromPartial(object: DeepPartial<AccountSteam>): AccountSteam;
};
export declare const AccountSteam_VarsEntry: {
    encode(message: AccountSteam_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccountSteam_VarsEntry;
    fromJSON(object: any): AccountSteam_VarsEntry;
    toJSON(message: AccountSteam_VarsEntry): unknown;
    fromPartial(object: DeepPartial<AccountSteam_VarsEntry>): AccountSteam_VarsEntry;
};
export declare const AddFriendsRequest: {
    encode(message: AddFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AddFriendsRequest;
    fromJSON(object: any): AddFriendsRequest;
    toJSON(message: AddFriendsRequest): unknown;
    fromPartial(object: DeepPartial<AddFriendsRequest>): AddFriendsRequest;
};
export declare const AddGroupUsersRequest: {
    encode(message: AddGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AddGroupUsersRequest;
    fromJSON(object: any): AddGroupUsersRequest;
    toJSON(message: AddGroupUsersRequest): unknown;
    fromPartial(object: DeepPartial<AddGroupUsersRequest>): AddGroupUsersRequest;
};
export declare const SessionRefreshRequest: {
    encode(message: SessionRefreshRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SessionRefreshRequest;
    fromJSON(object: any): SessionRefreshRequest;
    toJSON(message: SessionRefreshRequest): unknown;
    fromPartial(object: DeepPartial<SessionRefreshRequest>): SessionRefreshRequest;
};
export declare const SessionRefreshRequest_VarsEntry: {
    encode(message: SessionRefreshRequest_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SessionRefreshRequest_VarsEntry;
    fromJSON(object: any): SessionRefreshRequest_VarsEntry;
    toJSON(message: SessionRefreshRequest_VarsEntry): unknown;
    fromPartial(object: DeepPartial<SessionRefreshRequest_VarsEntry>): SessionRefreshRequest_VarsEntry;
};
export declare const SessionLogoutRequest: {
    encode(message: SessionLogoutRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SessionLogoutRequest;
    fromJSON(object: any): SessionLogoutRequest;
    toJSON(message: SessionLogoutRequest): unknown;
    fromPartial(object: DeepPartial<SessionLogoutRequest>): SessionLogoutRequest;
};
export declare const AuthenticateAppleRequest: {
    encode(message: AuthenticateAppleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateAppleRequest;
    fromJSON(object: any): AuthenticateAppleRequest;
    toJSON(message: AuthenticateAppleRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateAppleRequest>): AuthenticateAppleRequest;
};
export declare const AuthenticateCustomRequest: {
    encode(message: AuthenticateCustomRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateCustomRequest;
    fromJSON(object: any): AuthenticateCustomRequest;
    toJSON(message: AuthenticateCustomRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateCustomRequest>): AuthenticateCustomRequest;
};
export declare const AuthenticateDeviceRequest: {
    encode(message: AuthenticateDeviceRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateDeviceRequest;
    fromJSON(object: any): AuthenticateDeviceRequest;
    toJSON(message: AuthenticateDeviceRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateDeviceRequest>): AuthenticateDeviceRequest;
};
export declare const AuthenticateEmailRequest: {
    encode(message: AuthenticateEmailRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateEmailRequest;
    fromJSON(object: any): AuthenticateEmailRequest;
    toJSON(message: AuthenticateEmailRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateEmailRequest>): AuthenticateEmailRequest;
};
export declare const AuthenticateFacebookRequest: {
    encode(message: AuthenticateFacebookRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateFacebookRequest;
    fromJSON(object: any): AuthenticateFacebookRequest;
    toJSON(message: AuthenticateFacebookRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateFacebookRequest>): AuthenticateFacebookRequest;
};
export declare const AuthenticateFacebookInstantGameRequest: {
    encode(message: AuthenticateFacebookInstantGameRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateFacebookInstantGameRequest;
    fromJSON(object: any): AuthenticateFacebookInstantGameRequest;
    toJSON(message: AuthenticateFacebookInstantGameRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateFacebookInstantGameRequest>): AuthenticateFacebookInstantGameRequest;
};
export declare const AuthenticateGameCenterRequest: {
    encode(message: AuthenticateGameCenterRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateGameCenterRequest;
    fromJSON(object: any): AuthenticateGameCenterRequest;
    toJSON(message: AuthenticateGameCenterRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateGameCenterRequest>): AuthenticateGameCenterRequest;
};
export declare const AuthenticateGoogleRequest: {
    encode(message: AuthenticateGoogleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateGoogleRequest;
    fromJSON(object: any): AuthenticateGoogleRequest;
    toJSON(message: AuthenticateGoogleRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateGoogleRequest>): AuthenticateGoogleRequest;
};
export declare const AuthenticateSteamRequest: {
    encode(message: AuthenticateSteamRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthenticateSteamRequest;
    fromJSON(object: any): AuthenticateSteamRequest;
    toJSON(message: AuthenticateSteamRequest): unknown;
    fromPartial(object: DeepPartial<AuthenticateSteamRequest>): AuthenticateSteamRequest;
};
export declare const BanGroupUsersRequest: {
    encode(message: BanGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): BanGroupUsersRequest;
    fromJSON(object: any): BanGroupUsersRequest;
    toJSON(message: BanGroupUsersRequest): unknown;
    fromPartial(object: DeepPartial<BanGroupUsersRequest>): BanGroupUsersRequest;
};
export declare const BlockFriendsRequest: {
    encode(message: BlockFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): BlockFriendsRequest;
    fromJSON(object: any): BlockFriendsRequest;
    toJSON(message: BlockFriendsRequest): unknown;
    fromPartial(object: DeepPartial<BlockFriendsRequest>): BlockFriendsRequest;
};
export declare const ChannelMessage: {
    encode(message: ChannelMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelMessage;
    fromJSON(object: any): ChannelMessage;
    toJSON(message: ChannelMessage): unknown;
    fromPartial(object: DeepPartial<ChannelMessage>): ChannelMessage;
};
export declare const ChannelMessageList: {
    encode(message: ChannelMessageList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ChannelMessageList;
    fromJSON(object: any): ChannelMessageList;
    toJSON(message: ChannelMessageList): unknown;
    fromPartial(object: DeepPartial<ChannelMessageList>): ChannelMessageList;
};
export declare const CreateGroupRequest: {
    encode(message: CreateGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CreateGroupRequest;
    fromJSON(object: any): CreateGroupRequest;
    toJSON(message: CreateGroupRequest): unknown;
    fromPartial(object: DeepPartial<CreateGroupRequest>): CreateGroupRequest;
};
export declare const DeleteFriendsRequest: {
    encode(message: DeleteFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DeleteFriendsRequest;
    fromJSON(object: any): DeleteFriendsRequest;
    toJSON(message: DeleteFriendsRequest): unknown;
    fromPartial(object: DeepPartial<DeleteFriendsRequest>): DeleteFriendsRequest;
};
export declare const DeleteGroupRequest: {
    encode(message: DeleteGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DeleteGroupRequest;
    fromJSON(object: any): DeleteGroupRequest;
    toJSON(message: DeleteGroupRequest): unknown;
    fromPartial(object: DeepPartial<DeleteGroupRequest>): DeleteGroupRequest;
};
export declare const DeleteLeaderboardRecordRequest: {
    encode(message: DeleteLeaderboardRecordRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DeleteLeaderboardRecordRequest;
    fromJSON(object: any): DeleteLeaderboardRecordRequest;
    toJSON(message: DeleteLeaderboardRecordRequest): unknown;
    fromPartial(object: DeepPartial<DeleteLeaderboardRecordRequest>): DeleteLeaderboardRecordRequest;
};
export declare const DeleteNotificationsRequest: {
    encode(message: DeleteNotificationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DeleteNotificationsRequest;
    fromJSON(object: any): DeleteNotificationsRequest;
    toJSON(message: DeleteNotificationsRequest): unknown;
    fromPartial(object: DeepPartial<DeleteNotificationsRequest>): DeleteNotificationsRequest;
};
export declare const DeleteStorageObjectId: {
    encode(message: DeleteStorageObjectId, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DeleteStorageObjectId;
    fromJSON(object: any): DeleteStorageObjectId;
    toJSON(message: DeleteStorageObjectId): unknown;
    fromPartial(object: DeepPartial<DeleteStorageObjectId>): DeleteStorageObjectId;
};
export declare const DeleteStorageObjectsRequest: {
    encode(message: DeleteStorageObjectsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DeleteStorageObjectsRequest;
    fromJSON(object: any): DeleteStorageObjectsRequest;
    toJSON(message: DeleteStorageObjectsRequest): unknown;
    fromPartial(object: DeepPartial<DeleteStorageObjectsRequest>): DeleteStorageObjectsRequest;
};
export declare const Event: {
    encode(message: Event, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Event;
    fromJSON(object: any): Event;
    toJSON(message: Event): unknown;
    fromPartial(object: DeepPartial<Event>): Event;
};
export declare const Event_PropertiesEntry: {
    encode(message: Event_PropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Event_PropertiesEntry;
    fromJSON(object: any): Event_PropertiesEntry;
    toJSON(message: Event_PropertiesEntry): unknown;
    fromPartial(object: DeepPartial<Event_PropertiesEntry>): Event_PropertiesEntry;
};
export declare const Friend: {
    encode(message: Friend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Friend;
    fromJSON(object: any): Friend;
    toJSON(message: Friend): unknown;
    fromPartial(object: DeepPartial<Friend>): Friend;
};
export declare const FriendList: {
    encode(message: FriendList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): FriendList;
    fromJSON(object: any): FriendList;
    toJSON(message: FriendList): unknown;
    fromPartial(object: DeepPartial<FriendList>): FriendList;
};
export declare const GetUsersRequest: {
    encode(message: GetUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GetUsersRequest;
    fromJSON(object: any): GetUsersRequest;
    toJSON(message: GetUsersRequest): unknown;
    fromPartial(object: DeepPartial<GetUsersRequest>): GetUsersRequest;
};
export declare const Group: {
    encode(message: Group, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Group;
    fromJSON(object: any): Group;
    toJSON(message: Group): unknown;
    fromPartial(object: DeepPartial<Group>): Group;
};
export declare const GroupList: {
    encode(message: GroupList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupList;
    fromJSON(object: any): GroupList;
    toJSON(message: GroupList): unknown;
    fromPartial(object: DeepPartial<GroupList>): GroupList;
};
export declare const GroupUserList: {
    encode(message: GroupUserList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupUserList;
    fromJSON(object: any): GroupUserList;
    toJSON(message: GroupUserList): unknown;
    fromPartial(object: DeepPartial<GroupUserList>): GroupUserList;
};
export declare const GroupUserList_GroupUser: {
    encode(message: GroupUserList_GroupUser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GroupUserList_GroupUser;
    fromJSON(object: any): GroupUserList_GroupUser;
    toJSON(message: GroupUserList_GroupUser): unknown;
    fromPartial(object: DeepPartial<GroupUserList_GroupUser>): GroupUserList_GroupUser;
};
export declare const ImportFacebookFriendsRequest: {
    encode(message: ImportFacebookFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ImportFacebookFriendsRequest;
    fromJSON(object: any): ImportFacebookFriendsRequest;
    toJSON(message: ImportFacebookFriendsRequest): unknown;
    fromPartial(object: DeepPartial<ImportFacebookFriendsRequest>): ImportFacebookFriendsRequest;
};
export declare const ImportSteamFriendsRequest: {
    encode(message: ImportSteamFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ImportSteamFriendsRequest;
    fromJSON(object: any): ImportSteamFriendsRequest;
    toJSON(message: ImportSteamFriendsRequest): unknown;
    fromPartial(object: DeepPartial<ImportSteamFriendsRequest>): ImportSteamFriendsRequest;
};
export declare const JoinGroupRequest: {
    encode(message: JoinGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): JoinGroupRequest;
    fromJSON(object: any): JoinGroupRequest;
    toJSON(message: JoinGroupRequest): unknown;
    fromPartial(object: DeepPartial<JoinGroupRequest>): JoinGroupRequest;
};
export declare const JoinTournamentRequest: {
    encode(message: JoinTournamentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): JoinTournamentRequest;
    fromJSON(object: any): JoinTournamentRequest;
    toJSON(message: JoinTournamentRequest): unknown;
    fromPartial(object: DeepPartial<JoinTournamentRequest>): JoinTournamentRequest;
};
export declare const KickGroupUsersRequest: {
    encode(message: KickGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): KickGroupUsersRequest;
    fromJSON(object: any): KickGroupUsersRequest;
    toJSON(message: KickGroupUsersRequest): unknown;
    fromPartial(object: DeepPartial<KickGroupUsersRequest>): KickGroupUsersRequest;
};
export declare const LeaderboardRecord: {
    encode(message: LeaderboardRecord, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LeaderboardRecord;
    fromJSON(object: any): LeaderboardRecord;
    toJSON(message: LeaderboardRecord): unknown;
    fromPartial(object: DeepPartial<LeaderboardRecord>): LeaderboardRecord;
};
export declare const LeaderboardRecordList: {
    encode(message: LeaderboardRecordList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LeaderboardRecordList;
    fromJSON(object: any): LeaderboardRecordList;
    toJSON(message: LeaderboardRecordList): unknown;
    fromPartial(object: DeepPartial<LeaderboardRecordList>): LeaderboardRecordList;
};
export declare const LeaveGroupRequest: {
    encode(message: LeaveGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LeaveGroupRequest;
    fromJSON(object: any): LeaveGroupRequest;
    toJSON(message: LeaveGroupRequest): unknown;
    fromPartial(object: DeepPartial<LeaveGroupRequest>): LeaveGroupRequest;
};
export declare const LinkFacebookRequest: {
    encode(message: LinkFacebookRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LinkFacebookRequest;
    fromJSON(object: any): LinkFacebookRequest;
    toJSON(message: LinkFacebookRequest): unknown;
    fromPartial(object: DeepPartial<LinkFacebookRequest>): LinkFacebookRequest;
};
export declare const LinkSteamRequest: {
    encode(message: LinkSteamRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LinkSteamRequest;
    fromJSON(object: any): LinkSteamRequest;
    toJSON(message: LinkSteamRequest): unknown;
    fromPartial(object: DeepPartial<LinkSteamRequest>): LinkSteamRequest;
};
export declare const ListChannelMessagesRequest: {
    encode(message: ListChannelMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListChannelMessagesRequest;
    fromJSON(object: any): ListChannelMessagesRequest;
    toJSON(message: ListChannelMessagesRequest): unknown;
    fromPartial(object: DeepPartial<ListChannelMessagesRequest>): ListChannelMessagesRequest;
};
export declare const ListFriendsRequest: {
    encode(message: ListFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListFriendsRequest;
    fromJSON(object: any): ListFriendsRequest;
    toJSON(message: ListFriendsRequest): unknown;
    fromPartial(object: DeepPartial<ListFriendsRequest>): ListFriendsRequest;
};
export declare const ListGroupsRequest: {
    encode(message: ListGroupsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListGroupsRequest;
    fromJSON(object: any): ListGroupsRequest;
    toJSON(message: ListGroupsRequest): unknown;
    fromPartial(object: DeepPartial<ListGroupsRequest>): ListGroupsRequest;
};
export declare const ListGroupUsersRequest: {
    encode(message: ListGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListGroupUsersRequest;
    fromJSON(object: any): ListGroupUsersRequest;
    toJSON(message: ListGroupUsersRequest): unknown;
    fromPartial(object: DeepPartial<ListGroupUsersRequest>): ListGroupUsersRequest;
};
export declare const ListLeaderboardRecordsAroundOwnerRequest: {
    encode(message: ListLeaderboardRecordsAroundOwnerRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListLeaderboardRecordsAroundOwnerRequest;
    fromJSON(object: any): ListLeaderboardRecordsAroundOwnerRequest;
    toJSON(message: ListLeaderboardRecordsAroundOwnerRequest): unknown;
    fromPartial(object: DeepPartial<ListLeaderboardRecordsAroundOwnerRequest>): ListLeaderboardRecordsAroundOwnerRequest;
};
export declare const ListLeaderboardRecordsRequest: {
    encode(message: ListLeaderboardRecordsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListLeaderboardRecordsRequest;
    fromJSON(object: any): ListLeaderboardRecordsRequest;
    toJSON(message: ListLeaderboardRecordsRequest): unknown;
    fromPartial(object: DeepPartial<ListLeaderboardRecordsRequest>): ListLeaderboardRecordsRequest;
};
export declare const ListMatchesRequest: {
    encode(message: ListMatchesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListMatchesRequest;
    fromJSON(object: any): ListMatchesRequest;
    toJSON(message: ListMatchesRequest): unknown;
    fromPartial(object: DeepPartial<ListMatchesRequest>): ListMatchesRequest;
};
export declare const ListNotificationsRequest: {
    encode(message: ListNotificationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListNotificationsRequest;
    fromJSON(object: any): ListNotificationsRequest;
    toJSON(message: ListNotificationsRequest): unknown;
    fromPartial(object: DeepPartial<ListNotificationsRequest>): ListNotificationsRequest;
};
export declare const ListStorageObjectsRequest: {
    encode(message: ListStorageObjectsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListStorageObjectsRequest;
    fromJSON(object: any): ListStorageObjectsRequest;
    toJSON(message: ListStorageObjectsRequest): unknown;
    fromPartial(object: DeepPartial<ListStorageObjectsRequest>): ListStorageObjectsRequest;
};
export declare const ListTournamentRecordsAroundOwnerRequest: {
    encode(message: ListTournamentRecordsAroundOwnerRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListTournamentRecordsAroundOwnerRequest;
    fromJSON(object: any): ListTournamentRecordsAroundOwnerRequest;
    toJSON(message: ListTournamentRecordsAroundOwnerRequest): unknown;
    fromPartial(object: DeepPartial<ListTournamentRecordsAroundOwnerRequest>): ListTournamentRecordsAroundOwnerRequest;
};
export declare const ListTournamentRecordsRequest: {
    encode(message: ListTournamentRecordsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListTournamentRecordsRequest;
    fromJSON(object: any): ListTournamentRecordsRequest;
    toJSON(message: ListTournamentRecordsRequest): unknown;
    fromPartial(object: DeepPartial<ListTournamentRecordsRequest>): ListTournamentRecordsRequest;
};
export declare const ListTournamentsRequest: {
    encode(message: ListTournamentsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListTournamentsRequest;
    fromJSON(object: any): ListTournamentsRequest;
    toJSON(message: ListTournamentsRequest): unknown;
    fromPartial(object: DeepPartial<ListTournamentsRequest>): ListTournamentsRequest;
};
export declare const ListUserGroupsRequest: {
    encode(message: ListUserGroupsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ListUserGroupsRequest;
    fromJSON(object: any): ListUserGroupsRequest;
    toJSON(message: ListUserGroupsRequest): unknown;
    fromPartial(object: DeepPartial<ListUserGroupsRequest>): ListUserGroupsRequest;
};
export declare const Match: {
    encode(message: Match, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Match;
    fromJSON(object: any): Match;
    toJSON(message: Match): unknown;
    fromPartial(object: DeepPartial<Match>): Match;
};
export declare const MatchList: {
    encode(message: MatchList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MatchList;
    fromJSON(object: any): MatchList;
    toJSON(message: MatchList): unknown;
    fromPartial(object: DeepPartial<MatchList>): MatchList;
};
export declare const Notification: {
    encode(message: Notification, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Notification;
    fromJSON(object: any): Notification;
    toJSON(message: Notification): unknown;
    fromPartial(object: DeepPartial<Notification>): Notification;
};
export declare const NotificationList: {
    encode(message: NotificationList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): NotificationList;
    fromJSON(object: any): NotificationList;
    toJSON(message: NotificationList): unknown;
    fromPartial(object: DeepPartial<NotificationList>): NotificationList;
};
export declare const PromoteGroupUsersRequest: {
    encode(message: PromoteGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PromoteGroupUsersRequest;
    fromJSON(object: any): PromoteGroupUsersRequest;
    toJSON(message: PromoteGroupUsersRequest): unknown;
    fromPartial(object: DeepPartial<PromoteGroupUsersRequest>): PromoteGroupUsersRequest;
};
export declare const DemoteGroupUsersRequest: {
    encode(message: DemoteGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DemoteGroupUsersRequest;
    fromJSON(object: any): DemoteGroupUsersRequest;
    toJSON(message: DemoteGroupUsersRequest): unknown;
    fromPartial(object: DeepPartial<DemoteGroupUsersRequest>): DemoteGroupUsersRequest;
};
export declare const ReadStorageObjectId: {
    encode(message: ReadStorageObjectId, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ReadStorageObjectId;
    fromJSON(object: any): ReadStorageObjectId;
    toJSON(message: ReadStorageObjectId): unknown;
    fromPartial(object: DeepPartial<ReadStorageObjectId>): ReadStorageObjectId;
};
export declare const ReadStorageObjectsRequest: {
    encode(message: ReadStorageObjectsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ReadStorageObjectsRequest;
    fromJSON(object: any): ReadStorageObjectsRequest;
    toJSON(message: ReadStorageObjectsRequest): unknown;
    fromPartial(object: DeepPartial<ReadStorageObjectsRequest>): ReadStorageObjectsRequest;
};
export declare const Rpc: {
    encode(message: Rpc, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Rpc;
    fromJSON(object: any): Rpc;
    toJSON(message: Rpc): unknown;
    fromPartial(object: DeepPartial<Rpc>): Rpc;
};
export declare const Session: {
    encode(message: Session, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Session;
    fromJSON(object: any): Session;
    toJSON(message: Session): unknown;
    fromPartial(object: DeepPartial<Session>): Session;
};
export declare const StorageObject: {
    encode(message: StorageObject, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StorageObject;
    fromJSON(object: any): StorageObject;
    toJSON(message: StorageObject): unknown;
    fromPartial(object: DeepPartial<StorageObject>): StorageObject;
};
export declare const StorageObjectAck: {
    encode(message: StorageObjectAck, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StorageObjectAck;
    fromJSON(object: any): StorageObjectAck;
    toJSON(message: StorageObjectAck): unknown;
    fromPartial(object: DeepPartial<StorageObjectAck>): StorageObjectAck;
};
export declare const StorageObjectAcks: {
    encode(message: StorageObjectAcks, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StorageObjectAcks;
    fromJSON(object: any): StorageObjectAcks;
    toJSON(message: StorageObjectAcks): unknown;
    fromPartial(object: DeepPartial<StorageObjectAcks>): StorageObjectAcks;
};
export declare const StorageObjects: {
    encode(message: StorageObjects, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StorageObjects;
    fromJSON(object: any): StorageObjects;
    toJSON(message: StorageObjects): unknown;
    fromPartial(object: DeepPartial<StorageObjects>): StorageObjects;
};
export declare const StorageObjectList: {
    encode(message: StorageObjectList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StorageObjectList;
    fromJSON(object: any): StorageObjectList;
    toJSON(message: StorageObjectList): unknown;
    fromPartial(object: DeepPartial<StorageObjectList>): StorageObjectList;
};
export declare const Tournament: {
    encode(message: Tournament, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Tournament;
    fromJSON(object: any): Tournament;
    toJSON(message: Tournament): unknown;
    fromPartial(object: DeepPartial<Tournament>): Tournament;
};
export declare const TournamentList: {
    encode(message: TournamentList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TournamentList;
    fromJSON(object: any): TournamentList;
    toJSON(message: TournamentList): unknown;
    fromPartial(object: DeepPartial<TournamentList>): TournamentList;
};
export declare const TournamentRecordList: {
    encode(message: TournamentRecordList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TournamentRecordList;
    fromJSON(object: any): TournamentRecordList;
    toJSON(message: TournamentRecordList): unknown;
    fromPartial(object: DeepPartial<TournamentRecordList>): TournamentRecordList;
};
export declare const UpdateAccountRequest: {
    encode(message: UpdateAccountRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateAccountRequest;
    fromJSON(object: any): UpdateAccountRequest;
    toJSON(message: UpdateAccountRequest): unknown;
    fromPartial(object: DeepPartial<UpdateAccountRequest>): UpdateAccountRequest;
};
export declare const UpdateGroupRequest: {
    encode(message: UpdateGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateGroupRequest;
    fromJSON(object: any): UpdateGroupRequest;
    toJSON(message: UpdateGroupRequest): unknown;
    fromPartial(object: DeepPartial<UpdateGroupRequest>): UpdateGroupRequest;
};
export declare const User: {
    encode(message: User, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): User;
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    fromPartial(object: DeepPartial<User>): User;
};
export declare const UserGroupList: {
    encode(message: UserGroupList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UserGroupList;
    fromJSON(object: any): UserGroupList;
    toJSON(message: UserGroupList): unknown;
    fromPartial(object: DeepPartial<UserGroupList>): UserGroupList;
};
export declare const UserGroupList_UserGroup: {
    encode(message: UserGroupList_UserGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UserGroupList_UserGroup;
    fromJSON(object: any): UserGroupList_UserGroup;
    toJSON(message: UserGroupList_UserGroup): unknown;
    fromPartial(object: DeepPartial<UserGroupList_UserGroup>): UserGroupList_UserGroup;
};
export declare const Users: {
    encode(message: Users, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Users;
    fromJSON(object: any): Users;
    toJSON(message: Users): unknown;
    fromPartial(object: DeepPartial<Users>): Users;
};
export declare const ValidatePurchaseAppleRequest: {
    encode(message: ValidatePurchaseAppleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatePurchaseAppleRequest;
    fromJSON(object: any): ValidatePurchaseAppleRequest;
    toJSON(message: ValidatePurchaseAppleRequest): unknown;
    fromPartial(object: DeepPartial<ValidatePurchaseAppleRequest>): ValidatePurchaseAppleRequest;
};
export declare const ValidatePurchaseGoogleRequest: {
    encode(message: ValidatePurchaseGoogleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatePurchaseGoogleRequest;
    fromJSON(object: any): ValidatePurchaseGoogleRequest;
    toJSON(message: ValidatePurchaseGoogleRequest): unknown;
    fromPartial(object: DeepPartial<ValidatePurchaseGoogleRequest>): ValidatePurchaseGoogleRequest;
};
export declare const ValidatePurchaseHuaweiRequest: {
    encode(message: ValidatePurchaseHuaweiRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatePurchaseHuaweiRequest;
    fromJSON(object: any): ValidatePurchaseHuaweiRequest;
    toJSON(message: ValidatePurchaseHuaweiRequest): unknown;
    fromPartial(object: DeepPartial<ValidatePurchaseHuaweiRequest>): ValidatePurchaseHuaweiRequest;
};
export declare const ValidatedPurchase: {
    encode(message: ValidatedPurchase, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatedPurchase;
    fromJSON(object: any): ValidatedPurchase;
    toJSON(message: ValidatedPurchase): unknown;
    fromPartial(object: DeepPartial<ValidatedPurchase>): ValidatedPurchase;
};
export declare const ValidatePurchaseResponse: {
    encode(message: ValidatePurchaseResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ValidatePurchaseResponse;
    fromJSON(object: any): ValidatePurchaseResponse;
    toJSON(message: ValidatePurchaseResponse): unknown;
    fromPartial(object: DeepPartial<ValidatePurchaseResponse>): ValidatePurchaseResponse;
};
export declare const PurchaseList: {
    encode(message: PurchaseList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PurchaseList;
    fromJSON(object: any): PurchaseList;
    toJSON(message: PurchaseList): unknown;
    fromPartial(object: DeepPartial<PurchaseList>): PurchaseList;
};
export declare const WriteLeaderboardRecordRequest: {
    encode(message: WriteLeaderboardRecordRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WriteLeaderboardRecordRequest;
    fromJSON(object: any): WriteLeaderboardRecordRequest;
    toJSON(message: WriteLeaderboardRecordRequest): unknown;
    fromPartial(object: DeepPartial<WriteLeaderboardRecordRequest>): WriteLeaderboardRecordRequest;
};
export declare const WriteLeaderboardRecordRequest_LeaderboardRecordWrite: {
    encode(message: WriteLeaderboardRecordRequest_LeaderboardRecordWrite, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
    fromJSON(object: any): WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
    toJSON(message: WriteLeaderboardRecordRequest_LeaderboardRecordWrite): unknown;
    fromPartial(object: DeepPartial<WriteLeaderboardRecordRequest_LeaderboardRecordWrite>): WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
};
export declare const WriteStorageObject: {
    encode(message: WriteStorageObject, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WriteStorageObject;
    fromJSON(object: any): WriteStorageObject;
    toJSON(message: WriteStorageObject): unknown;
    fromPartial(object: DeepPartial<WriteStorageObject>): WriteStorageObject;
};
export declare const WriteStorageObjectsRequest: {
    encode(message: WriteStorageObjectsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WriteStorageObjectsRequest;
    fromJSON(object: any): WriteStorageObjectsRequest;
    toJSON(message: WriteStorageObjectsRequest): unknown;
    fromPartial(object: DeepPartial<WriteStorageObjectsRequest>): WriteStorageObjectsRequest;
};
export declare const WriteTournamentRecordRequest: {
    encode(message: WriteTournamentRecordRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WriteTournamentRecordRequest;
    fromJSON(object: any): WriteTournamentRecordRequest;
    toJSON(message: WriteTournamentRecordRequest): unknown;
    fromPartial(object: DeepPartial<WriteTournamentRecordRequest>): WriteTournamentRecordRequest;
};
export declare const WriteTournamentRecordRequest_TournamentRecordWrite: {
    encode(message: WriteTournamentRecordRequest_TournamentRecordWrite, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): WriteTournamentRecordRequest_TournamentRecordWrite;
    fromJSON(object: any): WriteTournamentRecordRequest_TournamentRecordWrite;
    toJSON(message: WriteTournamentRecordRequest_TournamentRecordWrite): unknown;
    fromPartial(object: DeepPartial<WriteTournamentRecordRequest_TournamentRecordWrite>): WriteTournamentRecordRequest_TournamentRecordWrite;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]>;
} & {
    $case: T["$case"];
} : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
