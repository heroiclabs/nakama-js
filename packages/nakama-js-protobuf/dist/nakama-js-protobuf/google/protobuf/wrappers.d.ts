import { Writer, Reader } from 'protobufjs/minimal';
export interface DoubleValue {
    value: number;
}
export interface FloatValue {
    value: number;
}
export interface Int64Value {
    value: number;
}
export interface UInt64Value {
    value: number;
}
export interface Int32Value {
    value: number;
}
export interface UInt32Value {
    value: number;
}
export interface BoolValue {
    value: boolean;
}
export interface StringValue {
    value: string;
}
export interface BytesValue {
    value: Uint8Array;
}
export declare const protobufPackage = "google.protobuf";
export declare const DoubleValue: {
    encode(message: DoubleValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): DoubleValue;
    fromJSON(object: any): DoubleValue;
    fromPartial(object: DeepPartial<DoubleValue>): DoubleValue;
    toJSON(message: DoubleValue): unknown;
};
export declare const FloatValue: {
    encode(message: FloatValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): FloatValue;
    fromJSON(object: any): FloatValue;
    fromPartial(object: DeepPartial<FloatValue>): FloatValue;
    toJSON(message: FloatValue): unknown;
};
export declare const Int64Value: {
    encode(message: Int64Value, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): Int64Value;
    fromJSON(object: any): Int64Value;
    fromPartial(object: DeepPartial<Int64Value>): Int64Value;
    toJSON(message: Int64Value): unknown;
};
export declare const UInt64Value: {
    encode(message: UInt64Value, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): UInt64Value;
    fromJSON(object: any): UInt64Value;
    fromPartial(object: DeepPartial<UInt64Value>): UInt64Value;
    toJSON(message: UInt64Value): unknown;
};
export declare const Int32Value: {
    encode(message: Int32Value, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): Int32Value;
    fromJSON(object: any): Int32Value;
    fromPartial(object: DeepPartial<Int32Value>): Int32Value;
    toJSON(message: Int32Value): unknown;
};
export declare const UInt32Value: {
    encode(message: UInt32Value, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): UInt32Value;
    fromJSON(object: any): UInt32Value;
    fromPartial(object: DeepPartial<UInt32Value>): UInt32Value;
    toJSON(message: UInt32Value): unknown;
};
export declare const BoolValue: {
    encode(message: BoolValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): BoolValue;
    fromJSON(object: any): BoolValue;
    fromPartial(object: DeepPartial<BoolValue>): BoolValue;
    toJSON(message: BoolValue): unknown;
};
export declare const StringValue: {
    encode(message: StringValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): StringValue;
    fromJSON(object: any): StringValue;
    fromPartial(object: DeepPartial<StringValue>): StringValue;
    toJSON(message: StringValue): unknown;
};
export declare const BytesValue: {
    encode(message: BytesValue, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): BytesValue;
    fromJSON(object: any): BytesValue;
    fromPartial(object: DeepPartial<BytesValue>): BytesValue;
    toJSON(message: BytesValue): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]>;
} & {
    $case: T['$case'];
} : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
