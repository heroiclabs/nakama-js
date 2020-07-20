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


import * as nakamajs from "../src/client";
import {Match, MatchData} from "../src/socket"

import {createPage, generateid} from "./utils"
import {Page} from "puppeteer"
import { create } from "core-js/fn/object";

describe('Match Tests', () => {

  it('should create match', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const match = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);
      return await socket.createMatch();
    }, customid);

    expect(match).not.toBeNull();
    expect(match.match_id).not.toBeNull();
    expect(match.self).not.toBeNull();
    expect(match.self.session_id).not.toBeNull();
    expect(match.self.user_id).not.toBeNull();
    expect(match.self.username).not.toBeNull();
  });

  it('should join a match', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const match : Match = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);
      const match = await socket.createMatch();
      return await socket.joinMatch(match.match_id);
    }, customid);

    expect(match).not.toBeNull();
    expect(match).not.toBeNull();
    expect(match.match_id).not.toBeNull();
    expect(match.presences).toHaveLength(1);
    expect(match.self).not.toBeNull();
    expect(match.self.session_id).not.toBeNull();
    expect(match.self.user_id).not.toBeNull();
    expect(match.self.username).not.toBeNull();
  });

  it('should join a match, then leave it', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const response = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);
      const match = await socket.createMatch();
      await socket.joinMatch(match.match_id);
      return await socket.leaveMatch(match.match_id);
    }, customid);

    expect(response).not.toBeNull();
  });

  it('should join a match, then send data, receive data', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const PAYLOAD = { "hello": "world" };

    const matchData = await page.evaluate(async (customid1, customid2, payload) => {
      const client1 = new nakamajs.Client();      
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

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
    }, customid1, customid2, PAYLOAD);

    expect(matchData).not.toBeNull();
    expect(matchData.data).toEqual(PAYLOAD);
  });

  it('should create authoritative match, and join with metadata', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const ID = "clientrpc.create_authoritative_match";

    const response = await page.evaluate(async (customid, id) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);

      var res = await socket.rpc(id, "{}");
      var match = JSON.parse(res.payload);
      var metadata = { key: "value" };
      await socket.joinMatch(match.match_id, null, metadata);
    }, customid, ID);
  });

  it('should create authoritative match, list matches', async () => {
    const customid = generateid();
    const ID = "clientrpc.create_authoritative_match";

    const page = await createPage();
    const response = await page.evaluate(async (customid, id) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);
      await socket.rpc(id, "{}");
      return await client.listMatches(session, 1, true)
    }, customid, ID);

    expect(response).not.toBeNull();
    expect(response.matches).not.toBeNull();
    expect(response.matches).toHaveLength(1);
    expect(response.matches[0].match_id).not.toBeNull();
    expect(response.matches[0].authoritative).toBe(true);
  });

  it('should create authoritative match, list matches with querying', async () => {
    const customid = generateid();
    const ID = "clientrpc.create_authoritative_match";

    const page = await createPage();

    const response = await page.evaluate(async (customid, id) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);

      var label = { skill: 60 };
      var data = { label: JSON.stringify(label) }  // needs to be string
      await socket.rpc(id, JSON.stringify(data));

      var query = "+label.skill:>=50";
      return await client.listMatches(session, 1, true, "", 0, 100, query)
    }, customid, ID);

    expect(response).not.toBeNull();
    expect(response.matches).not.toBeNull();
    expect(response.matches).toHaveLength(1);
    expect(response.matches[0].match_id).not.toBeNull();
    expect(response.matches[0].authoritative).toBe(true);
  });

  it('should create authoritative match, list matches with querying arrays', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    var convoId1 = generateid();
    var convoId2 = generateid();
    var convoId3 = generateid();
    const ID = "clientrpc.create_authoritative_match";

    const response = await page.evaluate(async (customid, id, convoId1, convoId2, convoId3) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session, false);

      var label = { convo_ids: [convoId1, convoId2, convoId3] };
      var data = { label: JSON.stringify(label) }  // needs to be string
      await socket.rpc(id, JSON.stringify(data));

      var query = "+label.convo_ids:" + convoId2;
      return await client.listMatches(session, 1, true, "", 0, 100, query)
    }, customid, ID, convoId1, convoId2, convoId3);

    expect(response).not.toBeNull();
    expect(response.matches).not.toBeNull();
    expect(response.matches).toHaveLength(1);
    expect(response.matches[0].match_id).not.toBeNull();
    expect(response.matches[0].authoritative).toBe(true);
  });

});
