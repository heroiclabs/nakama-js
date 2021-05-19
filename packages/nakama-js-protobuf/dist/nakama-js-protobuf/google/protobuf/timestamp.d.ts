import { Writer, Reader } from 'protobufjs/minimal';
export interface Timestamp {
    seconds: number;
    nanos: number;
}
export declare const protobufPackage = "google.protobuf";
export declare const Timestamp: {
    encode(message: Timestamp, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number | undefined): Timestamp;
    fromJSON(object: any): Timestamp;
    fromPartial(object: DeepPartial<Timestamp>): Timestamp;
    toJSON(message: Timestamp): unknown;
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
