import NotificationsResponse from './responses/NotificationsResponse';

export default function NotificationsListRequest({
  limit,
  resumableCursor,
} = {}) {
  function build_() {
    return {
      notificationsList: {
        limit: (limit ? limit : 10),
        resumableCursor,
      },
    };
  }

  return {
    get limit() {
      return limit;
    },
    set limit(val) {
      limit = val;
    },

    get resumableCursor() {
      return resumableCursor;
    },
    set resumableCursor(val) {
      resumableCursor = val;
    },

    build_,
    processResponse_: NotificationsResponse,
  };
}
