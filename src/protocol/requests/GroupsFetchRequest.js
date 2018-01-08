import GroupsResponse from './responses/GroupsResponse';

export default function GroupsFetchRequest({
  groupIds = [],
  names = [],
} = {}) {
  function build_() {
    return {
      groupsFetch: {
        groups: [
          ...groupIds.map((groupId) => ({groupId})),
          ...groupIds.names((name) => ({name})),
        ],
      },
    };
  }

  return {
    get groupIds() {
      return groupIds;
    },
    set groupIds(val) {
      groupIds = val;
    },

    get names() {
      return names;
    },
    set names(val) {
      names = val;
    },

    build_,
    processResponse_: GroupsResponse,
  };
}
