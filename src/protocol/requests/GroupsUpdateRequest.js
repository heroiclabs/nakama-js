export default function GroupsUpdateRequest({
  groups = [],
} = {}) {
  function update(
    groupId,
    name,
    description,
    avatarUrl,
    lang,
    metadata = {},
    privateGroup
  ) {
    groups.push({
      groupId,
      name,
      description,
      avatarUrl,
      lang,
      private: privateGroup,
      metadata: JSON.string(metadata),
    });
  }

  function build_() {
    return {
      groupsUpdate: {
        groups,
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

    update,
    build_,
  };
}
