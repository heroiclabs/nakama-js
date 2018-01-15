export default function GroupUsersPromoteRequest({
  promotes = [],
} = {}) {
  function promote(groupId, userID) {
    promotes.push({groupId, userId});
  }

  function build_() {
    return {
      groupUsersPromote: {
        groupUsers: promote,
      },
    };
  }

  return {
    get promotes() {
      return promotes;
    },
    set promotes(val) {
      promotes = val;
    },

    promote,
    build_,
  };
}
