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
import {generateid, createPage, adapters, AdapterType, matchmakerTimeout} from "./utils";
import {describe, expect, it} from '@jest/globals'
import {MatchmakerMatched, PartyPresenceEvent, PartyData, PartyJoinRequest, PartyLeader, PartyMatchmakerTicket} from "@heroiclabs/nakama-js";
import { assert } from "console";

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

      socket.createParty(false, 3);
      return presencePromise;
    }, customid, adapter);

    expect(response).not.toBeNull;
    expect(response.party_id).toBeDefined;
    expect(response.joins.length).toEqual(1);
  });

  it.each(adapters)('should create closed party and accept member', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response : PartyPresenceEvent = await page.evaluate(async (customid1, customid2, adapter) => {

      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);

      await socket1.connect(session1, false);
      await socket2.connect(session2, false);

      var presencePromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (presence) => {
          resolve(presence);
        }
      });

      socket1.createParty(false, 3);

      const presenceEvent = await presencePromise;

      const joinRequestPromise = new Promise<PartyJoinRequest>((resolve, reject) => {
        socket1.onpartyjoinrequest = (request) => {
          resolve(request);
        }
      });

      socket2.joinParty(presenceEvent.party_id);

      const joinRequest : PartyJoinRequest = await joinRequestPromise;

      const joinedPromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (request) => {
          resolve(request);
        }
      });

      socket1.acceptPartyMember(joinRequest.party_id, joinRequest.presences[0]);

      return joinedPromise;

    }, customid1, customid2, adapter);

    expect(response).toBeDefined();
  });

  it.each(adapters)('should only create open party and only have member join', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response : PartyPresenceEvent = await page.evaluate(async (customid1, customid2, adapter) => {

      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);

      await socket1.connect(session1, false);
      await socket2.connect(session2, false);

      var presencePromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (presence) => {
          resolve(presence);
        }
      });

      socket1.createParty(true, 3);

      const presenceEvent = await presencePromise;

      const socket2PresencePromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (request) => {
          resolve(request);
        }
      });

      socket2.joinParty(presenceEvent.party_id);

      return socket2PresencePromise;


    }, customid1, customid2, adapter);

    expect(response).toBeDefined();
  });


  it.each(adapters)('should create open party and have member join and send data', async (adapter) => {
  const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response : string = await page.evaluate(async (customid1, customid2, adapter) => {

      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);

      await socket1.connect(session1, false);
      await socket2.connect(session2, false);

      var presencePromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (presence) => {
          resolve(presence);
        }
      });

      socket1.createParty(true, 3);

      const presenceEvent = await presencePromise;

      const socket2PresencePromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (request) => {
          resolve(request);
        }
      });

      socket2.joinParty(presenceEvent.party_id);

      await socket2PresencePromise;

      const socket2DataPromise = new Promise<PartyData>((resolve, reject) => {
        socket2.onpartydata = (data) => {
          resolve(data);
        }
      });

      socket1.sendPartyData(presenceEvent.party_id, 1, JSON.stringify({"hello": "world"}));

      const matchData = await socket2DataPromise;
      return new TextDecoder().decode(matchData.data);
    }, customid1, customid2, adapter);

    expect(response).toBeDefined();
    expect(JSON.parse(response).hello).toEqual("world");
  });

  it.each(adapters)('should create closed party and have member join and then removed', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response : PartyPresenceEvent = await page.evaluate(async (customid1, customid2, adapter) => {

      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);

      await socket1.connect(session1, false);
      await socket2.connect(session2, false);

      const id1PresenceJoinPromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (presence) => {
          resolve(presence);
        }
      });

      socket1.createParty(false, 3);

      const id1PresenceEvent = await id1PresenceJoinPromise;

      const id2JoinRequestPromise = new Promise<PartyJoinRequest>((resolve, reject) => {
        socket1.onpartyjoinrequest = (request) => {
          resolve(request);
        }
      });

      socket2.joinParty(id1PresenceEvent.party_id);

      const id2JoinRequest : PartyJoinRequest = await id2JoinRequestPromise;

      await socket1.acceptPartyMember(id2JoinRequest.party_id, id2JoinRequest.presences[0]);
      socket1.removePartyMember(id2JoinRequest.party_id, id2JoinRequest.presences[0]);

      const id2PresenceRemovedPromise = new Promise<PartyPresenceEvent>((resolve, reject) => {

      socket1.onpartypresence = (presence) => {
          if (presence.leaves?.length > 0) {
            resolve(presence);
          }
        }
      });

      return id2PresenceRemovedPromise;
    }, customid1, customid2, adapter);

    expect(response).toBeDefined();
    expect(response.leaves).toHaveLength(1);
  });

  it.each(adapters)('should create closed party and have member join and then promoted', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response : PartyLeader = await page.evaluate(async (customid1, customid2, adapter) => {

      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);

      await socket1.connect(session1, false);
      await socket2.connect(session2, false);

      const id1PresenceJoinPromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (presence) => {
          resolve(presence);
        }
      });

      socket1.createParty(false, 3);

      const id1PresenceEvent = await id1PresenceJoinPromise;

      const id2JoinRequestPromise = new Promise<PartyJoinRequest>((resolve, reject) => {
        socket1.onpartyjoinrequest = (request) => {
          resolve(request);
        }
      });

      socket2.joinParty(id1PresenceEvent.party_id);

      const id2JoinRequest : PartyJoinRequest = await id2JoinRequestPromise;

      await socket1.acceptPartyMember(id2JoinRequest.party_id, id2JoinRequest.presences[0]);
      socket1.promotePartyMember(id2JoinRequest.party_id, id2JoinRequest.presences[0]);

      const id2PresencePromotedPromise = new Promise<PartyLeader>((resolve, reject) => {
        socket1.onpartyleader = (leader) => {
            resolve(leader);
        }
      });

      return id2PresencePromotedPromise;
    }, customid1, customid2, adapter);

    expect(response).toBeDefined();
    expect(response.presence).toBeDefined();
  });

  it.each(adapters)('should create closed party and have member join and then join match', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const customid3 = generateid();

    const response : MatchmakerMatched = await page.evaluate(async (customid1, customid2, customid3, adapter) => {

      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();
      const client3 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket3 = client3.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());


      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);
      const session3 = await client3.authenticateCustom(customid3);

      await socket1.connect(session1, false);
      await socket2.connect(session2, false);
      await socket3.connect(session3, false);

      const id1PresenceJoinPromise = new Promise<PartyPresenceEvent>((resolve, reject) => {
        socket1.onpartypresence = (presence) => {
          resolve(presence);
        }
      });

      socket1.createParty(false, 3);

      const id1PresenceEvent = await id1PresenceJoinPromise;

      const id2JoinRequestPromise = new Promise<PartyJoinRequest>((resolve, reject) => {
        socket1.onpartyjoinrequest = (request) => {
          resolve(request);
        }
      });

      socket2.joinParty(id1PresenceEvent.party_id);

      const id2JoinRequest : PartyJoinRequest = await id2JoinRequestPromise;

      await socket1.acceptPartyMember(id2JoinRequest.party_id, id2JoinRequest.presences[0]);
      await socket3.addMatchmaker("*", 3, 3);
      socket1.addMatchmakerParty(id1PresenceEvent.party_id, "*", 3, 3);

      const id1MatchedPromise = new Promise<MatchmakerMatched>((resolve, reject) => {
      socket1.onmatchmakermatched = (request) => {
          resolve(request);
        }
      });

      return id1MatchedPromise;
    }, customid1, customid2, customid3, adapter);

    expect(response).toBeDefined();
    expect(response.token).toBeDefined();
    expect(response.users.length).toEqual(3);
    expect(response.self.party_id).toBeDefined();
  }, matchmakerTimeout);

  it.each(adapters)('should create party and add matchmaker and leave matchmaker', async (adapter) => {
    const page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const response = await page.evaluate(async (customid1, customid2, adapter) => {

      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const socket1 = client1.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const socket2 = client2.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);

      await socket1.connect(session1, false);
      await socket2.connect(session2, false);

      const party = await socket1.createParty(true, 1);

      await socket2.joinParty(party.party_id);

      const memberTicketPromise = new Promise<PartyMatchmakerTicket>((resolve, reject) => {
        socket2.onpartymatchmakerticket = (ticket) => {
          resolve(ticket);
        }
      });

      const leaderTicketPromise = socket1.addMatchmakerParty(party.party_id, "*", 3, 3);

      const allTickets = await Promise.all([leaderTicketPromise, memberTicketPromise]);

      await socket1.removeMatchmakerParty(allTickets[0].party_id, allTickets[0].ticket);

      return leaderTicketPromise;
    }, customid1, customid2, adapter);

    expect(response).toBeDefined();
    expect(response.party_id).toBeDefined();
    expect(response.ticket).toBeDefined();

  });
});