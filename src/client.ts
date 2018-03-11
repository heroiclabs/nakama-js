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
  ApiFriends,
  ApiMatchList,
  ApiSession,
  ApiRpc,
  ApiUpdateAccountRequest,
  ApiUsers,
  ConfigurationParameters,
  NakamaApi,
  ProtobufEmpty,
} from "./api.gen";

import { Session } from "./session";
import { DefaultSocket, Socket } from "./socket";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7349";
const DEFAULT_SERVER_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 7000;

/** Response for an RPC function executed on the server. */
export interface RpcResponse {
  // The identifier of the function.
  id?: string;
  // The payload of the function which must be a JSON object.
  payload?: object;
}

/** A client for Nakama server. */
export class Client {
  // The low level API client for Nakama server.
  private readonly apiClient: any;
  // The server configuration.
  private readonly configuration: ConfigurationParameters;

  constructor(
      readonly serverkey = DEFAULT_SERVER_KEY,
      readonly host = DEFAULT_HOST,
      readonly port = DEFAULT_PORT,
      public useSSL = false,
      public timeout = DEFAULT_TIMEOUT_MS,
      public verbose = false) {
    const scheme = (useSSL) ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;
    this.configuration = {
      basePath: basePath,
      username: serverkey,
      password: "",
      timeoutMs: timeout,
    };
    this.apiClient = NakamaApi(this.configuration);
  }

  /** Add friends by ID or username to a user's account. */
  // addFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {
  //   this.configuration.bearerToken = (session && session.token);
  //   return this.apiClient.addFriends(ids, usernames).then((response: ProtobufEmpty) => {
  //     return Promise.resolve(response != undefined);
  //   });
  // }

  /** Authenticate a user with a custom id against the server. */
  authenticateCustom(request: ApiAccountCustom): Promise<Session> {
    return this.apiClient.authenticateCustom(request).then((apiSession: ApiSession): Session => {
      return Session.restore(apiSession.token || "");
    });
  }

  /** Authenticate a user with a device id against the server. */
  authenticateDevice(request: ApiAccountDevice): Promise<Session> {
    return this.apiClient.authenticateDevice(request).then((apiSession: ApiSession): Session => {
      return Session.restore(apiSession.token || "");
    });
  }

  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(request: ApiAccountEmail): Promise<Session> {
    return this.apiClient.authenticateEmail(request).then((apiSession: ApiSession): Session => {
      return Session.restore(apiSession.token || "");
    });
  }

  /** Authenticate a user with a Facebook OAuth token against the server. */
  authenticateFacebook(request: ApiAccountFacebook): Promise<Session> {
    return this.apiClient.authenticateFacebook(request).then((apiSession: ApiSession): Session => {
      return Session.restore(apiSession.token || "");
    });
  }

  /** Authenticate a user with Google against the server. */
  authenticateGoogle(request: ApiAccountGoogle): Promise<Session> {
    return this.apiClient.authenticateGoogle(request).then((apiSession: ApiSession): Session => {
      return Session.restore(apiSession.token || "");
    });
  }

  /** Block one or more users by ID or username. */
  // blockFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {
  //   this.configuration.bearerToken = (session && session.token);
  //   return this.apiClient.blockFriends(ids, usernames).then((response: ProtobufEmpty) => {
  //     return Promise.resolve(response != undefined);
  //   });
  // }

  /** A socket created with the client's configuration. */
  createSocket(useSSL = false, verbose: boolean = false): Socket {
    return new DefaultSocket(this.host, this.port, useSSL, verbose);
  }

  /** Delete one or more users by ID or username. */
  // deleteFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {
  //   this.configuration.bearerToken = (session && session.token);
  //   return this.apiClient.deleteFriends(ids, usernames).then((response: ProtobufEmpty) => {
  //     return Promise.resolve(response != undefined);
  //   });
  // }

  /** Delete one or more notifications */
  // deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean> {
  //   this.configuration.bearerToken = (session && session.token);
  //   return this.apiClient.deleteNotifications(ids).then((response: ProtobufEmpty) => {
  //     return Promise.resolve(response != undefined);
  //   });
  // }

  /** Fetch the current user's account. */
  getAccount(session: Session): Promise<ApiAccount> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.getAccount();
  }

  /** Import Facebook friends and add them to a user's account. */
  importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.importFacebookFriends(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Fetch zero or more users by ID and/or username. */
  getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<ApiUsers> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.getUsers(ids, usernames, facebookIds);
  }

  /** Add a custom ID to the social profiles on the current user's account. */
  linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.linkCustom(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Add a device ID to the social profiles on the current user's account. */
  linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.linkDevice(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Add an email+password to the social profiles on the current user's account. */
  linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.linkEmail(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Add Facebook to the social profiles on the current user's account. */
  linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.linkFacebook(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Add Google to the social profiles on the current user's account. */
  linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.linkGoogle(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** List all friends for the current user. */
  listFriends(session: Session): Promise<ApiFriends> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listFriends();
  }

  /** Fetch list of running matches. */
  listMatches(session: Session, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number): Promise<ApiMatchList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listMatches(limit, authoritative, label, minSize, maxSize);
  }

  /** Fetch list of notifications. */
  listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<ApiUsers> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listNotifications(limit, cacheableCursor);
  }

  /** Execute a Lua function on the server. */
  rpc(session: Session, id: string, input: object): Promise<RpcResponse> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.rpcFunc(id, JSON.stringify(input)).then((response: ApiRpc) => {
      return Promise.resolve({
        id: response.id,
        payload: (!response.payload) ? null : JSON.parse(response.payload)
      });
    });
  }

  /** Execute a Lua function on the server. */
  rpcGet(id: string, session?: Session, httpKey?: string, input?: object): Promise<RpcResponse> {
    if (!httpKey || httpKey == "") {
      this.configuration.bearerToken = (session && session.token);
    } else {
      // When a HTTP key is used we should not use basicauth or bearer auth.
      this.configuration.username = undefined;
      this.configuration.bearerToken = undefined;
    }
    return this.apiClient.rpcFunc2(id, input && JSON.stringify(input) || "", httpKey)
      .then((response: ApiRpc) => {
        this.configuration.username = this.serverkey;
        return Promise.resolve({
          id: response.id,
          payload: (!response.payload) ? null : JSON.parse(response.payload)
        });
      }).catch((err: any) => {
        this.configuration.username = this.serverkey;
        throw err;
      });
  }

  /** Remove custom ID from the social profiles on the current user's account. */
  unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.unlinkCustom(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Remove a device ID from the social profiles on the current user's account. */
  unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.unlinkDevice(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Remove an email+password from the social profiles on the current user's account. */
  unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.unlinkEmail(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Remove Facebook from the social profiles on the current user's account. */
  unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.unlinkFacebook(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Remove Google from the social profiles on the current user's account. */
  unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.unlinkGoogle(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Update fields in the current user's account. */
  updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.updateAccount(request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }
};
