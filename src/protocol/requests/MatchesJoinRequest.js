import MatchesResponse from './responses/MatchesResponse';

export default function MatchesJoinRequest({
  matchIds = [],
  tokens = [],
} = {}) {
  function build_() {
    return {
      matchesJoin: {
        matches: [
          ...matchIds.map((matchId) => ({matchId})),
          ...tokens.map((token) => ({token})),
        ],
      },
    };
  }

  return {
    get matchIds() {
      return matchIds;
    },
    set matchIds(val) {
      matchIds = val;
    },

    get tokens() {
      return tokens;
    },
    set tokens(val) {
      tokens = val;
    },

    build_,
    processResponse_: MatchesResponse,
  };
}
