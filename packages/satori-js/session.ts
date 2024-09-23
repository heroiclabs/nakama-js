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


import * as base64 from "js-base64"

/** A session authenticated for a user with Satori server. */
export interface ISession {
  /** Claims */
  /** The authorization token used to construct this session. */
  token: string;
  /** The UNIX timestamp when this session was created. */
  readonly created_at: number;
  /** The UNIX timestamp when this session will expire. */
  expires_at?: number;
  /** The UNIX timestamp when the refresh token will expire. */
  refresh_expires_at?: number;
  /** Refresh token that can be used for session token renewal. */
  refresh_token: string;
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

export class Session implements ISession {

  token : string;
  readonly created_at: number;
  expires_at?: number;
  refresh_expires_at?: number;
  refresh_token: string;
  user_id?: string;
  vars?: object;

  constructor(
    token: string,
    refresh_token: string) {
    this.token = token;
    this.refresh_token = refresh_token;
    this.created_at = Math.floor(new Date().getTime() / 1000);
    this.update(token, refresh_token);
  }

  isexpired(currenttime: number): boolean {
    return (this.expires_at! - currenttime) < 0;
  }

  isrefreshexpired(currenttime: number): boolean {
      return (this.refresh_expires_at! - currenttime) < 0;
  }

  update(token: string, refreshToken: string) {
    const tokenDecoded = this.decodeJWT(token);
    const tokenExpiresAt = Math.floor(parseInt(tokenDecoded['exp']));

    /** clients that have just updated to the refresh tokens */
    /** client release will not have a cached refresh token */
    if (refreshToken) {
        const refreshTokenDecoded = this.decodeJWT(refreshToken);
        const refreshTokenExpiresAt = Math.floor(parseInt(refreshTokenDecoded['exp']));
        this.refresh_expires_at = refreshTokenExpiresAt;
        this.refresh_token = refreshToken;
    }

    this.token = token;
    this.expires_at = tokenExpiresAt;
    this.user_id = tokenDecoded['uid'];
    this.vars = tokenDecoded['vrs'];
  }

  decodeJWT(token: string) {
    const { 1: base64Raw } = token.split('.')
    const _base64 = base64Raw.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(base64.atob(_base64).split('').map((c) => {
      return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`
    }).join(''))
  
    return JSON.parse(jsonPayload)
  }

  static restore(token: string, refreshToken: string): Session {
    return new Session(token, refreshToken);
  }
}
