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

import {ApiNotification, ApiRpc} from "./api.gen";
import {Session} from "./session";
import {Notification} from "./client";
import {WebSocketAdapter, WebSocketAdapterText} from "./web_socket_adapter"
import {b64DecodeUnicode, b64EncodeUnicode} from "./utils";


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
  party_id : string;
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
  presences: Presence[];
}

/** Send a message contains match data. */
export interface MatchDataSend {
  match_data_send: RequireKeys<MatchData, "match_id" | "op_code" | "data">;
}

// Incoming information about a party.
export interface Party {
  party_id : string;
  open : boolean;
  max_size : number;
  self : Presence;
  leader : Presence;
  presences : Presence[];
}

export interface PartyCreate {
  party_create: {
    open : boolean;
    max_size : number;
  }
}

export interface PartyJoin {
  party_join: {
    party_id : string;
  }
}

// Leave a party.
export interface PartyLeave {
  party_leave: {
    party_id : string;
  }
}

// Promote a new party leader.
export interface PartyPromote {
  party_promote: {
    party_id : string;
    presence : Presence;
  }
}

// Announcement of a new party leader.
export interface PartyLeader {
  party_id : string;
  presence : Presence;
}

// Accept a request to join.
export interface PartyAccept {
  party_accept: {
    party_id : string;
    presence : Presence;
  }
}

// End a party, kicking all party members and closing it.
export interface PartyClose {
  party_close: {
    party_id : string;
  }
}

// Incoming party data delivered from the server.
export interface PartyData {
  party_id: string;
  presence: Presence;
  op_code: number;
  data: any;
}

// A client to server request to send data to a party.
export interface PartyDataSend {
  party_data_send: {
    party_id : string;
    op_code : number;
    data : any;
  }
}

// Incoming notification for one or more new presences attempting to join the party.
export interface PartyJoinRequest {
  party_id : string;
  presences : Presence[];
}

// Request a list of pending join requests for a party.
export interface PartyJoinRequestList {
  party_join_request_list: {
    party_id : string;
  }
}

// Begin matchmaking as a party.
export interface PartyMatchmakerAdd {
  party_matchmaker_add: {
    party_id : string;
    min_count : number;
    max_count : number;
    query : string;
    string_properties? : Record<string, string>;
    numeric_properties? : Record<string, number>;
  }
}

// Cancel a party matchmaking process using a ticket.
export interface PartyMatchmakerRemove {
  party_matchmaker_remove: {
    party_id : string;
    ticket : string;
  }
}

// A response from starting a new party matchmaking process.
export interface PartyMatchmakerMatched {
  party_id: string;
  ticket: string;
}

// Presence update for a particular party.
export interface PartyPresenceEvent {
  party_id : string;
  joins : Presence[];
  leaves : Presence[];
}

// Kick a party member, or decline a request to join.
export interface PartyRemove {
  party_remove: {
    party_id : string;
    presence : Presence;
  }
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

  // Accept a request to join.
  acceptPartyMember(party_id : string, presence : Presence) : Promise<void>;

  /// Join the matchmaker pool and search for opponents on the server.
  addMatchmaker(query : string, minCount : number, maxCount : number,
    stringProperties? : Record<string, string>, numericProperties? : Record<string, number>)
    : Promise<MatchmakerMatched>;

  // Begin matchmaking as a party.
  addMatchmakerParty(party_id: string, query : string, min_count : number, max_count : number,
    string_properties? : Record<string, string>, numericProperties? : Record<string, number>)
    : Promise<PartyMatchmakerMatched>;

  // End a party, kicking all party members and closing it.
  closeParty(party_id : string) : Promise<void>;

  // Create a multiplayer match on the server.
  createMatch() : Promise<Match>;

  // Create a party.
  createParty(open : boolean, max_size : number) : Promise<Party>;

  // Subscribe to one or more users for their status updates.
  followUsers(user_ids: string[]) : Promise<Status>;

  // Join a chat channel on the server.
  joinChat(target: string, type: number, persistence: boolean, hidden: boolean) : Promise<Channel>;

  // Join a party.
  joinParty(party_id: string) : Promise<void>;

  // Join a multiplayer match.
  joinMatch(match_id?: string, token?: string, metadata?: {}) : Promise<Match>;

  // Leave a chat channel on the server.
  leaveChat(channel_id: string) : Promise<void>;

  // Leave a multiplayer match on the server.
  leaveMatch(matchId : string) : Promise<void>;

  // Leave a party.
  leaveParty(party_id: string) : Promise<void>;

  // Request a list of pending join requests for a party.
  listPartyJoinRequests(party_id : string) : Promise<PartyJoinRequest>;

  // Promote a new party leader.
  promotePartyMember(party_id : string, party_member : Presence) : Promise<PartyLeader>;

  // Remove a chat message from a chat channel on the server.
  removeChatMessage(channel_id: string, message_id: string) : Promise<ChannelMessageAck>;

  // Leave the matchmaker pool with the provided ticket.
  removeMatchmaker(ticket : string) : Promise<void>;

  // Cancel a party matchmaking process using a ticket.
  removeMatchmakerParty(party_id : string, ticket : string) : Promise<void>;

  // Kick a party member, or decline a request to join.
  removePartyMember(party_id : string, presence : Presence) : Promise<void>;

  // Execute an RPC function to the server.
  rpc(id?: string, payload?: string, http_key?: string) : Promise<ApiRpc>

  // Send input to a multiplayer match on the server.
  // When no presences are supplied the new match state will be sent to all presences.
  sendMatchState(matchId: string, opCode : number, data: any, presence? : Presence[]) : Promise<void>;

  // Send data to a party.
  sendPartyData(party_id : string, opcode : number, data : any) : Promise<void>;

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

  // Receive party events.
  onparty: (party : Party) => void;

  // Receive party close events.
  onpartyclose: (partyClose : PartyClose) => void;

  // Receive party data updates.
  onpartydata: (partyData: PartyData) => void;

  // Receive party join requests, if party leader.
  onpartyjoinrequest: (partyJoinRequest: PartyJoinRequest) => void;

  // Receive announcements of a new party leader.
  onpartyleader: (partyLeader : PartyLeader) => void;

  // Receive a presence update for a party.
  onpartypresence: (partyPresence : PartyPresenceEvent) => void;

  // Receive matchmaking results.
  onpartymatchmakermatched: (matchmakerMatched: PartyMatchmakerMatched) => void;

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

  constructor(
      readonly host: string,
      readonly port: string,
      readonly useSSL: boolean = false,
      public verbose: boolean = false,
      readonly adapter : WebSocketAdapter = new WebSocketAdapterText()
      ) {
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
        console.log("Response: %o", JSON.stringify(message));
      }

      // Inbound message from server.
      if (message.cid == undefined) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n: ApiNotification) => {
              n.content = n.content ? JSON.parse(n.content) : undefined;
              this.onnotification(n);
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
        } else if (message.party_data) {
          message.party_data.data = message.party_data.data != null ? JSON.parse(b64DecodeUnicode(message.party_data.data)) : null;
          message.party_data.op_code = parseInt(message.party_data.op_code);
          this.onpartydata(<PartyData>message.party_data);
        } else if (message.on_party_close) {
          this.onpartyclose();
        } else if (message.party_join_request) {
          this.onpartyjoinrequest(message.party_join_request);
        } else if (message.party_leader) {
          this.onpartyleader(<PartyLeader> message.party_leader);
        } else if (message.party_matchmaker_ticket)  {
          this.onpartymatchmakermatched(message.party_matchmaker_ticket);
        } else if (message.party_presence_event) {
          this.onpartypresence(<PartyPresenceEvent> message.party_presence_event);
        } else if (message.party) {
          this.onparty(<Party> message.party);
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

  onparty(party : Party) {
    if (this.verbose && window && window.console) {
      console.log(party);
    }
  }

  onpartyclose() {
    if (this.verbose && window && window.console) {
      console.log("Party closed.");
    }
  }

  onpartyjoinrequest(partyJoinRequest : PartyJoinRequest) {
    if (this.verbose && window && window.console) {
      console.log(partyJoinRequest);
    }
  }

  onpartydata(partyData: PartyData) {
    if (this.verbose && window && window.console) {
      console.log(partyData);
    }
  }

  onpartyleader(partyLeader: PartyLeader) {
    if (this.verbose && window && window.console) {
      console.log(partyLeader);
    }
  }

  onpartymatchmakermatched(partyMatched: PartyMatchmakerMatched) {
    if (this.verbose && window && window.console) {
      console.log(partyMatched);
    }
  }


  onpartypresence(partyPresence: PartyPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(partyPresence);
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

  send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate |
    ChannelMessageRemove | CreateMatch | JoinMatch | LeaveMatch | MatchDataSend | MatchmakerAdd |
    MatchmakerRemove | PartyAccept | PartyClose | PartyCreate | PartyDataSend | PartyJoin |
    PartyJoinRequestList | PartyLeave | PartyMatchmakerAdd | PartyMatchmakerRemove | PartyPromote |
    PartyRemove | Rpc | StatusFollow | StatusUnfollow | StatusUpdate): Promise<any> {
    const untypedMessage = message as any;

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isConnected) {
        reject("Socket connection has not been established yet.");
      }
      else {
        if (untypedMessage.match_data_send) {
          untypedMessage.match_data_send.data = b64EncodeUnicode(JSON.stringify(untypedMessage.match_data_send.data));
          this.adapter.send(untypedMessage);
          resolve();
        }
        else if (untypedMessage.party_data_send) {
            untypedMessage.party_data_send.data = b64EncodeUnicode(JSON.stringify(untypedMessage.party_data_send.data));
            this.adapter.send(untypedMessage);
            resolve();
        }
        else {

          if (untypedMessage.channel_message_send) {
            untypedMessage.channel_message_send.content = JSON.stringify(untypedMessage.channel_message_send.content);
          } else if (untypedMessage.channel_message_update) {
            untypedMessage.channel_message_update.content = JSON.stringify(untypedMessage.channel_message_update.content);
          }

          const cid = this.generatecid();
          this.cIds[cid] = {resolve, reject};

          // Add id for promise executor.
          untypedMessage.cid = cid;
          this.adapter.send(untypedMessage);
        }
      }

      if (this.verbose && window && window.console) {
        console.log("Sent message: %o", untypedMessage);
      }
    });
  }

  acceptPartyMember(party_id: string, presence: Presence): Promise<void> {
    return this.send({party_accept: {party_id: party_id, presence: presence}});
  }

  async addMatchmaker(query : string, min_count : number, max_count : number,
    string_properties? : Record<string, string>, numeric_properties? : Record<string, number>)
    : Promise<MatchmakerMatched> {

      const response = await this.send({
        "matchmaker_add": {
          min_count: min_count,
          max_count: max_count,
          query: query,
          string_properties: string_properties,
          numeric_properties: numeric_properties
        }
      });

      return response.matchmaker_ticket;
  }

  async addMatchmakerParty(party_id: string, query: string, min_count: number, max_count: number, string_properties?: Record<string, string>, numeric_properties?: Record<string, number>): Promise<PartyMatchmakerMatched> {

    const response = await this.send({
      party_matchmaker_add: {
        party_id : party_id,
        min_count: min_count,
        max_count: max_count,
        query: query,
        string_properties: string_properties,
        numeric_properties: numeric_properties
    }});

    return response.party_matchmaker_ticket;
  }

  async closeParty(party_id: string): Promise<void> {
    return await this.send({party_close: {party_id: party_id}});
  }

  async createMatch(): Promise<Match> {
    const response = await this.send({match_create: {}});
    return response.match;
  }

  async createParty(open: boolean, max_size: number): Promise<Party> {
    const response = await this.send({party_create: {open: open, max_size: max_size}});
    return response.party_create;
  }

  async followUsers(userIds : string[]): Promise<Status> {
    const response = await this.send({status_follow: {user_ids: userIds}});
    return response.status;
  }

  async joinChat(target: string, type: number, persistence: boolean, hidden: boolean): Promise<Channel> {

    const response = await this.send({
        channel_join: {
            target: target,
            type: type,
            persistence: persistence,
            hidden: hidden
        }
      }
    );

    return response.channel;
  }

  async joinMatch(match_id?: string, token?: string, metadata?: {}): Promise<Match> {

    const join : JoinMatch = {match_join: {metadata: metadata}};

    if (token)
    {
      join.match_join.token = token;
    }
    else
    {
      join.match_join.match_id = match_id;
    }

    const response = await this.send(join);
    return response.match;
  }

  async joinParty(party_id: string): Promise<void> {
    return await this.send({party_join: {party_id: party_id}});
  }

  leaveChat(channel_id: string): Promise<void> {
    return this.send({channel_leave: {channel_id: channel_id}});
  }

  leaveMatch(matchId: string): Promise<void> {
    return this.send({match_leave: {match_id: matchId}});
  }

  leaveParty(party_id: string): Promise<void> {
    return this.send({party_leave: {party_id: party_id}});
  }

  async listPartyJoinRequests(party_id: string): Promise<PartyJoinRequest> {
    const response = await this.send({party_join_request_list: {party_id: party_id}});
    return response.party_join_request;
  }

  async promotePartyMember(party_id: string, party_member: Presence): Promise<PartyLeader> {
    const response = await this.send({party_promote: {party_id: party_id, presence: party_member}});
    return response.party_leader;
  }

  async removeChatMessage(channel_id: string, message_id: string): Promise<ChannelMessageAck> {
    const response = await this.send(
      {
        channel_message_remove: {
          channel_id: channel_id,
          message_id: message_id
        }
      }
    );

    return response.channel_message_ack;
  }

  removeMatchmaker(ticket: string): Promise<void> {
    return this.send({matchmaker_remove: {ticket: ticket}});
  }

  removeMatchmakerParty(party_id: string, ticket: string): Promise<void> {
    return this.send(
      {
        party_matchmaker_remove: {
          party_id: party_id,
          ticket: ticket
        }
      })
  }

  async removePartyMember(party_id: string, member: Presence): Promise<void> {
    return this.send({party_remove: {
      party_id: party_id,
      presence: member
    }});
  }

  async rpc(id?: string, payload?: string, http_key?: string) : Promise<ApiRpc> {
    const response = await this.send(
      {
        rpc: {
          id: id,
          payload: payload,
          http_key: http_key,
        }
      });

      return response.rpc;
  }

  async sendMatchState(matchId: string, opCode : number, data: any, presences? : Presence[]): Promise<void> {
    return this.send(
      {
        match_data_send: {
          match_id : matchId,
          op_code: opCode,
          data: data,
          presences: presences ?? []
        }
    });
  }

  sendPartyData(party_id: string, op_code: number, data: any): Promise<void> {
    return this.send({party_data_send: {party_id: party_id, op_code: op_code, data: data}})
  }

  unfollowUsers(user_ids : string[]): Promise<void> {
    return this.send({status_unfollow: {user_ids: user_ids}});
  }

  async updateChatMessage(channel_id: string, message_id : string, content: any): Promise<ChannelMessageAck> {
    const response = await this.send({channel_message_update: {channel_id: channel_id, message_id: message_id, content: content}});
    return response.channel_message_ack;
  }

  updateStatus(status?: string): Promise<void> {
    return this.send({status_update: {status: status}});
  }

  async writeChatMessage(channel_id: string, content: any): Promise<ChannelMessageAck> {
    const response = await this.send({channel_message_send: {channel_id: channel_id, content: content}});
    return response.channel_message_ack;
  }
};
