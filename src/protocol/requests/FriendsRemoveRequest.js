export default function FriendsRemoveRequest({
  userIds = [],
} = {}) {
  function build_() {
    return {
      friendsRemove: {
        userIds: userIds.map((userId) => ({userId})),
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

    build_,
  };
}
