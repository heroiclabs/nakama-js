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

describe('Status Tests', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();

    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
    page.on("error", err => console.log("PAGE LOG ERROR:", err));
    page.on("pageerror", err => console.log("PAGE LOG ERROR:", err));

    const nakamaJsLib = fs.readFileSync(__dirname + "/../dist/nakama-js.umd.js", "utf8");
    await page.evaluateOnNewDocument(nakamaJsLib);
    await page.goto("about:blank");
  }, TIMEOUT);

  it('should create status, and then update it', async () => {
    const customid = generateid();

    const response = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid });
      await socket.connect(session)

      return socket.send({status_update: {status: "hello-world"}})
    }, customid);

    expect(response).not.toBeNull();
    expect(response.presences.length).toEqual(1);
    expect(response.presences[0].status).toEqual("hello-world");
  });

  it('should follow user2, and get status update when coming online', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(await (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket1.onstatuspresence = (statusPresence) => {
          resolve(statusPresence);
        }
      });

      const session1 = await client1.authenticateCustom({ id: customid1 });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket1.connect(session1);
      await socket1.send({status_follow: {user_ids: [session2.userId]}})

      const promise1 = socket2.connect(session2).then((session) => {
        return new Promise((resolve, reject) => {
          setTimeout(reject, 5000, "did not receive match data - timed out.")
        });
      })

      return Promise.race([promise1, promise2]);
    }, customid1, customid2);

    expect(response).not.toBeNull();
    expect(response.status_presence_event).not.toBeNull();
    expect(response.status_presence_event.joins.length).toEqual(1);
    expect(response.status_presence_event.joins[0].user_id).toEqual(session2.userId);
  });

  it('should follow user2, and unfollow user2', async () => {
    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(await (customid1, customid2) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);

      const session1 = await client1.authenticateCustom({ id: customid1 });
      const session2 = await client2.authenticateCustom({ id: customid2 });
      await socket1.connect(session1);
      await socket1.send({status_follow: {user_ids: [session2.userId]}})
      return socket1.send({status_unfollow: {user_ids: [session2.userId]}})
    }, customid1, customid2);

    expect(response).not.toBeNull();
  });

}, TIMEOUT);
