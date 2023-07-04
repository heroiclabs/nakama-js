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

import { SatoriApi, ApiSession, ApiAuthenticateRequest, ApiEventRequest, ApiAuthenticateLogoutRequest, ApiAuthenticateRefreshRequest, ApiIdentifyRequest, ApiUpdatePropertiesRequest, ApiEvent } from "./api.gen";

import { Session } from "./session";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7450";
const DEFAULT_API_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;

/** A client for Satori server. */
export class Client {

  /** The expired timespan used to check session lifetime. */
  public expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;

  /** The low level API client for Nakama server. */
  private readonly apiClient: SatoriApi;

  constructor(
      readonly apiKey = DEFAULT_API_KEY,
      readonly host = DEFAULT_HOST,
      readonly port = DEFAULT_PORT,
      readonly useSSL = false,
      readonly timeout = DEFAULT_TIMEOUT_MS,
      readonly autoRefreshSession = true) {
    const scheme = (useSSL) ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    this.apiClient = new SatoriApi(apiKey, basePath, timeout);
  }

  /** Authenticate a user with an ID against the server. */
  async authenticate(id: string) {

    const request : ApiAuthenticateRequest = {
      "id": id,
    };

    return this.apiClient.satoriAuthenticate(this.apiKey, "", request).then((apiSession : ApiSession) => {
      return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
    });
  }

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  async sessionRefresh(session: Session) {

    const request : ApiAuthenticateRefreshRequest = {
      "refresh_token": session.refresh_token,
    };

    return this.apiClient.satoriAuthenticateRefresh(this.apiKey, "", request).then((apiSession : ApiSession) => {
      return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
    });
  }

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  async logout(session: Session) {

    const request : ApiAuthenticateLogoutRequest = {
      "token": session.token,
      "refresh_token": session.refresh_token
    };

    return this.apiClient.satoriAuthenticateLogout(session.token, request).then((response) => {
      return Promise.resolve(response !== undefined);
    });
  }

  /** Publish an event for this session. */
  async event(session: Session, event: ApiEvent) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    const request : ApiEventRequest = {
      events: [event]
    };

    return this.apiClient.satoriEvent(session.token, request).then((response) => {
      return Promise.resolve(response !== undefined);
    });
  }

  /** Publish multiple events for this session */
  async events(session: Session, events: Array<ApiEvent>) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    const request : ApiEventRequest = {
      events
    };

    return this.apiClient.satoriEvent(session.token, request).then((response) => {
      return Promise.resolve(response !== undefined);
    });
  }

  /** Get or list all available experiments for this identity. */
  async getExperiments(session: Session, names?: Array<string>) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.satoriGetExperiments(session.token, names);
  }

  /** Get a single flag for this identity. Throws an error when the flag does not exist. */
  async getFlag(session: Session, name: string) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.satoriGetFlags(session.token, "", "", [name]).then((flagList) => {
      let flag = null;

      flagList.flags?.forEach((f) => {
        if (f.name === name) {
          flag = f;
        }
      });

      if (flag === null) {
        return Promise.reject("Flag does not exist.");
      }

      return Promise.resolve(flag);
    });
  }

  
  /** Get a single flag for this identity. */
  async getFlagWithFallback(session: Session, name: string, fallbackValue?: string) {
    return this.getFlag(session, name)
      .then((flag) => {
        return flag;
      })
      .catch(() => {
        const flag = {
          name,
          value: fallbackValue
        };

        return Promise.resolve(flag)
      });
  }

  /** Get a single flag with its configured default value. Throws an error when the flag does not exist. */
  async getFlagDefault(name: string) {
    return this.apiClient.satoriGetFlags("", this.apiKey, "", [name]).then((flagList) => {
      let flag = null;

      flagList.flags?.forEach((f) => {
        if (f.name === name) {
          flag = f;
        }
      });

      if (flag === null) {
        return Promise.reject("Flag does not exist.");
      }

      return Promise.resolve(flag);
    });
  }

  /** Get a single flag with its configured default value.  */
  async getFlagDefaultWithFallback(name: string, fallbackValue?: string) {
    return this.getFlagDefault(name)
      .then((flag) => {
        return flag;
      })
      .catch(() => {
        const flag = {
          name,
          value: fallbackValue
        };

        return Promise.resolve(flag)
      });
  }

  /** List all available flags for this identity. */
  async getFlags(session: Session, names?: Array<string>) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.satoriGetFlags(session.token, "", "", names);
  }

  /** List all available default flags. */
  async getFlagsDefault(names?: Array<string>) {
    return this.apiClient.satoriGetFlags("", this.apiKey, "", names);
  }

  /** Enrich/replace the current session with new identifier. */
  async identify(session: Session, id: string, defaultProperties?: Record<string, string>, customProperties?: Record<string, string>) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    const request : ApiIdentifyRequest = {
      id: id,
      default: defaultProperties,
      custom: customProperties
    };

    return this.apiClient.satoriIdentify(session.token, request).then((apiSession: ApiSession) => {
      return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
    });
  }

  /** List available live events. */
  async getLiveEvents(session: Session, names?: Array<string>) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.satoriGetLiveEvents(session.token, names);
  }

  /** List properties associated with this identity. */
  async listProperties(session: Session) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.satoriListProperties(session.token);
  }

  /** Update identity properties. */
  async updateProperties(session: Session, defaultProperties?: Record<string, string>, customProperties?: Record<string, string>) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    const request : ApiUpdatePropertiesRequest = {
      default: defaultProperties,
      custom: customProperties
    };

    return this.apiClient.satoriUpdateProperties(session.token, request).then((response) => {
      return Promise.resolve(response !== undefined);
    });
  }

    /** Delete the caller's identity and associated data. */
    async deleteIdentity(session: Session) {
      if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
      }
  
      return this.apiClient.satoriDeleteIdentity(session.token).then((response) => {
        return Promise.resolve(response !== undefined);
      });
    }
};
