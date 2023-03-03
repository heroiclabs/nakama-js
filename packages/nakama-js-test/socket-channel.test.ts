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

describe('Channel Tests', () => {

  it.each(adapters)('should join a channel', async (adapter) => {

    const page = await createPage();
    const customid = generateid();
    const channelid = generateid();

    const response = await page.evaluate(async (customid, channelid, adapter) => {

      const client = new nakamajs.Client();

        const socket = client.createSocket(false, false,
           adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

        const session = await client.authenticateCustom(customid)
        await socket.connect(session, false);

        //chat type: 1 = room, 2 = Direct Message 3 = Group
        return await socket.joinChat(channelid, 1, true, false);
    }, customid, channelid, adapter);

    expect(response).not.toBeNull();
    expect(response.id).not.toBeNull();
    expect(response.presences).not.toBeNull();
    expect(response.self).not.toBeNull();
  });

  it.each(adapters)('should join a room, then leave it', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    const channelid = generateid();

    const response = await page.evaluate(async (customid, channelid, adapter) => {

      const client = new nakamajs.Client();
      const socket = client.createSocket(false, true,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom(customid)
      await socket.connect(session, false);
      //chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(channelid, 1, true, false);

      return await socket.leaveChat(channel.id);
    }, customid, channelid, adapter);

    expect(response).not.toBeNull();
  });

  it.each(adapters)('should create a group, join group chat, then leave it', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    const group_name = generateid();

    const response = await page.evaluate(async (customid, group_name, adapter) => {

      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom(customid)
      await socket.connect(session, false);

      const group = await client.createGroup(session, { name: group_name, open: true });
      //chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(group.id!, 3, true, false);
      return await socket.leaveChat(channel.id);
    }, customid, group_name, adapter);

    expect(response).not.toBeNull();
  });

  it.each(adapters)('should join a room, then send message, receive message', async (adapter) => {

    const page = await createPage();

    const customid = generateid();
    const channelid = generateid();
    const payload = { "hello": "world" };

    const message : nakamajs.ChannelMessage | null = await page.evaluate(async (customid, channelid, payload, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      var promise1 = new Promise<nakamajs.ChannelMessage>((resolve, reject) => {
        socket.onchannelmessage = (channelmessage) => {
          resolve(channelmessage);
        }
      });

      const session = await client.authenticateCustom(customid)
      await socket.connect(session, false);

      // chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(channelid, 1, false, false);

      await socket.writeChatMessage(channel.id, payload);

      var promise2 = new Promise<null>((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive channel message - timed out.")
      });

      return Promise.race([promise1, promise2]);
    }, customid, channelid, payload, adapter);

    expect(message).not.toBeNull();
    expect(message!.channel_id).not.toBeNull();
    expect(message!.message_id).not.toBeNull();
    expect(message!.sender_id).not.toBeNull();
    expect(message!.content).toEqual(payload);
    expect(message!.code).toBe(0);
    expect(message!.persistent).toBe(false);
  });

  it.each(adapters)('should join a room, then send message, update message, then list messages', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    const channelid = generateid();
    const payload = { "hello": "world" };
    const updatedPayload = { "hello": "world2" };

    const response = await page.evaluate(async (customid, channelid, payload, updatedPayload, adapter) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom(customid)
      await socket.connect(session, false);

      //chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(channelid, 1, true, false);

      const ack = await socket.writeChatMessage(channel.id, payload);
      const ack2 = await socket.updateChatMessage(
        ack.channel_id,
        ack.message_id,
        updatedPayload);

      return await client.listChannelMessages(session, ack2.channel_id, 10)
    }, customid, channelid, payload, updatedPayload, adapter);

    console.log(response);

    expect(response).not.toBeNull();
    expect(response.messages).not.toBeNull();
    expect(response.messages?.length).toBe(1);
    expect(response.cacheable_cursor).not.toBeNull();
    expect(response.cacheable_cursor).not.toBeUndefined();

    response.messages?.forEach(message => {
      expect(message.content).toEqual(updatedPayload);
      expect(message.code).toEqual(0);
      expect(message.persistent).toBe(true);
    })
  });

  it.each(adapters)('should join a room, then send message, remove message, then list messages', async (adapter) => {
    const page = await createPage();

    const customid = generateid();
    const channelid = generateid();
    const payload = { "hello": "world" };

    const response = await page.evaluate(async (customid, channelid, payload, adapter) => {

      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false,
        adapter == AdapterType.Protobuf ? new nakamajsprotobuf.WebSocketAdapterPb() : new nakamajs.WebSocketAdapterText());

      const session = await client.authenticateCustom(customid)
      await socket.connect(session, false);

      // chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(channelid, 1, true, false);

      const ack = await socket.writeChatMessage(channel.id, payload);

      await socket.removeChatMessage(ack.channel_id,
        ack.message_id);

      return await client.listChannelMessages(session, ack.channel_id, 10)
    }, customid, channelid, payload, adapter);

    expect(response).not.toBeNull();
    expect(response.messages).not.toBeNull();
    expect(response.messages!.length).toBe(0);
  });

});
