"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// index.ts
var nakama_js_exports = {};
__export(nakama_js_exports, {
  Client: () => Client,
  DefaultSocket: () => DefaultSocket,
  Session: () => Session,
  WebSocketAdapterText: () => WebSocketAdapterText
});
module.exports = __toCommonJS(nakama_js_exports);

// ../../node_modules/whatwg-fetch/fetch.js
var global = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
var support = {
  searchParams: "URLSearchParams" in global,
  iterable: "Symbol" in global && "iterator" in Symbol,
  blob: "FileReader" in global && "Blob" in global && function() {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: "FormData" in global,
  arrayBuffer: "ArrayBuffer" in global
};
function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj);
}
if (support.arrayBuffer) {
  viewClasses = [
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
  isArrayBufferView = ArrayBuffer.isView || function(obj) {
    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
  };
}
var viewClasses;
var isArrayBufferView;
function normalizeName(name) {
  if (typeof name !== "string") {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
    throw new TypeError('Invalid character in header field name: "' + name + '"');
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
  this.map[name] = oldValue ? oldValue + ", " + value : value;
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
  var chars2 = new Array(view.length);
  for (var i = 0; i < view.length; i++) {
    chars2[i] = String.fromCharCode(view[i]);
  }
  return chars2.join("");
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
    this.bodyUsed = this.bodyUsed;
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
      this._bodyText = body = Object.prototype.toString.call(body);
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
        var isConsumed = consumed(this);
        if (isConsumed) {
          return isConsumed;
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          );
        } else {
          return Promise.resolve(this._bodyArrayBuffer);
        }
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
      return this.text().then(decode);
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
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  }
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
    this.signal = input.signal;
    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }
  this.credentials = options.credentials || this.credentials || "same-origin";
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }
  this.method = normalizeMethod(options.method || this.method || "GET");
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;
  if ((this.method === "GET" || this.method === "HEAD") && body) {
    throw new TypeError("Body not allowed for GET or HEAD requests");
  }
  this._initBody(body);
  if (this.method === "GET" || this.method === "HEAD") {
    if (options.cache === "no-store" || options.cache === "no-cache") {
      var reParamSearch = /([?&])_=[^&]*/;
      if (reParamSearch.test(this.url)) {
        this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
      } else {
        var reQueryString = /\?/;
        this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
      }
    }
  }
}
Request.prototype.clone = function() {
  return new Request(this, { body: this._bodyInit });
};
function decode(body) {
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
  preProcessedHeaders.split("\r").map(function(header) {
    return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
  }).forEach(function(line) {
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
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  }
  if (!options) {
    options = {};
  }
  this.type = "default";
  this.status = options.status === void 0 ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
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
var DOMException = global.DOMException;
try {
  new DOMException();
} catch (err) {
  DOMException = function(message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };
  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}
function fetch2(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init);
    if (request.signal && request.signal.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }
    var xhr = new XMLHttpRequest();
    function abortXhr() {
      xhr.abort();
    }
    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || "")
      };
      options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
      var body = "response" in xhr ? xhr.response : xhr.responseText;
      setTimeout(function() {
        resolve(new Response(body, options));
      }, 0);
    };
    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError("Network request failed"));
      }, 0);
    };
    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError("Network request failed"));
      }, 0);
    };
    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException("Aborted", "AbortError"));
      }, 0);
    };
    function fixUrl(url) {
      try {
        return url === "" && global.location.href ? global.location.href : url;
      } catch (e) {
        return url;
      }
    }
    xhr.open(request.method, fixUrl(request.url), true);
    if (request.credentials === "include") {
      xhr.withCredentials = true;
    } else if (request.credentials === "omit") {
      xhr.withCredentials = false;
    }
    if ("responseType" in xhr) {
      if (support.blob) {
        xhr.responseType = "blob";
      } else if (support.arrayBuffer && request.headers.get("Content-Type") && request.headers.get("Content-Type").indexOf("application/octet-stream") !== -1) {
        xhr.responseType = "arraybuffer";
      }
    }
    if (init && typeof init.headers === "object" && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
      });
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });
    }
    if (request.signal) {
      request.signal.addEventListener("abort", abortXhr);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          request.signal.removeEventListener("abort", abortXhr);
        }
      };
    }
    xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
  });
}
fetch2.polyfill = true;
if (!global.fetch) {
  global.fetch = fetch2;
  global.Headers = Headers;
  global.Request = Request;
  global.Response = Response;
}

// ../../node_modules/js-base64/base64.mjs
var _hasatob = typeof atob === "function";
var _hasbtoa = typeof btoa === "function";
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
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
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode2 = (src) => _decode(_unURI(src));

// utils.ts
function buildFetchOptions(method, options, bodyJson) {
  const fetchOptions = __spreadValues(__spreadValues({}, { method }), options);
  fetchOptions.headers = __spreadValues({}, options.headers);
  if (typeof XMLHttpRequest !== "undefined") {
    const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");
    if (!(descriptor == null ? void 0 : descriptor.set)) {
      fetchOptions.credentials = "cocos-ignore";
    }
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
var NakamaApi = class {
  constructor(serverKey, basePath, timeoutMs) {
    this.serverKey = serverKey;
    this.basePath = basePath;
    this.timeoutMs = timeoutMs;
  }
  /** A healthcheck which load balancers can use to check the service. */
  healthcheck(bearerToken, options = {}) {
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
  /** Delete the current user's account. */
  deleteAccount(bearerToken, options = {}) {
    const urlPath = "/v2/account";
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
  /** Fetch the current user's account. */
  getAccount(bearerToken, options = {}) {
    const urlPath = "/v2/account";
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
  /** Update fields in the current user's account. */
  updateAccount(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account";
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
  /** Authenticate a user with an Apple ID against the server. */
  authenticateApple(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/apple";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Authenticate a user with a custom id against the server. */
  authenticateCustom(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/custom";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Authenticate a user with a device id against the server. */
  authenticateDevice(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/device";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/email";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Authenticate a user with a Facebook OAuth token against the server. */
  authenticateFacebook(basicAuthUsername, basicAuthPassword, account, create, username, sync, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/facebook";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    queryParams.set("sync", sync);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Authenticate a user with a Facebook Instant Game token against the server. */
  authenticateFacebookInstantGame(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/facebookinstantgame";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Authenticate a user with Apple's GameCenter against the server. */
  authenticateGameCenter(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/gamecenter";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Authenticate a user with Google against the server. */
  authenticateGoogle(basicAuthUsername, basicAuthPassword, account, create, username, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/google";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Authenticate a user with Steam against the server. */
  authenticateSteam(basicAuthUsername, basicAuthPassword, account, create, username, sync, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/authenticate/steam";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("create", create);
    queryParams.set("username", username);
    queryParams.set("sync", sync);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Add an Apple ID to the social profiles on the current user's account. */
  linkApple(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/apple";
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
  /** Add a custom ID to the social profiles on the current user's account. */
  linkCustom(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/custom";
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
  /** Add a device ID to the social profiles on the current user's account. */
  linkDevice(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/device";
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
  /** Add an email+password to the social profiles on the current user's account. */
  linkEmail(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/email";
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
  /** Add Facebook to the social profiles on the current user's account. */
  linkFacebook(bearerToken, account, sync, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/facebook";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("sync", sync);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** Add Facebook Instant Game to the social profiles on the current user's account. */
  linkFacebookInstantGame(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/facebookinstantgame";
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
  /** Add Apple's GameCenter to the social profiles on the current user's account. */
  linkGameCenter(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/gamecenter";
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
  /** Add Google to the social profiles on the current user's account. */
  linkGoogle(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/google";
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
  /** Add Steam to the social profiles on the current user's account. */
  linkSteam(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/link/steam";
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
  sessionRefresh(basicAuthUsername, basicAuthPassword, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/session/refresh";
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
  /** Remove the Apple ID from the social profiles on the current user's account. */
  unlinkApple(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/apple";
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
  /** Remove the custom ID from the social profiles on the current user's account. */
  unlinkCustom(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/custom";
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
  /** Remove the device ID from the social profiles on the current user's account. */
  unlinkDevice(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/device";
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
  /** Remove the email+password from the social profiles on the current user's account. */
  unlinkEmail(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/email";
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
  /** Remove Facebook from the social profiles on the current user's account. */
  unlinkFacebook(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/facebook";
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
  /** Remove Facebook Instant Game profile from the social profiles on the current user's account. */
  unlinkFacebookInstantGame(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/facebookinstantgame";
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
  /** Remove Apple's GameCenter from the social profiles on the current user's account. */
  unlinkGameCenter(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/gamecenter";
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
  /** Remove Google from the social profiles on the current user's account. */
  unlinkGoogle(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/google";
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
  /** Remove Steam from the social profiles on the current user's account. */
  unlinkSteam(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/account/unlink/steam";
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
  /** List a channel's message history. */
  listChannelMessages(bearerToken, channelId, limit, forward, cursor, options = {}) {
    if (channelId === null || channelId === void 0) {
      throw new Error("'channelId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/channel/{channelId}".replace("{channelId}", encodeURIComponent(String(channelId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("forward", forward);
    queryParams.set("cursor", cursor);
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
  /** Submit an event for processing in the server's registered runtime custom events handler. */
  event(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/event";
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
  /** Delete one or more users by ID or username. */
  deleteFriends(bearerToken, ids, usernames, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    queryParams.set("usernames", usernames);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
  /** List all friends for the current user. */
  listFriends(bearerToken, limit, state, cursor, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("state", state);
    queryParams.set("cursor", cursor);
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
  /** Add friends by ID or username to a user's account. */
  addFriends(bearerToken, ids, usernames, options = {}) {
    const urlPath = "/v2/friend";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    queryParams.set("usernames", usernames);
    let bodyJson = "";
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
  /** Block one or more users by ID or username. */
  blockFriends(bearerToken, ids, usernames, options = {}) {
    const urlPath = "/v2/friend/block";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    queryParams.set("usernames", usernames);
    let bodyJson = "";
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
  /** Import Facebook friends and add them to a user's account. */
  importFacebookFriends(bearerToken, account, reset, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/friend/facebook";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("reset", reset);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** List friends of friends for the current user. */
  listFriendsOfFriends(bearerToken, limit, cursor, options = {}) {
    const urlPath = "/v2/friend/friends";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
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
  /** Import Steam friends and add them to a user's account. */
  importSteamFriends(bearerToken, account, reset, options = {}) {
    if (account === null || account === void 0) {
      throw new Error("'account' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/friend/steam";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("reset", reset);
    let bodyJson = "";
    bodyJson = JSON.stringify(account || {});
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
  /** List groups based on given filters. */
  listGroups(bearerToken, name, cursor, limit, langTag, members, open, options = {}) {
    const urlPath = "/v2/group";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("name", name);
    queryParams.set("cursor", cursor);
    queryParams.set("limit", limit);
    queryParams.set("lang_tag", langTag);
    queryParams.set("members", members);
    queryParams.set("open", open);
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
  /** Create a new group with the current user as the owner. */
  createGroup(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group";
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
  /** Delete a group by ID. */
  deleteGroup(bearerToken, groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
  /** Update fields in a given group. */
  updateGroup(bearerToken, groupId, body, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}".replace("{groupId}", encodeURIComponent(String(groupId)));
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
  /** Add users to a group. */
  addGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/add".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_ids", userIds);
    let bodyJson = "";
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
  /** Ban a set of users from a group. */
  banGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/ban".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_ids", userIds);
    let bodyJson = "";
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
  /** Demote a set of users in a group to the next role down. */
  demoteGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/demote".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_ids", userIds);
    let bodyJson = "";
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
  /** Immediately join an open group, or request to join a closed one. */
  joinGroup(bearerToken, groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/join".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
  /** Kick a set of users from a group. */
  kickGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/kick".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_ids", userIds);
    let bodyJson = "";
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
  /** Leave a group the user is a member of. */
  leaveGroup(bearerToken, groupId, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/leave".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
  /** Promote a set of users in a group to the next role up. */
  promoteGroupUsers(bearerToken, groupId, userIds, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/promote".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_ids", userIds);
    let bodyJson = "";
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
  /** List all users that are part of a group. */
  listGroupUsers(bearerToken, groupId, limit, state, cursor, options = {}) {
    if (groupId === null || groupId === void 0) {
      throw new Error("'groupId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/group/{groupId}/user".replace("{groupId}", encodeURIComponent(String(groupId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("state", state);
    queryParams.set("cursor", cursor);
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
  /** Validate Apple IAP Receipt */
  validatePurchaseApple(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/purchase/apple";
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
  /** Validate FB Instant IAP Receipt */
  validatePurchaseFacebookInstant(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/purchase/facebookinstant";
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
  /** Validate Google IAP Receipt */
  validatePurchaseGoogle(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/purchase/google";
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
  /** Validate Huawei IAP Receipt */
  validatePurchaseHuawei(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/purchase/huawei";
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
  /** List user's subscriptions. */
  listSubscriptions(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/subscription";
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
  /** Validate Apple Subscription Receipt */
  validateSubscriptionApple(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/subscription/apple";
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
  /** Validate Google Subscription Receipt */
  validateSubscriptionGoogle(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/subscription/google";
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
  /** Get subscription by product id. */
  getSubscription(bearerToken, productId, options = {}) {
    if (productId === null || productId === void 0) {
      throw new Error("'productId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/iap/subscription/{productId}".replace("{productId}", encodeURIComponent(String(productId)));
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
  /** Delete a leaderboard record. */
  deleteLeaderboardRecord(bearerToken, leaderboardId, options = {}) {
    if (leaderboardId === null || leaderboardId === void 0) {
      throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/leaderboard/{leaderboardId}".replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
  /** List leaderboard records. */
  listLeaderboardRecords(bearerToken, leaderboardId, ownerIds, limit, cursor, expiry, options = {}) {
    if (leaderboardId === null || leaderboardId === void 0) {
      throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/leaderboard/{leaderboardId}".replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("owner_ids", ownerIds);
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
    queryParams.set("expiry", expiry);
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
  /** Write a record to a leaderboard. */
  writeLeaderboardRecord(bearerToken, leaderboardId, record, options = {}) {
    if (leaderboardId === null || leaderboardId === void 0) {
      throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
    }
    if (record === null || record === void 0) {
      throw new Error("'record' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/leaderboard/{leaderboardId}".replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(record || {});
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
  /** List leaderboard records that belong to a user. */
  listLeaderboardRecordsAroundOwner(bearerToken, leaderboardId, ownerId, limit, expiry, cursor, options = {}) {
    if (leaderboardId === null || leaderboardId === void 0) {
      throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
    }
    if (ownerId === null || ownerId === void 0) {
      throw new Error("'ownerId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/leaderboard/{leaderboardId}/owner/{ownerId}".replace("{leaderboardId}", encodeURIComponent(String(leaderboardId))).replace("{ownerId}", encodeURIComponent(String(ownerId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("expiry", expiry);
    queryParams.set("cursor", cursor);
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
  /** Fetch list of running matches. */
  listMatches(bearerToken, limit, authoritative, label, minSize, maxSize, query, options = {}) {
    const urlPath = "/v2/match";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("authoritative", authoritative);
    queryParams.set("label", label);
    queryParams.set("min_size", minSize);
    queryParams.set("max_size", maxSize);
    queryParams.set("query", query);
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
  /** Delete one or more notifications for the current user. */
  deleteNotifications(bearerToken, ids, options = {}) {
    const urlPath = "/v2/notification";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
  /** Fetch list of notifications. */
  listNotifications(bearerToken, limit, cacheableCursor, options = {}) {
    const urlPath = "/v2/notification";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("cacheable_cursor", cacheableCursor);
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
  /** Execute a Lua function on the server. */
  rpcFunc2(bearerToken, id, payload, httpKey, options = {}) {
    if (id === null || id === void 0) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/rpc/{id}".replace("{id}", encodeURIComponent(String(id)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("payload", payload);
    queryParams.set("http_key", httpKey);
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
  /** Execute a Lua function on the server. */
  rpcFunc(bearerToken, id, body, httpKey, options = {}) {
    if (id === null || id === void 0) {
      throw new Error("'id' is a required parameter but is null or undefined.");
    }
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/rpc/{id}".replace("{id}", encodeURIComponent(String(id)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("http_key", httpKey);
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
  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  sessionLogout(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/session/logout";
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
  /** Get storage objects. */
  readStorageObjects(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage";
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
  /** Write objects into the storage engine. */
  writeStorageObjects(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage";
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
  /** Delete one or more objects by ID or username. */
  deleteStorageObjects(bearerToken, body, options = {}) {
    if (body === null || body === void 0) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/delete";
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
  /** List publicly readable storage objects in a given collection. */
  listStorageObjects(bearerToken, collection, userId, limit, cursor, options = {}) {
    if (collection === null || collection === void 0) {
      throw new Error("'collection' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/{collection}".replace("{collection}", encodeURIComponent(String(collection)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("user_id", userId);
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
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
  /** List publicly readable storage objects in a given collection. */
  listStorageObjects2(bearerToken, collection, userId, limit, cursor, options = {}) {
    if (collection === null || collection === void 0) {
      throw new Error("'collection' is a required parameter but is null or undefined.");
    }
    if (userId === null || userId === void 0) {
      throw new Error("'userId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/storage/{collection}/{userId}".replace("{collection}", encodeURIComponent(String(collection))).replace("{userId}", encodeURIComponent(String(userId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
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
  /** List current or upcoming tournaments. */
  listTournaments(bearerToken, categoryStart, categoryEnd, startTime, endTime, limit, cursor, options = {}) {
    const urlPath = "/v2/tournament";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("category_start", categoryStart);
    queryParams.set("category_end", categoryEnd);
    queryParams.set("start_time", startTime);
    queryParams.set("end_time", endTime);
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
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
  /** Delete a tournament record. */
  deleteTournamentRecord(bearerToken, tournamentId, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
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
  /** List tournament records. */
  listTournamentRecords(bearerToken, tournamentId, ownerIds, limit, cursor, expiry, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("owner_ids", ownerIds);
    queryParams.set("limit", limit);
    queryParams.set("cursor", cursor);
    queryParams.set("expiry", expiry);
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
  /** Write a record to a tournament. */
  writeTournamentRecord2(bearerToken, tournamentId, record, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    if (record === null || record === void 0) {
      throw new Error("'record' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(record || {});
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
  /** Write a record to a tournament. */
  writeTournamentRecord(bearerToken, tournamentId, record, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    if (record === null || record === void 0) {
      throw new Error("'record' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
    bodyJson = JSON.stringify(record || {});
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
  /** Attempt to join an open and running tournament. */
  joinTournament(bearerToken, tournamentId, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}/join".replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
    const queryParams = /* @__PURE__ */ new Map();
    let bodyJson = "";
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
  /** List tournament records for a given owner. */
  listTournamentRecordsAroundOwner(bearerToken, tournamentId, ownerId, limit, expiry, cursor, options = {}) {
    if (tournamentId === null || tournamentId === void 0) {
      throw new Error("'tournamentId' is a required parameter but is null or undefined.");
    }
    if (ownerId === null || ownerId === void 0) {
      throw new Error("'ownerId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/tournament/{tournamentId}/owner/{ownerId}".replace("{tournamentId}", encodeURIComponent(String(tournamentId))).replace("{ownerId}", encodeURIComponent(String(ownerId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("expiry", expiry);
    queryParams.set("cursor", cursor);
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
  /** Fetch zero or more users by ID and/or username. */
  getUsers(bearerToken, ids, usernames, facebookIds, options = {}) {
    const urlPath = "/v2/user";
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("ids", ids);
    queryParams.set("usernames", usernames);
    queryParams.set("facebook_ids", facebookIds);
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
  /** List groups the current user belongs to. */
  listUserGroups(bearerToken, userId, limit, state, cursor, options = {}) {
    if (userId === null || userId === void 0) {
      throw new Error("'userId' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v2/user/{userId}/group".replace("{userId}", encodeURIComponent(String(userId)));
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set("limit", limit);
    queryParams.set("state", state);
    queryParams.set("cursor", cursor);
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
  constructor(token, refresh_token, created) {
    this.created = created;
    this.token = token;
    this.refresh_token = refresh_token;
    this.created_at = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
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
    this.username = tokenDecoded["usn"];
    this.user_id = tokenDecoded["uid"];
    this.vars = tokenDecoded["vrs"];
  }
  static restore(token, refreshToken) {
    return new Session(token, refreshToken, false);
  }
};

// ../../node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
var i;
var encode2 = function(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }
  return base64;
};
var decode3 = function(base64) {
  var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};

// web_socket_adapter.ts
var WebSocketAdapterText = class {
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
        if (message.match_data && message.match_data.data) {
          message.match_data.data = new Uint8Array(decode3(message.match_data.data));
        } else if (message.party_data && message.party_data.data) {
          message.party_data.data = new Uint8Array(decode3(message.party_data.data));
        }
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
  isOpen() {
    var _a;
    return ((_a = this._socket) == null ? void 0 : _a.readyState) == WebSocket.OPEN;
  }
  connect(scheme, host, port, createStatus, token) {
    const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}`;
    this._socket = new WebSocket(url);
  }
  close() {
    this._socket.close();
    this._socket = void 0;
  }
  send(msg) {
    if (msg.match_data_send) {
      msg.match_data_send.op_code = msg.match_data_send.op_code.toString();
      let payload = msg.match_data_send.data;
      if (payload && payload instanceof Uint8Array) {
        msg.match_data_send.data = encode2(payload.buffer);
      } else if (payload) {
        msg.match_data_send.data = _btoa(payload);
      }
    } else if (msg.party_data_send) {
      msg.party_data_send.op_code = msg.party_data_send.op_code.toString();
      let payload = msg.party_data_send.data;
      if (payload && payload instanceof Uint8Array) {
        msg.party_data_send.data = encode2(payload.buffer);
      } else if (payload) {
        msg.party_data_send.data = _btoa(payload);
      }
    }
    this._socket.send(JSON.stringify(msg));
  }
};

// socket.ts
var _DefaultSocket = class {
  constructor(host, port, useSSL = false, verbose = false, adapter = new WebSocketAdapterText(), sendTimeoutMs = _DefaultSocket.DefaultSendTimeoutMs) {
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    this.verbose = verbose;
    this.adapter = adapter;
    this.sendTimeoutMs = sendTimeoutMs;
    this.cIds = {};
    this.nextCid = 1;
    this._heartbeatTimeoutMs = _DefaultSocket.DefaultHeartbeatTimeoutMs;
  }
  generatecid() {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }
  connect(session, createStatus = false, connectTimeoutMs = _DefaultSocket.DefaultConnectTimeoutMs) {
    if (this.adapter.isOpen()) {
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
      if (!message.cid) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n) => {
            n.content = n.content ? JSON.parse(n.content) : void 0;
            this.onnotification(n);
          });
        } else if (message.match_data) {
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
          message.party_data.op_code = parseInt(message.party_data.op_code);
          this.onpartydata(message.party_data);
        } else if (message.party_close) {
          this.onpartyclose(message.party_close);
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
        this.pingPong();
        resolve(session);
      };
      this.adapter.onError = (evt) => {
        reject(evt);
        this.adapter.close();
      };
      setTimeout(() => {
        reject("The socket timed out when trying to connect.");
      }, connectTimeoutMs);
    });
  }
  disconnect(fireDisconnectEvent = true) {
    if (this.adapter.isOpen()) {
      this.adapter.close();
    }
    if (fireDisconnectEvent) {
      this.ondisconnect({});
    }
  }
  setHeartbeatTimeoutMs(ms) {
    this._heartbeatTimeoutMs = ms;
  }
  getHeartbeatTimeoutMs() {
    return this._heartbeatTimeoutMs;
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
  onpartyclose(close) {
    if (this.verbose && window && window.console) {
      console.log("Party closed: " + close);
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
  onheartbeattimeout() {
    if (this.verbose && window && window.console) {
      console.log("Heartbeat timeout.");
    }
  }
  send(message, sendTimeout = _DefaultSocket.DefaultSendTimeoutMs) {
    const untypedMessage = message;
    return new Promise((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.match_data_send) {
          this.adapter.send(untypedMessage);
          resolve();
        } else if (untypedMessage.party_data_send) {
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
          setTimeout(() => {
            reject("The socket timed out while waiting for a response.");
          }, sendTimeout);
          untypedMessage.cid = cid;
          this.adapter.send(untypedMessage);
        }
      }
      if (this.verbose && window && window.console) {
        const loggedMessage = __spreadValues({}, untypedMessage);
        if (loggedMessage.match_data_send && loggedMessage.match_data_send.data) {
          loggedMessage.match_data_send.data = decode2(loggedMessage.match_data_send.data);
        } else if (loggedMessage.party_data_send && loggedMessage.party_data_send.data) {
          loggedMessage.party_data_send.data = decode2(loggedMessage.party_data_send.data);
        }
        console.log("Sent message: %o", JSON.stringify(loggedMessage));
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
  createMatch(name) {
    return __async(this, null, function* () {
      const response = yield this.send({ match_create: { name } });
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
      const response = yield this.send(
        {
          channel_join: {
            target,
            type,
            persistence,
            hidden
          }
        }
      );
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
      const response = yield this.send(
        {
          channel_message_remove: {
            channel_id,
            message_id
          }
        }
      );
      return response.channel_message_ack;
    });
  }
  removeMatchmaker(ticket) {
    return this.send({ matchmaker_remove: { ticket } });
  }
  removeMatchmakerParty(party_id, ticket) {
    return this.send(
      {
        party_matchmaker_remove: {
          party_id,
          ticket
        }
      }
    );
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
      const response = yield this.send(
        {
          rpc: {
            id,
            payload,
            http_key
          }
        }
      );
      return response.rpc;
    });
  }
  sendMatchState(matchId, opCode, data, presences, reliable) {
    return __async(this, null, function* () {
      return this.send(
        {
          match_data_send: {
            match_id: matchId,
            op_code: opCode,
            data,
            presences: presences != null ? presences : [],
            reliable
          }
        }
      );
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
  pingPong() {
    return __async(this, null, function* () {
      if (!this.adapter.isOpen()) {
        return;
      }
      try {
        yield this.send({ ping: {} }, this._heartbeatTimeoutMs);
      } catch (e) {
        if (this.adapter.isOpen()) {
          if (window && window.console) {
            console.error("Server unreachable from heartbeat.");
          }
          this.onheartbeattimeout();
          this.adapter.close();
        }
        return;
      }
      setTimeout(() => this.pingPong(), this._heartbeatTimeoutMs);
    });
  }
};
var DefaultSocket = _DefaultSocket;
DefaultSocket.DefaultHeartbeatTimeoutMs = 1e4;
DefaultSocket.DefaultSendTimeoutMs = 1e4;
DefaultSocket.DefaultConnectTimeoutMs = 3e4;

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
    /** The expired timespan used to check session lifetime. */
    this.expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;
    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;
    this.apiClient = new NakamaApi(serverkey, basePath, timeout);
  }
  /** Add users to a group, or accept their join requests. */
  addGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.addGroupUsers(session.token, groupId, ids).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add friends by ID or username to a user's account. */
  addFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.addFriends(session.token, ids, usernames).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Authenticate a user with an Apple ID against the server. */
  authenticateApple(_0, _1, _2) {
    return __async(this, arguments, function* (token, create, username, vars = {}, options = {}) {
      const request = {
        "token": token,
        "vars": vars
      };
      return this.apiClient.authenticateApple(this.serverkey, "", request, create, username, options).then((apiSession) => {
        return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
      });
    });
  }
  /** Authenticate a user with a custom id against the server. */
  authenticateCustom(id, create, username, vars = {}, options = {}) {
    const request = {
      "id": id,
      "vars": vars
    };
    return this.apiClient.authenticateCustom(this.serverkey, "", request, create, username, options).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with a device id against the server. */
  authenticateDevice(id, create, username, vars) {
    const request = {
      "id": id,
      "vars": vars
    };
    return this.apiClient.authenticateDevice(this.serverkey, "", request, create, username).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(email, password, create, username, vars) {
    const request = {
      "email": email,
      "password": password,
      "vars": vars
    };
    return this.apiClient.authenticateEmail(this.serverkey, "", request, create, username).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with a Facebook Instant Game token against the server. */
  authenticateFacebookInstantGame(signedPlayerInfo, create, username, vars, options = {}) {
    const request = {
      "signed_player_info": signedPlayerInfo,
      "vars": vars
    };
    return this.apiClient.authenticateFacebookInstantGame(
      this.serverkey,
      "",
      { signed_player_info: request.signed_player_info, vars: request.vars },
      create,
      username,
      options
    ).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with a Facebook OAuth token against the server. */
  authenticateFacebook(token, create, username, sync, vars, options = {}) {
    const request = {
      "token": token,
      "vars": vars
    };
    return this.apiClient.authenticateFacebook(this.serverkey, "", request, create, username, sync, options).then((apiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }
  /** Authenticate a user with Google against the server. */
  authenticateGoogle(_0, _1, _2, _3) {
    return __async(this, arguments, function* (token, create, username, vars, options = {}) {
      const request = {
        token,
        vars
      };
      const apiSession = yield this.apiClient.authenticateGoogle(
        this.serverkey,
        "",
        request,
        create,
        username,
        options
      );
      return new Session(
        apiSession.token || "",
        apiSession.refresh_token || "",
        apiSession.created || false
      );
    });
  }
  /** Authenticate a user with GameCenter against the server. */
  authenticateGameCenter(_0, _1, _2, _3, _4, _5, _6, _7, _8) {
    return __async(this, arguments, function* (bundleId, playerId, publicKeyUrl, salt, signature, timestamp, username, create, vars, options = {}) {
      const request = {
        bundle_id: bundleId,
        player_id: playerId,
        public_key_url: publicKeyUrl,
        salt,
        signature,
        timestamp_seconds: timestamp,
        vars
      };
      const apiSession = yield this.apiClient.authenticateGameCenter(
        this.serverkey,
        "",
        request,
        create,
        username,
        options
      );
      return new Session(
        apiSession.token || "",
        apiSession.refresh_token || "",
        apiSession.created || false
      );
    });
  }
  /** Authenticate a user with Steam against the server. */
  authenticateSteam(token, create, username, sync, vars) {
    return __async(this, null, function* () {
      const request = {
        "token": token,
        "vars": vars,
        "sync": sync
      };
      return this.apiClient.authenticateSteam(this.serverkey, "", request, create, username).then((apiSession) => {
        return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
      });
    });
  }
  /** Ban users from a group. */
  banGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.banGroupUsers(session.token, groupId, ids).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Block one or more users by ID or username. */
  blockFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.blockFriends(session.token, ids, usernames).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Create a new group with the current user as the creator and superadmin. */
  createGroup(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.createGroup(session.token, request).then((response) => {
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
  /** A socket created with the client's configuration. */
  createSocket(useSSL = false, verbose = false, adapter = new WebSocketAdapterText(), sendTimeoutMs = DefaultSocket.DefaultSendTimeoutMs) {
    return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter, sendTimeoutMs);
  }
  /** Delete the current user's account. */
  deleteAccount(session) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteAccount(session.token).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Delete one or more users by ID or username. */
  deleteFriends(session, ids, usernames) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteFriends(session.token, ids, usernames).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Delete a group the user is part of and has permissions to delete. */
  deleteGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteGroup(session.token, groupId).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Delete one or more notifications */
  deleteNotifications(session, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteNotifications(session.token, ids).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Delete one or more storage objects */
  deleteStorageObjects(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.deleteStorageObjects(session.token, request).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Delete a tournament record. */
  deleteTournamentRecord(session, tournamentId) {
    return __async(this, null, function* () {
      return this.apiClient.deleteTournamentRecord(session.token, tournamentId);
    });
  }
  /** Demote a set of users in a group to the next role down. */
  demoteGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.demoteGroupUsers(session.token, groupId, ids).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Submit an event for processing in the server's registered runtime custom events handler. */
  emitEvent(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.event(session.token, request).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Fetch the current user's account. */
  getAccount(session) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getAccount(session.token);
    });
  }
  /** Get subscription by product id. */
  getSubscription(session, productId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getSubscription(session.token, productId);
    });
  }
  /** Import Facebook friends and add them to a user's account. */
  importFacebookFriends(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.importFacebookFriends(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Import Steam friends and add them to a user's account. */
  importSteamFriends(session, request, reset) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.importSteamFriends(session.token, request, reset).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Fetch zero or more users by ID and/or username. */
  getUsers(session, ids, usernames, facebookIds) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.getUsers(session.token, ids, usernames, facebookIds).then((response) => {
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
  /** Join a group that's open, or send a request to join a group that is closed. */
  joinGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.joinGroup(session.token, groupId, {}).then((response) => {
        return response !== void 0;
      });
    });
  }
  joinTournament(session, tournamentId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.joinTournament(session.token, tournamentId, {}).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Kick users from a group, or decline their join requests. */
  kickGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.kickGroupUsers(session.token, groupId, ids).then((response) => {
        return Promise.resolve(response != void 0);
      });
    });
  }
  /** Leave a group the user is part of. */
  leaveGroup(session, groupId) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.leaveGroup(session.token, groupId, {}).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** List a channel's message history. */
  listChannelMessages(session, channelId, limit, forward, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listChannelMessages(session.token, channelId, limit, forward, cursor).then((response) => {
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
  /** List a group's users. */
  listGroupUsers(session, groupId, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listGroupUsers(session.token, groupId, limit, state, cursor).then((response) => {
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
  /** List a user's groups. */
  listUserGroups(session, userId, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listUserGroups(session.token, userId, state, limit, cursor).then((response) => {
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
  /** List groups based on given filters. */
  listGroups(session, name, cursor, limit) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listGroups(session.token, name, cursor, limit).then((response) => {
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
  /** Add an Apple ID to the social profiles on the current user's account. */
  linkApple(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkApple(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add a custom ID to the social profiles on the current user's account. */
  linkCustom(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkCustom(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add a device ID to the social profiles on the current user's account. */
  linkDevice(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkDevice(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add an email+password to the social profiles on the current user's account. */
  linkEmail(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkEmail(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add Facebook to the social profiles on the current user's account. */
  linkFacebook(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkFacebook(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add Facebook Instant to the social profiles on the current user's account. */
  linkFacebookInstantGame(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkFacebookInstantGame(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add Google to the social profiles on the current user's account. */
  linkGoogle(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkGoogle(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add GameCenter to the social profiles on the current user's account. */
  linkGameCenter(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkGameCenter(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Add Steam to the social profiles on the current user's account. */
  linkSteam(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.linkSteam(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** List all friends for the current user. */
  listFriends(session, state, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listFriends(session.token, limit, state, cursor).then((response) => {
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
  /** List friends of friends for the current user. */
  listFriendsOfFriends(session, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listFriendsOfFriends(session.token, limit, cursor).then((response) => {
        var result = {
          friends_of_friends: [],
          cursor: response.cursor
        };
        if (response.friends_of_friends == null) {
          return Promise.resolve(result);
        }
        response.friends_of_friends.forEach((f) => {
          result.friends_of_friends.push({
            referrer: f.referrer,
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
            }
          });
        });
        return Promise.resolve(result);
      });
    });
  }
  /** List leaderboard records */
  listLeaderboardRecords(session, leaderboardId, ownerIds, limit, cursor, expiry) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listLeaderboardRecords(session.token, leaderboardId, ownerIds, limit, cursor, expiry).then((response) => {
        var list = {
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          rank_count: response.rank_count ? Number(response.rank_count) : 0,
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
  listLeaderboardRecordsAroundOwner(session, leaderboardId, ownerId, limit, expiry, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listLeaderboardRecordsAroundOwner(session.token, leaderboardId, ownerId, limit, expiry, cursor).then((response) => {
        var list = {
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          rank_count: response.rank_count ? Number(response.rank_count) : 0,
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
  /** Fetch list of running matches. */
  listMatches(session, limit, authoritative, label, minSize, maxSize, query) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listMatches(session.token, limit, authoritative, label, minSize, maxSize, query);
    });
  }
  /** Fetch list of notifications. */
  listNotifications(session, limit, cacheableCursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listNotifications(session.token, limit, cacheableCursor).then((response) => {
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
  /** List storage objects. */
  listStorageObjects(session, collection, userId, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listStorageObjects(session.token, collection, userId, limit, cursor).then((response) => {
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
  /** List current or upcoming tournaments. */
  listTournaments(session, categoryStart, categoryEnd, startTime, endTime, limit, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listTournaments(session.token, categoryStart, categoryEnd, startTime, endTime, limit, cursor).then((response) => {
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
              start_active: o.start_active,
              authoritative: o.authoritative
            });
          });
        }
        return Promise.resolve(list);
      });
    });
  }
  /** List user subscriptions. */
  listSubscriptions(session, cursor, limit) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listSubscriptions(session.token, {
        cursor,
        limit
      });
    });
  }
  /** List tournament records from a given tournament. */
  listTournamentRecords(session, tournamentId, ownerIds, limit, cursor, expiry) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listTournamentRecords(session.token, tournamentId, ownerIds, limit, cursor, expiry).then((response) => {
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
  /** List tournament records from a given tournament around the owner. */
  listTournamentRecordsAroundOwner(session, tournamentId, ownerId, limit, expiry, cursor) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.listTournamentRecordsAroundOwner(session.token, tournamentId, ownerId, limit, expiry, cursor).then((response) => {
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
  /** Promote users in a group to the next role up. */
  promoteGroupUsers(session, groupId, ids) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.promoteGroupUsers(session.token, groupId, ids);
    });
  }
  /** Fetch storage objects. */
  readStorageObjects(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.readStorageObjects(session.token, request).then((response) => {
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
  /** Execute an RPC function on the server. */
  rpc(session, id, input) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.rpcFunc(session.token, id, JSON.stringify(input)).then((response) => {
        return Promise.resolve({
          id: response.id,
          payload: !response.payload ? void 0 : JSON.parse(response.payload)
        });
      });
    });
  }
  /** Execute an RPC function on the server. */
  rpcHttpKey(httpKey, id, input) {
    return __async(this, null, function* () {
      return this.apiClient.rpcFunc2("", id, input && JSON.stringify(input) || "", httpKey).then((response) => {
        return Promise.resolve({
          id: response.id,
          payload: !response.payload ? void 0 : JSON.parse(response.payload)
        });
      }).catch((err) => {
        throw err;
      });
    });
  }
  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  sessionLogout(session, token, refreshToken) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.sessionLogout(session.token, { refresh_token: refreshToken, token }).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  sessionRefresh(_0) {
    return __async(this, arguments, function* (session, vars = {}) {
      if (!session) {
        console.error("Cannot refresh a null session.");
        return session;
      }
      if (session.created && session.expires_at - session.created_at < 70) {
        console.warn("Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/nakama/getting-started/configuration/#session");
      }
      if (session.created && session.refresh_expires_at - session.created_at < 3700) {
        console.warn("Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/nakama/getting-started/configuration/#session");
      }
      const apiSession = yield this.apiClient.sessionRefresh(this.serverkey, "", { token: session.refresh_token, vars });
      session.update(apiSession.token, apiSession.refresh_token);
      return session;
    });
  }
  /** Remove the Apple ID from the social profiles on the current user's account. */
  unlinkApple(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkApple(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove custom ID from the social profiles on the current user's account. */
  unlinkCustom(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkCustom(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove a device ID from the social profiles on the current user's account. */
  unlinkDevice(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkDevice(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove an email+password from the social profiles on the current user's account. */
  unlinkEmail(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkEmail(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove Facebook from the social profiles on the current user's account. */
  unlinkFacebook(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkFacebook(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove Facebook Instant social profiles from the current user's account. */
  unlinkFacebookInstantGame(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkFacebookInstantGame(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove Google from the social profiles on the current user's account. */
  unlinkGoogle(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkGoogle(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove GameCenter from the social profiles on the current user's account. */
  unlinkGameCenter(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkGameCenter(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Remove Steam from the social profiles on the current user's account. */
  unlinkSteam(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.unlinkSteam(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update fields in the current user's account. */
  updateAccount(session, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateAccount(session.token, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Update a group the user is part of and has permissions to update. */
  updateGroup(session, groupId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.updateGroup(session.token, groupId, request).then((response) => {
        return response !== void 0;
      });
    });
  }
  /** Validate an Apple IAP receipt. */
  validatePurchaseApple(session, receipt, persist = true) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.validatePurchaseApple(session.token, { receipt, persist });
    });
  }
  /** Validate a FB Instant IAP receipt. */
  validatePurchaseFacebookInstant(session, signedRequest, persist = true) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.validatePurchaseFacebookInstant(session.token, { signed_request: signedRequest, persist });
    });
  }
  /** Validate a Google IAP receipt. */
  validatePurchaseGoogle(session, purchase, persist = true) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.validatePurchaseGoogle(session.token, { purchase, persist });
    });
  }
  /** Validate a Huawei IAP receipt. */
  validatePurchaseHuawei(session, purchase, signature, persist = true) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.validatePurchaseHuawei(session.token, { purchase, signature, persist });
    });
  }
  /** Validate Apple Subscription Receipt */
  validateSubscriptionApple(session, receipt, persist = true) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.validateSubscriptionApple(session.token, { receipt, persist });
    });
  }
  /** Validate Google Subscription Receipt */
  validateSubscriptionGoogle(session, receipt, persist = true) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.validateSubscriptionGoogle(session.token, { receipt, persist });
    });
  }
  /** Write a record to a leaderboard. */
  writeLeaderboardRecord(session, leaderboardId, request) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
      return this.apiClient.writeLeaderboardRecord(session.token, leaderboardId, {
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
  /** Write storage objects. */
  writeStorageObjects(session, objects) {
    return __async(this, null, function* () {
      if (this.autoRefreshSession && session.refresh_token && session.isexpired((Date.now() + this.expiredTimespanMs) / 1e3)) {
        yield this.sessionRefresh(session);
      }
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
      return this.apiClient.writeStorageObjects(session.token, request);
    });
  }
  /** Write a record to a tournament. */
  writeTournamentRecord(session, tournamentId, request) {
    return __async(this, null, function* () {
      return this.apiClient.writeTournamentRecord(session.token, tournamentId, {
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
