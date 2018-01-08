export default function TopicsLeaveRequest({
  // NOTE: The server only processes the first item of the list,
  // and will ignore and logs a warning message for other items.
  topics = [],
} = {}) {
  function build_() {
    return {
      topicsLeave: {
        topics,
      },
    };
  }

  return {
    get topics() {
      return topics;
    },
    set topics(val) {
      topics = val;
    },

    build_,
  };
}
