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

import * as nakamajs from "@heroiclabs/nakama-js";
import {StatusPresenceEvent} from "@heroiclabs/nakama-js/socket";
import * as nakamajsprotobuf from "../nakama-js-protobuf";
import {generateid, createPage, adapters, AdapterType} from "./utils";
import {describe, expect, it} from '@jest/globals'

describe('Status Tests', () => {

  it.each(adapters)('should create status, and then update it', async (adapter) => {
    const page = await createPage();

    const customid = generateid();

    const response = await page.evaluate(async (customid, adapter) => {

      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom(customid);
      await socket.connect(session, true);

      return socket.updateStatus("hello-world");
    }, customid, adapter);

    expect(response).not.toBeNull();
  });

  it.each(adapters)('should follow user2, and get status update when coming online', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);
      await socket1.connect(session1, true);
      await socket1.followUsers([session2.user_id]);

      var promise1 = new Promise<StatusPresenceEvent>((resolve, reject) => {
        socket1.onstatuspresence = (statusPresence) => {
          resolve(statusPresence);
        }
      });

      const promise2 = socket2.connect(session2, true).then((session) => {
        return new Promise<null>((resolve, reject) => {
          setTimeout(reject, 2500, "did not receive match data - timed out.");
        });
      });

      return Promise.race([promise1, promise2]);
    }, customid1, customid2, adapter);

    expect(response).not.toBeNull();
    expect(response.joins.length).toEqual(1);
  });

  it.each(adapters)('should follow user2, and unfollow user2', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2, adapter) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);
      await socket1.connect(session1, true);
      await socket1.followUsers([session2.user_id]);
      return socket1.unfollowUsers([session2.user_id]);
    }, customid1, customid2, adapter);

    expect(response).not.toBeNull();
  });

});
