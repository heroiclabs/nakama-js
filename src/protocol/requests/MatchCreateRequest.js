import MatchResponse from './responses/MatchResponse';

export default function MatchCreateRequest() {
  function build_() {
    return {
      matchCreate: {},
    };
  }

  return {
    build_,
    processResponse_: MatchResponse,
  };
}
