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

import * as nakamajs from "@heroiclabs/nakama-js";
import {MatchmakerMatched} from "@heroiclabs/nakama-js/socket";
import {describe, expect, it} from '@jest/globals'
import * as nakamajsprotobuf from "../nakama-js-protobuf";
import {generateid, createPage, adapters, AdapterType, matchmakerTimeout} from "./utils"

describe('Matchmaker Tests', () => {

  it.each(adapters)('should only add to matchmaker', async (adapter) => {
    const page = await createPage();
    const customid = generateid();

    const response = await page.evaluate(async (customid, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const session = await client.authenticateCustom(customid);
      await socket.connect(session, false);
      return await socket.addMatchmaker("properties.a1:foo", 2, 2, {"a1": "bar"});

    }, customid, adapter);

    expect(response).not.toBeNull();
    expect(response.ticket).not.toBeNull();
  }, matchmakerTimeout);

  it.each(adapters)('should add and remove from matchmaker', async (adapter) => {
    const page = await createPage();

    const customid = generateid();

    const response = await page.evaluate(async (customid, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const session = await client.authenticateCustom(customid);
      await socket.connect(session, false);
      const ticket = await socket.addMatchmaker("properties.a2:foo", 2, 2, {"a2": "bar"});
      return await socket.removeMatchmaker(ticket.ticket);
    }, customid, adapter);

    expect(response).not.toBeNull();
  }, matchmakerTimeout);

  it.each(adapters)('should add to matchmaker and do basic match', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const responseTicket : MatchmakerMatched = await page.evaluate(async (customid1, customid2, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise<MatchmakerMatched>((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);
      const ticket1 = await socket1.addMatchmaker("properties.a3:bar", 2, 2, {"a3": "baz"});
      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);
      const ticket2 = await socket2.addMatchmaker("properties.a3:baz", 2, 2, {"a3": "bar"});

      return promise1;
    }, customid1, customid2, adapter);


    expect(responseTicket).not.toBeNull();
    expect(responseTicket.match_id).toBeUndefined();
    expect(responseTicket.token).not.toBeNull();
    expect(responseTicket.users).toHaveLength(2);
    expect(responseTicket.self).not.toBeNull();
    expect(responseTicket.self.presence.session_id).not.toBeNull();
    expect(responseTicket.self.presence.user_id).not.toBeNull();
    expect(responseTicket.self.presence.username).not.toBeNull();
  }, matchmakerTimeout);

  it.each(adapters)('should add to matchmaker and match on range', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false, adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise<MatchmakerMatched>((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);
      const ticket1 = await socket1.addMatchmaker("+properties.b1:>=10 +properties.b1:<=20", 2, 2, {}, {"b1": 15});
      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);
      const ticket2 = await socket2.addMatchmaker("+properties.b1:>=10 +properties.b1:<=20", 2, 2, {}, {"b1": 15});

      return promise1;
    }, customid1, customid2, adapter);

    expect(response).not.toBeNull();
    expect(response.ticket).not.toBeNull();
    expect(response.match_id).toBeUndefined();
    expect(response.token).not.toBeNull();
    expect(response.users).toHaveLength(2);
    expect(response.self).not.toBeNull();
    expect(response.self.presence.session_id).not.toBeNull();
    expect(response.self.presence.user_id).not.toBeNull();
    expect(response.self.presence.username).not.toBeNull();
  }, matchmakerTimeout);

  it.each(adapters)('should add to matchmaker and match on range and value', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise<MatchmakerMatched>((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);
      const ticket1 = await socket1.addMatchmaker("+properties.c1:>=10 +properties.c1:<=20 +properties.c2:foo", 2, 2, {"c2": "foo"}, {"c1": 15});
      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);
      const ticket2 = await socket2.addMatchmaker("+properties.c1:>=10 +properties.c1:<=20 +properties.c2:foo", 2, 2, {"c2": "foo"}, {"c1": 15});
      return promise1;
    }, customid1, customid2, adapter);

    expect(response).not.toBeNull();
    expect(response.ticket).not.toBeNull();
    expect(response.match_id).toBeUndefined();
    expect(response.token).not.toBeNull();
    expect(response.users).toHaveLength(2);
    expect(response.self).not.toBeNull();
    expect(response.self.presence.session_id).not.toBeNull();
    expect(response.self.presence.user_id).not.toBeNull();
    expect(response.self.presence.username).not.toBeNull();
  }, matchmakerTimeout);

  it.each(adapters)('should add to matchmaker then remove and not match', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise((resolve, reject) => {
        socket2.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);

      const ticket1 = await socket1.addMatchmaker("properties.a4:bar", 2, 2, {"a4": "baz"});
      await socket1.removeMatchmaker(ticket1.ticket);

      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);

      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 5000, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2, adapter);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  }, matchmakerTimeout);

  it.each(adapters)('should add to matchmaker but not match', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);
      const ticket1 = await socket1.addMatchmaker("properties.a5:bar", 2, 2, {"a5": "baz"});
      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);
      const ticket2 = await socket2.addMatchmaker("properties.a5:bar", 2, 2, {"a5": "baz"});
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 5000, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2, adapter);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  }, matchmakerTimeout);

  it.each(adapters)('should add to matchmaker but not match on range', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    // test id is a required property in order to avoid matching with users from previous test runs
    const testId = generateid();

    const response = await page.evaluate(async (customid1, customid2, testId, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);
      const ticket1 = await socket1.addMatchmaker("+properties.b2:>=10 +properties.b2:<=20 +properties.id:" + testId, 2, 2, {"id": testId}, {"b2": 25});
      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);
      const ticket2 = await socket2.addMatchmaker("+properties.b2:>=10 +properties.b2:<=20 +properties.id:" + testId, 2, 2, {"id": testId}, {"b2": 15});
      var promise2 = new Promise<string>((resolve, reject) => {
        setTimeout((msg) => {
            socket1.removeMatchmaker(ticket1.ticket);
            socket2.removeMatchmaker(ticket2.ticket);
            resolve(msg);
        }, 5000, "did not match.")
      });

      return Promise.race([promise1, promise2]);
    }, customid1, customid2, testId, adapter);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  }, matchmakerTimeout);

  it.each(adapters)('should add to matchmaker but not match on range and value', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const testId = generateid();

    const response = await page.evaluate(async (customid1, customid2, testId, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());
      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);
      const ticket1 = await socket1.addMatchmaker("+properties.c3:>=10 +properties.c3:<=20 +properties.c4:foo +properties.id:" + testId, 2, 2, {"c4": "foo", "id": testId}, {"c3": 25});
      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);
      const ticket2 = await socket2.addMatchmaker("+properties.c3:>=10 +properties.c3:<=20 +properties.c4:foo +properties.id:" + testId, 2, 2, {"c4": "foo", "id": testId}, {"c3": 15});
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 5000, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2, testId, adapter);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  }, matchmakerTimeout);

  it.each(adapters)('should add multiple to matchmaker and not match', async (adapter) => {
    const page = await createPage();

    const testId = generateid();

    const customid1 = generateid();
    const customid2 = generateid();
    const customid3 = generateid();

    const response = await page.evaluate(async (customid1, customid2, customid3, adapter, testId) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const client3 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket3 = client3.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise((resolve, reject) => {
        socket3.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);
      const ticket1 = await socket1.addMatchmaker("properties.a6:bar +properties.id:" + testId, 2, 2, {"a6": "bar", "id": testId});
      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);
      const ticket2 = await socket2.addMatchmaker("properties.a6:bar +properties.id:" + testId, 2, 2, {"a6": "bar", "id": testId});
      const session3 = await client3.authenticateCustom(customid3);
      await socket3.connect(session3, false);
      const ticket3 = await socket3.addMatchmaker("properties.a6:bar +properties.id:" + testId, 2, 2, {"a6": "bar", "id": testId});
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 5000, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2, customid3, adapter, testId);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  }, matchmakerTimeout);

  it.each(adapters)('should add to matchmaker and match authoritative', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise<MatchmakerMatched>((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom(customid1);
      await socket1.connect(session1, false);
      const ticket1 = await socket1.addMatchmaker("properties.d1:foo", 2, 2, {"d1": "foo", "mode": "authoritative"});
      const session2 = await client2.authenticateCustom(customid2);
      await socket2.connect(session2, false);
      const ticket2 = await socket2.addMatchmaker("properties.d1:foo", 2, 2, {"d1": "foo", "mode": "authoritative"});

      return promise1;
    }, customid1, customid2, adapter);

    expect(response).not.toBeNull();
    expect(response.ticket).not.toBeNull();
    expect(response.match_id).not.toBeNull();
    expect(response.token).toBeUndefined();
    expect(response.users).toHaveLength(2);
    expect(response.self).not.toBeNull();
    expect(response.self.presence.session_id).not.toBeNull();
    expect(response.self.presence.user_id).not.toBeNull();
    expect(response.self.presence.username).not.toBeNull();
  }, matchmakerTimeout);
});
