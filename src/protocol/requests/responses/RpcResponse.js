export default function RpcResponse(message) {
  let {
    rpc: {
      id,
      payload,
    },
  } = message;

  payload = payload ? JSON.parse(payload) : null;

  return {
    id,
    payload,
  };
}
