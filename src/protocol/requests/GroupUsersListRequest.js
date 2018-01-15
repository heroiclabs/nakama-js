import GroupUsersResponse from './responses/GroupUsersResponse';

export default function GroupUsersListRequest(groupId) {
  function build_() {
    return {
      groupUsersList: {
        groupId,
      },
    };
  }

  return {
    get groupId() {
      return groupId;
    },
    set groupId(val) {
      groupId = val;
    },

    build_,
    processResponse_: GroupUsersResponse,
  };
}
