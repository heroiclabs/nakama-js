/**
 * Copyright 2022 The Nakama Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A session authenticated for a user with Nakama server. */
export interface ISession {
    /** Claims */
    /** The authorization token used to construct this session. */
    token: string;
    /** If the user account for this session was just created. */
    created: boolean;
    /** The UNIX timestamp when this session was created. */
    readonly created_at: number;
    /** The UNIX timestamp when this session will expire. */
    expires_at?: number;
    /** The UNIX timestamp when the refresh token will expire. */
    refresh_expires_at?: number;
    /** Refresh token that can be used for session token renewal. */
    refresh_token: string;
    /** The username of the user who owns this session. */
    username?: string;
    /** The ID of the user who owns this session. */
    user_id?: string;
    /** Any custom properties associated with this session. */
    vars?: object;
    /** Validate token */
    /** If the session has expired. */
    isexpired(currenttime: number): boolean;
    /** If the refresh token has expired. */
    isrefreshexpired(currenttime: number): boolean;
}
export declare class Session implements ISession {
    readonly created: boolean;
    token: string;
    readonly created_at: number;
    expires_at?: number;
    refresh_expires_at?: number;
    refresh_token: string;
    username?: string;
    user_id?: string;
    vars?: object;
    constructor(token: string, refresh_token: string, created: boolean);
    isexpired(currenttime: number): boolean;
    isrefreshexpired(currenttime: number): boolean;
    update(token: string, refreshToken: string): void;
    static restore(token: string, refreshToken: string): Session;
}
