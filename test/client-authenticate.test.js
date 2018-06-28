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

describe('Authenticate Tests', () => {
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

  it('should authenticate with email', async () => {
    const email = generateid() + "@example.com";
    const password = generateid()

    const session = await page.evaluate((email, password) => {
      const client = new nakamajs.Client();
      return client.authenticateEmail({ email: email, password: password });
    }, email, password);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should authenticate with device id', async () => {
    const deviceid = generateid();

    const session = await page.evaluate((deviceid) => {
      const client = new nakamajs.Client();
      return client.authenticateDevice({ id: deviceid });
    }, deviceid);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should authenticate with custom id', async () => {
    const customid = generateid();

    const session = await page.evaluate((customid) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid });
    }, customid);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should fail to authenticate with new custom id', async () => {
    const customid = generateid();

    const promise = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();

      return new Promise(async (resolve, reject) => {
        try {
          const session = await client.authenticateCustom({ id: customid, create: false });
          resolve(session);
        } catch (error) {
          reject(error)
        }
      });
    }, customid);

    await expect(promise).rejects.not.toBeNull();
  });

  it('should authenticate with custom id twice', async () => {
    const customid = "someuniquecustomid";

    const session = await page.evaluate((customid) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid }).then(session => {
        return client.authenticateCustom({ id: customid });
      });
    }, customid);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should fail authenticate with custom id', async () => {
    const promise = page.evaluate(() => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: "" });
    });

    await expect(promise).rejects.not.toBeNull();
  });
}, TIMEOUT);
