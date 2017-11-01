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
              verbose = true) {
    this.serverKey_ = serverkey;
    this.host_ = host;
    this.port_ = port;
    this.lang_ = lang;
    this.ssl_ = ssl;
    this.verbose_ = verbose;
    this.serverTimestamp_ = 0;

    // private
    this.socket_ = null;
    this.collationIds_ = new Map();
  }

  ondisconnect(event) {}

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
    return this.send_({ logout: {} }, null)
  }

  connect(session) {
    if (this.socket_ != null) {
      return new Promise((resolve, reject) => {
        resolve(session);
      });
    }

    const searchParams = new URLSearchParams();
    searchParams.append("token", session.token_);
    searchParams.append("lang", this.lang_);
    searchParams.append("format", "json");

    const url = new URL(window.location.href);
    url.protocol = (this.ssl_) ? 'wss' : 'ws';
    url.hostname = this.host_;
    url.port = this.port_;
    url.search = searchParams.toString();
    url.pathname = '/api';

    this.socket_ = new WebSocket(url.toString());
    this.socket_.onclose = (event) => {
      this.ondisconnect(event);
      this.socket_ = null;
    };

    this.socket_.onmessage = (event) => {
      var message = JSON.parse(event.data)
      if (message.heartbeat) {
        this.serverTimestamp_ = message.heartbeat
        return
      }

      if (this.verbose_ && window.console) {
        console.log("Response: %s", JSON.stringify(message));
      }

      var p = this.collationIds_[message.collationId]
      if (p == null) {
        if (window.console) {
          console.log("Did not find promise for message:")
          console.log(message)
        }
        return
      }
      this.collationIds_.delete(message.collationId)

      if (message.error) {
        p.reject(message.error)
        return
      }

      if (message.self) {
        p.resolve(message.self.self)
      } else {
        if (window.console && Object.keys(message).length > 1) { // if the object has properties, other than the collationId, log a warning
          console.log("Unrecognized message received:")
          console.log(message)
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
    return this.send_(message, collationId);
  }

  send_(message, collationId) {
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

      var j = JSON.stringify(message)
      if (this.verbose_ && window.console) {
        console.log("Request: %s", j);
      }

      this.socket_.send(j)
    })
  }

  authenticate_(request, path) {
    const message = request.message_;
    message["collationId"] = uuidv4();
    const url = new URL(window.location.href);
    url.protocol = (this.ssl_) ? 'https' : 'http';
    url.hostname = this.host_;
    url.port = this.port_;
    url.pathname = path;

    if (this.verbose_ && window.console) {
      console.log("AuthenticateRequest: %s -> %s", url, JSON.stringify(message));
    }

    return fetch(url.toString(), {
      "method": "POST",
      "body": JSON.stringify(message),
      "headers": {
        "Accept-Language": this.lang_,
        "Authorization": 'Basic ' + btoa(this.serverKey_ + ':'),
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "User-Agent": `nakama/${VERSION}`
      }
    }).then(function(response) {
      return response.json();
    }).then(function(response) {
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

    return new Session(Date.now(), expiresAt, decoded['handle'], decoded['id'], jwt);
  }
}

export class LinkRequest {
  constructor() {
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
