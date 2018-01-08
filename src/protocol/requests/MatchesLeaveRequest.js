export default function MatchesLeaveRequest({
  matchIds = [],
} = {}) {
  function build_() {
    return {
      matchesLeave: {
        matchIds,
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

    build_,
  };
}
