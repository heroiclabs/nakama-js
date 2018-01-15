import GroupsSelfResponse from './responses/GroupsSelfResponse';

export default function GroupsSelfListRequest() {
  function build_() {
    return {
      groupsSelfList: {},
    };
  }

  return {
    build_,
    processResponse_: GroupsSelfResponse,
  };
}
