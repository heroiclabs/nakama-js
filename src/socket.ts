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

/** A response fron a channel join operation. */
export interface Channel {
  id: string,
  presences: [{}],
  self: {}
}

/** Join a realtime chat channel. */
export interface ChannelJoin {
  target: string,
  type: number,
  persistence: boolean,
  hidden: boolean
}

/** Leave a realtime chat channel. */
export interface ChannelLeave {
  channel_id: string
}

/** An incoming message on a realtime chat channel. */
export interface ChannelMessage {
  channel_id: string,
  message_id: string,
  code: number,
  sender_id: string,
  username: string,
  content: object,
  reference_id: string,
  create_time: string,
  update_time: string,
  persistent: boolean
}

/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
  channel_id: string,
  message_id: string,
  username: string,
  create_time: string,
  update_time: string,
  persistence: boolean
}

/** Send a message to a realtime chat channel. */
export interface ChannelMessageSend {
  channel_id: string,
  content: object,
}

/** Update a message previously sent to a realtime chat channel. */
export interface ChannelMessageUpdate {
  channel_id: string,
  message_id: string,
  content: object
}

/** Presence update for a particular realtime chat channel. */
export interface ChannelPresenceEvent {
  channel_id: string,
  joins: [{}],
  leaves: [{}]
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
  // Receive channel message.
  onchannelmessage: (channelMessage: ChannelMessage) => void;
  // Receive channel presence updates.
  onchannelpresence: (channelPresence: ChannelPresenceEvent) => void;
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
          message.match_data.op_code = parseInt(message.match_data.op_code);
          this.onmatchdata(message.match_data);
        } else if (message.matched_presence_event) {
          this.onmatchpresence(<MatchPresenceEvent>message.matched_presence_event);
        } else if (message.stream_presence_event) {
          this.onstreampresence(<StreamPresenceEvent>message.stream_presence_event);
        } else if (message.stream_data) {
          this.onstreamdata(<StreamData>message.stream_data);
        } else if (message.channel_message) {
          message.channel_message.content = JSON.parse(message.channel_message.content);
          this.onchannelmessage(<ChannelMessage>message.channel_message);
        } else if (message.channel_presence_event) {
          this.onchannelpresence(<ChannelPresenceEvent>message.channel_presence_event);
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

  onchannelmessage(channelMessage: ChannelMessage) {
    if (this.verbose && window && window.console) {
      console.log(channelMessage);
    }
  }

  onchannelpresence(channelPresence: ChannelPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(channelPresence);
    }
  }

  send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | CreateMatch | JoinMatch | LeaveMatch | MatchData | Rpc) {
    var m = <any>message;
    return new Promise((resolve, reject) => {
      if (this.socket == undefined) {
        reject("Socket connection has not been established yet.");
      } else {
        if (m.match_data_send) {
          m.match_data_send.data = btoa(JSON.stringify(m.match_data_send.data));
          m.match_data_send.op_code = m.match_data_send.op_code.toString();
          this.socket.send(JSON.stringify(m));
          resolve();
        } else {
          if (m.channel_message_send) {
            m.channel_message_send.content = JSON.stringify(m.channel_message_send.content);
          } else if (m.channel_message_update) {
            m.channel_message_update.content = JSON.stringify(m.channel_message_update.content);
          }

          const cid = this.generatecid();
          this.cIds[cid] = {
            resolve: resolve,
            reject: reject
          };

          // Add id for promise executor.
          m.cid = cid;
          this.socket.send(JSON.stringify(m));
        }
      }

      if (this.verbose && window && window.console) {
        console.log("Sent message: %o", m);
      }
    });
  }
};
