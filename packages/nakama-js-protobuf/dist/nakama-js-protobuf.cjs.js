"use strict";
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
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
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
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// ../../node_modules/long/src/long.js
var require_long = __commonJS({
  "../../node_modules/long/src/long.js"(exports2, module2) {
    module2.exports = Long5;
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
    function Long5(low, high, unsigned) {
      this.low = low | 0;
      this.high = high | 0;
      this.unsigned = !!unsigned;
    }
    Long5.prototype.__isLong__;
    Object.defineProperty(Long5.prototype, "__isLong__", { value: true });
    function isLong(obj) {
      return (obj && obj["__isLong__"]) === true;
    }
    Long5.isLong = isLong;
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
    Long5.fromInt = fromInt;
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
    Long5.fromNumber = fromNumber;
    function fromBits(lowBits, highBits, unsigned) {
      return new Long5(lowBits, highBits, unsigned);
    }
    Long5.fromBits = fromBits;
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
    Long5.fromString = fromString;
    function fromValue(val, unsigned) {
      if (typeof val === "number")
        return fromNumber(val, unsigned);
      if (typeof val === "string")
        return fromString(val, unsigned);
      return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
    }
    Long5.fromValue = fromValue;
    var TWO_PWR_16_DBL = 1 << 16;
    var TWO_PWR_24_DBL = 1 << 24;
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
    var ZERO = fromInt(0);
    Long5.ZERO = ZERO;
    var UZERO = fromInt(0, true);
    Long5.UZERO = UZERO;
    var ONE = fromInt(1);
    Long5.ONE = ONE;
    var UONE = fromInt(1, true);
    Long5.UONE = UONE;
    var NEG_ONE = fromInt(-1);
    Long5.NEG_ONE = NEG_ONE;
    var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
    Long5.MAX_VALUE = MAX_VALUE;
    var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
    Long5.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
    var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
    Long5.MIN_VALUE = MIN_VALUE;
    var LongPrototype = Long5.prototype;
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
      return !this.eq(
        /* validates */
        other
      );
    };
    LongPrototype.neq = LongPrototype.notEquals;
    LongPrototype.ne = LongPrototype.notEquals;
    LongPrototype.lessThan = function lessThan(other) {
      return this.comp(
        /* validates */
        other
      ) < 0;
    };
    LongPrototype.lt = LongPrototype.lessThan;
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
      return this.comp(
        /* validates */
        other
      ) <= 0;
    };
    LongPrototype.lte = LongPrototype.lessThanOrEqual;
    LongPrototype.le = LongPrototype.lessThanOrEqual;
    LongPrototype.greaterThan = function greaterThan(other) {
      return this.comp(
        /* validates */
        other
      ) > 0;
    };
    LongPrototype.gt = LongPrototype.greaterThan;
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
      return this.comp(
        /* validates */
        other
      ) >= 0;
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
        var low = wasm.mul(
          this.low,
          this.high,
          multiplier.low,
          multiplier.high
        );
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
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
          this.low,
          this.high,
          divisor.low,
          divisor.high
        );
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
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
          this.low,
          this.high,
          divisor.low,
          divisor.high
        );
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
    Long5.fromBytes = function fromBytes(bytes, unsigned, le) {
      return le ? Long5.fromBytesLE(bytes, unsigned) : Long5.fromBytesBE(bytes, unsigned);
    };
    Long5.fromBytesLE = function fromBytesLE(bytes, unsigned) {
      return new Long5(
        bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
        bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
        unsigned
      );
    };
    Long5.fromBytesBE = function fromBytesBE(bytes, unsigned) {
      return new Long5(
        bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
        bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
        unsigned
      );
    };
  }
});

// ../../node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "../../node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
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

// ../../node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "../../node_modules/@protobufjs/base64/index.js"(exports2) {
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
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
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

// ../../node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "../../node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
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

// ../../node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "../../node_modules/@protobufjs/float/index.js"(exports2, module2) {
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
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
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
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
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

// ../../node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "../../node_modules/@protobufjs/inquire/index.js"(exports, module) {
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

// ../../node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "../../node_modules/@protobufjs/utf8/index.js"(exports2) {
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

// ../../node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "../../node_modules/@protobufjs/pool/index.js"(exports2, module2) {
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

// ../../node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "../../node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util3 = require_minimal();
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
      if (util3.isString(value)) {
        if (util3.Long)
          value = util3.Long.fromString(value);
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
      return util3.Long ? new util3.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
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

// ../../node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "../../node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util3 = exports2;
    util3.asPromise = require_aspromise();
    util3.base64 = require_base64();
    util3.EventEmitter = require_eventemitter();
    util3.float = require_float();
    util3.inquire = require_inquire();
    util3.utf8 = require_utf8();
    util3.pool = require_pool();
    util3.LongBits = require_longbits();
    util3.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util3.global = util3.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util3.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util3.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util3.isInteger = Number.isInteger || /* istanbul ignore next */
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util3.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util3.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util3.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util3.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util3.Buffer = function() {
      try {
        var Buffer2 = util3.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : (
          /* istanbul ignore next */
          null
        );
      } catch (e) {
        return null;
      }
    }();
    util3._Buffer_from = null;
    util3._Buffer_allocUnsafe = null;
    util3.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util3.Buffer ? util3._Buffer_allocUnsafe(sizeOrArray) : new util3.Array(sizeOrArray) : util3.Buffer ? util3._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util3.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util3.Long = /* istanbul ignore next */
    util3.global.dcodeIO && /* istanbul ignore next */
    util3.global.dcodeIO.Long || /* istanbul ignore next */
    util3.global.Long || util3.inquire("long");
    util3.key2Re = /^true|false|0|1$/;
    util3.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util3.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util3.longToHash = function longToHash(value) {
      return value ? util3.LongBits.from(value).toHash() : util3.LongBits.zeroHash;
    };
    util3.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util3.LongBits.fromHash(hash);
      if (util3.Long)
        return util3.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util3.merge = merge;
    util3.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", { get: function() {
        return name;
      } });
      CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util3.newError = newError;
    util3.ProtocolError = newError("ProtocolError");
    util3.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util3.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util3.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util3._configure = function() {
      var Buffer2 = util3.Buffer;
      if (!Buffer2) {
        util3._Buffer_from = util3._Buffer_allocUnsafe = null;
        return;
      }
      util3._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
      function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util3._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// ../../node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "../../node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer3;
    var util3 = require_minimal();
    var BufferWriter;
    var LongBits = util3.LongBits;
    var base64 = util3.base64;
    var utf8 = util3.utf8;
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
    function Writer3() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util3.Buffer ? function create_buffer_setup() {
        return (Writer3.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer3();
      };
    };
    Writer3.create = create();
    Writer3.alloc = function alloc(size) {
      return new util3.Array(size);
    };
    if (util3.Array !== Array)
      Writer3.alloc = util3.pool(Writer3.alloc, util3.Array.prototype.subarray);
    Writer3.prototype._push = function push(fn, len, val) {
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
    Writer3.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer3.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer3.prototype.sint32 = function write_sint32(value) {
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
    Writer3.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer3.prototype.int64 = Writer3.prototype.uint64;
    Writer3.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer3.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer3.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer3.prototype.sfixed32 = Writer3.prototype.fixed32;
    Writer3.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer3.prototype.sfixed64 = Writer3.prototype.fixed64;
    Writer3.prototype.float = function write_float(value) {
      return this._push(util3.float.writeFloatLE, 4, value);
    };
    Writer3.prototype.double = function write_double(value) {
      return this._push(util3.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util3.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer3.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util3.isString(value)) {
        var buf = Writer3.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer3.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer3.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer3.prototype.reset = function reset() {
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
    Writer3.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer3.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer3._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer3.create = create();
      BufferWriter._configure();
    };
  }
});

// ../../node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "../../node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer3 = require_writer();
    (BufferWriter.prototype = Object.create(Writer3.prototype)).constructor = BufferWriter;
    var util3 = require_minimal();
    function BufferWriter() {
      Writer3.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util3._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util3.Buffer && util3.Buffer.prototype instanceof Uint8Array && util3.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
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
      if (util3.isString(value))
        value = util3._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util3.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util3.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// ../../node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "../../node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader3;
    var util3 = require_minimal();
    var BufferReader;
    var LongBits = util3.LongBits;
    var utf8 = util3.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader3(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader3(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader3(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util3.Buffer ? function create_buffer_setup(buffer) {
        return (Reader3.create = function create_buffer(buffer2) {
          return util3.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader3.create = create();
    Reader3.prototype._slice = util3.Array.prototype.subarray || /* istanbul ignore next */
    util3.Array.prototype.slice;
    Reader3.prototype.uint32 = function read_uint32_setup() {
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
    Reader3.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader3.prototype.sint32 = function read_sint32() {
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
    Reader3.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader3.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader3.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader3.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util3.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader3.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util3.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader3.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader3.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader3.prototype.skip = function skip(length) {
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
    Reader3.prototype.skipType = function(wireType) {
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
    Reader3._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader3.create = create();
      BufferReader._configure();
      var fn = util3.Long ? "toLong" : (
        /* istanbul ignore next */
        "toNumber"
      );
      util3.merge(Reader3.prototype, {
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

// ../../node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "../../node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader3 = require_reader();
    (BufferReader.prototype = Object.create(Reader3.prototype)).constructor = BufferReader;
    var util3 = require_minimal();
    function BufferReader(buffer) {
      Reader3.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util3.Buffer)
        BufferReader.prototype._slice = util3.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// ../../node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "../../node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util3 = require_minimal();
    (Service.prototype = Object.create(util3.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util3.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util3.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
          function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(
                /* endedByRPC */
                true
              );
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
          }
        );
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

// ../../node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "../../node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// ../../node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "../../node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// ../../node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "../../node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure3;
    function configure3() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure3();
  }
});

// ../../node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "../../node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// index.ts
var nakama_js_protobuf_exports = {};
__export(nakama_js_protobuf_exports, {
  WebSocketAdapterPb: () => WebSocketAdapterPb
});
module.exports = __toCommonJS(nakama_js_protobuf_exports);

// rtapi/realtime.ts
var import_long2 = __toESM(require_long());
var import_minimal4 = __toESM(require_minimal2());

// google/protobuf/timestamp.ts
var Long = __toESM(require_long());
var import_minimal = __toESM(require_minimal2());
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

// api/api.ts
var import_long = __toESM(require_long());
var import_minimal3 = __toESM(require_minimal2());

// google/protobuf/wrappers.ts
var Long2 = __toESM(require_long());
var import_minimal2 = __toESM(require_minimal2());
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

// api/api.ts
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
var ChannelMessage = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.code !== void 0) {
      Int32Value.encode(
        { value: message.code },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.sender_id !== "") {
      writer.uint32(34).string(message.sender_id);
    }
    if (message.username !== "") {
      writer.uint32(42).string(message.username);
    }
    if (message.content !== "") {
      writer.uint32(50).string(message.content);
    }
    if (message.create_time !== void 0) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.update_time !== void 0) {
      Timestamp.encode(
        toTimestamp(message.update_time),
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.persistent !== void 0) {
      BoolValue.encode(
        { value: message.persistent },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(82).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(90).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(98).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(106).string(message.user_id_two);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
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
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.update_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
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
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = String(object.message_id);
    } else {
      message.message_id = "";
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = Number(object.code);
    } else {
      message.code = void 0;
    }
    if (object.sender_id !== void 0 && object.sender_id !== null) {
      message.sender_id = String(object.sender_id);
    } else {
      message.sender_id = "";
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    } else {
      message.create_time = void 0;
    }
    if (object.update_time !== void 0 && object.update_time !== null) {
      message.update_time = fromJsonTimestamp(object.update_time);
    } else {
      message.update_time = void 0;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    } else {
      message.persistent = void 0;
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = String(object.room_name);
    } else {
      message.room_name = "";
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = String(object.group_id);
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    } else {
      message.user_id_two = "";
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
    message.create_time !== void 0 && (obj.create_time = message.create_time.toISOString());
    message.update_time !== void 0 && (obj.update_time = message.update_time.toISOString());
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    message.room_name !== void 0 && (obj.room_name = message.room_name);
    message.group_id !== void 0 && (obj.group_id = message.group_id);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessage);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = object.message_id;
    } else {
      message.message_id = "";
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = void 0;
    }
    if (object.sender_id !== void 0 && object.sender_id !== null) {
      message.sender_id = object.sender_id;
    } else {
      message.sender_id = "";
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = object.create_time;
    } else {
      message.create_time = void 0;
    }
    if (object.update_time !== void 0 && object.update_time !== null) {
      message.update_time = object.update_time;
    } else {
      message.update_time = void 0;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = object.persistent;
    } else {
      message.persistent = void 0;
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = object.room_name;
    } else {
      message.room_name = "";
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = object.group_id;
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    } else {
      message.user_id_two = "";
    }
    return message;
  }
};
var baseNotification = {
  id: "",
  subject: "",
  content: "",
  code: 0,
  sender_id: "",
  persistent: false
};
var Notification = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.code !== 0) {
      writer.uint32(32).int32(message.code);
    }
    if (message.sender_id !== "") {
      writer.uint32(42).string(message.sender_id);
    }
    if (message.create_time !== void 0) {
      Timestamp.encode(
        toTimestamp(message.create_time),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.persistent === true) {
      writer.uint32(56).bool(message.persistent);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
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
          message.create_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
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
    } else {
      message.id = "";
    }
    if (object.subject !== void 0 && object.subject !== null) {
      message.subject = String(object.subject);
    } else {
      message.subject = "";
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = Number(object.code);
    } else {
      message.code = 0;
    }
    if (object.sender_id !== void 0 && object.sender_id !== null) {
      message.sender_id = String(object.sender_id);
    } else {
      message.sender_id = "";
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = fromJsonTimestamp(object.create_time);
    } else {
      message.create_time = void 0;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    } else {
      message.persistent = false;
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
    message.create_time !== void 0 && (obj.create_time = message.create_time.toISOString());
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseNotification);
    if (object.id !== void 0 && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.subject !== void 0 && object.subject !== null) {
      message.subject = object.subject;
    } else {
      message.subject = "";
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = 0;
    }
    if (object.sender_id !== void 0 && object.sender_id !== null) {
      message.sender_id = object.sender_id;
    } else {
      message.sender_id = "";
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = object.create_time;
    } else {
      message.create_time = void 0;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = object.persistent;
    } else {
      message.persistent = false;
    }
    return message;
  }
};
var baseRpc = { id: "", payload: "", http_key: "" };
var Rpc = {
  encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.http_key !== "") {
      writer.uint32(26).string(message.http_key);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal3.default.Reader ? input : new import_minimal3.default.Reader(input);
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
    } else {
      message.id = "";
    }
    if (object.payload !== void 0 && object.payload !== null) {
      message.payload = String(object.payload);
    } else {
      message.payload = "";
    }
    if (object.http_key !== void 0 && object.http_key !== null) {
      message.http_key = String(object.http_key);
    } else {
      message.http_key = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    message.payload !== void 0 && (obj.payload = message.payload);
    message.http_key !== void 0 && (obj.http_key = message.http_key);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseRpc);
    if (object.id !== void 0 && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.payload !== void 0 && object.payload !== null) {
      message.payload = object.payload;
    } else {
      message.payload = "";
    }
    if (object.http_key !== void 0 && object.http_key !== null) {
      message.http_key = object.http_key;
    } else {
      message.http_key = "";
    }
    return message;
  }
};
var globalThis2 = (() => {
  if (typeof globalThis2 !== "undefined")
    return globalThis2;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
  throw "Unable to locate global object";
})();
function toTimestamp(date) {
  const seconds = date.getTime() / 1e3;
  const nanos = date.getTime() % 1e3 * 1e6;
  return { seconds, nanos };
}
function fromTimestamp(t) {
  let millis = t.seconds * 1e3;
  millis += t.nanos / 1e6;
  return new Date(millis);
}
function fromJsonTimestamp(o) {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
if (import_minimal3.default.util.Long !== import_long.default) {
  import_minimal3.default.util.Long = import_long.default;
  import_minimal3.default.configure();
}

// rtapi/realtime.ts
var baseEnvelope = { cid: "" };
var Envelope = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    if (message.channel !== void 0) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (message.channel_join !== void 0) {
      ChannelJoin.encode(
        message.channel_join,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.channel_leave !== void 0) {
      ChannelLeave.encode(
        message.channel_leave,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.channel_message !== void 0) {
      ChannelMessage.encode(
        message.channel_message,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.channel_message_ack !== void 0) {
      ChannelMessageAck.encode(
        message.channel_message_ack,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.channel_message_send !== void 0) {
      ChannelMessageSend.encode(
        message.channel_message_send,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.channel_message_update !== void 0) {
      ChannelMessageUpdate.encode(
        message.channel_message_update,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.channel_message_remove !== void 0) {
      ChannelMessageRemove.encode(
        message.channel_message_remove,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.channel_presence_event !== void 0) {
      ChannelPresenceEvent.encode(
        message.channel_presence_event,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.error !== void 0) {
      Error2.encode(message.error, writer.uint32(90).fork()).ldelim();
    }
    if (message.match !== void 0) {
      Match.encode(message.match, writer.uint32(98).fork()).ldelim();
    }
    if (message.match_create !== void 0) {
      MatchCreate.encode(
        message.match_create,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.match_data !== void 0) {
      MatchData.encode(message.match_data, writer.uint32(114).fork()).ldelim();
    }
    if (message.match_data_send !== void 0) {
      MatchDataSend.encode(
        message.match_data_send,
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.match_join !== void 0) {
      MatchJoin.encode(message.match_join, writer.uint32(130).fork()).ldelim();
    }
    if (message.match_leave !== void 0) {
      MatchLeave.encode(
        message.match_leave,
        writer.uint32(138).fork()
      ).ldelim();
    }
    if (message.match_presence_event !== void 0) {
      MatchPresenceEvent.encode(
        message.match_presence_event,
        writer.uint32(146).fork()
      ).ldelim();
    }
    if (message.matchmaker_add !== void 0) {
      MatchmakerAdd.encode(
        message.matchmaker_add,
        writer.uint32(154).fork()
      ).ldelim();
    }
    if (message.matchmaker_matched !== void 0) {
      MatchmakerMatched.encode(
        message.matchmaker_matched,
        writer.uint32(162).fork()
      ).ldelim();
    }
    if (message.matchmaker_remove !== void 0) {
      MatchmakerRemove.encode(
        message.matchmaker_remove,
        writer.uint32(170).fork()
      ).ldelim();
    }
    if (message.matchmaker_ticket !== void 0) {
      MatchmakerTicket.encode(
        message.matchmaker_ticket,
        writer.uint32(178).fork()
      ).ldelim();
    }
    if (message.notifications !== void 0) {
      Notifications.encode(
        message.notifications,
        writer.uint32(186).fork()
      ).ldelim();
    }
    if (message.rpc !== void 0) {
      Rpc.encode(message.rpc, writer.uint32(194).fork()).ldelim();
    }
    if (message.status !== void 0) {
      Status.encode(message.status, writer.uint32(202).fork()).ldelim();
    }
    if (message.status_follow !== void 0) {
      StatusFollow.encode(
        message.status_follow,
        writer.uint32(210).fork()
      ).ldelim();
    }
    if (message.status_presence_event !== void 0) {
      StatusPresenceEvent.encode(
        message.status_presence_event,
        writer.uint32(218).fork()
      ).ldelim();
    }
    if (message.status_unfollow !== void 0) {
      StatusUnfollow.encode(
        message.status_unfollow,
        writer.uint32(226).fork()
      ).ldelim();
    }
    if (message.status_update !== void 0) {
      StatusUpdate.encode(
        message.status_update,
        writer.uint32(234).fork()
      ).ldelim();
    }
    if (message.stream_data !== void 0) {
      StreamData.encode(
        message.stream_data,
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.stream_presence_event !== void 0) {
      StreamPresenceEvent.encode(
        message.stream_presence_event,
        writer.uint32(250).fork()
      ).ldelim();
    }
    if (message.ping !== void 0) {
      Ping.encode(message.ping, writer.uint32(258).fork()).ldelim();
    }
    if (message.pong !== void 0) {
      Pong.encode(message.pong, writer.uint32(266).fork()).ldelim();
    }
    if (message.party !== void 0) {
      Party.encode(message.party, writer.uint32(274).fork()).ldelim();
    }
    if (message.party_create !== void 0) {
      PartyCreate.encode(
        message.party_create,
        writer.uint32(282).fork()
      ).ldelim();
    }
    if (message.party_join !== void 0) {
      PartyJoin.encode(message.party_join, writer.uint32(290).fork()).ldelim();
    }
    if (message.party_leave !== void 0) {
      PartyLeave.encode(
        message.party_leave,
        writer.uint32(298).fork()
      ).ldelim();
    }
    if (message.party_promote !== void 0) {
      PartyPromote.encode(
        message.party_promote,
        writer.uint32(306).fork()
      ).ldelim();
    }
    if (message.party_leader !== void 0) {
      PartyLeader.encode(
        message.party_leader,
        writer.uint32(314).fork()
      ).ldelim();
    }
    if (message.party_accept !== void 0) {
      PartyAccept.encode(
        message.party_accept,
        writer.uint32(322).fork()
      ).ldelim();
    }
    if (message.party_remove !== void 0) {
      PartyRemove.encode(
        message.party_remove,
        writer.uint32(330).fork()
      ).ldelim();
    }
    if (message.party_close !== void 0) {
      PartyClose.encode(
        message.party_close,
        writer.uint32(338).fork()
      ).ldelim();
    }
    if (message.party_join_request_list !== void 0) {
      PartyJoinRequestList.encode(
        message.party_join_request_list,
        writer.uint32(346).fork()
      ).ldelim();
    }
    if (message.party_join_request !== void 0) {
      PartyJoinRequest.encode(
        message.party_join_request,
        writer.uint32(354).fork()
      ).ldelim();
    }
    if (message.party_matchmaker_add !== void 0) {
      PartyMatchmakerAdd.encode(
        message.party_matchmaker_add,
        writer.uint32(362).fork()
      ).ldelim();
    }
    if (message.party_matchmaker_remove !== void 0) {
      PartyMatchmakerRemove.encode(
        message.party_matchmaker_remove,
        writer.uint32(370).fork()
      ).ldelim();
    }
    if (message.party_matchmaker_ticket !== void 0) {
      PartyMatchmakerTicket.encode(
        message.party_matchmaker_ticket,
        writer.uint32(378).fork()
      ).ldelim();
    }
    if (message.party_data !== void 0) {
      PartyData.encode(message.party_data, writer.uint32(386).fork()).ldelim();
    }
    if (message.party_data_send !== void 0) {
      PartyDataSend.encode(
        message.party_data_send,
        writer.uint32(394).fork()
      ).ldelim();
    }
    if (message.party_presence_event !== void 0) {
      PartyPresenceEvent.encode(
        message.party_presence_event,
        writer.uint32(402).fork()
      ).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseEnvelope);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 3:
          message.channel_join = ChannelJoin.decode(reader, reader.uint32());
          break;
        case 4:
          message.channel_leave = ChannelLeave.decode(reader, reader.uint32());
          break;
        case 5:
          message.channel_message = ChannelMessage.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.channel_message_ack = ChannelMessageAck.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.channel_message_send = ChannelMessageSend.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.channel_message_update = ChannelMessageUpdate.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.channel_message_remove = ChannelMessageRemove.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.channel_presence_event = ChannelPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.error = Error2.decode(reader, reader.uint32());
          break;
        case 12:
          message.match = Match.decode(reader, reader.uint32());
          break;
        case 13:
          message.match_create = MatchCreate.decode(reader, reader.uint32());
          break;
        case 14:
          message.match_data = MatchData.decode(reader, reader.uint32());
          break;
        case 15:
          message.match_data_send = MatchDataSend.decode(
            reader,
            reader.uint32()
          );
          break;
        case 16:
          message.match_join = MatchJoin.decode(reader, reader.uint32());
          break;
        case 17:
          message.match_leave = MatchLeave.decode(reader, reader.uint32());
          break;
        case 18:
          message.match_presence_event = MatchPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 19:
          message.matchmaker_add = MatchmakerAdd.decode(
            reader,
            reader.uint32()
          );
          break;
        case 20:
          message.matchmaker_matched = MatchmakerMatched.decode(
            reader,
            reader.uint32()
          );
          break;
        case 21:
          message.matchmaker_remove = MatchmakerRemove.decode(
            reader,
            reader.uint32()
          );
          break;
        case 22:
          message.matchmaker_ticket = MatchmakerTicket.decode(
            reader,
            reader.uint32()
          );
          break;
        case 23:
          message.notifications = Notifications.decode(reader, reader.uint32());
          break;
        case 24:
          message.rpc = Rpc.decode(reader, reader.uint32());
          break;
        case 25:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 26:
          message.status_follow = StatusFollow.decode(reader, reader.uint32());
          break;
        case 27:
          message.status_presence_event = StatusPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 28:
          message.status_unfollow = StatusUnfollow.decode(
            reader,
            reader.uint32()
          );
          break;
        case 29:
          message.status_update = StatusUpdate.decode(reader, reader.uint32());
          break;
        case 30:
          message.stream_data = StreamData.decode(reader, reader.uint32());
          break;
        case 31:
          message.stream_presence_event = StreamPresenceEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 32:
          message.ping = Ping.decode(reader, reader.uint32());
          break;
        case 33:
          message.pong = Pong.decode(reader, reader.uint32());
          break;
        case 34:
          message.party = Party.decode(reader, reader.uint32());
          break;
        case 35:
          message.party_create = PartyCreate.decode(reader, reader.uint32());
          break;
        case 36:
          message.party_join = PartyJoin.decode(reader, reader.uint32());
          break;
        case 37:
          message.party_leave = PartyLeave.decode(reader, reader.uint32());
          break;
        case 38:
          message.party_promote = PartyPromote.decode(reader, reader.uint32());
          break;
        case 39:
          message.party_leader = PartyLeader.decode(reader, reader.uint32());
          break;
        case 40:
          message.party_accept = PartyAccept.decode(reader, reader.uint32());
          break;
        case 41:
          message.party_remove = PartyRemove.decode(reader, reader.uint32());
          break;
        case 42:
          message.party_close = PartyClose.decode(reader, reader.uint32());
          break;
        case 43:
          message.party_join_request_list = PartyJoinRequestList.decode(
            reader,
            reader.uint32()
          );
          break;
        case 44:
          message.party_join_request = PartyJoinRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 45:
          message.party_matchmaker_add = PartyMatchmakerAdd.decode(
            reader,
            reader.uint32()
          );
          break;
        case 46:
          message.party_matchmaker_remove = PartyMatchmakerRemove.decode(
            reader,
            reader.uint32()
          );
          break;
        case 47:
          message.party_matchmaker_ticket = PartyMatchmakerTicket.decode(
            reader,
            reader.uint32()
          );
          break;
        case 48:
          message.party_data = PartyData.decode(reader, reader.uint32());
          break;
        case 49:
          message.party_data_send = PartyDataSend.decode(
            reader,
            reader.uint32()
          );
          break;
        case 50:
          message.party_presence_event = PartyPresenceEvent.decode(
            reader,
            reader.uint32()
          );
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
    } else {
      message.cid = "";
    }
    if (object.channel !== void 0 && object.channel !== null) {
      message.channel = Channel.fromJSON(object.channel);
    } else {
      message.channel = void 0;
    }
    if (object.channel_join !== void 0 && object.channel_join !== null) {
      message.channel_join = ChannelJoin.fromJSON(object.channel_join);
    } else {
      message.channel_join = void 0;
    }
    if (object.channel_leave !== void 0 && object.channel_leave !== null) {
      message.channel_leave = ChannelLeave.fromJSON(object.channel_leave);
    } else {
      message.channel_leave = void 0;
    }
    if (object.channel_message !== void 0 && object.channel_message !== null) {
      message.channel_message = ChannelMessage.fromJSON(object.channel_message);
    } else {
      message.channel_message = void 0;
    }
    if (object.channel_message_ack !== void 0 && object.channel_message_ack !== null) {
      message.channel_message_ack = ChannelMessageAck.fromJSON(
        object.channel_message_ack
      );
    } else {
      message.channel_message_ack = void 0;
    }
    if (object.channel_message_send !== void 0 && object.channel_message_send !== null) {
      message.channel_message_send = ChannelMessageSend.fromJSON(
        object.channel_message_send
      );
    } else {
      message.channel_message_send = void 0;
    }
    if (object.channel_message_update !== void 0 && object.channel_message_update !== null) {
      message.channel_message_update = ChannelMessageUpdate.fromJSON(
        object.channel_message_update
      );
    } else {
      message.channel_message_update = void 0;
    }
    if (object.channel_message_remove !== void 0 && object.channel_message_remove !== null) {
      message.channel_message_remove = ChannelMessageRemove.fromJSON(
        object.channel_message_remove
      );
    } else {
      message.channel_message_remove = void 0;
    }
    if (object.channel_presence_event !== void 0 && object.channel_presence_event !== null) {
      message.channel_presence_event = ChannelPresenceEvent.fromJSON(
        object.channel_presence_event
      );
    } else {
      message.channel_presence_event = void 0;
    }
    if (object.error !== void 0 && object.error !== null) {
      message.error = Error2.fromJSON(object.error);
    } else {
      message.error = void 0;
    }
    if (object.match !== void 0 && object.match !== null) {
      message.match = Match.fromJSON(object.match);
    } else {
      message.match = void 0;
    }
    if (object.match_create !== void 0 && object.match_create !== null) {
      message.match_create = MatchCreate.fromJSON(object.match_create);
    } else {
      message.match_create = void 0;
    }
    if (object.match_data !== void 0 && object.match_data !== null) {
      message.match_data = MatchData.fromJSON(object.match_data);
    } else {
      message.match_data = void 0;
    }
    if (object.match_data_send !== void 0 && object.match_data_send !== null) {
      message.match_data_send = MatchDataSend.fromJSON(object.match_data_send);
    } else {
      message.match_data_send = void 0;
    }
    if (object.match_join !== void 0 && object.match_join !== null) {
      message.match_join = MatchJoin.fromJSON(object.match_join);
    } else {
      message.match_join = void 0;
    }
    if (object.match_leave !== void 0 && object.match_leave !== null) {
      message.match_leave = MatchLeave.fromJSON(object.match_leave);
    } else {
      message.match_leave = void 0;
    }
    if (object.match_presence_event !== void 0 && object.match_presence_event !== null) {
      message.match_presence_event = MatchPresenceEvent.fromJSON(
        object.match_presence_event
      );
    } else {
      message.match_presence_event = void 0;
    }
    if (object.matchmaker_add !== void 0 && object.matchmaker_add !== null) {
      message.matchmaker_add = MatchmakerAdd.fromJSON(object.matchmaker_add);
    } else {
      message.matchmaker_add = void 0;
    }
    if (object.matchmaker_matched !== void 0 && object.matchmaker_matched !== null) {
      message.matchmaker_matched = MatchmakerMatched.fromJSON(
        object.matchmaker_matched
      );
    } else {
      message.matchmaker_matched = void 0;
    }
    if (object.matchmaker_remove !== void 0 && object.matchmaker_remove !== null) {
      message.matchmaker_remove = MatchmakerRemove.fromJSON(
        object.matchmaker_remove
      );
    } else {
      message.matchmaker_remove = void 0;
    }
    if (object.matchmaker_ticket !== void 0 && object.matchmaker_ticket !== null) {
      message.matchmaker_ticket = MatchmakerTicket.fromJSON(
        object.matchmaker_ticket
      );
    } else {
      message.matchmaker_ticket = void 0;
    }
    if (object.notifications !== void 0 && object.notifications !== null) {
      message.notifications = Notifications.fromJSON(object.notifications);
    } else {
      message.notifications = void 0;
    }
    if (object.rpc !== void 0 && object.rpc !== null) {
      message.rpc = Rpc.fromJSON(object.rpc);
    } else {
      message.rpc = void 0;
    }
    if (object.status !== void 0 && object.status !== null) {
      message.status = Status.fromJSON(object.status);
    } else {
      message.status = void 0;
    }
    if (object.status_follow !== void 0 && object.status_follow !== null) {
      message.status_follow = StatusFollow.fromJSON(object.status_follow);
    } else {
      message.status_follow = void 0;
    }
    if (object.status_presence_event !== void 0 && object.status_presence_event !== null) {
      message.status_presence_event = StatusPresenceEvent.fromJSON(
        object.status_presence_event
      );
    } else {
      message.status_presence_event = void 0;
    }
    if (object.status_unfollow !== void 0 && object.status_unfollow !== null) {
      message.status_unfollow = StatusUnfollow.fromJSON(object.status_unfollow);
    } else {
      message.status_unfollow = void 0;
    }
    if (object.status_update !== void 0 && object.status_update !== null) {
      message.status_update = StatusUpdate.fromJSON(object.status_update);
    } else {
      message.status_update = void 0;
    }
    if (object.stream_data !== void 0 && object.stream_data !== null) {
      message.stream_data = StreamData.fromJSON(object.stream_data);
    } else {
      message.stream_data = void 0;
    }
    if (object.stream_presence_event !== void 0 && object.stream_presence_event !== null) {
      message.stream_presence_event = StreamPresenceEvent.fromJSON(
        object.stream_presence_event
      );
    } else {
      message.stream_presence_event = void 0;
    }
    if (object.ping !== void 0 && object.ping !== null) {
      message.ping = Ping.fromJSON(object.ping);
    } else {
      message.ping = void 0;
    }
    if (object.pong !== void 0 && object.pong !== null) {
      message.pong = Pong.fromJSON(object.pong);
    } else {
      message.pong = void 0;
    }
    if (object.party !== void 0 && object.party !== null) {
      message.party = Party.fromJSON(object.party);
    } else {
      message.party = void 0;
    }
    if (object.party_create !== void 0 && object.party_create !== null) {
      message.party_create = PartyCreate.fromJSON(object.party_create);
    } else {
      message.party_create = void 0;
    }
    if (object.party_join !== void 0 && object.party_join !== null) {
      message.party_join = PartyJoin.fromJSON(object.party_join);
    } else {
      message.party_join = void 0;
    }
    if (object.party_leave !== void 0 && object.party_leave !== null) {
      message.party_leave = PartyLeave.fromJSON(object.party_leave);
    } else {
      message.party_leave = void 0;
    }
    if (object.party_promote !== void 0 && object.party_promote !== null) {
      message.party_promote = PartyPromote.fromJSON(object.party_promote);
    } else {
      message.party_promote = void 0;
    }
    if (object.party_leader !== void 0 && object.party_leader !== null) {
      message.party_leader = PartyLeader.fromJSON(object.party_leader);
    } else {
      message.party_leader = void 0;
    }
    if (object.party_accept !== void 0 && object.party_accept !== null) {
      message.party_accept = PartyAccept.fromJSON(object.party_accept);
    } else {
      message.party_accept = void 0;
    }
    if (object.party_remove !== void 0 && object.party_remove !== null) {
      message.party_remove = PartyRemove.fromJSON(object.party_remove);
    } else {
      message.party_remove = void 0;
    }
    if (object.party_close !== void 0 && object.party_close !== null) {
      message.party_close = PartyClose.fromJSON(object.party_close);
    } else {
      message.party_close = void 0;
    }
    if (object.party_join_request_list !== void 0 && object.party_join_request_list !== null) {
      message.party_join_request_list = PartyJoinRequestList.fromJSON(
        object.party_join_request_list
      );
    } else {
      message.party_join_request_list = void 0;
    }
    if (object.party_join_request !== void 0 && object.party_join_request !== null) {
      message.party_join_request = PartyJoinRequest.fromJSON(
        object.party_join_request
      );
    } else {
      message.party_join_request = void 0;
    }
    if (object.party_matchmaker_add !== void 0 && object.party_matchmaker_add !== null) {
      message.party_matchmaker_add = PartyMatchmakerAdd.fromJSON(
        object.party_matchmaker_add
      );
    } else {
      message.party_matchmaker_add = void 0;
    }
    if (object.party_matchmaker_remove !== void 0 && object.party_matchmaker_remove !== null) {
      message.party_matchmaker_remove = PartyMatchmakerRemove.fromJSON(
        object.party_matchmaker_remove
      );
    } else {
      message.party_matchmaker_remove = void 0;
    }
    if (object.party_matchmaker_ticket !== void 0 && object.party_matchmaker_ticket !== null) {
      message.party_matchmaker_ticket = PartyMatchmakerTicket.fromJSON(
        object.party_matchmaker_ticket
      );
    } else {
      message.party_matchmaker_ticket = void 0;
    }
    if (object.party_data !== void 0 && object.party_data !== null) {
      message.party_data = PartyData.fromJSON(object.party_data);
    } else {
      message.party_data = void 0;
    }
    if (object.party_data_send !== void 0 && object.party_data_send !== null) {
      message.party_data_send = PartyDataSend.fromJSON(object.party_data_send);
    } else {
      message.party_data_send = void 0;
    }
    if (object.party_presence_event !== void 0 && object.party_presence_event !== null) {
      message.party_presence_event = PartyPresenceEvent.fromJSON(
        object.party_presence_event
      );
    } else {
      message.party_presence_event = void 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.cid !== void 0 && (obj.cid = message.cid);
    message.channel !== void 0 && (obj.channel = message.channel ? Channel.toJSON(message.channel) : void 0);
    message.channel_join !== void 0 && (obj.channel_join = message.channel_join ? ChannelJoin.toJSON(message.channel_join) : void 0);
    message.channel_leave !== void 0 && (obj.channel_leave = message.channel_leave ? ChannelLeave.toJSON(message.channel_leave) : void 0);
    message.channel_message !== void 0 && (obj.channel_message = message.channel_message ? ChannelMessage.toJSON(message.channel_message) : void 0);
    message.channel_message_ack !== void 0 && (obj.channel_message_ack = message.channel_message_ack ? ChannelMessageAck.toJSON(message.channel_message_ack) : void 0);
    message.channel_message_send !== void 0 && (obj.channel_message_send = message.channel_message_send ? ChannelMessageSend.toJSON(message.channel_message_send) : void 0);
    message.channel_message_update !== void 0 && (obj.channel_message_update = message.channel_message_update ? ChannelMessageUpdate.toJSON(message.channel_message_update) : void 0);
    message.channel_message_remove !== void 0 && (obj.channel_message_remove = message.channel_message_remove ? ChannelMessageRemove.toJSON(message.channel_message_remove) : void 0);
    message.channel_presence_event !== void 0 && (obj.channel_presence_event = message.channel_presence_event ? ChannelPresenceEvent.toJSON(message.channel_presence_event) : void 0);
    message.error !== void 0 && (obj.error = message.error ? Error2.toJSON(message.error) : void 0);
    message.match !== void 0 && (obj.match = message.match ? Match.toJSON(message.match) : void 0);
    message.match_create !== void 0 && (obj.match_create = message.match_create ? MatchCreate.toJSON(message.match_create) : void 0);
    message.match_data !== void 0 && (obj.match_data = message.match_data ? MatchData.toJSON(message.match_data) : void 0);
    message.match_data_send !== void 0 && (obj.match_data_send = message.match_data_send ? MatchDataSend.toJSON(message.match_data_send) : void 0);
    message.match_join !== void 0 && (obj.match_join = message.match_join ? MatchJoin.toJSON(message.match_join) : void 0);
    message.match_leave !== void 0 && (obj.match_leave = message.match_leave ? MatchLeave.toJSON(message.match_leave) : void 0);
    message.match_presence_event !== void 0 && (obj.match_presence_event = message.match_presence_event ? MatchPresenceEvent.toJSON(message.match_presence_event) : void 0);
    message.matchmaker_add !== void 0 && (obj.matchmaker_add = message.matchmaker_add ? MatchmakerAdd.toJSON(message.matchmaker_add) : void 0);
    message.matchmaker_matched !== void 0 && (obj.matchmaker_matched = message.matchmaker_matched ? MatchmakerMatched.toJSON(message.matchmaker_matched) : void 0);
    message.matchmaker_remove !== void 0 && (obj.matchmaker_remove = message.matchmaker_remove ? MatchmakerRemove.toJSON(message.matchmaker_remove) : void 0);
    message.matchmaker_ticket !== void 0 && (obj.matchmaker_ticket = message.matchmaker_ticket ? MatchmakerTicket.toJSON(message.matchmaker_ticket) : void 0);
    message.notifications !== void 0 && (obj.notifications = message.notifications ? Notifications.toJSON(message.notifications) : void 0);
    message.rpc !== void 0 && (obj.rpc = message.rpc ? Rpc.toJSON(message.rpc) : void 0);
    message.status !== void 0 && (obj.status = message.status ? Status.toJSON(message.status) : void 0);
    message.status_follow !== void 0 && (obj.status_follow = message.status_follow ? StatusFollow.toJSON(message.status_follow) : void 0);
    message.status_presence_event !== void 0 && (obj.status_presence_event = message.status_presence_event ? StatusPresenceEvent.toJSON(message.status_presence_event) : void 0);
    message.status_unfollow !== void 0 && (obj.status_unfollow = message.status_unfollow ? StatusUnfollow.toJSON(message.status_unfollow) : void 0);
    message.status_update !== void 0 && (obj.status_update = message.status_update ? StatusUpdate.toJSON(message.status_update) : void 0);
    message.stream_data !== void 0 && (obj.stream_data = message.stream_data ? StreamData.toJSON(message.stream_data) : void 0);
    message.stream_presence_event !== void 0 && (obj.stream_presence_event = message.stream_presence_event ? StreamPresenceEvent.toJSON(message.stream_presence_event) : void 0);
    message.ping !== void 0 && (obj.ping = message.ping ? Ping.toJSON(message.ping) : void 0);
    message.pong !== void 0 && (obj.pong = message.pong ? Pong.toJSON(message.pong) : void 0);
    message.party !== void 0 && (obj.party = message.party ? Party.toJSON(message.party) : void 0);
    message.party_create !== void 0 && (obj.party_create = message.party_create ? PartyCreate.toJSON(message.party_create) : void 0);
    message.party_join !== void 0 && (obj.party_join = message.party_join ? PartyJoin.toJSON(message.party_join) : void 0);
    message.party_leave !== void 0 && (obj.party_leave = message.party_leave ? PartyLeave.toJSON(message.party_leave) : void 0);
    message.party_promote !== void 0 && (obj.party_promote = message.party_promote ? PartyPromote.toJSON(message.party_promote) : void 0);
    message.party_leader !== void 0 && (obj.party_leader = message.party_leader ? PartyLeader.toJSON(message.party_leader) : void 0);
    message.party_accept !== void 0 && (obj.party_accept = message.party_accept ? PartyAccept.toJSON(message.party_accept) : void 0);
    message.party_remove !== void 0 && (obj.party_remove = message.party_remove ? PartyRemove.toJSON(message.party_remove) : void 0);
    message.party_close !== void 0 && (obj.party_close = message.party_close ? PartyClose.toJSON(message.party_close) : void 0);
    message.party_join_request_list !== void 0 && (obj.party_join_request_list = message.party_join_request_list ? PartyJoinRequestList.toJSON(message.party_join_request_list) : void 0);
    message.party_join_request !== void 0 && (obj.party_join_request = message.party_join_request ? PartyJoinRequest.toJSON(message.party_join_request) : void 0);
    message.party_matchmaker_add !== void 0 && (obj.party_matchmaker_add = message.party_matchmaker_add ? PartyMatchmakerAdd.toJSON(message.party_matchmaker_add) : void 0);
    message.party_matchmaker_remove !== void 0 && (obj.party_matchmaker_remove = message.party_matchmaker_remove ? PartyMatchmakerRemove.toJSON(message.party_matchmaker_remove) : void 0);
    message.party_matchmaker_ticket !== void 0 && (obj.party_matchmaker_ticket = message.party_matchmaker_ticket ? PartyMatchmakerTicket.toJSON(message.party_matchmaker_ticket) : void 0);
    message.party_data !== void 0 && (obj.party_data = message.party_data ? PartyData.toJSON(message.party_data) : void 0);
    message.party_data_send !== void 0 && (obj.party_data_send = message.party_data_send ? PartyDataSend.toJSON(message.party_data_send) : void 0);
    message.party_presence_event !== void 0 && (obj.party_presence_event = message.party_presence_event ? PartyPresenceEvent.toJSON(message.party_presence_event) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseEnvelope);
    if (object.cid !== void 0 && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    if (object.channel !== void 0 && object.channel !== null) {
      message.channel = Channel.fromPartial(object.channel);
    } else {
      message.channel = void 0;
    }
    if (object.channel_join !== void 0 && object.channel_join !== null) {
      message.channel_join = ChannelJoin.fromPartial(object.channel_join);
    } else {
      message.channel_join = void 0;
    }
    if (object.channel_leave !== void 0 && object.channel_leave !== null) {
      message.channel_leave = ChannelLeave.fromPartial(object.channel_leave);
    } else {
      message.channel_leave = void 0;
    }
    if (object.channel_message !== void 0 && object.channel_message !== null) {
      message.channel_message = ChannelMessage.fromPartial(
        object.channel_message
      );
    } else {
      message.channel_message = void 0;
    }
    if (object.channel_message_ack !== void 0 && object.channel_message_ack !== null) {
      message.channel_message_ack = ChannelMessageAck.fromPartial(
        object.channel_message_ack
      );
    } else {
      message.channel_message_ack = void 0;
    }
    if (object.channel_message_send !== void 0 && object.channel_message_send !== null) {
      message.channel_message_send = ChannelMessageSend.fromPartial(
        object.channel_message_send
      );
    } else {
      message.channel_message_send = void 0;
    }
    if (object.channel_message_update !== void 0 && object.channel_message_update !== null) {
      message.channel_message_update = ChannelMessageUpdate.fromPartial(
        object.channel_message_update
      );
    } else {
      message.channel_message_update = void 0;
    }
    if (object.channel_message_remove !== void 0 && object.channel_message_remove !== null) {
      message.channel_message_remove = ChannelMessageRemove.fromPartial(
        object.channel_message_remove
      );
    } else {
      message.channel_message_remove = void 0;
    }
    if (object.channel_presence_event !== void 0 && object.channel_presence_event !== null) {
      message.channel_presence_event = ChannelPresenceEvent.fromPartial(
        object.channel_presence_event
      );
    } else {
      message.channel_presence_event = void 0;
    }
    if (object.error !== void 0 && object.error !== null) {
      message.error = Error2.fromPartial(object.error);
    } else {
      message.error = void 0;
    }
    if (object.match !== void 0 && object.match !== null) {
      message.match = Match.fromPartial(object.match);
    } else {
      message.match = void 0;
    }
    if (object.match_create !== void 0 && object.match_create !== null) {
      message.match_create = MatchCreate.fromPartial(object.match_create);
    } else {
      message.match_create = void 0;
    }
    if (object.match_data !== void 0 && object.match_data !== null) {
      message.match_data = MatchData.fromPartial(object.match_data);
    } else {
      message.match_data = void 0;
    }
    if (object.match_data_send !== void 0 && object.match_data_send !== null) {
      message.match_data_send = MatchDataSend.fromPartial(
        object.match_data_send
      );
    } else {
      message.match_data_send = void 0;
    }
    if (object.match_join !== void 0 && object.match_join !== null) {
      message.match_join = MatchJoin.fromPartial(object.match_join);
    } else {
      message.match_join = void 0;
    }
    if (object.match_leave !== void 0 && object.match_leave !== null) {
      message.match_leave = MatchLeave.fromPartial(object.match_leave);
    } else {
      message.match_leave = void 0;
    }
    if (object.match_presence_event !== void 0 && object.match_presence_event !== null) {
      message.match_presence_event = MatchPresenceEvent.fromPartial(
        object.match_presence_event
      );
    } else {
      message.match_presence_event = void 0;
    }
    if (object.matchmaker_add !== void 0 && object.matchmaker_add !== null) {
      message.matchmaker_add = MatchmakerAdd.fromPartial(object.matchmaker_add);
    } else {
      message.matchmaker_add = void 0;
    }
    if (object.matchmaker_matched !== void 0 && object.matchmaker_matched !== null) {
      message.matchmaker_matched = MatchmakerMatched.fromPartial(
        object.matchmaker_matched
      );
    } else {
      message.matchmaker_matched = void 0;
    }
    if (object.matchmaker_remove !== void 0 && object.matchmaker_remove !== null) {
      message.matchmaker_remove = MatchmakerRemove.fromPartial(
        object.matchmaker_remove
      );
    } else {
      message.matchmaker_remove = void 0;
    }
    if (object.matchmaker_ticket !== void 0 && object.matchmaker_ticket !== null) {
      message.matchmaker_ticket = MatchmakerTicket.fromPartial(
        object.matchmaker_ticket
      );
    } else {
      message.matchmaker_ticket = void 0;
    }
    if (object.notifications !== void 0 && object.notifications !== null) {
      message.notifications = Notifications.fromPartial(object.notifications);
    } else {
      message.notifications = void 0;
    }
    if (object.rpc !== void 0 && object.rpc !== null) {
      message.rpc = Rpc.fromPartial(object.rpc);
    } else {
      message.rpc = void 0;
    }
    if (object.status !== void 0 && object.status !== null) {
      message.status = Status.fromPartial(object.status);
    } else {
      message.status = void 0;
    }
    if (object.status_follow !== void 0 && object.status_follow !== null) {
      message.status_follow = StatusFollow.fromPartial(object.status_follow);
    } else {
      message.status_follow = void 0;
    }
    if (object.status_presence_event !== void 0 && object.status_presence_event !== null) {
      message.status_presence_event = StatusPresenceEvent.fromPartial(
        object.status_presence_event
      );
    } else {
      message.status_presence_event = void 0;
    }
    if (object.status_unfollow !== void 0 && object.status_unfollow !== null) {
      message.status_unfollow = StatusUnfollow.fromPartial(
        object.status_unfollow
      );
    } else {
      message.status_unfollow = void 0;
    }
    if (object.status_update !== void 0 && object.status_update !== null) {
      message.status_update = StatusUpdate.fromPartial(object.status_update);
    } else {
      message.status_update = void 0;
    }
    if (object.stream_data !== void 0 && object.stream_data !== null) {
      message.stream_data = StreamData.fromPartial(object.stream_data);
    } else {
      message.stream_data = void 0;
    }
    if (object.stream_presence_event !== void 0 && object.stream_presence_event !== null) {
      message.stream_presence_event = StreamPresenceEvent.fromPartial(
        object.stream_presence_event
      );
    } else {
      message.stream_presence_event = void 0;
    }
    if (object.ping !== void 0 && object.ping !== null) {
      message.ping = Ping.fromPartial(object.ping);
    } else {
      message.ping = void 0;
    }
    if (object.pong !== void 0 && object.pong !== null) {
      message.pong = Pong.fromPartial(object.pong);
    } else {
      message.pong = void 0;
    }
    if (object.party !== void 0 && object.party !== null) {
      message.party = Party.fromPartial(object.party);
    } else {
      message.party = void 0;
    }
    if (object.party_create !== void 0 && object.party_create !== null) {
      message.party_create = PartyCreate.fromPartial(object.party_create);
    } else {
      message.party_create = void 0;
    }
    if (object.party_join !== void 0 && object.party_join !== null) {
      message.party_join = PartyJoin.fromPartial(object.party_join);
    } else {
      message.party_join = void 0;
    }
    if (object.party_leave !== void 0 && object.party_leave !== null) {
      message.party_leave = PartyLeave.fromPartial(object.party_leave);
    } else {
      message.party_leave = void 0;
    }
    if (object.party_promote !== void 0 && object.party_promote !== null) {
      message.party_promote = PartyPromote.fromPartial(object.party_promote);
    } else {
      message.party_promote = void 0;
    }
    if (object.party_leader !== void 0 && object.party_leader !== null) {
      message.party_leader = PartyLeader.fromPartial(object.party_leader);
    } else {
      message.party_leader = void 0;
    }
    if (object.party_accept !== void 0 && object.party_accept !== null) {
      message.party_accept = PartyAccept.fromPartial(object.party_accept);
    } else {
      message.party_accept = void 0;
    }
    if (object.party_remove !== void 0 && object.party_remove !== null) {
      message.party_remove = PartyRemove.fromPartial(object.party_remove);
    } else {
      message.party_remove = void 0;
    }
    if (object.party_close !== void 0 && object.party_close !== null) {
      message.party_close = PartyClose.fromPartial(object.party_close);
    } else {
      message.party_close = void 0;
    }
    if (object.party_join_request_list !== void 0 && object.party_join_request_list !== null) {
      message.party_join_request_list = PartyJoinRequestList.fromPartial(
        object.party_join_request_list
      );
    } else {
      message.party_join_request_list = void 0;
    }
    if (object.party_join_request !== void 0 && object.party_join_request !== null) {
      message.party_join_request = PartyJoinRequest.fromPartial(
        object.party_join_request
      );
    } else {
      message.party_join_request = void 0;
    }
    if (object.party_matchmaker_add !== void 0 && object.party_matchmaker_add !== null) {
      message.party_matchmaker_add = PartyMatchmakerAdd.fromPartial(
        object.party_matchmaker_add
      );
    } else {
      message.party_matchmaker_add = void 0;
    }
    if (object.party_matchmaker_remove !== void 0 && object.party_matchmaker_remove !== null) {
      message.party_matchmaker_remove = PartyMatchmakerRemove.fromPartial(
        object.party_matchmaker_remove
      );
    } else {
      message.party_matchmaker_remove = void 0;
    }
    if (object.party_matchmaker_ticket !== void 0 && object.party_matchmaker_ticket !== null) {
      message.party_matchmaker_ticket = PartyMatchmakerTicket.fromPartial(
        object.party_matchmaker_ticket
      );
    } else {
      message.party_matchmaker_ticket = void 0;
    }
    if (object.party_data !== void 0 && object.party_data !== null) {
      message.party_data = PartyData.fromPartial(object.party_data);
    } else {
      message.party_data = void 0;
    }
    if (object.party_data_send !== void 0 && object.party_data_send !== null) {
      message.party_data_send = PartyDataSend.fromPartial(
        object.party_data_send
      );
    } else {
      message.party_data_send = void 0;
    }
    if (object.party_presence_event !== void 0 && object.party_presence_event !== null) {
      message.party_presence_event = PartyPresenceEvent.fromPartial(
        object.party_presence_event
      );
    } else {
      message.party_presence_event = void 0;
    }
    return message;
  }
};
var baseChannel = {
  id: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: ""
};
var Channel = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    if (message.self !== void 0) {
      UserPresence.encode(message.self, writer.uint32(26).fork()).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(34).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(42).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(50).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(58).string(message.user_id_two);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.id = "";
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    } else {
      message.self = void 0;
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = String(object.room_name);
    } else {
      message.room_name = "";
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = String(object.group_id);
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    } else {
      message.user_id_two = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.id !== void 0 && (obj.id = message.id);
    if (message.presences) {
      obj.presences = message.presences.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.presences = [];
    }
    message.self !== void 0 && (obj.self = message.self ? UserPresence.toJSON(message.self) : void 0);
    message.room_name !== void 0 && (obj.room_name = message.room_name);
    message.group_id !== void 0 && (obj.group_id = message.group_id);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannel);
    message.presences = [];
    if (object.id !== void 0 && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    } else {
      message.self = void 0;
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = object.room_name;
    } else {
      message.room_name = "";
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = object.group_id;
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    } else {
      message.user_id_two = "";
    }
    return message;
  }
};
var baseChannelJoin = { target: "", type: 0 };
var ChannelJoin = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.target !== "") {
      writer.uint32(10).string(message.target);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.persistence !== void 0) {
      BoolValue.encode(
        { value: message.persistence },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.hidden !== void 0) {
      BoolValue.encode(
        { value: message.hidden },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.target = "";
    }
    if (object.type !== void 0 && object.type !== null) {
      message.type = Number(object.type);
    } else {
      message.type = 0;
    }
    if (object.persistence !== void 0 && object.persistence !== null) {
      message.persistence = Boolean(object.persistence);
    } else {
      message.persistence = void 0;
    }
    if (object.hidden !== void 0 && object.hidden !== null) {
      message.hidden = Boolean(object.hidden);
    } else {
      message.hidden = void 0;
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
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelJoin);
    if (object.target !== void 0 && object.target !== null) {
      message.target = object.target;
    } else {
      message.target = "";
    }
    if (object.type !== void 0 && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.persistence !== void 0 && object.persistence !== null) {
      message.persistence = object.persistence;
    } else {
      message.persistence = void 0;
    }
    if (object.hidden !== void 0 && object.hidden !== null) {
      message.hidden = object.hidden;
    } else {
      message.hidden = void 0;
    }
    return message;
  }
};
var baseChannelLeave = { channel_id: "" };
var ChannelLeave = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.channel_id = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelLeave);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    return message;
  }
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
var ChannelMessageAck = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.code !== void 0) {
      Int32Value.encode(
        { value: message.code },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.create_time !== void 0) {
      Timestamp.encode(
        toTimestamp2(message.create_time),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.update_time !== void 0) {
      Timestamp.encode(
        toTimestamp2(message.update_time),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.persistent !== void 0) {
      BoolValue.encode(
        { value: message.persistent },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(66).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(74).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(82).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(90).string(message.user_id_two);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
          message.create_time = fromTimestamp2(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.update_time = fromTimestamp2(
            Timestamp.decode(reader, reader.uint32())
          );
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
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = String(object.message_id);
    } else {
      message.message_id = "";
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = Number(object.code);
    } else {
      message.code = void 0;
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = fromJsonTimestamp2(object.create_time);
    } else {
      message.create_time = void 0;
    }
    if (object.update_time !== void 0 && object.update_time !== null) {
      message.update_time = fromJsonTimestamp2(object.update_time);
    } else {
      message.update_time = void 0;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = Boolean(object.persistent);
    } else {
      message.persistent = void 0;
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = String(object.room_name);
    } else {
      message.room_name = "";
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = String(object.group_id);
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    } else {
      message.user_id_two = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.code !== void 0 && (obj.code = message.code);
    message.username !== void 0 && (obj.username = message.username);
    message.create_time !== void 0 && (obj.create_time = message.create_time.toISOString());
    message.update_time !== void 0 && (obj.update_time = message.update_time.toISOString());
    message.persistent !== void 0 && (obj.persistent = message.persistent);
    message.room_name !== void 0 && (obj.room_name = message.room_name);
    message.group_id !== void 0 && (obj.group_id = message.group_id);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessageAck);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = object.message_id;
    } else {
      message.message_id = "";
    }
    if (object.code !== void 0 && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = void 0;
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.create_time !== void 0 && object.create_time !== null) {
      message.create_time = object.create_time;
    } else {
      message.create_time = void 0;
    }
    if (object.update_time !== void 0 && object.update_time !== null) {
      message.update_time = object.update_time;
    } else {
      message.update_time = void 0;
    }
    if (object.persistent !== void 0 && object.persistent !== null) {
      message.persistent = object.persistent;
    } else {
      message.persistent = void 0;
    }
    if (object.room_name !== void 0 && object.room_name !== null) {
      message.room_name = object.room_name;
    } else {
      message.room_name = "";
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = object.group_id;
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    } else {
      message.user_id_two = "";
    }
    return message;
  }
};
var baseChannelMessageSend = { channel_id: "", content: "" };
var ChannelMessageSend = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.channel_id = "";
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.content !== void 0 && (obj.content = message.content);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessageSend);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    return message;
  }
};
var baseChannelMessageUpdate = {
  channel_id: "",
  message_id: "",
  content: ""
};
var ChannelMessageUpdate = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = String(object.message_id);
    } else {
      message.message_id = "";
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    message.content !== void 0 && (obj.content = message.content);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessageUpdate);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = object.message_id;
    } else {
      message.message_id = "";
    }
    if (object.content !== void 0 && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    return message;
  }
};
var baseChannelMessageRemove = { channel_id: "", message_id: "" };
var ChannelMessageRemove = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = String(object.message_id);
    } else {
      message.message_id = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    message.message_id !== void 0 && (obj.message_id = message.message_id);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelMessageRemove);
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
    }
    if (object.message_id !== void 0 && object.message_id !== null) {
      message.message_id = object.message_id;
    } else {
      message.message_id = "";
    }
    return message;
  }
};
var baseChannelPresenceEvent = {
  channel_id: "",
  room_name: "",
  group_id: "",
  user_id_one: "",
  user_id_two: ""
};
var ChannelPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(34).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(42).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(50).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(58).string(message.user_id_two);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.channel_id = "";
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
    } else {
      message.room_name = "";
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = String(object.group_id);
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = String(object.user_id_one);
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = String(object.user_id_two);
    } else {
      message.user_id_two = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.channel_id !== void 0 && (obj.channel_id = message.channel_id);
    if (message.joins) {
      obj.joins = message.joins.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.leaves = [];
    }
    message.room_name !== void 0 && (obj.room_name = message.room_name);
    message.group_id !== void 0 && (obj.group_id = message.group_id);
    message.user_id_one !== void 0 && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== void 0 && (obj.user_id_two = message.user_id_two);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseChannelPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.channel_id !== void 0 && object.channel_id !== null) {
      message.channel_id = object.channel_id;
    } else {
      message.channel_id = "";
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
    } else {
      message.room_name = "";
    }
    if (object.group_id !== void 0 && object.group_id !== null) {
      message.group_id = object.group_id;
    } else {
      message.group_id = "";
    }
    if (object.user_id_one !== void 0 && object.user_id_one !== null) {
      message.user_id_one = object.user_id_one;
    } else {
      message.user_id_one = "";
    }
    if (object.user_id_two !== void 0 && object.user_id_two !== null) {
      message.user_id_two = object.user_id_two;
    } else {
      message.user_id_two = "";
    }
    return message;
  }
};
var baseError = { code: 0, message: "" };
var Error2 = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    Object.entries(message.context).forEach(([key, value]) => {
      Error_ContextEntry.encode(
        { key, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.code = 0;
    }
    if (object.message !== void 0 && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.context !== void 0 && object.context !== null) {
      Object.entries(object.context).forEach(([key, value]) => {
        message.context[key] = String(value);
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
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseError);
    message.context = {};
    if (object.code !== void 0 && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = 0;
    }
    if (object.message !== void 0 && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.context !== void 0 && object.context !== null) {
      Object.entries(object.context).forEach(([key, value]) => {
        if (value !== void 0) {
          message.context[key] = String(value);
        }
      });
    }
    return message;
  }
};
var baseError_ContextEntry = { key: "", value: "" };
var Error_ContextEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseError_ContextEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  }
};
var baseMatch = { match_id: "", authoritative: false, size: 0 };
var Match = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.authoritative === true) {
      writer.uint32(16).bool(message.authoritative);
    }
    if (message.label !== void 0) {
      StringValue.encode(
        { value: message.label },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(32).int32(message.size);
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(42).fork()).ldelim();
    }
    if (message.self !== void 0) {
      UserPresence.encode(message.self, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.match_id = "";
    }
    if (object.authoritative !== void 0 && object.authoritative !== null) {
      message.authoritative = Boolean(object.authoritative);
    } else {
      message.authoritative = false;
    }
    if (object.label !== void 0 && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = void 0;
    }
    if (object.size !== void 0 && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = 0;
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    } else {
      message.self = void 0;
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
      obj.presences = message.presences.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.presences = [];
    }
    message.self !== void 0 && (obj.self = message.self ? UserPresence.toJSON(message.self) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatch);
    message.presences = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    if (object.authoritative !== void 0 && object.authoritative !== null) {
      message.authoritative = object.authoritative;
    } else {
      message.authoritative = false;
    }
    if (object.label !== void 0 && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = void 0;
    }
    if (object.size !== void 0 && object.size !== null) {
      message.size = object.size;
    } else {
      message.size = 0;
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    } else {
      message.self = void 0;
    }
    return message;
  }
};
var baseMatchCreate = {};
var MatchCreate = {
  encode(_, writer = import_minimal4.default.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
  toJSON(_) {
    const obj = {};
    return obj;
  },
  fromPartial(_) {
    const message = __spreadValues({}, baseMatchCreate);
    return message;
  }
};
var baseMatchData = { match_id: "", op_code: 0, reliable: false };
var MatchData = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    if (message.op_code !== 0) {
      writer.uint32(24).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.reliable === true) {
      writer.uint32(40).bool(message.reliable);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchData);
    message.data = new Uint8Array();
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
    message.data = new Uint8Array();
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = void 0;
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    } else {
      message.op_code = 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    } else {
      message.reliable = false;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    message.op_code !== void 0 && (obj.op_code = message.op_code);
    message.data !== void 0 && (obj.data = base64FromBytes(
      message.data !== void 0 ? message.data : new Uint8Array()
    ));
    message.reliable !== void 0 && (obj.reliable = message.reliable);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchData);
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = void 0;
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = object.op_code;
    } else {
      message.op_code = 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = object.reliable;
    } else {
      message.reliable = false;
    }
    return message;
  }
};
var baseMatchDataSend = { match_id: "", op_code: 0, reliable: false };
var MatchDataSend = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.op_code !== 0) {
      writer.uint32(16).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(34).fork()).ldelim();
    }
    if (message.reliable === true) {
      writer.uint32(40).bool(message.reliable);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchDataSend);
    message.presences = [];
    message.data = new Uint8Array();
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
    message.data = new Uint8Array();
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = "";
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    } else {
      message.op_code = 0;
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
    } else {
      message.reliable = false;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    message.op_code !== void 0 && (obj.op_code = message.op_code);
    message.data !== void 0 && (obj.data = base64FromBytes(
      message.data !== void 0 ? message.data : new Uint8Array()
    ));
    if (message.presences) {
      obj.presences = message.presences.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.presences = [];
    }
    message.reliable !== void 0 && (obj.reliable = message.reliable);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchDataSend);
    message.presences = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = object.op_code;
    } else {
      message.op_code = 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = object.reliable;
    } else {
      message.reliable = false;
    }
    return message;
  }
};
var baseMatchJoin = {};
var MatchJoin = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.match_id !== void 0) {
      writer.uint32(10).string(message.match_id);
    }
    if (message.token !== void 0) {
      writer.uint32(18).string(message.token);
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      MatchJoin_MetadataEntry.encode(
        { key, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseMatchJoin);
    message.metadata = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          const entry3 = MatchJoin_MetadataEntry.decode(
            reader,
            reader.uint32()
          );
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
      message.match_id = String(object.match_id);
    } else {
      message.match_id = void 0;
    }
    if (object.token !== void 0 && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = void 0;
    }
    if (object.metadata !== void 0 && object.metadata !== null) {
      Object.entries(object.metadata).forEach(([key, value]) => {
        message.metadata[key] = String(value);
      });
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    message.token !== void 0 && (obj.token = message.token);
    obj.metadata = {};
    if (message.metadata) {
      Object.entries(message.metadata).forEach(([k, v]) => {
        obj.metadata[k] = v;
      });
    }
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchJoin);
    message.metadata = {};
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = void 0;
    }
    if (object.token !== void 0 && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = void 0;
    }
    if (object.metadata !== void 0 && object.metadata !== null) {
      Object.entries(object.metadata).forEach(([key, value]) => {
        if (value !== void 0) {
          message.metadata[key] = String(value);
        }
      });
    }
    return message;
  }
};
var baseMatchJoin_MetadataEntry = { key: "", value: "" };
var MatchJoin_MetadataEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchJoin_MetadataEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  }
};
var baseMatchLeave = { match_id: "" };
var MatchLeave = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.match_id = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchLeave);
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
    }
    return message;
  }
};
var baseMatchPresenceEvent = { match_id: "" };
var MatchPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
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
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.match_id = "";
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
  toJSON(message) {
    const obj = {};
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    if (message.joins) {
      obj.joins = message.joins.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.leaves = [];
    }
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = "";
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
  }
};
var baseMatchmakerAdd = { min_count: 0, max_count: 0, query: "" };
var MatchmakerAdd = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.min_count !== 0) {
      writer.uint32(8).int32(message.min_count);
    }
    if (message.max_count !== 0) {
      writer.uint32(16).int32(message.max_count);
    }
    if (message.query !== "") {
      writer.uint32(26).string(message.query);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerAdd_StringPropertiesEntry.encode(
        { key, value },
        writer.uint32(34).fork()
      ).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerAdd_NumericPropertiesEntry.encode(
        { key, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
          const entry4 = MatchmakerAdd_StringPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry4.value !== void 0) {
            message.string_properties[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 = MatchmakerAdd_NumericPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
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
    } else {
      message.min_count = 0;
    }
    if (object.max_count !== void 0 && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    } else {
      message.max_count = 0;
    }
    if (object.query !== void 0 && object.query !== null) {
      message.query = String(object.query);
    } else {
      message.query = "";
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
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerAdd);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.min_count !== void 0 && object.min_count !== null) {
      message.min_count = object.min_count;
    } else {
      message.min_count = 0;
    }
    if (object.max_count !== void 0 && object.max_count !== null) {
      message.max_count = object.max_count;
    } else {
      message.max_count = 0;
    }
    if (object.query !== void 0 && object.query !== null) {
      message.query = object.query;
    } else {
      message.query = "";
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
  }
};
var baseMatchmakerAdd_StringPropertiesEntry = { key: "", value: "" };
var MatchmakerAdd_StringPropertiesEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerAdd_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  }
};
var baseMatchmakerAdd_NumericPropertiesEntry = { key: "", value: 0 };
var MatchmakerAdd_NumericPropertiesEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerAdd_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    return message;
  }
};
var baseMatchmakerMatched = { ticket: "" };
var MatchmakerMatched = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    if (message.match_id !== void 0) {
      writer.uint32(18).string(message.match_id);
    }
    if (message.token !== void 0) {
      writer.uint32(26).string(message.token);
    }
    for (const v of message.users) {
      MatchmakerMatched_MatchmakerUser.encode(
        v,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.self !== void 0) {
      MatchmakerMatched_MatchmakerUser.encode(
        message.self,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
          message.match_id = reader.string();
          break;
        case 3:
          message.token = reader.string();
          break;
        case 4:
          message.users.push(
            MatchmakerMatched_MatchmakerUser.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.self = MatchmakerMatched_MatchmakerUser.decode(
            reader,
            reader.uint32()
          );
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
    } else {
      message.ticket = "";
    }
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = String(object.match_id);
    } else {
      message.match_id = void 0;
    }
    if (object.token !== void 0 && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = void 0;
    }
    if (object.users !== void 0 && object.users !== null) {
      for (const e of object.users) {
        message.users.push(MatchmakerMatched_MatchmakerUser.fromJSON(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = MatchmakerMatched_MatchmakerUser.fromJSON(object.self);
    } else {
      message.self = void 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    message.match_id !== void 0 && (obj.match_id = message.match_id);
    message.token !== void 0 && (obj.token = message.token);
    if (message.users) {
      obj.users = message.users.map(
        (e) => e ? MatchmakerMatched_MatchmakerUser.toJSON(e) : void 0
      );
    } else {
      obj.users = [];
    }
    message.self !== void 0 && (obj.self = message.self ? MatchmakerMatched_MatchmakerUser.toJSON(message.self) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerMatched);
    message.users = [];
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    if (object.match_id !== void 0 && object.match_id !== null) {
      message.match_id = object.match_id;
    } else {
      message.match_id = void 0;
    }
    if (object.token !== void 0 && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = void 0;
    }
    if (object.users !== void 0 && object.users !== null) {
      for (const e of object.users) {
        message.users.push(MatchmakerMatched_MatchmakerUser.fromPartial(e));
      }
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = MatchmakerMatched_MatchmakerUser.fromPartial(object.self);
    } else {
      message.self = void 0;
    }
    return message;
  }
};
var baseMatchmakerMatched_MatchmakerUser = { party_id: "" };
var MatchmakerMatched_MatchmakerUser = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(10).fork()).ldelim();
    }
    if (message.party_id !== "") {
      writer.uint32(18).string(message.party_id);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.encode(
        { key, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.encode(
        { key, value },
        writer.uint32(50).fork()
      ).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
          const entry5 = MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry5.value !== void 0) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
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
    } else {
      message.presence = void 0;
    }
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
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
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = void 0;
    }
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
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
  }
};
var baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry = {
  key: "",
  value: ""
};
var MatchmakerMatched_MatchmakerUser_StringPropertiesEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  }
};
var baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry = {
  key: "",
  value: 0
};
var MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    return message;
  }
};
var baseMatchmakerRemove = { ticket: "" };
var MatchmakerRemove = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.ticket = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerRemove);
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    return message;
  }
};
var baseMatchmakerTicket = { ticket: "" };
var MatchmakerTicket = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.ticket = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseMatchmakerTicket);
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    return message;
  }
};
var baseNotifications = {};
var Notifications = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.notifications) {
      Notification.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, baseNotifications);
    message.notifications = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notifications.push(
            Notification.decode(reader, reader.uint32())
          );
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
  toJSON(message) {
    const obj = {};
    if (message.notifications) {
      obj.notifications = message.notifications.map(
        (e) => e ? Notification.toJSON(e) : void 0
      );
    } else {
      obj.notifications = [];
    }
    return obj;
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
  }
};
var baseParty = { party_id: "", open: false, max_size: 0 };
var Party = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.open === true) {
      writer.uint32(16).bool(message.open);
    }
    if (message.max_size !== 0) {
      writer.uint32(24).int32(message.max_size);
    }
    if (message.self !== void 0) {
      UserPresence.encode(message.self, writer.uint32(34).fork()).ldelim();
    }
    if (message.leader !== void 0) {
      UserPresence.encode(message.leader, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    if (object.open !== void 0 && object.open !== null) {
      message.open = Boolean(object.open);
    } else {
      message.open = false;
    }
    if (object.max_size !== void 0 && object.max_size !== null) {
      message.max_size = Number(object.max_size);
    } else {
      message.max_size = 0;
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromJSON(object.self);
    } else {
      message.self = void 0;
    }
    if (object.leader !== void 0 && object.leader !== null) {
      message.leader = UserPresence.fromJSON(object.leader);
    } else {
      message.leader = void 0;
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
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
      obj.presences = message.presences.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.presences = [];
    }
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseParty);
    message.presences = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.open !== void 0 && object.open !== null) {
      message.open = object.open;
    } else {
      message.open = false;
    }
    if (object.max_size !== void 0 && object.max_size !== null) {
      message.max_size = object.max_size;
    } else {
      message.max_size = 0;
    }
    if (object.self !== void 0 && object.self !== null) {
      message.self = UserPresence.fromPartial(object.self);
    } else {
      message.self = void 0;
    }
    if (object.leader !== void 0 && object.leader !== null) {
      message.leader = UserPresence.fromPartial(object.leader);
    } else {
      message.leader = void 0;
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  }
};
var basePartyCreate = { open: false, max_size: 0 };
var PartyCreate = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.open === true) {
      writer.uint32(8).bool(message.open);
    }
    if (message.max_size !== 0) {
      writer.uint32(16).int32(message.max_size);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.open = false;
    }
    if (object.max_size !== void 0 && object.max_size !== null) {
      message.max_size = Number(object.max_size);
    } else {
      message.max_size = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.open !== void 0 && (obj.open = message.open);
    message.max_size !== void 0 && (obj.max_size = message.max_size);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyCreate);
    if (object.open !== void 0 && object.open !== null) {
      message.open = object.open;
    } else {
      message.open = false;
    }
    if (object.max_size !== void 0 && object.max_size !== null) {
      message.max_size = object.max_size;
    } else {
      message.max_size = 0;
    }
    return message;
  }
};
var basePartyJoin = { party_id: "" };
var PartyJoin = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyJoin);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    return message;
  }
};
var basePartyLeave = { party_id: "" };
var PartyLeave = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyLeave);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    return message;
  }
};
var basePartyPromote = { party_id: "" };
var PartyPromote = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = void 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyPromote);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = void 0;
    }
    return message;
  }
};
var basePartyLeader = { party_id: "" };
var PartyLeader = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = void 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyLeader);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = void 0;
    }
    return message;
  }
};
var basePartyAccept = { party_id: "" };
var PartyAccept = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = void 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyAccept);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = void 0;
    }
    return message;
  }
};
var basePartyRemove = { party_id: "" };
var PartyRemove = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = void 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyRemove);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = void 0;
    }
    return message;
  }
};
var basePartyClose = { party_id: "" };
var PartyClose = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyClose);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    return message;
  }
};
var basePartyJoinRequestList = { party_id: "" };
var PartyJoinRequestList = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyJoinRequestList);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    return message;
  }
};
var basePartyJoinRequest = { party_id: "" };
var PartyJoinRequest = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromJSON(e));
      }
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    if (message.presences) {
      obj.presences = message.presences.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.presences = [];
    }
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyJoinRequest);
    message.presences = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presences !== void 0 && object.presences !== null) {
      for (const e of object.presences) {
        message.presences.push(UserPresence.fromPartial(e));
      }
    }
    return message;
  }
};
var basePartyMatchmakerAdd = {
  party_id: "",
  min_count: 0,
  max_count: 0,
  query: ""
};
var PartyMatchmakerAdd = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.min_count !== 0) {
      writer.uint32(16).int32(message.min_count);
    }
    if (message.max_count !== 0) {
      writer.uint32(24).int32(message.max_count);
    }
    if (message.query !== "") {
      writer.uint32(34).string(message.query);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      PartyMatchmakerAdd_StringPropertiesEntry.encode(
        { key, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      PartyMatchmakerAdd_NumericPropertiesEntry.encode(
        { key, value },
        writer.uint32(50).fork()
      ).ldelim();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
          const entry5 = PartyMatchmakerAdd_StringPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry5.value !== void 0) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = PartyMatchmakerAdd_NumericPropertiesEntry.decode(
            reader,
            reader.uint32()
          );
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
    } else {
      message.party_id = "";
    }
    if (object.min_count !== void 0 && object.min_count !== null) {
      message.min_count = Number(object.min_count);
    } else {
      message.min_count = 0;
    }
    if (object.max_count !== void 0 && object.max_count !== null) {
      message.max_count = Number(object.max_count);
    } else {
      message.max_count = 0;
    }
    if (object.query !== void 0 && object.query !== null) {
      message.query = String(object.query);
    } else {
      message.query = "";
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
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd);
    message.string_properties = {};
    message.numeric_properties = {};
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.min_count !== void 0 && object.min_count !== null) {
      message.min_count = object.min_count;
    } else {
      message.min_count = 0;
    }
    if (object.max_count !== void 0 && object.max_count !== null) {
      message.max_count = object.max_count;
    } else {
      message.max_count = 0;
    }
    if (object.query !== void 0 && object.query !== null) {
      message.query = object.query;
    } else {
      message.query = "";
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
  }
};
var basePartyMatchmakerAdd_StringPropertiesEntry = {
  key: "",
  value: ""
};
var PartyMatchmakerAdd_StringPropertiesEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd_StringPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  }
};
var basePartyMatchmakerAdd_NumericPropertiesEntry = {
  key: "",
  value: 0
};
var PartyMatchmakerAdd_NumericPropertiesEntry = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerAdd_NumericPropertiesEntry);
    if (object.key !== void 0 && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== void 0 && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    return message;
  }
};
var basePartyMatchmakerRemove = { party_id: "", ticket: "" };
var PartyMatchmakerRemove = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.ticket !== "") {
      writer.uint32(18).string(message.ticket);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerRemove);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    return message;
  }
};
var basePartyMatchmakerTicket = { party_id: "", ticket: "" };
var PartyMatchmakerTicket = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.ticket !== "") {
      writer.uint32(18).string(message.ticket);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
    }
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.ticket !== void 0 && (obj.ticket = message.ticket);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyMatchmakerTicket);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.ticket !== void 0 && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    return message;
  }
};
var basePartyData = { party_id: "", op_code: 0 };
var PartyData = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== void 0) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    if (message.op_code !== 0) {
      writer.uint32(24).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyData);
    message.data = new Uint8Array();
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
    message.data = new Uint8Array();
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromJSON(object.presence);
    } else {
      message.presence = void 0;
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    } else {
      message.op_code = 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.presence !== void 0 && (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : void 0);
    message.op_code !== void 0 && (obj.op_code = message.op_code);
    message.data !== void 0 && (obj.data = base64FromBytes(
      message.data !== void 0 ? message.data : new Uint8Array()
    ));
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyData);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.presence !== void 0 && object.presence !== null) {
      message.presence = UserPresence.fromPartial(object.presence);
    } else {
      message.presence = void 0;
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = object.op_code;
    } else {
      message.op_code = 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    return message;
  }
};
var basePartyDataSend = { party_id: "", op_code: 0 };
var PartyDataSend = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.op_code !== 0) {
      writer.uint32(16).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = __spreadValues({}, basePartyDataSend);
    message.data = new Uint8Array();
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
    message.data = new Uint8Array();
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = String(object.party_id);
    } else {
      message.party_id = "";
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = Number(object.op_code);
    } else {
      message.op_code = 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    message.op_code !== void 0 && (obj.op_code = message.op_code);
    message.data !== void 0 && (obj.data = base64FromBytes(
      message.data !== void 0 ? message.data : new Uint8Array()
    ));
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyDataSend);
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
    }
    if (object.op_code !== void 0 && object.op_code !== null) {
      message.op_code = object.op_code;
    } else {
      message.op_code = 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    return message;
  }
};
var basePartyPresenceEvent = { party_id: "" };
var PartyPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
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
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.party_id = "";
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
  toJSON(message) {
    const obj = {};
    message.party_id !== void 0 && (obj.party_id = message.party_id);
    if (message.joins) {
      obj.joins = message.joins.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.leaves = [];
    }
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, basePartyPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.party_id !== void 0 && object.party_id !== null) {
      message.party_id = object.party_id;
    } else {
      message.party_id = "";
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
  }
};
var basePing = {};
var Ping = {
  encode(_, writer = import_minimal4.default.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
  toJSON(_) {
    const obj = {};
    return obj;
  },
  fromPartial(_) {
    const message = __spreadValues({}, basePing);
    return message;
  }
};
var basePong = {};
var Pong = {
  encode(_, writer = import_minimal4.default.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
  toJSON(_) {
    const obj = {};
    return obj;
  },
  fromPartial(_) {
    const message = __spreadValues({}, basePong);
    return message;
  }
};
var baseStatus = {};
var Status = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.presences) {
      UserPresence.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
  toJSON(message) {
    const obj = {};
    if (message.presences) {
      obj.presences = message.presences.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.presences = [];
    }
    return obj;
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
  }
};
var baseStatusFollow = { user_ids: "", usernames: "" };
var StatusFollow = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
  }
};
var baseStatusPresenceEvent = {};
var StatusPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.joins) {
      UserPresence.encode(v, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
  toJSON(message) {
    const obj = {};
    if (message.joins) {
      obj.joins = message.joins.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.leaves = [];
    }
    return obj;
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
  }
};
var baseStatusUnfollow = { user_ids: "" };
var StatusUnfollow = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
  toJSON(message) {
    const obj = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
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
  }
};
var baseStatusUpdate = {};
var StatusUpdate = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.status !== void 0) {
      StringValue.encode(
        { value: message.status },
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.status = void 0;
    }
    return message;
  },
  toJSON(message) {
    const obj = {};
    message.status !== void 0 && (obj.status = message.status);
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStatusUpdate);
    if (object.status !== void 0 && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = void 0;
    }
    return message;
  }
};
var baseStream = { mode: 0, subject: "", subcontext: "", label: "" };
var Stream = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subcontext !== "") {
      writer.uint32(26).string(message.subcontext);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.mode = 0;
    }
    if (object.subject !== void 0 && object.subject !== null) {
      message.subject = String(object.subject);
    } else {
      message.subject = "";
    }
    if (object.subcontext !== void 0 && object.subcontext !== null) {
      message.subcontext = String(object.subcontext);
    } else {
      message.subcontext = "";
    }
    if (object.label !== void 0 && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = "";
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
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStream);
    if (object.mode !== void 0 && object.mode !== null) {
      message.mode = object.mode;
    } else {
      message.mode = 0;
    }
    if (object.subject !== void 0 && object.subject !== null) {
      message.subject = object.subject;
    } else {
      message.subject = "";
    }
    if (object.subcontext !== void 0 && object.subcontext !== null) {
      message.subcontext = object.subcontext;
    } else {
      message.subcontext = "";
    }
    if (object.label !== void 0 && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = "";
    }
    return message;
  }
};
var baseStreamData = { data: "", reliable: false };
var StreamData = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.stream !== void 0) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    if (message.sender !== void 0) {
      UserPresence.encode(message.sender, writer.uint32(18).fork()).ldelim();
    }
    if (message.data !== "") {
      writer.uint32(26).string(message.data);
    }
    if (message.reliable === true) {
      writer.uint32(32).bool(message.reliable);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.stream = void 0;
    }
    if (object.sender !== void 0 && object.sender !== null) {
      message.sender = UserPresence.fromJSON(object.sender);
    } else {
      message.sender = void 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = String(object.data);
    } else {
      message.data = "";
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = Boolean(object.reliable);
    } else {
      message.reliable = false;
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
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStreamData);
    if (object.stream !== void 0 && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
    } else {
      message.stream = void 0;
    }
    if (object.sender !== void 0 && object.sender !== null) {
      message.sender = UserPresence.fromPartial(object.sender);
    } else {
      message.sender = void 0;
    }
    if (object.data !== void 0 && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = "";
    }
    if (object.reliable !== void 0 && object.reliable !== null) {
      message.reliable = object.reliable;
    } else {
      message.reliable = false;
    }
    return message;
  }
};
var baseStreamPresenceEvent = {};
var StreamPresenceEvent = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.stream !== void 0) {
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
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.stream = void 0;
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
  toJSON(message) {
    const obj = {};
    message.stream !== void 0 && (obj.stream = message.stream ? Stream.toJSON(message.stream) : void 0);
    if (message.joins) {
      obj.joins = message.joins.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map(
        (e) => e ? UserPresence.toJSON(e) : void 0
      );
    } else {
      obj.leaves = [];
    }
    return obj;
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseStreamPresenceEvent);
    message.joins = [];
    message.leaves = [];
    if (object.stream !== void 0 && object.stream !== null) {
      message.stream = Stream.fromPartial(object.stream);
    } else {
      message.stream = void 0;
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
  }
};
var baseUserPresence = {
  user_id: "",
  session_id: "",
  username: "",
  persistence: false
};
var UserPresence = {
  encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.session_id !== "") {
      writer.uint32(18).string(message.session_id);
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.persistence === true) {
      writer.uint32(32).bool(message.persistence);
    }
    if (message.status !== void 0) {
      StringValue.encode(
        { value: message.status },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal4.default.Reader ? input : new import_minimal4.default.Reader(input);
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
    } else {
      message.user_id = "";
    }
    if (object.session_id !== void 0 && object.session_id !== null) {
      message.session_id = String(object.session_id);
    } else {
      message.session_id = "";
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.persistence !== void 0 && object.persistence !== null) {
      message.persistence = Boolean(object.persistence);
    } else {
      message.persistence = false;
    }
    if (object.status !== void 0 && object.status !== null) {
      message.status = String(object.status);
    } else {
      message.status = void 0;
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
  },
  fromPartial(object) {
    const message = __spreadValues({}, baseUserPresence);
    if (object.user_id !== void 0 && object.user_id !== null) {
      message.user_id = object.user_id;
    } else {
      message.user_id = "";
    }
    if (object.session_id !== void 0 && object.session_id !== null) {
      message.session_id = object.session_id;
    } else {
      message.session_id = "";
    }
    if (object.username !== void 0 && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.persistence !== void 0 && object.persistence !== null) {
      message.persistence = object.persistence;
    } else {
      message.persistence = false;
    }
    if (object.status !== void 0 && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = void 0;
    }
    return message;
  }
};
var globalThis3 = (() => {
  if (typeof globalThis3 !== "undefined")
    return globalThis3;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
  throw "Unable to locate global object";
})();
var atob2 = globalThis3.atob || ((b64) => globalThis3.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
  const bin = atob2(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}
var btoa2 = globalThis3.btoa || ((bin) => globalThis3.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
  const bin = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa2(bin.join(""));
}
function toTimestamp2(date) {
  const seconds = date.getTime() / 1e3;
  const nanos = date.getTime() % 1e3 * 1e6;
  return { seconds, nanos };
}
function fromTimestamp2(t) {
  let millis = t.seconds * 1e3;
  millis += t.nanos / 1e6;
  return new Date(millis);
}
function fromJsonTimestamp2(o) {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp2(Timestamp.fromJSON(o));
  }
}
function longToNumber2(long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis3.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}
if (import_minimal4.default.util.Long !== import_long2.default) {
  import_minimal4.default.util.Long = import_long2.default;
  import_minimal4.default.configure();
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
        const envelope = Envelope.decode(uintBuffer);
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
    if (msg.match_data_send) {
      let payload = msg.match_data_send.data;
      if (typeof payload == "string") {
        msg.match_data_send.data = new TextEncoder().encode(payload);
      }
    } else if (msg.party_data_send) {
      let payload = msg.party_data_send.data;
      if (typeof payload == "string") {
        msg.party_data_send.data = new TextEncoder().encode(payload);
      }
    }
    const envelopeWriter = Envelope.encode(Envelope.fromPartial(msg));
    const encodedMsg = envelopeWriter.finish();
    this._socket.send(encodedMsg);
  }
};
