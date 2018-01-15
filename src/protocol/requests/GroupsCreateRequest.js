import GroupsResponse from './responses/GroupsResponse';

export default function GroupsCreateRequest({
  groups = [],
} = {}) {
  function create(
    name,
    description,
    avatarUrl,
    lang,
    metadata = {},
    privateGroup
  ) {
    groups.push({
      name,
      description,
      avatarUrl,
      lang,
      private: privateGroup,
      metadata: JSON.stringify(metadata),
    });
  }

  function build_() {
    return {
      groupsCreate: {
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

    create,
    build_,
    processResponse_: GroupsResponse,
  };
}
