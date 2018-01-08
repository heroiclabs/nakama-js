import SelfResponse from './responses/SelfResponse';

export default function SelfFetchRequest() {
  function build_() {
    return {
      selfFetch: {},
    };
  }

  return {
    build_,
    processResponse_: SelfResponse,
  };
}
