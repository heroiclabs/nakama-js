import base64 from 'base-64';

export default function MatchDataResponse(message) {
  message.matchData.data = JSON.parse(base64.decode(message.matchData.data));
  return message.matchData;
}
