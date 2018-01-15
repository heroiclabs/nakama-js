import RpcResponse from './responses/RpcResponse';

export default function RpcRequest({
  id,
  payload,
} = {}) {
  function build_() {
    return {
      rpc: {
        id,
        payload: (payload ? JSON.stringify(payload) : null),
      },
    };
  }

  return {
    get id() {
      return id;
    },
    set id(val) {
      id = val;
    },

    get payload() {
      return payload;
    },
    set payload(val) {
      payload = val;
    },

    build_,
    processResponse_: RpcResponse,
  };
}
