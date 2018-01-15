export default function FriendsAddRequest({
  userIds = [],
  handles = [],
} = {}) {
  function build_() {
    return {
      friendsAdd: {
        friends: [
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
  };
}
