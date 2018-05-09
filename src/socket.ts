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
import { Notification } from "./client";

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
  channel_join: {
    target: string,
    type: number,
    persistence: boolean,
    hidden: boolean
  }
}

/** Leave a realtime chat channel. */
export interface ChannelLeave {
  channel_leave: {
    channel_id: string
  }
}

/** An incoming message on a realtime chat channel. */
export interface ChannelMessage {
  channel_id: string,
  message_id: string,
  code: number,
  sender_id: string,
  username: string,
  content: {},
  create_time: string,
  update_time: string,
  persistent: boolean
}

/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
  channel_id: string,
  message_id: string,
  code: number,
  username: string,
  create_time: string,
  update_time: string,
  persistence: boolean
}

/** Send a message to a realtime chat channel. */
export interface ChannelMessageSend {
  channel_message_send: {
    channel_id: string,
    content: {}
  }
}

/** Update a message previously sent to a realtime chat channel. */
export interface ChannelMessageUpdate {
  channel_message_update: {
    channel_id: string,
    message_id: string,
    content: {}
  }
}

/** Remove a message previously sent to a realtime chat channel. */
export interface ChannelMessageRemove {
  channel_message_remove: {
    channel_id: string,
    message_id: string
  }
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

/** Start a matchmaking process. */
export interface MatchmakerAdd {
  matchmaker_add: {
    min_count: number,
    max_count: number,
    query: string,
    string_properties: {},
    numeric_properties: {}
  }
}

/** Cancel a matchmaking process. */
export interface MatchmakerRemove {
  matchmaker_remove: {
    ticket: string
  }
}

/** Matchmaking result. */
export interface MatchmakerMatched {
  ticket: string,
  match_id: string,
  token: string,
  users: [{}],
  self: {}
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

/** A snapshot of statuses for some set of users. */
export interface Status {
  presences: object
}

/** Start receiving status updates for some set of users. */
export interface StatusFollow {
  user_ids: Array<string>
}

/** A batch of status updates for a given user. */
export interface StatusPresenceEvent {
  joins: [{}],
  leaves: [{}]
}

/** Stop receiving status updates for some set of users. */
export interface StatusUnfollow {
  user_ids: Array<string>
}

/** Set the user's own status. */
export interface StatusUpdate {
  status: string
}

/** A socket connection to Nakama server. */
export interface Socket {
  // Connect to the server.
  connect(session: Session, createStatus: boolean): Promise<Session>;
  // Disconnect from the server.
  disconnect(fireDisconnectEvent: boolean): void;
  // Handle disconnect events received from the socket.
  ondisconnect: (evt: Event) => void;
  // Handle error events received from the socket.
  onerror: (evt: Event) => void;
  // Receive notifications from the socket.
  onnotification: (notification: Notification) => void;
  // Receive match data updates.
  onmatchdata: (matchData: MatchData) => void;
  // Receive match presence updates.
  onmatchpresence: (matchPresence: MatchPresenceEvent) => void;
  // Receive matchmaking results.
  onmatchmakermatched: (matchmakerMatched: MatchmakerMatched) => void;
  // Receive status presence updates.
  onstatuspresence: (statusPresence: StatusPresenceEvent) => void;
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

  connect(session: Session, createStatus: boolean = false): Promise<Session> {
    if (this.socket != undefined) {
      return Promise.resolve(session);
    }

    const scheme = (this.useSSL) ? "wss://" : "ws://";
    const url = `${scheme}${this.host}:${this.port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(session.token)}`;
    const socket = new WebSocket(url);
    this.socket = socket;

    socket.onclose = (evt: Event) => {
      this.ondisconnect(evt);
      this.socket = undefined;
    }

    socket.onerror = (evt: Event) => {
      this.onerror(evt);
    }

    socket.onmessage = (evt: MessageEvent) => {
      const message = JSON.parse(evt.data);
      if (this.verbose && window && window.console) {
        console.log("Response: %o", message);
      }

      // Inbound message from server.
      if (message.cid == undefined) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n: ApiNotification) => {
            var notification: Notification = {
              code: n.code,
              create_time: n.create_time,
              id: n.id,
              persistent: n.persistent,
              sender_id: n.sender_id,
              subject: n.subject,
              content: n.content ? JSON.parse(n.content) : undefined
            };
            this.onnotification(notification);
          });
        } else if (message.match_data) {
          message.match_data.data = message.match_data.data != null ? JSON.parse(atob(message.match_data.data)) : null;
          message.match_data.op_code = parseInt(message.match_data.op_code);
          this.onmatchdata(message.match_data);
        } else if (message.match_presence_event) {
          this.onmatchpresence(<MatchPresenceEvent>message.match_presence_event);
        } else if (message.matchmaker_matched) {
          this.onmatchmakermatched(<MatchmakerMatched>message.matchmaker_matched);
        } else if (message.status_presence_event) {
          this.onstatuspresence(<StatusPresenceEvent>message.status_presence_event);
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

  onerror(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
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

  onnotification(notification: Notification) {
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

  onmatchmakermatched(matchmakerMatched: MatchmakerMatched) {
    if (this.verbose && window && window.console) {
      console.log(matchmakerMatched);
    }
  }

  onstatuspresence(statusPresence: StatusPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(statusPresence);
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

  send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | ChannelMessageRemove | CreateMatch | JoinMatch | LeaveMatch | MatchData | MatchmakerAdd | MatchmakerRemove | Rpc | StatusFollow | StatusUnfollow | StatusUpdate) {
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
