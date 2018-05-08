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
  ApiChannelMessageList,
  ApiCreateGroupRequest,
  ApiDeleteStorageObjectsRequest,
  ApiFriends,
  ApiGroup,
  ApiGroupList,
  ApiGroupUserList,
  ApiLeaderboardRecord,
  ApiLeaderboardRecordList,
  ApiMatchList,
  ApiNotificationList,
  ApiSession,
  ApiReadStorageObjectsRequest,
  ApiRpc,
  ApiStorageObjectAcks,
  ApiStorageObjectList,
  ApiStorageObjects,
  ApiUpdateAccountRequest,
  ApiUpdateGroupRequest,
  ApiUsers,
  ApiUserGroupList,
  ApiWriteStorageObjectsRequest,
  ConfigurationParameters,
  NakamaApi,
  ProtobufEmpty,
} from "./api.gen";

import { Session } from "./session";
import { DefaultSocket, Socket } from "./socket";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7350";
const DEFAULT_SERVER_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 7000;

/** Response for an RPC function executed on the server. */
export interface RpcResponse {
  // The identifier of the function.
  id?: string;
  // The payload of the function which must be a JSON object.
  payload?: object;
}

/** Represents a complete leaderboard record with all scores and associated metadata. */
export interface LeaderboardRecord {
  // The UNIX time when the leaderboard record was created.
  create_time?: string;
  // The UNIX time when the leaderboard record expires.
  expiry_time?: string;
  // The ID of the leaderboard this score belongs to.
  leaderboard_id?: string;
  // Metadata.
  metadata?: object;
  // The number of submissions to this score record.
  num_score?: number;
  // The ID of the score owner, usually a user or group.
  owner_id?: string;
  // The rank of this record.
  rank?: number;
  // The score value.
  score?: number;
  // An optional subscore value.
  subscore?: number;
  // The UNIX time when the leaderboard record was updated.
  update_time?: string;
  // The username of the score owner, if the owner is a user.
  username?: string;
}

/** A set of leaderboard records, may be part of a leaderboard records page or a batch of individual records. */
export interface LeaderboardRecordList {
  // The cursor to send when retireving the next page, if any.
  next_cursor?: string;
  // A batched set of leaderobard records belonging to specified owners.
  owner_records?: Array<LeaderboardRecord>;
  // The cursor to send when retrieving the previous page, if any.
  prev_cursor?: string;
  // A list of leaderboard records.
  records?: Array<LeaderboardRecord>;
}

/** Record values to write. */
export interface WriteLeaderboardRecord {
  // Optional record metadata.
  metadata?: object;
  // The score value to submit.
  score?: string;
  // An optional secondary value.
  subscore?: string;
}

// The object to store.
export interface WriteStorageObject {
  // The collection to store the object.
  collection?: string;
  // The key for the object within the collection.
  key?: string;
  // The read access permissions for the object.
  permission_read?: number;
  // The write access permissions for the object.
  permission_write?: number;
  // The value of the object.
  value?: object;
  // The version hash of the object to check. Possible values are: ["", "*", "#hash#"].
  version?: string;
}

// An object within the storage engine.
export interface StorageObject {
  // The collection which stores the object.
  collection?: string;
  // The UNIX time when the object was created.
  create_time?: string;
  // The key of the object within the collection.
  key?: string;
  // The read access permissions for the object.
  permission_read?: number;
  // The write access permissions for the object.
  permission_write?: number;
  // The UNIX time when the object was last updated.
  update_time?: string;
  // The user owner of the object.
  user_id?: string;
  // The value of the object.
  value?: object;
  // The version hash of the object.
  version?: string;
}

// List of storage objects.
export interface StorageObjectList {
  // The cursor associated with the query a page of results.
  cursor?: string;
  // The list of storage objects.
  objects: Array<StorageObject>;
}

// Batch of storage objects.
export interface StorageObjects {
  // The batch of storage objects.
  objects: Array<StorageObject>;
}

/** A message sent on a channel. */
export interface ChannelMessage {
  // The channel this message belongs to.
  channel_id?: string;
  // The code representing a message type or category.
  code?: number;
  // The content payload.
  content?: object;
  // The UNIX time when the message was created.
  create_time?: string;
  // The unique ID of this message.
  message_id?: string;
  // True if the message was persisted to the channel's history, false otherwise.
  persistent?: boolean;
  // Another message ID reference, if any.
  reference_id?: string;
  // Message sender, usually a user ID.
  sender_id?: string;
  // The UNIX time when the message was last updated.
  update_time?: string;
  // The username of the message sender, if any.
  username?: string;
}

/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
  // A list of messages.
  messages?: Array<ChannelMessage>;
  // The cursor to send when retireving the next page, if any.
  next_cursor?: string;
  // The cursor to send when retrieving the previous page, if any.
  prev_cursor?: string;
}

/** A user in the system. */
export interface User {
  // A URL for an avatar image.
  avatar_url?: string;
  // The UNIX time when the user was created.
  create_time?: string;
  // The display name of the user.
  display_name?: string;
  // Number of related edges to this user.
  edge_count?: number;
  // The Facebook id in the user's account.
  facebook_id?: string;
  // The Apple Game Center in of the user's account.
  gamecenter_id?: string;
  // The Google id in the user's account.
  google_id?: string;
  // The id of the user's account.
  id?: string;
  // The language expected to be a tag which follows the BCP-47 spec.
  lang_tag?: string;
  // The location set by the user.
  location?: string;
  // Additional information stored as a JSON object.
  metadata?: {};
  // Indicates whether the user is currently online.
  online?: boolean;
  // The Steam id in the user's account.
  steam_id?: string;
  // The timezone set by the user.
  timezone?: string;
  // The UNIX time when the user was last updated.
  update_time?: string;
  // The username of the user's account.
  username?: string;
}

/** A collection of zero or more users. */
export interface Users {
  // The User objects.
  users?: Array<User>;
}

/** A friend of a user. */
export interface Friend {
  // The friend status.
  state?: number;
  // The user object.
  user?: User;
}

/** A collection of zero or more friends of the user. */
export interface Friends {
  // The Friend objects.
  friends?: Array<Friend>;
}

/** A user-role pair representing the user's role in a group. */
export interface GroupUser {
  // The user.
  user?: User;
  // Their role within the group.
  state?: number;
}

/** A list of users belonging to a group along with their role in it. */
export interface GroupUserList {
  // The user-role pairs.
  group_users?: Array<GroupUser>;
}

/** A group in the server. */
export interface Group {
  // A URL for an avatar image.
  avatar_url?: string;
  // The UNIX time when the group was created.
  create_time?: string;
  // The id of the user who created the group.
  creator_id?: string;
  // A description for the group.
  description?: string;
  // The current count of all members in the group.
  edge_count?: number;
  // The id of a group.
  id?: string;
  // The language expected to be a tag which follows the BCP-47 spec.
  lang_tag?: string;
  // The maximum number of members allowed.
  max_count?: number;
  // Additional information stored as a JSON object.
  metadata?: {};
  // The unique name of the group.
  name?: string;
  // Anyone can join open groups, otherwise only admins can accept members.
  open?: boolean;
  // The UNIX time when the group was last updated.
  update_time?: string;
}

/** One or more groups returned from a listing operation. */
export interface GroupList {
  // A cursor used to get the next page.
  cursor?: string;
  // One or more groups.
  groups?: Array<Group>;
}

/** A group-role pair representing the user's groups and their role in each. */
export interface UserGroup {
  // The group.
  group?: Group;
  // The user's role within the group.
  state?: number;
}

/** A list of groups belonging to a user along with their role in it. */
export interface UserGroupList {
  // The group-role pairs.
  user_groups?: Array<UserGroup>;
}

/** A notification in the server. */
export interface Notification {
  // Category code for this notification.
  code?: number;
  // Content of the notification in JSON.
  content?: {};
  // The UNIX time when the notification was created.
  create_time?: string;
  // ID of the Notification.
  id?: string;
  // True if this notification was persisted to the database.
  persistent?: boolean;
  // ID of the sender, if a user. Otherwise 'null'.
  sender_id?: string;
  // Subject of the notification.
  subject?: string;
}

/** A collection of zero or more notifications. */
export interface NotificationList {
  // Use this cursor to paginate notifications. Cache this to catch up to new notifications.
  cacheable_cursor?: string;
  // Collection of notifications.
  notifications?: Array<Notification>;
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

  /** Add users to a group, or accept their join requests. */
  addGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.addGroupUsers(groupId, { user_ids: ids }).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
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

  /** Create a new group with the current user as the creator and superadmin. */
  createGroup(session: Session, request: ApiCreateGroupRequest): Promise<Group> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.createGroup(request).then((response: ApiGroup) => {
      return Promise.resolve({
        avatar_url: response.avatar_url,
        create_time: response.create_time,
        creator_id: response.creator_id,
        description: response.description,
        edge_count: response.edge_count,
        id: response.id,
        lang_tag: response.lang_tag,
        max_count: response.max_count,
        metadata: response.metadata ? JSON.parse(response.metadata) : null,
        name: response.name,
        open: response.open,
        update_time: response.update_time
      });
    });
  }

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

  /** Delete a group the user is part of and has permissions to delete. */
  deleteGroup(session: Session, groupId: string): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.deleteGroup(groupId).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Delete one or more notifications */
  deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);

    const urlPath = "/v2/notification";

    const queryParams = {
      ids: ids
    } as any;
    const urlQuery = "?" + Object.keys(queryParams)
      .map(k => {
        if (queryParams[k] instanceof Array) {
          return queryParams[k].reduce((prev: any, curr: any) => {
            return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
          }, "");
        } else {
          if (queryParams[k] != null) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
          }
        }
      })
      .join("");

    const fetchOptions = {...{ method: "DELETE" /*, keepalive: true */ }} as any;
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    } as any;

    if (this.configuration.bearerToken) {
      headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
    } else if (this.configuration.username) {
      headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
    }

    fetchOptions.headers = {...headers};

    return Promise.race([
      fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.configuration.timeoutMs, "Request timed out.")
      ),
    ]).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Delete one or more storage objects */
  deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.deleteStorageObjects(request).then((response: ProtobufEmpty) => {
      return Promise.resolve(response != undefined);
    });
  }

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
  getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<Users> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.getUsers(ids, usernames, facebookIds).then((response: ApiUsers) => {
      var result: Users = {
        users: []
      };

      if (response.users == null) {
        return Promise.resolve(result);
      }

      response.users!.forEach(u => {
        result.users!.push({
          avatar_url: u.avatar_url,
          create_time: u.create_time,
          display_name: u.display_name,
          edge_count: u.edge_count,
          facebook_id: u.facebook_id,
          gamecenter_id: u.gamecenter_id,
          google_id: u.google_id,
          id: u.id,
          lang_tag: u.lang_tag,
          location: u.location,
          online: u.online,
          steam_id: u.steam_id,
          timezone: u.timezone,
          update_time: u.update_time,
          username: u.username,
          metadata: u.metadata ? JSON.parse(u.metadata) : null
        })
      });
      return Promise.resolve(result);
    });
  }

  /** Join a group that's open, or send a request to join a group that is closed. */
  joinGroup(session: Session, groupId: string): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.joinGroup(groupId, {}).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Kick users from a group, or decline their join requests. */
  kickGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.kickGroupUsers(groupId, { user_ids: ids }).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Leave a group the user is part of. */
  leaveGroup(session: Session, groupId: string): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.leaveGroup(groupId, {}).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** List a channel's message history. */
  listChannelMessages(session: Session, channelId: string, limit?: number, forward?: boolean, cursor?: string): Promise<ChannelMessageList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listChannelMessages(channelId, limit, forward, cursor).then((response: ApiChannelMessageList) => {
      var result: ChannelMessageList = {
        messages: [],
        next_cursor: response.next_cursor,
        prev_cursor: response.prev_cursor
      };

      if (response.messages == null) {
        return Promise.resolve(result);
      }

      response.messages!.forEach(m => {
        result.messages!.push({
          channel_id: m.channel_id,
          code: m.code,
          create_time: m.create_time,
          message_id: m.message_id,
          persistent: m.persistent,
          sender_id: m.sender_id,
          update_time: m.update_time,
          username: m.username,
          content: m.content ? JSON.parse(m.content) : null
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List a group's users. */
  listGroupUsers(session: Session, groupId: string): Promise<GroupUserList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listGroupUsers(groupId).then((response: ApiGroupUserList) => {
      var result: GroupUserList = {
        group_users: []
      };

      if (response.group_users == null) {
        return Promise.resolve(result);
      }

      response.group_users!.forEach(gu => {
        result.group_users!.push({
          user: {
            avatar_url: gu.user!.avatar_url,
            create_time: gu.user!.create_time,
            display_name: gu.user!.display_name,
            edge_count: gu.user!.edge_count,
            facebook_id: gu.user!.facebook_id,
            gamecenter_id: gu.user!.gamecenter_id,
            google_id: gu.user!.google_id,
            id: gu.user!.id,
            lang_tag: gu.user!.lang_tag,
            location: gu.user!.location,
            online: gu.user!.online,
            steam_id: gu.user!.steam_id,
            timezone: gu.user!.timezone,
            update_time: gu.user!.update_time,
            username: gu.user!.username,
            metadata: gu.user!.metadata ? JSON.parse(gu.user!.metadata!) : null
          },
          state: gu.state
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List a user's groups. */
  listUserGroups(session: Session, userId: string): Promise<UserGroupList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listUserGroups(userId).then((response: ApiUserGroupList) => {
      var result: UserGroupList = {
        user_groups: []
      };

      if (response.user_groups == null) {
        return Promise.resolve(result);
      }

      response.user_groups!.forEach(ug => {
        result.user_groups!.push({
          group: {
            avatar_url: ug.group!.avatar_url,
            create_time: ug.group!.create_time,
            creator_id: ug.group!.creator_id,
            description: ug.group!.description,
            edge_count: ug.group!.edge_count,
            id: ug.group!.id,
            lang_tag: ug.group!.lang_tag,
            max_count: ug.group!.max_count,
            metadata: ug.group!.metadata ? JSON.parse(ug.group!.metadata!) : null,
            name: ug.group!.name,
            open: ug.group!.open,
            update_time: ug.group!.update_time
          },
          state: ug.state
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List groups based on given filters. */
  listGroups(session: Session, name?: string, cursor?: string, limit?: number): Promise<GroupList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listGroups(name, cursor, limit).then((response: ApiGroupList) => {
      var result: GroupList = {
        groups: []
      };

      if (response.groups == null) {
        return Promise.resolve(result);
      }

      result.cursor = response.cursor;
      response.groups!.forEach(ug => {
        result.groups!.push({
          avatar_url: ug!.avatar_url,
          create_time: ug!.create_time,
          creator_id: ug!.creator_id,
          description: ug!.description,
          edge_count: ug!.edge_count,
          id: ug!.id,
          lang_tag: ug!.lang_tag,
          max_count: ug!.max_count,
          metadata: ug!.metadata ? JSON.parse(ug!.metadata!) : null,
          name: ug!.name,
          open: ug!.open,
          update_time: ug!.update_time
        });
      });
      return Promise.resolve(result);
    });
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
  listFriends(session: Session): Promise<Friends> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listFriends().then((response: ApiFriends) => {
      var result: Friends = {
        friends: []
      };

      if (response.friends == null) {
        return Promise.resolve(result);
      }

      response.friends!.forEach(f => {
        result.friends!.push({
          user: {
            avatar_url: f.user!.avatar_url,
            create_time: f.user!.create_time,
            display_name: f.user!.display_name,
            edge_count: f.user!.edge_count,
            facebook_id: f.user!.facebook_id,
            gamecenter_id: f.user!.gamecenter_id,
            google_id: f.user!.google_id,
            id: f.user!.id,
            lang_tag: f.user!.lang_tag,
            location: f.user!.location,
            online: f.user!.online,
            steam_id: f.user!.steam_id,
            timezone: f.user!.timezone,
            update_time: f.user!.update_time,
            username: f.user!.username,
            metadata: f.user!.metadata ? JSON.parse(f.user!.metadata!) : null
          },
          state: f.state
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List leaderboard records */
  listLeaderboardRecords(session: Session, leaderboardId: string, ownerIds?: Array<string>, limit?: number, cursor?: string): Promise<LeaderboardRecordList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listLeaderboardRecords(leaderboardId, ownerIds, limit, cursor).then((response: ApiLeaderboardRecordList) => {
      var list: LeaderboardRecordList = {
        next_cursor: response.next_cursor,
        prev_cursor: response.prev_cursor,
        owner_records: [],
        records: []
      };

      if (response.owner_records != null) {
        response.owner_records!.forEach(o => {
          list.owner_records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score,
            owner_id: o.owner_id,
            rank: Number(o.rank),
            score: Number(o.score),
            subscore: Number(o.subscore),
            update_time: o.update_time,
            username: o.username
          })
        })
      }

      if (response.records != null) {
        response.records!.forEach(o => {
          list.records!.push({
            expiry_time: o.expiry_time,
            leaderboard_id: o.leaderboard_id,
            metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
            num_score: o.num_score,
            owner_id: o.owner_id,
            rank: Number(o.rank),
            score: Number(o.score),
            subscore: Number(o.subscore),
            update_time: o.update_time,
            username: o.username
          })
        })
      }

      return Promise.resolve(list);
    });
  }

  /** Fetch list of running matches. */
  listMatches(session: Session, limit?: number, authoritative?: boolean, label?: string, minSize?: number, maxSize?: number): Promise<ApiMatchList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listMatches(limit, authoritative, label, minSize, maxSize);
  }

  /** Fetch list of notifications. */
  listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<NotificationList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listNotifications(limit, cacheableCursor).then((response: ApiNotificationList) => {
      var result: NotificationList = {
        cacheable_cursor: response.cacheable_cursor,
        notifications: [],
      };

      if (response.notifications == null) {
        return Promise.resolve(result);
      }

      response.notifications!.forEach(n => {
        result.notifications!.push({
          code: n.code,
          create_time: n.create_time,
          id: n.id,
          persistent: n.persistent,
          sender_id: n.sender_id,
          subject: n.subject,
          content: n.content ? JSON.parse(n.content) : undefined
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List storage objects. */
  listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.listStorageObjects(collection, userId, limit, cursor).then((response: ApiStorageObjectList) => {
      var result: StorageObjectList = {
        objects: [],
        cursor: response.cursor
      };

      if (response.objects == null) {
        return Promise.resolve(result);
      }

      response.objects!.forEach(o => {
        result.objects.push({
          collection: o.collection,
          key: o.key,
          permission_read: o.permission_read,
          permission_write: o.permission_write,
          value: o.value ? JSON.parse(o.value) : null,
          version: o.version,
          user_id: o.user_id,
          create_time: o.create_time,
          update_time: o.update_time
        })
      });
      return Promise.resolve(result);
    });
  }

  /** Promote users in a group to the next role up. */
  promoteGroupUsers(session: Session, groupId: string, ids?: Array<string>): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.promoteGroupUsers(groupId, { user_ids: ids }).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Fetch storage objects. */
  readStorageObjects(session: Session, request: ApiReadStorageObjectsRequest): Promise<StorageObjects> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.readStorageObjects(request).then((response: ApiStorageObjects) => {
      var result: StorageObjects = {objects: []};

      if (response.objects == null) {
        return Promise.resolve(result);
      }

      response.objects!.forEach(o => {
        result.objects.push({
          collection: o.collection,
          key: o.key,
          permission_read: o.permission_read,
          permission_write: o.permission_write,
          value: o.value ? JSON.parse(o.value) : null,
          version: o.version,
          user_id: o.user_id,
          create_time: o.create_time,
          update_time: o.update_time
        })
      });
      return Promise.resolve(result);
    });
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

  /** Update a group the user is part of and has permissions to update. */
  updateGroup(session: Session, groupId: string, request: ApiUpdateGroupRequest): Promise<boolean> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.updateGroup(groupId, request).then((response: ProtobufEmpty) => {
      return response !== undefined;
    });
  }

  /** Write a record to a leaderboard. */
  writeLeaderboardRecord(session: Session, leaderboardId: string, request: WriteLeaderboardRecord): Promise<LeaderboardRecord> {
    this.configuration.bearerToken = (session && session.token);
    return this.apiClient.writeLeaderboardRecord(leaderboardId, {
      metadata: request.metadata ? JSON.stringify(request.metadata) : undefined,
      score: request.score,
      subscore: request.subscore
    }).then((response: ApiLeaderboardRecord) => {
      return Promise.resolve({
        expiry_time: response.expiry_time,
        leaderboard_id: response.leaderboard_id,
        metadata: response.metadata ? JSON.parse(response.metadata) : undefined,
        num_score: response.num_score,
        owner_id: response.owner_id,
        score: Number(response.score),
        subscore: Number(response.subscore),
        update_time: response.update_time,
        username: response.username
      });
    });
  }

  /** Write storage objects. */
  writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks> {
    this.configuration.bearerToken = (session && session.token);

    var request: ApiWriteStorageObjectsRequest = {objects: []};
    objects.forEach(o => {
      request.objects!.push({
        collection: o.collection,
        key: o.key,
        permission_read: o.permission_read,
        permission_write: o.permission_write,
        value: JSON.stringify(o.value),
        version: o.version
      })
    })

    return this.apiClient.writeStorageObjects(request);
  }
};
