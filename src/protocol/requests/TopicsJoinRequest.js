import TopicsResponse from './responses/TopicsResponse';

export default function TopicsJoinRequest({
  // NOTE: The server only processes the first item of the list,
  // and will ignore and logs a warning message for other items.
  topics = [],
} = {}) {
  const self = {
    get topics() {
      return topics;
    },
    set topics(val) {
      topics = val;
    },

    dm,
    group,
    room,
    build_,
    processResponse_: TopicsResponse,
  };

  return self;

  function dm(userId) {
    topics.push({userId});
    return self;
  }

  function group(groupId) {
    topics.push({groupId});
    return self;
  }

  function room(room) {
    topics.push({room});
    return self;
  }

  function build_() {
    return {
      topicsJoin: {
        joins: topics,
      },
    };
  }
}
