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

import * as nakamajs from "../src/client";
import {StreamData} from "../src/socket"

import {createPage, generateid} from "./utils"
import {Page} from "puppeteer"

describe('Socket Message Tests', () => {

  it('should connect', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const session = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid });
      const socket = client.createSocket();
      await socket.connect(session, false);
      socket.disconnect(false);
    }, customid);
  });

  it('should rpc and receive stream data', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const ID = "clientrpc.send_stream_data";
    const PAYLOAD = JSON.stringify({ "hello": "world" });

    const response = await page.evaluate(async (customid, id, payload) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      var promise1 = new Promise<StreamData>((resolve, reject) => {
        socket.onstreamdata = (streamdata) => {
          resolve(streamdata);
        }
      });

      const session = await client.authenticateCustom({ id: customid })
      await socket.connect(session, false);
      await socket.rpc(id, payload);
      var promise2 = new Promise<null>((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive stream data - timed out.")
      });

      return Promise.race([promise1, promise2]);
    }, customid, ID, PAYLOAD);

    expect(response).not.toBeNull();
    expect(response.data).toBe(PAYLOAD);
  });
});
