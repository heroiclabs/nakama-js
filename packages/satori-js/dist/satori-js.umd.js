(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.satorijs = {}));
})(this, (function (exports) { 'use strict';

  var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global);

  var support = {
    searchParams: 'URLSearchParams' in global,
    iterable: 'Symbol' in global && 'iterator' in Symbol,
    blob:
      'FileReader' in global &&
      'Blob' in global &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in global,
    arrayBuffer: 'ArrayBuffer' in global
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

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

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
      throw new TypeError('Invalid character in header field name: "' + name + '"')
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
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
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
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
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
      /*
        fetch-mock wraps the Response object in an ES6 Proxy to
        provide useful test harness features such as flush. However, on
        ES5 browsers without fetch or Proxy support pollyfills must be used;
        the proxy-pollyfill is unable to proxy an attribute unless it exists
        on the object before the Proxy is created. This change ensures
        Response.bodyUsed exists on the instance, while maintaining the
        semantic of setting Request.bodyUsed in the constructor before
        _initBody is called.
      */
      this.bodyUsed = this.bodyUsed;
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
        this._bodyText = body = Object.prototype.toString.call(body);
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
          var isConsumed = consumed(this);
          if (isConsumed) {
            return isConsumed
          }
          if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            )
          } else {
            return Promise.resolve(this._bodyArrayBuffer)
          }
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
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    }

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
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);

    if (this.method === 'GET' || this.method === 'HEAD') {
      if (options.cache === 'no-store' || options.cache === 'no-cache') {
        // Search for a '_' parameter in the query string
        var reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
        } else {
          // Otherwise add a new '_' parameter to the end with the current time
          var reQueryString = /\?/;
          this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
        }
      }
    }
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
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
    // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
    // https://github.com/github/fetch/issues/748
    // https://github.com/zloirock/core-js/issues/751
    preProcessedHeaders
      .split('\r')
      .map(function(header) {
        return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
      })
      .forEach(function(line) {
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
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    }
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
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

  function fetch$1(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        setTimeout(function() {
          resolve(new Response(body, options));
        }, 0);
      };

      xhr.onerror = function() {
        setTimeout(function() {
          reject(new TypeError('Network request failed'));
        }, 0);
      };

      xhr.ontimeout = function() {
        setTimeout(function() {
          reject(new TypeError('Network request failed'));
        }, 0);
      };

      xhr.onabort = function() {
        setTimeout(function() {
          reject(new DOMException('Aborted', 'AbortError'));
        }, 0);
      };

      function fixUrl(url) {
        try {
          return url === '' && global.location.href ? global.location.href : url
        } catch (e) {
          return url
        }
      }

      xhr.open(request.method, fixUrl(request.url), true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr) {
        if (support.blob) {
          xhr.responseType = 'blob';
        } else if (
          support.arrayBuffer &&
          request.headers.get('Content-Type') &&
          request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
        ) {
          xhr.responseType = 'arraybuffer';
        }
      }

      if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
        Object.getOwnPropertyNames(init.headers).forEach(function(name) {
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
        });
      } else {
        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value);
        });
      }

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch$1.polyfill = true;

  if (!global.fetch) {
    global.fetch = fetch$1;
    global.Headers = Headers;
    global.Request = Request;
    global.Response = Response;
  }

  /******************************************************************************
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
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
  const _hasatob = typeof atob === 'function';
  const _hasbtoa = typeof btoa === 'function';
  const _hasBuffer = typeof Buffer === 'function';
  typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
  const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
  const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const b64chs = Array.prototype.slice.call(b64ch);
  const b64tab = ((a) => {
      let tab = {};
      a.forEach((c, i) => tab[c] = i);
      return tab;
  })(b64chs);
  const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  const _fromCC = String.fromCharCode.bind(String);
  typeof Uint8Array.from === 'function'
      ? Uint8Array.from.bind(Uint8Array)
      : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  const _mkUriSafe = (src) => src
      .replace(/=/g, '').replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_');
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
  var SatoriApi = /** @class */ (function () {
      function SatoriApi(apiKey, basePath, timeoutMs) {
          this.apiKey = apiKey;
          this.basePath = basePath;
          this.timeoutMs = timeoutMs;
      }
      /** A healthcheck which load balancers can use to check the service. */
      SatoriApi.prototype.satoriHealthcheck = function (bearerToken, options) {
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
      /** A readycheck which load balancers can use to check the service. */
      SatoriApi.prototype.satoriReadycheck = function (bearerToken, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/readycheck";
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
      /** Authenticate against the server. */
      SatoriApi.prototype.satoriAuthenticate = function (basicAuthUsername, basicAuthPassword, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v1/authenticate";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (basicAuthUsername) {
              fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      SatoriApi.prototype.satoriAuthenticateLogout = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v1/authenticate/logout";
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
      SatoriApi.prototype.satoriAuthenticateRefresh = function (basicAuthUsername, basicAuthPassword, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v1/authenticate/refresh";
          var queryParams = new Map();
          var bodyJson = "";
          bodyJson = JSON.stringify(body || {});
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("POST", options, bodyJson);
          if (basicAuthUsername) {
              fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      /** Publish an event for this session. */
      SatoriApi.prototype.satoriEvent = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v1/event";
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
      /** Get or list all available experiments for this identity. */
      SatoriApi.prototype.satoriGetExperiments = function (bearerToken, names, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v1/experiment";
          var queryParams = new Map();
          queryParams.set("names", names);
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
      /** List all available flags for this identity. */
      SatoriApi.prototype.satoriGetFlags = function (bearerToken, basicAuthUsername, basicAuthPassword, names, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v1/flag";
          var queryParams = new Map();
          queryParams.set("names", names);
          var bodyJson = "";
          var fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
          var fetchOptions = buildFetchOptions("GET", options, bodyJson);
          if (bearerToken) {
              fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
          }
          if (basicAuthUsername) {
              fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);
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
      /** Enrich/replace the current session with new identifier. */
      SatoriApi.prototype.satoriIdentify = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v1/identify";
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
      /** Delete the caller's identity and associated data. */
      SatoriApi.prototype.satoriDeleteIdentity = function (bearerToken, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v1/identity";
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
      /** List available live events. */
      SatoriApi.prototype.satoriGetLiveEvents = function (bearerToken, names, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v1/live-event";
          var queryParams = new Map();
          queryParams.set("names", names);
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
      /** Get the list of messages for the identity. */
      SatoriApi.prototype.satoriGetMessageList = function (bearerToken, limit, forward, cursor, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v1/message";
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
      /** Deletes a message for an identity. */
      SatoriApi.prototype.satoriDeleteMessage = function (bearerToken, id, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (id === null || id === undefined) {
              throw new Error("'id' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v1/message/{id}"
              .replace("{id}", encodeURIComponent(String(id)));
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
      /** Updates a message for an identity. */
      SatoriApi.prototype.satoriUpdateMessage = function (bearerToken, id, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (id === null || id === undefined) {
              throw new Error("'id' is a required parameter but is null or undefined.");
          }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v1/message/{id}"
              .replace("{id}", encodeURIComponent(String(id)));
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
      /** List properties associated with this identity. */
      SatoriApi.prototype.satoriListProperties = function (bearerToken, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          var urlPath = "/v1/properties";
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
      /** Update identity properties. */
      SatoriApi.prototype.satoriUpdateProperties = function (bearerToken, body, options) {
          var _this = this;
          if (options === void 0) { options = {}; }
          if (body === null || body === undefined) {
              throw new Error("'body' is a required parameter but is null or undefined.");
          }
          var urlPath = "/v1/properties";
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
      SatoriApi.prototype.buildFullUrl = function (basePath, fragment, queryParams) {
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
      return SatoriApi;
  }());

  /**
   * Copyright 2022 The Nakama Authors
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
      function Session(token, refresh_token) {
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
          var tokenDecoded = JSON.parse(_atob(tokenParts[1]));
          var tokenExpiresAt = Math.floor(parseInt(tokenDecoded['exp']));
          /** clients that have just updated to the refresh tokens */
          /** client release will not have a cached refresh token */
          if (refreshToken) {
              var refreshTokenParts = refreshToken.split('.');
              if (refreshTokenParts.length != 3) {
                  throw 'refresh jwt is not valid.';
              }
              var refreshTokenDecoded = JSON.parse(_atob(refreshTokenParts[1]));
              var refreshTokenExpiresAt = Math.floor(parseInt(refreshTokenDecoded['exp']));
              this.refresh_expires_at = refreshTokenExpiresAt;
              this.refresh_token = refreshToken;
          }
          this.token = token;
          this.expires_at = tokenExpiresAt;
          this.user_id = tokenDecoded['uid'];
          this.vars = tokenDecoded['vrs'];
      };
      Session.restore = function (token, refreshToken) {
          return new Session(token, refreshToken);
      };
      return Session;
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
  var DEFAULT_PORT = "7450";
  var DEFAULT_API_KEY = "defaultkey";
  var DEFAULT_TIMEOUT_MS = 7000;
  var DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;
  /** A client for Satori server. */
  var Client = /** @class */ (function () {
      function Client(apiKey, host, port, useSSL, timeout, autoRefreshSession) {
          if (apiKey === void 0) { apiKey = DEFAULT_API_KEY; }
          if (host === void 0) { host = DEFAULT_HOST; }
          if (port === void 0) { port = DEFAULT_PORT; }
          if (useSSL === void 0) { useSSL = false; }
          if (timeout === void 0) { timeout = DEFAULT_TIMEOUT_MS; }
          if (autoRefreshSession === void 0) { autoRefreshSession = true; }
          this.apiKey = apiKey;
          this.host = host;
          this.port = port;
          this.useSSL = useSSL;
          this.timeout = timeout;
          this.autoRefreshSession = autoRefreshSession;
          /** The expired timespan used to check session lifetime. */
          this.expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;
          var scheme = (useSSL) ? "https://" : "http://";
          var basePath = "".concat(scheme).concat(host, ":").concat(port);
          this.apiClient = new SatoriApi(apiKey, basePath, timeout);
      }
      /** Authenticate a user with an ID against the server. */
      Client.prototype.authenticate = function (id, customProperties, defaultProperties) {
          return __awaiter(this, void 0, void 0, function () {
              var request;
              return __generator(this, function (_a) {
                  request = {
                      "id": id,
                      custom: customProperties,
                      default: defaultProperties
                  };
                  return [2 /*return*/, this.apiClient.satoriAuthenticate(this.apiKey, "", request).then(function (apiSession) {
                          return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
                      })];
              });
          });
      };
      /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
      Client.prototype.sessionRefresh = function (session) {
          return __awaiter(this, void 0, void 0, function () {
              var request;
              return __generator(this, function (_a) {
                  request = {
                      "refresh_token": session.refresh_token,
                  };
                  return [2 /*return*/, this.apiClient.satoriAuthenticateRefresh(this.apiKey, "", request).then(function (apiSession) {
                          return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
                      })];
              });
          });
      };
      /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
      Client.prototype.logout = function (session) {
          return __awaiter(this, void 0, void 0, function () {
              var request;
              return __generator(this, function (_a) {
                  request = {
                      "token": session.token,
                      "refresh_token": session.refresh_token
                  };
                  return [2 /*return*/, this.apiClient.satoriAuthenticateLogout(session.token, request).then(function (response) {
                          return Promise.resolve(response !== undefined);
                      })];
              });
          });
      };
      /** Publish an event for this session. */
      Client.prototype.event = function (session, event) {
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
                          request = {
                              events: [event]
                          };
                          return [2 /*return*/, this.apiClient.satoriEvent(session.token, request).then(function (response) {
                                  return Promise.resolve(response !== undefined);
                              })];
                  }
              });
          });
      };
      /** Publish multiple events for this session */
      Client.prototype.events = function (session, events) {
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
                          request = {
                              events: events
                          };
                          return [2 /*return*/, this.apiClient.satoriEvent(session.token, request).then(function (response) {
                                  return Promise.resolve(response !== undefined);
                              })];
                  }
              });
          });
      };
      /** Get or list all available experiments for this identity. */
      Client.prototype.getExperiments = function (session, names) {
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
                      case 2: return [2 /*return*/, this.apiClient.satoriGetExperiments(session.token, names)];
                  }
              });
          });
      };
      /** Get a single flag for this identity. Throws an error when the flag does not exist. */
      Client.prototype.getFlag = function (session, name) {
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
                      case 2: return [2 /*return*/, this.apiClient.satoriGetFlags(session.token, "", "", [name]).then(function (flagList) {
                              var _a;
                              var flag = null;
                              (_a = flagList.flags) === null || _a === void 0 ? void 0 : _a.forEach(function (f) {
                                  if (f.name === name) {
                                      flag = f;
                                  }
                              });
                              if (flag === null) {
                                  return Promise.reject("Flag does not exist.");
                              }
                              return Promise.resolve(flag);
                          })];
                  }
              });
          });
      };
      /** Get a single flag for this identity. */
      Client.prototype.getFlagWithFallback = function (session, name, fallbackValue) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, this.getFlag(session, name)
                          .then(function (flag) {
                          return flag;
                      })
                          .catch(function () {
                          var flag = {
                              name: name,
                              value: fallbackValue
                          };
                          return Promise.resolve(flag);
                      })];
              });
          });
      };
      /** Get a single flag with its configured default value. Throws an error when the flag does not exist. */
      Client.prototype.getFlagDefault = function (name) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, this.apiClient.satoriGetFlags("", this.apiKey, "", [name]).then(function (flagList) {
                          var _a;
                          var flag = null;
                          (_a = flagList.flags) === null || _a === void 0 ? void 0 : _a.forEach(function (f) {
                              if (f.name === name) {
                                  flag = f;
                              }
                          });
                          if (flag === null) {
                              return Promise.reject("Flag does not exist.");
                          }
                          return Promise.resolve(flag);
                      })];
              });
          });
      };
      /** Get a single flag with its configured default value.  */
      Client.prototype.getFlagDefaultWithFallback = function (name, fallbackValue) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, this.getFlagDefault(name)
                          .then(function (flag) {
                          return flag;
                      })
                          .catch(function () {
                          var flag = {
                              name: name,
                              value: fallbackValue
                          };
                          return Promise.resolve(flag);
                      })];
              });
          });
      };
      /** List all available flags for this identity. */
      Client.prototype.getFlags = function (session, names) {
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
                      case 2: return [2 /*return*/, this.apiClient.satoriGetFlags(session.token, "", "", names)];
                  }
              });
          });
      };
      /** List all available default flags. */
      Client.prototype.getFlagsDefault = function (names) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, this.apiClient.satoriGetFlags("", this.apiKey, "", names)];
              });
          });
      };
      /** Enrich/replace the current session with new identifier. */
      Client.prototype.identify = function (session, id, defaultProperties, customProperties) {
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
                          request = {
                              id: id,
                              default: defaultProperties,
                              custom: customProperties
                          };
                          return [2 /*return*/, this.apiClient.satoriIdentify(session.token, request).then(function (apiSession) {
                                  return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
                              })];
                  }
              });
          });
      };
      /** List available live events. */
      Client.prototype.getLiveEvents = function (session, names) {
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
                      case 2: return [2 /*return*/, this.apiClient.satoriGetLiveEvents(session.token, names)];
                  }
              });
          });
      };
      /** List properties associated with this identity. */
      Client.prototype.listProperties = function (session) {
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
                      case 2: return [2 /*return*/, this.apiClient.satoriListProperties(session.token)];
                  }
              });
          });
      };
      /** Update identity properties. */
      Client.prototype.updateProperties = function (session, defaultProperties, customProperties, recompute) {
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
                          request = {
                              default: defaultProperties,
                              custom: customProperties,
                              recompute: recompute,
                          };
                          return [2 /*return*/, this.apiClient.satoriUpdateProperties(session.token, request).then(function (response) {
                                  return Promise.resolve(response !== undefined);
                              })];
                  }
              });
          });
      };
      /** Delete the caller's identity and associated data. */
      Client.prototype.deleteIdentity = function (session) {
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
                      case 2: return [2 /*return*/, this.apiClient.satoriDeleteIdentity(session.token).then(function (response) {
                              return Promise.resolve(response !== undefined);
                          })];
                  }
              });
          });
      };
      Client.prototype.getMessageList = function (session) {
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
                      case 2: return [2 /*return*/, this.apiClient.satoriGetMessageList(session.token).then(function (response) {
                              return Promise.resolve(response !== undefined);
                          })];
                  }
              });
          });
      };
      Client.prototype.deleteMessage = function (session, id) {
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
                      case 2: return [2 /*return*/, this.apiClient.satoriDeleteMessage(session.token, id).then(function (response) {
                              return Promise.resolve(response !== undefined);
                          })];
                  }
              });
          });
      };
      Client.prototype.updateMessage = function (session, id, consume_time, read_time) {
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
                          request = {
                              id: id,
                              consume_time: consume_time,
                              read_time: read_time
                          };
                          return [2 /*return*/, this.apiClient.satoriUpdateMessage(session.token, id, request).then(function (response) {
                                  return Promise.resolve(response !== undefined);
                              })];
                  }
              });
          });
      };
      return Client;
  }());

  exports.Client = Client;
  exports.Session = Session;

}));
