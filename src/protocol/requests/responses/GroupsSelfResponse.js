export default function GroupsSelfResponse(message) {
  const {
    groupsSelf: {
      groupsSelf = [],
    } = {},
  } = message;

  groupsSelf.forEach((groupSelf) => {
    groupSelf.group.metadata = JSON.parse(groupSelf.group.metadata);
  });

  return message.groupsSelf;
}
