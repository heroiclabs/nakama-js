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

describe('Match Tests', () => {
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

  it('should create match', async () => {
    const customid = generateid();

    const response = await page.evaluate((customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return socket.connect(session);
        }).then(session => {
          return socket.send({ matchCreate: {} });
        });
    }, customid);

    expect(response).not.toBeNull();
    expect(response.cid).not.toBeNull();
    expect(response.match).not.toBeNull();
    expect(response.match.matchId).not.toBeNull();
    expect(response.match.presences).toHaveLength(1);
    expect(response.match.self).not.toBeNull();
    expect(response.match.self.sessionId).not.toBeNull();
    expect(response.match.self.userId).not.toBeNull();
    expect(response.match.self.username).not.toBeNull();
  });

  it('should join a match', async () => {
    const customid = generateid();

    const response = await page.evaluate((customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return socket.connect(session);
        }).then(session => {
          return socket.send({ matchCreate: {} });
        }).then(match => {
          return socket.send({ matchJoin: {matchId: match.match.matchId}});
        });
    }, customid);

    expect(response).not.toBeNull();
    expect(response.cid).not.toBeNull();
    expect(response.match).not.toBeNull();
    expect(response.match.matchId).not.toBeNull();
    expect(response.match.presences).toHaveLength(1);
    expect(response.match.self).not.toBeNull();
    expect(response.match.self.sessionId).not.toBeNull();
    expect(response.match.self.userId).not.toBeNull();
    expect(response.match.self.username).not.toBeNull();
  });

  it('should join a match, then leave it', async () => {
    const customid = generateid();

    const response = await page.evaluate((customid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return socket.connect(session);
        }).then(session => {
          return socket.send({ matchCreate: {} });
        }).then(match => {
          return socket.send({ matchJoin: {matchId: match.match.matchId}});
        }).then(match => {
          return socket.send({ matchLeave: {matchId: match.match.matchId}});
        });
    }, customid);

    expect(response).not.toBeNull();
    expect(response.cid).not.toBeNull();
  });

  it('should join a match, then send data, receive data', async () => {
    const customid1 = generateid();
    const customid2 = generateid();
    const PAYLOAD = { "hello": "world" };

    const response = await page.evaluate((customid1, customid2, payload) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false);
      const socket2 = client2.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket2.onmatchdata = (matchdata) => {
          resolve(matchdata);
        }
      });

      return client1.authenticateCustom({ id: customid1 })
        .then(session1 => {
          return socket1.connect(session1);
        }).then(session1 => {
          return socket1.send({ matchCreate: {} });
        }).then(match => {
          return client2.authenticateCustom({ id: customid2 })
          .then(session2 => {
            return socket2.connect(session2);
          }).then(session2 => {
            return socket2.send({ matchJoin: {matchId: match.match.matchId}});
          });
        }).then(match => {
          return socket1.send({ matchDataSend: {matchId: match.match.matchId, opCode: 20, data: payload}});
        }).then(result => {
          var promise2 = new Promise((resolve, reject) => {
            setTimeout(reject, 5000, "did not receive match data - timed out.")
          });

          return Promise.race([promise1, promise2]);
        });
    }, customid1, customid2, PAYLOAD);

    expect(response).not.toBeNull();
    expect(response.data).toEqual(PAYLOAD);
  });

}, TIMEOUT);
