export default function TopicMessagesResponse(message) {
  const {
    topicMessages: {
      messages = [],
    },
  } = message;

  messages.forEach((message) => {
    message.data = JSON.parse(message.data);
  });

  return message.topicMessages;
}
