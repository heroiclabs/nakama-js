export default function UsersResponse(message) {
  const {
    users: {
      users = [],
    },
  } = message;

  users.forEach((user) => {
    user.metadata = JSON.parse(user.metadata);
  });

  return users;
}
