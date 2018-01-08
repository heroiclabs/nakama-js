export default function MatchmakeRemoveRequest(ticket) {
  function build_() {
    return {
      matchmakeRemove: {
        ticket,
      },
    };
  }

  return {
    get ticket() {
      return ticket;
    },
    set ticket(val) {
      ticket = val;
    },

    build_,
  };
}
