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

import base64url from "base64url";
import crypto from "crypto";
import {Page} from "puppeteer";
import * as nakamajs from "../packages/nakama-js/index";
import {createPage, generateid} from "./utils";

describe('Authenticate Tests', () => {

  it('should authenticate with email', async () => {
    const page : Page = await createPage();

    const email = generateid() + "@example.com";
    const password = generateid();

    const session = await page.evaluate(async (email, password) => {
      const client = new nakamajs.Client();
      const promise = client.authenticateEmail(email, password);
      return promise;
    }, email, password);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should authenticate with device id', async () => {
    const page : Page = await createPage();

    const deviceid = generateid();

    const session = await page.evaluate((deviceid) => {
      const client = new nakamajs.Client();
      return client.authenticateDevice(deviceid);
    }, deviceid);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should authenticate with custom id', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const session = await page.evaluate((customid) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom(customid);
    }, customid);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should fail to authenticate with new custom id', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const result = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      try {
        // Expects exception.
        return await client.authenticateCustom(customid, false);
      } catch (err) {
        return err;
      }
    }, customid);

    expect(result).not.toBeNull();
  });

  it('should authenticate with custom id twice', async () => {
    const page : Page = await createPage();

    const customid = "someuniquecustomid";

    const session = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      await client.authenticateCustom(customid);
      return await client.authenticateCustom(customid);
    }, customid);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });

  it('should fail authenticate with custom id', async () => {
    const page : Page = await createPage();

    const result = await page.evaluate(async () => {
      const client = new nakamajs.Client();
      try {
        // Expects exception.
        return await client.authenticateCustom("");
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
      return client.authenticateFacebookInstantGame(token);
    }, token);

    expect(session).not.toBeNull();
    expect(session.token).not.toBeNull();
  });
});
