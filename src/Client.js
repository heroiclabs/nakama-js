import uuidv4 from '/uuidv4';
import base64 from 'base-64';
import Session from '/Session';

const VERSION = '0.1.0';
const DEFAULT_SERVER_KEY = 'defaultkey';
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = '7350';

export default class Client {
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
  ontopicmessage(message) {}
  ontopicpresence(presenceUpdate) {}
  onnotification(notification) {}
  onmatchmakematched(match) {}
  onmatchdata(matchdata) {}
  onmatchpresence(presenceUpdate) {}

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

    const protocol = (this.ssl) ? 'wss' : 'ws';
    const url = `${protocol}://${this.host}:${this.port}/api?format=json&lang=${this.lang}&token=${session.token_}`

    this.socket_ = new WebSocket(url);
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
          message.topicMessage.data = JSON.parse(message.topicMessage.data)
          this.ontopicmessage(message.topicMessage);
        } else if (message.topicPresence) {
          this.ontopicpresence(message.topicPresence);
        } else if (message.liveNotifications) {
          message.liveNotifications.notifications.forEach(function(notification) {
            notification.content = JSON.parse(notification.content);
            this.onnotification(notification);
          });
        } else if (message.matchmakeMatched) {
          this.onmatchmakematched(message.matchmakeMatched);
        } else if (message.matchData) {
          message.matchData.data = JSON.parse(base64.decode(message.matchData.data));
          this.onmatchdata(message.matchData);
        } else if (message.matchPresence) {
          this.onmatchpresence(message.matchPresence);
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
        this.collationIds_.delete(message.collationId);

        if (message.error) {
          p.reject(message.error);
        }else{
          p.resolve(message);
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
    return this.send_(message, collationId)
      .then((message) => {
        if(request.processResponse_) return request.processResponse_(message);
      });
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

      if (this.verbose && window.console) {
        console.log("%o", message);
      }

      this.socket_.send(JSON.stringify(message))
    })
  }

  authenticate_(request, path) {
    const message = request.message_;
    message["collationId"] = uuidv4();

    const protocol = (this.ssl) ? 'https' : 'http';
    const url = `${protocol}://${this.host}:${this.port}${path}`

    if (this.verbose && window.console) {
      console.log("AuthenticateRequest: %s, %o", url, message);
    }

    var verbose = this.verbose;
    return fetch(url, {
      "method": "POST",
      "body": JSON.stringify(message),
      "headers": {
        "Accept-Language": this.lang,
        "Authorization": 'Basic ' + base64.encode(this.serverKey + ':'),
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
