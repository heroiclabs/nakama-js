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

import {ApiNotification, ApiRpc} from "./api.gen";
import {Session} from "./session";
import {Notification} from "./client";
import {b64DecodeUnicode} from "./utils";
import {WebSocketAdapter} from "./web_socket_adapter"
import {WebSocketAdapterText} from "./web_socket_adapter_text"


/** Requires the set of keys K to exist in type T. */
type RequireKeys<T, K extends keyof T> = Omit<Partial<T>, K> & Pick<T, K>;

/** Stores function references for resolve/reject with a DOM Promise. */
interface PromiseExecutor {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

export interface Presence {
  user_id: string;
  session_id: string;
  username: string;
  node: string;
}

/** A response fron a channel join operation. */
export interface Channel {
  id: string;
  presences: Presence[];
  self: Presence;
}

/** Join a realtime chat channel. */
export interface ChannelJoin {
  channel_join: {
    target: string;
    type: number;
    persistence: boolean;
    hidden: boolean;
  };
}

/** Leave a realtime chat channel. */
export interface ChannelLeave {
  channel_leave: {
    channel_id: string;
  };
}

/** An incoming message on a realtime chat channel. */
export interface ChannelMessage {
  channel_id: string;
  message_id: string;
  code: number;
  sender_id: string;
  username: string;
  content: any;
  create_time: string;
  update_time: string;
  persistent: boolean;
  group_id: string;
  room_name: string;
  user_id_one: string;
  user_id_two: string;
}

/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
  channel_id: string;
  message_id: string;
  code: number;
  username: string;
  create_time: string;
  update_time: string;
  persistence: boolean;
}

/** Send a message to a realtime chat channel. */
export interface ChannelMessageSend {
  channel_message_send: {
    channel_id: string;
    content: any;
  };
}

/** Update a message previously sent to a realtime chat channel. */
export interface ChannelMessageUpdate {
  channel_message_update: {
    channel_id: string,
    message_id: string,
    content: any;
  };
}

/** Remove a message previously sent to a realtime chat channel. */
export interface ChannelMessageRemove {
  channel_message_remove: {
    channel_id: string;
    message_id: string;
  };
}

/** Presence update for a particular realtime chat channel. */
export interface ChannelPresenceEvent {
  channel_id: string;
  joins: Presence[];
  leaves: Presence[];
}

/** Stream identifier */
export interface StreamId {
  mode: number;
  subject: string;
  descriptor: string;
  label: string;
}

/** Stream data. */
export interface StreamData {
  stream: StreamId;
  stream_presence: Presence;
  data: string;
}

/** Presence updates. */
export interface StreamPresenceEvent {
  stream: StreamId;
  joins: Presence[];
  leaves: Presence[];
}

/** Match presence updates. */
export interface MatchPresenceEvent {
  match_id: string;
  joins: Presence[];
  leaves: Presence[];
}

/** Start a matchmaking process. */
export interface MatchmakerAdd {
  matchmaker_add: {
    min_count: number;
    max_count: number;
    query: string;
    string_properties?: Record<string, string>;
    numeric_properties?: Record<string, number>;
  };
}

/** Cancel a matchmaking process. */
export interface MatchmakerRemove {
  matchmaker_remove: {
    ticket: string;
  };
}

/** A reference to a user and their matchmaking properties. */
export interface MatchmakerUser {
  presence: Presence;
  string_properties?: Record<string, string>;
  numeric_properties?: Record<string, number>;
}

/** Matchmaking result. */
export interface MatchmakerMatched {
  ticket: string;
  match_id: string;
  token: string;
  users: MatchmakerUser[];
  self: MatchmakerUser;
}

/** A realtime match */
export interface Match {
  match_id: string;
  authoritative: boolean;
  label?: string;
  size: number;
  presences: Presence[];
  self: Presence;
}

/** Create a multiplayer match. */
export interface CreateMatch {
  match_create: {};
}

/** Join a multiplayer match. */
export interface JoinMatch {
  match_join: {
    match_id?: string;
    token?: string;
    metadata?: {};
  };
}

/** Leave a multiplayer match. */
export interface LeaveMatch {
  match_leave: {
    match_id: string;
  };
}

/** Match data */
export interface MatchData {
  match_id: string;
  op_code: number;
  data: any;
  presence: Presence;
}

/** Send a message contains match data. */
export interface MatchDataSend {
  match_data_send: RequireKeys<MatchData, "match_id" | "op_code" | "data">;
}

/** Execute an Lua function on the server. */
export interface Rpc {
  rpc: ApiRpc;
}

/** A snapshot of statuses for some set of users. */
export interface Status {
  presences: Presence[];
}

/** Start receiving status updates for some set of users. */
export interface StatusFollow {
  status_follow: {user_ids: string[];}
}

/** A batch of status updates for a given user. */
export interface StatusPresenceEvent {
  joins: Presence[];
  leaves: Presence[];
}

/** Stop receiving status updates for some set of users. */
export interface StatusUnfollow {
  status_unfollow: {user_ids: string[];};
}

/** Set the user's own status. */
export interface StatusUpdate {
  status_update: {status?: string;};
}

/** A socket connection to Nakama server. */
export interface Socket {
  // Connect to the server.
  connect(session: Session, createStatus: boolean): Promise<Session>;
  // Disconnect from the server.
  disconnect(fireDisconnectEvent: boolean): void;
  // Send message to the server. This method remains in the API for backwards compatibility. 
  // We recommend that you use the other socket-based methods below for improved
  // type checking and code readability.
  send(message: ChannelJoin | ChannelLeave | ChannelMessageSend |
    ChannelMessageUpdate | ChannelMessageRemove | CreateMatch | JoinMatch |
    LeaveMatch | MatchDataSend | MatchmakerAdd | MatchmakerRemove | Rpc |
    StatusFollow | StatusUnfollow | StatusUpdate): Promise<any>;

  /// Join the matchmaker pool and search for opponents on the server.
  addMatchmaker(query : string, minCount : number, maxCount : number,  
    stringProperties? : Record<string, string>, numericProperties? : Record<string, number>)
    : Promise<MatchmakerMatched>;
  
  // Create a multiplayer match on the server.
  createMatch() : Promise<Match>;

  // Subscribe to one or more users for their status updates.
  followUsers(user_ids: string[]) : Promise<Status>;

  // Join a chat channel on the server.
  joinChat(target: string, type: number, persistence: boolean, hidden: boolean) : Promise<Channel>;

  // Join a multiplayer match.
  joinMatch(match_id?: string, token?: string, metadata?: {}) : Promise<Match>; 

  // Leave a chat channel on the server.
  leaveChat(channel_id: string) : Promise<void>;

  // Leave a multiplayer match on the server.
  leaveMatch(matchId : string) : Promise<void>;

  // Remove a chat message from a chat channel on the server.
  removeChatMessage(channel_id: string, message_id: string) : Promise<ChannelMessageAck>;
  
  // Leave the matchmaker pool with the provided ticket.
  removeMatchmaker(ticket : string) : Promise<void>;

  // Execute an RPC function to the server.
  rpc(id?: string, payload?: string, http_key?: string) : Promise<ApiRpc>

  // Send input to a multiplayer match on the server.
  // When no presences are supplied the new match state will be sent to all presences.
  sendMatchState(matchId: string, opCode : number, data: any, presence? : Presence) : Promise<MatchData>;

  // Unfollow one or more users from their status updates.
  unfollowUsers(user_ids : string[]) : Promise<void>;

  // Update a chat message on a chat channel in the server.
  updateChatMessage(channel_id: string, message_id : string, content: any) : Promise<ChannelMessageAck>;

  // Update the status for the current user online.
  updateStatus(status? : string) : Promise<void>;

  // Send a chat message to a chat channel on the server.
  writeChatMessage(channel_id: string, content: any) : Promise<ChannelMessageAck>;

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
  private readonly cIds: { [key: string]: PromiseExecutor };
  private nextCid: number;
  private adapter : WebSocketAdapter = new WebSocketAdapterText();

  constructor(
      readonly host: string,
      readonly port: string,
      readonly useSSL: boolean = false,
      public verbose: boolean = false) {
    this.cIds = {};
    this.nextCid = 1;
  }  

  generatecid(): string {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }

  connect(session: Session, createStatus: boolean = false): Promise<Session> {
    if (this.adapter.isConnected) {
      return Promise.resolve(session);
    }

    const scheme = (this.useSSL) ? "wss://" : "ws://";
    this.adapter.connect(scheme, this.host, this.port, createStatus, session.token);

    this.adapter.onClose = (evt: Event) => {
      this.ondisconnect(evt);
    }

    this.adapter.onError = (evt: Event) => {
      this.onerror(evt);
    }

    this.adapter.onMessage = (message: any) => {
      if (this.verbose && window && window.console) {
        console.log("Response: %o", message);
      }

      // Inbound message from server.
      if (message.cid == undefined) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n: ApiNotification) => {
            const notification: Notification = {
              code: n.code,
              create_time: n.create_time,
              id: n.id,
              persistent: n.persistent,
              sender_id: n.sender_id,
              subject: n.subject,
              content: n.content ? JSON.parse(n.content) : undefined,
            };
            this.onnotification(notification);
          });
        } else if (message.match_data) {
          message.match_data.data = message.match_data.data != null ? JSON.parse(b64DecodeUnicode(message.match_data.data)) : null;
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
      this.adapter.onOpen = (evt: Event) => {
        if (this.verbose && window && window.console) {
          console.log(evt);
        }
        resolve(session);
      }
      this.adapter.onError = (evt: Event) => {
        reject(evt);
        this.adapter.close();
      }
    });
  }

  disconnect(fireDisconnectEvent: boolean = true) {
    if (this.adapter.isConnected) {
      this.adapter.close();
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

  send(message: ChannelJoin | ChannelLeave | ChannelMessageSend |
    ChannelMessageUpdate | ChannelMessageRemove | CreateMatch |
    JoinMatch | LeaveMatch | MatchDataSend | MatchmakerAdd | MatchmakerRemove |
    Rpc | StatusFollow | StatusUnfollow | StatusUpdate): Promise<any> {
    const m = message as any;
    return new Promise((resolve, reject) => {
      if (!this.adapter.isConnected) {
        reject("Socket connection has not been established yet.");
      } else {
        if (m.match_data_send) {
          this.adapter.send(m);
          resolve();
        } else {

          const cid = this.generatecid();
          this.cIds[cid] = {resolve, reject};

          // Add id for promise executor.
          m.cid = cid;
          this.adapter.send(m);
        }
      }

      if (this.verbose && window && window.console) {
        console.log("Sent message: %o", m);
      }
    });
  }


  addMatchmaker(query : string, minCount : number, maxCount : number,  
    stringProperties? : Record<string, string>, numericProperties? : Record<string, number>)
    : Promise<MatchmakerMatched> {

      const matchMakerAdd : MatchmakerAdd = 
      {
        "matchmaker_add": {
          min_count: minCount, 
          max_count: maxCount, 
          query: query, 
          string_properties: stringProperties, 
          numeric_properties: numericProperties
        }
      };

      return this.send(matchMakerAdd);
    }

  createMatch(): Promise<Match> {
    return this.send({match_create: {}});
  }
  
  followUsers(userIds : string[]): Promise<Status> {
    return this.send({status_follow: {user_ids: userIds}});
  }
  
  joinChat(target: string, type: number, persistence: boolean, hidden: boolean): Promise<Channel> {
    
    return this.send(
      {
        channel_join: {
            target: target,
            type: type,
            persistence: persistence,
            hidden: hidden     
        }
      }
    );
  }

  joinMatch(match_id?: string, metadata?: {}, token?: string): Promise<Match> {
    return this.send(
      {
        match_join: {
          match_id: match_id,
          metadata: metadata,
          token: token
        }
    });
  }

  leaveChat(channel_id: string): Promise<void> {
    return this.send({channel_leave: {channel_id: channel_id}});
  }
  
  leaveMatch(matchId: string): Promise<void> {
    return this.send({match_leave: {match_id: matchId}});
  }

  removeChatMessage(channel_id: string, message_id: string): Promise<ChannelMessageAck> {
    return this.send
    (
      {
        channel_message_remove: {
          channel_id: channel_id, 
          message_id: message_id
        }
      }
    );
  }

  removeMatchmaker(ticket: string): Promise<void> {
    return this.send({matchmaker_remove: {ticket: ticket}});
  }

  rpc(id?: string, payload?: string, http_key?: string) : Promise<ApiRpc> {
    return this.send(
      {
        rpc: {
          id: id,
          payload: payload,
          http_key: http_key,
        }
      });
  }

  sendMatchState(matchId: string, opCode : number, data: any, presence? : Presence): Promise<MatchData> {
    return this.send(
      {
        match_data_send: {
          match_id : matchId,
          op_code: opCode,
          data: data,
          presence: presence
        }
    });
  }

  unfollowUsers(user_ids : string[]): Promise<void> {
    return this.send({status_unfollow: {user_ids: user_ids}});
  }

  updateChatMessage(channel_id: string, message_id : string, content: any): Promise<ChannelMessageAck> {
    return this.send({channel_message_update: {channel_id: channel_id, message_id: message_id, content: content}});
  }

  updateStatus(status?: string): Promise<void> {
    return this.send({status_update: {status: status}});
  }

  writeChatMessage(channel_id: string, content: any): Promise<ChannelMessageAck> {
    return this.send({channel_message_send: {channel_id: channel_id, content: content}});
  }
};
