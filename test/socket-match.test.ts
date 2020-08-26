/**
 * Copyright 2018 The Nakama Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import * as nakamajs from "../packages/nakama-js";
import {Match, MatchData, MatchPresenceEvent, Presence} from "../packages/nakama-js/socket"
import * as nakamajsprotobuf from "../packages/nakama-js-protobuf";
import {adapters, createPage, generateid, AdapterType} from "./utils"
import { WebSocketAdapter } from "../packages/nakama-js";

describe('Match Tests', () => {

  it.each(adapters)('should create match', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    const match = await page.evaluate(async (customid, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);
      return await socket.createMatch();
    }, customid, adapter);

    expect(match).not.toBeNull();
    expect(match.match_id).not.toBeNull();
    expect(match.self).not.toBeNull();
    expect(match.self.session_id).not.toBeNull();
    expect(match.self.user_id).not.toBeNull();
    expect(match.self.username).not.toBeNull();
  });

  it.each(adapters)('should join a match', async (adapter) => {
    const page = await createPage();

    const customid = generateid();

    const match : Match = await page.evaluate(async (customid, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);
      const match = await socket.createMatch();
      return await socket.joinMatch(match.match_id);
    }, customid, adapter);

    expect(match).not.toBeNull();
    expect(match).not.toBeNull();
    expect(match.match_id).not.toBeNull();
    expect(match.presences).toHaveLength(1);
    expect(match.self).not.toBeNull();
    expect(match.self.session_id).not.toBeNull();
    expect(match.self.user_id).not.toBeNull();
    expect(match.self.username).not.toBeNull();
  });

  it.each(adapters)('should join a match, then leave it', async (adapter) => {
    const page = await createPage();

    const customid = generateid();

    const response = await page.evaluate(async (customid, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);
      const match = await socket.createMatch();
      await socket.joinMatch(match.match_id);
      return await socket.leaveMatch(match.match_id);
    }, customid, adapter);

    expect(response).not.toBeNull();
  });

  it.each(adapters)('should join a match, then send data, receive data', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const PAYLOAD = { "hello": "world" };

    const matchData = await page.evaluate(async (customid1, customid2, payload, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise<MatchData>((resolve, reject) => {
        socket2.onmatchdata = (matchdata) => {
          resolve(matchdata);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1, false);
      const match = await socket1.createMatch();

      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2, false);
      await socket2.joinMatch(match.match_id);
      await socket1.sendMatchState(match.match_id, 20,  payload);
      var promise2 = new Promise<null>((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive match data - timed out.")
      });

      return Promise.race([promise1, promise2]);
    }, customid1, customid2, PAYLOAD, adapter);

    expect(matchData).not.toBeNull();
    expect(matchData.data).toEqual(PAYLOAD);
  });

  it.each(adapters)('should join a match, then send data to included presences', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const customid3 = generateid();

    const PAYLOAD = { "hello": "world" };

    const matchData = await page.evaluate(async (customid1, customid2, customid3, payload, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const client3 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false, adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false, adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket3 = client3.createSocket(false, false, adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1, false);
      let match = await socket1.createMatch();

      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2, false);
      match = await socket2.joinMatch(match.match_id);

      var socket2PresencePromise = new Promise<MatchPresenceEvent>((resolve, reject) => {
        socket2.onmatchpresence = (presenceEvt) => {
          resolve(presenceEvt);
        }
      });

      const presenceEvt = await socket2PresencePromise;

      const session3 = await client3.authenticateCustom({ id: customid3 });
      await socket3.connect(session3, false);
      match = await socket3.joinMatch(match.match_id);
      const timeout = new Promise<null>((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive match data - timed out.")
      });

      var matchDataPromise = new Promise<MatchData>((resolve, reject) => {
        socket2.onmatchdata = (matchdata) => {
          resolve(matchdata);
        }
      });

      await socket1.sendMatchState(match.match_id, 20, payload, presenceEvt.joins);

      return Promise.race([matchDataPromise, timeout]);
    }, customid1, customid2, customid3, PAYLOAD, adapter);

    expect(matchData).not.toBeNull();
    expect(matchData.data).toEqual(PAYLOAD);
  });

  it.each(adapters)('should join a match, then do not send data to excluded presences', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const customid3 = generateid();

    const PAYLOAD = { "hello": "world" };

    const timeout = await page.evaluate(async (customid1, customid2, customid3, payload, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const client3 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false, adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false, adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket3 = client3.createSocket(false, false, adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1, false);
      let match = await socket1.createMatch();

      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2, false);
      match = await socket2.joinMatch(match.match_id);

      const session3 = await client3.authenticateCustom({ id: customid3 });
      await socket3.connect(session3, false);


      let presenceToReceive : Presence = null;

      var socket3PresencePromise = new Promise((resolve, reject) => {
        socket2.onmatchpresence = (presenceEvt) => {
          const socket3Presence = presenceEvt.joins.find(presenceJoin => presenceJoin.user_id == session3.user_id);
          if (socket3Presence)
          {
            presenceToReceive = socket3Presence;
            resolve();

          }
        }
      });

      await Promise.all([socket3.joinMatch(match.match_id), socket3PresencePromise]);

      const timeout = new Promise<string>((resolve, reject) => {
        setTimeout(() => resolve("did not receive match data - timed out."), 1000)
      });

      var matchDataPromise = new Promise<MatchData>((resolve, reject) => {
        socket2.onmatchdata = (matchdata) => {
          reject(matchdata);
        }
      });

      await socket1.sendMatchState(match.match_id, 20, payload, [presenceToReceive]);
      return Promise.race([matchDataPromise, timeout]);
    }, customid1, customid2, customid3, PAYLOAD, adapter);

    expect(timeout).toEqual("did not receive match data - timed out.");
  });

  it.each(adapters)('should create authoritative match, and join with metadata', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    const ID = "clientrpc.create_authoritative_match";

    const response = await page.evaluate(async (customid, id, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false, adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);

      var res = await socket.rpc(id, "{}");
      var match = JSON.parse(res.payload);
      var metadata = { key: "value" };
      await socket.joinMatch(match.match_id, null, metadata);
    }, customid, ID, adapter);
  });

  it.each(adapters)('should create authoritative match, list matches', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    const ID = "clientrpc.create_authoritative_match";

    const response = await page.evaluate(async (customid, id, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);
      await socket.rpc(id, "{}");
      return await client.listMatches(session, 1, true)
    }, customid, ID, adapter);

    expect(response).not.toBeNull();
    expect(response.matches).not.toBeNull();
    expect(response.matches).toHaveLength(1);
    expect(response.matches[0].match_id).not.toBeNull();
    expect(response.matches[0].authoritative).toBe(true);
  });

  it.each(adapters)('should create authoritative match, list matches with querying', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    const ID = "clientrpc.create_authoritative_match";

    const response = await page.evaluate(async (customid, id, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);

      var label = { skill: 60 };
      var data = { label: JSON.stringify(label) }  // needs to be string
      await socket.rpc(id, JSON.stringify(data));

      var query = "+label.skill:>=50";
      return await client.listMatches(session, 1, true, "", 0, 100, query)
    }, customid, ID, adapter);

    expect(response).not.toBeNull();
    expect(response.matches).not.toBeNull();
    expect(response.matches).toHaveLength(1);
    expect(response.matches[0].match_id).not.toBeNull();
    expect(response.matches[0].authoritative).toBe(true);
  });

  it.each(adapters)('should create authoritative match, list matches with querying arrays', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    var convoId1 = generateid();
    var convoId2 = generateid();
    var convoId3 = generateid();
    const ID = "clientrpc.create_authoritative_match";

    const response = await page.evaluate(async (customid, id, convoId1, convoId2, convoId3, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);

      var label = { convo_ids: [convoId1, convoId2, convoId3] };
      var data = { label: JSON.stringify(label) }  // needs to be string
      await socket.rpc(id, JSON.stringify(data));

      var query = "+label.convo_ids:" + convoId2;
      return await client.listMatches(session, 1, true, "", 0, 100, query)
    }, customid, ID, convoId1, convoId2, convoId3, adapter);

    expect(response).not.toBeNull();
    expect(response.matches).not.toBeNull();
    expect(response.matches).toHaveLength(1);
    expect(response.matches[0].match_id).not.toBeNull();
    expect(response.matches[0].authoritative).toBe(true);
  });

});
