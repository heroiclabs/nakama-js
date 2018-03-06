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

describe('Socket Message Tests', () => {
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

  it('should connect', async () => {
    const customid = generateid();

    // TODO update
    const session = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      await client.authenticateCustom({ id: customid })
        .then(session => {
          const socket = client.createSocket();
          return socket.connect(session).then(_session => {
            socket.disconnect();
          });
        });
    }, customid);
  });

  it('should send rpc', async () => {
    const customid = generateid();
    const ID = "clientrpc.rpc";
    const PAYLOAD = JSON.stringify({ "hello": "world" });

    const response = await page.evaluate((customid, id, payload) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return socket.connect(session);
        })
        .then(session => {
          return socket.send({ rpc: { id: id, payload: payload } });
        });
    }, customid, ID, PAYLOAD);

    expect(response).not.toBeNull();
    expect(response.cid).not.toBeNull();
    expect(response.rpc).not.toBeNull();
    expect(response.rpc.id).not.toBeNull();
    expect(response.rpc.id).toBe(ID);
    expect(response.rpc.payload).not.toBeNull();
    expect(response.rpc.payload).toBe(PAYLOAD);
  });

  it('should rpc and receive stream data', async () => {
    const customid = generateid();
    const ID = "clientrpc.send_stream_data";
    const PAYLOAD = JSON.stringify({ "hello": "world" });

    const response = await page.evaluate((customid, id, payload) => {
      const client = new nakamajs.Client();

      const socket = client.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket.onstreamdata = (streamdata) => {
          resolve(streamdata);
        }
      });

      return client.authenticateCustom({ id: customid })
        .then(session => {
          return socket.connect(session);
        })
        .then(session => {
          return socket.send({ rpc: { id: id, payload: payload } });
        }).then(result => {
          var promise2 = new Promise((resolve, reject) => {
            setTimeout(reject, 5000, "did not receive stream data - timed out.")
          });

          return Promise.race([promise1, promise2]);
        });
    }, customid, ID, PAYLOAD);

    expect(response).not.toBeNull();
    expect(response.data).toBe(PAYLOAD);
  });
}, TIMEOUT);
