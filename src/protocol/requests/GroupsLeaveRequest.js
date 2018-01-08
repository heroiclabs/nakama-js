export default function GroupsLeaveRequest({
  groups = [],
} = {}) {
  function build_() {
    return {
      groupsLeave: {
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
