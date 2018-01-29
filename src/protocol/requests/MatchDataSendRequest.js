import base64 from 'base-64';
import MatchDataResponse from './responses/MatchDataResponse';

export default function MatchDataSendRequest({
  matchId,
  presences,
  opCode,
  data,
} = {}) {
  function build_() {
    return {
      matchDataSend: {
        matchId,
        presences,
        opCode,
        data: base64.encode(JSON.stringify(data)),
      },
    };
  }

  return {
    get matchId() {
      return matchId;
    },
    set matchId(val) {
      matchId = val;
    },

    get presences() {
      return presences;
    },
    set presences(val) {
      presences = val;
    },

    get opCode() {
      return opCode;
    },
    set opCode(val) {
      opCode = val;
    },

    get data() {
      return data;
    },
    set data(val) {
      data = val;
    },

    build_,
    processResponse_: MatchDataResponse,
  };
}
