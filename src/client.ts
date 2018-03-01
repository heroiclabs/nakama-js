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

  /** Add friends by ID or username to a user's account. */
  // addFriends(ids?: Array<string>, usernames?: Array<string>, session?: Session): Promise<boolean> {
  //   this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
  //   return this.apiClient.addFriends(ids, usernames).then((response: ProtobufEmpty) => {
  //     return Promise.resolve(response != undefined);
  //   });
  // }

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

  /** Block one or more users by ID or username. */
  // blockFriends(ids?: Array<string>, usernames?: Array<string>, session?: Session): Promise<boolean> {
  //   this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
  //   return this.apiClient.blockFriends(ids, usernames).then((response: ProtobufEmpty) => {
  //     return Promise.resolve(response != undefined);
  //   });
  // }

  /** A socket created with the client's configuration. */
  createSocket(session?: Session): Socket {
    return {
      session: session
    };
  }

  /** Delete one or more users by ID or username. */
  // deleteFriends(ids?: Array<string>, usernames?: Array<string>, session?: Session): Promise<boolean> {
  //   this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
  //   return this.apiClient.deleteFriends(ids, usernames).then((response: ProtobufEmpty) => {
  //     return Promise.resolve(response != undefined);
  //   });
  // }

  /** Delete one or more notifications */
  // deleteNotifications(ids?: Array<string>, session?: Session): Promise<boolean> {
  //   this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
  //   return this.apiClient.deleteNotifications(ids).then((response: ProtobufEmpty) => {
  //     return Promise.resolve(response != undefined);
  //   });
  // }

  /** Fetch the current user's account. */
  getAccount(session?: Session): Promise<ApiAccount> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.getAccount();
  }

  /** Import Facebook friends and add them to a user's account. */
  importFacebookFriends(request: ApiAccountFacebook, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.importFacebookFriends(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Fetch zero or more users by ID and/or username. */
  getUsers(ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>, session?: Session): Promise<ApiUsers> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.getUsers(ids, usernames, facebookIds);
  }

  /** Add a custom ID to the social profiles on the current user's account. */
  linkCustom(request: ApiAccountCustom, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.linkCustom(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Add a device ID to the social profiles on the current user's account. */
  linkDevice(request: ApiAccountDevice, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.linkDevice(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Add an email+password to the social profiles on the current user's account. */
  linkEmail(request: ApiAccountEmail, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.linkEmail(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Add Facebook to the social profiles on the current user's account. */
  linkFacebook(request: ApiAccountFacebook, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.linkFacebook(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Add Google to the social profiles on the current user's account. */
  linkGoogle(request: ApiAccountGoogle, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.linkGoogle(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** List all friends for the current user. */
  listFriends(session?: Session): Promise<ApiFriends> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.listFriends();
  }

  /** Fetch list of notifications. */
  listNotifications(limit?: string, cacheableCursor?: string, session?: Session): Promise<ApiUsers> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.listNotifications(limit, cacheableCursor);
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

  /** Remove custom ID from the social profiles on the current user's account. */
  unlinkCustom(request: ApiAccountCustom, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.unlinkCustom(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Remove a device ID from the social profiles on the current user's account. */
  unlinkDevice(request: ApiAccountDevice, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.unlinkDevice(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Remove an email+password from the social profiles on the current user's account. */
  unlinkEmail(request: ApiAccountEmail, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.unlinkEmail(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Remove Facebook from the social profiles on the current user's account. */
  unlinkFacebook(request: ApiAccountFacebook, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.unlinkFacebook(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Remove Google from the social profiles on the current user's account. */
  unlinkGoogle(request: ApiAccountGoogle, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.unlinkGoogle(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Update fields in the current user's account. */
  updateAccount(request: ApiUpdateAccountRequest, session?: Session): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token) || (this.session && this.session.token);
    return this.apiClient.updateAccount(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }
}
