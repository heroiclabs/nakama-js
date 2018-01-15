export default function FriendsBlockRequest({
  userIds = [],
} = {}) {
  function build_() {
    return {
      friendsBlock: {
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
