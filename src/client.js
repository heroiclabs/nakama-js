/*
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

const VERSION = '0.1.0';
const DEFAULT_SERVER_KEY = 'defaultkey';
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = '7350';

/**
 * Build a string which looks like a UUIDv4 type.
 */
const uuidv4 = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
    const randomNumber = Math.random() * 16 | 0,
          result =
            character === 'x' ?
              randomNumber :
              randomNumber & 0x3 | 0x8;
    return result.toString(16);
  });
};

export class AuthenticateRequest {
  constructor(message) {
    this.message_ = message;
  }

  static custom(id) {
    return new AuthenticateRequest({
      custom: id
    });
  }

  static device(id) {
    return new AuthenticateRequest({
      device: id
    });
  }

  static email(email, password) {
    return new AuthenticateRequest({
      email: {
        email: email,
        password: password
      }
    });
  }

  static facebook(oauthToken) {
    return new AuthenticateRequest({
      facebook: oauthToken
    });
  }

  static google(oauthToken) {
    return new AuthenticateRequest({
      google: oauthToken
    });
  }
}

export class Client {
  constructor(serverkey = DEFAULT_SERVER_KEY,
              host = DEFAULT_HOST,
              port = DEFAULT_PORT,
              lang = 'en',
              ssl = false,
              verbose = false) {
    this.serverKey = serverkey;
    this.host = host;
    this.port = port;
    this.lang = lang;
    this.ssl = ssl;
    this.verbose = verbose;
    this.serverTimestamp = 0;

    // private
    this.socket_ = null;
    this.collationIds_ = new Map();
  }

  ondisconnect(event) {}
  ontopicmessage(event) {}
  ontopicpresence(event) {}

  login(request) {
    return this.authenticate_(request, '/user/login');
  }

  register(request) {
    return this.authenticate_(request, '/user/register');
  }

  disconnect() {
    this.socket_.close();
  }

  logout() {
    return this.send_({ logout: {} }, null, "Logout")
  }

  connect(session) {
    if (this.socket_ != null) {
      return new Promise((resolve, reject) => {
        resolve(session);
      });
    }

    const searchParams = new URLSearchParams();
    searchParams.append("token", session.token_);
    searchParams.append("lang", this.lang);
    searchParams.append("format", "json");

    const url = new URL(window.location.href);
    url.protocol = (this.ssl) ? 'wss' : 'ws';
    url.hostname = this.host;
    url.port = this.port;
    url.search = searchParams.toString();
    url.pathname = '/api';

    this.socket_ = new WebSocket(url.toString());
    this.socket_.onclose = (event) => {
      this.ondisconnect(event);
      this.socket_ = null;
    };

    this.socket_.onmessage = (event) => {
      var message = JSON.parse(event.data)

      if (this.verbose && window.console && !message.heartbeat) {
        console.log("Response: %o", message);
      }

      if (!message.collationId) {
        if (message.heartbeat) {
          this.serverTimestamp = message.heartbeat
        } else if (message.topicMessage) {
          message.topicMessage.data = JSON.parse(atob(message.topicMessage.data))
          this.ontopicmessage(message.topicMessage);
        } else if (message.topicPresence) {
          this.ontopicpresence(message.topicPresence);
        } else {
          if (window.console) {
            console.error("Unrecognized message received: %o", message);
          }
        }
      } else {
        var p = this.collationIds_[message.collationId]
        if (!p) {
          if (window.console) {
            console.error("Did not find promise for message: %o", message)
          }
          return
        }
        this.collationIds_.delete(message.collationId)

        if (message.error) {
          p.reject(message.error);
        } else if (message.self) {
          p.resolve(message.self);
        } else if (message.users) {
          message.users.users.forEach(function(user) {
            // translate base64 into json object
            user.metadata = JSON.parse(atob(user.metadata));
          })
          p.resolve(message.users.users);
        } else if (message.storageData) {
          p.resolve(message.storageData);
        } else if (message.storageKeys) {
          p.resolve(message.storageKeys);
        } else if (message.friends) {
          message.friends.friends.forEach(function(friend) {
            // translate base64 into json object
            friend.user.metadata = JSON.parse(atob(friend.user.metadata));
          })
          p.resolve(message.friends);
        } else if (message.topics) {
          p.resolve(message.topics);
        } else if (message.topicMessageAck) {
          p.resolve(message.topicMessageAck);
        } else if (message.topicMessages) {
          message.topicMessages.messages.forEach(function(message) {
            // translate base64 into json object
            message.data = JSON.parse(atob(message.data))
          })
          p.resolve(message.topicMessages);
        } else {
          // if the object has properties, other than the collationId, log a warning
          if (window.console && Object.keys(message).length > 1) {
            console.error("Unrecognized message received: %o", message);
            p.resolve(message);
          } else {
            p.resolve();
          }
        }
      }
    }

    return new Promise((resolve, reject) => {
      this.socket_.onopen = (event) => {
        resolve(session);
      };
      this.socket_.onerror = (event) => {
        reject(event);
        this.socket_.close();
        this.ondisconnect(event);
        this.socket_ = null;
      }
    });
  }

  send(request) {
    var collationId = uuidv4();
    var message = request.build_();
    message.collationId = collationId;
    return this.send_(message, collationId, request.constructor.name);
  }

  send_(message, collationId, requestName) {
    if (this.socket_ == null) {
      return new Promise((resolve, reject) => {
        reject("Socket connection has not been established yet.");
      });
    }

    return new Promise((resolve, reject) => {
      if (collationId) {
        this.collationIds_[collationId] = {
          resolve: resolve,
          reject: reject
        }
      }

      if (this.verbose && window.console) {
        console.log("%s: %o", requestName, message);
      }

      this.socket_.send(JSON.stringify(message))
    })
  }

  authenticate_(request, path) {
    const message = request.message_;
    message["collationId"] = uuidv4();
    const url = new URL(window.location.href);
    url.protocol = (this.ssl) ? 'https' : 'http';
    url.hostname = this.host;
    url.port = this.port;
    url.pathname = path;

    if (this.verbose && window.console) {
      console.log("AuthenticateRequest: %s, %o", url.toString(), message);
    }

    var verbose = this.verbose;
    return fetch(url.toString(), {
      "method": "POST",
      "body": JSON.stringify(message),
      "headers": {
        "Accept-Language": this.lang,
        "Authorization": 'Basic ' + btoa(this.serverKey + ':'),
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "User-Agent": `nakama/${VERSION}`
      }
    }).then(function(response) {
      if (verbose && window.console) {
        console.log("AuthenticateResponse: %o", response);
      }

      return response.json();
    }).then(function(response) {
      if (verbose && window.console) {
        console.log("AuthenticateResponse (body): %o", response);
      }

      if (response.error) {
        throw response.error;
      } else {
        return Session.restore(response.session.token);
      }
    });
  }
};

export class Session {
  constructor(createdAt, expiresAt, handle, id, token) {
    this.token_ = token;

    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.handle = handle;
    this.id = id;
  }

  /**
   * @param {number} currentime The current system time in milliseconds.
   * @returns {bool} True if the session has expired.
   */
  isexpired(currenttime) {
    return (this.expiresAt - currenttime) < 0;
  }

  static restore(jwt) {
    const parts = jwt.split('.');
    if (parts.length != 3) {
      throw 'jwt is not valid.';
    }
    const decoded = JSON.parse(atob(parts[1]));
    const expiresAt = Math.floor(parseInt(decoded['exp']) * 1000);

    return new Session(Date.now(), expiresAt, decoded['han'], decoded['uid'], jwt);
  }
}

export class LinkRequest {
  constructor() {
    // only set one of these fields
    this.custom = null;
    this.device = null;
    this.facebook = null;
    this.google = null;
    this.email = {
      email: "",
      password: ""
    };
  }

  build_() {
    if (this.custom) {
      return {link: {custom: this.custom}}
    }

    if (this.device) {
      return {link: {device: this.device}}
    }

    if (this.facebook) {
      return {link: {facebook: this.facebook}}
    }

    if (this.google) {
      return {link: {google: this.google}}
    }

    if (this.email.email != "") {
      return {link: {email: this.email}}
    }
  }
}

export class UnlinkRequest {
  constructor() {
    // only set one of these fields
    this.custom = null;
    this.device = null;
    this.facebook = null;
    this.google = null;
    this.email = null;
  }

  build_() {
    if (this.custom) {
      return {unlink: {custom: this.custom}}
    }

    if (this.device) {
      return {unlink: {device: this.device}}
    }

    if (this.facebook) {
      return {unlink: {facebook: this.facebook}}
    }

    if (this.google) {
      return {unlink: {google: this.google}}
    }

    if (this.email) {
      return {unlink: {email: this.email}}
    }
  }
}

export class SelfFetchRequest {
  constructor() {}

  build_() {
    return {
      selfFetch: {}
    }
  }
}

export class SelfUpdateRequest {
  constructor() {
    this.handle = null;
    this.fullname = null;
    this.timezone = null;
    this.location = null;
    this.lang = null;
    this.metadata = null;
    this.avatarUrl = null;
  }

  build_() {
    return {
      selfUpdate: {
        handle: this.handle,
        fullname: this.fullname,
        timezone: this.timezone,
        location: this.location,
        lang: this.lang,
        avatarUrl: this.avatarUrl,
        metadata: this.metadata ? btoa(JSON.stringify(this.metadata)) : btoa("{}")
      }
    }
  }
}

export class UsersFetchRequest {
  constructor() {
    // base64 user IDs
    this.userIds = [];
    this.handles = [];
  }

  build_() {
    var msg = {usersFetch: {users: []}}
    this.userIds.forEach(function(id) {
      msg.usersFetch.users.push({userId: id})
    });
    this.handles.forEach(function(handle) {
      msg.usersFetch.users.push({handle: handle})
    });
    return msg
  }
}

export class StorageListRequest {
  constructor() {
    // base64 user ID
    this.userId = null;
    this.bucket = null;
    this.collection = null;
    this.limit = null;
    this.cursor = null;
  }

  build_() {
    return {
      storageList: {
        userId: this.userId,
        bucket: this.bucket,
        collection: this.collection,
        limit: this.limit,
        cursor: this.cursor
      }
    }
  }
}

export class StorageFetchRequest {
  constructor() {
    this.keys = [];
  }

  fetch(bucket, collection, record, userId) {
    this.keys.push({
      bucket: bucket,
      collection: collection,
      record: record,
      userId: userId
    })
    return this;
  }

  build_() {
    return {storageFetch: {keys: this.keys}}
  }
}

export class StorageWriteRequest {
  constructor() {
    this.data = [];
  }

  write(bucket, collection, record, value, permissionRead = 1, permissionWrite = 1, version) {
    this.data.push({
      bucket: bucket,
      collection: collection,
      record: record,
      value: value ? btoa(JSON.stringify(value)) : btoa("{}"),
      version: version ? btoa(version) : null,
      permissionRead: permissionRead,
      permissionWrite: permissionWrite
    })
    return this;
  }

  build_() {
    return {storageWrite: {data: this.data}}
  }
}

export class StorageRemoveRequest {
  constructor() {
    this.keys = [];
  }

  remove(bucket, collection, record, userId) {
    this.keys.push({
      bucket: bucket,
      collection: collection,
      record: record,
      userId: userId
    })
    return this;
  }

  build_() {
    return {storageRemove: {keys: this.keys}}
  }
}

export class StorageUpdateRequest {
  constructor() {
    this.updates = [];
  }

  build_() {
    return {storageUpdate: {updates: this.updates}};
  }

  /**
    storageOps variable must be an array
  */
  update(bucket, collection, record, storageOps = [], permissionRead = 1, permissionWrite = 1, version) {
    this.updates.push({
      key: {
        bucket: bucket,
        collection: collection,
        record: record,
        version: version ? btoa(version) : null,
      },
      permissionRead: permissionRead,
      permissionWrite: permissionWrite,
      ops: storageOps,
    })
    return this;
  }

  static add(path, value) {
    return {
      op: 0,
      path: path,
      value: btoa(JSON.stringify(value))
    };
  }

  static append(path, value) {
    return {
      op: 1,
      path: path,
      value: btoa(JSON.stringify(value))
    };
  }

  static copy(path, from) {
    return {
      op: 2,
      path: path,
      from: from
    };
  }

  static incr(path, value) {
    return {
      op: 3,
      path: path,
      value: btoa(JSON.stringify(value))
    };
  }

  static init(path, value) {
    return {
      op: 4,
      path: path,
      value: btoa(JSON.stringify(value))
    };
  }

  static merge(path, from) {
    return {
      op: 5,
      path: path,
      from: from
    };
  }

  static move(path, from) {
    return {
      op: 6,
      path: path,
      from: from
    };
  }

  static remove(path) {
    return {
      op: 8,
      path: path,
    };
  }

  static replace(path, value) {
    return {
      op: 9,
      path: path,
      value: btoa(JSON.stringify(value))
    };
  }

  static test(path, value) {
    return {
      op: 10,
      path: path,
      value: btoa(JSON.stringify(value))
    };
  }

  static compare(path, value, assertValue) {
    return {
      op: 11,
      path: path,
      value: btoa(JSON.stringify(value)),
      assert: assertValue
    };
  }
}

export class FriendsAddRequest {
  constructor() {
    // base64 user IDs
    this.userIds = [];
    this.handles = [];
  }

  build_() {
    var msg = {friendsAdd: {friends: []}}
    this.userIds.forEach(function(id) {
      msg.friendsAdd.friends.push({userId: id})
    });
    this.handles.forEach(function(handle) {
      msg.friendsAdd.friends.push({handle: handle})
    });
    return msg
  }
}

export class FriendsRemoveRequest {
  constructor() {
    // base64 user IDs
    this.userIds = [];
  }

  build_() {
    var msg = {friendsRemove: {userIds: []}}
    this.userIds.forEach(function(id) {
      msg.friendsRemove.userIds.push({userId: id})
    });
    return msg
  }
}

export class FriendsBlockRequest {
  constructor() {
    // base64 user IDs
    this.userIds = [];
  }

  build_() {
    var msg = {friendsBlock: {userIds: []}}
    this.userIds.forEach(function(id) {
      msg.friendsBlock.userIds.push({userId: id})
    });
    return msg
  }
}

export class FriendsListRequest {
  constructor() {}

  build_() {
    return {
      friendsList: {}
    }
  }
}

export class TopicsJoinRequest {
  constructor() {
    this.topics = [];
  }

  dm(userId) {
    this.topics.push({userId: userId})
  }

  group(groupId) {
    this.topics.push({groupId: groupId})
  }

  room(room) {
    this.topics.push({room: room})
  }

  build_() {
    return {topicsJoin: {joins: this.topics}}
  }
}

export class TopicsLeaveRequest {
  constructor() {
    // this is a list of topicIds.
    this.topics = [];
  }

  build_() {
    return {topicsLeave: {topics: this.topics}}
  }
}


export class TopicMessageSendRequest {
  constructor() {
    // this is the topicId.
    this.topic = null;
    this.data = null;
  }

  build_() {
    return {topicsLeave: {
      topic: this.topic,
      data: btoa(JSON.stringify(this.data))
    }}
  }
}

export class TopicMessagesListRequest {
  constructor() {
    this.cursor = null;
    this.forward = null; // boolean
    this.limit = null; // number <= 100

    // set only one of the followings
    this.userId = null;
    this.room = null;
    this.groupId = null;
  }

  build_() {
    var msg = {topicMessageList: {
      cursor: this.cursor,
      forward: this.forward,
      limit: this.limit
    }}

    if (this.userId) {
      msg.userId = this.userId;
    } else if (this.room) {
      msg.room = this.room;
    } else if (this.groupId) {
      msg.groupId = this.groupId;
    }

    return msg;
  }
}


