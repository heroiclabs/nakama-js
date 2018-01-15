export default function GroupsJoinRequest({
  groups = [],
} = {}) {
  function build_() {
    return {
      groupsJoin: {
        groupIds: groups,
      },
    };
  }

  return {
    get groups() {
      return groups;
    },
    set groups(val) {
      groups = val;
    },

    build_,
  };
}
