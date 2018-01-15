export default function GroupUsersKickRequest({
  kicks = [],
} = {}) {
  function kick(groupId, userId) {
    kicks.push({groupId, userID});
  }

  function build_() {
    return {
      groupUsersKick: {
        groupUsers: kicks,
      },
    };
  }

  return {
    get kicks() {
      return kicks;
    },
    set kicks(val) {
      kicks = val;
    },

    kick,
    build_,
  };
}
