import base64 from 'base-64';
import MatchDataResponse from './responses/MatchDataResponse';

export default function MatchDataSendRequest({
  matchId,
  presence,
  opCode,
  data,
} = {}) {
  function build_() {
    return {
      matchDataSend: {
        matchId,
        presence,
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

    get presence() {
      return presence;
    },
    set presence(val) {
      presence = val;
    },

    get opCode() {
      return presence;
    },
    set opCode(val) {
      presence = val;
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
