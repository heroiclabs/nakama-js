import LeaderboardsResponse from './responses/LeaderboardsResponse';

export default function LeaderboardsListRequest({
  filterLeaderboardIds = [],
  limit,
  cursor,
} = {}) {
  function build_() {
    return {
      leaderboardsList: {
        filterLeaderboardId: filterLeaderboardIds,
        limit,
        cursor,
      },
    };
  }

  return {
    get filterLeaderboardIds() {
      return filterLeaderboardIds;
    },
    set filterLeaderboardIds(val) {
      filterLeaderboardIds = val;
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
    processResponse_: LeaderboardsResponse,
  };
}
