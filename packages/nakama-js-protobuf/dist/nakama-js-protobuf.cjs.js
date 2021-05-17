var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
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
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
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
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
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
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
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
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
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
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
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
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
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
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
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
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
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
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
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
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
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
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
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
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
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
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
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
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util6 = require_minimal();
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
      if (util6.isString(value)) {
        if (util6.Long)
          value = util6.Long.fromString(value);
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
      return util6.Long ? new util6.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : {low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned)};
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
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util6 = exports2;
    util6.asPromise = require_aspromise();
    util6.base64 = require_base64();
    util6.EventEmitter = require_eventemitter();
    util6.float = require_float();
    util6.inquire = require_inquire();
    util6.utf8 = require_utf8();
    util6.pool = require_pool();
    util6.LongBits = require_longbits();
    util6.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util6.global = util6.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util6.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util6.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util6.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util6.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util6.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util6.isset = util6.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util6.Buffer = function() {
      try {
        var Buffer2 = util6.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util6._Buffer_from = null;
    util6._Buffer_allocUnsafe = null;
    util6.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util6.Buffer ? util6._Buffer_allocUnsafe(sizeOrArray) : new util6.Array(sizeOrArray) : util6.Buffer ? util6._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util6.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util6.Long = util6.global.dcodeIO && util6.global.dcodeIO.Long || util6.global.Long || util6.inquire("long");
    util6.key2Re = /^true|false|0|1$/;
    util6.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util6.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util6.longToHash = function longToHash(value) {
      return value ? util6.LongBits.from(value).toHash() : util6.LongBits.zeroHash;
    };
    util6.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util6.LongBits.fromHash(hash);
      if (util6.Long)
        return util6.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util6.merge = merge;
    util6.lcFirst = function lcFirst(str) {
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
    util6.newError = newError;
    util6.ProtocolError = newError("ProtocolError");
    util6.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util6.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util6.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util6._configure = function() {
      var Buffer2 = util6.Buffer;
      if (!Buffer2) {
        util6._Buffer_from = util6._Buffer_allocUnsafe = null;
        return;
      }
      util6._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util6._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer5;
    var util6 = require_minimal();
    var BufferWriter;
    var LongBits = util6.LongBits;
    var base64 = util6.base64;
    var utf8 = util6.utf8;
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
    function Writer5() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util6.Buffer ? function create_buffer_setup() {
        return (Writer5.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer5();
      };
    };
    Writer5.create = create();
    Writer5.alloc = function alloc(size) {
      return new util6.Array(size);
    };
    if (util6.Array !== Array)
      Writer5.alloc = util6.pool(Writer5.alloc, util6.Array.prototype.subarray);
    Writer5.prototype._push = function push(fn, len, val) {
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
    Writer5.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
      return this;
    };
    Writer5.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer5.prototype.sint32 = function write_sint32(value) {
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
    Writer5.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer5.prototype.int64 = Writer5.prototype.uint64;
    Writer5.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer5.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer5.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer5.prototype.sfixed32 = Writer5.prototype.fixed32;
    Writer5.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer5.prototype.sfixed64 = Writer5.prototype.fixed64;
    Writer5.prototype.float = function write_float(value) {
      return this._push(util6.float.writeFloatLE, 4, value);
    };
    Writer5.prototype.double = function write_double(value) {
      return this._push(util6.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util6.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer5.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util6.isString(value)) {
        var buf = Writer5.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer5.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer5.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer5.prototype.reset = function reset() {
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
    Writer5.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer5.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer5._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer5.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer5 = require_writer();
    (BufferWriter.prototype = Object.create(Writer5.prototype)).constructor = BufferWriter;
    var util6 = require_minimal();
    function BufferWriter() {
      Writer5.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util6._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util6.Buffer && util6.Buffer.prototype instanceof Uint8Array && util6.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
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
      if (util6.isString(value))
        value = util6._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util6.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util6.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader5;
    var util6 = require_minimal();
    var BufferReader;
    var LongBits = util6.LongBits;
    var utf8 = util6.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader5(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader5(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader5(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util6.Buffer ? function create_buffer_setup(buffer) {
        return (Reader5.create = function create_buffer(buffer2) {
          return util6.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader5.create = create();
    Reader5.prototype._slice = util6.Array.prototype.subarray || util6.Array.prototype.slice;
    Reader5.prototype.uint32 = function read_uint32_setup() {
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
    Reader5.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader5.prototype.sint32 = function read_sint32() {
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
    Reader5.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader5.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader5.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader5.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util6.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader5.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util6.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader5.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader5.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader5.prototype.skip = function skip(length) {
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
    Reader5.prototype.skipType = function(wireType) {
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
    Reader5._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader5.create = create();
      BufferReader._configure();
      var fn = util6.Long ? "toLong" : "toNumber";
      util6.merge(Reader5.prototype, {
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
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader5 = require_reader();
    (BufferReader.prototype = Object.create(Reader5.prototype)).constructor = BufferReader;
    var util6 = require_minimal();
    function BufferReader(buffer) {
      Reader5.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util6.Buffer)
        BufferReader.prototype._slice = util6.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util6 = require_minimal();
    (Service.prototype = Object.create(util6.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util6.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util6.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
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
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf2 = exports2;
    protobuf2.build = "minimal";
    protobuf2.Writer = require_writer();
    protobuf2.BufferWriter = require_writer_buffer();
    protobuf2.Reader = require_reader();
    protobuf2.BufferReader = require_reader_buffer();
    protobuf2.util = require_minimal();
    protobuf2.rpc = require_rpc();
    protobuf2.roots = require_roots();
    protobuf2.configure = configure6;
    function configure6() {
      protobuf2.util._configure();
      protobuf2.Writer._configure(protobuf2.BufferWriter);
      protobuf2.Reader._configure(protobuf2.BufferReader);
    }
    configure6();
  }
});

// node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// node_modules/long/src/long.js
var require_long = __commonJS({
  "node_modules/long/src/long.js"(exports2, module2) {
    module2.exports = Long6;
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
    function Long6(low, high, unsigned) {
      this.low = low | 0;
      this.high = high | 0;
      this.unsigned = !!unsigned;
    }
    Long6.prototype.__isLong__;
    Object.defineProperty(Long6.prototype, "__isLong__", {value: true});
    function isLong(obj) {
      return (obj && obj["__isLong__"]) === true;
    }
    Long6.isLong = isLong;
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
    Long6.fromInt = fromInt;
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
    Long6.fromNumber = fromNumber;
    function fromBits(lowBits, highBits, unsigned) {
      return new Long6(lowBits, highBits, unsigned);
    }
    Long6.fromBits = fromBits;
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
    Long6.fromString = fromString;
    function fromValue(val, unsigned) {
      if (typeof val === "number")
        return fromNumber(val, unsigned);
      if (typeof val === "string")
        return fromString(val, unsigned);
      return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
    }
    Long6.fromValue = fromValue;
    var TWO_PWR_16_DBL = 1 << 16;
    var TWO_PWR_24_DBL = 1 << 24;
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
    var ZERO = fromInt(0);
    Long6.ZERO = ZERO;
    var UZERO = fromInt(0, true);
    Long6.UZERO = UZERO;
    var ONE = fromInt(1);
    Long6.ONE = ONE;
    var UONE = fromInt(1, true);
    Long6.UONE = UONE;
    var NEG_ONE = fromInt(-1);
    Long6.NEG_ONE = NEG_ONE;
    var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
    Long6.MAX_VALUE = MAX_VALUE;
    var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
    Long6.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
    var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
    Long6.MIN_VALUE = MIN_VALUE;
    var LongPrototype = Long6.prototype;
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
    Long6.fromBytes = function fromBytes(bytes, unsigned, le) {
      return le ? Long6.fromBytesLE(bytes, unsigned) : Long6.fromBytesBE(bytes, unsigned);
    };
    Long6.fromBytesLE = function fromBytesLE(bytes, unsigned) {
      return new Long6(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
    };
    Long6.fromBytesBE = function fromBytesBE(bytes, unsigned) {
      return new Long6(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
    };
  }
});

// index.ts
__markAsModule(exports);
__export(exports, {
  WebSocketAdapterPb: () => WebSocketAdapterPb
});
var protobuf = __toModule(require_minimal2());
var import_long = __toModule(require_long());

// google/protobuf/timestamp.ts
var Long = __toModule(require_long());
var import_minimal = __toModule(require_minimal2());
var baseTimestamp = {
  seconds: 0,
  nanos: 0
};
function longToNumber(long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}
var Timestamp = {
  encode(message, writer = import_minimal.Writer.create()) {
    writer.uint32(8).int64(message.seconds);
    writer.uint32(16).int32(message.nanos);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseTimestamp);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64());
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseTimestamp);
    if (object.seconds !== void 0 && object.seconds !== null) {
      message.seconds = Number(object.seconds);
    }
    if (object.nanos !== void 0 && object.nanos !== null) {
      message.nanos = Number(object.nanos);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseTimestamp);
    if (object.seconds !== void 0 && object.seconds !== null) {
      message.seconds = object.seconds;
    }
    if (object.nanos !== void 0 && object.nanos !== null) {
      message.nanos = object.nanos;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.seconds !== void 0 && (obj.seconds = message.seconds);
    message.nanos !== void 0 && (obj.nanos = message.nanos);
    return obj;
  }
};
if (import_minimal.util.Long !== Long) {
  import_minimal.util.Long = Long;
  (0, import_minimal.configure)();
}

// github.com/heroiclabs/nakama-common/api/api.ts
var Long3 = __toModule(require_long());
var import_minimal3 = __toModule(require_minimal2());

// google/protobuf/wrappers.ts
var Long2 = __toModule(require_long());
var import_minimal2 = __toModule(require_minimal2());
var baseInt32Value = {
  value: 0
};
var baseBoolValue = {
  value: false
};
var baseStringValue = {
  value: ""
};
var Int32Value = {
  encode(message, writer = import_minimal2.Writer.create()) {
    writer.uint32(8).int32(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal2.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseInt32Value);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseInt32Value);
    if (object.value !== void 0 && object.value !== null) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseInt32Value);
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var BoolValue = {
  encode(message, writer = import_minimal2.Writer.create()) {
    writer.uint32(8).bool(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal2.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseBoolValue);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseBoolValue);
    if (object.value !== void 0 && object.value !== null) {
      message.value = Boolean(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseBoolValue);
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var StringValue = {
  encode(message, writer = import_minimal2.Writer.create()) {
    writer.uint32(10).string(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal2.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStringValue);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStringValue);
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStringValue);
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
if (import_minimal2.util.Long !== Long2) {
  import_minimal2.util.Long = Long2;
  (0, import_minimal2.configure)();
}
var windowBase64 = globalThis;
var atob = windowBase64.atob || ((b64) => Buffer.from(b64, "base64").toString("binary"));
var btoa = windowBase64.btoa || ((bin) => Buffer.from(bin, "binary").toString("base64"));

// github.com/heroiclabs/nakama-common/api/api.ts
var baseChannelMessage = {
  channel_id: "",
  message_id: "",
  sender_id: "",
  username: "",
  content: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: ""
};
var baseNotification = {
  id: "",
  subject: "",
  content: "",
  code: 0,
  sender_id: "",
  persistent: false
};
var baseRpc = {
  id: "",
  payload: "",
  http_key: ""
};
function fromJsonTimestamp(o) {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
function toTimestamp(date) {
  const seconds = date.getTime() / 1e3;
  const nanos = date.getTime() % 1e3 * 1e6;
  return {seconds, nanos};
}
function fromTimestamp(t) {
  let millis = t.seconds * 1e3;
  millis += t.nanos / 1e6;
  return new Date(millis);
}
var Friend_State;
(function(Friend_State2) {
  Friend_State2[Friend_State2["FRIEND"] = 0] = "FRIEND";
  Friend_State2[Friend_State2["INVITE_SENT"] = 1] = "INVITE_SENT";
  Friend_State2[Friend_State2["INVITE_RECEIVED"] = 2] = "INVITE_RECEIVED";
  Friend_State2[Friend_State2["BLOCKED"] = 3] = "BLOCKED";
  Friend_State2[Friend_State2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Friend_State || (Friend_State = {}));
var GroupUserList_GroupUser_State;
(function(GroupUserList_GroupUser_State2) {
  GroupUserList_GroupUser_State2[GroupUserList_GroupUser_State2["SUPERADMIN"] = 0] = "SUPERADMIN";
  GroupUserList_GroupUser_State2[GroupUserList_GroupUser_State2["ADMIN"] = 1] = "ADMIN";
  GroupUserList_GroupUser_State2[GroupUserList_GroupUser_State2["MEMBER"] = 2] = "MEMBER";
  GroupUserList_GroupUser_State2[GroupUserList_GroupUser_State2["JOIN_REQUEST"] = 3] = "JOIN_REQUEST";
  GroupUserList_GroupUser_State2[GroupUserList_GroupUser_State2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(GroupUserList_GroupUser_State || (GroupUserList_GroupUser_State = {}));
var UserGroupList_UserGroup_State;
(function(UserGroupList_UserGroup_State2) {
  UserGroupList_UserGroup_State2[UserGroupList_UserGroup_State2["SUPERADMIN"] = 0] = "SUPERADMIN";
  UserGroupList_UserGroup_State2[UserGroupList_UserGroup_State2["ADMIN"] = 1] = "ADMIN";
  UserGroupList_UserGroup_State2[UserGroupList_UserGroup_State2["MEMBER"] = 2] = "MEMBER";
  UserGroupList_UserGroup_State2[UserGroupList_UserGroup_State2["JOIN_REQUEST"] = 3] = "JOIN_REQUEST";
  UserGroupList_UserGroup_State2[UserGroupList_UserGroup_State2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(UserGroupList_UserGroup_State || (UserGroupList_UserGroup_State = {}));
var ChannelMessage = {
  encode(message, writer = import_minimal3.Writer.create()) {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.message_id);
    if (message.code !== void 0 && message.code !== void 0) {
      Int32Value.encode({value: message.code}, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.sender_id);
    writer.uint32(42).string(message.username);
    writer.uint32(50).string(message.content);
    if (message.create_time !== void 0 && message.create_time !== void 0) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(58).fork()).ldelim();
    }
    if (message.update_time !== void 0 && message.update_time !== void 0) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(66).fork()).ldelim();
    }
    if (message.persistent !== void 0 && message.persistent !== void 0) {
      BoolValue.encode({value: message.persistent}, writer.uint32(74).fork()).ldelim();
    }
    writer.uint32(82).string(message.room_name);
    writer.uint32(90).string(message.group_id);
    writer.uint32(98).string(message.user_id_one);
    writer.uint32(106).string(message.user_id_two);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal3.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannelMessage);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.code = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.sender_id = reader.string();
          break;
        case 5:
          message.username = reader.string();
          break;
        case 6:
          message.content = reader.string();
          break;
        case 7:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.persistent = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 10:
          message.room_name = reader.string();
          break;
        case 11:
          message.group_id = reader.string();
          break;
        case 12:
          message.user_id_one = reader.string();
          break;
        case 13:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannelMessage);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = String(object.message_id);
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = Number(object.code);
    }
    if (object.sender_id !== void 0 && object.sender_id !== null) {
      message.sender_id = String(object.sender_id);
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = String(object.content);
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.update_time !== void 0 && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = String(object.room_name);
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessage);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = object.message_id;
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = object.code;
    }
    if (object.sender_id !== void 0 && object.sender_id !== null) {
      message.sender_id = object.sender_id;
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = object.username;
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = object.content;
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.update_time !== void 0 && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = object.persistent;
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = object.room_name;
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.code !== void 0 && (obj.code = message.code);
    message.sender_id !== void 0 && (obj.sender_id = message.sender_id);
    message.username !== void 0 && (obj.username = message.username);
    message.content !== void 0 && (obj.content = message.content);
    message.create_time !== void 0 && (obj.create_time = message.create_time !== void 0 ? message.create_time.toISOString() : null);
    message.update_time !== void 0 && (obj.update_time = message.update_time !== void 0 ? message.update_time.toISOString() : null);
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    message.room_name !== void 0 && (obj.room_name = message.room_name);
    message.group_id !== void 0 && (obj.group_id = message.group_id);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  }
};
var Notification = {
  encode(message, writer = import_minimal3.Writer.create()) {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.subject);
    writer.uint32(26).string(message.content);
    writer.uint32(32).int32(message.code);
    writer.uint32(42).string(message.sender_id);
    if (message.create_time !== void 0 && message.create_time !== void 0) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(50).fork()).ldelim();
    }
    writer.uint32(56).bool(message.persistent);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal3.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseNotification);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.subject = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        case 4:
          message.code = reader.int32();
          break;
        case 5:
          message.sender_id = reader.string();
          break;
        case 6:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.persistent = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseNotification);
    if (object.id !== void 0 && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.subject !== void 0 && object.subject !== null) {
      message.subject = String(object.subject);
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = String(object.content);
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = Number(object.code);
    }
    if (object.sender_id !== void 0 && object.sender_id !== null) {
      message.sender_id = String(object.sender_id);
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseNotification);
    if (object.id !== void 0 && object.id !== null) {
      message.id = object.id;
    }
    if (object.subject !== void 0 && object.subject !== null) {
      message.subject = object.subject;
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = object.content;
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = object.code;
    }
    if (object.sender_id !== void 0 && object.sender_id !== null) {
      message.sender_id = object.sender_id;
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = object.persistent;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.subject !== void 0 && (obj.subject = message.subject);
    message.content !== void 0 && (obj.content = message.content);
    message.code !== void 0 && (obj.code = message.code);
    message.sender_id !== void 0 && (obj.sender_id = message.sender_id);
    message.create_time !== void 0 && (obj.create_time = message.create_time !== void 0 ? message.create_time.toISOString() : null);
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    return obj;
  }
};
var Rpc = {
  encode(message, writer = import_minimal3.Writer.create()) {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.payload);
    writer.uint32(26).string(message.http_key);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal3.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseRpc);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.http_key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseRpc);
    if (object.id !== void 0 && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.payload !== void 0 && object.payload !== null) {
      message.payload = String(object.payload);
    }
    if (object.http_key !== void 0 && object.http_key !== null) {
      message.http_key = String(object.http_key);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseRpc);
    if (object.id !== void 0 && object.id !== null) {
      message.id = object.id;
    }
    if (object.payload !== void 0 && object.payload !== null) {
      message.payload = object.payload;
    }
    if (object.http_key !== void 0 && object.http_key !== null) {
      message.http_key = object.http_key;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.payload !== void 0 && (obj.payload = message.payload);
    message.http_key !== void 0 && (obj.http_key = message.http_key);
    return obj;
  }
};
if (import_minimal3.util.Long !== Long3) {
  import_minimal3.util.Long = Long3;
  (0, import_minimal3.configure)();
}

// github.com/heroiclabs/nakama-common/rtapi/realtime.ts
var Long4 = __toModule(require_long());
var import_minimal4 = __toModule(require_minimal2());
var baseEnvelope = {
  cid: ""
};
var baseChannel = {
  id: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: ""
};
var baseChannelJoin = {
  target: "",
  type: 0
};
var baseChannelLeave = {
  channel_id: ""
};
var baseChannelMessageAck = {
  channel_id: "",
  message_id: "",
  username: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: ""
};
var baseChannelMessageSend = {
  channel_id: "",
  content: ""
};
var baseChannelMessageUpdate = {
  channel_id: "",
  message_id: "",
  content: ""
};
var baseChannelMessageRemove = {
  channel_id: "",
  message_id: ""
};
var baseChannelPresenceEvent = {
  channel_id: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: ""
};
var baseError = {
  code: 0,
  message: ""
};
var baseError_ContextEntry = {
  key: "",
  value: ""
};
var baseMatch = {
  match_id: "",
  authoritative: false,
  size: 0
};
var baseMatchCreate = {};
var baseMatchData = {
  match_id: "",
  op_code: 0,
  reliable: false
};
var baseMatchDataSend = {
  match_id: "",
  op_code: 0,
  reliable: false
};
var baseMatchJoin = {};
var baseMatchJoin_MetadataEntry = {
  key: "",
  value: ""
};
var baseMatchLeave = {
  match_id: ""
};
var baseMatchPresenceEvent = {
  match_id: ""
};
var baseMatchmakerAdd = {
  min_count: 0,
  max_count: 0,
  query: ""
};
var baseMatchmakerAdd_StringPropertiesEntry = {
  key: "",
  value: ""
};
var baseMatchmakerAdd_NumericPropertiesEntry = {
  key: "",
  value: 0
};
var baseMatchmakerMatched = {
  ticket: ""
};
var baseMatchmakerMatched_MatchmakerUser = {
  party_id: ""
};
var baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry = {
  key: "",
  value: ""
};
var baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry = {
  key: "",
  value: 0
};
var baseMatchmakerRemove = {
  ticket: ""
};
var baseMatchmakerTicket = {
  ticket: ""
};
var baseNotifications = {};
var baseParty = {
  party_id: "",
  open: false,
  max_size: 0
};
var basePartyCreate = {
  open: false,
  max_size: 0
};
var basePartyJoin = {
  party_id: ""
};
var basePartyLeave = {
  party_id: ""
};
var basePartyPromote = {
  party_id: ""
};
var basePartyLeader = {
  party_id: ""
};
var basePartyAccept = {
  party_id: ""
};
var basePartyRemove = {
  party_id: ""
};
var basePartyClose = {
  party_id: ""
};
var basePartyJoinRequestList = {
  party_id: ""
};
var basePartyJoinRequest = {
  party_id: ""
};
var basePartyMatchmakerAdd = {
  party_id: "",
  min_count: 0,
  max_count: 0,
  query: ""
};
var basePartyMatchmakerAdd_StringPropertiesEntry = {
  key: "",
  value: ""
};
var basePartyMatchmakerAdd_NumericPropertiesEntry = {
  key: "",
  value: 0
};
var basePartyMatchmakerRemove = {
  party_id: "",
  ticket: ""
};
var basePartyMatchmakerTicket = {
  party_id: "",
  ticket: ""
};
var basePartyData = {
  party_id: "",
  op_code: 0
};
var basePartyDataSend = {
  party_id: "",
  op_code: 0
};
var basePartyPresenceEvent = {
  party_id: ""
};
var basePing = {};
var basePong = {};
var baseStatus = {};
var baseStatusFollow = {
  user_ids: "",
  usernames: ""
};
var baseStatusPresenceEvent = {};
var baseStatusUnfollow = {
  user_ids: ""
};
var baseStatusUpdate = {};
var baseStream = {
  mode: 0,
  subject: "",
  subcontext: "",
  label: ""
};
var baseStreamData = {
  data: "",
  reliable: false
};
var baseStreamPresenceEvent = {};
var baseUserPresence = {
  user_id: "",
  session_id: "",
  username: "",
  persistence: false
};
function fromJsonTimestamp2(o) {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp2(Timestamp.fromJSON(o));
  }
}
function toTimestamp2(date) {
  const seconds = date.getTime() / 1e3;
  const nanos = date.getTime() % 1e3 * 1e6;
  return {seconds, nanos};
}
function fromTimestamp2(t) {
  let millis = t.seconds * 1e3;
  millis += t.nanos / 1e6;
  return new Date(millis);
}
function longToNumber2(long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}
var ChannelJoin_Type;
(function(ChannelJoin_Type2) {
  ChannelJoin_Type2[ChannelJoin_Type2["TYPE_UNSPECIFIED"] = 0] = "TYPE_UNSPECIFIED";
  ChannelJoin_Type2[ChannelJoin_Type2["ROOM"] = 1] = "ROOM";
  ChannelJoin_Type2[ChannelJoin_Type2["DIRECT_MESSAGE"] = 2] = "DIRECT_MESSAGE";
  ChannelJoin_Type2[ChannelJoin_Type2["GROUP"] = 3] = "GROUP";
  ChannelJoin_Type2[ChannelJoin_Type2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ChannelJoin_Type || (ChannelJoin_Type = {}));
var Error_Code;
(function(Error_Code2) {
  Error_Code2[Error_Code2["RUNTIME_EXCEPTION"] = 0] = "RUNTIME_EXCEPTION";
  Error_Code2[Error_Code2["UNRECOGNIZED_PAYLOAD"] = 1] = "UNRECOGNIZED_PAYLOAD";
  Error_Code2[Error_Code2["MISSING_PAYLOAD"] = 2] = "MISSING_PAYLOAD";
  Error_Code2[Error_Code2["BAD_INPUT"] = 3] = "BAD_INPUT";
  Error_Code2[Error_Code2["MATCH_NOT_FOUND"] = 4] = "MATCH_NOT_FOUND";
  Error_Code2[Error_Code2["MATCH_JOIN_REJECTED"] = 5] = "MATCH_JOIN_REJECTED";
  Error_Code2[Error_Code2["RUNTIME_FUNCTION_NOT_FOUND"] = 6] = "RUNTIME_FUNCTION_NOT_FOUND";
  Error_Code2[Error_Code2["RUNTIME_FUNCTION_EXCEPTION"] = 7] = "RUNTIME_FUNCTION_EXCEPTION";
  Error_Code2[Error_Code2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Error_Code || (Error_Code = {}));
var Envelope = {
  encode(message, writer = import_minimal4.Writer.create()) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W;
    writer.uint32(10).string(message.cid);
    if (((_a = message.message) == null ? void 0 : _a.$case) === "channel") {
      Channel.encode(message.message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (((_b = message.message) == null ? void 0 : _b.$case) === "channel_join") {
      ChannelJoin.encode(message.message.channel_join, writer.uint32(26).fork()).ldelim();
    }
    if (((_c = message.message) == null ? void 0 : _c.$case) === "channel_leave") {
      ChannelLeave.encode(message.message.channel_leave, writer.uint32(34).fork()).ldelim();
    }
    if (((_d = message.message) == null ? void 0 : _d.$case) === "channel_message") {
      ChannelMessage.encode(message.message.channel_message, writer.uint32(42).fork()).ldelim();
    }
    if (((_e = message.message) == null ? void 0 : _e.$case) === "channel_message_ack") {
      ChannelMessageAck.encode(message.message.channel_message_ack, writer.uint32(50).fork()).ldelim();
    }
    if (((_f = message.message) == null ? void 0 : _f.$case) === "channel_message_send") {
      ChannelMessageSend.encode(message.message.channel_message_send, writer.uint32(58).fork()).ldelim();
    }
    if (((_g = message.message) == null ? void 0 : _g.$case) === "channel_message_update") {
      ChannelMessageUpdate.encode(message.message.channel_message_update, writer.uint32(66).fork()).ldelim();
    }
    if (((_h = message.message) == null ? void 0 : _h.$case) === "channel_message_remove") {
      ChannelMessageRemove.encode(message.message.channel_message_remove, writer.uint32(74).fork()).ldelim();
    }
    if (((_i = message.message) == null ? void 0 : _i.$case) === "channel_presence_event") {
      ChannelPresenceEvent.encode(message.message.channel_presence_event, writer.uint32(82).fork()).ldelim();
    }
    if (((_j = message.message) == null ? void 0 : _j.$case) === "error") {
      Error2.encode(message.message.error, writer.uint32(90).fork()).ldelim();
    }
    if (((_k = message.message) == null ? void 0 : _k.$case) === "match") {
      Match.encode(message.message.match, writer.uint32(98).fork()).ldelim();
    }
    if (((_l = message.message) == null ? void 0 : _l.$case) === "match_create") {
      MatchCreate.encode(message.message.match_create, writer.uint32(106).fork()).ldelim();
    }
    if (((_m = message.message) == null ? void 0 : _m.$case) === "match_data") {
      MatchData.encode(message.message.match_data, writer.uint32(114).fork()).ldelim();
    }
    if (((_n = message.message) == null ? void 0 : _n.$case) === "match_data_send") {
      MatchDataSend.encode(message.message.match_data_send, writer.uint32(122).fork()).ldelim();
    }
    if (((_o = message.message) == null ? void 0 : _o.$case) === "match_join") {
      MatchJoin.encode(message.message.match_join, writer.uint32(130).fork()).ldelim();
    }
    if (((_p = message.message) == null ? void 0 : _p.$case) === "match_leave") {
      MatchLeave.encode(message.message.match_leave, writer.uint32(138).fork()).ldelim();
    }
    if (((_q = message.message) == null ? void 0 : _q.$case) === "match_presence_event") {
      MatchPresenceEvent.encode(message.message.match_presence_event, writer.uint32(146).fork()).ldelim();
    }
    if (((_r = message.message) == null ? void 0 : _r.$case) === "matchmaker_add") {
      MatchmakerAdd.encode(message.message.matchmaker_add, writer.uint32(154).fork()).ldelim();
    }
    if (((_s = message.message) == null ? void 0 : _s.$case) === "matchmaker_matched") {
      MatchmakerMatched.encode(message.message.matchmaker_matched, writer.uint32(162).fork()).ldelim();
    }
    if (((_t = message.message) == null ? void 0 : _t.$case) === "matchmaker_remove") {
      MatchmakerRemove.encode(message.message.matchmaker_remove, writer.uint32(170).fork()).ldelim();
    }
    if (((_u = message.message) == null ? void 0 : _u.$case) === "matchmaker_ticket") {
      MatchmakerTicket.encode(message.message.matchmaker_ticket, writer.uint32(178).fork()).ldelim();
    }
    if (((_v = message.message) == null ? void 0 : _v.$case) === "notifications") {
      Notifications.encode(message.message.notifications, writer.uint32(186).fork()).ldelim();
    }
    if (((_w = message.message) == null ? void 0 : _w.$case) === "rpc") {
      Rpc.encode(message.message.rpc, writer.uint32(194).fork()).ldelim();
    }
    if (((_x = message.message) == null ? void 0 : _x.$case) === "status") {
      Status.encode(message.message.status, writer.uint32(202).fork()).ldelim();
    }
    if (((_y = message.message) == null ? void 0 : _y.$case) === "status_follow") {
      StatusFollow.encode(message.message.status_follow, writer.uint32(210).fork()).ldelim();
    }
    if (((_z = message.message) == null ? void 0 : _z.$case) === "status_presence_event") {
      StatusPresenceEvent.encode(message.message.status_presence_event, writer.uint32(218).fork()).ldelim();
    }
    if (((_A = message.message) == null ? void 0 : _A.$case) === "status_unfollow") {
      StatusUnfollow.encode(message.message.status_unfollow, writer.uint32(226).fork()).ldelim();
    }
    if (((_B = message.message) == null ? void 0 : _B.$case) === "status_update") {
      StatusUpdate.encode(message.message.status_update, writer.uint32(234).fork()).ldelim();
    }
    if (((_C = message.message) == null ? void 0 : _C.$case) === "stream_data") {
      StreamData.encode(message.message.stream_data, writer.uint32(242).fork()).ldelim();
    }
    if (((_D = message.message) == null ? void 0 : _D.$case) === "stream_presence_event") {
      StreamPresenceEvent.encode(message.message.stream_presence_event, writer.uint32(250).fork()).ldelim();
    }
    if (((_E = message.message) == null ? void 0 : _E.$case) === "ping") {
      Ping.encode(message.message.ping, writer.uint32(258).fork()).ldelim();
    }
    if (((_F = message.message) == null ? void 0 : _F.$case) === "pong") {
      Pong.encode(message.message.pong, writer.uint32(266).fork()).ldelim();
    }
    if (((_G = message.message) == null ? void 0 : _G.$case) === "party") {
      Party.encode(message.message.party, writer.uint32(274).fork()).ldelim();
    }
    if (((_H = message.message) == null ? void 0 : _H.$case) === "party_create") {
      PartyCreate.encode(message.message.party_create, writer.uint32(282).fork()).ldelim();
    }
    if (((_I = message.message) == null ? void 0 : _I.$case) === "party_join") {
      PartyJoin.encode(message.message.party_join, writer.uint32(290).fork()).ldelim();
    }
    if (((_J = message.message) == null ? void 0 : _J.$case) === "party_leave") {
      PartyLeave.encode(message.message.party_leave, writer.uint32(298).fork()).ldelim();
    }
    if (((_K = message.message) == null ? void 0 : _K.$case) === "party_promote") {
      PartyPromote.encode(message.message.party_promote, writer.uint32(306).fork()).ldelim();
    }
    if (((_L = message.message) == null ? void 0 : _L.$case) === "party_leader") {
      PartyLeader.encode(message.message.party_leader, writer.uint32(314).fork()).ldelim();
    }
    if (((_M = message.message) == null ? void 0 : _M.$case) === "party_accept") {
      PartyAccept.encode(message.message.party_accept, writer.uint32(322).fork()).ldelim();
    }
    if (((_N = message.message) == null ? void 0 : _N.$case) === "party_remove") {
      PartyRemove.encode(message.message.party_remove, writer.uint32(330).fork()).ldelim();
    }
    if (((_O = message.message) == null ? void 0 : _O.$case) === "party_close") {
      PartyClose.encode(message.message.party_close, writer.uint32(338).fork()).ldelim();
    }
    if (((_P = message.message) == null ? void 0 : _P.$case) === "party_join_request_list") {
      PartyJoinRequestList.encode(message.message.party_join_request_list, writer.uint32(346).fork()).ldelim();
    }
    if (((_Q = message.message) == null ? void 0 : _Q.$case) === "party_join_request") {
      PartyJoinRequest.encode(message.message.party_join_request, writer.uint32(354).fork()).ldelim();
    }
    if (((_R = message.message) == null ? void 0 : _R.$case) === "party_matchmaker_add") {
      PartyMatchmakerAdd.encode(message.message.party_matchmaker_add, writer.uint32(362).fork()).ldelim();
    }
    if (((_S = message.message) == null ? void 0 : _S.$case) === "party_matchmaker_remove") {
      PartyMatchmakerRemove.encode(message.message.party_matchmaker_remove, writer.uint32(370).fork()).ldelim();
    }
    if (((_T = message.message) == null ? void 0 : _T.$case) === "party_matchmaker_ticket") {
      PartyMatchmakerTicket.encode(message.message.party_matchmaker_ticket, writer.uint32(378).fork()).ldelim();
    }
    if (((_U = message.message) == null ? void 0 : _U.$case) === "party_data") {
      PartyData.encode(message.message.party_data, writer.uint32(386).fork()).ldelim();
    }
    if (((_V = message.message) == null ? void 0 : _V.$case) === "party_data_send") {
      PartyDataSend.encode(message.message.party_data_send, writer.uint32(394).fork()).ldelim();
    }
    if (((_W = message.message) == null ? void 0 : _W.$case) === "party_presence_event") {
      PartyPresenceEvent.encode(message.message.party_presence_event, writer.uint32(402).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseEnvelope);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.message = {$case: "channel", channel: Channel.decode(reader, reader.uint32())};
          break;
        case 3:
          message.message = {$case: "channel_join", channel_join: ChannelJoin.decode(reader, reader.uint32())};
          break;
        case 4:
          message.message = {$case: "channel_leave", channel_leave: ChannelLeave.decode(reader, reader.uint32())};
          break;
        case 5:
          message.message = {$case: "channel_message", channel_message: ChannelMessage.decode(reader, reader.uint32())};
          break;
        case 6:
          message.message = {$case: "channel_message_ack", channel_message_ack: ChannelMessageAck.decode(reader, reader.uint32())};
          break;
        case 7:
          message.message = {$case: "channel_message_send", channel_message_send: ChannelMessageSend.decode(reader, reader.uint32())};
          break;
        case 8:
          message.message = {$case: "channel_message_update", channel_message_update: ChannelMessageUpdate.decode(reader, reader.uint32())};
          break;
        case 9:
          message.message = {$case: "channel_message_remove", channel_message_remove: ChannelMessageRemove.decode(reader, reader.uint32())};
          break;
        case 10:
          message.message = {$case: "channel_presence_event", channel_presence_event: ChannelPresenceEvent.decode(reader, reader.uint32())};
          break;
        case 11:
          message.message = {$case: "error", error: Error2.decode(reader, reader.uint32())};
          break;
        case 12:
          message.message = {$case: "match", match: Match.decode(reader, reader.uint32())};
          break;
        case 13:
          message.message = {$case: "match_create", match_create: MatchCreate.decode(reader, reader.uint32())};
          break;
        case 14:
          message.message = {$case: "match_data", match_data: MatchData.decode(reader, reader.uint32())};
          break;
        case 15:
          message.message = {$case: "match_data_send", match_data_send: MatchDataSend.decode(reader, reader.uint32())};
          break;
        case 16:
          message.message = {$case: "match_join", match_join: MatchJoin.decode(reader, reader.uint32())};
          break;
        case 17:
          message.message = {$case: "match_leave", match_leave: MatchLeave.decode(reader, reader.uint32())};
          break;
        case 18:
          message.message = {$case: "match_presence_event", match_presence_event: MatchPresenceEvent.decode(reader, reader.uint32())};
          break;
        case 19:
          message.message = {$case: "matchmaker_add", matchmaker_add: MatchmakerAdd.decode(reader, reader.uint32())};
          break;
        case 20:
          message.message = {$case: "matchmaker_matched", matchmaker_matched: MatchmakerMatched.decode(reader, reader.uint32())};
          break;
        case 21:
          message.message = {$case: "matchmaker_remove", matchmaker_remove: MatchmakerRemove.decode(reader, reader.uint32())};
          break;
        case 22:
          message.message = {$case: "matchmaker_ticket", matchmaker_ticket: MatchmakerTicket.decode(reader, reader.uint32())};
          break;
        case 23:
          message.message = {$case: "notifications", notifications: Notifications.decode(reader, reader.uint32())};
          break;
        case 24:
          message.message = {$case: "rpc", rpc: Rpc.decode(reader, reader.uint32())};
          break;
        case 25:
          message.message = {$case: "status", status: Status.decode(reader, reader.uint32())};
          break;
        case 26:
          message.message = {$case: "status_follow", status_follow: StatusFollow.decode(reader, reader.uint32())};
          break;
        case 27:
          message.message = {$case: "status_presence_event", status_presence_event: StatusPresenceEvent.decode(reader, reader.uint32())};
          break;
        case 28:
          message.message = {$case: "status_unfollow", status_unfollow: StatusUnfollow.decode(reader, reader.uint32())};
          break;
        case 29:
          message.message = {$case: "status_update", status_update: StatusUpdate.decode(reader, reader.uint32())};
          break;
        case 30:
          message.message = {$case: "stream_data", stream_data: StreamData.decode(reader, reader.uint32())};
          break;
        case 31:
          message.message = {$case: "stream_presence_event", stream_presence_event: StreamPresenceEvent.decode(reader, reader.uint32())};
          break;
        case 32:
          message.message = {$case: "ping", ping: Ping.decode(reader, reader.uint32())};
          break;
        case 33:
          message.message = {$case: "pong", pong: Pong.decode(reader, reader.uint32())};
          break;
        case 34:
          message.message = {$case: "party", party: Party.decode(reader, reader.uint32())};
          break;
        case 35:
          message.message = {$case: "party_create", party_create: PartyCreate.decode(reader, reader.uint32())};
          break;
        case 36:
          message.message = {$case: "party_join", party_join: PartyJoin.decode(reader, reader.uint32())};
          break;
        case 37:
          message.message = {$case: "party_leave", party_leave: PartyLeave.decode(reader, reader.uint32())};
          break;
        case 38:
          message.message = {$case: "party_promote", party_promote: PartyPromote.decode(reader, reader.uint32())};
          break;
        case 39:
          message.message = {$case: "party_leader", party_leader: PartyLeader.decode(reader, reader.uint32())};
          break;
        case 40:
          message.message = {$case: "party_accept", party_accept: PartyAccept.decode(reader, reader.uint32())};
          break;
        case 41:
          message.message = {$case: "party_remove", party_remove: PartyRemove.decode(reader, reader.uint32())};
          break;
        case 42:
          message.message = {$case: "party_close", party_close: PartyClose.decode(reader, reader.uint32())};
          break;
        case 43:
          message.message = {$case: "party_join_request_list", party_join_request_list: PartyJoinRequestList.decode(reader, reader.uint32())};
          break;
        case 44:
          message.message = {$case: "party_join_request", party_join_request: PartyJoinRequest.decode(reader, reader.uint32())};
          break;
        case 45:
          message.message = {$case: "party_matchmaker_add", party_matchmaker_add: PartyMatchmakerAdd.decode(reader, reader.uint32())};
          break;
        case 46:
          message.message = {$case: "party_matchmaker_remove", party_matchmaker_remove: PartyMatchmakerRemove.decode(reader, reader.uint32())};
          break;
        case 47:
          message.message = {$case: "party_matchmaker_ticket", party_matchmaker_ticket: PartyMatchmakerTicket.decode(reader, reader.uint32())};
          break;
        case 48:
          message.message = {$case: "party_data", party_data: PartyData.decode(reader, reader.uint32())};
          break;
        case 49:
          message.message = {$case: "party_data_send", party_data_send: PartyDataSend.decode(reader, reader.uint32())};
          break;
        case 50:
          message.message = {$case: "party_presence_event", party_presence_event: PartyPresenceEvent.decode(reader, reader.uint32())};
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseEnvelope);
    if (object.cid !== void 0 && object.cid !== null) {
      message.cid = String(object.cid);
    }
    if (object.channel !== void 0 && object.channel !== null) {
      message.message = {$case: "channel", channel: Channel.fromJSON(object.channel)};
    }
    if (object.channel_join !== void 0 && object.channel_join !== null) {
      message.message = {$case: "channel_join", channel_join: ChannelJoin.fromJSON(object.channel_join)};
    }
    if (object.channel_leave !== void 0 && object.channel_leave !== null) {
      message.message = {$case: "channel_leave", channel_leave: ChannelLeave.fromJSON(object.channel_leave)};
    }
    if (object.channel_message !== void 0 && object.channel_message !== null) {
      message.message = {$case: "channel_message", channel_message: ChannelMessage.fromJSON(object.channel_message)};
    }
    if (object.channel_message_ack !== void 0 && object.channel_message_ack !== null) {
      message.message = {$case: "channel_message_ack", channel_message_ack: ChannelMessageAck.fromJSON(object.channel_message_ack)};
    }
    if (object.channel_message_send !== void 0 && object.channel_message_send !== null) {
      message.message = {$case: "channel_message_send", channel_message_send: ChannelMessageSend.fromJSON(object.channel_message_send)};
    }
    if (object.channel_message_update !== void 0 && object.channel_message_update !== null) {
      message.message = {$case: "channel_message_update", channel_message_update: ChannelMessageUpdate.fromJSON(object.channel_message_update)};
    }
    if (object.channel_message_remove !== void 0 && object.channel_message_remove !== null) {
      message.message = {$case: "channel_message_remove", channel_message_remove: ChannelMessageRemove.fromJSON(object.channel_message_remove)};
    }
    if (object.channel_presence_event !== void 0 && object.channel_presence_event !== null) {
      message.message = {$case: "channel_presence_event", channel_presence_event: ChannelPresenceEvent.fromJSON(object.channel_presence_event)};
    }
    if (object.error !== void 0 && object.error !== null) {
      message.message = {$case: "error", error: Error2.fromJSON(object.error)};
    }
    if (object.match !== void 0 && object.match !== null) {
      message.message = {$case: "match", match: Match.fromJSON(object.match)};
    }
    if (object.match_create !== void 0 && object.match_create !== null) {
      message.message = {$case: "match_create", match_create: MatchCreate.fromJSON(object.match_create)};
    }
    if (object.match_data !== void 0 && object.match_data !== null) {
      message.message = {$case: "match_data", match_data: MatchData.fromJSON(object.match_data)};
    }
    if (object.match_data_send !== void 0 && object.match_data_send !== null) {
      message.message = {$case: "match_data_send", match_data_send: MatchDataSend.fromJSON(object.match_data_send)};
    }
    if (object.match_join !== void 0 && object.match_join !== null) {
      message.message = {$case: "match_join", match_join: MatchJoin.fromJSON(object.match_join)};
    }
    if (object.match_leave !== void 0 && object.match_leave !== null) {
      message.message = {$case: "match_leave", match_leave: MatchLeave.fromJSON(object.match_leave)};
    }
    if (object.match_presence_event !== void 0 && object.match_presence_event !== null) {
      message.message = {$case: "match_presence_event", match_presence_event: MatchPresenceEvent.fromJSON(object.match_presence_event)};
    }
    if (object.matchmaker_add !== void 0 && object.matchmaker_add !== null) {
      message.message = {$case: "matchmaker_add", matchmaker_add: MatchmakerAdd.fromJSON(object.matchmaker_add)};
    }
    if (object.matchmaker_matched !== void 0 && object.matchmaker_matched !== null) {
      message.message = {$case: "matchmaker_matched", matchmaker_matched: MatchmakerMatched.fromJSON(object.matchmaker_matched)};
    }
    if (object.matchmaker_remove !== void 0 && object.matchmaker_remove !== null) {
      message.message = {$case: "matchmaker_remove", matchmaker_remove: MatchmakerRemove.fromJSON(object.matchmaker_remove)};
    }
    if (object.matchmaker_ticket !== void 0 && object.matchmaker_ticket !== null) {
      message.message = {$case: "matchmaker_ticket", matchmaker_ticket: MatchmakerTicket.fromJSON(object.matchmaker_ticket)};
    }
    if (object.notifications !== void 0 && object.notifications !== null) {
      message.message = {$case: "notifications", notifications: Notifications.fromJSON(object.notifications)};
    }
    if (object.rpc !== void 0 && object.rpc !== null) {
      message.message = {$case: "rpc", rpc: Rpc.fromJSON(object.rpc)};
    }
    if (object.status !== void 0 && object.status !== null) {
      message.message = {$case: "status", status: Status.fromJSON(object.status)};
    }
    if (object.status_follow !== void 0 && object.status_follow !== null) {
      message.message = {$case: "status_follow", status_follow: StatusFollow.fromJSON(object.status_follow)};
    }
    if (object.status_presence_event !== void 0 && object.status_presence_event !== null) {
      message.message = {$case: "status_presence_event", status_presence_event: StatusPresenceEvent.fromJSON(object.status_presence_event)};
    }
    if (object.status_unfollow !== void 0 && object.status_unfollow !== null) {
      message.message = {$case: "status_unfollow", status_unfollow: StatusUnfollow.fromJSON(object.status_unfollow)};
    }
    if (object.status_update !== void 0 && object.status_update !== null) {
      message.message = {$case: "status_update", status_update: StatusUpdate.fromJSON(object.status_update)};
    }
    if (object.stream_data !== void 0 && object.stream_data !== null) {
      message.message = {$case: "stream_data", stream_data: StreamData.fromJSON(object.stream_data)};
    }
    if (object.stream_presence_event !== void 0 && object.stream_presence_event !== null) {
      message.message = {$case: "stream_presence_event", stream_presence_event: StreamPresenceEvent.fromJSON(object.stream_presence_event)};
    }
    if (object.ping !== void 0 && object.ping !== null) {
      message.message = {$case: "ping", ping: Ping.fromJSON(object.ping)};
    }
    if (object.pong !== void 0 && object.pong !== null) {
      message.message = {$case: "pong", pong: Pong.fromJSON(object.pong)};
    }
    if (object.party !== void 0 && object.party !== null) {
      message.message = {$case: "party", party: Party.fromJSON(object.party)};
    }
    if (object.party_create !== void 0 && object.party_create !== null) {
      message.message = {$case: "party_create", party_create: PartyCreate.fromJSON(object.party_create)};
    }
    if (object.party_join !== void 0 && object.party_join !== null) {
      message.message = {$case: "party_join", party_join: PartyJoin.fromJSON(object.party_join)};
    }
    if (object.party_leave !== void 0 && object.party_leave !== null) {
      message.message = {$case: "party_leave", party_leave: PartyLeave.fromJSON(object.party_leave)};
    }
    if (object.party_promote !== void 0 && object.party_promote !== null) {
      message.message = {$case: "party_promote", party_promote: PartyPromote.fromJSON(object.party_promote)};
    }
    if (object.party_leader !== void 0 && object.party_leader !== null) {
      message.message = {$case: "party_leader", party_leader: PartyLeader.fromJSON(object.party_leader)};
    }
    if (object.party_accept !== void 0 && object.party_accept !== null) {
      message.message = {$case: "party_accept", party_accept: PartyAccept.fromJSON(object.party_accept)};
    }
    if (object.party_remove !== void 0 && object.party_remove !== null) {
      message.message = {$case: "party_remove", party_remove: PartyRemove.fromJSON(object.party_remove)};
    }
    if (object.party_close !== void 0 && object.party_close !== null) {
      message.message = {$case: "party_close", party_close: PartyClose.fromJSON(object.party_close)};
    }
    if (object.party_join_request_list !== void 0 && object.party_join_request_list !== null) {
      message.message = {$case: "party_join_request_list", party_join_request_list: PartyJoinRequestList.fromJSON(object.party_join_request_list)};
    }
    if (object.party_join_request !== void 0 && object.party_join_request !== null) {
      message.message = {$case: "party_join_request", party_join_request: PartyJoinRequest.fromJSON(object.party_join_request)};
    }
    if (object.party_matchmaker_add !== void 0 && object.party_matchmaker_add !== null) {
      message.message = {$case: "party_matchmaker_add", party_matchmaker_add: PartyMatchmakerAdd.fromJSON(object.party_matchmaker_add)};
    }
    if (object.party_matchmaker_remove !== void 0 && object.party_matchmaker_remove !== null) {
      message.message = {$case: "party_matchmaker_remove", party_matchmaker_remove: PartyMatchmakerRemove.fromJSON(object.party_matchmaker_remove)};
    }
    if (object.party_matchmaker_ticket !== void 0 && object.party_matchmaker_ticket !== null) {
      message.message = {$case: "party_matchmaker_ticket", party_matchmaker_ticket: PartyMatchmakerTicket.fromJSON(object.party_matchmaker_ticket)};
    }
    if (object.party_data !== void 0 && object.party_data !== null) {
      message.message = {$case: "party_data", party_data: PartyData.fromJSON(object.party_data)};
    }
    if (object.party_data_send !== void 0 && object.party_data_send !== null) {
      message.message = {$case: "party_data_send", party_data_send: PartyDataSend.fromJSON(object.party_data_send)};
    }
    if (object.party_presence_event !== void 0 && object.party_presence_event !== null) {
      message.message = {$case: "party_presence_event", party_presence_event: PartyPresenceEvent.fromJSON(object.party_presence_event)};
    }
    return message;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb, _yb, _zb, _Ab, _Bb, _Cb, _Db, _Eb, _Fb, _Gb, _Hb, _Ib, _Jb, _Kb, _Lb, _Mb;
    const message = __spreadValues({}, baseEnvelope);
    if (object.cid !== void 0 && object.cid !== null) {
      message.cid = object.cid;
    }
    if (((_a = object.message) == null ? void 0 : _a.$case) === "channel" && ((_b = object.message) == null ? void 0 : _b.channel) !== void 0 && ((_c = object.message) == null ? void 0 : _c.channel) !== null) {
      message.message = {$case: "channel", channel: Channel.fromPartial(object.message.channel)};
    }
    if (((_d = object.message) == null ? void 0 : _d.$case) === "channel_join" && ((_e = object.message) == null ? void 0 : _e.channel_join) !== void 0 && ((_f = object.message) == null ? void 0 : _f.channel_join) !== null) {
      message.message = {$case: "channel_join", channel_join: ChannelJoin.fromPartial(object.message.channel_join)};
    }
    if (((_g = object.message) == null ? void 0 : _g.$case) === "channel_leave" && ((_h = object.message) == null ? void 0 : _h.channel_leave) !== void 0 && ((_i = object.message) == null ? void 0 : _i.channel_leave) !== null) {
      message.message = {$case: "channel_leave", channel_leave: ChannelLeave.fromPartial(object.message.channel_leave)};
    }
    if (((_j = object.message) == null ? void 0 : _j.$case) === "channel_message" && ((_k = object.message) == null ? void 0 : _k.channel_message) !== void 0 && ((_l = object.message) == null ? void 0 : _l.channel_message) !== null) {
      message.message = {$case: "channel_message", channel_message: ChannelMessage.fromPartial(object.message.channel_message)};
    }
    if (((_m = object.message) == null ? void 0 : _m.$case) === "channel_message_ack" && ((_n = object.message) == null ? void 0 : _n.channel_message_ack) !== void 0 && ((_o = object.message) == null ? void 0 : _o.channel_message_ack) !== null) {
      message.message = {$case: "channel_message_ack", channel_message_ack: ChannelMessageAck.fromPartial(object.message.channel_message_ack)};
    }
    if (((_p = object.message) == null ? void 0 : _p.$case) === "channel_message_send" && ((_q = object.message) == null ? void 0 : _q.channel_message_send) !== void 0 && ((_r = object.message) == null ? void 0 : _r.channel_message_send) !== null) {
      message.message = {$case: "channel_message_send", channel_message_send: ChannelMessageSend.fromPartial(object.message.channel_message_send)};
    }
    if (((_s = object.message) == null ? void 0 : _s.$case) === "channel_message_update" && ((_t = object.message) == null ? void 0 : _t.channel_message_update) !== void 0 && ((_u = object.message) == null ? void 0 : _u.channel_message_update) !== null) {
      message.message = {$case: "channel_message_update", channel_message_update: ChannelMessageUpdate.fromPartial(object.message.channel_message_update)};
    }
    if (((_v = object.message) == null ? void 0 : _v.$case) === "channel_message_remove" && ((_w = object.message) == null ? void 0 : _w.channel_message_remove) !== void 0 && ((_x = object.message) == null ? void 0 : _x.channel_message_remove) !== null) {
      message.message = {$case: "channel_message_remove", channel_message_remove: ChannelMessageRemove.fromPartial(object.message.channel_message_remove)};
    }
    if (((_y = object.message) == null ? void 0 : _y.$case) === "channel_presence_event" && ((_z = object.message) == null ? void 0 : _z.channel_presence_event) !== void 0 && ((_A = object.message) == null ? void 0 : _A.channel_presence_event) !== null) {
      message.message = {$case: "channel_presence_event", channel_presence_event: ChannelPresenceEvent.fromPartial(object.message.channel_presence_event)};
    }
    if (((_B = object.message) == null ? void 0 : _B.$case) === "error" && ((_C = object.message) == null ? void 0 : _C.error) !== void 0 && ((_D = object.message) == null ? void 0 : _D.error) !== null) {
      message.message = {$case: "error", error: Error2.fromPartial(object.message.error)};
    }
    if (((_E = object.message) == null ? void 0 : _E.$case) === "match" && ((_F = object.message) == null ? void 0 : _F.match) !== void 0 && ((_G = object.message) == null ? void 0 : _G.match) !== null) {
      message.message = {$case: "match", match: Match.fromPartial(object.message.match)};
    }
    if (((_H = object.message) == null ? void 0 : _H.$case) === "match_create" && ((_I = object.message) == null ? void 0 : _I.match_create) !== void 0 && ((_J = object.message) == null ? void 0 : _J.match_create) !== null) {
      message.message = {$case: "match_create", match_create: MatchCreate.fromPartial(object.message.match_create)};
    }
    if (((_K = object.message) == null ? void 0 : _K.$case) === "match_data" && ((_L = object.message) == null ? void 0 : _L.match_data) !== void 0 && ((_M = object.message) == null ? void 0 : _M.match_data) !== null) {
      message.message = {$case: "match_data", match_data: MatchData.fromPartial(object.message.match_data)};
    }
    if (((_N = object.message) == null ? void 0 : _N.$case) === "match_data_send" && ((_O = object.message) == null ? void 0 : _O.match_data_send) !== void 0 && ((_P = object.message) == null ? void 0 : _P.match_data_send) !== null) {
      message.message = {$case: "match_data_send", match_data_send: MatchDataSend.fromPartial(object.message.match_data_send)};
    }
    if (((_Q = object.message) == null ? void 0 : _Q.$case) === "match_join" && ((_R = object.message) == null ? void 0 : _R.match_join) !== void 0 && ((_S = object.message) == null ? void 0 : _S.match_join) !== null) {
      message.message = {$case: "match_join", match_join: MatchJoin.fromPartial(object.message.match_join)};
    }
    if (((_T = object.message) == null ? void 0 : _T.$case) === "match_leave" && ((_U = object.message) == null ? void 0 : _U.match_leave) !== void 0 && ((_V = object.message) == null ? void 0 : _V.match_leave) !== null) {
      message.message = {$case: "match_leave", match_leave: MatchLeave.fromPartial(object.message.match_leave)};
    }
    if (((_W = object.message) == null ? void 0 : _W.$case) === "match_presence_event" && ((_X = object.message) == null ? void 0 : _X.match_presence_event) !== void 0 && ((_Y = object.message) == null ? void 0 : _Y.match_presence_event) !== null) {
      message.message = {$case: "match_presence_event", match_presence_event: MatchPresenceEvent.fromPartial(object.message.match_presence_event)};
    }
    if (((_Z = object.message) == null ? void 0 : _Z.$case) === "matchmaker_add" && ((__ = object.message) == null ? void 0 : __.matchmaker_add) !== void 0 && ((_$ = object.message) == null ? void 0 : _$.matchmaker_add) !== null) {
      message.message = {$case: "matchmaker_add", matchmaker_add: MatchmakerAdd.fromPartial(object.message.matchmaker_add)};
    }
    if (((_aa = object.message) == null ? void 0 : _aa.$case) === "matchmaker_matched" && ((_ba = object.message) == null ? void 0 : _ba.matchmaker_matched) !== void 0 && ((_ca = object.message) == null ? void 0 : _ca.matchmaker_matched) !== null) {
      message.message = {$case: "matchmaker_matched", matchmaker_matched: MatchmakerMatched.fromPartial(object.message.matchmaker_matched)};
    }
    if (((_da = object.message) == null ? void 0 : _da.$case) === "matchmaker_remove" && ((_ea = object.message) == null ? void 0 : _ea.matchmaker_remove) !== void 0 && ((_fa = object.message) == null ? void 0 : _fa.matchmaker_remove) !== null) {
      message.message = {$case: "matchmaker_remove", matchmaker_remove: MatchmakerRemove.fromPartial(object.message.matchmaker_remove)};
    }
    if (((_ga = object.message) == null ? void 0 : _ga.$case) === "matchmaker_ticket" && ((_ha = object.message) == null ? void 0 : _ha.matchmaker_ticket) !== void 0 && ((_ia = object.message) == null ? void 0 : _ia.matchmaker_ticket) !== null) {
      message.message = {$case: "matchmaker_ticket", matchmaker_ticket: MatchmakerTicket.fromPartial(object.message.matchmaker_ticket)};
    }
    if (((_ja = object.message) == null ? void 0 : _ja.$case) === "notifications" && ((_ka = object.message) == null ? void 0 : _ka.notifications) !== void 0 && ((_la = object.message) == null ? void 0 : _la.notifications) !== null) {
      message.message = {$case: "notifications", notifications: Notifications.fromPartial(object.message.notifications)};
    }
    if (((_ma = object.message) == null ? void 0 : _ma.$case) === "rpc" && ((_na = object.message) == null ? void 0 : _na.rpc) !== void 0 && ((_oa = object.message) == null ? void 0 : _oa.rpc) !== null) {
      message.message = {$case: "rpc", rpc: Rpc.fromPartial(object.message.rpc)};
    }
    if (((_pa = object.message) == null ? void 0 : _pa.$case) === "status" && ((_qa = object.message) == null ? void 0 : _qa.status) !== void 0 && ((_ra = object.message) == null ? void 0 : _ra.status) !== null) {
      message.message = {$case: "status", status: Status.fromPartial(object.message.status)};
    }
    if (((_sa = object.message) == null ? void 0 : _sa.$case) === "status_follow" && ((_ta = object.message) == null ? void 0 : _ta.status_follow) !== void 0 && ((_ua = object.message) == null ? void 0 : _ua.status_follow) !== null) {
      message.message = {$case: "status_follow", status_follow: StatusFollow.fromPartial(object.message.status_follow)};
    }
    if (((_va = object.message) == null ? void 0 : _va.$case) === "status_presence_event" && ((_wa = object.message) == null ? void 0 : _wa.status_presence_event) !== void 0 && ((_xa = object.message) == null ? void 0 : _xa.status_presence_event) !== null) {
      message.message = {$case: "status_presence_event", status_presence_event: StatusPresenceEvent.fromPartial(object.message.status_presence_event)};
    }
    if (((_ya = object.message) == null ? void 0 : _ya.$case) === "status_unfollow" && ((_za = object.message) == null ? void 0 : _za.status_unfollow) !== void 0 && ((_Aa = object.message) == null ? void 0 : _Aa.status_unfollow) !== null) {
      message.message = {$case: "status_unfollow", status_unfollow: StatusUnfollow.fromPartial(object.message.status_unfollow)};
    }
    if (((_Ba = object.message) == null ? void 0 : _Ba.$case) === "status_update" && ((_Ca = object.message) == null ? void 0 : _Ca.status_update) !== void 0 && ((_Da = object.message) == null ? void 0 : _Da.status_update) !== null) {
      message.message = {$case: "status_update", status_update: StatusUpdate.fromPartial(object.message.status_update)};
    }
    if (((_Ea = object.message) == null ? void 0 : _Ea.$case) === "stream_data" && ((_Fa = object.message) == null ? void 0 : _Fa.stream_data) !== void 0 && ((_Ga = object.message) == null ? void 0 : _Ga.stream_data) !== null) {
      message.message = {$case: "stream_data", stream_data: StreamData.fromPartial(object.message.stream_data)};
    }
    if (((_Ha = object.message) == null ? void 0 : _Ha.$case) === "stream_presence_event" && ((_Ia = object.message) == null ? void 0 : _Ia.stream_presence_event) !== void 0 && ((_Ja = object.message) == null ? void 0 : _Ja.stream_presence_event) !== null) {
      message.message = {$case: "stream_presence_event", stream_presence_event: StreamPresenceEvent.fromPartial(object.message.stream_presence_event)};
    }
    if (((_Ka = object.message) == null ? void 0 : _Ka.$case) === "ping" && ((_La = object.message) == null ? void 0 : _La.ping) !== void 0 && ((_Ma = object.message) == null ? void 0 : _Ma.ping) !== null) {
      message.message = {$case: "ping", ping: Ping.fromPartial(object.message.ping)};
    }
    if (((_Na = object.message) == null ? void 0 : _Na.$case) === "pong" && ((_Oa = object.message) == null ? void 0 : _Oa.pong) !== void 0 && ((_Pa = object.message) == null ? void 0 : _Pa.pong) !== null) {
      message.message = {$case: "pong", pong: Pong.fromPartial(object.message.pong)};
    }
    if (((_Qa = object.message) == null ? void 0 : _Qa.$case) === "party" && ((_Ra = object.message) == null ? void 0 : _Ra.party) !== void 0 && ((_Sa = object.message) == null ? void 0 : _Sa.party) !== null) {
      message.message = {$case: "party", party: Party.fromPartial(object.message.party)};
    }
    if (((_Ta = object.message) == null ? void 0 : _Ta.$case) === "party_create" && ((_Ua = object.message) == null ? void 0 : _Ua.party_create) !== void 0 && ((_Va = object.message) == null ? void 0 : _Va.party_create) !== null) {
      message.message = {$case: "party_create", party_create: PartyCreate.fromPartial(object.message.party_create)};
    }
    if (((_Wa = object.message) == null ? void 0 : _Wa.$case) === "party_join" && ((_Xa = object.message) == null ? void 0 : _Xa.party_join) !== void 0 && ((_Ya = object.message) == null ? void 0 : _Ya.party_join) !== null) {
      message.message = {$case: "party_join", party_join: PartyJoin.fromPartial(object.message.party_join)};
    }
    if (((_Za = object.message) == null ? void 0 : _Za.$case) === "party_leave" && ((__a = object.message) == null ? void 0 : __a.party_leave) !== void 0 && ((_$a = object.message) == null ? void 0 : _$a.party_leave) !== null) {
      message.message = {$case: "party_leave", party_leave: PartyLeave.fromPartial(object.message.party_leave)};
    }
    if (((_ab = object.message) == null ? void 0 : _ab.$case) === "party_promote" && ((_bb = object.message) == null ? void 0 : _bb.party_promote) !== void 0 && ((_cb = object.message) == null ? void 0 : _cb.party_promote) !== null) {
      message.message = {$case: "party_promote", party_promote: PartyPromote.fromPartial(object.message.party_promote)};
    }
    if (((_db = object.message) == null ? void 0 : _db.$case) === "party_leader" && ((_eb = object.message) == null ? void 0 : _eb.party_leader) !== void 0 && ((_fb = object.message) == null ? void 0 : _fb.party_leader) !== null) {
      message.message = {$case: "party_leader", party_leader: PartyLeader.fromPartial(object.message.party_leader)};
    }
    if (((_gb = object.message) == null ? void 0 : _gb.$case) === "party_accept" && ((_hb = object.message) == null ? void 0 : _hb.party_accept) !== void 0 && ((_ib = object.message) == null ? void 0 : _ib.party_accept) !== null) {
      message.message = {$case: "party_accept", party_accept: PartyAccept.fromPartial(object.message.party_accept)};
    }
    if (((_jb = object.message) == null ? void 0 : _jb.$case) === "party_remove" && ((_kb = object.message) == null ? void 0 : _kb.party_remove) !== void 0 && ((_lb = object.message) == null ? void 0 : _lb.party_remove) !== null) {
      message.message = {$case: "party_remove", party_remove: PartyRemove.fromPartial(object.message.party_remove)};
    }
    if (((_mb = object.message) == null ? void 0 : _mb.$case) === "party_close" && ((_nb = object.message) == null ? void 0 : _nb.party_close) !== void 0 && ((_ob = object.message) == null ? void 0 : _ob.party_close) !== null) {
      message.message = {$case: "party_close", party_close: PartyClose.fromPartial(object.message.party_close)};
    }
    if (((_pb = object.message) == null ? void 0 : _pb.$case) === "party_join_request_list" && ((_qb = object.message) == null ? void 0 : _qb.party_join_request_list) !== void 0 && ((_rb = object.message) == null ? void 0 : _rb.party_join_request_list) !== null) {
      message.message = {$case: "party_join_request_list", party_join_request_list: PartyJoinRequestList.fromPartial(object.message.party_join_request_list)};
    }
    if (((_sb = object.message) == null ? void 0 : _sb.$case) === "party_join_request" && ((_tb = object.message) == null ? void 0 : _tb.party_join_request) !== void 0 && ((_ub = object.message) == null ? void 0 : _ub.party_join_request) !== null) {
      message.message = {$case: "party_join_request", party_join_request: PartyJoinRequest.fromPartial(object.message.party_join_request)};
    }
    if (((_vb = object.message) == null ? void 0 : _vb.$case) === "party_matchmaker_add" && ((_wb = object.message) == null ? void 0 : _wb.party_matchmaker_add) !== void 0 && ((_xb = object.message) == null ? void 0 : _xb.party_matchmaker_add) !== null) {
      message.message = {$case: "party_matchmaker_add", party_matchmaker_add: PartyMatchmakerAdd.fromPartial(object.message.party_matchmaker_add)};
    }
    if (((_yb = object.message) == null ? void 0 : _yb.$case) === "party_matchmaker_remove" && ((_zb = object.message) == null ? void 0 : _zb.party_matchmaker_remove) !== void 0 && ((_Ab = object.message) == null ? void 0 : _Ab.party_matchmaker_remove) !== null) {
      message.message = {$case: "party_matchmaker_remove", party_matchmaker_remove: PartyMatchmakerRemove.fromPartial(object.message.party_matchmaker_remove)};
    }
    if (((_Bb = object.message) == null ? void 0 : _Bb.$case) === "party_matchmaker_ticket" && ((_Cb = object.message) == null ? void 0 : _Cb.party_matchmaker_ticket) !== void 0 && ((_Db = object.message) == null ? void 0 : _Db.party_matchmaker_ticket) !== null) {
      message.message = {$case: "party_matchmaker_ticket", party_matchmaker_ticket: PartyMatchmakerTicket.fromPartial(object.message.party_matchmaker_ticket)};
    }
    if (((_Eb = object.message) == null ? void 0 : _Eb.$case) === "party_data" && ((_Fb = object.message) == null ? void 0 : _Fb.party_data) !== void 0 && ((_Gb = object.message) == null ? void 0 : _Gb.party_data) !== null) {
      message.message = {$case: "party_data", party_data: PartyData.fromPartial(object.message.party_data)};
    }
    if (((_Hb = object.message) == null ? void 0 : _Hb.$case) === "party_data_send" && ((_Ib = object.message) == null ? void 0 : _Ib.party_data_send) !== void 0 && ((_Jb = object.message) == null ? void 0 : _Jb.party_data_send) !== null) {
      message.message = {$case: "party_data_send", party_data_send: PartyDataSend.fromPartial(object.message.party_data_send)};
    }
    if (((_Kb = object.message) == null ? void 0 : _Kb.$case) === "party_presence_event" && ((_Lb = object.message) == null ? void 0 : _Lb.party_presence_event) !== void 0 && ((_Mb = object.message) == null ? void 0 : _Mb.party_presence_event) !== null) {
      message.message = {$case: "party_presence_event", party_presence_event: PartyPresenceEvent.fromPartial(object.message.party_presence_event)};
    }
    return message;
  },
  toJSON(message) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb, _yb, _zb, _Ab, _Bb, _Cb, _Db, _Eb, _Fb, _Gb, _Hb, _Ib, _Jb, _Kb, _Lb, _Mb;
    const obj = {};
    message.cid !== void 0 && (obj.cid = message.cid);
    ((_a = message.message) == null ? void 0 : _a.$case) === "channel" && (obj.channel = ((_b = message.message) == null ? void 0 : _b.channel) ? Channel.toJSON((_c = message.message) == null ? void 0 : _c.channel) : void 0);
    ((_d = message.message) == null ? void 0 : _d.$case) === "channel_join" && (obj.channel_join = ((_e = message.message) == null ? void 0 : _e.channel_join) ? ChannelJoin.toJSON((_f = message.message) == null ? void 0 : _f.channel_join) : void 0);
    ((_g = message.message) == null ? void 0 : _g.$case) === "channel_leave" && (obj.channel_leave = ((_h = message.message) == null ? void 0 : _h.channel_leave) ? ChannelLeave.toJSON((_i = message.message) == null ? void 0 : _i.channel_leave) : void 0);
    ((_j = message.message) == null ? void 0 : _j.$case) === "channel_message" && (obj.channel_message = ((_k = message.message) == null ? void 0 : _k.channel_message) ? ChannelMessage.toJSON((_l = message.message) == null ? void 0 : _l.channel_message) : void 0);
    ((_m = message.message) == null ? void 0 : _m.$case) === "channel_message_ack" && (obj.channel_message_ack = ((_n = message.message) == null ? void 0 : _n.channel_message_ack) ? ChannelMessageAck.toJSON((_o = message.message) == null ? void 0 : _o.channel_message_ack) : void 0);
    ((_p = message.message) == null ? void 0 : _p.$case) === "channel_message_send" && (obj.channel_message_send = ((_q = message.message) == null ? void 0 : _q.channel_message_send) ? ChannelMessageSend.toJSON((_r = message.message) == null ? void 0 : _r.channel_message_send) : void 0);
    ((_s = message.message) == null ? void 0 : _s.$case) === "channel_message_update" && (obj.channel_message_update = ((_t = message.message) == null ? void 0 : _t.channel_message_update) ? ChannelMessageUpdate.toJSON((_u = message.message) == null ? void 0 : _u.channel_message_update) : void 0);
    ((_v = message.message) == null ? void 0 : _v.$case) === "channel_message_remove" && (obj.channel_message_remove = ((_w = message.message) == null ? void 0 : _w.channel_message_remove) ? ChannelMessageRemove.toJSON((_x = message.message) == null ? void 0 : _x.channel_message_remove) : void 0);
    ((_y = message.message) == null ? void 0 : _y.$case) === "channel_presence_event" && (obj.channel_presence_event = ((_z = message.message) == null ? void 0 : _z.channel_presence_event) ? ChannelPresenceEvent.toJSON((_A = message.message) == null ? void 0 : _A.channel_presence_event) : void 0);
    ((_B = message.message) == null ? void 0 : _B.$case) === "error" && (obj.error = ((_C = message.message) == null ? void 0 : _C.error) ? Error2.toJSON((_D = message.message) == null ? void 0 : _D.error) : void 0);
    ((_E = message.message) == null ? void 0 : _E.$case) === "match" && (obj.match = ((_F = message.message) == null ? void 0 : _F.match) ? Match.toJSON((_G = message.message) == null ? void 0 : _G.match) : void 0);
    ((_H = message.message) == null ? void 0 : _H.$case) === "match_create" && (obj.match_create = ((_I = message.message) == null ? void 0 : _I.match_create) ? MatchCreate.toJSON((_J = message.message) == null ? void 0 : _J.match_create) : void 0);
    ((_K = message.message) == null ? void 0 : _K.$case) === "match_data" && (obj.match_data = ((_L = message.message) == null ? void 0 : _L.match_data) ? MatchData.toJSON((_M = message.message) == null ? void 0 : _M.match_data) : void 0);
    ((_N = message.message) == null ? void 0 : _N.$case) === "match_data_send" && (obj.match_data_send = ((_O = message.message) == null ? void 0 : _O.match_data_send) ? MatchDataSend.toJSON((_P = message.message) == null ? void 0 : _P.match_data_send) : void 0);
    ((_Q = message.message) == null ? void 0 : _Q.$case) === "match_join" && (obj.match_join = ((_R = message.message) == null ? void 0 : _R.match_join) ? MatchJoin.toJSON((_S = message.message) == null ? void 0 : _S.match_join) : void 0);
    ((_T = message.message) == null ? void 0 : _T.$case) === "match_leave" && (obj.match_leave = ((_U = message.message) == null ? void 0 : _U.match_leave) ? MatchLeave.toJSON((_V = message.message) == null ? void 0 : _V.match_leave) : void 0);
    ((_W = message.message) == null ? void 0 : _W.$case) === "match_presence_event" && (obj.match_presence_event = ((_X = message.message) == null ? void 0 : _X.match_presence_event) ? MatchPresenceEvent.toJSON((_Y = message.message) == null ? void 0 : _Y.match_presence_event) : void 0);
    ((_Z = message.message) == null ? void 0 : _Z.$case) === "matchmaker_add" && (obj.matchmaker_add = ((__ = message.message) == null ? void 0 : __.matchmaker_add) ? MatchmakerAdd.toJSON((_$ = message.message) == null ? void 0 : _$.matchmaker_add) : void 0);
    ((_aa = message.message) == null ? void 0 : _aa.$case) === "matchmaker_matched" && (obj.matchmaker_matched = ((_ba = message.message) == null ? void 0 : _ba.matchmaker_matched) ? MatchmakerMatched.toJSON((_ca = message.message) == null ? void 0 : _ca.matchmaker_matched) : void 0);
    ((_da = message.message) == null ? void 0 : _da.$case) === "matchmaker_remove" && (obj.matchmaker_remove = ((_ea = message.message) == null ? void 0 : _ea.matchmaker_remove) ? MatchmakerRemove.toJSON((_fa = message.message) == null ? void 0 : _fa.matchmaker_remove) : void 0);
    ((_ga = message.message) == null ? void 0 : _ga.$case) === "matchmaker_ticket" && (obj.matchmaker_ticket = ((_ha = message.message) == null ? void 0 : _ha.matchmaker_ticket) ? MatchmakerTicket.toJSON((_ia = message.message) == null ? void 0 : _ia.matchmaker_ticket) : void 0);
    ((_ja = message.message) == null ? void 0 : _ja.$case) === "notifications" && (obj.notifications = ((_ka = message.message) == null ? void 0 : _ka.notifications) ? Notifications.toJSON((_la = message.message) == null ? void 0 : _la.notifications) : void 0);
    ((_ma = message.message) == null ? void 0 : _ma.$case) === "rpc" && (obj.rpc = ((_na = message.message) == null ? void 0 : _na.rpc) ? Rpc.toJSON((_oa = message.message) == null ? void 0 : _oa.rpc) : void 0);
    ((_pa = message.message) == null ? void 0 : _pa.$case) === "status" && (obj.status = ((_qa = message.message) == null ? void 0 : _qa.status) ? Status.toJSON((_ra = message.message) == null ? void 0 : _ra.status) : void 0);
    ((_sa = message.message) == null ? void 0 : _sa.$case) === "status_follow" && (obj.status_follow = ((_ta = message.message) == null ? void 0 : _ta.status_follow) ? StatusFollow.toJSON((_ua = message.message) == null ? void 0 : _ua.status_follow) : void 0);
    ((_va = message.message) == null ? void 0 : _va.$case) === "status_presence_event" && (obj.status_presence_event = ((_wa = message.message) == null ? void 0 : _wa.status_presence_event) ? StatusPresenceEvent.toJSON((_xa = message.message) == null ? void 0 : _xa.status_presence_event) : void 0);
    ((_ya = message.message) == null ? void 0 : _ya.$case) === "status_unfollow" && (obj.status_unfollow = ((_za = message.message) == null ? void 0 : _za.status_unfollow) ? StatusUnfollow.toJSON((_Aa = message.message) == null ? void 0 : _Aa.status_unfollow) : void 0);
    ((_Ba = message.message) == null ? void 0 : _Ba.$case) === "status_update" && (obj.status_update = ((_Ca = message.message) == null ? void 0 : _Ca.status_update) ? StatusUpdate.toJSON((_Da = message.message) == null ? void 0 : _Da.status_update) : void 0);
    ((_Ea = message.message) == null ? void 0 : _Ea.$case) === "stream_data" && (obj.stream_data = ((_Fa = message.message) == null ? void 0 : _Fa.stream_data) ? StreamData.toJSON((_Ga = message.message) == null ? void 0 : _Ga.stream_data) : void 0);
    ((_Ha = message.message) == null ? void 0 : _Ha.$case) === "stream_presence_event" && (obj.stream_presence_event = ((_Ia = message.message) == null ? void 0 : _Ia.stream_presence_event) ? StreamPresenceEvent.toJSON((_Ja = message.message) == null ? void 0 : _Ja.stream_presence_event) : void 0);
    ((_Ka = message.message) == null ? void 0 : _Ka.$case) === "ping" && (obj.ping = ((_La = message.message) == null ? void 0 : _La.ping) ? Ping.toJSON((_Ma = message.message) == null ? void 0 : _Ma.ping) : void 0);
    ((_Na = message.message) == null ? void 0 : _Na.$case) === "pong" && (obj.pong = ((_Oa = message.message) == null ? void 0 : _Oa.pong) ? Pong.toJSON((_Pa = message.message) == null ? void 0 : _Pa.pong) : void 0);
    ((_Qa = message.message) == null ? void 0 : _Qa.$case) === "party" && (obj.party = ((_Ra = message.message) == null ? void 0 : _Ra.party) ? Party.toJSON((_Sa = message.message) == null ? void 0 : _Sa.party) : void 0);
    ((_Ta = message.message) == null ? void 0 : _Ta.$case) === "party_create" && (obj.party_create = ((_Ua = message.message) == null ? void 0 : _Ua.party_create) ? PartyCreate.toJSON((_Va = message.message) == null ? void 0 : _Va.party_create) : void 0);
    ((_Wa = message.message) == null ? void 0 : _Wa.$case) === "party_join" && (obj.party_join = ((_Xa = message.message) == null ? void 0 : _Xa.party_join) ? PartyJoin.toJSON((_Ya = message.message) == null ? void 0 : _Ya.party_join) : void 0);
    ((_Za = message.message) == null ? void 0 : _Za.$case) === "party_leave" && (obj.party_leave = ((__a = message.message) == null ? void 0 : __a.party_leave) ? PartyLeave.toJSON((_$a = message.message) == null ? void 0 : _$a.party_leave) : void 0);
    ((_ab = message.message) == null ? void 0 : _ab.$case) === "party_promote" && (obj.party_promote = ((_bb = message.message) == null ? void 0 : _bb.party_promote) ? PartyPromote.toJSON((_cb = message.message) == null ? void 0 : _cb.party_promote) : void 0);
    ((_db = message.message) == null ? void 0 : _db.$case) === "party_leader" && (obj.party_leader = ((_eb = message.message) == null ? void 0 : _eb.party_leader) ? PartyLeader.toJSON((_fb = message.message) == null ? void 0 : _fb.party_leader) : void 0);
    ((_gb = message.message) == null ? void 0 : _gb.$case) === "party_accept" && (obj.party_accept = ((_hb = message.message) == null ? void 0 : _hb.party_accept) ? PartyAccept.toJSON((_ib = message.message) == null ? void 0 : _ib.party_accept) : void 0);
    ((_jb = message.message) == null ? void 0 : _jb.$case) === "party_remove" && (obj.party_remove = ((_kb = message.message) == null ? void 0 : _kb.party_remove) ? PartyRemove.toJSON((_lb = message.message) == null ? void 0 : _lb.party_remove) : void 0);
    ((_mb = message.message) == null ? void 0 : _mb.$case) === "party_close" && (obj.party_close = ((_nb = message.message) == null ? void 0 : _nb.party_close) ? PartyClose.toJSON((_ob = message.message) == null ? void 0 : _ob.party_close) : void 0);
    ((_pb = message.message) == null ? void 0 : _pb.$case) === "party_join_request_list" && (obj.party_join_request_list = ((_qb = message.message) == null ? void 0 : _qb.party_join_request_list) ? PartyJoinRequestList.toJSON((_rb = message.message) == null ? void 0 : _rb.party_join_request_list) : void 0);
    ((_sb = message.message) == null ? void 0 : _sb.$case) === "party_join_request" && (obj.party_join_request = ((_tb = message.message) == null ? void 0 : _tb.party_join_request) ? PartyJoinRequest.toJSON((_ub = message.message) == null ? void 0 : _ub.party_join_request) : void 0);
    ((_vb = message.message) == null ? void 0 : _vb.$case) === "party_matchmaker_add" && (obj.party_matchmaker_add = ((_wb = message.message) == null ? void 0 : _wb.party_matchmaker_add) ? PartyMatchmakerAdd.toJSON((_xb = message.message) == null ? void 0 : _xb.party_matchmaker_add) : void 0);
    ((_yb = message.message) == null ? void 0 : _yb.$case) === "party_matchmaker_remove" && (obj.party_matchmaker_remove = ((_zb = message.message) == null ? void 0 : _zb.party_matchmaker_remove) ? PartyMatchmakerRemove.toJSON((_Ab = message.message) == null ? void 0 : _Ab.party_matchmaker_remove) : void 0);
    ((_Bb = message.message) == null ? void 0 : _Bb.$case) === "party_matchmaker_ticket" && (obj.party_matchmaker_ticket = ((_Cb = message.message) == null ? void 0 : _Cb.party_matchmaker_ticket) ? PartyMatchmakerTicket.toJSON((_Db = message.message) == null ? void 0 : _Db.party_matchmaker_ticket) : void 0);
    ((_Eb = message.message) == null ? void 0 : _Eb.$case) === "party_data" && (obj.party_data = ((_Fb = message.message) == null ? void 0 : _Fb.party_data) ? PartyData.toJSON((_Gb = message.message) == null ? void 0 : _Gb.party_data) : void 0);
    ((_Hb = message.message) == null ? void 0 : _Hb.$case) === "party_data_send" && (obj.party_data_send = ((_Ib = message.message) == null ? void 0 : _Ib.party_data_send) ? PartyDataSend.toJSON((_Jb = message.message) == null ? void 0 : _Jb.party_data_send) : void 0);
    ((_Kb = message.message) == null ? void 0 : _Kb.$case) === "party_presence_event" && (obj.party_presence_event = ((_Lb = message.message) == null ? void 0 : _Lb.party_presence_event) ? PartyPresenceEvent.toJSON((_Mb = message.message) == null ? void 0 : _Mb.party_presence_event) : void 0);
    return obj;
  }
};
var Channel = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.id);
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    if (message.self !== void 0 && message.self !== void 0) {
      UserPresence.encode(message.self, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.room_name);
    writer.uint32(42).string(message.group_id);
    writer.uint32(50).string(message.user_id_one);
    writer.uint32(58).string(message.user_id_two);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannel);
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        case 4:
          message.room_name = reader.string();
          break;
        case 5:
          message.group_id = reader.string();
          break;
        case 6:
          message.user_id_one = reader.string();
          break;
        case 7:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannel);
    message.presences = [];
    if (object.id !== void 0 && object.id !== null) {
      message.id = String(object.id);
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = String(object.room_name);
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannel);
    message.presences = [];
    if (object.id !== void 0 && object.id !== null) {
      message.id = object.id;
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = object.room_name;
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    message.self !== void 0 && (obj.self = message.self ? UserPresence.toJSON(message.self) : void 0);
    message.room_name !== void 0 && (obj.room_name = message.room_name);
    message.group_id !== void 0 && (obj.group_id = message.group_id);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  }
};
var ChannelJoin = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.target);
    writer.uint32(16).int32(message.type);
    if (message.persistence !== void 0 && message.persistence !== void 0) {
      BoolValue.encode({value: message.persistence}, writer.uint32(26).fork()).ldelim();
    }
    if (message.hidden !== void 0 && message.hidden !== void 0) {
      BoolValue.encode({value: message.hidden}, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannelJoin);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.target = reader.string();
          break;
        case 2:
          message.type = reader.int32();
          break;
        case 3:
          message.persistence = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.hidden = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannelJoin);
    if (object.target !== void 0 && object.target !== null) {
      message.target = String(object.target);
    }
    if (object.type !== void 0 && object.type !== null) {
      message.type = Number(object.type);
    }
    if (object.persistence !== void 0 && object.persistence !== null) {
      message.persistence = Boolean(object.persistence);
    }
    if (object.hidden !== void 0 && object.hidden !== null) {
      message.hidden = Boolean(object.hidden);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelJoin);
    if (object.target !== void 0 && object.target !== null) {
      message.target = object.target;
    }
    if (object.type !== void 0 && object.type !== null) {
      message.type = object.type;
    }
    if (object.persistence !== void 0 && object.persistence !== null) {
      message.persistence = object.persistence;
    }
    if (object.hidden !== void 0 && object.hidden !== null) {
      message.hidden = object.hidden;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.target !== void 0 && (obj.target = message.target);
    message.type !== void 0 && (obj.type = message.type);
    message.persistence !== void 0 && (obj.persistence = message.persistence);
    message.hidden !== void 0 && (obj.hidden = message.hidden);
    return obj;
  }
};
var ChannelLeave = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.channel_id);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannelLeave);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannelLeave);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelLeave);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    return obj;
  }
};
var ChannelMessageAck = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.message_id);
    if (message.code !== void 0 && message.code !== void 0) {
      Int32Value.encode({value: message.code}, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.username);
    if (message.create_time !== void 0 && message.create_time !== void 0) {
      Timestamp.encode(toTimestamp2(message.create_time), writer.uint32(42).fork()).ldelim();
    }
    if (message.update_time !== void 0 && message.update_time !== void 0) {
      Timestamp.encode(toTimestamp2(message.update_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.persistent !== void 0 && message.persistent !== void 0) {
      BoolValue.encode({value: message.persistent}, writer.uint32(58).fork()).ldelim();
    }
    writer.uint32(66).string(message.room_name);
    writer.uint32(74).string(message.group_id);
    writer.uint32(82).string(message.user_id_one);
    writer.uint32(90).string(message.user_id_two);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannelMessageAck);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.code = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.create_time = fromTimestamp2(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.update_time = fromTimestamp2(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.persistent = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.room_name = reader.string();
          break;
        case 9:
          message.group_id = reader.string();
          break;
        case 10:
          message.user_id_one = reader.string();
          break;
        case 11:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannelMessageAck);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = String(object.message_id);
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = Number(object.code);
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = fromJsonTimestamp2(object.create_time);
    }
    if (object.update_time !== void 0 && object.update_time !== null) {
      message.update_time = fromJsonTimestamp2(object.update_time);
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = String(object.room_name);
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessageAck);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = object.message_id;
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = object.code;
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = object.username;
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = object.create_time;
    }
    if (object.update_time !== void 0 && object.update_time !== null) {
      message.update_time = object.update_time;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = object.persistent;
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = object.room_name;
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.code !== void 0 && (obj.code = message.code);
    message.username !== void 0 && (obj.username = message.username);
    message.create_time !== void 0 && (obj.create_time = message.create_time !== void 0 ? message.create_time.toISOString() : null);
    message.update_time !== void 0 && (obj.update_time = message.update_time !== void 0 ? message.update_time.toISOString() : null);
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    message.room_name !== void 0 && (obj.room_name = message.room_name);
    message.group_id !== void 0 && (obj.group_id = message.group_id);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  }
};
var ChannelMessageSend = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.content);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannelMessageSend);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannelMessageSend);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = String(object.content);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessageSend);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = object.content;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.content !== void 0 && (obj.content = message.content);
    return obj;
  }
};
var ChannelMessageUpdate = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.message_id);
    writer.uint32(26).string(message.content);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannelMessageUpdate);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannelMessageUpdate);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = String(object.message_id);
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = String(object.content);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessageUpdate);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = object.message_id;
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = object.content;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.content !== void 0 && (obj.content = message.content);
    return obj;
  }
};
var ChannelMessageRemove = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.channel_id);
    writer.uint32(18).string(message.message_id);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannelMessageRemove);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannelMessageRemove);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = String(object.message_id);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessageRemove);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = object.message_id;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    return obj;
  }
};
var ChannelPresenceEvent = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.channel_id);
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.room_name);
    writer.uint32(42).string(message.group_id);
    writer.uint32(50).string(message.user_id_one);
    writer.uint32(58).string(message.user_id_two);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseChannelPresenceEvent);
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 4:
          message.room_name = reader.string();
          break;
        case 5:
          message.group_id = reader.string();
          break;
        case 6:
          message.user_id_one = reader.string();
          break;
        case 7:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseChannelPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = String(object.channel_id);
    }
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = String(object.room_name);
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = String(object.group_id);
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    }
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = object.room_name;
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = object.group_id;
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    message.room_name !== void 0 && (obj.room_name = message.room_name);
    message.group_id !== void 0 && (obj.group_id = message.group_id);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  }
};
var Error2 = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(8).int32(message.code);
    writer.uint32(18).string(message.message);
    Object.entries(message.context).forEach(([key, value]) => {
      Error_ContextEntry.encode({key, value}, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseError);
    message.context = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          const entry3 = Error_ContextEntry.decode(reader, reader.uint32());
          if (entry3.value !== void 0) {
            message.context[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseError);
    message.context = {};
    if (object.code !== void 0 && object.code !== null) {
      message.code = Number(object.code);
    }
    if (object.message !== void 0 && object.message !== null) {
      message.message = String(object.message);
    }
    if (object.context !== void 0 && object.context !== null) {
      Object.entries(object.context).forEach(([key, value]) => {
        message.context[key] = String(value);
      });
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseError);
    message.context = {};
    if (object.code !== void 0 && object.code !== null) {
      message.code = object.code;
    }
    if (object.message !== void 0 && object.message !== null) {
      message.message = object.message;
    }
    if (object.context !== void 0 && object.context !== null) {
      Object.entries(object.context).forEach(([key, value]) => {
        if (value !== void 0) {
          message.context[key] = String(value);
        }
      });
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.code !== void 0 && (obj.code = message.code);
    message.message !== void 0 && (obj.message = message.message);
    obj.context = {};
    if (message.context) {
      Object.entries(message.context).forEach(([k, v]) => {
        obj.context[k] = v;
      });
    }
    return obj;
  }
};
var Error_ContextEntry = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseError_ContextEntry);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseError_ContextEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseError_ContextEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var Match = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.match_id);
    writer.uint32(16).bool(message.authoritative);
    if (message.label !== void 0 && message.label !== void 0) {
      StringValue.encode({value: message.label}, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(32).int32(message.size);
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(42).fork()).ldelim();
    }
    if (message.self !== void 0 && message.self !== void 0) {
      UserPresence.encode(message.self, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatch);
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.authoritative = reader.bool();
          break;
        case 3:
          message.label = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.size = reader.int32();
          break;
        case 5:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 6:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatch);
    message.presences = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = String(object.match_id);
    }
    if (object.authoritative !== void 0 && object.authoritative !== null) {
      message.authoritative = Boolean(object.authoritative);
    }
    if (object.label !== void 0 && object.label !== null) {
      message.label = String(object.label);
    }
    if (object.size !== void 0 && object.size !== null) {
      message.size = Number(object.size);
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatch);
    message.presences = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    if (object.authoritative !== void 0 && object.authoritative !== null) {
      message.authoritative = object.authoritative;
    }
    if (object.label !== void 0 && object.label !== null) {
      message.label = object.label;
    }
    if (object.size !== void 0 && object.size !== null) {
      message.size = object.size;
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    message.authoritative !== void 0 && (obj.authoritative = message.authoritative);
    message.label !== void 0 && (obj.label = message.label);
    message.size !== void 0 && (obj.size = message.size);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    message.self !== void 0 && (obj.self = message.self ? UserPresence.toJSON(message.self) : void 0);
    return obj;
  }
};
var MatchCreate = {
  encode(_, writer = import_minimal4.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchCreate);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_) {
    const message = __spreadValues({}, baseMatchCreate);
    return message;
  },
  fromPartial(_) {
    const message = __spreadValues({}, baseMatchCreate);
    return message;
  },
  toJSON(_) {
    const obj = {};
    return obj;
  }
};
var MatchData = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.match_id);
    if (message.presence !== void 0 && message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int64(message.op_code);
    writer.uint32(34).bytes(message.data);
    writer.uint32(40).bool(message.reliable);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchData);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.op_code = longToNumber2(reader.int64());
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchData);
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = String(object.match_id);
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchData);
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = object.op_code;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = object.reliable;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    message.op_code !== void 0 && (obj.op_code = message.op_code);
    message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
    message.reliable !== void 0 && (obj.reliable = message.reliable);
    return obj;
  }
};
var MatchDataSend = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.match_id);
    writer.uint32(16).int64(message.op_code);
    writer.uint32(26).bytes(message.data);
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(40).bool(message.reliable);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchDataSend);
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.op_code = longToNumber2(reader.int64());
          break;
        case 3:
          message.data = reader.bytes();
          break;
        case 4:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 5:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchDataSend);
    message.presences = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = String(object.match_id);
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchDataSend);
    message.presences = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = object.op_code;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = object.reliable;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    message.op_code !== void 0 && (obj.op_code = message.op_code);
    message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    message.reliable !== void 0 && (obj.reliable = message.reliable);
    return obj;
  }
};
var MatchJoin = {
  encode(message, writer = import_minimal4.Writer.create()) {
    var _a, _b;
    if (((_a = message.id) == null ? void 0 : _a.$case) === "match_id") {
      writer.uint32(10).string(message.id.match_id);
    }
    if (((_b = message.id) == null ? void 0 : _b.$case) === "token") {
      writer.uint32(18).string(message.id.token);
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      MatchJoin_MetadataEntry.encode({key, value}, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchJoin);
    message.metadata = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = {$case: "match_id", match_id: reader.string()};
          break;
        case 2:
          message.id = {$case: "token", token: reader.string()};
          break;
        case 3:
          const entry3 = MatchJoin_MetadataEntry.decode(reader, reader.uint32());
          if (entry3.value !== void 0) {
            message.metadata[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchJoin);
    message.metadata = {};
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.id = {$case: "match_id", match_id: String(object.match_id)};
    }
    if (object.token !== void 0 && object.token !== null) {
      message.id = {$case: "token", token: String(object.token)};
    }
    if (object.metadata !== void 0 && object.metadata !== null) {
      Object.entries(object.metadata).forEach(([key, value]) => {
        message.metadata[key] = String(value);
      });
    }
    return message;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f;
    const message = __spreadValues({}, baseMatchJoin);
    message.metadata = {};
    if (((_a = object.id) == null ? void 0 : _a.$case) === "match_id" && ((_b = object.id) == null ? void 0 : _b.match_id) !== void 0 && ((_c = object.id) == null ? void 0 : _c.match_id) !== null) {
      message.id = {$case: "match_id", match_id: object.id.match_id};
    }
    if (((_d = object.id) == null ? void 0 : _d.$case) === "token" && ((_e = object.id) == null ? void 0 : _e.token) !== void 0 && ((_f = object.id) == null ? void 0 : _f.token) !== null) {
      message.id = {$case: "token", token: object.id.token};
    }
    if (object.metadata !== void 0 && object.metadata !== null) {
      Object.entries(object.metadata).forEach(([key, value]) => {
        if (value !== void 0) {
          message.metadata[key] = String(value);
        }
      });
    }
    return message;
  },
  toJSON(message) {
    var _a, _b, _c, _d;
    const obj = {};
    ((_a = message.id) == null ? void 0 : _a.$case) === "match_id" && (obj.match_id = (_b = message.id) == null ? void 0 : _b.match_id);
    ((_c = message.id) == null ? void 0 : _c.$case) === "token" && (obj.token = (_d = message.id) == null ? void 0 : _d.token);
    obj.metadata = {};
    if (message.metadata) {
      Object.entries(message.metadata).forEach(([k, v]) => {
        obj.metadata[k] = v;
      });
    }
    return obj;
  }
};
var MatchJoin_MetadataEntry = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchJoin_MetadataEntry);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchJoin_MetadataEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchJoin_MetadataEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var MatchLeave = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.match_id);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchLeave);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchLeave);
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = String(object.match_id);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchLeave);
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    return obj;
  }
};
var MatchPresenceEvent = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.match_id);
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchPresenceEvent);
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = String(object.match_id);
    }
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    }
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    return obj;
  }
};
var MatchmakerAdd = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(8).int32(message.min_count);
    writer.uint32(16).int32(message.max_count);
    writer.uint32(26).string(message.query);
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerAdd_StringPropertiesEntry.encode({key, value}, writer.uint32(34).fork()).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerAdd_NumericPropertiesEntry.encode({key, value}, writer.uint32(42).fork()).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerAdd);
    message.string_properties = {};
    message.numeric_properties = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.min_count = reader.int32();
          break;
        case 2:
          message.max_count = reader.int32();
          break;
        case 3:
          message.query = reader.string();
          break;
        case 4:
          const entry4 = MatchmakerAdd_StringPropertiesEntry.decode(reader, reader.uint32());
          if (entry4.value !== void 0) {
            message.string_properties[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 = MatchmakerAdd_NumericPropertiesEntry.decode(reader, reader.uint32());
          if (entry5.value !== void 0) {
            message.numeric_properties[entry5.key] = entry5.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerAdd);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.min_count !== void 0 && object.min_count !== null) {
      message.min_count = Number(object.min_count);
    }
    if (object.max_count !== void 0 && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    }
    if (object.query !== void 0 && object.query !== null) {
      message.query = String(object.query);
    }
    if (object.string_properties !== void 0 && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        message.string_properties[key] = String(value);
      });
    }
    if (object.numeric_properties !== void 0 && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        message.numeric_properties[key] = Number(value);
      });
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerAdd);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.min_count !== void 0 && object.min_count !== null) {
      message.min_count = object.min_count;
    }
    if (object.max_count !== void 0 && object.max_count !== null) {
      message.max_count = object.max_count;
    }
    if (object.query !== void 0 && object.query !== null) {
      message.query = object.query;
    }
    if (object.string_properties !== void 0 && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        if (value !== void 0) {
          message.string_properties[key] = String(value);
        }
      });
    }
    if (object.numeric_properties !== void 0 && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        if (value !== void 0) {
          message.numeric_properties[key] = Number(value);
        }
      });
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.min_count !== void 0 && (obj.min_count = message.min_count);
    message.max_count !== void 0 && (obj.max_count = message.max_count);
    message.query !== void 0 && (obj.query = message.query);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    return obj;
  }
};
var MatchmakerAdd_StringPropertiesEntry = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerAdd_StringPropertiesEntry);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerAdd_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerAdd_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var MatchmakerAdd_NumericPropertiesEntry = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.key);
    writer.uint32(17).double(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerAdd_NumericPropertiesEntry);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerAdd_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerAdd_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var MatchmakerMatched = {
  encode(message, writer = import_minimal4.Writer.create()) {
    var _a, _b;
    writer.uint32(10).string(message.ticket);
    if (((_a = message.id) == null ? void 0 : _a.$case) === "match_id") {
      writer.uint32(18).string(message.id.match_id);
    }
    if (((_b = message.id) == null ? void 0 : _b.$case) === "token") {
      writer.uint32(26).string(message.id.token);
    }
    for (const v of message.users) {
      MatchmakerMatched_MatchmakerUser.encode(v, writer.uint32(34).fork()).ldelim();
    }
    if (message.self !== void 0 && message.self !== void 0) {
      MatchmakerMatched_MatchmakerUser.encode(message.self, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerMatched);
    message.users = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        case 2:
          message.id = {$case: "match_id", match_id: reader.string()};
          break;
        case 3:
          message.id = {$case: "token", token: reader.string()};
          break;
        case 4:
          message.users.push(MatchmakerMatched_MatchmakerUser.decode(reader, reader.uint32()));
          break;
        case 5:
          message.self = MatchmakerMatched_MatchmakerUser.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerMatched);
    message.users = [];
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = String(object.ticket);
    }
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.id = {$case: "match_id", match_id: String(object.match_id)};
    }
    if (object.token !== void 0 && object.token !== null) {
      message.id = {$case: "token", token: String(object.token)};
    }
    if (object.users !== void 0 && object.users !== null) {
      for (const e of object.users) {
        message.users.push(MatchmakerMatched_MatchmakerUser.fromJSON(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = MatchmakerMatched_MatchmakerUser.fromJSON(object.self);
    }
    return message;
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e, _f;
    const message = __spreadValues({}, baseMatchmakerMatched);
    message.users = [];
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    }
    if (((_a = object.id) == null ? void 0 : _a.$case) === "match_id" && ((_b = object.id) == null ? void 0 : _b.match_id) !== void 0 && ((_c = object.id) == null ? void 0 : _c.match_id) !== null) {
      message.id = {$case: "match_id", match_id: object.id.match_id};
    }
    if (((_d = object.id) == null ? void 0 : _d.$case) === "token" && ((_e = object.id) == null ? void 0 : _e.token) !== void 0 && ((_f = object.id) == null ? void 0 : _f.token) !== null) {
      message.id = {$case: "token", token: object.id.token};
    }
    if (object.users !== void 0 && object.users !== null) {
      for (const e of object.users) {
        message.users.push(MatchmakerMatched_MatchmakerUser.fromPartial(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = MatchmakerMatched_MatchmakerUser.fromPartial(object.self);
    }
    return message;
  },
  toJSON(message) {
    var _a, _b, _c, _d;
    const obj = {};
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    ((_a = message.id) == null ? void 0 : _a.$case) === "match_id" && (obj.match_id = (_b = message.id) == null ? void 0 : _b.match_id);
    ((_c = message.id) == null ? void 0 : _c.$case) === "token" && (obj.token = (_d = message.id) == null ? void 0 : _d.token);
    if (message.users) {
      obj.users = message.users.map((e) => e ? MatchmakerMatched_MatchmakerUser.toJSON(e) : void 0);
    } else {
      obj.users = [];
    }
    message.self !== void 0 && (obj.self = message.self ? MatchmakerMatched_MatchmakerUser.toJSON(message.self) : void 0);
    return obj;
  }
};
var MatchmakerMatched_MatchmakerUser = {
  encode(message, writer = import_minimal4.Writer.create()) {
    if (message.presence !== void 0 && message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).string(message.party_id);
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.encode({key, value}, writer.uint32(42).fork()).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.encode({key, value}, writer.uint32(50).fork()).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser);
    message.string_properties = {};
    message.numeric_properties = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 2:
          message.party_id = reader.string();
          break;
        case 5:
          const entry5 = MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.decode(reader, reader.uint32());
          if (entry5.value !== void 0) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.decode(reader, reader.uint32());
          if (entry6.value !== void 0) {
            message.numeric_properties[entry6.key] = entry6.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.string_properties !== void 0 && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        message.string_properties[key] = String(value);
      });
    }
    if (object.numeric_properties !== void 0 && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        message.numeric_properties[key] = Number(value);
      });
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.string_properties !== void 0 && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        if (value !== void 0) {
          message.string_properties[key] = String(value);
        }
      });
    }
    if (object.numeric_properties !== void 0 && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        if (value !== void 0) {
          message.numeric_properties[key] = Number(value);
        }
      });
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    return obj;
  }
};
var MatchmakerMatched_MatchmakerUser_StringPropertiesEntry = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.key);
    writer.uint32(17).double(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var MatchmakerRemove = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.ticket);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerRemove);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerRemove);
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = String(object.ticket);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerRemove);
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    return obj;
  }
};
var MatchmakerTicket = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.ticket);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchmakerTicket);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseMatchmakerTicket);
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = String(object.ticket);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerTicket);
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    return obj;
  }
};
var Notifications = {
  encode(message, writer = import_minimal4.Writer.create()) {
    for (const v of message.notifications) {
      Notification.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseNotifications);
    message.notifications = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notifications.push(Notification.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseNotifications);
    message.notifications = [];
    if (object.notifications !== void 0 && object.notifications !== null) {
      for (const e of object.notifications) {
        message.notifications.push(Notification.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseNotifications);
    message.notifications = [];
    if (object.notifications !== void 0 && object.notifications !== null) {
      for (const e of object.notifications) {
        message.notifications.push(Notification.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.notifications) {
      obj.notifications = message.notifications.map((e) => e ? Notification.toJSON(e) : void 0);
    } else {
      obj.notifications = [];
    }
    return obj;
  }
};
var Party = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    writer.uint32(16).bool(message.open);
    writer.uint32(24).int32(message.max_size);
    if (message.self !== void 0 && message.self !== void 0) {
      UserPresence.encode(message.self, writer.uint32(34).fork()).ldelim();
    }
    if (message.leader !== void 0 && message.leader !== void 0) {
      UserPresence.encode(message.leader, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseParty);
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.open = reader.bool();
          break;
        case 3:
          message.max_size = reader.int32();
          break;
        case 4:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        case 5:
          message.leader = UserPresence.decode(reader, reader.uint32());
          break;
        case 6:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseParty);
    message.presences = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.open !== void 0 && object.open !== null) {
      message.open = Boolean(object.open);
    }
    if (object.max_size !== void 0 && object.max_size !== null) {
      message.max_size = Number(object.max_size);
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    }
    if (object.leader !== void 0 && object.leader !== null) {
      message.leader = UserPresence.fromJSON(object.leader);
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseParty);
    message.presences = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.open !== void 0 && object.open !== null) {
      message.open = object.open;
    }
    if (object.max_size !== void 0 && object.max_size !== null) {
      message.max_size = object.max_size;
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    }
    if (object.leader !== void 0 && object.leader !== null) {
      message.leader = UserPresence.fromPartial(object.leader);
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.open !== void 0 && (obj.open = message.open);
    message.max_size !== void 0 && (obj.max_size = message.max_size);
    message.self !== void 0 && (obj.self = message.self ? UserPresence.toJSON(message.self) : void 0);
    message.leader !== void 0 && (obj.leader = message.leader ? UserPresence.toJSON(message.leader) : void 0);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    return obj;
  }
};
var PartyCreate = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(8).bool(message.open);
    writer.uint32(16).int32(message.max_size);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyCreate);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.open = reader.bool();
          break;
        case 2:
          message.max_size = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyCreate);
    if (object.open !== void 0 && object.open !== null) {
      message.open = Boolean(object.open);
    }
    if (object.max_size !== void 0 && object.max_size !== null) {
      message.max_size = Number(object.max_size);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyCreate);
    if (object.open !== void 0 && object.open !== null) {
      message.open = object.open;
    }
    if (object.max_size !== void 0 && object.max_size !== null) {
      message.max_size = object.max_size;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.open !== void 0 && (obj.open = message.open);
    message.max_size !== void 0 && (obj.max_size = message.max_size);
    return obj;
  }
};
var PartyJoin = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyJoin);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyJoin);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyJoin);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  }
};
var PartyLeave = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyLeave);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyLeave);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyLeave);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  }
};
var PartyPromote = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    if (message.presence !== void 0 && message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyPromote);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyPromote);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyPromote);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  }
};
var PartyLeader = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    if (message.presence !== void 0 && message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyLeader);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyLeader);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyLeader);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  }
};
var PartyAccept = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    if (message.presence !== void 0 && message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyAccept);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyAccept);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyAccept);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  }
};
var PartyRemove = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    if (message.presence !== void 0 && message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyRemove);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyRemove);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyRemove);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  }
};
var PartyClose = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyClose);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyClose);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyClose);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  }
};
var PartyJoinRequestList = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyJoinRequestList);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyJoinRequestList);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyJoinRequestList);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  }
};
var PartyJoinRequest = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyJoinRequest);
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyJoinRequest);
    message.presences = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyJoinRequest);
    message.presences = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    return obj;
  }
};
var PartyMatchmakerAdd = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    writer.uint32(16).int32(message.min_count);
    writer.uint32(24).int32(message.max_count);
    writer.uint32(34).string(message.query);
    Object.entries(message.string_properties).forEach(([key, value]) => {
      PartyMatchmakerAdd_StringPropertiesEntry.encode({key, value}, writer.uint32(42).fork()).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      PartyMatchmakerAdd_NumericPropertiesEntry.encode({key, value}, writer.uint32(50).fork()).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyMatchmakerAdd);
    message.string_properties = {};
    message.numeric_properties = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.min_count = reader.int32();
          break;
        case 3:
          message.max_count = reader.int32();
          break;
        case 4:
          message.query = reader.string();
          break;
        case 5:
          const entry5 = PartyMatchmakerAdd_StringPropertiesEntry.decode(reader, reader.uint32());
          if (entry5.value !== void 0) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = PartyMatchmakerAdd_NumericPropertiesEntry.decode(reader, reader.uint32());
          if (entry6.value !== void 0) {
            message.numeric_properties[entry6.key] = entry6.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.min_count !== void 0 && object.min_count !== null) {
      message.min_count = Number(object.min_count);
    }
    if (object.max_count !== void 0 && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    }
    if (object.query !== void 0 && object.query !== null) {
      message.query = String(object.query);
    }
    if (object.string_properties !== void 0 && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        message.string_properties[key] = String(value);
      });
    }
    if (object.numeric_properties !== void 0 && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        message.numeric_properties[key] = Number(value);
      });
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.min_count !== void 0 && object.min_count !== null) {
      message.min_count = object.min_count;
    }
    if (object.max_count !== void 0 && object.max_count !== null) {
      message.max_count = object.max_count;
    }
    if (object.query !== void 0 && object.query !== null) {
      message.query = object.query;
    }
    if (object.string_properties !== void 0 && object.string_properties !== null) {
      Object.entries(object.string_properties).forEach(([key, value]) => {
        if (value !== void 0) {
          message.string_properties[key] = String(value);
        }
      });
    }
    if (object.numeric_properties !== void 0 && object.numeric_properties !== null) {
      Object.entries(object.numeric_properties).forEach(([key, value]) => {
        if (value !== void 0) {
          message.numeric_properties[key] = Number(value);
        }
      });
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.min_count !== void 0 && (obj.min_count = message.min_count);
    message.max_count !== void 0 && (obj.max_count = message.max_count);
    message.query !== void 0 && (obj.query = message.query);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    return obj;
  }
};
var PartyMatchmakerAdd_StringPropertiesEntry = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyMatchmakerAdd_StringPropertiesEntry);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var PartyMatchmakerAdd_NumericPropertiesEntry = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.key);
    writer.uint32(17).double(message.value);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyMatchmakerAdd_NumericPropertiesEntry);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = String(object.key);
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = Number(object.value);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
};
var PartyMatchmakerRemove = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    writer.uint32(18).string(message.ticket);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyMatchmakerRemove);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyMatchmakerRemove);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = String(object.ticket);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerRemove);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    return obj;
  }
};
var PartyMatchmakerTicket = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    writer.uint32(18).string(message.ticket);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyMatchmakerTicket);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyMatchmakerTicket);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = String(object.ticket);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerTicket);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    return obj;
  }
};
var PartyData = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    if (message.presence !== void 0 && message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int64(message.op_code);
    writer.uint32(34).bytes(message.data);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyData);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.op_code = longToNumber2(reader.int64());
          break;
        case 4:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyData);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyData);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = object.op_code;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    message.op_code !== void 0 && (obj.op_code = message.op_code);
    message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
    return obj;
  }
};
var PartyDataSend = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    writer.uint32(16).int64(message.op_code);
    writer.uint32(26).bytes(message.data);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyDataSend);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.op_code = longToNumber2(reader.int64());
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyDataSend);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyDataSend);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = object.op_code;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.op_code !== void 0 && (obj.op_code = message.op_code);
    message.data !== void 0 && (obj.data = base64FromBytes(message.data !== void 0 ? message.data : new Uint8Array()));
    return obj;
  }
};
var PartyPresenceEvent = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.party_id);
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyPresenceEvent);
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, basePartyPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    }
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    }
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    return obj;
  }
};
var Ping = {
  encode(_, writer = import_minimal4.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePing);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_) {
    const message = __spreadValues({}, basePing);
    return message;
  },
  fromPartial(_) {
    const message = __spreadValues({}, basePing);
    return message;
  },
  toJSON(_) {
    const obj = {};
    return obj;
  }
};
var Pong = {
  encode(_, writer = import_minimal4.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePong);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_) {
    const message = __spreadValues({}, basePong);
    return message;
  },
  fromPartial(_) {
    const message = __spreadValues({}, basePong);
    return message;
  },
  toJSON(_) {
    const obj = {};
    return obj;
  }
};
var Status = {
  encode(message, writer = import_minimal4.Writer.create()) {
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStatus);
    message.presences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStatus);
    message.presences = [];
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStatus);
    message.presences = [];
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.presences = [];
    }
    return obj;
  }
};
var StatusFollow = {
  encode(message, writer = import_minimal4.Writer.create()) {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStatusFollow);
    message.user_ids = [];
    message.usernames = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStatusFollow);
    message.user_ids = [];
    message.usernames = [];
    if (object.user_ids !== void 0 && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    if (object.usernames !== void 0 && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStatusFollow);
    message.user_ids = [];
    message.usernames = [];
    if (object.user_ids !== void 0 && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    if (object.usernames !== void 0 && object.usernames !== null) {
      for (const e of object.usernames) {
        message.usernames.push(e);
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  }
};
var StatusPresenceEvent = {
  encode(message, writer = import_minimal4.Writer.create()) {
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStatusPresenceEvent);
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStatusPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStatusPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    return obj;
  }
};
var StatusUnfollow = {
  encode(message, writer = import_minimal4.Writer.create()) {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStatusUnfollow);
    message.user_ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStatusUnfollow);
    message.user_ids = [];
    if (object.user_ids !== void 0 && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStatusUnfollow);
    message.user_ids = [];
    if (object.user_ids !== void 0 && object.user_ids !== null) {
      for (const e of object.user_ids) {
        message.user_ids.push(e);
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  }
};
var StatusUpdate = {
  encode(message, writer = import_minimal4.Writer.create()) {
    if (message.status !== void 0 && message.status !== void 0) {
      StringValue.encode({value: message.status}, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStatusUpdate);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStatusUpdate);
    if (object.status !== void 0 && object.status !== null) {
      message.status = String(object.status);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStatusUpdate);
    if (object.status !== void 0 && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.status !== void 0 && (obj.status = message.status);
    return obj;
  }
};
var Stream = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(8).int32(message.mode);
    writer.uint32(18).string(message.subject);
    writer.uint32(26).string(message.subcontext);
    writer.uint32(34).string(message.label);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStream);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32();
          break;
        case 2:
          message.subject = reader.string();
          break;
        case 3:
          message.subcontext = reader.string();
          break;
        case 4:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStream);
    if (object.mode !== void 0 && object.mode !== null) {
      message.mode = Number(object.mode);
    }
    if (object.subject !== void 0 && object.subject !== null) {
      message.subject = String(object.subject);
    }
    if (object.subcontext !== void 0 && object.subcontext !== null) {
      message.subcontext = String(object.subcontext);
    }
    if (object.label !== void 0 && object.label !== null) {
      message.label = String(object.label);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStream);
    if (object.mode !== void 0 && object.mode !== null) {
      message.mode = object.mode;
    }
    if (object.subject !== void 0 && object.subject !== null) {
      message.subject = object.subject;
    }
    if (object.subcontext !== void 0 && object.subcontext !== null) {
      message.subcontext = object.subcontext;
    }
    if (object.label !== void 0 && object.label !== null) {
      message.label = object.label;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.mode !== void 0 && (obj.mode = message.mode);
    message.subject !== void 0 && (obj.subject = message.subject);
    message.subcontext !== void 0 && (obj.subcontext = message.subcontext);
    message.label !== void 0 && (obj.label = message.label);
    return obj;
  }
};
var StreamData = {
  encode(message, writer = import_minimal4.Writer.create()) {
    if (message.stream !== void 0 && message.stream !== void 0) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    if (message.sender !== void 0 && message.sender !== void 0) {
      UserPresence.encode(message.sender, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).string(message.data);
    writer.uint32(32).bool(message.reliable);
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStreamData);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        case 2:
          message.sender = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.data = reader.string();
          break;
        case 4:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStreamData);
    if (object.stream !== void 0 && object.stream !== null) {
      message.stream = Stream.fromJSON(object.stream);
    }
    if (object.sender !== void 0 && object.sender !== null) {
      message.sender = UserPresence.fromJSON(object.sender);
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = String(object.data);
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStreamData);
    if (object.stream !== void 0 && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
    }
    if (object.sender !== void 0 && object.sender !== null) {
      message.sender = UserPresence.fromPartial(object.sender);
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = object.reliable;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.stream !== void 0 && (obj.stream = message.stream ? Stream.toJSON(message.stream) : void 0);
    message.sender !== void 0 && (obj.sender = message.sender ? UserPresence.toJSON(message.sender) : void 0);
    message.data !== void 0 && (obj.data = message.data);
    message.reliable !== void 0 && (obj.reliable = message.reliable);
    return obj;
  }
};
var StreamPresenceEvent = {
  encode(message, writer = import_minimal4.Writer.create()) {
    if (message.stream !== void 0 && message.stream !== void 0) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseStreamPresenceEvent);
    message.joins = [];
    message.leaves = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseStreamPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.stream !== void 0 && object.stream !== null) {
      message.stream = Stream.fromJSON(object.stream);
    }
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromJSON(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStreamPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.stream !== void 0 && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
    }
    if (object.joins !== void 0 && object.joins !== null) {
      for (const e of object.joins) {
        message.joins.push(UserPresence.fromPartial(e));
      }
    }
    if (object.leaves !== void 0 && object.leaves !== null) {
      for (const e of object.leaves) {
        message.leaves.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.stream !== void 0 && (obj.stream = message.stream ? Stream.toJSON(message.stream) : void 0);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : void 0);
    } else {
      obj.leaves = [];
    }
    return obj;
  }
};
var UserPresence = {
  encode(message, writer = import_minimal4.Writer.create()) {
    writer.uint32(10).string(message.user_id);
    writer.uint32(18).string(message.session_id);
    writer.uint32(26).string(message.username);
    writer.uint32(32).bool(message.persistence);
    if (message.status !== void 0 && message.status !== void 0) {
      StringValue.encode({value: message.status}, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof Uint8Array ? new import_minimal4.Reader(input) : input;
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseUserPresence);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.session_id = reader.string();
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.persistence = reader.bool();
          break;
        case 5:
          message.status = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    const message = __spreadValues({}, baseUserPresence);
    if (object.user_id !== void 0 && object.user_id !== null) {
      message.user_id = String(object.user_id);
    }
    if (object.session_id !== void 0 && object.session_id !== null) {
      message.session_id = String(object.session_id);
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = String(object.username);
    }
    if (object.persistence !== void 0 && object.persistence !== null) {
      message.persistence = Boolean(object.persistence);
    }
    if (object.status !== void 0 && object.status !== null) {
      message.status = String(object.status);
    }
    return message;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseUserPresence);
    if (object.user_id !== void 0 && object.user_id !== null) {
      message.user_id = object.user_id;
    }
    if (object.session_id !== void 0 && object.session_id !== null) {
      message.session_id = object.session_id;
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = object.username;
    }
    if (object.persistence !== void 0 && object.persistence !== null) {
      message.persistence = object.persistence;
    }
    if (object.status !== void 0 && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.user_id !== void 0 && (obj.user_id = message.user_id);
    message.session_id !== void 0 && (obj.session_id = message.session_id);
    message.username !== void 0 && (obj.username = message.username);
    message.persistence !== void 0 && (obj.persistence = message.persistence);
    message.status !== void 0 && (obj.status = message.status);
    return obj;
  }
};
if (import_minimal4.util.Long !== Long4) {
  import_minimal4.util.Long = Long4;
  (0, import_minimal4.configure)();
}
var windowBase642 = globalThis;
var atob2 = windowBase642.atob || ((b64) => Buffer.from(b64, "base64").toString("binary"));
var btoa2 = windowBase642.btoa || ((bin) => Buffer.from(bin, "binary").toString("base64"));
function bytesFromBase64(b64) {
  const bin = atob2(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}
function base64FromBytes(arr) {
  const bin = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa2(bin.join(""));
}

// web_socket_adapter_pb.ts
var WebSocketAdapterPb = class {
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
        const buffer = evt.data;
        const uintBuffer = new Uint8Array(buffer);
        const envelopeProto = Envelope.decode(uintBuffer);
        const envelope = Envelope.toJSON(envelopeProto);
        if (envelope.cid == "") {
          envelope.cid = void 0;
        }
        if (envelope.channel_message) {
          if (envelope.channel_message.code == void 0) {
            envelope.channel_message.code = 0;
          }
          if (envelope.channel_message.persistent == void 0) {
            envelope.channel_message.persistent = false;
          }
        }
        value(envelope);
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
  close() {
    this._isConnected = false;
    this._socket.close();
    this._socket = void 0;
  }
  connect(scheme, host, port, createStatus, token) {
    const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}&format=protobuf`;
    this._socket = new WebSocket(url);
    this._socket.binaryType = "arraybuffer";
    this._isConnected = true;
  }
  send(msg) {
    const envelope = Envelope.fromJSON(msg);
    const envelopeWriter = Envelope.encode(envelope);
    const encodedMsg = envelopeWriter.finish();
    this._socket.send(encodedMsg);
  }
};

// index.ts
protobuf.util.Long = import_long.default;
protobuf.configure();
