var nakamajs = (() => {
  var __defineProperty = Object.defineProperty;
  var __hasOwnProperty = Object.prototype.hasOwnProperty;
  var __assign = Object.assign;
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __markAsModule = (target) => {
    return __defineProperty(target, "__esModule", {value: true});
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defineProperty(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module) => {
    __markAsModule(target);
    if (typeof module === "object" || typeof module === "function") {
      for (let key in module)
        if (__hasOwnProperty.call(module, key) && !__hasOwnProperty.call(target, key) && key !== "default")
          __defineProperty(target, key, {get: () => module[key], enumerable: true});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defineProperty({}, "default", {value: module, enumerable: true}), module);
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
      var step = (result) => {
        return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);
      };
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // ../../node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS((exports, module) => {
    "use strict";
    module.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  });

  // ../../node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS((exports) => {
    "use strict";
    var base64 = exports;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (var i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    base64.encode = function encode(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode(string, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  });

  // ../../node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS((exports, module) => {
    "use strict";
    module.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  });

  // ../../node_modules/@protobufjs/float/index.js
  var require_float = __commonJS((exports, module) => {
    "use strict";
    module.exports = factory(factory);
    function factory(exports2) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports2.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports2.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports2.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports2.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports2.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports2.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports2.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports2.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports2.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports2.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports2.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports2.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports2.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports2.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports2.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports2.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports2;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  });

  // ../../node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS((exports, module) => {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  });

  // ../../node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS((exports) => {
    "use strict";
    var utf8 = exports;
    utf8.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  });

  // ../../node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS((exports, module) => {
    "use strict";
    module.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  });

  // ../../node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS((exports, module) => {
    "use strict";
    module.exports = LongBits;
    var util = require_minimal2();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : {low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned)};
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  });

  // ../../node_modules/protobufjs/src/util/minimal.js
  var require_minimal2 = __commonJS((exports) => {
    "use strict";
    var util = exports;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports;
    util.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util.isset = util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", {get: function() {
          return message;
        }});
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", {value: new Error().stack || ""});
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", {get: function() {
        return name;
      }});
      CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  });

  // ../../node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS((exports, module) => {
    "use strict";
    module.exports = Writer;
    var util = require_minimal2();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  });

  // ../../node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS((exports, module) => {
    "use strict";
    module.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal2();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  });

  // ../../node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS((exports, module) => {
    "use strict";
    module.exports = Reader;
    var util = require_minimal2();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
    Reader.prototype.uint32 = function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : "toNumber";
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  });

  // ../../node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS((exports, module) => {
    "use strict";
    module.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal2();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  });

  // ../../node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS((exports, module) => {
    "use strict";
    module.exports = Service;
    var util = require_minimal2();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
          if (err) {
            self2.emit("error", err, method);
            return callback(err);
          }
          if (response === null) {
            self2.end(true);
            return void 0;
          }
          if (!(response instanceof responseCtor)) {
            try {
              response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
            } catch (err2) {
              self2.emit("error", err2, method);
              return callback(err2);
            }
          }
          self2.emit("data", response, method);
          return callback(null, response);
        });
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  });

  // ../../node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS((exports) => {
    "use strict";
    var rpc = exports;
    rpc.Service = require_service();
  });

  // ../../node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS((exports, module) => {
    "use strict";
    module.exports = {};
  });

  // ../../node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS((exports) => {
    "use strict";
    var protobuf = exports;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal2();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  });

  // ../../node_modules/protobufjs/minimal.js
  var require_minimal = __commonJS((exports, module) => {
    "use strict";
    module.exports = require_index_minimal();
  });

  // ../../node_modules/long/src/long.js
  var require_long = __commonJS((exports, module) => {
    module.exports = Long;
    var wasm = null;
    try {
      wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
        0,
        97,
        115,
        109,
        1,
        0,
        0,
        0,
        1,
        13,
        2,
        96,
        0,
        1,
        127,
        96,
        4,
        127,
        127,
        127,
        127,
        1,
        127,
        3,
        7,
        6,
        0,
        1,
        1,
        1,
        1,
        1,
        6,
        6,
        1,
        127,
        1,
        65,
        0,
        11,
        7,
        50,
        6,
        3,
        109,
        117,
        108,
        0,
        1,
        5,
        100,
        105,
        118,
        95,
        115,
        0,
        2,
        5,
        100,
        105,
        118,
        95,
        117,
        0,
        3,
        5,
        114,
        101,
        109,
        95,
        115,
        0,
        4,
        5,
        114,
        101,
        109,
        95,
        117,
        0,
        5,
        8,
        103,
        101,
        116,
        95,
        104,
        105,
        103,
        104,
        0,
        0,
        10,
        191,
        1,
        6,
        4,
        0,
        35,
        0,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        126,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        127,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        128,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        129,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        130,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11
      ])), {}).exports;
    } catch (e) {
    }
    function Long(low, high, unsigned) {
      this.low = low | 0;
      this.high = high | 0;
      this.unsigned = !!unsigned;
    }
    Long.prototype.__isLong__;
    Object.defineProperty(Long.prototype, "__isLong__", {value: true});
    function isLong(obj) {
      return (obj && obj["__isLong__"]) === true;
    }
    Long.isLong = isLong;
    var INT_CACHE = {};
    var UINT_CACHE = {};
    function fromInt(value, unsigned) {
      var obj, cachedObj, cache;
      if (unsigned) {
        value >>>= 0;
        if (cache = 0 <= value && value < 256) {
          cachedObj = UINT_CACHE[value];
          if (cachedObj)
            return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
          UINT_CACHE[value] = obj;
        return obj;
      } else {
        value |= 0;
        if (cache = -128 <= value && value < 128) {
          cachedObj = INT_CACHE[value];
          if (cachedObj)
            return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
          INT_CACHE[value] = obj;
        return obj;
      }
    }
    Long.fromInt = fromInt;
    function fromNumber(value, unsigned) {
      if (isNaN(value))
        return unsigned ? UZERO : ZERO;
      if (unsigned) {
        if (value < 0)
          return UZERO;
        if (value >= TWO_PWR_64_DBL)
          return MAX_UNSIGNED_VALUE;
      } else {
        if (value <= -TWO_PWR_63_DBL)
          return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
          return MAX_VALUE;
      }
      if (value < 0)
        return fromNumber(-value, unsigned).neg();
      return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
    }
    Long.fromNumber = fromNumber;
    function fromBits(lowBits, highBits, unsigned) {
      return new Long(lowBits, highBits, unsigned);
    }
    Long.fromBits = fromBits;
    var pow_dbl = Math.pow;
    function fromString(str, unsigned, radix) {
      if (str.length === 0)
        throw Error("empty string");
      if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
      if (typeof unsigned === "number") {
        radix = unsigned, unsigned = false;
      } else {
        unsigned = !!unsigned;
      }
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
        throw RangeError("radix");
      var p;
      if ((p = str.indexOf("-")) > 0)
        throw Error("interior hyphen");
      else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
      }
      var radixToPower = fromNumber(pow_dbl(radix, 8));
      var result = ZERO;
      for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
          var power = fromNumber(pow_dbl(radix, size));
          result = result.mul(power).add(fromNumber(value));
        } else {
          result = result.mul(radixToPower);
          result = result.add(fromNumber(value));
        }
      }
      result.unsigned = unsigned;
      return result;
    }
    Long.fromString = fromString;
    function fromValue(val, unsigned) {
      if (typeof val === "number")
        return fromNumber(val, unsigned);
      if (typeof val === "string")
        return fromString(val, unsigned);
      return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
    }
    Long.fromValue = fromValue;
    var TWO_PWR_16_DBL = 1 << 16;
    var TWO_PWR_24_DBL = 1 << 24;
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
    var ZERO = fromInt(0);
    Long.ZERO = ZERO;
    var UZERO = fromInt(0, true);
    Long.UZERO = UZERO;
    var ONE = fromInt(1);
    Long.ONE = ONE;
    var UONE = fromInt(1, true);
    Long.UONE = UONE;
    var NEG_ONE = fromInt(-1);
    Long.NEG_ONE = NEG_ONE;
    var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
    Long.MAX_VALUE = MAX_VALUE;
    var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
    var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
    Long.MIN_VALUE = MIN_VALUE;
    var LongPrototype = Long.prototype;
    LongPrototype.toInt = function toInt() {
      return this.unsigned ? this.low >>> 0 : this.low;
    };
    LongPrototype.toNumber = function toNumber() {
      if (this.unsigned)
        return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
      return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };
    LongPrototype.toString = function toString(radix) {
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
        throw RangeError("radix");
      if (this.isZero())
        return "0";
      if (this.isNegative()) {
        if (this.eq(MIN_VALUE)) {
          var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
          return div.toString(radix) + rem1.toInt().toString(radix);
        } else
          return "-" + this.neg().toString(radix);
      }
      var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
      var result = "";
      while (true) {
        var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
          return digits + result;
        else {
          while (digits.length < 6)
            digits = "0" + digits;
          result = "" + digits + result;
        }
      }
    };
    LongPrototype.getHighBits = function getHighBits() {
      return this.high;
    };
    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
      return this.high >>> 0;
    };
    LongPrototype.getLowBits = function getLowBits() {
      return this.low;
    };
    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
      return this.low >>> 0;
    };
    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
      if (this.isNegative())
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
      var val = this.high != 0 ? this.high : this.low;
      for (var bit = 31; bit > 0; bit--)
        if ((val & 1 << bit) != 0)
          break;
      return this.high != 0 ? bit + 33 : bit + 1;
    };
    LongPrototype.isZero = function isZero() {
      return this.high === 0 && this.low === 0;
    };
    LongPrototype.eqz = LongPrototype.isZero;
    LongPrototype.isNegative = function isNegative() {
      return !this.unsigned && this.high < 0;
    };
    LongPrototype.isPositive = function isPositive() {
      return this.unsigned || this.high >= 0;
    };
    LongPrototype.isOdd = function isOdd() {
      return (this.low & 1) === 1;
    };
    LongPrototype.isEven = function isEven() {
      return (this.low & 1) === 0;
    };
    LongPrototype.equals = function equals(other) {
      if (!isLong(other))
        other = fromValue(other);
      if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
        return false;
      return this.high === other.high && this.low === other.low;
    };
    LongPrototype.eq = LongPrototype.equals;
    LongPrototype.notEquals = function notEquals(other) {
      return !this.eq(other);
    };
    LongPrototype.neq = LongPrototype.notEquals;
    LongPrototype.ne = LongPrototype.notEquals;
    LongPrototype.lessThan = function lessThan(other) {
      return this.comp(other) < 0;
    };
    LongPrototype.lt = LongPrototype.lessThan;
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
      return this.comp(other) <= 0;
    };
    LongPrototype.lte = LongPrototype.lessThanOrEqual;
    LongPrototype.le = LongPrototype.lessThanOrEqual;
    LongPrototype.greaterThan = function greaterThan(other) {
      return this.comp(other) > 0;
    };
    LongPrototype.gt = LongPrototype.greaterThan;
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
      return this.comp(other) >= 0;
    };
    LongPrototype.gte = LongPrototype.greaterThanOrEqual;
    LongPrototype.ge = LongPrototype.greaterThanOrEqual;
    LongPrototype.compare = function compare(other) {
      if (!isLong(other))
        other = fromValue(other);
      if (this.eq(other))
        return 0;
      var thisNeg = this.isNegative(), otherNeg = other.isNegative();
      if (thisNeg && !otherNeg)
        return -1;
      if (!thisNeg && otherNeg)
        return 1;
      if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
      return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
    };
    LongPrototype.comp = LongPrototype.compare;
    LongPrototype.negate = function negate() {
      if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
      return this.not().add(ONE);
    };
    LongPrototype.neg = LongPrototype.negate;
    LongPrototype.add = function add(addend) {
      if (!isLong(addend))
        addend = fromValue(addend);
      var a48 = this.high >>> 16;
      var a32 = this.high & 65535;
      var a16 = this.low >>> 16;
      var a00 = this.low & 65535;
      var b48 = addend.high >>> 16;
      var b32 = addend.high & 65535;
      var b16 = addend.low >>> 16;
      var b00 = addend.low & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 + b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 + b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 + b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 + b48;
      c48 &= 65535;
      return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    LongPrototype.subtract = function subtract(subtrahend) {
      if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
      return this.add(subtrahend.neg());
    };
    LongPrototype.sub = LongPrototype.subtract;
    LongPrototype.multiply = function multiply(multiplier) {
      if (this.isZero())
        return ZERO;
      if (!isLong(multiplier))
        multiplier = fromValue(multiplier);
      if (wasm) {
        var low = wasm.mul(this.low, this.high, multiplier.low, multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      if (multiplier.isZero())
        return ZERO;
      if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
      if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;
      if (this.isNegative()) {
        if (multiplier.isNegative())
          return this.neg().mul(multiplier.neg());
        else
          return this.neg().mul(multiplier).neg();
      } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();
      if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
      var a48 = this.high >>> 16;
      var a32 = this.high & 65535;
      var a16 = this.low >>> 16;
      var a00 = this.low & 65535;
      var b48 = multiplier.high >>> 16;
      var b32 = multiplier.high & 65535;
      var b16 = multiplier.low >>> 16;
      var b00 = multiplier.low & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 * b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 * b00;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c16 += a00 * b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 * b00;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a16 * b16;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a00 * b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
      c48 &= 65535;
      return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    LongPrototype.mul = LongPrototype.multiply;
    LongPrototype.divide = function divide(divisor) {
      if (!isLong(divisor))
        divisor = fromValue(divisor);
      if (divisor.isZero())
        throw Error("division by zero");
      if (wasm) {
        if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
          return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
      var approx, rem, res;
      if (!this.unsigned) {
        if (this.eq(MIN_VALUE)) {
          if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
            return MIN_VALUE;
          else if (divisor.eq(MIN_VALUE))
            return ONE;
          else {
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) {
              return divisor.isNegative() ? ONE : NEG_ONE;
            } else {
              rem = this.sub(divisor.mul(approx));
              res = approx.add(rem.div(divisor));
              return res;
            }
          }
        } else if (divisor.eq(MIN_VALUE))
          return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
          if (divisor.isNegative())
            return this.neg().div(divisor.neg());
          return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
          return this.div(divisor.neg()).neg();
        res = ZERO;
      } else {
        if (!divisor.unsigned)
          divisor = divisor.toUnsigned();
        if (divisor.gt(this))
          return UZERO;
        if (divisor.gt(this.shru(1)))
          return UONE;
        res = UZERO;
      }
      rem = this;
      while (rem.gte(divisor)) {
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
        var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
          approx -= delta;
          approxRes = fromNumber(approx, this.unsigned);
          approxRem = approxRes.mul(divisor);
        }
        if (approxRes.isZero())
          approxRes = ONE;
        res = res.add(approxRes);
        rem = rem.sub(approxRem);
      }
      return res;
    };
    LongPrototype.div = LongPrototype.divide;
    LongPrototype.modulo = function modulo(divisor) {
      if (!isLong(divisor))
        divisor = fromValue(divisor);
      if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      return this.sub(this.div(divisor).mul(divisor));
    };
    LongPrototype.mod = LongPrototype.modulo;
    LongPrototype.rem = LongPrototype.modulo;
    LongPrototype.not = function not() {
      return fromBits(~this.low, ~this.high, this.unsigned);
    };
    LongPrototype.and = function and(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };
    LongPrototype.or = function or(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };
    LongPrototype.xor = function xor(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };
    LongPrototype.shiftLeft = function shiftLeft(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
        return this;
      else if (numBits < 32)
        return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
      else
        return fromBits(0, this.low << numBits - 32, this.unsigned);
    };
    LongPrototype.shl = LongPrototype.shiftLeft;
    LongPrototype.shiftRight = function shiftRight(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
        return this;
      else if (numBits < 32)
        return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
      else
        return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
    };
    LongPrototype.shr = LongPrototype.shiftRight;
    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      numBits &= 63;
      if (numBits === 0)
        return this;
      else {
        var high = this.high;
        if (numBits < 32) {
          var low = this.low;
          return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        } else if (numBits === 32)
          return fromBits(high, 0, this.unsigned);
        else
          return fromBits(high >>> numBits - 32, 0, this.unsigned);
      }
    };
    LongPrototype.shru = LongPrototype.shiftRightUnsigned;
    LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
    LongPrototype.toSigned = function toSigned() {
      if (!this.unsigned)
        return this;
      return fromBits(this.low, this.high, false);
    };
    LongPrototype.toUnsigned = function toUnsigned() {
      if (this.unsigned)
        return this;
      return fromBits(this.low, this.high, true);
    };
    LongPrototype.toBytes = function toBytes(le) {
      return le ? this.toBytesLE() : this.toBytesBE();
    };
    LongPrototype.toBytesLE = function toBytesLE() {
      var hi = this.high, lo = this.low;
      return [
        lo & 255,
        lo >>> 8 & 255,
        lo >>> 16 & 255,
        lo >>> 24,
        hi & 255,
        hi >>> 8 & 255,
        hi >>> 16 & 255,
        hi >>> 24
      ];
    };
    LongPrototype.toBytesBE = function toBytesBE() {
      var hi = this.high, lo = this.low;
      return [
        hi >>> 24,
        hi >>> 16 & 255,
        hi >>> 8 & 255,
        hi & 255,
        lo >>> 24,
        lo >>> 16 & 255,
        lo >>> 8 & 255,
        lo & 255
      ];
    };
    Long.fromBytes = function fromBytes(bytes, unsigned, le) {
      return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
    };
    Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
      return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
    };
    Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
      return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
    };
  });

  // ../../node_modules/Base64/base64.js
  var require_base642 = __commonJS((exports) => {
    (function() {
      var object = typeof exports != "undefined" ? exports : typeof self != "undefined" ? self : $.global;
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      function InvalidCharacterError(message) {
        this.message = message;
      }
      InvalidCharacterError.prototype = new Error();
      InvalidCharacterError.prototype.name = "InvalidCharacterError";
      object.btoa || (object.btoa = function(input) {
        var str = String(input);
        for (var block, charCode, idx = 0, map = chars, output = ""; str.charAt(idx | 0) || (map = "=", idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
          charCode = str.charCodeAt(idx += 3 / 4);
          if (charCode > 255) {
            throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
          }
          block = block << 8 | charCode;
        }
        return output;
      });
      object.atob || (object.atob = function(input) {
        var str = String(input).replace(/[=]+$/, "");
        if (str.length % 4 == 1) {
          throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (var bc = 0, bs, buffer, idx = 0, output = ""; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
          buffer = chars.indexOf(buffer);
        }
        return output;
      });
    })();
  });

  // ../../node_modules/whatwg-fetch/fetch.js
  var require_fetch = __commonJS((exports) => {
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
            return {done: value === void 0, value};
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
        return new Request(this, {body: this._bodyInit});
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
        var response = new Response(null, {status: 0, statusText: ""});
        response.type = "error";
        return response;
      };
      var redirectStatuses = [301, 302, 303, 307, 308];
      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError("Invalid status code");
        }
        return new Response(null, {status, headers: {location: url}});
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
  });

  // index.ts
  var require_nakama_js = __commonJS((exports) => {
    __export(exports, {
      Client: () => Client,
      Session: () => Session,
      WebSocketAdapterText: () => WebSocketAdapterText
    });
    const protobuf = __toModule(require_minimal());
    const long = __toModule(require_long());
    const Base64 = __toModule(require_base642());
    const whatwg_fetch = __toModule(require_fetch());
    protobuf.util.Long = long.default;
    protobuf.configure();
  });

  // api.gen.ts
  const BASE_PATH = "http://127.0.0.1:80";
  const NakamaApi = (configuration = {
    basePath: BASE_PATH,
    bearerToken: "",
    password: "",
    username: "",
    timeoutMs: 5e3
  }) => {
    const napi = {
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
        const fetchOptions = __assign(__assign({}, {method}), options);
        fetchOptions.headers = __assign({}, options.headers);
        if (configuration.bearerToken) {
          fetchOptions.headers["Authorization"] = "Bearer " + configuration.bearerToken;
        } else if (configuration.username) {
          fetchOptions.headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
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
          fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
            if (response.status == 204) {
              return response;
            } else if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              throw response;
            }
          }),
          new Promise((_, reject) => setTimeout(reject, configuration.timeoutMs, "Request timed out."))
        ]);
      },
      healthcheck(options = {}) {
        const urlPath = "/healthcheck";
        const queryParams = {};
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      getAccount(options = {}) {
        const urlPath = "/v2/account";
        const queryParams = {};
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      updateAccount(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "PUT", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      authenticateSteam(body, create, username, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/authenticate/steam";
        const queryParams = {
          create,
          username
        };
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      linkCustom(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/link/custom";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      linkDevice(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/link/device";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      linkEmail(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/link/email";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      linkFacebookInstantGame(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/link/facebookinstantgame";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      linkGameCenter(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/link/gamecenter";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      linkGoogle(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/link/google";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      linkSteam(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/link/steam";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      unlinkCustom(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/unlink/custom";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      unlinkDevice(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/unlink/device";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      unlinkEmail(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/unlink/email";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      unlinkFacebook(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/unlink/facebook";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      unlinkFacebookInstantGame(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/unlink/facebookinstantgame";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      unlinkGameCenter(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/unlink/gamecenter";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      unlinkGoogle(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/unlink/google";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      unlinkSteam(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/account/unlink/steam";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      listChannelMessages(channelId, limit, forward, cursor, options = {}) {
        if (channelId === null || channelId === void 0) {
          throw new Error("'channelId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/channel/{channel_id}".replace("{channel_id}", encodeURIComponent(String(channelId)));
        const queryParams = {
          limit,
          forward,
          cursor
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      event(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/event";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      deleteFriends(ids, usernames, options = {}) {
        const urlPath = "/v2/friend";
        const queryParams = {
          ids,
          usernames
        };
        let _body = null;
        return napi.doFetch(urlPath, "DELETE", queryParams, _body, options);
      },
      listFriends(limit, state, cursor, options = {}) {
        const urlPath = "/v2/friend";
        const queryParams = {
          limit,
          state,
          cursor
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      addFriends(ids, usernames, options = {}) {
        const urlPath = "/v2/friend";
        const queryParams = {
          ids,
          usernames
        };
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      blockFriends(ids, usernames, options = {}) {
        const urlPath = "/v2/friend/block";
        const queryParams = {
          ids,
          usernames
        };
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
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
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      listGroups(name, cursor, limit, options = {}) {
        const urlPath = "/v2/group";
        const queryParams = {
          name,
          cursor,
          limit
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      createGroup(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      deleteGroup(groupId, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {};
        let _body = null;
        return napi.doFetch(urlPath, "DELETE", queryParams, _body, options);
      },
      updateGroup(groupId, body, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "PUT", queryParams, _body, options);
      },
      addGroupUsers(groupId, userIds, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}/add".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {
          user_ids: userIds
        };
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      banGroupUsers(groupId, userIds, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}/ban".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {
          user_ids: userIds
        };
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      joinGroup(groupId, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}/join".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {};
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      kickGroupUsers(groupId, userIds, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}/kick".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {
          user_ids: userIds
        };
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      leaveGroup(groupId, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}/leave".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {};
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      promoteGroupUsers(groupId, userIds, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}/promote".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {
          user_ids: userIds
        };
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      listGroupUsers(groupId, limit, state, cursor, options = {}) {
        if (groupId === null || groupId === void 0) {
          throw new Error("'groupId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/group/{group_id}/user".replace("{group_id}", encodeURIComponent(String(groupId)));
        const queryParams = {
          limit,
          state,
          cursor
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      deleteLeaderboardRecord(leaderboardId, options = {}) {
        if (leaderboardId === null || leaderboardId === void 0) {
          throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/leaderboard/{leaderboard_id}".replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
        const queryParams = {};
        let _body = null;
        return napi.doFetch(urlPath, "DELETE", queryParams, _body, options);
      },
      listLeaderboardRecords(leaderboardId, ownerIds, limit, cursor, expiry, options = {}) {
        if (leaderboardId === null || leaderboardId === void 0) {
          throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/leaderboard/{leaderboard_id}".replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
        const queryParams = {
          owner_ids: ownerIds,
          limit,
          cursor,
          expiry
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      writeLeaderboardRecord(leaderboardId, body, options = {}) {
        if (leaderboardId === null || leaderboardId === void 0) {
          throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
        }
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/leaderboard/{leaderboard_id}".replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      listLeaderboardRecordsAroundOwner(leaderboardId, ownerId, limit, expiry, options = {}) {
        if (leaderboardId === null || leaderboardId === void 0) {
          throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
        }
        if (ownerId === null || ownerId === void 0) {
          throw new Error("'ownerId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/leaderboard/{leaderboard_id}/owner/{owner_id}".replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId))).replace("{owner_id}", encodeURIComponent(String(ownerId)));
        const queryParams = {
          limit,
          expiry
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      listMatches(limit, authoritative, label, minSize, maxSize, query, options = {}) {
        const urlPath = "/v2/match";
        const queryParams = {
          limit,
          authoritative,
          label,
          min_size: minSize,
          max_size: maxSize,
          query
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      deleteNotifications(ids, options = {}) {
        const urlPath = "/v2/notification";
        const queryParams = {
          ids
        };
        let _body = null;
        return napi.doFetch(urlPath, "DELETE", queryParams, _body, options);
      },
      listNotifications(limit, cacheableCursor, options = {}) {
        const urlPath = "/v2/notification";
        const queryParams = {
          limit,
          cacheable_cursor: cacheableCursor
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      rpcFunc2(id, payload, httpKey, options = {}) {
        if (id === null || id === void 0) {
          throw new Error("'id' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/rpc/{id}".replace("{id}", encodeURIComponent(String(id)));
        const queryParams = {
          payload,
          http_key: httpKey
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      rpcFunc(id, body, options = {}) {
        if (id === null || id === void 0) {
          throw new Error("'id' is a required parameter but is null or undefined.");
        }
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/rpc/{id}".replace("{id}", encodeURIComponent(String(id)));
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      readStorageObjects(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/storage";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      writeStorageObjects(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/storage";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "PUT", queryParams, _body, options);
      },
      deleteStorageObjects(body, options = {}) {
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/storage/delete";
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "PUT", queryParams, _body, options);
      },
      listStorageObjects(collection, userId, limit, cursor, options = {}) {
        if (collection === null || collection === void 0) {
          throw new Error("'collection' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/storage/{collection}".replace("{collection}", encodeURIComponent(String(collection)));
        const queryParams = {
          user_id: userId,
          limit,
          cursor
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      listStorageObjects2(collection, userId, limit, cursor, options = {}) {
        if (collection === null || collection === void 0) {
          throw new Error("'collection' is a required parameter but is null or undefined.");
        }
        if (userId === null || userId === void 0) {
          throw new Error("'userId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/storage/{collection}/{user_id}".replace("{collection}", encodeURIComponent(String(collection))).replace("{user_id}", encodeURIComponent(String(userId)));
        const queryParams = {
          limit,
          cursor
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      listTournaments(categoryStart, categoryEnd, startTime, endTime, limit, cursor, options = {}) {
        const urlPath = "/v2/tournament";
        const queryParams = {
          category_start: categoryStart,
          category_end: categoryEnd,
          start_time: startTime,
          end_time: endTime,
          limit,
          cursor
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      listTournamentRecords(tournamentId, ownerIds, limit, cursor, expiry, options = {}) {
        if (tournamentId === null || tournamentId === void 0) {
          throw new Error("'tournamentId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/tournament/{tournament_id}".replace("{tournament_id}", encodeURIComponent(String(tournamentId)));
        const queryParams = {
          owner_ids: ownerIds,
          limit,
          cursor,
          expiry
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      writeTournamentRecord(tournamentId, body, options = {}) {
        if (tournamentId === null || tournamentId === void 0) {
          throw new Error("'tournamentId' is a required parameter but is null or undefined.");
        }
        if (body === null || body === void 0) {
          throw new Error("'body' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/tournament/{tournament_id}".replace("{tournament_id}", encodeURIComponent(String(tournamentId)));
        const queryParams = {};
        let _body = null;
        _body = JSON.stringify(body || {});
        return napi.doFetch(urlPath, "PUT", queryParams, _body, options);
      },
      joinTournament(tournamentId, options = {}) {
        if (tournamentId === null || tournamentId === void 0) {
          throw new Error("'tournamentId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/tournament/{tournament_id}/join".replace("{tournament_id}", encodeURIComponent(String(tournamentId)));
        const queryParams = {};
        let _body = null;
        return napi.doFetch(urlPath, "POST", queryParams, _body, options);
      },
      listTournamentRecordsAroundOwner(tournamentId, ownerId, limit, expiry, options = {}) {
        if (tournamentId === null || tournamentId === void 0) {
          throw new Error("'tournamentId' is a required parameter but is null or undefined.");
        }
        if (ownerId === null || ownerId === void 0) {
          throw new Error("'ownerId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/tournament/{tournament_id}/owner/{owner_id}".replace("{tournament_id}", encodeURIComponent(String(tournamentId))).replace("{owner_id}", encodeURIComponent(String(ownerId)));
        const queryParams = {
          limit,
          expiry
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      getUsers(ids, usernames, facebookIds, options = {}) {
        const urlPath = "/v2/user";
        const queryParams = {
          ids,
          usernames,
          facebook_ids: facebookIds
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      },
      listUserGroups(userId, limit, state, cursor, options = {}) {
        if (userId === null || userId === void 0) {
          throw new Error("'userId' is a required parameter but is null or undefined.");
        }
        const urlPath = "/v2/user/{user_id}/group".replace("{user_id}", encodeURIComponent(String(userId)));
        const queryParams = {
          limit,
          state,
          cursor
        };
        let _body = null;
        return napi.doFetch(urlPath, "GET", queryParams, _body, options);
      }
    };
    return napi;
  };

  // session.ts
  class Session {
    constructor(token, created_at, expires_at, username, user_id, vars) {
      this.token = token;
      this.created_at = created_at;
      this.expires_at = expires_at;
      this.username = username;
      this.user_id = user_id;
      this.vars = vars;
    }
    isexpired(currenttime) {
      return this.expires_at - currenttime < 0;
    }
    static restore(jwt) {
      const createdAt = Math.floor(new Date().getTime() / 1e3);
      const parts = jwt.split(".");
      if (parts.length != 3) {
        throw "jwt is not valid.";
      }
      const decoded = JSON.parse(atob(parts[1]));
      const expiresAt = Math.floor(parseInt(decoded["exp"]));
      return new Session(jwt, createdAt, expiresAt, decoded["usn"], decoded["uid"], decoded["vrs"]);
    }
  }

  // web_socket_adapter.ts
  class WebSocketAdapterText {
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
      }
      this._socket.send(JSON.stringify(msg));
    }
  }

  // utils.ts
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_match, p1) {
      return String.fromCharCode(Number("0x" + p1));
    }));
  }
  function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  }

  // socket.ts
  class DefaultSocket {
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
    connect(session3, createStatus = false) {
      if (this.adapter.isConnected) {
        return Promise.resolve(session3);
      }
      const scheme = this.useSSL ? "wss://" : "ws://";
      this.adapter.connect(scheme, this.host, this.port, createStatus, session3.token);
      this.adapter.onClose = (evt) => {
        this.ondisconnect(evt);
      };
      this.adapter.onError = (evt) => {
        this.onerror(evt);
      };
      this.adapter.onMessage = (message) => {
        if (this.verbose && window && window.console) {
          console.log("Response: %o", message);
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
          resolve(session3);
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
    onmatchmakermatched(matchmakerMatched) {
      if (this.verbose && window && window.console) {
        console.log(matchmakerMatched);
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
          } else {
            if (untypedMessage.channel_message_send) {
              untypedMessage.channel_message_send.content = JSON.stringify(untypedMessage.channel_message_send.content);
            } else if (untypedMessage.channel_message_update) {
              untypedMessage.channel_message_update.content = JSON.stringify(untypedMessage.channel_message_update.content);
            }
            const cid = this.generatecid();
            this.cIds[cid] = {resolve, reject};
            untypedMessage.cid = cid;
            this.adapter.send(untypedMessage);
          }
        }
        if (this.verbose && window && window.console) {
          console.log("Sent message: %o", untypedMessage);
        }
      });
    }
    addMatchmaker(query, minCount, maxCount, stringProperties, numericProperties) {
      return __async(this, [], function* () {
        const matchMakerAdd = {
          matchmaker_add: {
            min_count: minCount,
            max_count: maxCount,
            query,
            string_properties: stringProperties,
            numeric_properties: numericProperties
          }
        };
        const response = yield this.send(matchMakerAdd);
        return response.matchmaker_ticket;
      });
    }
    createMatch() {
      return __async(this, [], function* () {
        const response = yield this.send({match_create: {}});
        return response.match;
      });
    }
    followUsers(userIds) {
      return __async(this, [], function* () {
        const response = yield this.send({status_follow: {user_ids: userIds}});
        return response.status;
      });
    }
    joinChat(target, type, persistence, hidden) {
      return __async(this, [], function* () {
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
      return __async(this, [], function* () {
        const join = {match_join: {metadata}};
        if (token) {
          join.match_join.token = token;
        } else {
          join.match_join.match_id = match_id;
        }
        const response = yield this.send(join);
        return response.match;
      });
    }
    leaveChat(channel_id) {
      return this.send({channel_leave: {channel_id}});
    }
    leaveMatch(matchId) {
      return this.send({match_leave: {match_id: matchId}});
    }
    removeChatMessage(channel_id, message_id) {
      return __async(this, [], function* () {
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
      return this.send({matchmaker_remove: {ticket}});
    }
    rpc(id, payload, http_key) {
      return __async(this, [], function* () {
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
    sendMatchState(matchId, opCode, data, presence) {
      return __async(this, [], function* () {
        return this.send({
          match_data_send: {
            match_id: matchId,
            op_code: opCode,
            data,
            presence
          }
        });
      });
    }
    unfollowUsers(user_ids) {
      return this.send({status_unfollow: {user_ids}});
    }
    updateChatMessage(channel_id, message_id, content) {
      return __async(this, [], function* () {
        const response = yield this.send({channel_message_update: {channel_id, message_id, content}});
        return response.channel_message_ack;
      });
    }
    updateStatus(status) {
      return this.send({status_update: {status}});
    }
    writeChatMessage(channel_id, content) {
      return __async(this, [], function* () {
        const response = yield this.send({channel_message_send: {channel_id, content}});
        return response.channel_message_ack;
      });
    }
  }

  // client.ts
  const DEFAULT_HOST = "127.0.0.1";
  const DEFAULT_PORT = "7350";
  const DEFAULT_SERVER_KEY = "defaultkey";
  const DEFAULT_TIMEOUT_MS = 7e3;
  class Client {
    constructor(serverkey = DEFAULT_SERVER_KEY, host = DEFAULT_HOST, port = DEFAULT_PORT, useSSL = false, timeout = DEFAULT_TIMEOUT_MS) {
      this.serverkey = serverkey;
      this.host = host;
      this.port = port;
      this.useSSL = useSSL;
      this.timeout = timeout;
      const scheme = useSSL ? "https://" : "http://";
      const basePath = `${scheme}${host}:${port}`;
      this.configuration = {
        basePath,
        username: serverkey,
        password: "",
        timeoutMs: timeout
      };
      this.apiClient = NakamaApi(this.configuration);
    }
    addGroupUsers(session3, groupId, ids) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.addGroupUsers(groupId, ids).then((response) => {
        return response !== void 0;
      });
    }
    addFriends(session3, ids, usernames) {
      this.configuration.bearerToken = session3 && session3.token;
      const urlPath = "/v2/friend";
      const queryParams = {
        ids,
        usernames
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.bearerToken) {
        headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
      } else if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((response) => {
        return Promise.resolve(response != void 0);
      });
    }
    authenticateCustom(request) {
      const urlPath = "/v2/account/authenticate/custom";
      const queryParams = {
        username: request.username,
        create: request.create
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      fetchOptions.body = JSON.stringify({
        id: request.id,
        vars: request.vars
      });
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((apiSession) => {
        return Session.restore(apiSession.token || "");
      });
    }
    authenticateDevice(request) {
      const urlPath = "/v2/account/authenticate/device";
      const queryParams = {
        username: request.username,
        create: request.create
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      fetchOptions.body = JSON.stringify({
        id: request.id,
        vars: request.vars
      });
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((apiSession) => {
        return Session.restore(apiSession.token || "");
      });
    }
    authenticateEmail(request) {
      const urlPath = "/v2/account/authenticate/email";
      const queryParams = {
        username: request.username,
        create: request.create
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      fetchOptions.body = JSON.stringify({
        email: request.email,
        password: request.password,
        vars: request.vars
      });
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((apiSession) => {
        return Session.restore(apiSession.token || "");
      });
    }
    authenticateFacebookInstantGame(request) {
      return this.apiClient.authenticateFacebookInstantGame({signed_player_info: request.signed_player_info, vars: request.vars}, request.username, request.create);
    }
    authenticateFacebook(request) {
      const urlPath = "/v2/account/authenticate/facebook";
      const queryParams = {
        username: request.username,
        create: request.create
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      fetchOptions.body = JSON.stringify({
        token: request.token,
        vars: request.vars
      });
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((apiSession) => {
        return Session.restore(apiSession.token || "");
      });
    }
    authenticateGoogle(request) {
      const urlPath = "/v2/account/authenticate/google";
      const queryParams = {
        username: request.username,
        create: request.create
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      fetchOptions.body = JSON.stringify({
        token: request.token,
        vars: request.vars
      });
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((apiSession) => {
        return Session.restore(apiSession.token || "");
      });
    }
    authenticateGameCenter(request) {
      const urlPath = "/v2/account/authenticate/gamecenter";
      const queryParams = {
        username: request.username,
        create: request.create
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
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
        timestamp_seconds: request.timestamp_seconds,
        vars: request.vars
      });
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((apiSession) => {
        return Session.restore(apiSession.token || "");
      });
    }
    authenticateSteam(request) {
      const urlPath = "/v2/account/authenticate/steam";
      const queryParams = {
        username: request.username,
        create: request.create,
        vars: request.vars
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      fetchOptions.body = JSON.stringify({
        token: request.token
      });
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((apiSession) => {
        return Session.restore(apiSession.token || "");
      });
    }
    banGroupUsers(session3, groupId, ids) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.banGroupUsers(groupId, ids).then((response) => {
        return response !== void 0;
      });
    }
    blockFriends(session3, ids, usernames) {
      this.configuration.bearerToken = session3 && session3.token;
      const urlPath = "/v2/friend/block";
      const queryParams = {
        ids,
        usernames
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.bearerToken) {
        headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
      } else if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((response) => {
        return Promise.resolve(response != void 0);
      });
    }
    createGroup(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    createSocket(useSSL = false, verbose = false, adapter = new WebSocketAdapterText()) {
      return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter);
    }
    deleteFriends(session3, ids, usernames) {
      this.configuration.bearerToken = session3 && session3.token;
      const urlPath = "/v2/friend";
      const queryParams = {
        ids,
        usernames
      };
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
      const fetchOptions = __assign({}, {method: "DELETE"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.bearerToken) {
        headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
      } else if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((response) => {
        return Promise.resolve(response != void 0);
      });
    }
    deleteGroup(session3, groupId) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.deleteGroup(groupId).then((response) => {
        return response !== void 0;
      });
    }
    deleteNotifications(session3, ids) {
      this.configuration.bearerToken = session3 && session3.token;
      const urlPath = "/v2/notification";
      const queryParams = {
        ids
      };
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
      const fetchOptions = __assign({}, {method: "DELETE"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.bearerToken) {
        headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
      } else if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((response) => {
        return Promise.resolve(response != void 0);
      });
    }
    deleteStorageObjects(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.deleteStorageObjects(request).then((response) => {
        return Promise.resolve(response != void 0);
      });
    }
    emitEvent(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.event(request).then((response) => {
        return Promise.resolve(response != void 0);
      });
    }
    getAccount(session3) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.getAccount();
    }
    importFacebookFriends(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.importFacebookFriends(request).then((response) => {
        return response !== void 0;
      });
    }
    getUsers(session3, ids, usernames, facebookIds) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    joinGroup(session3, groupId) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.joinGroup(groupId, {}).then((response) => {
        return response !== void 0;
      });
    }
    joinTournament(session3, tournamentId) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.joinTournament(tournamentId, {}).then((response) => {
        return response !== void 0;
      });
    }
    kickGroupUsers(session3, groupId, ids) {
      this.configuration.bearerToken = session3 && session3.token;
      const urlPath = "/v2/group/" + groupId + "/kick";
      const queryParams = {
        user_ids: ids
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.bearerToken) {
        headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
      } else if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((response) => {
        return Promise.resolve(response != void 0);
      });
    }
    leaveGroup(session3, groupId) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.leaveGroup(groupId, {}).then((response) => {
        return response !== void 0;
      });
    }
    listChannelMessages(session3, channelId, limit, forward, cursor) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.listChannelMessages(channelId, limit, forward, cursor).then((response) => {
        var result = {
          messages: [],
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor
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
    }
    listGroupUsers(session3, groupId, state, limit, cursor) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    listUserGroups(session3, userId, state, limit, cursor) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    listGroups(session3, name, cursor, limit) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    linkCustom(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.linkCustom(request).then((response) => {
        return response !== void 0;
      });
    }
    linkDevice(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.linkDevice(request).then((response) => {
        return response !== void 0;
      });
    }
    linkEmail(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.linkEmail(request).then((response) => {
        return response !== void 0;
      });
    }
    linkFacebook(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.linkFacebook(request).then((response) => {
        return response !== void 0;
      });
    }
    linkFacebookInstantGame(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.linkFacebookInstantGame(request).then((response) => {
        return response !== void 0;
      });
    }
    linkGoogle(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.linkGoogle(request).then((response) => {
        return response !== void 0;
      });
    }
    linkGameCenter(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.linkGameCenter(request).then((response) => {
        return response !== void 0;
      });
    }
    linkSteam(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.linkSteam(request).then((response) => {
        return response !== void 0;
      });
    }
    listFriends(session3, state, limit, cursor) {
      this.configuration.bearerToken = session3 && session3.token;
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
              metadata: f.user.metadata ? JSON.parse(f.user.metadata) : void 0
            },
            state: f.state
          });
        });
        return Promise.resolve(result);
      });
    }
    listLeaderboardRecords(session3, leaderboardId, ownerIds, limit, cursor, expiry) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    listLeaderboardRecordsAroundOwner(session3, leaderboardId, ownerId, limit, expiry) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    listMatches(session3, limit, authoritative, label, minSize, maxSize, query) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.listMatches(limit, authoritative, label, minSize, maxSize, query);
    }
    listNotifications(session3, limit, cacheableCursor) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    listStorageObjects(session3, collection, userId, limit, cursor) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    listTournaments(session3, categoryStart, categoryEnd, startTime, endTime, limit, cursor) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    listTournamentRecords(session3, tournamentId, ownerIds, limit, cursor, expiry) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    listTournamentRecordsAroundOwner(session3, tournamentId, ownerId, limit, expiry) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    promoteGroupUsers(session3, groupId, ids) {
      this.configuration.bearerToken = session3 && session3.token;
      const urlPath = "/v2/group/" + groupId + "/promote";
      const queryParams = {
        user_ids: ids
      };
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
      const fetchOptions = __assign({}, {method: "POST"});
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      if (this.configuration.bearerToken) {
        headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
      } else if (this.configuration.username) {
        headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
      }
      fetchOptions.headers = __assign({}, headers);
      return Promise.race([
        fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        }),
        new Promise((_, reject) => setTimeout(reject, this.configuration.timeoutMs, "Request timed out."))
      ]).then((response) => {
        return Promise.resolve(response != void 0);
      });
    }
    readStorageObjects(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.readStorageObjects(request).then((response) => {
        var result = {objects: []};
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
    }
    rpc(session3, id, input) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.rpcFunc(id, JSON.stringify(input)).then((response) => {
        return Promise.resolve({
          id: response.id,
          payload: !response.payload ? void 0 : JSON.parse(response.payload)
        });
      });
    }
    rpcGet(id, session3, httpKey, input) {
      if (!httpKey || httpKey == "") {
        this.configuration.bearerToken = session3 && session3.token;
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
    }
    unlinkCustom(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.unlinkCustom(request).then((response) => {
        return response !== void 0;
      });
    }
    unlinkDevice(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.unlinkDevice(request).then((response) => {
        return response !== void 0;
      });
    }
    unlinkEmail(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.unlinkEmail(request).then((response) => {
        return response !== void 0;
      });
    }
    unlinkFacebook(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.unlinkFacebook(request).then((response) => {
        return response !== void 0;
      });
    }
    unlinkFacebookInstantGame(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.unlinkFacebookInstantGame(request).then((response) => {
        return response !== void 0;
      });
    }
    unlinkGoogle(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.unlinkGoogle(request).then((response) => {
        return response !== void 0;
      });
    }
    unlinkGameCenter(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.unlinkGameCenter(request).then((response) => {
        return response !== void 0;
      });
    }
    unlinkSteam(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.unlinkSteam(request).then((response) => {
        return response !== void 0;
      });
    }
    updateAccount(session3, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.updateAccount(request).then((response) => {
        return response !== void 0;
      });
    }
    updateGroup(session3, groupId, request) {
      this.configuration.bearerToken = session3 && session3.token;
      return this.apiClient.updateGroup(groupId, request).then((response) => {
        return response !== void 0;
      });
    }
    writeLeaderboardRecord(session3, leaderboardId, request) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
    writeStorageObjects(session3, objects) {
      this.configuration.bearerToken = session3 && session3.token;
      var request = {objects: []};
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
    }
    writeTournamentRecord(session3, tournamentId, request) {
      this.configuration.bearerToken = session3 && session3.token;
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
    }
  }
  return require_nakama_js();
})();
