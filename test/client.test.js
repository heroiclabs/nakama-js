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

describe('Client Tests', () => {
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

  it('should create object with defaults', async () => {
    const client = await page.evaluate(() => {
      return new nakamajs.Client();
    });

    expect(client).not.toBeNull();
    expect(client.serverkey).toBe("defaultkey");
    expect(client.host).toBe("127.0.0.1");
    expect(client.port).toBe("7350");
    expect(client.useSSL).toBe(false);
    expect(client.timeout).toBe(7000);
  });

  it('should create object with configuration', async () => {
    const SERVER_KEY = "somesecret!";
    const HOST = "127.0.0.2";
    const PORT = "8080";
    const SSL = true;
    const TIMEOUT = 8000;

    const client = await page.evaluate((SERVER_KEY, HOST, PORT, SSL, TIMEOUT) => {
      return new nakamajs.Client(SERVER_KEY, HOST, PORT, SSL, TIMEOUT);
    }, SERVER_KEY, HOST, PORT, SSL, TIMEOUT);

    expect(client).not.toBeNull();
    expect(client.serverkey).toBe(SERVER_KEY);
    expect(client.host).toBe(HOST);
    expect(client.port).toBe(PORT);
    expect(client.useSSL).toBe(SSL);
    expect(client.timeout).toBe(TIMEOUT);
  });

  it('should obey timeout configuration option', async () => {
    const err = await page.evaluate(() => {
      const client = new nakamajs.Client("defaultkey", "127.0.0.1", "7350", false, 0);
      return client.authenticateCustom({ "id": "timeoutuseridentifier" })
          .catch(err => err);
    });

    expect(err).not.toBeNull();
    expect(err).toBe("Request timed out.");
  });
}, TIMEOUT);
