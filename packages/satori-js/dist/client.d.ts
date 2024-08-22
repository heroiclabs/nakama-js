/**
 * Copyright 2020 The Nakama Authors
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
import { SatoriApi, ApiEvent } from "./api.gen";
import { Session } from "./session";
/** A client for Satori server. */
export declare class Client {
    readonly apiKey: string;
    readonly host: string;
    readonly port: string;
    readonly useSSL: boolean;
    readonly timeout: number;
    readonly autoRefreshSession: boolean;
    /** The expired timespan used to check session lifetime. */
    expiredTimespanMs: number;
    /** The low level API client for Nakama server. */
    readonly apiClient: SatoriApi;
    constructor(apiKey?: string, host?: string, port?: string, useSSL?: boolean, timeout?: number, autoRefreshSession?: boolean);
    /** Authenticate a user with an ID against the server. */
    authenticate(id: string, customProperties?: Record<string, string>, defaultProperties?: Record<string, string>): Promise<Session>;
    /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
    sessionRefresh(session: Session): Promise<Session>;
    /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
    logout(session: Session): Promise<boolean>;
    /** Publish an event for this session. */
    event(session: Session, event: ApiEvent): Promise<boolean>;
    /** Publish multiple events for this session */
    events(session: Session, events: Array<ApiEvent>): Promise<boolean>;
    /** Get or list all available experiments for this identity. */
    getExperiments(session: Session, names?: Array<string>): Promise<import("./api.gen").ApiExperimentList>;
    /** Get a single flag for this identity. Throws an error when the flag does not exist. */
    getFlag(session: Session, name: string): Promise<never>;
    /** Get a single flag for this identity. */
    getFlagWithFallback(session: Session, name: string, fallbackValue?: string): Promise<{
        name: string;
        value: string | undefined;
    }>;
    /** Get a single flag with its configured default value. Throws an error when the flag does not exist. */
    getFlagDefault(name: string): Promise<never>;
    /** Get a single flag with its configured default value.  */
    getFlagDefaultWithFallback(name: string, fallbackValue?: string): Promise<{
        name: string;
        value: string | undefined;
    }>;
    /** List all available flags for this identity. */
    getFlags(session: Session, names?: Array<string>): Promise<import("./api.gen").ApiFlagList>;
    /** List all available default flags. */
    getFlagsDefault(names?: Array<string>): Promise<import("./api.gen").ApiFlagList>;
    /** Enrich/replace the current session with new identifier. */
    identify(session: Session, id: string, defaultProperties?: Record<string, string>, customProperties?: Record<string, string>): Promise<Session>;
    /** List available live events. */
    getLiveEvents(session: Session, names?: Array<string>): Promise<import("./api.gen").ApiLiveEventList>;
    /** List properties associated with this identity. */
    listProperties(session: Session): Promise<import("./api.gen").ApiProperties>;
    /** Update identity properties. */
    updateProperties(session: Session, defaultProperties?: Record<string, string>, customProperties?: Record<string, string>, recompute?: boolean): Promise<boolean>;
    /** Delete the caller's identity and associated data. */
    deleteIdentity(session: Session): Promise<boolean>;
    getMessageList(session: Session): Promise<boolean>;
    deleteMessage(session: Session, id: string): Promise<boolean>;
    updateMessage(session: Session, id: string, consume_time?: string, read_time?: string): Promise<boolean>;
}
