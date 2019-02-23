(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.nakamajs = {})));
}(this, (function (exports) { 'use strict';

  (function () {

    var object =
      typeof exports != 'undefined' ? exports :
      typeof self != 'undefined' ? self : // #8: web workers
      $.global; // #31: ExtendScript

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    function InvalidCharacterError(message) {
      this.message = message;
    }
    InvalidCharacterError.prototype = new Error;
    InvalidCharacterError.prototype.name = 'InvalidCharacterError';

    // encoder
    // [https://gist.github.com/999166] by [https://github.com/nignag]
    object.btoa || (
    object.btoa = function (input) {
      var str = String(input);
      for (
        // initialize result and counter
        var block, charCode, idx = 0, map = chars, output = '';
        // if the next str index does not exist:
        //   change the mapping table to "="
        //   check if d has no fractional digits
        str.charAt(idx | 0) || (map = '=', idx % 1);
        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)
      ) {
        charCode = str.charCodeAt(idx += 3/4);
        if (charCode > 0xFF) {
          throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
      }
      return output;
    });

    // decoder
    // [https://gist.github.com/1020396] by [https://github.com/atk]
    object.atob || (
    object.atob = function (input) {
      var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
      if (str.length % 4 == 1) {
        throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
      }
      for (
        // initialize result and counters
        var bc = 0, bs, buffer, idx = 0, output = '';
        // get next character
        buffer = str.charAt(idx++);
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
          // and if not first of each 4 characters,
          // convert the first 8 bits to one ascii character
          bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
      ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
      }
      return output;
    });

  }());

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
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
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

  var BASE_PATH = "http://127.0.0.1:80";
  var NakamaApi = function (configuration) {
      if (configuration === void 0) { configuration = {
          basePath: BASE_PATH,
          bearerToken: "",
          password: "",
          username: "",
          timeoutMs: 5000,
      }; }
      return {
          doFetch: function (urlPath, method, queryParams, body, options) {
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
              var headers = {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
              };
              if (configuration.bearerToken) {
                  headers["Authorization"] = "Bearer " + configuration.bearerToken;
              }
              else if (configuration.username) {
                  headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
              }
              fetchOptions.headers = __assign({}, headers, options.headers);
              fetchOptions.body = body;
              return Promise.race([
                  fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                      if (response.status >= 200 && response.status < 300) {
                          return response.json();
                      }
                      else {
                          throw response;
                      }
                  }),
                  new Promise(function (_, reject) {
                      return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                  }),
              ]);
          },
          healthcheck: function (options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/healthcheck";
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          getAccount: function (options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/account";
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          updateAccount: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "PUT", queryParams, _body, options);
          },
          authenticateCustom: function (body, create, username, options) {
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
          },
          authenticateDevice: function (body, create, username, options) {
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
          },
          authenticateEmail: function (body, create, username, options) {
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
          },
          authenticateFacebook: function (body, create, username, sync, options) {
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
          },
          authenticateGameCenter: function (body, create, username, options) {
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
          },
          authenticateGoogle: function (body, create, username, options) {
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
          },
          authenticateSteam: function (body, create, username, options) {
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
          },
          linkCustom: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/link/custom";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          linkDevice: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/link/device";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          linkEmail: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/link/email";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          linkFacebook: function (body, sync, options) {
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
          },
          linkGameCenter: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/link/gamecenter";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          linkGoogle: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/link/google";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          linkSteam: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/link/steam";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          unlinkCustom: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/unlink/custom";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          unlinkDevice: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/unlink/device";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          unlinkEmail: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/unlink/email";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          unlinkFacebook: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/unlink/facebook";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          unlinkGameCenter: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/unlink/gamecenter";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          unlinkGoogle: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/unlink/google";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          unlinkSteam: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/account/unlink/steam";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          listChannelMessages: function (channelId, limit, forward, cursor, options) {
              if (options === void 0) { options = {}; }
              if (channelId === null || channelId === undefined) {
                  throw new Error("'channelId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/channel/{channel_id}"
                  .replace("{channel_id}", encodeURIComponent(String(channelId)));
              var queryParams = {
                  limit: limit,
                  forward: forward,
                  cursor: cursor,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          deleteFriends: function (ids, usernames, options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/friend";
              var queryParams = {
                  ids: ids,
                  usernames: usernames,
              };
              var _body = null;
              return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
          },
          listFriends: function (options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/friend";
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          addFriends: function (options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/friend";
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          blockFriends: function (options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/friend/block";
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          importFacebookFriends: function (body, reset, options) {
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
          },
          listGroups: function (name, cursor, limit, options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/group";
              var queryParams = {
                  name: name,
                  cursor: cursor,
                  limit: limit,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          createGroup: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          deleteGroup: function (groupId, options) {
              if (options === void 0) { options = {}; }
              if (groupId === null || groupId === undefined) {
                  throw new Error("'groupId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group/{group_id}"
                  .replace("{group_id}", encodeURIComponent(String(groupId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
          },
          updateGroup: function (groupId, body, options) {
              if (options === void 0) { options = {}; }
              if (groupId === null || groupId === undefined) {
                  throw new Error("'groupId' is a required parameter but is null or undefined.");
              }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group/{group_id}"
                  .replace("{group_id}", encodeURIComponent(String(groupId)));
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "PUT", queryParams, _body, options);
          },
          addGroupUsers: function (groupId, options) {
              if (options === void 0) { options = {}; }
              if (groupId === null || groupId === undefined) {
                  throw new Error("'groupId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group/{group_id}/add"
                  .replace("{group_id}", encodeURIComponent(String(groupId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          joinGroup: function (groupId, options) {
              if (options === void 0) { options = {}; }
              if (groupId === null || groupId === undefined) {
                  throw new Error("'groupId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group/{group_id}/join"
                  .replace("{group_id}", encodeURIComponent(String(groupId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          kickGroupUsers: function (groupId, options) {
              if (options === void 0) { options = {}; }
              if (groupId === null || groupId === undefined) {
                  throw new Error("'groupId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group/{group_id}/kick"
                  .replace("{group_id}", encodeURIComponent(String(groupId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          leaveGroup: function (groupId, options) {
              if (options === void 0) { options = {}; }
              if (groupId === null || groupId === undefined) {
                  throw new Error("'groupId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group/{group_id}/leave"
                  .replace("{group_id}", encodeURIComponent(String(groupId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          promoteGroupUsers: function (groupId, options) {
              if (options === void 0) { options = {}; }
              if (groupId === null || groupId === undefined) {
                  throw new Error("'groupId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group/{group_id}/promote"
                  .replace("{group_id}", encodeURIComponent(String(groupId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          listGroupUsers: function (groupId, options) {
              if (options === void 0) { options = {}; }
              if (groupId === null || groupId === undefined) {
                  throw new Error("'groupId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/group/{group_id}/user"
                  .replace("{group_id}", encodeURIComponent(String(groupId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          deleteLeaderboardRecord: function (leaderboardId, options) {
              if (options === void 0) { options = {}; }
              if (leaderboardId === null || leaderboardId === undefined) {
                  throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/leaderboard/{leaderboard_id}"
                  .replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
          },
          listLeaderboardRecords: function (leaderboardId, ownerIds, limit, cursor, options) {
              if (options === void 0) { options = {}; }
              if (leaderboardId === null || leaderboardId === undefined) {
                  throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/leaderboard/{leaderboard_id}"
                  .replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
              var queryParams = {
                  owner_ids: ownerIds,
                  limit: limit,
                  cursor: cursor,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          writeLeaderboardRecord: function (leaderboardId, body, options) {
              if (options === void 0) { options = {}; }
              if (leaderboardId === null || leaderboardId === undefined) {
                  throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
              }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/leaderboard/{leaderboard_id}"
                  .replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          listLeaderboardRecordsAroundOwner: function (leaderboardId, ownerId, limit, options) {
              if (options === void 0) { options = {}; }
              if (leaderboardId === null || leaderboardId === undefined) {
                  throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
              }
              if (ownerId === null || ownerId === undefined) {
                  throw new Error("'ownerId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/leaderboard/{leaderboard_id}/owner/{owner_id}"
                  .replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)))
                  .replace("{owner_id}", encodeURIComponent(String(ownerId)));
              var queryParams = {
                  limit: limit,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          listMatches: function (limit, authoritative, label, minSize, maxSize, query, options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/match";
              var queryParams = {
                  limit: limit,
                  authoritative: authoritative,
                  label: label,
                  min_size: minSize,
                  max_size: maxSize,
                  query: query,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          deleteNotifications: function (ids, options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/notification";
              var queryParams = {
                  ids: ids,
              };
              var _body = null;
              return this.doFetch(urlPath, "DELETE", queryParams, _body, options);
          },
          listNotifications: function (limit, cacheableCursor, options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/notification";
              var queryParams = {
                  limit: limit,
                  cacheable_cursor: cacheableCursor,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          rpcFunc2: function (id, payload, httpKey, options) {
              if (options === void 0) { options = {}; }
              if (id === null || id === undefined) {
                  throw new Error("'id' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/rpc/{id}"
                  .replace("{id}", encodeURIComponent(String(id)));
              var queryParams = {
                  payload: payload,
                  http_key: httpKey,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          rpcFunc: function (id, body, options) {
              if (options === void 0) { options = {}; }
              if (id === null || id === undefined) {
                  throw new Error("'id' is a required parameter but is null or undefined.");
              }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/rpc/{id}"
                  .replace("{id}", encodeURIComponent(String(id)));
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          readStorageObjects: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/storage";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          writeStorageObjects: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/storage";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "PUT", queryParams, _body, options);
          },
          deleteStorageObjects: function (body, options) {
              if (options === void 0) { options = {}; }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/storage/delete";
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "PUT", queryParams, _body, options);
          },
          listStorageObjects: function (collection, userId, limit, cursor, options) {
              if (options === void 0) { options = {}; }
              if (collection === null || collection === undefined) {
                  throw new Error("'collection' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/storage/{collection}"
                  .replace("{collection}", encodeURIComponent(String(collection)));
              var queryParams = {
                  user_id: userId,
                  limit: limit,
                  cursor: cursor,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          listStorageObjects2: function (collection, userId, limit, cursor, options) {
              if (options === void 0) { options = {}; }
              if (collection === null || collection === undefined) {
                  throw new Error("'collection' is a required parameter but is null or undefined.");
              }
              if (userId === null || userId === undefined) {
                  throw new Error("'userId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/storage/{collection}/{user_id}"
                  .replace("{collection}", encodeURIComponent(String(collection)))
                  .replace("{user_id}", encodeURIComponent(String(userId)));
              var queryParams = {
                  limit: limit,
                  cursor: cursor,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          listTournaments: function (categoryStart, categoryEnd, startTime, endTime, limit, cursor, options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/tournament";
              var queryParams = {
                  category_start: categoryStart,
                  category_end: categoryEnd,
                  start_time: startTime,
                  end_time: endTime,
                  limit: limit,
                  cursor: cursor,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          listTournamentRecords: function (tournamentId, ownerIds, limit, cursor, options) {
              if (options === void 0) { options = {}; }
              if (tournamentId === null || tournamentId === undefined) {
                  throw new Error("'tournamentId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/tournament/{tournament_id}"
                  .replace("{tournament_id}", encodeURIComponent(String(tournamentId)));
              var queryParams = {
                  owner_ids: ownerIds,
                  limit: limit,
                  cursor: cursor,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          writeTournamentRecord: function (tournamentId, body, options) {
              if (options === void 0) { options = {}; }
              if (tournamentId === null || tournamentId === undefined) {
                  throw new Error("'tournamentId' is a required parameter but is null or undefined.");
              }
              if (body === null || body === undefined) {
                  throw new Error("'body' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/tournament/{tournament_id}"
                  .replace("{tournament_id}", encodeURIComponent(String(tournamentId)));
              var queryParams = {};
              var _body = null;
              _body = JSON.stringify(body || {});
              return this.doFetch(urlPath, "PUT", queryParams, _body, options);
          },
          joinTournament: function (tournamentId, options) {
              if (options === void 0) { options = {}; }
              if (tournamentId === null || tournamentId === undefined) {
                  throw new Error("'tournamentId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/tournament/{tournament_id}/join"
                  .replace("{tournament_id}", encodeURIComponent(String(tournamentId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "POST", queryParams, _body, options);
          },
          listTournamentRecordsAroundOwner: function (tournamentId, ownerId, limit, options) {
              if (options === void 0) { options = {}; }
              if (tournamentId === null || tournamentId === undefined) {
                  throw new Error("'tournamentId' is a required parameter but is null or undefined.");
              }
              if (ownerId === null || ownerId === undefined) {
                  throw new Error("'ownerId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/tournament/{tournament_id}/owner/{owner_id}"
                  .replace("{tournament_id}", encodeURIComponent(String(tournamentId)))
                  .replace("{owner_id}", encodeURIComponent(String(ownerId)));
              var queryParams = {
                  limit: limit,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          getUsers: function (ids, usernames, facebookIds, options) {
              if (options === void 0) { options = {}; }
              var urlPath = "/v2/user";
              var queryParams = {
                  ids: ids,
                  usernames: usernames,
                  facebook_ids: facebookIds,
              };
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
          listUserGroups: function (userId, options) {
              if (options === void 0) { options = {}; }
              if (userId === null || userId === undefined) {
                  throw new Error("'userId' is a required parameter but is null or undefined.");
              }
              var urlPath = "/v2/user/{user_id}/group"
                  .replace("{user_id}", encodeURIComponent(String(userId)));
              var queryParams = {};
              var _body = null;
              return this.doFetch(urlPath, "GET", queryParams, _body, options);
          },
      };
  };

  var Session = (function () {
      function Session(token, created_at, expires_at, username, user_id) {
          this.token = token;
          this.created_at = created_at;
          this.expires_at = expires_at;
          this.username = username;
          this.user_id = user_id;
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
          return new Session(jwt, createdAt, expiresAt, decoded['usn'], decoded['uid']);
      };
      return Session;
  }());

  var DefaultSocket = (function () {
      function DefaultSocket(host, port, useSSL, verbose) {
          if (useSSL === void 0) { useSSL = false; }
          if (verbose === void 0) { verbose = false; }
          this.host = host;
          this.port = port;
          this.useSSL = useSSL;
          this.verbose = verbose;
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
          if (this.socket != undefined) {
              return Promise.resolve(session);
          }
          var scheme = (this.useSSL) ? "wss://" : "ws://";
          var url = "" + scheme + this.host + ":" + this.port + "/ws?lang=en&status=" + encodeURIComponent(createStatus.toString()) + "&token=" + encodeURIComponent(session.token);
          var socket = new WebSocket(url);
          this.socket = socket;
          socket.onclose = function (evt) {
              _this.ondisconnect(evt);
              _this.socket = undefined;
          };
          socket.onerror = function (evt) {
              _this.onerror(evt);
          };
          socket.onmessage = function (evt) {
              var message = JSON.parse(evt.data);
              if (_this.verbose && window && window.console) {
                  console.log("Response: %o", message);
              }
              if (message.cid == undefined) {
                  if (message.notifications) {
                      message.notifications.notifications.forEach(function (n) {
                          var notification = {
                              code: n.code,
                              create_time: n.create_time,
                              id: n.id,
                              persistent: n.persistent,
                              sender_id: n.sender_id,
                              subject: n.subject,
                              content: n.content ? JSON.parse(n.content) : undefined,
                          };
                          _this.onnotification(notification);
                      });
                  }
                  else if (message.match_data) {
                      message.match_data.data = message.match_data.data != null ? JSON.parse(atob(message.match_data.data)) : null;
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
              socket.onopen = function (evt) {
                  if (_this.verbose && window && window.console) {
                      console.log(evt);
                  }
                  resolve(session);
              };
              socket.onerror = function (evt) {
                  reject(evt);
                  socket.close();
                  _this.socket = undefined;
              };
          });
      };
      DefaultSocket.prototype.disconnect = function (fireDisconnectEvent) {
          if (fireDisconnectEvent === void 0) { fireDisconnectEvent = true; }
          if (this.socket !== undefined) {
              this.socket.close();
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
          var m = message;
          return new Promise(function (resolve, reject) {
              if (_this.socket === undefined) {
                  reject("Socket connection has not been established yet.");
              }
              else {
                  if (m.match_data_send) {
                      m.match_data_send.data = btoa(JSON.stringify(m.match_data_send.data));
                      m.match_data_send.op_code = m.match_data_send.op_code.toString();
                      _this.socket.send(JSON.stringify(m));
                      resolve();
                  }
                  else {
                      if (m.channel_message_send) {
                          m.channel_message_send.content = JSON.stringify(m.channel_message_send.content);
                      }
                      else if (m.channel_message_update) {
                          m.channel_message_update.content = JSON.stringify(m.channel_message_update.content);
                      }
                      var cid = _this.generatecid();
                      _this.cIds[cid] = { resolve: resolve, reject: reject };
                      m.cid = cid;
                      _this.socket.send(JSON.stringify(m));
                  }
              }
              if (_this.verbose && window && window.console) {
                  console.log("Sent message: %o", m);
              }
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
          this.apiClient = NakamaApi(this.configuration);
      }
      Client.prototype.addGroupUsers = function (session, groupId, ids) {
          var _this = this;
          this.configuration.bearerToken = (session && session.token);
          var urlPath = "/v2/group/" + groupId + "/add";
          var queryParams = {
              user_ids: ids
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.bearerToken) {
              headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
          }
          else if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.addFriends = function (session, ids, usernames) {
          var _this = this;
          this.configuration.bearerToken = (session && session.token);
          var urlPath = "/v2/friend";
          var queryParams = {
              ids: ids,
              usernames: usernames
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.bearerToken) {
              headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
          }
          else if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.authenticateCustom = function (request) {
          var _this = this;
          var urlPath = "/v2/account/authenticate/custom";
          var queryParams = {
              username: request.username,
              create: request.create
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          fetchOptions.body = JSON.stringify({
              id: request.id
          });
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateDevice = function (request) {
          var _this = this;
          var urlPath = "/v2/account/authenticate/device";
          var queryParams = {
              username: request.username,
              create: request.create
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          fetchOptions.body = JSON.stringify({
              id: request.id
          });
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateEmail = function (request) {
          var _this = this;
          var urlPath = "/v2/account/authenticate/email";
          var queryParams = {
              username: request.username,
              create: request.create
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          fetchOptions.body = JSON.stringify({
              email: request.email,
              password: request.password
          });
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateFacebook = function (request) {
          var _this = this;
          var urlPath = "/v2/account/authenticate/facebook";
          var queryParams = {
              username: request.username,
              create: request.create
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          fetchOptions.body = JSON.stringify({
              token: request.token
          });
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateGoogle = function (request) {
          var _this = this;
          var urlPath = "/v2/account/authenticate/google";
          var queryParams = {
              username: request.username,
              create: request.create
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          fetchOptions.body = JSON.stringify({
              token: request.token
          });
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateGameCenter = function (request) {
          var _this = this;
          var urlPath = "/v2/account/authenticate/gamecenter";
          var queryParams = {
              username: request.username,
              create: request.create
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          fetchOptions.body = JSON.stringify({
              bundle_id: request.bundle_id,
              player_id: request.player_id,
              public_key_url: request.public_key_url,
              salt: request.salt,
              signature: request.signature,
              timestamp_seconds: request.timestamp_seconds
          });
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.authenticateSteam = function (request) {
          var _this = this;
          var urlPath = "/v2/account/authenticate/steam";
          var queryParams = {
              username: request.username,
              create: request.create
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          fetchOptions.body = JSON.stringify({
              token: request.token
          });
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (apiSession) {
              return Session.restore(apiSession.token || "");
          });
      };
      Client.prototype.blockFriends = function (session, ids, usernames) {
          var _this = this;
          this.configuration.bearerToken = (session && session.token);
          var urlPath = "/v2/friend/block";
          var queryParams = {
              ids: ids,
              usernames: usernames
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.bearerToken) {
              headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
          }
          else if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (response) {
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
      Client.prototype.createSocket = function (useSSL, verbose) {
          if (useSSL === void 0) { useSSL = false; }
          if (verbose === void 0) { verbose = false; }
          return new DefaultSocket(this.host, this.port, useSSL, verbose);
      };
      Client.prototype.deleteFriends = function (session, ids, usernames) {
          var _this = this;
          this.configuration.bearerToken = (session && session.token);
          var urlPath = "/v2/friend";
          var queryParams = {
              ids: ids,
              usernames: usernames
          };
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
          var fetchOptions = __assign({ method: "DELETE" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.bearerToken) {
              headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
          }
          else if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.deleteGroup = function (session, groupId) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.deleteGroup(groupId).then(function (response) {
              return response !== undefined;
          });
      };
      Client.prototype.deleteNotifications = function (session, ids) {
          var _this = this;
          this.configuration.bearerToken = (session && session.token);
          var urlPath = "/v2/notification";
          var queryParams = {
              ids: ids
          };
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
          var fetchOptions = __assign({ method: "DELETE" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.bearerToken) {
              headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
          }
          else if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (response) {
              return Promise.resolve(response != undefined);
          });
      };
      Client.prototype.deleteStorageObjects = function (session, request) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.deleteStorageObjects(request).then(function (response) {
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
          var _this = this;
          this.configuration.bearerToken = (session && session.token);
          var urlPath = "/v2/group/" + groupId + "/kick";
          var queryParams = {
              user_ids: ids
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.bearerToken) {
              headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
          }
          else if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (response) {
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
                      content: m.content ? JSON.parse(m.content) : undefined
                  });
              });
              return Promise.resolve(result);
          });
      };
      Client.prototype.listGroupUsers = function (session, groupId) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listGroupUsers(groupId).then(function (response) {
              var result = {
                  group_users: []
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
      Client.prototype.listUserGroups = function (session, userId) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listUserGroups(userId).then(function (response) {
              var result = {
                  user_groups: []
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
      Client.prototype.listFriends = function (session) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listFriends().then(function (response) {
              var result = {
                  friends: []
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
                          metadata: f.user.metadata ? JSON.parse(f.user.metadata) : undefined
                      },
                      state: f.state
                  });
              });
              return Promise.resolve(result);
          });
      };
      Client.prototype.listLeaderboardRecords = function (session, leaderboardId, ownerIds, limit, cursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listLeaderboardRecords(leaderboardId, ownerIds, limit, cursor).then(function (response) {
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
      Client.prototype.listLeaderboardRecordsAroundOwner = function (session, leaderboardId, ownerId, limit) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listLeaderboardRecordsAroundOwner(leaderboardId, ownerId, limit).then(function (response) {
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
                      });
                  });
              }
              return Promise.resolve(list);
          });
      };
      Client.prototype.listTournamentRecords = function (session, tournamentId, ownerIds, limit, cursor) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listTournamentRecords(tournamentId, ownerIds, limit, cursor).then(function (response) {
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
      Client.prototype.listTournamentRecordsAroundOwner = function (session, tournamentId, ownerId, limit) {
          this.configuration.bearerToken = (session && session.token);
          return this.apiClient.listTournamentRecordsAroundOwner(tournamentId, ownerId, limit).then(function (response) {
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
          var _this = this;
          this.configuration.bearerToken = (session && session.token);
          var urlPath = "/v2/group/" + groupId + "/promote";
          var queryParams = {
              user_ids: ids
          };
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
          var fetchOptions = __assign({ method: "POST" });
          var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
          };
          if (this.configuration.bearerToken) {
              headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
          }
          else if (this.configuration.username) {
              headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
          }
          fetchOptions.headers = __assign({}, headers);
          return Promise.race([
              fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                  if (response.status >= 200 && response.status < 300) {
                      return response.json();
                  }
                  else {
                      throw response;
                  }
              }),
              new Promise(function (_, reject) {
                  return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
              }),
          ]).then(function (response) {
              return Promise.resolve(response != undefined);
          });
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
  exports.Session = Session;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
