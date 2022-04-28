(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.nakamajs = {}));
}(this, (function (exports) { 'use strict';

  (function(self) {

    if (self.fetch) {
      return
    }

    var support = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob: 'FileReader' in self && 'Blob' in self && (function() {
        try {
          new Blob();
          return true
        } catch(e) {
          return false
        }
      })(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self
    };

    if (support.arrayBuffer) {
      var viewClasses = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]'
      ];

      var isDataView = function(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj)
      };

      var isArrayBufferView = ArrayBuffer.isView || function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name);
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name')
      }
      return name.toLowerCase()
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      return value
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value}
        }
      };

      if (support.iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator
        };
      }

      return iterator
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
      this.map[name] = oldValue ? oldValue+','+value : value;
    };

    Headers.prototype['delete'] = function(name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function(name) {
      name = normalizeName(name);
      return this.has(name) ? this.map[name] : null
    };

    Headers.prototype.has = function(name) {
      return this.map.hasOwnProperty(normalizeName(name))
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
      this.forEach(function(value, name) { items.push(name); });
      return iteratorFor(items)
    };

    Headers.prototype.values = function() {
      var items = [];
      this.forEach(function(value) { items.push(value); });
      return iteratorFor(items)
    };

    Headers.prototype.entries = function() {
      var items = [];
      this.forEach(function(value, name) { items.push([name, value]); });
      return iteratorFor(items)
    };

    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'))
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
      })
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsArrayBuffer(blob);
      return promise
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsText(blob);
      return promise
    }

    function readArrayBufferAsText(buf) {
      var view = new Uint8Array(buf);
      var chars = new Array(view.length);

      for (var i = 0; i < view.length; i++) {
        chars[i] = String.fromCharCode(view[i]);
      }
      return chars.join('')
    }

    function bufferClone(buf) {
      if (buf.slice) {
        return buf.slice(0)
      } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer
      }
    }

    function Body() {
      this.bodyUsed = false;

      this._initBody = function(body) {
        this._bodyInit = body;
        if (!body) {
          this._bodyText = '';
        } else if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
          this._bodyArrayBuffer = bufferClone(body.buffer);
          // IE 10-11 can't handle a DataView body.
          this._bodyInit = new Blob([this._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
          this._bodyArrayBuffer = bufferClone(body);
        } else {
          throw new Error('unsupported BodyInit type')
        }

        if (!this.headers.get('content-type')) {
          if (typeof body === 'string') {
            this.headers.set('content-type', 'text/plain;charset=UTF-8');
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set('content-type', this._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
        }
      };

      if (support.blob) {
        this.blob = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob)
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(new Blob([this._bodyArrayBuffer]))
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob')
          } else {
            return Promise.resolve(new Blob([this._bodyText]))
          }
        };

        this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
          } else {
            return this.blob().then(readBlobAsArrayBuffer)
          }
        };
      }

      this.text = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      };

      if (support.formData) {
        this.formData = function() {
          return this.text().then(decode)
        };
      }

      this.json = function() {
        return this.text().then(JSON.parse)
      };

      return this
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return (methods.indexOf(upcased) > -1) ? upcased : method
    }

    function Request(input, options) {
      options = options || {};
      var body = options.body;

      if (input instanceof Request) {
        if (input.bodyUsed) {
          throw new TypeError('Already read')
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

      this.credentials = options.credentials || this.credentials || 'omit';
      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
      }
      this.method = normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests')
      }
      this._initBody(body);
    }

    Request.prototype.clone = function() {
      return new Request(this, { body: this._bodyInit })
    };

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form
    }

    function parseHeaders(rawHeaders) {
      var headers = new Headers();
      // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
      // https://tools.ietf.org/html/rfc7230#section-3.2
      var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
      preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
        var parts = line.split(':');
        var key = parts.shift().trim();
        if (key) {
          var value = parts.join(':').trim();
          headers.append(key, value);
        }
      });
      return headers
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      this.type = 'default';
      this.status = options.status === undefined ? 200 : options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = 'statusText' in options ? options.statusText : 'OK';
      this.headers = new Headers(options.headers);
      this.url = options.url || '';
      this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function() {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      })
    };

    Response.error = function() {
      var response = new Response(null, {status: 0, statusText: ''});
      response.type = 'error';
      return response
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function(url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code')
      }

      return new Response(null, {status: status, headers: {location: url}})
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function(input, init) {
      return new Promise(function(resolve, reject) {
        var request = new Request(input, init);
        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders() || '')
          };
          options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };

        xhr.ontimeout = function() {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        } else if (request.credentials === 'omit') {
          xhr.withCredentials = false;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      })
    };
    self.fetch.polyfill = true;
  })(typeof self !== 'undefined' ? self : window);

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  /**
   *  base64.ts
   *
   *  Licensed under the BSD 3-Clause License.
   *    http://opensource.org/licenses/BSD-3-Clause
   *
   *  References:
   *    http://en.wikipedia.org/wiki/Base64
   *
   * @author Dan Kogai (https://github.com/dankogai)
   */
  const _hasbtoa = typeof btoa === 'function';
  const _hasBuffer = typeof Buffer === 'function';
  const _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
  const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
  const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const b64chs = [...b64ch];
  const b64tab = ((a) => {
      let tab = {};
      a.forEach((c, i) => tab[c] = i);
      return tab;
  })(b64chs);
  const _fromCC = String.fromCharCode.bind(String);
  const _U8Afrom = typeof Uint8Array.from === 'function'
      ? Uint8Array.from.bind(Uint8Array)
      : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  const _mkUriSafe = (src) => src
      .replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_')
      .replace(/=+$/m, '');
  /**
   * polyfill version of `btoa`
   */
  const btoaPolyfill = (bin) => {
      // console.log('polyfilled');
      let u32, c0, c1, c2, asc = '';
      const pad = bin.length % 3;
      for (let i = 0; i < bin.length;) {
          if ((c0 = bin.charCodeAt(i++)) > 255 ||
              (c1 = bin.charCodeAt(i++)) > 255 ||
              (c2 = bin.charCodeAt(i++)) > 255)
              throw new TypeError('invalid character found');
          u32 = (c0 << 16) | (c1 << 8) | c2;
          asc += b64chs[u32 >> 18 & 63]
              + b64chs[u32 >> 12 & 63]
              + b64chs[u32 >> 6 & 63]
              + b64chs[u32 & 63];
      }
      return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
  };
  /**
   * does what `window.btoa` of web browsers do.
   * @param {String} bin binary string
   * @returns {string} Base64-encoded string
   */
  const _btoa = _hasbtoa ? (bin) => btoa(bin)
      : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')
          : btoaPolyfill;
  const _fromUint8Array = _hasBuffer
      ? (u8a) => Buffer.from(u8a).toString('base64')
      : (u8a) => {
          // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
          const maxargs = 0x1000;
          let strs = [];
          for (let i = 0, l = u8a.length; i < l; i += maxargs) {
              strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
          }
          return _btoa(strs.join(''));
      };
  // This trick is found broken https://github.com/dankogai/js-base64/issues/130
  // const utob = (src: string) => unescape(encodeURIComponent(src));
  // reverting good old fationed regexp
  const cb_utob = (c) => {
      if (c.length < 2) {
          var cc = c.charCodeAt(0);
          return cc < 0x80 ? c
              : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
                  + _fromCC(0x80 | (cc & 0x3f)))
                  : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                      + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                      + _fromCC(0x80 | (cc & 0x3f)));
      }
      else {
          var cc = 0x10000
              + (c.charCodeAt(0) - 0xD800) * 0x400
              + (c.charCodeAt(1) - 0xDC00);
          return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
              + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
              + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
              + _fromCC(0x80 | (cc & 0x3f)));
      }
  };
  const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  /**
   * @deprecated should have been internal use only.
   * @param {string} src UTF-8 string
   * @returns {string} UTF-16 string
   */
  const utob = (u) => u.replace(re_utob, cb_utob);
  //
  const _encode = _hasBuffer
      ? (s) => Buffer.from(s, 'utf8').toString('base64')
      : _TE
          ? (s) => _fromUint8Array(_TE.encode(s))
          : (s) => _btoa(utob(s));
  /**
   * converts a UTF-8-encoded string to a Base64 string.
   * @param {boolean} [urlsafe] if `true` make the result URL-safe
   * @returns {string} Base64 string
   */
  const encode = (src, urlsafe = false) => urlsafe
      ? _mkUriSafe(_encode(src))
      : _encode(src);

  function buildFetchOptions(method, options, bodyJson) {
      var fetchOptions = __assign({ method: method }, options);
      fetchOptions.headers = __assign({}, options.headers);
      var descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");
      // in Cocos Creator, XMLHttpRequest.withCredentials is not writable, so make the fetch
      // polyfill avoid writing to it.
      if (!(descriptor === null || descriptor === void 0 ? void 0 : descriptor.set)) {
          fetchOptions.credentials = 'cocos-ignore'; // string value is arbitrary, cannot be 'omit' or 'include
      }
      if (!Object.keys(fetchOptions.headers).includes("Accept")) {
          fetchOptions.headers["Accept"] = "application/json";
      }
      if (!Object.keys(fetchOptions.headers).includes("Content-Type")) {
          fetchOptions.headers["Content-Type"] = "application/json";
      }
      Object.keys(fetchOptions.headers).forEach(function (key) {
          if (!fetchOptions.headers[key]) {
              delete fetchOptions.headers[key];
          }
      });
      if (bodyJson) {
          fetchOptions.body = bodyJson;
      }
      return fetchOptions;
  }

  // tslint:disable
  /**
  * Environment where the purchase took place
  */
  var ValidatedPurchaseEnvironment;
  (function (ValidatedPurchaseEnvironment) {
      /* - UNKNOWN: Unknown environment. */
      ValidatedPurchaseEnvironment[ValidatedPurchaseEnvironment["UNKNOWN"] = 0] = "UNKNOWN";
      /*  - SANDBOX: Sandbox/test environment. */
      ValidatedPurchaseEnvironment[ValidatedPurchaseEnvironment["SANDBOX"] = 1] = "SANDBOX";
      /*  - PRODUCTION: Production environment. */
      ValidatedPurchaseEnvironment[ValidatedPurchaseEnvironment["PRODUCTION"] = 2] = "PRODUCTION";
  })(ValidatedPurchaseEnvironment || (ValidatedPurchaseEnvironment = {}));
  /**
  * Validation Provider
  */
  var ValidatedPurchaseStore;
  (function (ValidatedPurchaseStore) {
      /* - APPLE_APP_STORE: Apple App Store */
      ValidatedPurchaseStore[ValidatedPurchaseStore["APPLE_APP_STORE"] = 0] = "APPLE_APP_STORE";
      /*  - GOOGLE_PLAY_STORE: Google Play Store */
      ValidatedPurchaseStore[ValidatedPurchaseStore["GOOGLE_PLAY_STORE"] = 1] = "GOOGLE_PLAY_STORE";
      /*  - HUAWEI_APP_GALLERY: Huawei App Gallery */
      ValidatedPurchaseStore[ValidatedPurchaseStore["HUAWEI_APP_GALLERY"] = 2] = "HUAWEI_APP_GALLERY";
  })(ValidatedPurchaseStore || (ValidatedPurchaseStore = {}));
  /**
  * Operator that can be used to override the one set in the leaderboard.
  */
  var ApiOperator;
  (function (ApiOperator) {
      /*  - NO_OVERRIDE: Do not override the leaderboard operator. */
      ApiOperator[ApiOperator["NO_OVERRIDE"] = 0] = "NO_OVERRIDE";
      /*  - BEST: Override the leaderboard operator with BEST. */
      ApiOperator[ApiOperator["BEST"] = 1] = "BEST";
      /*  - SET: Override the leaderboard operator with SET. */
      ApiOperator[ApiOperator["SET"] = 2] = "SET";
      /*  - INCREMENT: Override the leaderboard operator with INCREMENT. */
      ApiOperator[ApiOperator["INCREMENT"] = 3] = "INCREMENT";
      /*  - DECREMENT: Override the leaderboard operator with DECREMENT. */
      ApiOperator[ApiOperator["DECREMENT"] = 4] = "DECREMENT";
  })(ApiOperator || (ApiOperator = {}));
  var NakamaApi = /** @class */ (function () {
      function NakamaApi(serverKey, basePath, timeoutMs) {
          this.serverKey = serverKey;
          this.basePath = basePath;
          this.timeoutMs = timeoutMs;
      }
      /** A healthcheck which load balancers can use to check the service. */
      NakamaApi.prototype.healthcheck = function (bearerToken, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/healthcheck";
          var queryParams = new Map();
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Fetch the current user's account. */
      NakamaApi.prototype.getAccount = function (bearerToken, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/account";
          var queryParams = new Map();
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Update fields in the current user's account. */
      NakamaApi.prototype.updateAccount = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("PUT", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with an Apple ID against the server. */
      NakamaApi.prototype.authenticateApple = function (basicAuthUsername, basicAuthPassword, body, create, username, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/apple";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with a custom id against the server. */
      NakamaApi.prototype.authenticateCustom = function (basicAuthUsername, basicAuthPassword, body, create, username, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/custom";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with a device id against the server. */
      NakamaApi.prototype.authenticateDevice = function (basicAuthUsername, basicAuthPassword, body, create, username, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/device";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with an email+password against the server. */
      NakamaApi.prototype.authenticateEmail = function (basicAuthUsername, basicAuthPassword, body, create, username, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/email";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with a Facebook OAuth token against the server. */
      NakamaApi.prototype.authenticateFacebook = function (basicAuthUsername, basicAuthPassword, body, create, username, sync, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/facebook";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          queryParams.set("sync", sync);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with a Facebook Instant Game token against the server. */
      NakamaApi.prototype.authenticateFacebookInstantGame = function (basicAuthUsername, basicAuthPassword, body, create, username, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/facebookinstantgame";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with Apple's GameCenter against the server. */
      NakamaApi.prototype.authenticateGameCenter = function (basicAuthUsername, basicAuthPassword, body, create, username, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/gamecenter";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with Google against the server. */
      NakamaApi.prototype.authenticateGoogle = function (basicAuthUsername, basicAuthPassword, body, create, username, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/google";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Authenticate a user with Steam against the server. */
      NakamaApi.prototype.authenticateSteam = function (basicAuthUsername, basicAuthPassword, body, create, username, sync, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/steam";
          var queryParams = new Map();
          queryParams.set("create", create);
          queryParams.set("username", username);
          queryParams.set("sync", sync);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add an Apple ID to the social profiles on the current user's account. */
      NakamaApi.prototype.linkApple = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/apple";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add a custom ID to the social profiles on the current user's account. */
      NakamaApi.prototype.linkCustom = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/custom";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add a device ID to the social profiles on the current user's account. */
      NakamaApi.prototype.linkDevice = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/device";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add an email+password to the social profiles on the current user's account. */
      NakamaApi.prototype.linkEmail = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/email";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add Facebook to the social profiles on the current user's account. */
      NakamaApi.prototype.linkFacebook = function (bearerToken, body, sync, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/facebook";
          var queryParams = new Map();
          queryParams.set("sync", sync);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add Facebook Instant Game to the social profiles on the current user's account. */
      NakamaApi.prototype.linkFacebookInstantGame = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/facebookinstantgame";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add Apple's GameCenter to the social profiles on the current user's account. */
      NakamaApi.prototype.linkGameCenter = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/gamecenter";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add Google to the social profiles on the current user's account. */
      NakamaApi.prototype.linkGoogle = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/google";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add Steam to the social profiles on the current user's account. */
      NakamaApi.prototype.linkSteam = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/steam";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
      NakamaApi.prototype.sessionRefresh = function (basicAuthUsername, basicAuthPassword, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/session/refresh";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove the Apple ID from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkApple = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/apple";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove the custom ID from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkCustom = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/custom";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove the device ID from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkDevice = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/device";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove the email+password from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkEmail = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/email";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove Facebook from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkFacebook = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/facebook";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove Facebook Instant Game profile from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkFacebookInstantGame = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/facebookinstantgame";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove Apple's GameCenter from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkGameCenter = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/gamecenter";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove Google from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkGoogle = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/google";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Remove Steam from the social profiles on the current user's account. */
      NakamaApi.prototype.unlinkSteam = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/steam";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List a channel's message history. */
      NakamaApi.prototype.listChannelMessages = function (bearerToken, channelId, limit, forward, cursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (channelId === null || channelId === undefined) {
              throw new Error("'channelId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/channel/{channelId}"
              .replace("{channelId}", encodeURIComponent(String(channelId)));
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("forward", forward);
          queryParams.set("cursor", cursor);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Submit an event for processing in the server's registered runtime custom events handler. */
      NakamaApi.prototype.event = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/event";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Delete one or more users by ID or username. */
      NakamaApi.prototype.deleteFriends = function (bearerToken, ids, usernames, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/friend";
          var queryParams = new Map();
          queryParams.set("ids", ids);
          queryParams.set("usernames", usernames);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List all friends for the current user. */
      NakamaApi.prototype.listFriends = function (bearerToken, limit, state, cursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/friend";
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("state", state);
          queryParams.set("cursor", cursor);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add friends by ID or username to a user's account. */
      NakamaApi.prototype.addFriends = function (bearerToken, ids, usernames, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/friend";
          var queryParams = new Map();
          queryParams.set("ids", ids);
          queryParams.set("usernames", usernames);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Block one or more users by ID or username. */
      NakamaApi.prototype.blockFriends = function (bearerToken, ids, usernames, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/friend/block";
          var queryParams = new Map();
          queryParams.set("ids", ids);
          queryParams.set("usernames", usernames);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Import Facebook friends and add them to a user's account. */
      NakamaApi.prototype.importFacebookFriends = function (bearerToken, body, reset, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/friend/facebook";
          var queryParams = new Map();
          queryParams.set("reset", reset);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Import Steam friends and add them to a user's account. */
      NakamaApi.prototype.importSteamFriends = function (bearerToken, body, reset, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/friend/steam";
          var queryParams = new Map();
          queryParams.set("reset", reset);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List groups based on given filters. */
      NakamaApi.prototype.listGroups = function (bearerToken, name, cursor, limit, langTag, members, open, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/group";
          var queryParams = new Map();
          queryParams.set("name", name);
          queryParams.set("cursor", cursor);
          queryParams.set("limit", limit);
          queryParams.set("lang_tag", langTag);
          queryParams.set("members", members);
          queryParams.set("open", open);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Create a new group with the current user as the owner. */
      NakamaApi.prototype.createGroup = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Delete a group by ID. */
      NakamaApi.prototype.deleteGroup = function (bearerToken, groupId, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Update fields in a given group. */
      NakamaApi.prototype.updateGroup = function (bearerToken, groupId, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("PUT", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Add users to a group. */
      NakamaApi.prototype.addGroupUsers = function (bearerToken, groupId, userIds, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/add"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          queryParams.set("user_ids", userIds);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Ban a set of users from a group. */
      NakamaApi.prototype.banGroupUsers = function (bearerToken, groupId, userIds, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/ban"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          queryParams.set("user_ids", userIds);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Demote a set of users in a group to the next role down. */
      NakamaApi.prototype.demoteGroupUsers = function (bearerToken, groupId, userIds, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          if (userIds === null || userIds === undefined) {
              throw new Error("'userIds' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/demote"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          queryParams.set("user_ids", userIds);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Immediately join an open group, or request to join a closed one. */
      NakamaApi.prototype.joinGroup = function (bearerToken, groupId, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/join"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Kick a set of users from a group. */
      NakamaApi.prototype.kickGroupUsers = function (bearerToken, groupId, userIds, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/kick"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          queryParams.set("user_ids", userIds);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Leave a group the user is a member of. */
      NakamaApi.prototype.leaveGroup = function (bearerToken, groupId, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/leave"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Promote a set of users in a group to the next role up. */
      NakamaApi.prototype.promoteGroupUsers = function (bearerToken, groupId, userIds, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/promote"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          queryParams.set("user_ids", userIds);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List all users that are part of a group. */
      NakamaApi.prototype.listGroupUsers = function (bearerToken, groupId, limit, state, cursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/user"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("state", state);
          queryParams.set("cursor", cursor);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Validate Apple IAP Receipt */
      NakamaApi.prototype.validatePurchaseApple = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/iap/purchase/apple";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Validate Google IAP Receipt */
      NakamaApi.prototype.validatePurchaseGoogle = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/iap/purchase/google";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Validate Huawei IAP Receipt */
      NakamaApi.prototype.validatePurchaseHuawei = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/iap/purchase/huawei";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Delete a leaderboard record. */
      NakamaApi.prototype.deleteLeaderboardRecord = function (bearerToken, leaderboardId, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (leaderboardId === null || leaderboardId === undefined) {
              throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/leaderboard/{leaderboardId}"
              .replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
          var queryParams = new Map();
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List leaderboard records. */
      NakamaApi.prototype.listLeaderboardRecords = function (bearerToken, leaderboardId, ownerIds, limit, cursor, expiry, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (leaderboardId === null || leaderboardId === undefined) {
              throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/leaderboard/{leaderboardId}"
              .replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
          var queryParams = new Map();
          queryParams.set("owner_ids", ownerIds);
          queryParams.set("limit", limit);
          queryParams.set("cursor", cursor);
          queryParams.set("expiry", expiry);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Write a record to a leaderboard. */
      NakamaApi.prototype.writeLeaderboardRecord = function (bearerToken, leaderboardId, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (leaderboardId === null || leaderboardId === undefined) {
              throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/leaderboard/{leaderboardId}"
              .replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List leaderboard records that belong to a user. */
      NakamaApi.prototype.listLeaderboardRecordsAroundOwner = function (bearerToken, leaderboardId, ownerId, limit, expiry, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (leaderboardId === null || leaderboardId === undefined) {
              throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
          }
          if (ownerId === null || ownerId === undefined) {
              throw new Error("'ownerId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/leaderboard/{leaderboardId}/owner/{ownerId}"
              .replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)))
              .replace("{ownerId}", encodeURIComponent(String(ownerId)));
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("expiry", expiry);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Fetch list of running matches. */
      NakamaApi.prototype.listMatches = function (bearerToken, limit, authoritative, label, minSize, maxSize, query, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/match";
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("authoritative", authoritative);
          queryParams.set("label", label);
          queryParams.set("min_size", minSize);
          queryParams.set("max_size", maxSize);
          queryParams.set("query", query);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Delete one or more notifications for the current user. */
      NakamaApi.prototype.deleteNotifications = function (bearerToken, ids, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/notification";
          var queryParams = new Map();
          queryParams.set("ids", ids);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("DELETE", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Fetch list of notifications. */
      NakamaApi.prototype.listNotifications = function (bearerToken, limit, cacheableCursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/notification";
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("cacheable_cursor", cacheableCursor);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Execute a Lua function on the server. */
      NakamaApi.prototype.rpcFunc2 = function (bearerToken, id, payload, httpKey, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (id === null || id === undefined) {
              throw new Error("'id' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/rpc/{id}"
              .replace("{id}", encodeURIComponent(String(id)));
          var queryParams = new Map();
          queryParams.set("payload", payload);
          queryParams.set("http_key", httpKey);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Execute a Lua function on the server. */
      NakamaApi.prototype.rpcFunc = function (bearerToken, id, body, httpKey, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (id === null || id === undefined) {
              throw new Error("'id' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/rpc/{id}"
              .replace("{id}", encodeURIComponent(String(id)));
          var queryParams = new Map();
          queryParams.set("http_key", httpKey);
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
      NakamaApi.prototype.sessionLogout = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/session/logout";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Get storage objects. */
      NakamaApi.prototype.readStorageObjects = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Write objects into the storage engine. */
      NakamaApi.prototype.writeStorageObjects = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("PUT", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Delete one or more objects by ID or username. */
      NakamaApi.prototype.deleteStorageObjects = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage/delete";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("PUT", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List publicly readable storage objects in a given collection. */
      NakamaApi.prototype.listStorageObjects = function (bearerToken, collection, userId, limit, cursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (collection === null || collection === undefined) {
              throw new Error("'collection' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage/{collection}"
              .replace("{collection}", encodeURIComponent(String(collection)));
          var queryParams = new Map();
          queryParams.set("user_id", userId);
          queryParams.set("limit", limit);
          queryParams.set("cursor", cursor);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List publicly readable storage objects in a given collection. */
      NakamaApi.prototype.listStorageObjects2 = function (bearerToken, collection, userId, limit, cursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (collection === null || collection === undefined) {
              throw new Error("'collection' is a required parameter but is null or undefined.");
          }
          if (userId === null || userId === undefined) {
              throw new Error("'userId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage/{collection}/{userId}"
              .replace("{collection}", encodeURIComponent(String(collection)))
              .replace("{userId}", encodeURIComponent(String(userId)));
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("cursor", cursor);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List current or upcoming tournaments. */
      NakamaApi.prototype.listTournaments = function (bearerToken, categoryStart, categoryEnd, startTime, endTime, limit, cursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/tournament";
          var queryParams = new Map();
          queryParams.set("category_start", categoryStart);
          queryParams.set("category_end", categoryEnd);
          queryParams.set("start_time", startTime);
          queryParams.set("end_time", endTime);
          queryParams.set("limit", limit);
          queryParams.set("cursor", cursor);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List tournament records. */
      NakamaApi.prototype.listTournamentRecords = function (bearerToken, tournamentId, ownerIds, limit, cursor, expiry, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (tournamentId === null || tournamentId === undefined) {
              throw new Error("'tournamentId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/tournament/{tournamentId}"
              .replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
          var queryParams = new Map();
          queryParams.set("owner_ids", ownerIds);
          queryParams.set("limit", limit);
          queryParams.set("cursor", cursor);
          queryParams.set("expiry", expiry);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Write a record to a tournament. */
      NakamaApi.prototype.writeTournamentRecord2 = function (bearerToken, tournamentId, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (tournamentId === null || tournamentId === undefined) {
              throw new Error("'tournamentId' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/tournament/{tournamentId}"
              .replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Write a record to a tournament. */
      NakamaApi.prototype.writeTournamentRecord = function (bearerToken, tournamentId, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (tournamentId === null || tournamentId === undefined) {
              throw new Error("'tournamentId' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/tournament/{tournamentId}"
              .replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("PUT", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Attempt to join an open and running tournament. */
      NakamaApi.prototype.joinTournament = function (bearerToken, tournamentId, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (tournamentId === null || tournamentId === undefined) {
              throw new Error("'tournamentId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/tournament/{tournamentId}/join"
              .replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
          var queryParams = new Map();
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List tournament records for a given owner. */
      NakamaApi.prototype.listTournamentRecordsAroundOwner = function (bearerToken, tournamentId, ownerId, limit, expiry, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (tournamentId === null || tournamentId === undefined) {
              throw new Error("'tournamentId' is a required parameter but is null or undefined.");
          }
          if (ownerId === null || ownerId === undefined) {
              throw new Error("'ownerId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/tournament/{tournamentId}/owner/{ownerId}"
              .replace("{tournamentId}", encodeURIComponent(String(tournamentId)))
              .replace("{ownerId}", encodeURIComponent(String(ownerId)));
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("expiry", expiry);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** Fetch zero or more users by ID and/or username. */
      NakamaApi.prototype.getUsers = function (bearerToken, ids, usernames, facebookIds, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/user";
          var queryParams = new Map();
          queryParams.set("ids", ids);
          queryParams.set("usernames", usernames);
          queryParams.set("facebook_ids", facebookIds);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      /** List groups the current user belongs to. */
      NakamaApi.prototype.listUserGroups = function (bearerToken, userId, limit, state, cursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (userId === null || userId === undefined) {
              throw new Error("'userId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/user/{userId}/group"
              .replace("{userId}", encodeURIComponent(String(userId)));
          var queryParams = new Map();
          queryParams.set("limit", limit);
          queryParams.set("state", state);
          queryParams.set("cursor", cursor);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          return Promise.race([
              fetch(fullUrl, fetchOptions).then(function (response) {
                  if (response.status == 204) {
                      return response;
                  }
                  else if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      NakamaApi.prototype.buildFullUrl = function (basePath, fragment, queryParams) {
          var e_1, _a;
          var fullPath = basePath + fragment + "?";
          var _loop_1 = function (k, v) {
              if (v instanceof Array) {
                  fullPath += v.reduce(function (prev, curr) {
                      return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                  }, "");
              }
              else {
                  if (v != null) {
                      fullPath += encodeURIComponent(k) + "=" + encodeURIComponent(v) + "&";
                  }
              }
          };
          try {
              for (var queryParams_1 = __values(queryParams), queryParams_1_1 = queryParams_1.next(); !queryParams_1_1.done; queryParams_1_1 = queryParams_1.next()) {
                  var _b = __read(queryParams_1_1.value, 2), k = _b[0], v = _b[1];
                  _loop_1(k, v);
              }
          }
          catch (e_1_1) { e_1 = { error: e_1_1 }; }
          finally {
              try {
                  if (queryParams_1_1 && !queryParams_1_1.done && (_a = queryParams_1.return)) _a.call(queryParams_1);
              }
              finally { if (e_1) throw e_1.error; }
          }
          return fullPath;
      };
      return NakamaApi;
  }());

  /**
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
  var Session = /** @class */ (function () {
      function Session(token, refresh_token, created) {
          this.created = created;
          this.token = token;
          this.refresh_token = refresh_token;
          this.created_at = Math.floor(new Date().getTime() / 1000);
          this.update(token, refresh_token);
      }
      Session.prototype.isexpired = function (currenttime) {
          return (this.expires_at - currenttime) < 0;
      };
      Session.prototype.isrefreshexpired = function (currenttime) {
          return (this.refresh_expires_at - currenttime) < 0;
      };
      Session.prototype.update = function (token, refreshToken) {
          var tokenParts = token.split('.');
          if (tokenParts.length != 3) {
              throw 'jwt is not valid.';
          }
          var tokenDecoded = JSON.parse(atob(tokenParts[1])); // FIXME: use base64 polyfill for React Native.
          var tokenExpiresAt = Math.floor(parseInt(tokenDecoded['exp']));
          /** clients that have just updated to the refresh tokens */
          /** client release will not have a cached refresh token */
          if (refreshToken) {
              var refreshTokenParts = refreshToken.split('.');
              if (refreshTokenParts.length != 3) {
                  throw 'refresh jwt is not valid.';
              }
              var refreshTokenDecoded = JSON.parse(atob(refreshTokenParts[1])); // FIXME: use base64 polyfill for React Native.
              var refreshTokenExpiresAt = Math.floor(parseInt(refreshTokenDecoded['exp']));
              this.refresh_expires_at = refreshTokenExpiresAt;
              this.refresh_token = refreshToken;
          }
          this.token = token;
          this.expires_at = tokenExpiresAt;
          this.username = tokenDecoded['usn'];
          this.user_id = tokenDecoded['uid'];
          this.vars = tokenDecoded['vrs'];
      };
      Session.restore = function (token, refreshToken) {
          return new Session(token, refreshToken, false);
      };
      return Session;
  }());

  /*
   * base64-arraybuffer 1.0.2 <https://github.com/niklasvh/base64-arraybuffer>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
  }
  var encode$1 = function (arraybuffer) {
      var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
      for (i = 0; i < len; i += 3) {
          base64 += chars[bytes[i] >> 2];
          base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
          base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
          base64 += chars[bytes[i + 2] & 63];
      }
      if (len % 3 === 2) {
          base64 = base64.substring(0, base64.length - 1) + '=';
      }
      else if (len % 3 === 1) {
          base64 = base64.substring(0, base64.length - 2) + '==';
      }
      return base64;
  };
  var decode = function (base64) {
      var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
      if (base64[base64.length - 1] === '=') {
          bufferLength--;
          if (base64[base64.length - 2] === '=') {
              bufferLength--;
          }
      }
      var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
      for (i = 0; i < len; i += 4) {
          encoded1 = lookup[base64.charCodeAt(i)];
          encoded2 = lookup[base64.charCodeAt(i + 1)];
          encoded3 = lookup[base64.charCodeAt(i + 2)];
          encoded4 = lookup[base64.charCodeAt(i + 3)];
          bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
          bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
          bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }
      return arraybuffer;
  };

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
  /**
   * A text-based socket adapter that accepts and transmits payloads over UTF-8.
   */
  var WebSocketAdapterText = /** @class */ (function () {
      function WebSocketAdapterText() {
          this._isConnected = false;
      }
      Object.defineProperty(WebSocketAdapterText.prototype, "onClose", {
          get: function () {
              return this._socket.onclose;
          },
          set: function (value) {
              this._socket.onclose = value;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(WebSocketAdapterText.prototype, "onError", {
          get: function () {
              return this._socket.onerror;
          },
          set: function (value) {
              this._socket.onerror = value;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(WebSocketAdapterText.prototype, "onMessage", {
          get: function () {
              return this._socket.onmessage;
          },
          set: function (value) {
              if (value) {
                  this._socket.onmessage = function (evt) {
                      var message = JSON.parse(evt.data);
                      if (message.match_data && message.match_data.data) {
                          message.match_data.data = new Uint8Array(decode(message.match_data.data));
                      }
                      else if (message.party_data && message.party_data.data) {
                          message.party_data.data = new Uint8Array(decode(message.party_data.data));
                      }
                      value(message);
                  };
              }
              else {
                  value = null;
              }
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(WebSocketAdapterText.prototype, "onOpen", {
          get: function () {
              return this._socket.onopen;
          },
          set: function (value) {
              this._socket.onopen = value;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(WebSocketAdapterText.prototype, "isConnected", {
          get: function () {
              return this._isConnected;
          },
          enumerable: false,
          configurable: true
      });
      WebSocketAdapterText.prototype.connect = function (scheme, host, port, createStatus, token) {
          var url = "" + scheme + host + ":" + port + "/ws?lang=en&status=" + encodeURIComponent(createStatus.toString()) + "&token=" + encodeURIComponent(token);
          this._socket = new WebSocket(url);
          this._isConnected = true;
      };
      WebSocketAdapterText.prototype.close = function () {
          this._isConnected = false;
          this._socket.close();
          this._socket = undefined;
      };
      WebSocketAdapterText.prototype.send = function (msg) {
          if (msg.match_data_send) {
              // according to protobuf docs, int64 is encoded to JSON as string.
              msg.match_data_send.op_code = msg.match_data_send.op_code.toString();
              var payload = msg.match_data_send.data;
              if (payload && payload instanceof Uint8Array) {
                  msg.match_data_send.data = encode$1(payload.buffer);
              }
              else if (payload) { // it's a string
                  msg.match_data_send.data = btoa(payload);
              }
          }
          else if (msg.party_data_send) {
              // according to protobuf docs, int64 is encoded to JSON as string.
              msg.party_data_send.op_code = msg.party_data_send.op_code.toString();
              var payload = msg.party_data_send.data;
              if (payload && payload instanceof Uint8Array) {
                  msg.party_data_send.data = encode$1(payload.buffer);
              }
              else if (payload) { // it's a string
                  msg.party_data_send.data = btoa(payload);
              }
          }
          this._socket.send(JSON.stringify(msg));
      };
      return WebSocketAdapterText;
  }());

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
  /** A socket connection to Nakama server implemented with the DOM's WebSocket API. */
  var DefaultSocket = /** @class */ (function () {
      function DefaultSocket(host, port, useSSL, verbose, adapter) {
          if (useSSL === void 0) { useSSL = false; }
          if (verbose === void 0) { verbose = false; }
          if (adapter === void 0) { adapter = new WebSocketAdapterText(); }
          this.host = host;
          this.port = port;
          this.useSSL = useSSL;
          this.verbose = verbose;
          this.adapter = adapter;
          this.cIds = {};
          this.nextCid = 1;
      }
      DefaultSocket.prototype.generatecid = function () {
          var cid = this.nextCid.toString();
          ++this.nextCid;
          return cid;
      };
      DefaultSocket.prototype.connect = function (session, createStatus) {
          var _this = this;
          if (createStatus === void 0) { createStatus = false; }
          if (this.adapter.isConnected) {
              return Promise.resolve(session);
          }
          var scheme = (this.useSSL) ? "wss://" : "ws://";
          this.adapter.connect(scheme, this.host, this.port, createStatus, session.token);
          this.adapter.onClose = function (evt) {
              _this.ondisconnect(evt);
          };
          this.adapter.onError = function (evt) {
              _this.onerror(evt);
          };
          this.adapter.onMessage = function (message) {
              if (_this.verbose && window && window.console) {
                  console.log("Response: %o", JSON.stringify(message));
              }
              /** Inbound message from server. */
              if (!message.cid) {
                  if (message.notifications) {
                      message.notifications.notifications.forEach(function (n) {
                          n.content = n.content ? JSON.parse(n.content) : undefined;
                          _this.onnotification(n);
                      });
                  }
                  else if (message.match_data) {
                      message.match_data.op_code = parseInt(message.match_data.op_code);
                      _this.onmatchdata(message.match_data);
                  }
                  else if (message.match_presence_event) {
                      _this.onmatchpresence(message.match_presence_event);
                  }
                  else if (message.matchmaker_ticket) {
                      _this.onmatchmakerticket(message.matchmaker_ticket);
                  }
                  else if (message.matchmaker_matched) {
                      _this.onmatchmakermatched(message.matchmaker_matched);
                  }
                  else if (message.status_presence_event) {
                      _this.onstatuspresence(message.status_presence_event);
                  }
                  else if (message.stream_presence_event) {
                      _this.onstreampresence(message.stream_presence_event);
                  }
                  else if (message.stream_data) {
                      _this.onstreamdata(message.stream_data);
                  }
                  else if (message.channel_message) {
                      message.channel_message.content = JSON.parse(message.channel_message.content);
                      _this.onchannelmessage(message.channel_message);
                  }
                  else if (message.channel_presence_event) {
                      _this.onchannelpresence(message.channel_presence_event);
                  }
                  else if (message.party_data) {
                      message.party_data.op_code = parseInt(message.party_data.op_code);
                      _this.onpartydata(message.party_data);
                  }
                  else if (message.on_party_close) {
                      _this.onpartyclose();
                  }
                  else if (message.party_join_request) {
                      _this.onpartyjoinrequest(message.party_join_request);
                  }
                  else if (message.party_leader) {
                      _this.onpartyleader(message.party_leader);
                  }
                  else if (message.party_matchmaker_ticket) {
                      _this.onpartymatchmakerticket(message.party_matchmaker_ticket);
                  }
                  else if (message.party_presence_event) {
                      _this.onpartypresence(message.party_presence_event);
                  }
                  else if (message.party) {
                      _this.onparty(message.party);
                  }
                  else {
                      if (_this.verbose && window && window.console) {
                          console.log("Unrecognized message received: %o", message);
                      }
                  }
              }
              else {
                  var executor = _this.cIds[message.cid];
                  if (!executor) {
                      if (_this.verbose && window && window.console) {
                          console.error("No promise executor for message: %o", message);
                      }
                      return;
                  }
                  delete _this.cIds[message.cid];
                  if (message.error) {
                      executor.reject(message.error);
                  }
                  else {
                      executor.resolve(message);
                  }
              }
          };
          return new Promise(function (resolve, reject) {
              _this.adapter.onOpen = function (evt) {
                  if (_this.verbose && window && window.console) {
                      console.log(evt);
                  }
                  resolve(session);
              };
              _this.adapter.onError = function (evt) {
                  reject(evt);
                  _this.adapter.close();
              };
          });
      };
      DefaultSocket.prototype.disconnect = function (fireDisconnectEvent) {
          if (fireDisconnectEvent === void 0) { fireDisconnectEvent = true; }
          if (this.adapter.isConnected) {
              this.adapter.close();
          }
          if (fireDisconnectEvent) {
              this.ondisconnect({});
          }
      };
      DefaultSocket.prototype.ondisconnect = function (evt) {
          if (this.verbose && window && window.console) {
              console.log(evt);
          }
      };
      DefaultSocket.prototype.onerror = function (evt) {
          if (this.verbose && window && window.console) {
              console.log(evt);
          }
      };
      DefaultSocket.prototype.onchannelmessage = function (channelMessage) {
          if (this.verbose && window && window.console) {
              console.log(channelMessage);
          }
      };
      DefaultSocket.prototype.onchannelpresence = function (channelPresence) {
          if (this.verbose && window && window.console) {
              console.log(channelPresence);
          }
      };
      DefaultSocket.prototype.onnotification = function (notification) {
          if (this.verbose && window && window.console) {
              console.log(notification);
          }
      };
      DefaultSocket.prototype.onmatchdata = function (matchData) {
          if (this.verbose && window && window.console) {
              console.log(matchData);
          }
      };
      DefaultSocket.prototype.onmatchpresence = function (matchPresence) {
          if (this.verbose && window && window.console) {
              console.log(matchPresence);
          }
      };
      DefaultSocket.prototype.onmatchmakerticket = function (matchmakerTicket) {
          if (this.verbose && window && window.console) {
              console.log(matchmakerTicket);
          }
      };
      DefaultSocket.prototype.onmatchmakermatched = function (matchmakerMatched) {
          if (this.verbose && window && window.console) {
              console.log(matchmakerMatched);
          }
      };
      DefaultSocket.prototype.onparty = function (party) {
          if (this.verbose && window && window.console) {
              console.log(party);
          }
      };
      DefaultSocket.prototype.onpartyclose = function () {
          if (this.verbose && window && window.console) {
              console.log("Party closed.");
          }
      };
      DefaultSocket.prototype.onpartyjoinrequest = function (partyJoinRequest) {
          if (this.verbose && window && window.console) {
              console.log(partyJoinRequest);
          }
      };
      DefaultSocket.prototype.onpartydata = function (partyData) {
          if (this.verbose && window && window.console) {
              console.log(partyData);
          }
      };
      DefaultSocket.prototype.onpartyleader = function (partyLeader) {
          if (this.verbose && window && window.console) {
              console.log(partyLeader);
          }
      };
      DefaultSocket.prototype.onpartymatchmakerticket = function (partyMatched) {
          if (this.verbose && window && window.console) {
              console.log(partyMatched);
          }
      };
      DefaultSocket.prototype.onpartypresence = function (partyPresence) {
          if (this.verbose && window && window.console) {
              console.log(partyPresence);
          }
      };
      DefaultSocket.prototype.onstatuspresence = function (statusPresence) {
          if (this.verbose && window && window.console) {
              console.log(statusPresence);
          }
      };
      DefaultSocket.prototype.onstreampresence = function (streamPresence) {
          if (this.verbose && window && window.console) {
              console.log(streamPresence);
          }
      };
      DefaultSocket.prototype.onstreamdata = function (streamData) {
          if (this.verbose && window && window.console) {
              console.log(streamData);
          }
      };
      DefaultSocket.prototype.send = function (message) {
          var _this = this;
          var untypedMessage = message;
          return new Promise(function (resolve, reject) {
              if (!_this.adapter.isConnected) {
                  reject("Socket connection has not been established yet.");
              }
              else {
                  if (untypedMessage.match_data_send) {
                      _this.adapter.send(untypedMessage);
                      resolve();
                  }
                  else if (untypedMessage.party_data_send) {
                      _this.adapter.send(untypedMessage);
                      resolve();
                  }
                  else {
                      if (untypedMessage.channel_message_send) {
                          untypedMessage.channel_message_send.content = JSON.stringify(untypedMessage.channel_message_send.content);
                      }
                      else if (untypedMessage.channel_message_update) {
                          untypedMessage.channel_message_update.content = JSON.stringify(untypedMessage.channel_message_update.content);
                      }
                      var cid = _this.generatecid();
                      _this.cIds[cid] = { resolve: resolve, reject: reject };
                      /** Add id for promise executor. */
                      untypedMessage.cid = cid;
                      _this.adapter.send(untypedMessage);
                  }
              }
              if (_this.verbose && window && window.console) {
                  console.log("Sent message: %o", JSON.stringify(untypedMessage));
              }
          });
      };
      DefaultSocket.prototype.acceptPartyMember = function (party_id, presence) {
          return this.send({ party_accept: { party_id: party_id, presence: presence } });
      };
      DefaultSocket.prototype.addMatchmaker = function (query, min_count, max_count, string_properties, numeric_properties) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({
                              "matchmaker_add": {
                                  min_count: min_count,
                                  max_count: max_count,
                                  query: query,
                                  string_properties: string_properties,
                                  numeric_properties: numeric_properties
                              }
                          })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.matchmaker_ticket];
                  }
              });
          });
      };
      DefaultSocket.prototype.addMatchmakerParty = function (party_id, query, min_count, max_count, string_properties, numeric_properties) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({
                              party_matchmaker_add: {
                                  party_id: party_id,
                                  min_count: min_count,
                                  max_count: max_count,
                                  query: query,
                                  string_properties: string_properties,
                                  numeric_properties: numeric_properties
                              }
                          })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.party_matchmaker_ticket];
                  }
              });
          });
      };
      DefaultSocket.prototype.closeParty = function (party_id) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ party_close: { party_id: party_id } })];
                      case 1: return [2 /*return*/, _a.sent()];
                  }
              });
          });
      };
      DefaultSocket.prototype.createMatch = function () {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ match_create: {} })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.match];
                  }
              });
          });
      };
      DefaultSocket.prototype.createParty = function (open, max_size) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ party_create: { open: open, max_size: max_size } })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.party];
                  }
              });
          });
      };
      DefaultSocket.prototype.followUsers = function (userIds) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ status_follow: { user_ids: userIds } })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.status];
                  }
              });
          });
      };
      DefaultSocket.prototype.joinChat = function (target, type, persistence, hidden) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({
                              channel_join: {
                                  target: target,
                                  type: type,
                                  persistence: persistence,
                                  hidden: hidden
                              }
                          })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.channel];
                  }
              });
          });
      };
      DefaultSocket.prototype.joinMatch = function (match_id, token, metadata) {
          return __awaiter(this, void 0, void 0, function () {
              var join, response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          join = { match_join: { metadata: metadata } };
                          if (token) {
                              join.match_join.token = token;
                          }
                          else {
                              join.match_join.match_id = match_id;
                          }
                          return [4 /*yield*/, this.send(join)];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.match];
                  }
              });
          });
      };
      DefaultSocket.prototype.joinParty = function (party_id) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ party_join: { party_id: party_id } })];
                      case 1: return [2 /*return*/, _a.sent()];
                  }
              });
          });
      };
      DefaultSocket.prototype.leaveChat = function (channel_id) {
          return this.send({ channel_leave: { channel_id: channel_id } });
      };
      DefaultSocket.prototype.leaveMatch = function (matchId) {
          return this.send({ match_leave: { match_id: matchId } });
      };
      DefaultSocket.prototype.leaveParty = function (party_id) {
          return this.send({ party_leave: { party_id: party_id } });
      };
      DefaultSocket.prototype.listPartyJoinRequests = function (party_id) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ party_join_request_list: { party_id: party_id } })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.party_join_request];
                  }
              });
          });
      };
      DefaultSocket.prototype.promotePartyMember = function (party_id, party_member) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ party_promote: { party_id: party_id, presence: party_member } })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.party_leader];
                  }
              });
          });
      };
      DefaultSocket.prototype.removeChatMessage = function (channel_id, message_id) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({
                              channel_message_remove: {
                                  channel_id: channel_id,
                                  message_id: message_id
                              }
                          })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.channel_message_ack];
                  }
              });
          });
      };
      DefaultSocket.prototype.removeMatchmaker = function (ticket) {
          return this.send({ matchmaker_remove: { ticket: ticket } });
      };
      DefaultSocket.prototype.removeMatchmakerParty = function (party_id, ticket) {
          return this.send({
              party_matchmaker_remove: {
                  party_id: party_id,
                  ticket: ticket
              }
          });
      };
      DefaultSocket.prototype.removePartyMember = function (party_id, member) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, this.send({ party_remove: {
                              party_id: party_id,
                              presence: member
                          } })];
              });
          });
      };
      DefaultSocket.prototype.rpc = function (id, payload, http_key) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({
                              rpc: {
                                  id: id,
                                  payload: payload,
                                  http_key: http_key,
                              }
                          })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.rpc];
                  }
              });
          });
      };
      DefaultSocket.prototype.sendMatchState = function (matchId, opCode, data, presences) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, this.send({
                          match_data_send: {
                              match_id: matchId,
                              op_code: opCode,
                              data: data,
                              presences: presences !== null && presences !== void 0 ? presences : []
                          }
                      })];
              });
          });
      };
      DefaultSocket.prototype.sendPartyData = function (party_id, op_code, data) {
          return this.send({ party_data_send: { party_id: party_id, op_code: op_code, data: data } });
      };
      DefaultSocket.prototype.unfollowUsers = function (user_ids) {
          return this.send({ status_unfollow: { user_ids: user_ids } });
      };
      DefaultSocket.prototype.updateChatMessage = function (channel_id, message_id, content) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ channel_message_update: { channel_id: channel_id, message_id: message_id, content: content } })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.channel_message_ack];
                  }
              });
          });
      };
      DefaultSocket.prototype.updateStatus = function (status) {
          return this.send({ status_update: { status: status } });
      };
      DefaultSocket.prototype.writeChatMessage = function (channel_id, content) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.send({ channel_message_send: { channel_id: channel_id, content: content } })];
                      case 1:
                          response = _a.sent();
                          return [2 /*return*/, response.channel_message_ack];
                  }
              });
          });
      };
      return DefaultSocket;
  }());

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
  var DEFAULT_HOST = "127.0.0.1";
  var DEFAULT_PORT = "7350";
  var DEFAULT_SERVER_KEY = "defaultkey";
  var DEFAULT_TIMEOUT_MS = 7000;
  var DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;
  /** A client for Nakama server. */
  var Client = /** @class */ (function () {
      function Client(serverkey, host, port, useSSL, timeout, autoRefreshSession) {
          if (serverkey === void 0) { serverkey = DEFAULT_SERVER_KEY; }
          if (host === void 0) { host = DEFAULT_HOST; }
          if (port === void 0) { port = DEFAULT_PORT; }
          if (useSSL === void 0) { useSSL = false; }
          if (timeout === void 0) { timeout = DEFAULT_TIMEOUT_MS; }
          if (autoRefreshSession === void 0) { autoRefreshSession = true; }
          this.serverkey = serverkey;
          this.host = host;
          this.port = port;
          this.useSSL = useSSL;
          this.timeout = timeout;
          this.autoRefreshSession = autoRefreshSession;
          /** The expired timespan used to check session lifetime. */
          this.expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;
          var scheme = (useSSL) ? "https://" : "http://";
          var basePath = "" + scheme + host + ":" + port;
          this.apiClient = new NakamaApi(serverkey, basePath, timeout);
      }
      /** Add users to a group, or accept their join requests. */
      Client.prototype.addGroupUsers = function (session, groupId, ids) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.addGroupUsers(session.token, groupId, ids).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add friends by ID or username to a user's account. */
      Client.prototype.addFriends = function (session, ids, usernames) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.addFriends(session.token, ids, usernames).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Authenticate a user with an Apple ID against the server. */
      Client.prototype.authenticateApple = function (token, create, username, vars, options) {
          if (vars === void 0) { vars = {}; }
          if (options === void 0) { options = {}; }
          return __awaiter(this, void 0, void 0, function () {
              var request;
              return __generator(this, function (_a) {
                  request = {
                      "token": token,
                      "vars": vars
                  };
                  return [2 /*return*/, this.apiClient.authenticateApple(this.serverkey, "", request, create, username, options).then(function (apiSession) {
                          return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
                      })];
              });
          });
      };
      /** Authenticate a user with a custom id against the server. */
      Client.prototype.authenticateCustom = function (id, create, username, vars, options) {
          if (vars === void 0) { vars = {}; }
          if (options === void 0) { options = {}; }
          var request = {
              "id": id,
              "vars": vars
          };
          return this.apiClient.authenticateCustom(this.serverkey, "", request, create, username, options).then(function (apiSession) {
              return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
          });
      };
      /** Authenticate a user with a device id against the server. */
      Client.prototype.authenticateDevice = function (id, create, username, vars) {
          var request = {
              "id": id,
              "vars": vars
          };
          return this.apiClient.authenticateDevice(this.serverkey, "", request, create, username).then(function (apiSession) {
              return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
          });
      };
      /** Authenticate a user with an email+password against the server. */
      Client.prototype.authenticateEmail = function (email, password, create, username, vars) {
          var request = {
              "email": email,
              "password": password,
              "vars": vars
          };
          return this.apiClient.authenticateEmail(this.serverkey, "", request, create, username).then(function (apiSession) {
              return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
          });
      };
      /** Authenticate a user with a Facebook Instant Game token against the server. */
      Client.prototype.authenticateFacebookInstantGame = function (signedPlayerInfo, create, username, vars, options) {
          if (options === void 0) { options = {}; }
          var request = {
              "signed_player_info": signedPlayerInfo,
              "vars": vars
          };
          return this.apiClient.authenticateFacebookInstantGame(this.serverkey, "", { signed_player_info: request.signed_player_info, vars: request.vars }, create, username, options).then(function (apiSession) {
              return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
          });
      };
      /** Authenticate a user with a Facebook OAuth token against the server. */
      Client.prototype.authenticateFacebook = function (token, create, username, sync, vars, options) {
          if (options === void 0) { options = {}; }
          var request = {
              "token": token,
              "vars": vars
          };
          return this.apiClient.authenticateFacebook(this.serverkey, "", request, create, username, sync, options).then(function (apiSession) {
              return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
          });
      };
      /** Authenticate a user with Google against the server. */
      Client.prototype.authenticateGoogle = function (token, create, username, vars, options) {
          if (options === void 0) { options = {}; }
          var request = {
              "token": token,
              "vars": vars
          };
          return this.apiClient.authenticateGoogle(this.serverkey, "", request, create, username, options).then(function (apiSession) {
              return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
          });
      };
      /** Authenticate a user with GameCenter against the server. */
      Client.prototype.authenticateGameCenter = function (token, create, username, vars) {
          var request = {
              "token": token,
              "vars": vars
          };
          return this.apiClient.authenticateGameCenter(this.serverkey, "", request, create, username).then(function (apiSession) {
              return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
          });
      };
      /** Authenticate a user with Steam against the server. */
      Client.prototype.authenticateSteam = function (token, create, username, sync, vars) {
          return __awaiter(this, void 0, void 0, function () {
              var request;
              return __generator(this, function (_a) {
                  request = {
                      "token": token,
                      "vars": vars,
                      "sync": sync
                  };
                  return [2 /*return*/, this.apiClient.authenticateSteam(this.serverkey, "", request, create, username).then(function (apiSession) {
                          return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
                      })];
              });
          });
      };
      /** Ban users from a group. */
      Client.prototype.banGroupUsers = function (session, groupId, ids) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.banGroupUsers(session.token, groupId, ids).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Block one or more users by ID or username. */
      Client.prototype.blockFriends = function (session, ids, usernames) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.blockFriends(session.token, ids, usernames).then(function (response) {
                              return Promise.resolve(response != undefined);
                          })];
                  }
              });
          });
      };
      /** Create a new group with the current user as the creator and superadmin. */
      Client.prototype.createGroup = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.createGroup(session.token, request).then(function (response) {
                              return Promise.resolve({
                                  avatar_url: response.avatar_url,
                                  create_time: response.create_time,
                                  creator_id: response.creator_id,
                                  description: response.description,
                                  edge_count: response.edge_count ? Number(response.edge_count) : 0,
                                  id: response.id,
                                  lang_tag: response.lang_tag,
                                  max_count: response.max_count ? Number(response.max_count) : 0,
                                  metadata: response.metadata ? JSON.parse(response.metadata) : undefined,
                                  name: response.name,
                                  open: response.open,
                                  update_time: response.update_time
                              });
                          })];
                  }
              });
          });
      };
      /** A socket created with the client's configuration. */
      Client.prototype.createSocket = function (useSSL, verbose, adapter) {
          if (useSSL === void 0) { useSSL = false; }
          if (verbose === void 0) { verbose = false; }
          if (adapter === void 0) { adapter = new WebSocketAdapterText(); }
          return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter);
      };
      /** Delete one or more users by ID or username. */
      Client.prototype.deleteFriends = function (session, ids, usernames) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.deleteFriends(session.token, ids, usernames).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Delete a group the user is part of and has permissions to delete. */
      Client.prototype.deleteGroup = function (session, groupId) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.deleteGroup(session.token, groupId).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Delete one or more notifications */
      Client.prototype.deleteNotifications = function (session, ids) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.deleteNotifications(session.token, ids).then(function (response) {
                              return Promise.resolve(response != undefined);
                          })];
                  }
              });
          });
      };
      /** Delete one or more storage objects */
      Client.prototype.deleteStorageObjects = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.deleteStorageObjects(session.token, request).then(function (response) {
                              return Promise.resolve(response != undefined);
                          })];
                  }
              });
          });
      };
      /** Demote a set of users in a group to the next role down. */
      Client.prototype.demoteGroupUsers = function (session, groupId, ids) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.demoteGroupUsers(session.token, groupId, ids).then(function (response) {
                              return Promise.resolve(response != undefined);
                          })];
                  }
              });
          });
      };
      /** Submit an event for processing in the server's registered runtime custom events handler. */
      Client.prototype.emitEvent = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.event(session.token, request).then(function (response) {
                              return Promise.resolve(response != undefined);
                          })];
                  }
              });
          });
      };
      /** Fetch the current user's account. */
      Client.prototype.getAccount = function (session) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.getAccount(session.token)];
                  }
              });
          });
      };
      /** Import Facebook friends and add them to a user's account. */
      Client.prototype.importFacebookFriends = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.importFacebookFriends(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Import Steam friends and add them to a user's account. */
      Client.prototype.importSteamFriends = function (session, request, reset) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.importSteamFriends(session.token, request, reset).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Fetch zero or more users by ID and/or username. */
      Client.prototype.getUsers = function (session, ids, usernames, facebookIds) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.getUsers(session.token, ids, usernames, facebookIds).then(function (response) {
                              var result = {
                                  users: []
                              };
                              if (response.users == null) {
                                  return Promise.resolve(result);
                              }
                              response.users.forEach(function (u) {
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
                                      metadata: u.metadata ? JSON.parse(u.metadata) : undefined
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** Join a group that's open, or send a request to join a group that is closed. */
      Client.prototype.joinGroup = function (session, groupId) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.joinGroup(session.token, groupId, {}).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      Client.prototype.joinTournament = function (session, tournamentId) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.joinTournament(session.token, tournamentId, {}).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Kick users from a group, or decline their join requests. */
      Client.prototype.kickGroupUsers = function (session, groupId, ids) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.kickGroupUsers(session.token, groupId, ids).then(function (response) {
                              return Promise.resolve(response != undefined);
                          })];
                  }
              });
          });
      };
      /** Leave a group the user is part of. */
      Client.prototype.leaveGroup = function (session, groupId) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.leaveGroup(session.token, groupId, {}).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** List a channel's message history. */
      Client.prototype.listChannelMessages = function (session, channelId, limit, forward, cursor) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listChannelMessages(session.token, channelId, limit, forward, cursor).then(function (response) {
                              var result = {
                                  messages: [],
                                  next_cursor: response.next_cursor,
                                  prev_cursor: response.prev_cursor,
                                  cacheable_cursor: response.cacheable_cursor
                              };
                              if (response.messages == null) {
                                  return Promise.resolve(result);
                              }
                              response.messages.forEach(function (m) {
                                  result.messages.push({
                                      channel_id: m.channel_id,
                                      code: m.code ? Number(m.code) : 0,
                                      create_time: m.create_time,
                                      message_id: m.message_id,
                                      persistent: m.persistent,
                                      sender_id: m.sender_id,
                                      update_time: m.update_time,
                                      username: m.username,
                                      content: m.content ? JSON.parse(m.content) : undefined,
                                      group_id: m.group_id,
                                      room_name: m.room_name,
                                      user_id_one: m.user_id_one,
                                      user_id_two: m.user_id_two
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** List a group's users. */
      Client.prototype.listGroupUsers = function (session, groupId, state, limit, cursor) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listGroupUsers(session.token, groupId, limit, state, cursor).then(function (response) {
                              var result = {
                                  group_users: [],
                                  cursor: response.cursor
                              };
                              if (response.group_users == null) {
                                  return Promise.resolve(result);
                              }
                              response.group_users.forEach(function (gu) {
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
                                          metadata: gu.user.metadata ? JSON.parse(gu.user.metadata) : undefined
                                      },
                                      state: gu.state ? Number(gu.state) : 0
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** List a user's groups. */
      Client.prototype.listUserGroups = function (session, userId, state, limit, cursor) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listUserGroups(session.token, userId, state, limit, cursor).then(function (response) {
                              var result = {
                                  user_groups: [],
                                  cursor: response.cursor,
                              };
                              if (response.user_groups == null) {
                                  return Promise.resolve(result);
                              }
                              response.user_groups.forEach(function (ug) {
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
                                          metadata: ug.group.metadata ? JSON.parse(ug.group.metadata) : undefined,
                                          name: ug.group.name,
                                          open: ug.group.open,
                                          update_time: ug.group.update_time
                                      },
                                      state: ug.state ? Number(ug.state) : 0
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** List groups based on given filters. */
      Client.prototype.listGroups = function (session, name, cursor, limit) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listGroups(session.token, name, cursor, limit).then(function (response) {
                              var result = {
                                  groups: []
                              };
                              if (response.groups == null) {
                                  return Promise.resolve(result);
                              }
                              result.cursor = response.cursor;
                              response.groups.forEach(function (ug) {
                                  result.groups.push({
                                      avatar_url: ug.avatar_url,
                                      create_time: ug.create_time,
                                      creator_id: ug.creator_id,
                                      description: ug.description,
                                      edge_count: ug.edge_count ? Number(ug.edge_count) : 0,
                                      id: ug.id,
                                      lang_tag: ug.lang_tag,
                                      max_count: ug.max_count,
                                      metadata: ug.metadata ? JSON.parse(ug.metadata) : undefined,
                                      name: ug.name,
                                      open: ug.open,
                                      update_time: ug.update_time
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** Add an Apple ID to the social profiles on the current user's account. */
      Client.prototype.linkApple = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkApple(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add a custom ID to the social profiles on the current user's account. */
      Client.prototype.linkCustom = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkCustom(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add a device ID to the social profiles on the current user's account. */
      Client.prototype.linkDevice = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkDevice(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add an email+password to the social profiles on the current user's account. */
      Client.prototype.linkEmail = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkEmail(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add Facebook to the social profiles on the current user's account. */
      Client.prototype.linkFacebook = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkFacebook(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add Facebook Instant to the social profiles on the current user's account. */
      Client.prototype.linkFacebookInstantGame = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkFacebookInstantGame(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add Google to the social profiles on the current user's account. */
      Client.prototype.linkGoogle = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkGoogle(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add GameCenter to the social profiles on the current user's account. */
      Client.prototype.linkGameCenter = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkGameCenter(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Add Steam to the social profiles on the current user's account. */
      Client.prototype.linkSteam = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.linkSteam(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** List all friends for the current user. */
      Client.prototype.listFriends = function (session, state, limit, cursor) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listFriends(session.token, limit, state, cursor).then(function (response) {
                              var result = {
                                  friends: [],
                                  cursor: response.cursor
                              };
                              if (response.friends == null) {
                                  return Promise.resolve(result);
                              }
                              response.friends.forEach(function (f) {
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
                                          metadata: f.user.metadata ? JSON.parse(f.user.metadata) : undefined,
                                          facebook_instant_game_id: f.user.facebook_instant_game_id
                                      },
                                      state: f.state
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** List leaderboard records */
      Client.prototype.listLeaderboardRecords = function (session, leaderboardId, ownerIds, limit, cursor, expiry) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listLeaderboardRecords(session.token, leaderboardId, ownerIds, limit, cursor, expiry).then(function (response) {
                              var list = {
                                  next_cursor: response.next_cursor,
                                  prev_cursor: response.prev_cursor,
                                  owner_records: [],
                                  records: []
                              };
                              if (response.owner_records != null) {
                                  response.owner_records.forEach(function (o) {
                                      list.owner_records.push({
                                          expiry_time: o.expiry_time,
                                          leaderboard_id: o.leaderboard_id,
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          num_score: o.num_score ? Number(o.num_score) : 0,
                                          owner_id: o.owner_id,
                                          rank: o.rank ? Number(o.rank) : 0,
                                          score: o.score ? Number(o.score) : 0,
                                          subscore: o.subscore ? Number(o.subscore) : 0,
                                          update_time: o.update_time,
                                          username: o.username,
                                          max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
                                      });
                                  });
                              }
                              if (response.records != null) {
                                  response.records.forEach(function (o) {
                                      list.records.push({
                                          expiry_time: o.expiry_time,
                                          leaderboard_id: o.leaderboard_id,
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          num_score: o.num_score ? Number(o.num_score) : 0,
                                          owner_id: o.owner_id,
                                          rank: o.rank ? Number(o.rank) : 0,
                                          score: o.score ? Number(o.score) : 0,
                                          subscore: o.subscore ? Number(o.subscore) : 0,
                                          update_time: o.update_time,
                                          username: o.username,
                                          max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
                                      });
                                  });
                              }
                              return Promise.resolve(list);
                          })];
                  }
              });
          });
      };
      Client.prototype.listLeaderboardRecordsAroundOwner = function (session, leaderboardId, ownerId, limit, expiry) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listLeaderboardRecordsAroundOwner(session.token, leaderboardId, ownerId, limit, expiry).then(function (response) {
                              var list = {
                                  next_cursor: response.next_cursor,
                                  prev_cursor: response.prev_cursor,
                                  owner_records: [],
                                  records: []
                              };
                              if (response.owner_records != null) {
                                  response.owner_records.forEach(function (o) {
                                      list.owner_records.push({
                                          expiry_time: o.expiry_time,
                                          leaderboard_id: o.leaderboard_id,
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          num_score: o.num_score ? Number(o.num_score) : 0,
                                          owner_id: o.owner_id,
                                          rank: o.rank ? Number(o.rank) : 0,
                                          score: o.score ? Number(o.score) : 0,
                                          subscore: o.subscore ? Number(o.subscore) : 0,
                                          update_time: o.update_time,
                                          username: o.username,
                                          max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
                                      });
                                  });
                              }
                              if (response.records != null) {
                                  response.records.forEach(function (o) {
                                      list.records.push({
                                          expiry_time: o.expiry_time,
                                          leaderboard_id: o.leaderboard_id,
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          num_score: o.num_score ? Number(o.num_score) : 0,
                                          owner_id: o.owner_id,
                                          rank: o.rank ? Number(o.rank) : 0,
                                          score: o.score ? Number(o.score) : 0,
                                          subscore: o.subscore ? Number(o.subscore) : 0,
                                          update_time: o.update_time,
                                          username: o.username,
                                          max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
                                      });
                                  });
                              }
                              return Promise.resolve(list);
                          })];
                  }
              });
          });
      };
      /** Fetch list of running matches. */
      Client.prototype.listMatches = function (session, limit, authoritative, label, minSize, maxSize, query) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listMatches(session.token, limit, authoritative, label, minSize, maxSize, query)];
                  }
              });
          });
      };
      /** Fetch list of notifications. */
      Client.prototype.listNotifications = function (session, limit, cacheableCursor) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listNotifications(session.token, limit, cacheableCursor).then(function (response) {
                              var result = {
                                  cacheable_cursor: response.cacheable_cursor,
                                  notifications: [],
                              };
                              if (response.notifications == null) {
                                  return Promise.resolve(result);
                              }
                              response.notifications.forEach(function (n) {
                                  result.notifications.push({
                                      code: n.code ? Number(n.code) : 0,
                                      create_time: n.create_time,
                                      id: n.id,
                                      persistent: n.persistent,
                                      sender_id: n.sender_id,
                                      subject: n.subject,
                                      content: n.content ? JSON.parse(n.content) : undefined
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** List storage objects. */
      Client.prototype.listStorageObjects = function (session, collection, userId, limit, cursor) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listStorageObjects(session.token, collection, userId, limit, cursor).then(function (response) {
                              var result = {
                                  objects: [],
                                  cursor: response.cursor
                              };
                              if (response.objects == null) {
                                  return Promise.resolve(result);
                              }
                              response.objects.forEach(function (o) {
                                  result.objects.push({
                                      collection: o.collection,
                                      key: o.key,
                                      permission_read: o.permission_read ? Number(o.permission_read) : 0,
                                      permission_write: o.permission_write ? Number(o.permission_write) : 0,
                                      value: o.value ? JSON.parse(o.value) : undefined,
                                      version: o.version,
                                      user_id: o.user_id,
                                      create_time: o.create_time,
                                      update_time: o.update_time
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** List current or upcoming tournaments. */
      Client.prototype.listTournaments = function (session, categoryStart, categoryEnd, startTime, endTime, limit, cursor) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listTournaments(session.token, categoryStart, categoryEnd, startTime, endTime, limit, cursor).then(function (response) {
                              var list = {
                                  cursor: response.cursor,
                                  tournaments: [],
                              };
                              if (response.tournaments != null) {
                                  response.tournaments.forEach(function (o) {
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
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          create_time: o.create_time,
                                          start_time: o.start_time,
                                          end_time: o.end_time,
                                          start_active: o.start_active,
                                      });
                                  });
                              }
                              return Promise.resolve(list);
                          })];
                  }
              });
          });
      };
      /** List tournament records from a given tournament. */
      Client.prototype.listTournamentRecords = function (session, tournamentId, ownerIds, limit, cursor, expiry) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listTournamentRecords(session.token, tournamentId, ownerIds, limit, cursor, expiry).then(function (response) {
                              var list = {
                                  next_cursor: response.next_cursor,
                                  prev_cursor: response.prev_cursor,
                                  owner_records: [],
                                  records: []
                              };
                              if (response.owner_records != null) {
                                  response.owner_records.forEach(function (o) {
                                      list.owner_records.push({
                                          expiry_time: o.expiry_time,
                                          leaderboard_id: o.leaderboard_id,
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          num_score: o.num_score ? Number(o.num_score) : 0,
                                          owner_id: o.owner_id,
                                          rank: o.rank ? Number(o.rank) : 0,
                                          score: o.score ? Number(o.score) : 0,
                                          subscore: o.subscore ? Number(o.subscore) : 0,
                                          update_time: o.update_time,
                                          username: o.username,
                                          max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
                                      });
                                  });
                              }
                              if (response.records != null) {
                                  response.records.forEach(function (o) {
                                      list.records.push({
                                          expiry_time: o.expiry_time,
                                          leaderboard_id: o.leaderboard_id,
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          num_score: o.num_score ? Number(o.num_score) : 0,
                                          owner_id: o.owner_id,
                                          rank: o.rank ? Number(o.rank) : 0,
                                          score: o.score ? Number(o.score) : 0,
                                          subscore: o.subscore ? Number(o.subscore) : 0,
                                          update_time: o.update_time,
                                          username: o.username,
                                          max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
                                      });
                                  });
                              }
                              return Promise.resolve(list);
                          })];
                  }
              });
          });
      };
      /** List tournament records from a given tournament around the owner. */
      Client.prototype.listTournamentRecordsAroundOwner = function (session, tournamentId, ownerId, limit, expiry) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.listTournamentRecordsAroundOwner(session.token, tournamentId, ownerId, limit, expiry).then(function (response) {
                              var list = {
                                  next_cursor: response.next_cursor,
                                  prev_cursor: response.prev_cursor,
                                  owner_records: [],
                                  records: []
                              };
                              if (response.owner_records != null) {
                                  response.owner_records.forEach(function (o) {
                                      list.owner_records.push({
                                          expiry_time: o.expiry_time,
                                          leaderboard_id: o.leaderboard_id,
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          num_score: o.num_score ? Number(o.num_score) : 0,
                                          owner_id: o.owner_id,
                                          rank: o.rank ? Number(o.rank) : 0,
                                          score: o.score ? Number(o.score) : 0,
                                          subscore: o.subscore ? Number(o.subscore) : 0,
                                          update_time: o.update_time,
                                          username: o.username,
                                          max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
                                      });
                                  });
                              }
                              if (response.records != null) {
                                  response.records.forEach(function (o) {
                                      list.records.push({
                                          expiry_time: o.expiry_time,
                                          leaderboard_id: o.leaderboard_id,
                                          metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                                          num_score: o.num_score ? Number(o.num_score) : 0,
                                          owner_id: o.owner_id,
                                          rank: o.rank ? Number(o.rank) : 0,
                                          score: o.score ? Number(o.score) : 0,
                                          subscore: o.subscore ? Number(o.subscore) : 0,
                                          update_time: o.update_time,
                                          username: o.username,
                                          max_num_score: o.max_num_score ? Number(o.max_num_score) : 0,
                                      });
                                  });
                              }
                              return Promise.resolve(list);
                          })];
                  }
              });
          });
      };
      /** Promote users in a group to the next role up. */
      Client.prototype.promoteGroupUsers = function (session, groupId, ids) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.promoteGroupUsers(session.token, groupId, ids)];
                  }
              });
          });
      };
      /** Fetch storage objects. */
      Client.prototype.readStorageObjects = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.readStorageObjects(session.token, request).then(function (response) {
                              var result = { objects: [] };
                              if (response.objects == null) {
                                  return Promise.resolve(result);
                              }
                              response.objects.forEach(function (o) {
                                  result.objects.push({
                                      collection: o.collection,
                                      key: o.key,
                                      permission_read: o.permission_read ? Number(o.permission_read) : 0,
                                      permission_write: o.permission_write ? Number(o.permission_write) : 0,
                                      value: o.value ? JSON.parse(o.value) : undefined,
                                      version: o.version,
                                      user_id: o.user_id,
                                      create_time: o.create_time,
                                      update_time: o.update_time
                                  });
                              });
                              return Promise.resolve(result);
                          })];
                  }
              });
          });
      };
      /** Execute an RPC function on the server. */
      Client.prototype.rpc = function (session, id, input) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.rpcFunc(session.token, id, JSON.stringify(input)).then(function (response) {
                              return Promise.resolve({
                                  id: response.id,
                                  payload: (!response.payload) ? undefined : JSON.parse(response.payload)
                              });
                          })];
                  }
              });
          });
      };
      /** Execute an RPC function on the server. */
      Client.prototype.rpcHttpKey = function (httpKey, id, input) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, this.apiClient.rpcFunc2("", id, input && JSON.stringify(input) || "", httpKey)
                          .then(function (response) {
                          return Promise.resolve({
                              id: response.id,
                              payload: (!response.payload) ? undefined : JSON.parse(response.payload)
                          });
                      }).catch(function (err) {
                          throw err;
                      })];
              });
          });
      };
      /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
      Client.prototype.sessionLogout = function (session, token, refreshToken) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.sessionLogout(session.token, { refresh_token: refreshToken, token: token }).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
      Client.prototype.sessionRefresh = function (session, vars) {
          if (vars === void 0) { vars = {}; }
          return __awaiter(this, void 0, void 0, function () {
              var apiSession;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!session) {
                              console.error("Cannot refresh a null session.");
                              return [2 /*return*/, session];
                          }
                          if (session.created && session.expires_at - session.created_at < 70) {
                              console.warn("Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/nakama/getting-started/configuration/#session");
                          }
                          if (session.created && session.refresh_expires_at - session.created_at < 3700) {
                              console.warn("Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/nakama/getting-started/configuration/#session");
                          }
                          return [4 /*yield*/, this.apiClient.sessionRefresh(this.serverkey, "", { token: session.refresh_token, vars: vars })];
                      case 1:
                          apiSession = _a.sent();
                          session.update(apiSession.token, apiSession.refresh_token);
                          return [2 /*return*/, session];
                  }
              });
          });
      };
      /** Remove the Apple ID from the social profiles on the current user's account. */
      Client.prototype.unlinkApple = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkApple(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Remove custom ID from the social profiles on the current user's account. */
      Client.prototype.unlinkCustom = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkCustom(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Remove a device ID from the social profiles on the current user's account. */
      Client.prototype.unlinkDevice = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkDevice(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Remove an email+password from the social profiles on the current user's account. */
      Client.prototype.unlinkEmail = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkEmail(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Remove Facebook from the social profiles on the current user's account. */
      Client.prototype.unlinkFacebook = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkFacebook(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Remove Facebook Instant social profiles from the current user's account. */
      Client.prototype.unlinkFacebookInstantGame = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkFacebookInstantGame(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Remove Google from the social profiles on the current user's account. */
      Client.prototype.unlinkGoogle = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkGoogle(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Remove GameCenter from the social profiles on the current user's account. */
      Client.prototype.unlinkGameCenter = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkGameCenter(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Remove Steam from the social profiles on the current user's account. */
      Client.prototype.unlinkSteam = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.unlinkSteam(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Update fields in the current user's account. */
      Client.prototype.updateAccount = function (session, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.updateAccount(session.token, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Update a group the user is part of and has permissions to update. */
      Client.prototype.updateGroup = function (session, groupId, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.updateGroup(session.token, groupId, request).then(function (response) {
                              return response !== undefined;
                          })];
                  }
              });
          });
      };
      /** Validate an Apple IAP receipt. */
      Client.prototype.validatePurchaseApple = function (session, receipt) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.validatePurchaseApple(session.token, { receipt: receipt })];
                  }
              });
          });
      };
      /** Validate a Google IAP receipt. */
      Client.prototype.validatePurchaseGoogle = function (session, purchase) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.validatePurchaseGoogle(session.token, { purchase: purchase })];
                  }
              });
          });
      };
      /** Validate a Huawei IAP receipt. */
      Client.prototype.validatePurchaseHuawei = function (session, purchase, signature) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.validatePurchaseHuawei(session.token, { purchase: purchase, signature: signature })];
                  }
              });
          });
      };
      /** Write a record to a leaderboard. */
      Client.prototype.writeLeaderboardRecord = function (session, leaderboardId, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/, this.apiClient.writeLeaderboardRecord(session.token, leaderboardId, {
                              metadata: request.metadata ? JSON.stringify(request.metadata) : undefined,
                              score: request.score,
                              subscore: request.subscore
                          }).then(function (response) {
                              return Promise.resolve({
                                  expiry_time: response.expiry_time,
                                  leaderboard_id: response.leaderboard_id,
                                  metadata: response.metadata ? JSON.parse(response.metadata) : undefined,
                                  num_score: response.num_score ? Number(response.num_score) : 0,
                                  owner_id: response.owner_id,
                                  score: response.score ? Number(response.score) : 0,
                                  subscore: response.subscore ? Number(response.subscore) : 0,
                                  update_time: response.update_time,
                                  username: response.username,
                                  max_num_score: response.max_num_score ? Number(response.max_num_score) : 0,
                                  rank: response.rank ? Number(response.rank) : 0,
                              });
                          })];
                  }
              });
          });
      };
      /** Write storage objects. */
      Client.prototype.writeStorageObjects = function (session, objects) {
          return __awaiter(this, void 0, void 0, function () {
              var request;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(this.autoRefreshSession && session.refresh_token &&
                              session.isexpired((Date.now() + this.expiredTimespanMs) / 1000))) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.sessionRefresh(session)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2:
                          request = { objects: [] };
                          objects.forEach(function (o) {
                              request.objects.push({
                                  collection: o.collection,
                                  key: o.key,
                                  permission_read: o.permission_read,
                                  permission_write: o.permission_write,
                                  value: JSON.stringify(o.value),
                                  version: o.version
                              });
                          });
                          return [2 /*return*/, this.apiClient.writeStorageObjects(session.token, request)];
                  }
              });
          });
      };
      /** Write a record to a tournament. */
      Client.prototype.writeTournamentRecord = function (session, tournamentId, request) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, this.apiClient.writeTournamentRecord(session.token, tournamentId, {
                          metadata: request.metadata ? JSON.stringify(request.metadata) : undefined,
                          score: request.score,
                          subscore: request.subscore
                      }).then(function (response) {
                          return Promise.resolve({
                              expiry_time: response.expiry_time,
                              leaderboard_id: response.leaderboard_id,
                              metadata: response.metadata ? JSON.parse(response.metadata) : undefined,
                              num_score: response.num_score ? Number(response.num_score) : 0,
                              owner_id: response.owner_id,
                              score: response.score ? Number(response.score) : 0,
                              subscore: response.subscore ? Number(response.subscore) : 0,
                              update_time: response.update_time,
                              username: response.username,
                              max_num_score: response.max_num_score ? Number(response.max_num_score) : 0,
                              rank: response.rank ? Number(response.rank) : 0,
                          });
                      })];
              });
          });
      };
      return Client;
  }());

  exports.Client = Client;
  exports.DefaultSocket = DefaultSocket;
  exports.Session = Session;
  exports.WebSocketAdapterText = WebSocketAdapterText;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
