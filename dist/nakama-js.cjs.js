'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
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
    rawHeaders.split(/\r?\n/).forEach(function(line) {
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
    this.status = 'status' in options ? options.status : 200;
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
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

















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

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

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
        healthcheck: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/healthcheck";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
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
        getAccount: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/account";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
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
        updateAccount: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "PUT" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        authenticateCustom: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/custom";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        authenticateDevice: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/device";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        authenticateEmail: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/email";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        authenticateFacebook: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/facebook";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        authenticateGameCenter: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/gamecenter";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        authenticateGoogle: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/google";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        authenticateSteam: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/steam";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        linkCustom: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/custom";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        linkDevice: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/device";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        linkEmail: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/email";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        linkFacebook: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/facebook";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        linkGameCenter: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/gamecenter";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        linkGoogle: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/google";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        linkSteam: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/steam";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        unlinkCustom: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/custom";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        unlinkDevice: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/device";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        unlinkEmail: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/email";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        unlinkFacebook: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/facebook";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        unlinkGameCenter: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/gamecenter";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        unlinkGoogle: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/google";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        unlinkSteam: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/steam";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        deleteFriends: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/friend";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "DELETE" }, options);
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
        listFriends: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/friend";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
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
        addFriends: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/friend";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
        blockFriends: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/friend/block";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
        importFacebookFriends: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/friend/facebook";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        createGroup: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        deleteNotifications: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/notification";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "DELETE" }, options);
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
        listNotifications: function (limit, cacheableCursor, options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/notification";
            var queryParams = {
                limit: limit,
                cacheable_cursor: cacheableCursor,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
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
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
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
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        deleteStorageObjects: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/storage";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "DELETE" }, options);
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
        readStorageObjects: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/storage";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
        writeStorageObjects: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/storage";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "PUT" }, options);
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
            fetchOptions.body = JSON.stringify(body || {});
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
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
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
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
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
        getUsers: function (ids, usernames, facebookIds, options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/user";
            var queryParams = {
                ids: ids,
                usernames: usernames,
                facebook_ids: facebookIds,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
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
    };
};

var Session = (function () {
    function Session(token, createdAt, expiresAt, username, userId) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.username = username;
        this.userId = userId;
    }
    Session.prototype.isexpired = function (currenttime) {
        return (this.expiresAt - currenttime) < 0;
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
    }
    DefaultSocket.prototype.generatecid = function () {
        return __spread(Array(30)).map(function () { return Math.random().toString(36)[3]; }).join('');
    };
    DefaultSocket.prototype.connect = function (session) {
        var _this = this;
        if (this.socket != undefined) {
            return Promise.resolve(session);
        }
        var scheme = (this.useSSL) ? "wss://" : "ws://";
        var url = "" + scheme + this.host + ":" + this.port + "/ws?lang=en&token=" + encodeURIComponent(session.token);
        var socket = new WebSocket(url);
        this.socket = socket;
        socket.onclose = function (evt) {
            _this.ondisconnect(evt);
            _this.socket = undefined;
        };
        socket.onmessage = function (evt) {
            var message = JSON.parse(evt.data);
            if (_this.verbose && window && window.console) {
                console.log("Response: %o", message);
            }
            if (message.cid == undefined) {
                if (message.notifications) {
                    message.notifications.notifications.forEach(function (n) { return _this.onnotification(n); });
                }
                else if (message.matchData) {
                    message.matchData.data = JSON.parse(atob(message.matchData.data));
                    _this.onmatchdata(message.matchData);
                }
                else if (message.matchedPresenceEvent) {
                    _this.onmatchpresence(message.matchPresenceEvent);
                }
                else if (message.streamPresenceEvent) {
                    _this.onstreampresence(message.streamPresenceEvent);
                }
                else if (message.streamData) {
                    _this.onstreamdata(message.streamData);
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
        if (this.socket != undefined) {
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
        return new Promise(function (resolve, reject) {
            if (_this.socket == undefined) {
                reject("Socket connection has not been established yet.");
            }
            else {
                if (message.matchDataSend) {
                    var m = message;
                    m.matchDataSend.data = btoa(JSON.stringify(m.matchDataSend.data));
                    _this.socket.send(JSON.stringify(m));
                    resolve();
                }
                else {
                    var cid = _this.generatecid();
                    _this.cIds[cid] = {
                        resolve: resolve,
                        reject: reject
                    };
                    message.cid = cid;
                    _this.socket.send(JSON.stringify(message));
                }
            }
            if (_this.verbose && window && window.console) {
                console.log("Sent message: %o", message);
            }
        });
    };
    return DefaultSocket;
}());

var DEFAULT_HOST = "127.0.0.1";
var DEFAULT_PORT = "7349";
var DEFAULT_SERVER_KEY = "defaultkey";
var DEFAULT_TIMEOUT_MS = 7000;
var Client = (function () {
    function Client(serverkey, host, port, useSSL, timeout, verbose) {
        if (serverkey === void 0) { serverkey = DEFAULT_SERVER_KEY; }
        if (host === void 0) { host = DEFAULT_HOST; }
        if (port === void 0) { port = DEFAULT_PORT; }
        if (useSSL === void 0) { useSSL = false; }
        if (timeout === void 0) { timeout = DEFAULT_TIMEOUT_MS; }
        if (verbose === void 0) { verbose = false; }
        this.serverkey = serverkey;
        this.host = host;
        this.port = port;
        this.useSSL = useSSL;
        this.timeout = timeout;
        this.verbose = verbose;
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
    Client.prototype.authenticateCustom = function (request) {
        return this.apiClient.authenticateCustom(request).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateDevice = function (request) {
        return this.apiClient.authenticateDevice(request).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateEmail = function (request) {
        return this.apiClient.authenticateEmail(request).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateFacebook = function (request) {
        return this.apiClient.authenticateFacebook(request).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateGoogle = function (request) {
        return this.apiClient.authenticateGoogle(request).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.createSocket = function (useSSL, verbose) {
        if (useSSL === void 0) { useSSL = false; }
        if (verbose === void 0) { verbose = false; }
        return new DefaultSocket(this.host, this.port, useSSL, verbose);
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
        return this.apiClient.getUsers(ids, usernames, facebookIds);
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
    Client.prototype.listFriends = function (session) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listFriends();
    };
    Client.prototype.listNotifications = function (session, limit, cacheableCursor) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listNotifications(limit, cacheableCursor);
    };
    Client.prototype.rpc = function (session, id, input) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.rpcFunc(id, JSON.stringify(input)).then(function (response) {
            return Promise.resolve({
                id: response.id,
                payload: (!response.payload) ? null : JSON.parse(response.payload)
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
                payload: (!response.payload) ? null : JSON.parse(response.payload)
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
    Client.prototype.updateAccount = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.updateAccount(request).then(function (response) {
            return response !== undefined;
        });
    };
    return Client;
}());

exports.Client = Client;
exports.Session = Session;
