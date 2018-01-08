import LeaderboardRecordsResponse from './responses/LeaderboardRecordsResponse';

export default function LeaderboardRecordsListRequest({
  leaderboardId,
  limit,
  cursor,

  // only set one the following
  lang,
  location,
  timezone,
  ownerId,
  ownerIds = [],
} = {}) {
  function build_() {
    const msg = {
      leaderboardRecordsList: {
        leaderboardId,
        limit,
        cursor,
      },
    };

    if (lang) {
      msg.leaderboardRecordsList.lang = lang;
    } else if (location) {
      msg.leaderboardRecordsList.location = location;
    } else if (timezone) {
      msg.leaderboardRecordsList.timezone = timezone;
    } else if (ownerId) {
      msg.leaderboardRecordsList.ownerId = ownerId;
    } else if (ownerIds.length > 0) {
      msg.leaderboardRecordsList.ownerIds = {ownerIds: ownerIds};
    }

    return msg;
  }

  return {
    get leaderboardId() {
      return leaderboardId;
    },
    set leaderboardId(val) {
      leaderboardId = val;
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

    get lang() {
      return lang;
    },
    set lang(val) {
      lang = val;
    },

    get location() {
      return location;
    },
    set location(val) {
      location = val;
    },

    get timezone() {
      return timezone;
    },
    set timezone(val) {
      timezone = val;
    },

    get ownerId() {
      return ownerId;
    },
    set ownerId(val) {
      ownerId = val;
    },

    get ownerIds() {
      return ownerIds;
    },
    set ownerIds(val) {
      ownerIds = val;
    },

    build_,
    processResponse_: LeaderboardRecordsResponse,
  };
}
