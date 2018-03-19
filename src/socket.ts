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

import { ApiNotification, ApiRpc } from "./api.gen";
import { Session } from "./session";

/** Stores function references for resolve/reject with a DOM Promise. */
interface PromiseExecutor {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

/** Stream data. */
export interface StreamData {
  stream: {},
  stream_presence: {}
  data: string
}

/** Presence updates. */
export interface StreamPresenceEvent {
  stream: {},
  joins: [{}],
  leaves: [{}]
}

/** Match presence updates. */
export interface MatchPresenceEvent {
  match_id: string,
  joins: [{}],
  leaves: [{}]
}

/** Create a multiplayer match. */
export interface CreateMatch {
  match_create: {}
}

/** Join a multiplayer match. */
export interface JoinMatch {
  match_join: {
    match_id: string,
    token: string
  }
}

/** Leave a multiplayer match. */
export interface LeaveMatch {
  match_leave: {
    match_id: string
  }
}

/** Leave a multiplayer match. */
export interface MatchData {
  match_data_send: {
    match_id: string,
    op_code: number,
    data: {},
    presence: [{}]
  }
}

/** Execute an Lua function on the server. */
export interface Rpc {
  rpc: ApiRpc
}

/** A socket connection to Nakama server. */
export interface Socket {
  // Connect to the server.
  connect(session: Session): Promise<Session>;
  // Disconnect from the server.
  disconnect(fireDisconnectEvent: boolean): void;
  // Handle disconnect events received from the socket.
  ondisconnect: (evt: Event) => void;
  // Receive notifications from the socket.
  onnotification: (notification: ApiNotification) => void;
  // Receive match data updates.
  onmatchdata: (matchData: MatchData) => void;
  // Receive match presence updates.
  onmatchpresence: (matchPresence: MatchPresenceEvent) => void;
  // Receive stream presence updates.
  onstreampresence: (streamPresence: StreamPresenceEvent) => void;
  // Receive stream data.
  onstreamdata: (streamData: StreamData) => void;
}

/** Reports an error received from a socket message. */
export interface SocketError {
  // The error code.
  code: number;
  // A message in English to help developers debug the response.
  message: string;
}

/** A socket connection to Nakama server implemented with the DOM's WebSocket API. */
export class DefaultSocket implements Socket {
  private socket?: WebSocket;
  private readonly cIds: { [key: string]: PromiseExecutor };

  constructor(
      readonly host: string,
      readonly port: string,
      readonly useSSL: boolean = false,
      public verbose: boolean = false) {
    this.cIds = {};
  }

  generatecid(): string {
    return [...Array(30)].map(() => Math.random().toString(36)[3]).join('');
  }

  connect(session: Session): Promise<Session> {
    if (this.socket != undefined) {
      return Promise.resolve(session);
    }

    const scheme = (this.useSSL) ? "wss://" : "ws://";
    const url = `${scheme}${this.host}:${this.port}/ws?lang=en&token=${encodeURIComponent(session.token)}`;
    const socket = new WebSocket(url);
    this.socket = socket;

    socket.onclose = (evt: Event) => {
      this.ondisconnect(evt);
      this.socket = undefined;
    }

    socket.onmessage = (evt: MessageEvent) => {
      const message = JSON.parse(evt.data);
      if (this.verbose && window && window.console) {
        console.log("Response: %o", message);
      }

      // Inbound message from server.
      if (message.cid == undefined) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n: any) => this.onnotification(n));
        } else if (message.match_data) {
          message.match_data.data = JSON.parse(atob(message.match_data.data));
          this.onmatchdata(message.match_data);
        } else if (message.matched_presence_event) {
          this.onmatchpresence(<MatchPresenceEvent>message.matched_presence_event);
        } else if (message.stream_presence_event) {
          this.onstreampresence(<StreamPresenceEvent>message.stream_presence_event);
        } else if (message.stream_data) {
          this.onstreamdata(<StreamData>message.stream_data);
        } else {
          if (this.verbose && window && window.console) {
            console.log("Unrecognized message received: %o", message);
          }
        }
      } else {
        const executor = this.cIds[message.cid];
        if (!executor) {
          if (this.verbose && window && window.console) {
            console.error("No promise executor for message: %o", message);
          }
          return;
        }
        delete this.cIds[message.cid];

        if (message.error) {
          executor.reject(<SocketError>message.error);
        } else {
          executor.resolve(message);
        }
      }
    }

    return new Promise((resolve, reject) => {
      socket.onopen = (evt: Event) => {
        if (this.verbose && window && window.console) {
          console.log(evt);
        }
        resolve(session);
      }
      socket.onerror = (evt: Event) => {
        reject(evt);
        socket.close();
        this.socket = undefined;
      }
    });
  }

  disconnect(fireDisconnectEvent: boolean = true) {
    if (this.socket != undefined) {
      this.socket.close();
    }
    if (fireDisconnectEvent) {
      this.ondisconnect(<Event>{});
    }
  }

  ondisconnect(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  onnotification(notification: ApiNotification) {
    if (this.verbose && window && window.console) {
      console.log(notification);
    }
  }

  onmatchdata(matchData: MatchData) {
    if (this.verbose && window && window.console) {
      console.log(matchData);
    }
  }

  onmatchpresence(matchPresence: MatchPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(matchPresence);
    }
  }

  onstreampresence(streamPresence: StreamPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(streamPresence);
    }
  }

  onstreamdata(streamData: StreamData) {
    if (this.verbose && window && window.console) {
      console.log(streamData);
    }
  }

  send(message: CreateMatch | JoinMatch | LeaveMatch | MatchData | Rpc) {
    return new Promise((resolve, reject) => {
      if (this.socket == undefined) {
        reject("Socket connection has not been established yet.");
      } else {
        if ((<MatchData>message).match_data_send) {
          var m = <MatchData>message;
          m.match_data_send.data = btoa(JSON.stringify(m.match_data_send.data));
          this.socket.send(JSON.stringify(m));
          resolve();
        } else {
          const cid = this.generatecid();
          this.cIds[cid] = {
            resolve: resolve,
            reject: reject
          };

          // Add id for promise executor.
          (<any>message).cid = cid;
          this.socket.send(JSON.stringify(message));
        }
      }

      if (this.verbose && window && window.console) {
        console.log("Sent message: %o", message);
      }
    });
  }
};
