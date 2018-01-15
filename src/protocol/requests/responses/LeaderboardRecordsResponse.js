export default function LeaderboardRecordsResponse(message) {
  const {
    leaderboardRecords: {
      records = [],
    },
  } = message;

  records.forEach((record) => {
    record.metadata = JSON.parse(record.metadata);
  });

  return message.leaderboardRecords;
}
