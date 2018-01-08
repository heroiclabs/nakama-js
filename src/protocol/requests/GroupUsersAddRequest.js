export default function GroupUsersAddRequest({
  adds = [],
} = {}) {
  function add(groupId, userId) {
    adds.push({
      groupId,
      userID,
    });
  }

  function build_() {
    return {
      groupUsersAdd: {
        groupUsers: adds,
      },
    };
  }

  return {
    get adds() {
      return adds;
    },
    set add(val) {
      adds = val;
    },

    add,
    build_,
  };
}
