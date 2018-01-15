export default function LeaderboardsResponse(message) {
  const {
    leaderboards: {
      leaderboards = [],
    },
  } = message;

  leaderboards.forEach((leaderboard) => {
    leaderboard.metadata = JSON.parse(leaderboard.metadata);
  });

  return message.leaderboards;
}
