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
  // Claims
  token: string;
  created: boolean
  readonly created_at: number;
  expires_at?: number;
  refresh_expires_at?: number;
  refresh_token: string;
  username?: string;
  user_id?: string;
  vars?: object;

  // Validate token
  isexpired(currenttime: number): boolean;
  isrefreshexpired(currenttime: number): boolean;
}

export class Session implements ISession {

  token : string;
  readonly created_at: number;
  expires_at?: number;
  refresh_expires_at?: number;
  refresh_token: string;
  username?: string;
  user_id?: string;
  vars?: object;

  constructor(
    token: string,
    refresh_token: string,
    readonly created: boolean) {
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

    const tokenParts = token.split('.');
    if (tokenParts.length != 3) {
      throw 'jwt is not valid.';
    }

    const tokenDecoded = JSON.parse(atob(tokenParts[1])); // FIXME: use base64 polyfill for React Native.
    const tokenExpiresAt = Math.floor(parseInt(tokenDecoded['exp']));

    // clients that have updated will not have a cached refresh token
    if (refreshToken) {

        const refreshTokenParts = refreshToken.split('.');

        if (refreshTokenParts.length != 3) {
            throw 'refresh jwt is not valid.';
        }

        const refreshTokenDecoded = JSON.parse(atob(refreshTokenParts[1])); // FIXME: use base64 polyfill for React Native.
        const refreshTokenExpiresAt = Math.floor(parseInt(refreshTokenDecoded['exp']));
        this.refresh_expires_at = refreshTokenExpiresAt;
        this.refresh_token = refreshToken;
    }

    this.token = token;
    this.expires_at = tokenExpiresAt;
    this.username = tokenDecoded['usn'];
    this.user_id = tokenDecoded['uid'];
    this.vars = tokenDecoded['vrs'];
  }

  static restore(token: string, refreshToken: string): Session {
    return new Session(token, refreshToken, false);
  }
}
