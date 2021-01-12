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


import {Page} from "puppeteer"
import * as nakamajs from "@heroiclabs/nakama-js";
import {createPage, generateid} from "./utils"

describe('RPC Tests', () => {

  it('should send rpc', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const rpcid = "clientrpc.rpc_get";

    const rpcResult = await page.evaluate(async (customid, rpcid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid)
      return await client.rpcGet(rpcid, session);
    }, customid, rpcid);

    expect(rpcResult).not.toBeNull();
  });

  it('should send rpc with payload', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const rpcid = "clientrpc.rpc";
    const request = {
      "hello": "world"
    };

    const rpcResult = await page.evaluate(async (customid, rpcid, request) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid)
      return await client.rpc(session, rpcid, request);
    }, customid, rpcid, request);

    expect(rpcResult).not.toBeNull();
    expect(rpcResult.payload).not.toBeNull();
    expect(rpcResult.payload).toEqual(request);
  });

  it('should send rpc with httpKey', async() => {
    const page : Page = await createPage();

    const rpcid = "clientrpc.rpc_get";
    const HTTP_KEY = "defaulthttpkey";

    const rpcResult = await page.evaluate(async (rpcid, HTTP_KEY) => {
      const client = new nakamajs.Client();
      return await client.rpcGet(rpcid, null!, HTTP_KEY);
    }, rpcid, HTTP_KEY);

    expect(rpcResult).not.toBeNull();
  })
});
