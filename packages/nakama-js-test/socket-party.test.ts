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
import * as nakamajsprotobuf from "../nakama-js-protobuf";
import {generateid, createPage, adapters, AdapterType} from "./utils";
import {describe, expect, it} from '@jest/globals'
import { PartyPresenceEvent } from "@heroiclabs/nakama-js/socket";
import { Party, PartyAccept, PartyJoinRequest } from "@heroiclabs/nakama-js";
import { join } from "path";

describe('Party Tests', () => {

  it.each(adapters)('should create party and receive presence', async (adapter) => {
    const page = await createPage();

    const customid = generateid();

    const response : PartyPresenceEvent = await page.evaluate(async (customid, adapter) => {

      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom(customid);

      await socket.connect(session, false);

      var presencePromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket.onpartypresence = (presence) => {
          resolve(presence);
        }
      });

      socket.createParty(true, 3);
      return presencePromise;
    }, customid, adapter);

    expect(response).not.toBeNull;
    expect(response.party_id).toBeDefined;
    expect(response.joins.length == 1);
    expect(response.joins[0].user_id == customid);
  });

  it.each(adapters)('should create party and accept member', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    console.log("generating ids")


    const response : PartyPresenceEvent = await page.evaluate(async (customid1, customid2, adapter) => {

      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client1.authenticateCustom(customid2);

      await socket1.connect(session1, false);
      await socket2.connect(session2, false);

      console.log("connected")

      var presencePromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (presence) => {
          resolve(presence);
        }
      });

      socket1.createParty(true, 3);


      const presenceEvent = await presencePromise;

      const joinRequestPromise = new Promise<PartyJoinRequest>((resolve, reject) => {
        socket1.onpartyjoinrequest = (request) => {
          resolve(request);
        }
      });

      socket2.joinParty(presenceEvent.party_id);

      console.log("awaiting join request")

      const joinRequest : PartyJoinRequest = await joinRequestPromise;

      console.log("done awaiting join request")

      const joinedPromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (request) => {
          resolve(request);
        }
      });

      socket1.acceptPartyMember(joinRequest.party_id, joinRequest.presence);

      return joinedPromise;

    }, customid1, customid2, adapter);

    expect(response).not.toBeUndefined();
    expect(response.joins[0].user_id == customid1);
  });
});