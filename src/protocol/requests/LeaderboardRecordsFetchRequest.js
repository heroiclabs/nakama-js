import LeaderboardRecordsResponse from './responses/LeaderboardRecordsResponse';

export default function LeaderboardRecordsFetchRequest({
  leaderboardIds = [],
  limit,
  cursor,
} = {}) {
  function build_() {
    return {
      leaderboardRecordsFetch: {
        leaderboardIds,
        limit,
        cursor,
      },
    };
  }

  return {
    get leaderboardIds() {
      return leaderboardIds;
    },
    set leaderboardIds(val) {
      leaderboardIds = val;
    },

    get limit() {
      return limit;
    },
    set limit(val) {
      limit = val;
    },

    get cursor() {
      return cursor;
    },
    set cursor(val) {
      cursor = val;
    },

    build_,
    processResponse_: LeaderboardRecordsResponse,
  };
}
