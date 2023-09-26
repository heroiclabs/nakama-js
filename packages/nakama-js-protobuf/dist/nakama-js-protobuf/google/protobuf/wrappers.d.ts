import { Writer, Reader } from 'protobufjs/minimal';
/**
 *  Wrapper message for `double`.
 *
 *  The JSON representation for `DoubleValue` is JSON number.
 */
export interface DoubleValue {
    /**
     *  The double value.
     */
    value: number;
}
/**
 *  Wrapper message for `float`.
 *
 *  The JSON representation for `FloatValue` is JSON number.
 */
export interface FloatValue {
    /**
     *  The float value.
     */
    value: number;
}
/**
 *  Wrapper message for `int64`.
 *
 *  The JSON representation for `Int64Value` is JSON string.
 */
export interface Int64Value {
    /**
     *  The int64 value.
     */
    value: number;
}
/**
 *  Wrapper message for `uint64`.
 *
 *  The JSON representation for `UInt64Value` is JSON string.
 */
export interface UInt64Value {
    /**
     *  The uint64 value.
     */
    value: number;
}
/**
 *  Wrapper message for `int32`.
 *
 *  The JSON representation for `Int32Value` is JSON number.
 */
export interface Int32Value {
    /**
     *  The int32 value.
     */
    value: number;
}
/**
 *  Wrapper message for `uint32`.
 *
 *  The JSON representation for `UInt32Value` is JSON number.
 */
export interface UInt32Value {
    /**
     *  The uint32 value.
     */
    value: number;
}
/**
 *  Wrapper message for `bool`.
 *
 *  The JSON representation for `BoolValue` is JSON `true` and `false`.
 */
export interface BoolValue {
    /**
     *  The bool value.
     */
    value: boolean;
}
/**
 *  Wrapper message for `string`.
 *
 *  The JSON representation for `StringValue` is JSON string.
 */
export interface StringValue {
    /**
     *  The string value.
     */
    value: string;
}
/**
 *  Wrapper message for `bytes`.
 *
 *  The JSON representation for `BytesValue` is JSON string.
 */
export interface BytesValue {
    /**
     *  The bytes value.
     */
    value: Uint8Array;
}
export declare const protobufPackage = "google.protobuf";
export declare const DoubleValue: {
    encode(message: DoubleValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): DoubleValue;
    fromJSON(object: any): DoubleValue;
    fromPartial(object: DeepPartial<DoubleValue>): DoubleValue;
    toJSON(message: DoubleValue): unknown;
};
export declare const FloatValue: {
    encode(message: FloatValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): FloatValue;
    fromJSON(object: any): FloatValue;
    fromPartial(object: DeepPartial<FloatValue>): FloatValue;
    toJSON(message: FloatValue): unknown;
};
export declare const Int64Value: {
    encode(message: Int64Value, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): Int64Value;
    fromJSON(object: any): Int64Value;
    fromPartial(object: DeepPartial<Int64Value>): Int64Value;
    toJSON(message: Int64Value): unknown;
};
export declare const UInt64Value: {
    encode(message: UInt64Value, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): UInt64Value;
    fromJSON(object: any): UInt64Value;
    fromPartial(object: DeepPartial<UInt64Value>): UInt64Value;
    toJSON(message: UInt64Value): unknown;
};
export declare const Int32Value: {
    encode(message: Int32Value, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): Int32Value;
    fromJSON(object: any): Int32Value;
    fromPartial(object: DeepPartial<Int32Value>): Int32Value;
    toJSON(message: Int32Value): unknown;
};
export declare const UInt32Value: {
    encode(message: UInt32Value, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): UInt32Value;
    fromJSON(object: any): UInt32Value;
    fromPartial(object: DeepPartial<UInt32Value>): UInt32Value;
    toJSON(message: UInt32Value): unknown;
};
export declare const BoolValue: {
    encode(message: BoolValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): BoolValue;
    fromJSON(object: any): BoolValue;
    fromPartial(object: DeepPartial<BoolValue>): BoolValue;
    toJSON(message: BoolValue): unknown;
};
export declare const StringValue: {
    encode(message: StringValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): StringValue;
    fromJSON(object: any): StringValue;
    fromPartial(object: DeepPartial<StringValue>): StringValue;
    toJSON(message: StringValue): unknown;
};
export declare const BytesValue: {
    encode(message: BytesValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): BytesValue;
    fromJSON(object: any): BytesValue;
    fromPartial(object: DeepPartial<BytesValue>): BytesValue;
    toJSON(message: BytesValue): unknown;
};
type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]>;
} & {
    $case: T['$case'];
} : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
