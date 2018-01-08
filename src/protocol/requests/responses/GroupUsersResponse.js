export default function GroupUsersResponse(message) {
  const {
    groupUsers: {
      users = [],
    },
  } = message;

  users.forEach((groupUser) => {
    groupUser.user.metadata = JSON.parse(groupUser.user.metadata);
  });

  return message.groupUsers;
}
