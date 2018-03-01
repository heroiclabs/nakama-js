/**
 * Copyright 2018 The Nakama Authors
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

import {
  ApiAccount,
  ApiAccountCustom,
  ApiAccountDevice,
  ApiAccountEmail,
  ApiAccountFacebook,
  ApiAccountGoogle,
  ApiSession,
  ApiRpc,
  ApiUpdateAccountRequest,
  ConfigurationParameters,
  NakamaApi,
  ProtobufEmpty,
} from "./api.gen";

import { Session } from "./session";
import { Socket } from "./socket";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7349";
const DEFAULT_SERVER_KEY = "defaultkey";

/** A client for Nakama server. */
export class Client {
  // The low level API client for Nakama server.
  private apiClient: any;
  // The server configuration.
  private configuration: ConfigurationParameters;
  // The client session.
  private session?: Session;

  constructor(
      readonly serverkey = DEFAULT_SERVER_KEY,
      readonly host = DEFAULT_HOST,
      readonly port = DEFAULT_PORT,
      public useSSL = false,
      public verbose = false) {
    const scheme = (useSSL) ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;
    this.configuration = {
      username: serverkey,
      basePath: basePath
    };
    this.apiClient = NakamaApi(this.configuration);
  }

  /** Authenticate a user with a custom id against the server. */
  authenticateCustom(request: ApiAccountCustom): Promise<Session> {
    return this.apiClient.authenticateCustom(request).then((apiSession: ApiSession): Session => {
      const sessionObj = Session.restore(apiSession.token || "");
      this.session = sessionObj;
      return sessionObj;
    });
  }

  /** Authenticate a user with a device id against the server. */
  authenticateDevice(request: ApiAccountDevice): Promise<Session> {
    return this.apiClient.authenticateDevice(request).then((apiSession: ApiSession): Session => {
      const sessionObj = Session.restore(apiSession.token || "");
      this.session = sessionObj;
      return sessionObj;
    });
  }

  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(request: ApiAccountEmail): Promise<Session> {
    return this.apiClient.authenticateEmail(request).then((apiSession: ApiSession): Session => {
      const sessionObj = Session.restore(apiSession.token || "");
      this.session = sessionObj;
      return sessionObj;
    });
  }

  /** Authenticate a user with a Facebook OAuth token against the server. */
  authenticateFacebook(request: ApiAccountFacebook): Promise<Session> {
    return this.apiClient.authenticateFacebook(request).then((apiSession: ApiSession): Session => {
      const sessionObj = Session.restore(apiSession.token || "");
      this.session = sessionObj;
      return sessionObj;
    });
  }

  /** Authenticate a user with Google against the server. */
  authenticateGoogle(request: ApiAccountGoogle): Promise<Session> {
    return this.apiClient.authenticateGoogle(request).then((apiSession: ApiSession): Session => {
      const sessionObj = Session.restore(apiSession.token || "");
      this.session = sessionObj;
      return sessionObj;
    });
  }

  /** A socket created with the client's configuration. */
  createSocket(session?: Session): Socket {
    return {
      session: session
    };
  }

  /** Fetch the current user's account. */
  getAccount(session?: Session): Promise<ApiAccount> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.getAccount();
  }

  /** Execute a Lua function on the server. */
  rpcFunc(id: string, input: object, session?: Session): Promise<ApiRpc> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.rpcFunc(id, JSON.stringify(input));
  }

  /** Execute a Lua function on the server. */
  rpcFunc2(id: string, session?: Session): Promise<ApiRpc> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.rpcFunc2(id);
  }

  /** Update fields in the current user's account. */
  updateAccount(request: ApiUpdateAccountRequest, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.updateAccount(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }
}
