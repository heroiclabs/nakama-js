import LeaderboardRecordsResponse from './responses/LeaderboardRecordsResponse';

export default function LeaderboardRecordWriteRequest({
  records = [],
} = {}) {
  function set(leaderboardId, value, metadata, location, timezone) {
    records.push({
      leaderboardId,
      set: value,
      metadata: JSON.stringify(metadata),
      location: location,
      timezone: timezone,
    });
  }

  function best(leaderboardId, value, metadata, location, timezone) {
    records.push({
      leaderboardId,
      best: value,
      metadata: JSON.stringify(metadata),
      location,
      timezone,
    });
  }

  function decrement(leaderboardId, value, metadata, location, timezone) {
    records.push({
      leaderboardId,
      decr: value,
      metadata: JSON.stringify(metadata),
      location,
      timezone,
    });
  }

  function increment(leaderboardId, value, metadata, location, timezone) {
    records.push({
      leaderboardId,
      incr: value,
      metadata: JSON.stringify(metadata),
      location,
      timezone,
    });
  }

  function build_() {
    return {
      leaderboardRecordsWrite: {
        records,
      },
    };
  }

  return {
    get records() {
      return records;
    },
    set records(val) {
      records = val;
    },

    set,
    best,
    decrement,
    increment,
    build_,
    processResponse_: LeaderboardRecordsResponse,
  };
}
