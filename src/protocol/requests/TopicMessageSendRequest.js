import TopicMessageAckResponse from './responses/TopicMessageAckResponse';

export default function TopicMessageSendRequest({
  topic,
  data,
} = {}) {
  function build_() {
    return {
      topicMessageSend: {
        topic,
        data: JSON.stringify(data),
      },
    };
  }

  return {
    get topic() {
      return topic;
    },
    set topic(val) {
      topic = val;
    },

    get data() {
      return data;
    },
    set data(val) {
      data = val;
    },

    build_,
    processResponse_: TopicMessageAckResponse,
  };
}
