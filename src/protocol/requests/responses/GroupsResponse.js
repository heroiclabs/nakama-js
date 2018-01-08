export default function GroupsResponse(message) {
  const {
    groups: {
      groups = [],
    } = {},
  } = message;

  groups.forEach((group) => {
    group.metadata = JSON.parse(group.metadata);
  });

  return message.groups;
}
