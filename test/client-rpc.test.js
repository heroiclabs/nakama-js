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

describe('RPC Tests', () => {
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

  it('should send rpc', async () => {
    const customid = generateid();
    const rpcid = "clientrpc.rpc_get";

    const rpcResult = await page.evaluate(async (customid, rpcid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid })
      return await client.rpcGet(rpcid, session);
    }, customid, rpcid);

    expect(rpcResult).not.toBeNull();
  });

  it('should send rpc with payload', async () => {
    const customid = generateid();
    const rpcid = "clientrpc.rpc";
    const request = {
      "hello": "world"
    };

    const rpcResult = await page.evaluate(async (customid, rpcid, request) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid })
      return await client.rpc(session, rpcid, request);
    }, customid, rpcid, request);

    expect(rpcResult).not.toBeNull();
    expect(rpcResult.payload).not.toBeNull();
    expect(rpcResult.payload).toEqual(request);
  });

  it('should send rpc with httpKey', async() => {
    const rpcid = "clientrpc.rpc_get";
    const HTTP_KEY = "defaultkey";

    const rpcResult = await page.evaluate(async (rpcid, HTTP_KEY) => {
      const client = new nakamajs.Client();
      return await client.rpcGet(rpcid, null, HTTP_KEY);
    }, rpcid, HTTP_KEY);

    expect(rpcResult).not.toBeNull();
  })
}, TIMEOUT);
