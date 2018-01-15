import TopicMessagesResponse from './responses/TopicMessagesResponse';

export default function TopicMessagesListRequest({
  cursor,
  forward, // boolean
  limit, // number <= 100

  // set only one of the followings
  userId,
  room,
  groupId,
} = {}) {
  function build_() {
    const msg = {
      topicMessagesList: {
        cursor,
        forward,
        limit,
      },
    };

    if (userId) {
      msg.topicMessagesList.userId = userId;
    } else if (room) {
      msg.topicMessagesList.room = room;
    } else if (groupId) {
      msg.topicMessagesList.groupId = groupId;
    }

    return msg;
  }

  return {
    get cursor() {
      return cursor;
    },
    set cursor(val) {
      cursor = val;
    },

    get forward() {
      return forward;
    },
    set forward(val) {
      forward = val;
    },

    get limit() {
      return limit;
    },
    set limit(val) {
      limit = val;
    },

    get userId() {
      return userId;
    },
    set userId(val) {
      userId = val;
    },

    get room() {
      return room;
    },
    set room(val) {
      room = val;
    },

    get groupId() {
      return groupId;
    },
    set groupId(val) {
      groupId = val;
    },

    build_,
    processResponse_: TopicMessagesResponse,
  };
}
