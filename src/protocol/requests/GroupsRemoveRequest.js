export default function GroupsRemoveRequest({
  groups = [],
} = {}) {
  function build_() {
    return {
      groupsRemove: {
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
