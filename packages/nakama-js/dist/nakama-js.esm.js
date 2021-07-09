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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};
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
var import_whatwg_fetch = __toModule(require_fetch());

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
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
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
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a), (c) => c.charCodeAt(0));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));

// api.gen.ts
var ValidatedPurchaseEnvironment;
(function(ValidatedPurchaseEnvironment2) {
  ValidatedPurchaseEnvironment2[ValidatedPurchaseEnvironment2["UNKNOWN"] = 0] = "UNKNOWN";
  ValidatedPurchaseEnvironment2[ValidatedPurchaseEnvironment2["SANDBOX"] = 1] = "SANDBOX";
  ValidatedPurchaseEnvironment2[ValidatedPurchaseEnvironment2["PRODUCTION"] = 2] = "PRODUCTION";
})(ValidatedPurchaseEnvironment || (ValidatedPurchaseEnvironment = {}));
var ValidatedPurchaseStore;
(function(ValidatedPurchaseStore2) {
  ValidatedPurchaseStore2[ValidatedPurchaseStore2["APPLE_APP_STORE"] = 0] = "APPLE_APP_STORE";
  ValidatedPurchaseStore2[ValidatedPurchaseStore2["GOOGLE_PLAY_STORE"] = 1] = "GOOGLE_PLAY_STORE";
  ValidatedPurchaseStore2[ValidatedPurchaseStore2["HUAWEI_APP_GALLERY"] = 2] = "HUAWEI_APP_GALLERY";
})(ValidatedPurchaseStore || (ValidatedPurchaseStore = {}));
var ApiOverrideOperator;
(function(ApiOverrideOperator2) {
  ApiOverrideOperator2[ApiOverrideOperator2["NO_OVERRIDE"] = 0] = "NO_OVERRIDE";
  ApiOverrideOperator2[ApiOverrideOperator2["BEST"] = 1] = "BEST";
  ApiOverrideOperator2[ApiOverrideOperator2["SET"] = 2] = "SET";
  ApiOverrideOperator2[ApiOverrideOperator2["INCREMENT"] = 3] = "INCREMENT";
  ApiOverrideOperator2[ApiOverrideOperator2["DECREMENT"] = 4] = "DECREMENT";
})(ApiOverrideOperator || (ApiOverrideOperator = {}));
var NakamaApi = class {
  constructor(configuration) {
    this.configuration = configuration;
  }
  doFetch(urlPath, method, queryParams, body, options) {
    const urlQuery = "?" + Object.keys(queryParams).map((k) => {
      if (queryParams[k] instanceof Array) {
        return queryParams[k].reduce((prev, curr) => {
          return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
        }, "");
      } else {
        if (queryParams[k] != null) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
        }
      }
    }).join("");
    const fetchOptions = __spreadValues(__spreadValues({}, { method }), options);
    fetchOptions.headers = __spreadValues({}, options.headers);
    const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");
    if (!(descriptor == null ? void 0 : descriptor.set)) {
      fetchOptions.credentials = "cocos-ignore";
    }
    if (this.configuration.bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
    } else if (this.configuration.username) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(this.configuration.username + ":" + this.configuration.password);
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
    fetchOptions.body = body;
    return Promise.race([
      fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
    ]);
  }
  healthcheck(options = {}) {
    const urlPath = "/healthcheck";
    const queryParams = {};
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  getAccount(options = {}) {
    const urlPath = "/v2/account";
    const queryParams = {};
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  updateAccount(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "PUT", queryParams, _body, options);
  }
  authenticateApple(body, create, username, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/apple";
    const queryParams = {
      create,
      username
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  authenticateCustom(body, create, username, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/custom";
    const queryParams = {
      create,
      username
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  authenticateDevice(body, create, username, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/device";
    const queryParams = {
      create,
      username
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  authenticateEmail(body, create, username, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/email";
    const queryParams = {
      create,
      username
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  authenticateFacebook(body, create, username, sync, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/facebook";
    const queryParams = {
      create,
      username,
      sync
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  authenticateFacebookInstantGame(body, create, username, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/facebookinstantgame";
    const queryParams = {
      create,
      username
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  authenticateGameCenter(body, create, username, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/gamecenter";
    const queryParams = {
      create,
      username
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  authenticateGoogle(body, create, username, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/google";
    const queryParams = {
      create,
      username
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  authenticateSteam(body, create, username, sync, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/steam";
    const queryParams = {
      create,
      username,
      sync
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkApple(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/apple";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkCustom(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/custom";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkDevice(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/device";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkEmail(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/email";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkFacebook(body, sync, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/facebook";
    const queryParams = {
      sync
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkFacebookInstantGame(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/facebookinstantgame";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkGameCenter(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/gamecenter";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkGoogle(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/google";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  linkSteam(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/steam";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  sessionRefresh(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/session/refresh";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkApple(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/apple";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkCustom(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/custom";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkDevice(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/device";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkEmail(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/email";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkFacebook(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/facebook";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkFacebookInstantGame(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/facebookinstantgame";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkGameCenter(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/gamecenter";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkGoogle(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/google";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  unlinkSteam(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/steam";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  listChannelMessages(channelId, limit, forward, cursor, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channel/{channelId}".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = {
      limit,
      forward,
      cursor
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  event(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/event";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  deleteFriends(ids, usernames, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = {
      ids,
      usernames
    };
    let _body = null;
    return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
  }
  listFriends(limit, state, cursor, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = {
      limit,
      state,
      cursor
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  addFriends(ids, usernames, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = {
      ids,
      usernames
    };
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  blockFriends(ids, usernames, options = {}) {
    const urlPath = "/v2/friend/block";
    const queryParams = {
      ids,
      usernames
    };
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  importFacebookFriends(body, reset, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/friend/facebook";
    const queryParams = {
      reset
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  importSteamFriends(body, reset, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/friend/steam";
    const queryParams = {
      reset
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  listGroups(name, cursor, limit, options = {}) {
    const urlPath = "/v2/group";
    const queryParams = {
      name,
      cursor,
      limit
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  createGroup(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  deleteGroup(groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {};
    let _body = null;
    return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
  }
  updateGroup(groupId, body, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "PUT", queryParams, _body, options);
  }
  addGroupUsers(groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/add".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {
      user_ids: userIds
    };
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  banGroupUsers(groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/ban".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {
      user_ids: userIds
    };
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  demoteGroupUsers(groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    if (userIds === null || userIds === void 0) {
      throw new Error("'userIds' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/demote".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {
      user_ids: userIds
    };
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  joinGroup(groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/join".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {};
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  kickGroupUsers(groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/kick".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {
      user_ids: userIds
    };
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  leaveGroup(groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/leave".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {};
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  promoteGroupUsers(groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/promote".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {
      user_ids: userIds
    };
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  listGroupUsers(groupId, limit, state, cursor, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/user".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = {
      limit,
      state,
      cursor
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  validatePurchaseApple(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/purchase/apple";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  validatePurchaseGoogle(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/purchase/google";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  validatePurchaseHuawei(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/purchase/huawei";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  deleteLeaderboardRecord(leaderboardId, options = {}) {
    if (leaderboardId === null || leaderboardId === void 0) {
      throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/leaderboard/{leaderboardId}".replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
    const queryParams = {};
    let _body = null;
    return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
  }
  listLeaderboardRecords(leaderboardId, ownerIds, limit, cursor, expiry, options = {}) {
    if (leaderboardId === null || leaderboardId === void 0) {
      throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/leaderboard/{leaderboardId}".replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
    const queryParams = {
      ownerIds,
      limit,
      cursor,
      expiry
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  writeLeaderboardRecord(leaderboardId, body, options = {}) {
    if (leaderboardId === null || leaderboardId === void 0) {
      throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/leaderboard/{leaderboardId}".replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  listLeaderboardRecordsAroundOwner(leaderboardId, ownerId, limit, expiry, options = {}) {
    if (leaderboardId === null || leaderboardId === void 0) {
      throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
    }
    if (ownerId === null || ownerId === void 0) {
      throw new Error("'ownerId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/leaderboard/{leaderboardId}/owner/{ownerId}".replace("{leaderboardId}", encodeURIComponent(String(leaderboardId))).replace("{ownerId}", encodeURIComponent(String(ownerId)));
    const queryParams = {
      limit,
      expiry
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  listMatches(limit, authoritative, label, minSize, maxSize, query, options = {}) {
    const urlPath = "/v2/match";
    const queryParams = {
      limit,
      authoritative,
      label,
      minSize,
      maxSize,
      query
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  deleteNotifications(ids, options = {}) {
    const urlPath = "/v2/notification";
    const queryParams = {
      ids
    };
    let _body = null;
    return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
  }
  listNotifications(limit, cacheableCursor, options = {}) {
    const urlPath = "/v2/notification";
    const queryParams = {
      limit,
      cacheableCursor
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  rpcFunc2(id, payload, httpKey, options = {}) {
    if (id === null || id === void 0) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/rpc/{id}".replace("{id}", encodeURIComponent(String(id)));
    const queryParams = {
      payload,
      httpKey
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  rpcFunc(id, body, httpKey, options = {}) {
    if (id === null || id === void 0) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/rpc/{id}".replace("{id}", encodeURIComponent(String(id)));
    const queryParams = {
      httpKey
    };
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  sessionLogout(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/session/logout";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  readStorageObjects(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  writeStorageObjects(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "PUT", queryParams, _body, options);
  }
  deleteStorageObjects(body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/delete";
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "PUT", queryParams, _body, options);
  }
  listStorageObjects(collection, userId, limit, cursor, options = {}) {
    if (collection === null || collection === void 0) {
      throw new Error("'collection' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/{collection}".replace("{collection}", encodeURIComponent(String(collection)));
    const queryParams = {
      userId,
      limit,
      cursor
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  listStorageObjects2(collection, userId, limit, cursor, options = {}) {
    if (collection === null || collection === void 0) {
      throw new Error("'collection' is a required parameter but is null or undefined.");
    }
    if (userId === null || userId === void 0) {
      throw new Error("'userId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/{collection}/{userId}".replace("{collection}", encodeURIComponent(String(collection))).replace("{userId}", encodeURIComponent(String(userId)));
    const queryParams = {
      limit,
      cursor
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  listTournaments(categoryStart, categoryEnd, startTime, endTime, limit, cursor, options = {}) {
    const urlPath = "/v2/tournament";
    const queryParams = {
      categoryStart,
      categoryEnd,
      startTime,
      endTime,
      limit,
      cursor
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  listTournamentRecords(tournamentId, ownerIds, limit, cursor, expiry, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = {
      ownerIds,
      limit,
      cursor,
      expiry
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  writeTournamentRecord2(tournamentId, body, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  writeTournamentRecord(tournamentId, body, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = {};
    let _body = null;
    _body = JSON.stringify(body || {});
    return this.doFetch(urlPath, "PUT", queryParams, _body, options);
  }
  joinTournament(tournamentId, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}/join".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = {};
    let _body = null;
    return this.doFetch(urlPath, "POST", queryParams, _body, options);
  }
  listTournamentRecordsAroundOwner(tournamentId, ownerId, limit, expiry, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    if (ownerId === null || ownerId === void 0) {
      throw new Error("'ownerId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}/owner/{ownerId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId))).replace("{ownerId}", encodeURIComponent(String(ownerId)));
    const queryParams = {
      limit,
      expiry
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  getUsers(ids, usernames, facebookIds, options = {}) {
    const urlPath = "/v2/user";
    const queryParams = {
      ids,
      usernames,
      facebookIds
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
  listUserGroups(userId, limit, state, cursor, options = {}) {
    if (userId === null || userId === void 0) {
      throw new Error("'userId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/user/{userId}/group".replace("{userId}", encodeURIComponent(String(userId)));
    const queryParams = {
      limit,
      state,
      cursor
    };
    let _body = null;
    return this.doFetch(urlPath, "GET", queryParams, _body, options);
  }
};

// session.ts
var Session = class {
  constructor(token, refresh_token, created) {
    this.created = created;
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
    const tokenDecoded = JSON.parse(atob(tokenParts[1]));
    const tokenExpiresAt = Math.floor(parseInt(tokenDecoded["exp"]));
    if (refreshToken) {
      const refreshTokenParts = refreshToken.split(".");
      if (refreshTokenParts.length != 3) {
        throw "refresh jwt is not valid.";
      }
      const refreshTokenDecoded = JSON.parse(atob(refreshTokenParts[1]));
      const refreshTokenExpiresAt = Math.floor(parseInt(refreshTokenDecoded["exp"]));
      this.refresh_expires_at = refreshTokenExpiresAt;
      this.refresh_token = refreshToken;
    }
    this.token = token;
    this.expires_at = tokenExpiresAt;
    this.username = tokenDecoded["usn"];
    this.user_id = tokenDecoded["uid"];
    this.vars = tokenDecoded["vrs"];
  }
  static restore(token, refreshToken) {
    return new Session(token, refreshToken, false);
  }
};

// web_socket_adapter.ts
var WebSocketAdapterText = class {
  constructor() {
    this._isConnected = false;
  }
  get onClose() {
    return this._socket.onclose;
  }
  set onClose(value) {
    this._socket.onclose = value;
  }
  get onError() {
    return this._socket.onerror;
  }
  set onError(value) {
    this._socket.onerror = value;
  }
  get onMessage() {
    return this._socket.onmessage;
  }
  set onMessage(value) {
    if (value) {
      this._socket.onmessage = (evt) => {
        const message = JSON.parse(evt.data);
        value(message);
      };
    } else {
      value = null;
    }
  }
  get onOpen() {
    return this._socket.onopen;
  }
  set onOpen(value) {
    this._socket.onopen = value;
  }
  get isConnected() {
    return this._isConnected;
  }
  connect(scheme, host, port, createStatus, token) {
    const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}`;
    this._socket = new WebSocket(url);
    this._isConnected = true;
  }
  close() {
    this._isConnected = false;
    this._socket.close();
    this._socket = void 0;
  }
  send(msg) {
    if (msg.match_data_send) {
      msg.match_data_send.op_code = msg.match_data_send.op_code.toString();
    } else if (msg.party_data_send) {
      msg.party_data_send.op_code = msg.party_data_send.op_code.toString();
    }
    this._socket.send(JSON.stringify(msg));
  }
};

// utils.ts
function b64EncodeUnicode(str) {
  return encode(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_match, p1) {
    return String.fromCharCode(Number("0x" + p1));
  }));
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(decode(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}

// socket.ts
var DefaultSocket = class {
  constructor(host, port, useSSL = false, verbose = false, adapter = new WebSocketAdapterText()) {
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    this.verbose = verbose;
    this.adapter = adapter;
    this.cIds = {};
    this.nextCid = 1;
  }
  generatecid() {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }
  connect(session, createStatus = false) {
    if (this.adapter.isConnected) {
      return Promise.resolve(session);
    }
    const scheme = this.useSSL ? "wss://" : "ws://";
    this.adapter.connect(scheme, this.host, this.port, createStatus, session.token);
    this.adapter.onClose = (evt) => {
      this.ondisconnect(evt);
    };
    this.adapter.onError = (evt) => {
      this.onerror(evt);
    };
    this.adapter.onMessage = (message) => {
      if (this.verbose && window && window.console) {
        console.log("Response: %o", JSON.stringify(message));
      }
      if (message.cid == void 0) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n) => {
            n.content = n.content ? JSON.parse(n.content) : void 0;
            this.onnotification(n);
          });
        } else if (message.match_data) {
          message.match_data.data = message.match_data.data != null ? JSON.parse(b64DecodeUnicode(message.match_data.data)) : null;
          message.match_data.op_code = parseInt(message.match_data.op_code);
          this.onmatchdata(message.match_data);
        } else if (message.match_presence_event) {
          this.onmatchpresence(message.match_presence_event);
        } else if (message.matchmaker_ticket) {
          this.onmatchmakerticket(message.matchmaker_ticket);
        } else if (message.matchmaker_matched) {
          this.onmatchmakermatched(message.matchmaker_matched);
        } else if (message.status_presence_event) {
          this.onstatuspresence(message.status_presence_event);
        } else if (message.stream_presence_event) {
          this.onstreampresence(message.stream_presence_event);
        } else if (message.stream_data) {
          this.onstreamdata(message.stream_data);
        } else if (message.channel_message) {
          message.channel_message.content = JSON.parse(message.channel_message.content);
          this.onchannelmessage(message.channel_message);
        } else if (message.channel_presence_event) {
          this.onchannelpresence(message.channel_presence_event);
        } else if (message.party_data) {
          message.party_data.data = message.party_data.data != null ? JSON.parse(b64DecodeUnicode(message.party_data.data)) : null;
          message.party_data.op_code = parseInt(message.party_data.op_code);
          this.onpartydata(message.party_data);
        } else if (message.on_party_close) {
          this.onpartyclose();
        } else if (message.party_join_request) {
          this.onpartyjoinrequest(message.party_join_request);
        } else if (message.party_leader) {
          this.onpartyleader(message.party_leader);
        } else if (message.party_matchmaker_ticket) {
          this.onpartymatchmakerticket(message.party_matchmaker_ticket);
        } else if (message.party_presence_event) {
          this.onpartypresence(message.party_presence_event);
        } else if (message.party) {
          this.onparty(message.party);
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
          executor.reject(message.error);
        } else {
          executor.resolve(message);
        }
      }
    };
    return new Promise((resolve, reject) => {
      this.adapter.onOpen = (evt) => {
        if (this.verbose && window && window.console) {
          console.log(evt);
        }
        resolve(session);
      };
      this.adapter.onError = (evt) => {
        reject(evt);
        this.adapter.close();
      };
    });
  }
  disconnect(fireDisconnectEvent = true) {
    if (this.adapter.isConnected) {
      this.adapter.close();
    }
    if (fireDisconnectEvent) {
      this.ondisconnect({});
    }
  }
  ondisconnect(evt) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }
  onerror(evt) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }
  onchannelmessage(channelMessage) {
    if (this.verbose && window && window.console) {
      console.log(channelMessage);
    }
  }
  onchannelpresence(channelPresence) {
    if (this.verbose && window && window.console) {
      console.log(channelPresence);
    }
  }
  onnotification(notification) {
    if (this.verbose && window && window.console) {
      console.log(notification);
    }
  }
  onmatchdata(matchData) {
    if (this.verbose && window && window.console) {
      console.log(matchData);
    }
  }
  onmatchpresence(matchPresence) {
    if (this.verbose && window && window.console) {
      console.log(matchPresence);
    }
  }
  onmatchmakerticket(matchmakerTicket) {
    if (this.verbose && window && window.console) {
      console.log(matchmakerTicket);
    }
  }
  onmatchmakermatched(matchmakerMatched) {
    if (this.verbose && window && window.console) {
      console.log(matchmakerMatched);
    }
  }
  onparty(party) {
    if (this.verbose && window && window.console) {
      console.log(party);
    }
  }
  onpartyclose() {
    if (this.verbose && window && window.console) {
      console.log("Party closed.");
    }
  }
  onpartyjoinrequest(partyJoinRequest) {
    if (this.verbose && window && window.console) {
      console.log(partyJoinRequest);
    }
  }
  onpartydata(partyData) {
    if (this.verbose && window && window.console) {
      console.log(partyData);
    }
  }
  onpartyleader(partyLeader) {
    if (this.verbose && window && window.console) {
      console.log(partyLeader);
    }
  }
  onpartymatchmakerticket(partyMatched) {
    if (this.verbose && window && window.console) {
      console.log(partyMatched);
    }
  }
  onpartypresence(partyPresence) {
    if (this.verbose && window && window.console) {
      console.log(partyPresence);
    }
  }
  onstatuspresence(statusPresence) {
    if (this.verbose && window && window.console) {
      console.log(statusPresence);
    }
  }
  onstreampresence(streamPresence) {
    if (this.verbose && window && window.console) {
      console.log(streamPresence);
    }
  }
  onstreamdata(streamData) {
    if (this.verbose && window && window.console) {
      console.log(streamData);
    }
  }
  send(message) {
    const untypedMessage = message;
    return new Promise((resolve, reject) => {
      if (!this.adapter.isConnected) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.match_data_send) {
          untypedMessage.match_data_send.data = b64EncodeUnicode(JSON.stringify(untypedMessage.match_data_send.data));
          this.adapter.send(untypedMessage);
          resolve();
        } else if (untypedMessage.party_data_send) {
          untypedMessage.party_data_send.data = b64EncodeUnicode(JSON.stringify(untypedMessage.party_data_send.data));
          this.adapter.send(untypedMessage);
          resolve();
        } else {
          if (untypedMessage.channel_message_send) {
            untypedMessage.channel_message_send.content = JSON.stringify(untypedMessage.channel_message_send.content);
          } else if (untypedMessage.channel_message_update) {
            untypedMessage.channel_message_update.content = JSON.stringify(untypedMessage.channel_message_update.content);
          }
          const cid = this.generatecid();
          this.cIds[cid] = { resolve, reject };
          untypedMessage.cid = cid;
          this.adapter.send(untypedMessage);
        }
      }
      if (this.verbose && window && window.console) {
        console.log("Sent message: %o", JSON.stringify(untypedMessage));
      }
    });
  }
  acceptPartyMember(party_id, presence) {
    return this.send({ party_accept: { party_id, presence } });
  }
  addMatchmaker(query, min_count, max_count, string_properties, numeric_properties) {
    return __async(this, null, function* () {
      const response = yield this.send({
        "matchmaker_add": {
          min_count,
          max_count,
          query,
          string_properties,
          numeric_properties
        }
      });
      return response.matchmaker_ticket;
    });
  }
  addMatchmakerParty(party_id, query, min_count, max_count, string_properties, numeric_properties) {
    return __async(this, null, function* () {
      const response = yield this.send({
        party_matchmaker_add: {
          party_id,
          min_count,
          max_count,
          query,
          string_properties,
          numeric_properties
        }
      });
      return response.party_matchmaker_ticket;
    });
  }
  closeParty(party_id) {
    return __async(this, null, function* () {
      return yield this.send({ party_close: { party_id } });
    });
  }
  createMatch() {
    return __async(this, null, function* () {
      const response = yield this.send({ match_create: {} });
      return response.match;
    });
  }
  createParty(open, max_size) {
    return __async(this, null, function* () {
      const response = yield this.send({ party_create: { open, max_size } });
      return response.party;
    });
  }
  followUsers(userIds) {
    return __async(this, null, function* () {
      const response = yield this.send({ status_follow: { user_ids: userIds } });
      return response.status;
    });
  }
  joinChat(target, type, persistence, hidden) {
    return __async(this, null, function* () {
      const response = yield this.send({
        channel_join: {
          target,
          type,
          persistence,
          hidden
        }
      });
      return response.channel;
    });
  }
  joinMatch(match_id, token, metadata) {
    return __async(this, null, function* () {
      const join = { match_join: { metadata } };
      if (token) {
        join.match_join.token = token;
      } else {
        join.match_join.match_id = match_id;
      }
      const response = yield this.send(join);
      return response.match;
    });
  }
  joinParty(party_id) {
    return __async(this, null, function* () {
      return yield this.send({ party_join: { party_id } });
    });
  }
  leaveChat(channel_id) {
    return this.send({ channel_leave: { channel_id } });
  }
  leaveMatch(matchId) {
    return this.send({ match_leave: { match_id: matchId } });
  }
  leaveParty(party_id) {
    return this.send({ party_leave: { party_id } });
  }
  listPartyJoinRequests(party_id) {
    return __async(this, null, function* () {
      const response = yield this.send({ party_join_request_list: { party_id } });
      return response.party_join_request;
    });
  }
  promotePartyMember(party_id, party_member) {
    return __async(this, null, function* () {
      const response = yield this.send({ party_promote: { party_id, presence: party_member } });
      return response.party_leader;
    });
  }
  removeChatMessage(channel_id, message_id) {
    return __async(this, null, function* () {
      const response = yield this.send({
        channel_message_remove: {
          channel_id,
          message_id
        }
      });
      return response.channel_message_ack;
    });
  }
  removeMatchmaker(ticket) {
    return this.send({ matchmaker_remove: { ticket } });
  }
  removeMatchmakerParty(party_id, ticket) {
    return this.send({
      party_matchmaker_remove: {
        party_id,
        ticket
      }
    });
  }
  removePartyMember(party_id, member) {
    return __async(this, null, function* () {
      return this.send({ party_remove: {
        party_id,
        presence: member
      } });
    });
  }
  rpc(id, payload, http_key) {
    return __async(this, null, function* () {
      const response = yield this.send({
        rpc: {
          id,
          payload,
          http_key
        }
      });
      return response.rpc;
    });
  }
  sendMatchState(matchId, opCode, data, presences) {
    return __async(this, null, function* () {
      return this.send({
        match_data_send: {
          match_id: matchId,
          op_code: opCode,
          data,
          presences: presences != null ? presences : []
        }
      });
    });
  }
  sendPartyData(party_id, op_code, data) {
    return this.send({ party_data_send: { party_id, op_code, data } });
  }
  unfollowUsers(user_ids) {
    return this.send({ status_unfollow: { user_ids } });
  }
  updateChatMessage(channel_id, message_id, content) {
    return __async(this, null, function* () {
      const response = yield this.send({ channel_message_update: { channel_id, message_id, content } });
      return response.channel_message_ack;
    });
  }
  updateStatus(status) {
    return this.send({ status_update: { status } });
  }
  writeChatMessage(channel_id, content) {
    return __async(this, null, function* () {
      const response = yield this.send({ channel_message_send: { channel_id, content } });
      return response.channel_message_ack;
    });
  }
};

// client.ts
var DEFAULT_HOST = "127.0.0.1";
var DEFAULT_PORT = "7350";
var DEFAULT_SERVER_KEY = "defaultkey";
var DEFAULT_TIMEOUT_MS = 7e3;
var DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1e3;
var Client = class {
  constructor(serverkey = DEFAULT_SERVER_KEY, host = DEFAULT_HOST, port = DEFAULT_PORT, useSSL = false, timeout = DEFAULT_TIMEOUT_MS, autoRefreshSession = true) {
    this.serverkey = serverkey;
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    this.timeout = timeout;
    this.autoRefreshSession = autoRefreshSession;
    this.expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;
    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;
    this.configuration = {
      basePath,
      username: serverkey,
      password: "",
      timeoutMs: timeout
    };
    this.apiClient = new NakamaApi(this.configuration);
  }
  addGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.addGroupUsers(groupId, ids).then((response) => {
        return response !== void 0;
      });
    });
  }
  addFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.addFriends(ids, usernames).then((response) => {
        return response !== void 0;
      });
    });
  }
  authenticateApple(_0, _1, _2) {
    return __async(this, arguments, function* (token, create, username, vars = new Map(), options = {}) {
      const request = {
        "token": token,
        "vars": vars
      };
      return this.apiClient.authenticateApple(request, create, username, options).then((apiSession) => {
        return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
      });
    });
  }
  authenticateCustom(id, create, username, vars = new Map(), options = {}) {
    const request = {
      "id": id,
      "vars": vars
    };
    return this.apiClient.authenticateCustom(request, create, username, options).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  authenticateDevice(id, create, username, vars) {
    const request = {
      "id": id,
      "vars": vars
    };
    return this.apiClient.authenticateDevice(request, create, username).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  authenticateEmail(email, password, create, username, vars) {
    const request = {
      "email": email,
      "password": password,
      "vars": vars
    };
    return this.apiClient.authenticateEmail(request, create, username).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  authenticateFacebookInstantGame(signedPlayerInfo, create, username, vars, options = {}) {
    const request = {
      "signed_player_info": signedPlayerInfo,
      "vars": vars
    };
    return this.apiClient.authenticateFacebookInstantGame({ signed_player_info: request.signed_player_info, vars: request.vars }, create, username, options).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  authenticateFacebook(token, create, username, sync, vars, options = {}) {
    const request = {
      "token": token,
      "vars": vars
    };
    return this.apiClient.authenticateFacebook(request, create, username, sync, options).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  authenticateGoogle(token, create, username, vars, options = {}) {
    const request = {
      "token": token,
      "vars": vars
    };
    return this.apiClient.authenticateGoogle(request, create, username, options).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  authenticateGameCenter(token, create, username, vars) {
    const request = {
      "token": token,
      "vars": vars
    };
    return this.apiClient.authenticateGameCenter(request, create, username).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  authenticateSteam(token, create, username, sync, vars) {
    return __async(this, null, function* () {
      const request = {
        "token": token,
        "vars": vars,
        "sync": sync
      };
      return this.apiClient.authenticateSteam(request, create, username).then((apiSession) => {
        return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
      });
    });
  }
  banGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.banGroupUsers(groupId, ids).then((response) => {
        return response !== void 0;
      });
    });
  }
  blockFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.blockFriends(ids, usernames).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  createGroup(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.createGroup(request).then((response) => {
        return Promise.resolve({
          avatar_url: response.avatar_url,
          create_time: response.create_time,
          creator_id: response.creator_id,
          description: response.description,
          edge_count: response.edge_count ? Number(response.edge_count) : 0,
          id: response.id,
          lang_tag: response.lang_tag,
          max_count: response.max_count ? Number(response.max_count) : 0,
          metadata: response.metadata ? JSON.parse(response.metadata) : void 0,
          name: response.name,
          open: response.open,
          update_time: response.update_time
        });
      });
    });
  }
  createSocket(useSSL = false, verbose = false, adapter = new WebSocketAdapterText()) {
    return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter);
  }
  deleteFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.deleteFriends(ids, usernames).then((response) => {
        return response !== void 0;
      });
    });
  }
  deleteGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.deleteGroup(groupId).then((response) => {
        return response !== void 0;
      });
    });
  }
  deleteNotifications(session, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.deleteNotifications(ids).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  deleteStorageObjects(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.deleteStorageObjects(request).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  demoteGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.demoteGroupUsers(groupId, ids).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  emitEvent(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.event(request).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  getAccount(session) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.getAccount();
    });
  }
  importFacebookFriends(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.importFacebookFriends(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  importSteamFriends(session, request, reset) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.importSteamFriends(request, reset).then((response) => {
        return response !== void 0;
      });
    });
  }
  getUsers(session, ids, usernames, facebookIds) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.getUsers(ids, usernames, facebookIds).then((response) => {
        var result = {
          users: []
        };
        if (response.users == null) {
          return Promise.resolve(result);
        }
        response.users.forEach((u) => {
          result.users.push({
            avatar_url: u.avatar_url,
            create_time: u.create_time,
            display_name: u.display_name,
            edge_count: u.edge_count ? Number(u.edge_count) : 0,
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
            metadata: u.metadata ? JSON.parse(u.metadata) : void 0
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  joinGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.joinGroup(groupId, {}).then((response) => {
        return response !== void 0;
      });
    });
  }
  joinTournament(session, tournamentId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.joinTournament(tournamentId, {}).then((response) => {
        return response !== void 0;
      });
    });
  }
  kickGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.kickGroupUsers(groupId, ids).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  leaveGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.leaveGroup(groupId, {}).then((response) => {
        return response !== void 0;
      });
    });
  }
  listChannelMessages(session, channelId, limit, forward, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listChannelMessages(channelId, limit, forward, cursor).then((response) => {
        var result = {
          messages: [],
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          cacheable_cursor: response.cacheable_cursor
        };
        if (response.messages == null) {
          return Promise.resolve(result);
        }
        response.messages.forEach((m) => {
          result.messages.push({
            channel_id: m.channel_id,
            code: m.code ? Number(m.code) : 0,
            create_time: m.create_time,
            message_id: m.message_id,
            persistent: m.persistent,
            sender_id: m.sender_id,
            update_time: m.update_time,
            username: m.username,
            content: m.content ? JSON.parse(m.content) : void 0,
            group_id: m.group_id,
            room_name: m.room_name,
            user_id_one: m.user_id_one,
            user_id_two: m.user_id_two
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  listGroupUsers(session, groupId, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listGroupUsers(groupId, limit, state, cursor).then((response) => {
        var result = {
          group_users: [],
          cursor: response.cursor
        };
        if (response.group_users == null) {
          return Promise.resolve(result);
        }
        response.group_users.forEach((gu) => {
          result.group_users.push({
            user: {
              avatar_url: gu.user.avatar_url,
              create_time: gu.user.create_time,
              display_name: gu.user.display_name,
              edge_count: gu.user.edge_count ? Number(gu.user.edge_count) : 0,
              facebook_id: gu.user.facebook_id,
              gamecenter_id: gu.user.gamecenter_id,
              google_id: gu.user.google_id,
              id: gu.user.id,
              lang_tag: gu.user.lang_tag,
              location: gu.user.location,
              online: gu.user.online,
              steam_id: gu.user.steam_id,
              timezone: gu.user.timezone,
              update_time: gu.user.update_time,
              username: gu.user.username,
              metadata: gu.user.metadata ? JSON.parse(gu.user.metadata) : void 0
            },
            state: gu.state ? Number(gu.state) : 0
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  listUserGroups(session, userId, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listUserGroups(userId, state, limit, cursor).then((response) => {
        var result = {
          user_groups: [],
          cursor: response.cursor
        };
        if (response.user_groups == null) {
          return Promise.resolve(result);
        }
        response.user_groups.forEach((ug) => {
          result.user_groups.push({
            group: {
              avatar_url: ug.group.avatar_url,
              create_time: ug.group.create_time,
              creator_id: ug.group.creator_id,
              description: ug.group.description,
              edge_count: ug.group.edge_count ? Number(ug.group.edge_count) : 0,
              id: ug.group.id,
              lang_tag: ug.group.lang_tag,
              max_count: ug.group.max_count,
              metadata: ug.group.metadata ? JSON.parse(ug.group.metadata) : void 0,
              name: ug.group.name,
              open: ug.group.open,
              update_time: ug.group.update_time
            },
            state: ug.state ? Number(ug.state) : 0
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  listGroups(session, name, cursor, limit) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listGroups(name, cursor, limit).then((response) => {
        var result = {
          groups: []
        };
        if (response.groups == null) {
          return Promise.resolve(result);
        }
        result.cursor = response.cursor;
        response.groups.forEach((ug) => {
          result.groups.push({
            avatar_url: ug.avatar_url,
            create_time: ug.create_time,
            creator_id: ug.creator_id,
            description: ug.description,
            edge_count: ug.edge_count ? Number(ug.edge_count) : 0,
            id: ug.id,
            lang_tag: ug.lang_tag,
            max_count: ug.max_count,
            metadata: ug.metadata ? JSON.parse(ug.metadata) : void 0,
            name: ug.name,
            open: ug.open,
            update_time: ug.update_time
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  linkApple(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkApple(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  linkCustom(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkCustom(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  linkDevice(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkDevice(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  linkEmail(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkEmail(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  linkFacebook(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkFacebook(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  linkFacebookInstantGame(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkFacebookInstantGame(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  linkGoogle(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkGoogle(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  linkGameCenter(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkGameCenter(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  linkSteam(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.linkSteam(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  listFriends(session, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listFriends(limit, state, cursor).then((response) => {
        var result = {
          friends: [],
          cursor: response.cursor
        };
        if (response.friends == null) {
          return Promise.resolve(result);
        }
        response.friends.forEach((f) => {
          result.friends.push({
            user: {
              avatar_url: f.user.avatar_url,
              create_time: f.user.create_time,
              display_name: f.user.display_name,
              edge_count: f.user.edge_count ? Number(f.user.edge_count) : 0,
              facebook_id: f.user.facebook_id,
              gamecenter_id: f.user.gamecenter_id,
              google_id: f.user.google_id,
              id: f.user.id,
              lang_tag: f.user.lang_tag,
              location: f.user.location,
              online: f.user.online,
              steam_id: f.user.steam_id,
              timezone: f.user.timezone,
              update_time: f.user.update_time,
              username: f.user.username,
              metadata: f.user.metadata ? JSON.parse(f.user.metadata) : void 0,
              facebook_instant_game_id: f.user.facebook_instant_game_id
            },
            state: f.state
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  listLeaderboardRecords(session, leaderboardId, ownerIds, limit, cursor, expiry) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listLeaderboardRecords(leaderboardId, ownerIds, limit, cursor, expiry).then((response) => {
        var list = {
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          owner_records: [],
          records: []
        };
        if (response.owner_records != null) {
          response.owner_records.forEach((o) => {
            list.owner_records.push({
              expiry_time: o.expiry_time,
              leaderboard_id: o.leaderboard_id,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              num_score: o.num_score ? Number(o.num_score) : 0,
              owner_id: o.owner_id,
              rank: o.rank ? Number(o.rank) : 0,
              score: o.score ? Number(o.score) : 0,
              subscore: o.subscore ? Number(o.subscore) : 0,
              update_time: o.update_time,
              username: o.username,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0
            });
          });
        }
        if (response.records != null) {
          response.records.forEach((o) => {
            list.records.push({
              expiry_time: o.expiry_time,
              leaderboard_id: o.leaderboard_id,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              num_score: o.num_score ? Number(o.num_score) : 0,
              owner_id: o.owner_id,
              rank: o.rank ? Number(o.rank) : 0,
              score: o.score ? Number(o.score) : 0,
              subscore: o.subscore ? Number(o.subscore) : 0,
              update_time: o.update_time,
              username: o.username,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0
            });
          });
        }
        return Promise.resolve(list);
      });
    });
  }
  listLeaderboardRecordsAroundOwner(session, leaderboardId, ownerId, limit, expiry) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listLeaderboardRecordsAroundOwner(leaderboardId, ownerId, limit, expiry).then((response) => {
        var list = {
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          owner_records: [],
          records: []
        };
        if (response.owner_records != null) {
          response.owner_records.forEach((o) => {
            list.owner_records.push({
              expiry_time: o.expiry_time,
              leaderboard_id: o.leaderboard_id,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              num_score: o.num_score ? Number(o.num_score) : 0,
              owner_id: o.owner_id,
              rank: o.rank ? Number(o.rank) : 0,
              score: o.score ? Number(o.score) : 0,
              subscore: o.subscore ? Number(o.subscore) : 0,
              update_time: o.update_time,
              username: o.username,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0
            });
          });
        }
        if (response.records != null) {
          response.records.forEach((o) => {
            list.records.push({
              expiry_time: o.expiry_time,
              leaderboard_id: o.leaderboard_id,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              num_score: o.num_score ? Number(o.num_score) : 0,
              owner_id: o.owner_id,
              rank: o.rank ? Number(o.rank) : 0,
              score: o.score ? Number(o.score) : 0,
              subscore: o.subscore ? Number(o.subscore) : 0,
              update_time: o.update_time,
              username: o.username,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0
            });
          });
        }
        return Promise.resolve(list);
      });
    });
  }
  listMatches(session, limit, authoritative, label, minSize, maxSize, query) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listMatches(limit, authoritative, label, minSize, maxSize, query);
    });
  }
  listNotifications(session, limit, cacheableCursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listNotifications(limit, cacheableCursor).then((response) => {
        var result = {
          cacheable_cursor: response.cacheable_cursor,
          notifications: []
        };
        if (response.notifications == null) {
          return Promise.resolve(result);
        }
        response.notifications.forEach((n) => {
          result.notifications.push({
            code: n.code ? Number(n.code) : 0,
            create_time: n.create_time,
            id: n.id,
            persistent: n.persistent,
            sender_id: n.sender_id,
            subject: n.subject,
            content: n.content ? JSON.parse(n.content) : void 0
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  listStorageObjects(session, collection, userId, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listStorageObjects(collection, userId, limit, cursor).then((response) => {
        var result = {
          objects: [],
          cursor: response.cursor
        };
        if (response.objects == null) {
          return Promise.resolve(result);
        }
        response.objects.forEach((o) => {
          result.objects.push({
            collection: o.collection,
            key: o.key,
            permission_read: o.permission_read ? Number(o.permission_read) : 0,
            permission_write: o.permission_write ? Number(o.permission_write) : 0,
            value: o.value ? JSON.parse(o.value) : void 0,
            version: o.version,
            user_id: o.user_id,
            create_time: o.create_time,
            update_time: o.update_time
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  listTournaments(session, categoryStart, categoryEnd, startTime, endTime, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listTournaments(categoryStart, categoryEnd, startTime, endTime, limit, cursor).then((response) => {
        var list = {
          cursor: response.cursor,
          tournaments: []
        };
        if (response.tournaments != null) {
          response.tournaments.forEach((o) => {
            list.tournaments.push({
              id: o.id,
              title: o.title,
              description: o.description,
              duration: o.duration ? Number(o.duration) : 0,
              category: o.category ? Number(o.category) : 0,
              sort_order: o.sort_order ? Number(o.sort_order) : 0,
              size: o.size ? Number(o.size) : 0,
              max_size: o.max_size ? Number(o.max_size) : 0,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
              can_enter: o.can_enter,
              end_active: o.end_active ? Number(o.end_active) : 0,
              next_reset: o.next_reset ? Number(o.next_reset) : 0,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              create_time: o.create_time,
              start_time: o.start_time,
              end_time: o.end_time,
              start_active: o.start_active
            });
          });
        }
        return Promise.resolve(list);
      });
    });
  }
  listTournamentRecords(session, tournamentId, ownerIds, limit, cursor, expiry) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listTournamentRecords(tournamentId, ownerIds, limit, cursor, expiry).then((response) => {
        var list = {
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          owner_records: [],
          records: []
        };
        if (response.owner_records != null) {
          response.owner_records.forEach((o) => {
            list.owner_records.push({
              expiry_time: o.expiry_time,
              leaderboard_id: o.leaderboard_id,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              num_score: o.num_score ? Number(o.num_score) : 0,
              owner_id: o.owner_id,
              rank: o.rank ? Number(o.rank) : 0,
              score: o.score ? Number(o.score) : 0,
              subscore: o.subscore ? Number(o.subscore) : 0,
              update_time: o.update_time,
              username: o.username,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0
            });
          });
        }
        if (response.records != null) {
          response.records.forEach((o) => {
            list.records.push({
              expiry_time: o.expiry_time,
              leaderboard_id: o.leaderboard_id,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              num_score: o.num_score ? Number(o.num_score) : 0,
              owner_id: o.owner_id,
              rank: o.rank ? Number(o.rank) : 0,
              score: o.score ? Number(o.score) : 0,
              subscore: o.subscore ? Number(o.subscore) : 0,
              update_time: o.update_time,
              username: o.username,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0
            });
          });
        }
        return Promise.resolve(list);
      });
    });
  }
  listTournamentRecordsAroundOwner(session, tournamentId, ownerId, limit, expiry) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.listTournamentRecordsAroundOwner(tournamentId, ownerId, limit, expiry).then((response) => {
        var list = {
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          owner_records: [],
          records: []
        };
        if (response.owner_records != null) {
          response.owner_records.forEach((o) => {
            list.owner_records.push({
              expiry_time: o.expiry_time,
              leaderboard_id: o.leaderboard_id,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              num_score: o.num_score ? Number(o.num_score) : 0,
              owner_id: o.owner_id,
              rank: o.rank ? Number(o.rank) : 0,
              score: o.score ? Number(o.score) : 0,
              subscore: o.subscore ? Number(o.subscore) : 0,
              update_time: o.update_time,
              username: o.username,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0
            });
          });
        }
        if (response.records != null) {
          response.records.forEach((o) => {
            list.records.push({
              expiry_time: o.expiry_time,
              leaderboard_id: o.leaderboard_id,
              metadata: o.metadata ? JSON.parse(o.metadata) : void 0,
              num_score: o.num_score ? Number(o.num_score) : 0,
              owner_id: o.owner_id,
              rank: o.rank ? Number(o.rank) : 0,
              score: o.score ? Number(o.score) : 0,
              subscore: o.subscore ? Number(o.subscore) : 0,
              update_time: o.update_time,
              username: o.username,
              max_num_score: o.max_num_score ? Number(o.max_num_score) : 0
            });
          });
        }
        return Promise.resolve(list);
      });
    });
  }
  promoteGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.promoteGroupUsers(groupId, ids);
    });
  }
  readStorageObjects(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.readStorageObjects(request).then((response) => {
        var result = { objects: [] };
        if (response.objects == null) {
          return Promise.resolve(result);
        }
        response.objects.forEach((o) => {
          result.objects.push({
            collection: o.collection,
            key: o.key,
            permission_read: o.permission_read ? Number(o.permission_read) : 0,
            permission_write: o.permission_write ? Number(o.permission_write) : 0,
            value: o.value ? JSON.parse(o.value) : void 0,
            version: o.version,
            user_id: o.user_id,
            create_time: o.create_time,
            update_time: o.update_time
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  rpc(session, id, input) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.rpcFunc(id, JSON.stringify(input)).then((response) => {
        return Promise.resolve({
          id: response.id,
          payload: !response.payload ? void 0 : JSON.parse(response.payload)
        });
      });
    });
  }
  rpcGet(id, session, httpKey, input) {
    return __async(this, null, function* () {
      if (session && this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      if (!httpKey || httpKey == "") {
        this.configuration.bearerToken = session && session.token;
      } else {
        this.configuration.username = void 0;
        this.configuration.bearerToken = void 0;
      }
      return this.apiClient.rpcFunc2(id, input && JSON.stringify(input) || "", httpKey).then((response) => {
        this.configuration.username = this.serverkey;
        return Promise.resolve({
          id: response.id,
          payload: !response.payload ? void 0 : JSON.parse(response.payload)
        });
      }).catch((err) => {
        this.configuration.username = this.serverkey;
        throw err;
      });
    });
  }
  sessionLogout(session, token, refreshToken) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.sessionLogout({ refresh_token: refreshToken, token }).then((response) => {
        return response !== void 0;
      });
    });
  }
  sessionRefresh(_0) {
    return __async(this, arguments, function* (session, vars = new Map()) {
      if (!session) {
        console.error("Cannot refresh a null session.");
        return session;
      }
      if (session.created && session.expires_at - session.created_at < 70) {
        console.warn("Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/install-configuration/#session");
      }
      if (session.created && session.refresh_expires_at - session.created_at < 3700) {
        console.warn("Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/install-configuration/#session");
      }
      const apiSession = yield this.apiClient.sessionRefresh({ token: session.refresh_token, vars });
      session.update(apiSession.token, apiSession.refresh_token);
      return session;
    });
  }
  unlinkApple(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkApple(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  unlinkCustom(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkCustom(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  unlinkDevice(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkDevice(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  unlinkEmail(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkEmail(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  unlinkFacebook(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkFacebook(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  unlinkFacebookInstantGame(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkFacebookInstantGame(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  unlinkGoogle(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkGoogle(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  unlinkGameCenter(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkGameCenter(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  unlinkSteam(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.unlinkSteam(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  updateAccount(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.updateAccount(request).then((response) => {
        return response !== void 0;
      });
    });
  }
  updateGroup(session, groupId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.updateGroup(groupId, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  validatePurchaseApple(session, receipt) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.validatePurchaseApple({ receipt });
    });
  }
  validatePurchaseGoogle(session, purchase) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.validatePurchaseGoogle({ purchase });
    });
  }
  validatePurchaseHuawei(session, purchase, signature) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.validatePurchaseHuawei({ purchase, signature });
    });
  }
  writeLeaderboardRecord(session, leaderboardId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.writeLeaderboardRecord(leaderboardId, {
        metadata: request.metadata ? JSON.stringify(request.metadata) : void 0,
        score: request.score,
        subscore: request.subscore
      }).then((response) => {
        return Promise.resolve({
          expiry_time: response.expiry_time,
          leaderboard_id: response.leaderboard_id,
          metadata: response.metadata ? JSON.parse(response.metadata) : void 0,
          num_score: response.num_score ? Number(response.num_score) : 0,
          owner_id: response.owner_id,
          score: response.score ? Number(response.score) : 0,
          subscore: response.subscore ? Number(response.subscore) : 0,
          update_time: response.update_time,
          username: response.username,
          max_num_score: response.max_num_score ? Number(response.max_num_score) : 0,
          rank: response.rank ? Number(response.rank) : 0
        });
      });
    });
  }
  writeStorageObjects(session, objects) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      this.configuration.bearerToken = session && session.token;
      var request = { objects: [] };
      objects.forEach((o) => {
        request.objects.push({
          collection: o.collection,
          key: o.key,
          permission_read: o.permission_read,
          permission_write: o.permission_write,
          value: JSON.stringify(o.value),
          version: o.version
        });
      });
      return this.apiClient.writeStorageObjects(request);
    });
  }
  writeTournamentRecord(session, tournamentId, request) {
    return __async(this, null, function* () {
      this.configuration.bearerToken = session && session.token;
      return this.apiClient.writeTournamentRecord(tournamentId, {
        metadata: request.metadata ? JSON.stringify(request.metadata) : void 0,
        score: request.score,
        subscore: request.subscore
      }).then((response) => {
        return Promise.resolve({
          expiry_time: response.expiry_time,
          leaderboard_id: response.leaderboard_id,
          metadata: response.metadata ? JSON.parse(response.metadata) : void 0,
          num_score: response.num_score ? Number(response.num_score) : 0,
          owner_id: response.owner_id,
          score: response.score ? Number(response.score) : 0,
          subscore: response.subscore ? Number(response.subscore) : 0,
          update_time: response.update_time,
          username: response.username,
          max_num_score: response.max_num_score ? Number(response.max_num_score) : 0,
          rank: response.rank ? Number(response.rank) : 0
        });
      });
    });
  }
};
export {
  Client,
  DefaultSocket,
  Session,
  WebSocketAdapterText
};
