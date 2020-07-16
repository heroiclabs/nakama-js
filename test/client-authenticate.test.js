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
const base64url = require('base64url');

const crypto = require("crypto");

const TIMEOUT = 5000;

// util to generate a random id.
const generateid = () => {
  return [...Array(30)].map(() => Math.random().toString(36)[3]).join('');
};

describe('Authenticate Tests', () => {
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
    const result = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      try {
        // Expects exception.
        return await client.authenticateCustom({ id: customid, create: false });
      } catch (err) {
        return err;
      }
    }, customid);

    expect(result).not.toBeNull();
  });

  it('should authenticate with custom id twice', async () => {
    const customid = "someuniquecustomid";

    const session = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      await client.authenticateCustom({ id: customid });
      return await client.authenticateCustom({ id: customid });
    }, customid);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should fail authenticate with custom id', async () => {
    const result = await page.evaluate(async () => {
      const client = new nakamajs.Client();
      try {
        // Expects exception.
        return await client.authenticateCustom({ id: "" });
      } catch (err) {
        return err;
      }
    });

    expect(result).not.toBeNull();
  });

  // optional test: ensure server has been configured with the 
  // facebook instant secret used in the test and then remove `.skip()` to run.
  it.skip('should authenticate with facebook instant games', async () => {
    const testSecret = "fb-instant-test-secret";

    const mockFbInstantPayload = JSON.stringify({ 
      algorithm: "HMAC-SHA256", 
      issued_at: 1594867628,
      player_id: "a-fb-id",
      request_payload: ""
    });

    const encodedPayload = base64url(mockFbInstantPayload);

    const signature = crypto.createHmac('sha256', testSecret).update(encodedPayload).digest();
    const encodedSignature = base64url(signature);

    const token = encodedSignature + "." + encodedPayload;

    const session = await page.evaluate((token, ) => {
      const client = new nakamajs.Client();
      const authObj = { signed_player_info: token };
      return client.authenticateFacebookInstantGame(authObj);
    }, token);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

}, TIMEOUT);
