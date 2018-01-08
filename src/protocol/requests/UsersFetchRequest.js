import UsersResponse from './responses/UsersResponse';

export default function UsersFetchRequest({
  userIds = [],
  handles = [],
} = {}) {
  function build_() {
    return {
      usersFetch: {
        users: [
          ...userIds.map((userId) => ({userId})),
          ...handles.map((handle) => ({handle})),
        ],
      },
    };
  }

  return {
    get userIds() {
      return userIds;
    },
    set userIds(val) {
      userIds = val;
    },

    get handles() {
      return handles;
    },
    set handles(val) {
      handles = val;
    },

    build_,
    processResponse_: UsersResponse,
  };
}
