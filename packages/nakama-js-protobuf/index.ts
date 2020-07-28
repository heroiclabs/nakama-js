import * as protobuf from 'protobufjs/minimal';
import Long from 'long';

// workaround for longs in timestamps https://github.com/stephenh/ts-proto/issues/78
// protobufjs requires the Long package to be explicitly assigned to it.
protobuf.util.Long = Long;
protobuf.configure();

export * from "./web_socket_adapter_pb";
