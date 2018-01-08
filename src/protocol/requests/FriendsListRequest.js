import FriendsResponse from './responses/FriendsResponse';

export default function FriendsListRequest() {
  function build_() {
    return {
      friendsList: {},
    };
  }

  return {
    build_,
    processResponse_: FriendsResponse,
  };
}
