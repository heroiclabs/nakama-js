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

const fs = require("fs");
const TIMEOUT = 5000;

// util to generate a random id.
const generateid = () => {
  return [...Array(30)].map(() => Math.random().toString(36)[3]).join('');
};

describe('Matchmaker Tests', () => {
  let page;

  beforeAll(async () => {
    page = await browser.newPage();

    page.on('console', msg => console.log('LOG:', msg.text()));
    page.on('error', err => console.error('ERR:', err));
    page.on('pageerror', err => console.error('PAGE ERROR:', err));

    const nakamaJsLib = fs.readFileSync(__dirname + '/../dist/nakama-js.umd.js', 'utf8');
    await page.evaluateOnNewDocument(nakamaJsLib);
    await page.goto('about:blank');
  }, TIMEOUT);

  it('should add to matchmaker', async () => {
    const customid = generateid();

    const response = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);
      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session);
      return await socket.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a1:foo", string_properties: {"a1": "bar"}} });

    }, customid);

    expect(response).not.toBeNull();
    expect(response.cid).not.toBeNull();
    expect(response.matchmaker_ticket).not.toBeNull();
    expect(response.matchmaker_ticket.ticket).not.toBeNull();
  });

  it('should add and remove from matchmaker', async () => {
    const customid = generateid();

    const response = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);
      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session);
      const ticket = await socket.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a2:foo", string_properties: {"a2": "bar"}} });
      return await socket.removeMatchmaker({ matchmaker_remove: {ticket: ticket.matchmaker_ticket.ticket} });
    }, customid);

    expect(response).not.toBeNull();
    expect(response.cid).not.toBeNull();
  });

  it('should add to matchmaker and match', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a3:bar", string_properties: {"a3": "baz"}} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a3:baz", string_properties: {"a3": "bar"}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive matchmaker matched - timed out.")
      });

      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response.ticket).not.toBeNull();
    expect(response.match_id).toBeUndefined();
    expect(response.token).not.toBeNull();
    expect(response.users).toHaveLength(2);
    expect(response.self).not.toBeNull();
    expect(response.self.session_id).not.toBeNull();
    expect(response.self.user_id).not.toBeNull();
    expect(response.self.username).not.toBeNull();
  });

  it('should add to matchmaker and match on range', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "+properties.b1:>=10 +properties.b1:<=20", numeric_properties: {"b1": 15}} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "+properties.b1:>=10 +properties.b1:<=20", numeric_properties: {"b1": 15}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive matchmaker matched - timed out.")
      });

      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response.ticket).not.toBeNull();
    expect(response.match_id).toBeUndefined();
    expect(response.token).not.toBeNull();
    expect(response.users).toHaveLength(2);
    expect(response.self).not.toBeNull();
    expect(response.self.session_id).not.toBeNull();
    expect(response.self.user_id).not.toBeNull();
    expect(response.self.username).not.toBeNull();
  });

  it('should add to matchmaker and match on range and value', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "+properties.c1:>=10 +properties.c1:<=20 +properties.c2:foo", numeric_properties: {"c1": 15}, string_properties: {"c2": "foo"}} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "+properties.c1:>=10 +properties.c1:<=20 +properties.c2:foo", numeric_properties: {"c1": 15}, string_properties: {"c2": "foo"}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive matchmaker matched - timed out.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response.ticket).not.toBeNull();
    expect(response.match_id).toBeUndefined();
    expect(response.token).not.toBeNull();
    expect(response.users).toHaveLength(2);
    expect(response.self).not.toBeNull();
    expect(response.self.session_id).not.toBeNull();
    expect(response.self.user_id).not.toBeNull();
    expect(response.self.username).not.toBeNull();
  });

  it('should add to matchmaker then remove and not match', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket2.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a4:bar", string_properties: {"a4": "baz"}} });
      await socket1.removeMatchmaker({ matchmaker_remove: {ticket: ticket1.matchmaker_ticket.ticket} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a4:baz", string_properties: {"a4": "bar"}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 2500, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  });

  it('should add to matchmaker but not match', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a5:bar", string_properties: {"a5": "baz"}} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a5:bar", string_properties: {"a5": "baz"}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 2500, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  });

  it('should add to matchmaker but not match on range', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "+properties.b2:>=10 +properties.b2:<=20", numeric_properties: {"b2": 25}} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "+properties.b2:>=10 +properties.b2:<=20", numeric_properties: {"b2": 15}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 2500, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  });

  it('should add to matchmaker but not match on range and value', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "+properties.c3:>=10 +properties.c3:<=20 +properties.c4:foo", numeric_properties: {"c3": 25}, string_properties: {"c4": "foo"}} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "+properties.c3:>=10 +properties.c3:<=20 +properties.c4:foo", numeric_properties: {"c3": 15}, string_properties: {"c4": "foo"}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 2500, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  });

  it('should add multiple to matchmaker and not match', async () => {
    const customid1 = generateid();
    const customid2 = generateid();
    const customid3 = generateid();

    const response = await page.evaluate(async (customid1, customid2, customid3) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const client3 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);
      const socket3 = client3.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket3.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a6:bar", string_properties: {"a6": "bar"}} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a6:bar", string_properties: {"a6": "bar"}} });
      const session3 = await client3.authenticateCustom({ id: customid3 });
      await socket3.connect(session3);
      const ticket3 = await socket3.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.a6:bar", string_properties: {"a6": "bar"}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 2500, "did not match.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2, customid3);

    expect(response).not.toBeNull();
    expect(response).toBe("did not match.");
  });

  it('should add to matchmaker and match authoritative', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket1.onmatchmakermatched = (matchmakermatched) => {
          resolve(matchmakermatched);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      await socket1.connect(session1);
      const ticket1 = await socket1.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.d1:foo", string_properties: {"d1": "foo", "mode": "authoritative"}} });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket2.connect(session2);
      const ticket2 = await socket2.addMatchmaker({ matchmaker_add: {min_count: 2, max_count: 2, query: "properties.d1:foo", string_properties: {"d1": "foo", "mode": "authoritative"}} });
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive matchmaker matched - timed out.")
      });
      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response.ticket).not.toBeNull();
    expect(response.match_id).not.toBeNull();
    expect(response.token).toBeUndefined();
    expect(response.users).toHaveLength(2);
    expect(response.self).not.toBeNull();
    expect(response.self.session_id).not.toBeNull();
    expect(response.self.user_id).not.toBeNull();
    expect(response.self.username).not.toBeNull();
  });

}, TIMEOUT);
