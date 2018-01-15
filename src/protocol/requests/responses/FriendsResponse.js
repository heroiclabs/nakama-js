export default function FriendsResponse(message) {
  const {
    friends: {
      friends = [],
    } = {},
  } = message;

  friends.forEach((friend) => {
    friend.user.metadata = JSON.parse(friend.user.metadata);
  });

  return message.friends;
}
