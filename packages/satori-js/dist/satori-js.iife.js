"use strict";
var satorijs = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/whatwg-fetch/fetch.js
  var require_fetch = __commonJS({
    "node_modules/whatwg-fetch/fetch.js"(exports) {
      (function(self2) {
        "use strict";
        if (self2.fetch) {
          return;
        }
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isDataView = function(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
          };
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + "," + value : value;
        };
        Headers.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              throw new Error("unsupported BodyInit type");
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode2);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "omit";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode2(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        self2.Headers = Headers;
        self2.Request = Request;
        self2.Response = Response;
        self2.fetch = function(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        };
        self2.fetch.polyfill = true;
      })(typeof self !== "undefined" ? self : exports);
    }
  });

  // index.ts
  var satori_js_exports = {};
  __export(satori_js_exports, {
    Client: () => Client,
    Session: () => Session
  });
  var import_whatwg_fetch = __toESM(require_fetch());

  // node_modules/js-base64/base64.mjs
  var _hasatob = typeof atob === "function";
  var _hasbtoa = typeof btoa === "function";
  var _hasBuffer = typeof Buffer === "function";
  var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
  var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
  var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var b64chs = [...b64ch];
  var b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
  })(b64chs);
  var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  var _fromCC = String.fromCharCode.bind(String);
  var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  var _mkUriSafe = (src) => src.replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_").replace(/=+$/m, "");
  var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
  var btoaPolyfill = (bin) => {
    let u32, c0, c1, c2, asc = "";
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length; ) {
      if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
        throw new TypeError("invalid character found");
      u32 = c0 << 16 | c1 << 8 | c2;
      asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
  };
  var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
  var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
    const maxargs = 4096;
    let strs = [];
    for (let i = 0, l = u8a.length; i < l; i += maxargs) {
      strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
    }
    return _btoa(strs.join(""));
  };
  var cb_utob = (c) => {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    } else {
      var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
      return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = (u) => u.replace(re_utob, cb_utob);
  var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
  var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
  var atobPolyfill = (asc) => {
    asc = asc.replace(/\s+/g, "");
    if (!b64re.test(asc))
      throw new TypeError("malformed base64.");
    asc += "==".slice(2 - (asc.length & 3));
    let u24, bin = "", r1, r2;
    for (let i = 0; i < asc.length; ) {
      u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
      bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
  };
  var _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;

  // utils.ts
  function buildFetchOptions(method, options, bodyJson) {
    const fetchOptions = __spreadValues(__spreadValues({}, { method }), options);
    fetchOptions.headers = __spreadValues({}, options.headers);
    const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");
    if (!(descriptor == null ? void 0 : descriptor.set)) {
      fetchOptions.credentials = "cocos-ignore";
    }
    if (!Object.keys(fetchOptions.headers).includes("Accept")) {
      fetchOptions.headers["Accept"] = "application/json";
    }
    if (!Object.keys(fetchOptions.headers).includes("Content-Type")) {
      fetchOptions.headers["Content-Type"] = "application/json";
    }
    Object.keys(fetchOptions.headers).forEach((key) => {
      if (!fetchOptions.headers[key]) {
        delete fetchOptions.headers[key];
      }
    });
    if (bodyJson) {
      fetchOptions.body = bodyJson;
    }
    return fetchOptions;
  }

  // api.gen.ts
  var SatoriApi = class {
    constructor(apiKey, basePath, timeoutMs) {
      this.apiKey = apiKey;
      this.basePath = basePath;
      this.timeoutMs = timeoutMs;
    }
    /** A healthcheck which load balancers can use to check the service. */
    satoriHealthcheck(bearerToken, options = {}) {
      const urlPath = "/healthcheck";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("GET", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** A readycheck which load balancers can use to check the service. */
    satoriReadycheck(bearerToken, options = {}) {
      const urlPath = "/readycheck";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("GET", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** Authenticate against the server. */
    satoriAuthenticate(basicAuthUsername, basicAuthPassword, body, options = {}) {
      if (body === null || body === void 0) {
        throw new Error("'body' is a required parameter but is null or undefined.");
      }
      const urlPath = "/v1/authenticate";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      bodyJson = JSON.stringify(body || {});
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("POST", options, bodyJson);
      if (basicAuthUsername) {
        fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
    satoriAuthenticateLogout(bearerToken, body, options = {}) {
      if (body === null || body === void 0) {
        throw new Error("'body' is a required parameter but is null or undefined.");
      }
      const urlPath = "/v1/authenticate/logout";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      bodyJson = JSON.stringify(body || {});
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("POST", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
    satoriAuthenticateRefresh(basicAuthUsername, basicAuthPassword, body, options = {}) {
      if (body === null || body === void 0) {
        throw new Error("'body' is a required parameter but is null or undefined.");
      }
      const urlPath = "/v1/authenticate/refresh";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      bodyJson = JSON.stringify(body || {});
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("POST", options, bodyJson);
      if (basicAuthUsername) {
        fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** Publish an event for this session. */
    satoriEvent(bearerToken, body, options = {}) {
      if (body === null || body === void 0) {
        throw new Error("'body' is a required parameter but is null or undefined.");
      }
      const urlPath = "/v1/event";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      bodyJson = JSON.stringify(body || {});
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("POST", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** Get or list all available experiments for this identity. */
    satoriGetExperiments(bearerToken, names, options = {}) {
      const urlPath = "/v1/experiment";
      const queryParams = /* @__PURE__ */ new Map();
      queryParams.set("names", names);
      let bodyJson = "";
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("GET", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** List all available flags for this identity. */
    satoriGetFlags(bearerToken, basicAuthUsername, basicAuthPassword, names, options = {}) {
      const urlPath = "/v1/flag";
      const queryParams = /* @__PURE__ */ new Map();
      queryParams.set("names", names);
      let bodyJson = "";
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("GET", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      if (basicAuthUsername) {
        fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** Enrich/replace the current session with new identifier. */
    satoriIdentify(bearerToken, body, options = {}) {
      if (body === null || body === void 0) {
        throw new Error("'body' is a required parameter but is null or undefined.");
      }
      const urlPath = "/v1/identify";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      bodyJson = JSON.stringify(body || {});
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** List available live events. */
    satoriGetLiveEvents(bearerToken, names, options = {}) {
      const urlPath = "/v1/live-event";
      const queryParams = /* @__PURE__ */ new Map();
      queryParams.set("names", names);
      let bodyJson = "";
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("GET", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** List properties associated with this identity. */
    satoriListProperties(bearerToken, options = {}) {
      const urlPath = "/v1/properties";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("GET", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    /** Update identity properties. */
    satoriUpdateProperties(bearerToken, body, options = {}) {
      if (body === null || body === void 0) {
        throw new Error("'body' is a required parameter but is null or undefined.");
      }
      const urlPath = "/v1/properties";
      const queryParams = /* @__PURE__ */ new Map();
      let bodyJson = "";
      bodyJson = JSON.stringify(body || {});
      const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
      const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
      if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
      }
      return Promise.race([
        fetch(fullUrl, fetchOptions).then((response) => {
          if (response.status == 204) {
            return response;
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise(
          (_, reject) => setTimeout(reject, this.timeoutMs, "Request timed out.")
        )
      ]);
    }
    buildFullUrl(basePath, fragment, queryParams) {
      let fullPath = basePath + fragment + "?";
      for (let [k, v] of queryParams) {
        if (v instanceof Array) {
          fullPath += v.reduce((prev, curr) => {
            return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
          }, "");
        } else {
          if (v != null) {
            fullPath += encodeURIComponent(k) + "=" + encodeURIComponent(v) + "&";
          }
        }
      }
      return fullPath;
    }
  };

  // session.ts
  var Session = class {
    constructor(token, refresh_token) {
      this.token = token;
      this.refresh_token = refresh_token;
      this.created_at = Math.floor(new Date().getTime() / 1e3);
      this.update(token, refresh_token);
    }
    isexpired(currenttime) {
      return this.expires_at - currenttime < 0;
    }
    isrefreshexpired(currenttime) {
      return this.refresh_expires_at - currenttime < 0;
    }
    update(token, refreshToken) {
      const tokenParts = token.split(".");
      if (tokenParts.length != 3) {
        throw "jwt is not valid.";
      }
      const tokenDecoded = JSON.parse(_atob(tokenParts[1]));
      const tokenExpiresAt = Math.floor(parseInt(tokenDecoded["exp"]));
      if (refreshToken) {
        const refreshTokenParts = refreshToken.split(".");
        if (refreshTokenParts.length != 3) {
          throw "refresh jwt is not valid.";
        }
        const refreshTokenDecoded = JSON.parse(_atob(refreshTokenParts[1]));
        const refreshTokenExpiresAt = Math.floor(parseInt(refreshTokenDecoded["exp"]));
        this.refresh_expires_at = refreshTokenExpiresAt;
        this.refresh_token = refreshToken;
      }
      this.token = token;
      this.expires_at = tokenExpiresAt;
      this.user_id = tokenDecoded["uid"];
      this.vars = tokenDecoded["vrs"];
    }
    static restore(token, refreshToken) {
      return new Session(token, refreshToken);
    }
  };

  // client.ts
  var DEFAULT_HOST = "127.0.0.1";
  var DEFAULT_PORT = "7450";
  var DEFAULT_API_KEY = "defaultkey";
  var DEFAULT_TIMEOUT_MS = 7e3;
  var DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1e3;
  var Client = class {
    constructor(apiKey = DEFAULT_API_KEY, host = DEFAULT_HOST, port = DEFAULT_PORT, useSSL = false, timeout = DEFAULT_TIMEOUT_MS, autoRefreshSession = true) {
      this.apiKey = apiKey;
      this.host = host;
      this.port = port;
      this.useSSL = useSSL;
      this.timeout = timeout;
      this.autoRefreshSession = autoRefreshSession;
      /** The expired timespan used to check session lifetime. */
      this.expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;
      const scheme = useSSL ? "https://" : "http://";
      const basePath = `${scheme}${host}:${port}`;
      this.apiClient = new SatoriApi(apiKey, basePath, timeout);
    }
    /** Authenticate a user with an ID against the server. */
    authenticate(id) {
      return __async(this, null, function* () {
        const request = {
          "id": id
        };
        return this.apiClient.satoriAuthenticate(this.apiKey, "", request).then((apiSession) => {
          return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
        });
      });
    }
    /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
    sessionRefresh(session) {
      return __async(this, null, function* () {
        const request = {
          "refresh_token": session.refresh_token
        };
        return this.apiClient.satoriAuthenticateRefresh(this.apiKey, "", request).then((apiSession) => {
          return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
        });
      });
    }
    /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
    logout(session) {
      return __async(this, null, function* () {
        const request = {
          "token": session.token,
          "refresh_token": session.refresh_token
        };
        return this.apiClient.satoriAuthenticateLogout(session.token, request).then((response) => {
          return Promise.resolve(response !== void 0);
        });
      });
    }
    /** Publish an event for this session. */
    event(session, event) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        const request = {
          events: [event]
        };
        return this.apiClient.satoriEvent(session.token, request).then((response) => {
          return Promise.resolve(response !== void 0);
        });
      });
    }
    /** Publish multiple events for this session */
    events(session, events) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        const request = {
          events
        };
        return this.apiClient.satoriEvent(session.token, request).then((response) => {
          return Promise.resolve(response !== void 0);
        });
      });
    }
    /** Get or list all available experiments for this identity. */
    getExperiments(session, names) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        return this.apiClient.satoriGetExperiments(session.token, names);
      });
    }
    /** Get a single flag for this identity. */
    getFlag(session, name, defaultValue) {
      return __async(this, null, function* () {
        try {
          if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
            yield this.sessionRefresh(session);
          }
          return this.apiClient.satoriGetFlags(session.token, "", "", [name]).then((flagList) => {
            var _a;
            let flag = null;
            (_a = flagList.flags) == null ? void 0 : _a.forEach((f) => {
              if (f.name === name) {
                flag = f;
              }
            });
            if (flag === null) {
              flag = {
                name,
                value: defaultValue
              };
            }
            return Promise.resolve(flag);
          });
        } catch (error) {
          if (defaultValue !== void 0) {
            return Promise.resolve({
              name,
              value: defaultValue
            });
          } else {
            return Promise.reject(error);
          }
        }
      });
    }
    /** Get a single flag with its configured default value. */
    getFlagDefault(session, name, defaultValue) {
      return __async(this, null, function* () {
        try {
          if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
            yield this.sessionRefresh(session);
          }
          return this.apiClient.satoriGetFlags("", this.apiKey, "", [name]).then((flagList) => {
            var _a;
            let flag = null;
            (_a = flagList.flags) == null ? void 0 : _a.forEach((f) => {
              if (f.name === name) {
                flag = f;
              }
            });
            if (flag === null) {
              flag = {
                name,
                value: defaultValue
              };
            }
            return Promise.resolve(flag);
          });
        } catch (error) {
          if (defaultValue !== void 0) {
            return Promise.resolve({
              name,
              value: defaultValue
            });
          } else {
            return Promise.reject(error);
          }
        }
      });
    }
    /** List all available flags for this identity. */
    getFlags(session, names) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        return this.apiClient.satoriGetFlags(session.token, "", "", names);
      });
    }
    /** List all available default flags for this identity. */
    getFlagsDefault(session, names) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        return this.apiClient.satoriGetFlags("", this.apiKey, "", names);
      });
    }
    /** Enrich/replace the current session with new identifier. */
    identify(session, id, defaultProperties, customProperties) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        const request = {
          id,
          default: defaultProperties,
          custom: customProperties
        };
        return this.apiClient.satoriIdentify(session.token, request).then((apiSession) => {
          return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
        });
      });
    }
    /** List available live events. */
    getLiveEvents(session, names) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        return this.apiClient.satoriGetLiveEvents(session.token, names);
      });
    }
    /** List properties associated with this identity. */
    listProperties(session) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        return this.apiClient.satoriListProperties(session.token);
      });
    }
    /** Update identity properties. */
    updateProperties(session, defaultProperties, customProperties) {
      return __async(this, null, function* () {
        if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
          yield this.sessionRefresh(session);
        }
        const request = {
          default: defaultProperties,
          custom: customProperties
        };
        return this.apiClient.satoriUpdateProperties(session.token, request).then((response) => {
          return Promise.resolve(response !== void 0);
        });
      });
    }
  };
  return __toCommonJS(satori_js_exports);
})();
