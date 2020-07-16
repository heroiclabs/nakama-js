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

describe('Link / Unlink Tests', () => {
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

  it('should link device ID', async () => {
    const customid = generateid();
    const deviceid = generateid();

    const account = await page.evaluate(async (customid, deviceid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid })
      await client.linkDevice(session, { id: deviceid });
      return await client.getAccount(session);
    }, customid, deviceid);

    expect(account).not.toBeNull();
    expect(account.custom_id).not.toBeNull();
    expect(account.devices[0]).not.toBeNull();
  });

  it('should unlink device ID', async () => {
    const customid = generateid();
    const deviceid = generateid();

    const account = await page.evaluate(async (customid, deviceid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid });
      await client.linkDevice(session, { id: deviceid });
      await client.unlinkDevice(session, {id: deviceid });
      return await client.getAccount(session);
    }, customid, deviceid);

    expect(account).not.toBeNull();
    expect(account.custom_id).not.toBeNull();
    expect(account.hasOwnProperty("devices")).toBe(false);
  });

  //optional test
  it.skip('should link to facebook instant games', async () => {

    const fbid = generateid();

    const testSecret = "fb-instant-test-secret";

    const mockFbInstantPayload = JSON.stringify({ 
      algorithm: "HMAC-SHA256", 
      issued_at: 1594867628,
      player_id: fbid,
      request_payload: ""
    });

    const encodedPayload = base64url(mockFbInstantPayload);

    const signature = crypto.createHmac('sha256', testSecret).update(encodedPayload).digest();
    const encodedSignature = base64url(signature);

    const token = encodedSignature + "." + encodedPayload;

    const customid = generateid();

    const account = await page.evaluate(async (customid, token) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid });
      await client.linkFacebookInstantGame(session, { signed_player_info: token });
      return await client.getAccount(session);
    }, customid, token);

    console.log("account user is...");
    console.log(account.user);
    expect(account).not.toBeNull();
    expect(account.user.facebook_instant_game_id).not.toBeUndefined();
    
  });

  //optional test
  it.skip('should unlink to facebook instant games', async () => {
    
    const fbid = generateid();

    const testSecret = "fb-instant-test-secret";

    const mockFbInstantPayload = JSON.stringify({ 
      algorithm: "HMAC-SHA256", 
      issued_at: 1594867628,
      player_id: fbid,
      request_payload: ""
    });

    const encodedPayload = base64url(mockFbInstantPayload);

    const signature = crypto.createHmac('sha256', testSecret).update(encodedPayload).digest();
    const encodedSignature = base64url(signature);

    const token = encodedSignature + "." + encodedPayload;

    const customid = generateid();

    const account = await page.evaluate(async (customid, token) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid });
      await client.linkFacebookInstantGame(session, { signed_player_info: token });
      await client.unlinkFacebookInstantGame(session, { signed_player_info: token });

      return await client.getAccount(session);
    }, customid, token);

    expect(account).not.toBeNull();
    expect(account.user.facebook_instant_game_id).toBeUndefined();
  })

}, TIMEOUT);
