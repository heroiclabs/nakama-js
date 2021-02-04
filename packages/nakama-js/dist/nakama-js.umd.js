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
  const _hasatob = typeof atob === 'function';
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
  const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  const _fromCC = String.fromCharCode.bind(String);
  const _U8Afrom = typeof Uint8Array.from === 'function'
      ? Uint8Array.from.bind(Uint8Array)
      : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  const _mkUriSafe = (src) => src
      .replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_')
      .replace(/=+$/m, '');
  const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, '');
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
  // This trick is found broken https://github.com/dankogai/js-base64/issues/130
  // const btou = (src: string) => decodeURIComponent(escape(src));
  // reverting good old fationed regexp
  const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
  const cb_btou = (cccc) => {
      switch (cccc.length) {
          case 4:
              var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                  | ((0x3f & cccc.charCodeAt(1)) << 12)
                  | ((0x3f & cccc.charCodeAt(2)) << 6)
                  | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
              return (_fromCC((offset >>> 10) + 0xD800)
                  + _fromCC((offset & 0x3FF) + 0xDC00));
          case 3:
              return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                  | ((0x3f & cccc.charCodeAt(1)) << 6)
                  | (0x3f & cccc.charCodeAt(2)));
          default:
              return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                  | (0x3f & cccc.charCodeAt(1)));
      }
  };
  /**
   * @deprecated should have been internal use only.
   * @param {string} src UTF-16 string
   * @returns {string} UTF-8 string
   */
  const btou = (b) => b.replace(re_btou, cb_btou);
  /**
   * polyfill version of `atob`
   */
  const atobPolyfill = (asc) => {
      // console.log('polyfilled');
      asc = asc.replace(/\s+/g, '');
      if (!b64re.test(asc))
          throw new TypeError('malformed base64.');
      asc += '=='.slice(2 - (asc.length & 3));
      let u24, bin = '', r1, r2;
      for (let i = 0; i < asc.length;) {
          u24 = b64tab[asc.charAt(i++)] << 18
              | b64tab[asc.charAt(i++)] << 12
              | (r1 = b64tab[asc.charAt(i++)]) << 6
              | (r2 = b64tab[asc.charAt(i++)]);
          bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
              : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                  : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
      }
      return bin;
  };
  /**
   * does what `window.atob` of web browsers do.
   * @param {String} asc Base64-encoded string
   * @returns {string} binary string
   */
  const _atob = _hasatob ? (asc) => atob(_tidyB64(asc))
      : _hasBuffer ? (asc) => Buffer.from(asc, 'base64').toString('binary')
          : atobPolyfill;
  //
  const _toUint8Array = _hasBuffer
      ? (a) => _U8Afrom(Buffer.from(a, 'base64'))
      : (a) => _U8Afrom(_atob(a), c => c.charCodeAt(0));
  //
  const _decode = _hasBuffer
      ? (a) => Buffer.from(a, 'base64').toString('utf8')
      : _TD
          ? (a) => _TD.decode(_toUint8Array(a))
          : (a) => btou(_atob(a));
  const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/'));
  /**
   * converts a Base64 string to a UTF-8 string.
   * @param {String} src Base64 string.  Both normal and URL-safe are supported
   * @returns {string} UTF-8 string
   */
  const decode = (src) => _decode(_unURI(src));

  var NakamaApi = (function () {
      function NakamaApi(configuration) {
          this.configuration = configuration;
      }
      NakamaApi.prototype.doFetch = function (urlPath, method, queryParams, body, options) {
          var _this = this;
          var urlQuery = "?" + Object.keys(queryParams)
              .map(function (k) {
              if (queryParams[k] instanceof Array) {
                  return queryParams[k].reduce(function (prev, curr) {
                      return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                  }, "");
              }
              else {
                  if (queryParams[k] != null) {
                      return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                  }
              }
          })
              .join("");
          var fetchOptions = __assign({ method: method }, options);
          fetchOptions.headers = __assign({}, options.headers);
          var descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");
          if (!(descriptor === null || descriptor === void 0 ? void 0 : descriptor.set)) {
              fetchOptions.credentials = 'cocos-ignore';
          }
          if (this.configuration.bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
          }
          else if (this.configuration.username) {
              fetchOptions.headers["Authorization"] = "Basic " + encode(this.configuration.username + ":" + this.configuration.password);
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
          fetchOptions.body = body;
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
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
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]);
      };
      NakamaApi.prototype.healthcheck = function (options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/healthcheck";
          var queryParams = {};
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.getAccount = function (options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/account";
          var queryParams = {};
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.updateAccount = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "PUT", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateApple = function (body, create, username, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/apple";
          var queryParams = {
              create: create,
              username: username,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateCustom = function (body, create, username, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/custom";
          var queryParams = {
              create: create,
              username: username,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateDevice = function (body, create, username, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/device";
          var queryParams = {
              create: create,
              username: username,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateEmail = function (body, create, username, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/email";
          var queryParams = {
              create: create,
              username: username,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateFacebook = function (body, create, username, sync, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/facebook";
          var queryParams = {
              create: create,
              username: username,
              sync: sync,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateFacebookInstantGame = function (body, create, username, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/facebookinstantgame";
          var queryParams = {
              create: create,
              username: username,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateGameCenter = function (body, create, username, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/gamecenter";
          var queryParams = {
              create: create,
              username: username,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateGoogle = function (body, create, username, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/google";
          var queryParams = {
              create: create,
              username: username,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.authenticateSteam = function (body, create, username, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/authenticate/steam";
          var queryParams = {
              create: create,
              username: username,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkApple = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/apple";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkCustom = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/custom";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkDevice = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/device";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkEmail = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/email";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkFacebook = function (body, sync, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/facebook";
          var queryParams = {
              sync: sync,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkFacebookInstantGame = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/facebookinstantgame";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkGameCenter = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/gamecenter";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkGoogle = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/google";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.linkSteam = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/link/steam";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.sessionRefresh = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/session/refresh";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkApple = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/apple";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkCustom = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/custom";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkDevice = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/device";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkEmail = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/email";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkFacebook = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/facebook";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkFacebookInstantGame = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/facebookinstantgame";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkGameCenter = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/gamecenter";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkGoogle = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/google";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.unlinkSteam = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/account/unlink/steam";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.listChannelMessages = function (channelId, limit, forward, cursor, options) {
          if (options === void 0) { options = {}; }
          if (channelId === null || channelId === undefined) {
              throw new Error("'channelId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/channel/{channelId}"
              .replace("{channelId}", encodeURIComponent(String(channelId)));
          var queryParams = {
              limit: limit,
              forward: forward,
              cursor: cursor,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.event = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/event";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.deleteFriends = function (ids, usernames, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/friend";
          var queryParams = {
              ids: ids,
              usernames: usernames,
          };
          var _body = null;
          return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
      };
      NakamaApi.prototype.listFriends = function (limit, state, cursor, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/friend";
          var queryParams = {
              limit: limit,
              state: state,
              cursor: cursor,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.addFriends = function (ids, usernames, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/friend";
          var queryParams = {
              ids: ids,
              usernames: usernames,
          };
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.blockFriends = function (ids, usernames, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/friend/block";
          var queryParams = {
              ids: ids,
              usernames: usernames,
          };
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.importFacebookFriends = function (body, reset, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/friend/facebook";
          var queryParams = {
              reset: reset,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.listGroups = function (name, cursor, limit, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/group";
          var queryParams = {
              name: name,
              cursor: cursor,
              limit: limit,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.createGroup = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.deleteGroup = function (groupId, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {};
          var _body = null;
          return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
      };
      NakamaApi.prototype.updateGroup = function (groupId, body, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "PUT", queryParams, _body, options);
      };
      NakamaApi.prototype.addGroupUsers = function (groupId, userIds, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/add"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {
              user_ids: userIds,
          };
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.banGroupUsers = function (groupId, userIds, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/ban"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {
              user_ids: userIds,
          };
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.demoteGroupUsers = function (groupId, userIds, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          if (userIds === null || userIds === undefined) {
              throw new Error("'userIds' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/demote"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {
              user_ids: userIds,
          };
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.joinGroup = function (groupId, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/join"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {};
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.kickGroupUsers = function (groupId, userIds, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/kick"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {
              user_ids: userIds,
          };
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.leaveGroup = function (groupId, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/leave"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {};
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.promoteGroupUsers = function (groupId, userIds, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/promote"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {
              user_ids: userIds,
          };
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.listGroupUsers = function (groupId, limit, state, cursor, options) {
          if (options === void 0) { options = {}; }
          if (groupId === null || groupId === undefined) {
              throw new Error("'groupId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/group/{groupId}/user"
              .replace("{groupId}", encodeURIComponent(String(groupId)));
          var queryParams = {
              limit: limit,
              state: state,
              cursor: cursor,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.deleteLeaderboardRecord = function (leaderboardId, options) {
          if (options === void 0) { options = {}; }
          if (leaderboardId === null || leaderboardId === undefined) {
              throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/leaderboard/{leaderboardId}"
              .replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
          var queryParams = {};
          var _body = null;
          return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
      };
      NakamaApi.prototype.listLeaderboardRecords = function (leaderboardId, ownerIds, limit, cursor, expiry, options) {
          if (options === void 0) { options = {}; }
          if (leaderboardId === null || leaderboardId === undefined) {
              throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/leaderboard/{leaderboardId}"
              .replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
          var queryParams = {
              ownerIds: ownerIds,
              limit: limit,
              cursor: cursor,
              expiry: expiry,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.writeLeaderboardRecord = function (leaderboardId, body, options) {
          if (options === void 0) { options = {}; }
          if (leaderboardId === null || leaderboardId === undefined) {
              throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/leaderboard/{leaderboardId}"
              .replace("{leaderboardId}", encodeURIComponent(String(leaderboardId)));
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.listLeaderboardRecordsAroundOwner = function (leaderboardId, ownerId, limit, expiry, options) {
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
          var queryParams = {
              limit: limit,
              expiry: expiry,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.listMatches = function (limit, authoritative, label, minSize, maxSize, query, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/match";
          var queryParams = {
              limit: limit,
              authoritative: authoritative,
              label: label,
              minSize: minSize,
              maxSize: maxSize,
              query: query,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.deleteNotifications = function (ids, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/notification";
          var queryParams = {
              ids: ids,
          };
          var _body = null;
          return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
      };
      NakamaApi.prototype.listNotifications = function (limit, cacheableCursor, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/notification";
          var queryParams = {
              limit: limit,
              cacheableCursor: cacheableCursor,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.rpcFunc2 = function (id, payload, httpKey, options) {
          if (options === void 0) { options = {}; }
          if (id === null || id === undefined) {
              throw new Error("'id' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/rpc/{id}"
              .replace("{id}", encodeURIComponent(String(id)));
          var queryParams = {
              payload: payload,
              httpKey: httpKey,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.rpcFunc = function (id, body, httpKey, options) {
          if (options === void 0) { options = {}; }
          if (id === null || id === undefined) {
              throw new Error("'id' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/rpc/{id}"
              .replace("{id}", encodeURIComponent(String(id)));
          var queryParams = {
              httpKey: httpKey,
          };
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.readStorageObjects = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.writeStorageObjects = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "PUT", queryParams, _body, options);
      };
      NakamaApi.prototype.deleteStorageObjects = function (body, options) {
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage/delete";
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "PUT", queryParams, _body, options);
      };
      NakamaApi.prototype.listStorageObjects = function (collection, userId, limit, cursor, options) {
          if (options === void 0) { options = {}; }
          if (collection === null || collection === undefined) {
              throw new Error("'collection' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/storage/{collection}"
              .replace("{collection}", encodeURIComponent(String(collection)));
          var queryParams = {
              userId: userId,
              limit: limit,
              cursor: cursor,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.listStorageObjects2 = function (collection, userId, limit, cursor, options) {
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
          var queryParams = {
              limit: limit,
              cursor: cursor,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.listTournaments = function (categoryStart, categoryEnd, startTime, endTime, limit, cursor, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/tournament";
          var queryParams = {
              categoryStart: categoryStart,
              categoryEnd: categoryEnd,
              startTime: startTime,
              endTime: endTime,
              limit: limit,
              cursor: cursor,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.listTournamentRecords = function (tournamentId, ownerIds, limit, cursor, expiry, options) {
          if (options === void 0) { options = {}; }
          if (tournamentId === null || tournamentId === undefined) {
              throw new Error("'tournamentId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/tournament/{tournamentId}"
              .replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
          var queryParams = {
              ownerIds: ownerIds,
              limit: limit,
              cursor: cursor,
              expiry: expiry,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.writeTournamentRecord = function (tournamentId, body, options) {
          if (options === void 0) { options = {}; }
          if (tournamentId === null || tournamentId === undefined) {
              throw new Error("'tournamentId' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/tournament/{tournamentId}"
              .replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
          var queryParams = {};
          var _body = null;
          _body = JSON.stringify(body || {});
          return this.doFetch(urlPath, "PUT", queryParams, _body, options);
      };
      NakamaApi.prototype.joinTournament = function (tournamentId, options) {
          if (options === void 0) { options = {}; }
          if (tournamentId === null || tournamentId === undefined) {
              throw new Error("'tournamentId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/tournament/{tournamentId}/join"
              .replace("{tournamentId}", encodeURIComponent(String(tournamentId)));
          var queryParams = {};
          var _body = null;
          return this.doFetch(urlPath, "POST", queryParams, _body, options);
      };
      NakamaApi.prototype.listTournamentRecordsAroundOwner = function (tournamentId, ownerId, limit, expiry, options) {
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
          var queryParams = {
              limit: limit,
              expiry: expiry,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.getUsers = function (ids, usernames, facebookIds, options) {
          if (options === void 0) { options = {}; }
          var urlPath = "/v2/user";
          var queryParams = {
              ids: ids,
              usernames: usernames,
              facebookIds: facebookIds,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      NakamaApi.prototype.listUserGroups = function (userId, limit, state, cursor, options) {
          if (options === void 0) { options = {}; }
          if (userId === null || userId === undefined) {
              throw new Error("'userId' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v2/user/{userId}/group"
              .replace("{userId}", encodeURIComponent(String(userId)));
          var queryParams = {
              limit: limit,
              state: state,
              cursor: cursor,
          };
          var _body = null;
          return this.doFetch(urlPath, "GET", queryParams, _body, options);
      };
      return NakamaApi;
  }());

  var Session = (function () {
      function Session(token, created_at, expires_at, username, user_id, vars) {
          this.token = token;
          this.created_at = created_at;
          this.expires_at = expires_at;
          this.username = username;
          this.user_id = user_id;
          this.vars = vars;
      }
      Session.prototype.isexpired = function (currenttime) {
          return (this.expires_at - currenttime) < 0;
      };
      Session.restore = function (jwt) {
          var createdAt = Math.floor(new Date().getTime() / 1000);
          var parts = jwt.split('.');
          if (parts.length != 3) {
              throw 'jwt is not valid.';
          }
          var decoded = JSON.parse(atob(parts[1]));
          var expiresAt = Math.floor(parseInt(decoded['exp']));
          return new Session(jwt, createdAt, expiresAt, decoded['usn'], decoded['uid'], decoded['vrs']);
      };
      return Session;
  }());

  var WebSocketAdapterText = (function () {
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
              msg.match_data_send.op_code = msg.match_data_send.op_code.toString();
          }
          else if (msg.party_data_send) {
              msg.party_data_send.op_code = msg.party_data_send.op_code.toString();
          }
          this._socket.send(JSON.stringify(msg));
      };
      return WebSocketAdapterText;
  }());

  function b64EncodeUnicode(str) {
      return encode(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_match, p1) {
          return String.fromCharCode(Number('0x' + p1));
      }));
  }
  function b64DecodeUnicode(str) {
      return decodeURIComponent(decode(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  }

  var DefaultSocket = (function () {
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
              if (message.cid == undefined) {
                  if (message.notifications) {
                      message.notifications.notifications.forEach(function (n) {
                          n.content = n.content ? JSON.parse(n.content) : undefined;
                          _this.onnotification(n);
                      });
                  }
                  else if (message.match_data) {
                      message.match_data.data = message.match_data.data != null ? JSON.parse(b64DecodeUnicode(message.match_data.data)) : null;
                      message.match_data.op_code = parseInt(message.match_data.op_code);
                      _this.onmatchdata(message.match_data);
                  }
                  else if (message.match_presence_event) {
                      _this.onmatchpresence(message.match_presence_event);
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
                      message.party_data.data = message.party_data.data != null ? JSON.parse(b64DecodeUnicode(message.party_data.data)) : null;
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
                      _this.onpartymatchmakermatched(message.party_matchmaker_ticket);
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
      DefaultSocket.prototype.onpartymatchmakermatched = function (partyMatched) {
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
          console.log("sending socket message " + JSON.stringify(untypedMessage));
          return new Promise(function (resolve, reject) {
              if (!_this.adapter.isConnected) {
                  reject("Socket connection has not been established yet.");
              }
              else {
                  if (untypedMessage.match_data_send) {
                      untypedMessage.match_data_send.data = b64EncodeUnicode(JSON.stringify(untypedMessage.match_data_send.data));
                      _this.adapter.send(untypedMessage);
                      resolve();
                  }
                  else if (untypedMessage.party_data_send) {
                      untypedMessage.party_data_send.data = b64EncodeUnicode(JSON.stringify(untypedMessage.party_data_send.data));
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
                      untypedMessage.cid = cid;
                      _this.adapter.send(untypedMessage);
                  }
              }
              if (_this.verbose && window && window.console) {
                  console.log("Sent message: %o", untypedMessage);
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
                      case 0: return [4, this.send({
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
                          return [2, response.matchmaker_ticket];
                  }
              });
          });
      };
      DefaultSocket.prototype.addMatchmakerParty = function (party_id, query, min_count, max_count, string_properties, numeric_properties) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({
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
                          return [2, response.party_matchmaker_ticket];
                  }
              });
          });
      };
      DefaultSocket.prototype.closeParty = function (party_id) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({ party_close: { party_id: party_id } })];
                      case 1: return [2, _a.sent()];
                  }
              });
          });
      };
      DefaultSocket.prototype.createMatch = function () {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({ match_create: {} })];
                      case 1:
                          response = _a.sent();
                          return [2, response.match];
                  }
              });
          });
      };
      DefaultSocket.prototype.createParty = function (open, max_size) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({ party_create: { open: open, max_size: max_size } })];
                      case 1:
                          response = _a.sent();
                          return [2, response.party_create];
                  }
              });
          });
      };
      DefaultSocket.prototype.followUsers = function (userIds) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({ status_follow: { user_ids: userIds } })];
                      case 1:
                          response = _a.sent();
                          return [2, response.status];
                  }
              });
          });
      };
      DefaultSocket.prototype.joinChat = function (target, type, persistence, hidden) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({
                              channel_join: {
                                  target: target,
                                  type: type,
                                  persistence: persistence,
                                  hidden: hidden
                              }
                          })];
                      case 1:
                          response = _a.sent();
                          return [2, response.channel];
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
                          return [4, this.send(join)];
                      case 1:
                          response = _a.sent();
                          return [2, response.match];
                  }
              });
          });
      };
      DefaultSocket.prototype.joinParty = function (party_id) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({ party_join: { party_id: party_id } })];
                      case 1: return [2, _a.sent()];
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
                      case 0: return [4, this.send({ party_join_request_list: { party_id: party_id } })];
                      case 1:
                          response = _a.sent();
                          return [2, response.party_join_request];
                  }
              });
          });
      };
      DefaultSocket.prototype.promotePartyMember = function (party_id, party_member) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({ party_promote: { party_id: party_id, presence: party_member } })];
                      case 1:
                          response = _a.sent();
                          return [2, response.party_leader];
                  }
              });
          });
      };
      DefaultSocket.prototype.removeChatMessage = function (channel_id, message_id) {
          return __awaiter(this, void 0, void 0, function () {
              var response;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4, this.send({
                              channel_message_remove: {
                                  channel_id: channel_id,
                                  message_id: message_id
                              }
                          })];
                      case 1:
                          response = _a.sent();
                          return [2, response.channel_message_ack];
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
                  return [2, this.send({ party_remove: {
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
                      case 0: return [4, this.send({
                              rpc: {
                                  id: id,
                                  payload: payload,
                                  http_key: http_key,
                              }
                          })];
                      case 1:
                          response = _a.sent();
                          return [2, response.rpc];
                  }
              });
          });
      };
      DefaultSocket.prototype.sendMatchState = function (matchId, opCode, data, presences) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2, this.send({
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
                      case 0: return [4, this.send({ channel_message_update: { channel_id: channel_id, message_id: message_id, content: content } })];
                      case 1:
                          response = _a.sent();
                          return [2, response.channel_message_ack];
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
                      case 0: return [4, this.send({ channel_message_send: { channel_id: channel_id, content: content } })];
                      case 1:
                          response = _a.sent();
                          return [2, response.channel_message_ack];
                  }
              });
          });
      };
      return DefaultSocket;
  }());

  var DEFAULT_HOST = "127.0.0.1";
  var DEFAULT_PORT = "7350";
  var DEFAULT_SERVER_KEY = "defaultkey";
  var DEFAULT_TIMEOUT_MS = 7000;
  var Client = (function () {
      function Client(serverkey, host, port, useSSL, timeout) {
          if (serverkey === void 0) { serverkey = DEFAULT_SERVER_KEY; }
          if (host === void 0) { host = DEFAULT_HOST; }
          if (port === void 0) { port = DEFAULT_PORT; }
          if (useSSL === void 0) { useSSL = false; }
          if (timeout === void 0) { timeout = DEFAULT_TIMEOUT_MS; }
          this.serverkey = serverkey;
          this.host = host;
          this.port = port;
          this.useSSL = useSSL;
          this.timeout = timeout;
          var scheme = (useSSL) ? "https://" : "http://";
          var basePath = "" + scheme + host + ":" + port;
          this.configuration = {
              basePath: basePath,
              username: serverkey,
              password: "",
              timeoutMs: timeout,
          };
          this.apiClient = new NakamaApi(this.configuration);
      }
      Client.prototype.addGroupUsers = function (session, groupId, ids) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.addGroupUsers(groupId, ids).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.addFriends = function (session, ids, usernames) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.addFriends(ids, usernames).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.authenticateApple = function (token, create, username, vars, options) {
          if (vars === void 0) { vars = new Map(); }
          if (options === void 0) { options = {}; }
          var request = {
              "token": token,
              "vars": vars
          };
          return this.apiClient.authenticateApple(request, create, username, options).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateCustom = function (id, create, username, vars, options) {
          if (vars === void 0) { vars = new Map(); }
          if (options === void 0) { options = {}; }
          var request = {
              "id": id,
              "vars": vars
          };
          return this.apiClient.authenticateCustom(request, create, username, options).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateDevice = function (id, create, username, vars) {
          var request = {
              "id": id,
              "vars": vars
          };
          return this.apiClient.authenticateDevice(request, create, username).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateEmail = function (email, password, create, username, vars) {
          var request = {
              "email": email,
              "password": password,
              "vars": vars
          };
          return this.apiClient.authenticateEmail(request, create, username).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateFacebookInstantGame = function (signedPlayerInfo, create, username, vars, options) {
          if (options === void 0) { options = {}; }
          var request = {
              "signed_player_info": signedPlayerInfo,
              "vars": vars
          };
          return this.apiClient.authenticateFacebookInstantGame({ signed_player_info: request.signed_player_info, vars: request.vars }, create, username, options).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateFacebook = function (token, create, username, sync, vars, options) {
          if (options === void 0) { options = {}; }
          var request = {
              "token": token,
              "vars": vars
          };
          return this.apiClient.authenticateFacebook(request, create, username, sync, options).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateGoogle = function (token, create, username, vars, options) {
          if (options === void 0) { options = {}; }
          var request = {
              "token": token,
              "vars": vars
          };
          return this.apiClient.authenticateGoogle(request, create, username, options).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateGameCenter = function (token, create, username, vars) {
          var request = {
              "token": token,
              "vars": vars
          };
          return this.apiClient.authenticateGameCenter(request, create, username).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateSteam = function (token, create, username, vars) {
          var request = {
              "token": token,
              "vars": vars
          };
          return this.apiClient.authenticateSteam(request, create, username).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.banGroupUsers = function (session, groupId, ids) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.banGroupUsers(groupId, ids).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.blockFriends = function (session, ids, usernames) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.blockFriends(ids, usernames).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.createGroup = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.createGroup(request).then(function (response) {
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
          });
      };
      Client.prototype.createSocket = function (useSSL, verbose, adapter) {
          if (useSSL === void 0) { useSSL = false; }
          if (verbose === void 0) { verbose = false; }
          if (adapter === void 0) { adapter = new WebSocketAdapterText(); }
          return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter);
      };
      Client.prototype.deleteFriends = function (session, ids, usernames) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.deleteFriends(ids, usernames).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.deleteGroup = function (session, groupId) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.deleteGroup(groupId).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.deleteNotifications = function (session, ids) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.deleteNotifications(ids).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.deleteStorageObjects = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.deleteStorageObjects(request).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.demoteGroupUsers = function (session, groupId, ids) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.demoteGroupUsers(groupId, ids);
      };
      Client.prototype.emitEvent = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.event(request).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.getAccount = function (session) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.getAccount();
      };
      Client.prototype.importFacebookFriends = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.importFacebookFriends(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.getUsers = function (session, ids, usernames, facebookIds) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.getUsers(ids, usernames, facebookIds).then(function (response) {
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
          });
      };
      Client.prototype.joinGroup = function (session, groupId) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.joinGroup(groupId, {}).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.joinTournament = function (session, tournamentId) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.joinTournament(tournamentId, {}).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.kickGroupUsers = function (session, groupId, ids) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.kickGroupUsers(groupId, ids).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.leaveGroup = function (session, groupId) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.leaveGroup(groupId, {}).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.listChannelMessages = function (session, channelId, limit, forward, cursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listChannelMessages(channelId, limit, forward, cursor).then(function (response) {
              var result = {
                  messages: [],
                  next_cursor: response.next_cursor,
                  prev_cursor: response.prev_cursor
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
          });
      };
      Client.prototype.listGroupUsers = function (session, groupId, state, limit, cursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listGroupUsers(groupId, limit, state, cursor).then(function (response) {
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
          });
      };
      Client.prototype.listUserGroups = function (session, userId, state, limit, cursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listUserGroups(userId, state, limit, cursor).then(function (response) {
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
          });
      };
      Client.prototype.listGroups = function (session, name, cursor, limit) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listGroups(name, cursor, limit).then(function (response) {
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
          });
      };
      Client.prototype.linkApple = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkApple(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.linkCustom = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkCustom(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.linkDevice = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkDevice(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.linkEmail = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkEmail(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.linkFacebook = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkFacebook(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.linkFacebookInstantGame = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkFacebookInstantGame(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.linkGoogle = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkGoogle(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.linkGameCenter = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkGameCenter(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.linkSteam = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.linkSteam(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.listFriends = function (session, state, limit, cursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listFriends(limit, state, cursor).then(function (response) {
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
          });
      };
      Client.prototype.listLeaderboardRecords = function (session, leaderboardId, ownerIds, limit, cursor, expiry) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listLeaderboardRecords(leaderboardId, ownerIds, limit, cursor, expiry).then(function (response) {
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
          });
      };
      Client.prototype.listLeaderboardRecordsAroundOwner = function (session, leaderboardId, ownerId, limit, expiry) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listLeaderboardRecordsAroundOwner(leaderboardId, ownerId, limit, expiry).then(function (response) {
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
          });
      };
      Client.prototype.listMatches = function (session, limit, authoritative, label, minSize, maxSize, query) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listMatches(limit, authoritative, label, minSize, maxSize, query);
      };
      Client.prototype.listNotifications = function (session, limit, cacheableCursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listNotifications(limit, cacheableCursor).then(function (response) {
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
          });
      };
      Client.prototype.listStorageObjects = function (session, collection, userId, limit, cursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listStorageObjects(collection, userId, limit, cursor).then(function (response) {
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
          });
      };
      Client.prototype.listTournaments = function (session, categoryStart, categoryEnd, startTime, endTime, limit, cursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listTournaments(categoryStart, categoryEnd, startTime, endTime, limit, cursor).then(function (response) {
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
          });
      };
      Client.prototype.listTournamentRecords = function (session, tournamentId, ownerIds, limit, cursor, expiry) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listTournamentRecords(tournamentId, ownerIds, limit, cursor, expiry).then(function (response) {
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
          });
      };
      Client.prototype.listTournamentRecordsAroundOwner = function (session, tournamentId, ownerId, limit, expiry) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listTournamentRecordsAroundOwner(tournamentId, ownerId, limit, expiry).then(function (response) {
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
          });
      };
      Client.prototype.promoteGroupUsers = function (session, groupId, ids) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.promoteGroupUsers(groupId, ids);
      };
      Client.prototype.readStorageObjects = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.readStorageObjects(request).then(function (response) {
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
          });
      };
      Client.prototype.rpc = function (session, id, input) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.rpcFunc(id, JSON.stringify(input)).then(function (response) {
              return Promise.resolve({
                  id: response.id,
                  payload: (!response.payload) ? undefined : JSON.parse(response.payload)
              });
          });
      };
      Client.prototype.rpcGet = function (id, session, httpKey, input) {
          var _this = this;
          if (!httpKey || httpKey == "") {
              this.configuration.bearerToken = (session && session.token);
          }
          else {
              this.configuration.username = undefined;
              this.configuration.bearerToken = undefined;
          }
          return this.apiClient.rpcFunc2(id, input && JSON.stringify(input) || "", httpKey)
              .then(function (response) {
              _this.configuration.username = _this.serverkey;
              return Promise.resolve({
                  id: response.id,
                  payload: (!response.payload) ? undefined : JSON.parse(response.payload)
              });
          }).catch(function (err) {
              _this.configuration.username = _this.serverkey;
              throw err;
          });
      };
      Client.prototype.unlinkApple = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkApple(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.unlinkCustom = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkCustom(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.unlinkDevice = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkDevice(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.unlinkEmail = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkEmail(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.unlinkFacebook = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkFacebook(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.unlinkFacebookInstantGame = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkFacebookInstantGame(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.unlinkGoogle = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkGoogle(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.unlinkGameCenter = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkGameCenter(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.unlinkSteam = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.unlinkSteam(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.updateAccount = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.updateAccount(request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.updateGroup = function (session, groupId, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.updateGroup(groupId, request).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.writeLeaderboardRecord = function (session, leaderboardId, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.writeLeaderboardRecord(leaderboardId, {
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
          });
      };
      Client.prototype.writeStorageObjects = function (session, objects) {
          this.configuration.bearerToken = (session && session.token);
          var request = { objects: [] };
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
          return this.apiClient.writeStorageObjects(request);
      };
      Client.prototype.writeTournamentRecord = function (session, tournamentId, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.writeTournamentRecord(tournamentId, {
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
