/**
 * Copyright 2017 The Nakama Authors
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
/** A nakama session. */
export interface ISession {
    /** Claims */
    token: string;
    created: boolean;
    readonly created_at: number;
    expires_at?: number;
    refresh_expires_at?: number;
    refresh_token: string;
    username?: string;
    user_id?: string;
    vars?: object;
    /** Validate token */
    isexpired(currenttime: number): boolean;
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
