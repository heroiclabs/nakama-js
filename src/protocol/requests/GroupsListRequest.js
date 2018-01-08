import GroupsResponse from './responses/GroupsResponse';

export default function GroupsListRequest({
  pageLimit,
  orderByAsc,
  cursor,

  // only set one of the followings
  lang,
  createdAt,
  count,
} = {}) {
  function build_() {
    const msg = {
      groupsList: {
        pageLimit,
        orderByAsc,
        cursor,
      },
    };

    if (lang) {
      msg.groupsList.lang = lang;
    } else if (createdAt) {
      msg.groupsList.createdAt = createdAt;
    } else if (count) {
      msg.groupsList.count = count;
    }

    return msg;
  }

  return {
    get pageLimit() {
      return pageLimit;
    },
    set pageLimit(val) {
      pageLimit = val;
    },

    get orderByAsc() {
      return orderByAsc;
    },
    set orderByAsc(val) {
      orderByAsc = val;
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

    get createdAt() {
      return createdAt;
    },
    set createdAt(val) {
      createdAt = val;
    },

    get count() {
      return count;
    },
    set count(val) {
      count = val;
    },

    build_,
    processResponse_: GroupsResponse,
  };
}
