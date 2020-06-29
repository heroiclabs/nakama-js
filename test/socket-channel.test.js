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

describe('Channel Tests', () => {
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

  it('should join a channel', async () => {
    const customid = generateid();
    const channelid = generateid();

    const response = await page.evaluate(async (customid, channelid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);
      const session = await client.authenticateCustom({ id: customid })
      await socket.connect(session);

      //chat type: 1 = room, 2 = Direct Message 3 = Group
      return await socket.joinChat(channelid, 1, true, false);
    }, customid, channelid);

    expect(response).not.toBeNull();
    expect(response.cid).not.toBeNull();
    expect(response.channel).not.toBeNull();
    expect(response.channel.id).not.toBeNull();
    expect(response.channel.self).not.toBeNull();
    expect(response.channel.presences).not.toBeNull();
  });

  it('should join a room, then leave it', async () => {
    const customid = generateid();
    const channelid = generateid();

    const response = await page.evaluate(async (customid, channelid) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);
      const session = await client.authenticateCustom({ id: customid })
      await socket.connect(session);
      //chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(channelid, 1, true, false);

      return await socket.leaveChat(channel.channel.id);
    }, customid, channelid);

    expect(response).not.toBeNull();
    expect(response.cid).not.toBeNull();
  });

  it('should join a room, then send message, receive message', async () => {
    const customid = generateid();
    const channelid = generateid();
    const payload = { "hello": "world" };

    const response = await page.evaluate(async (customid, channelid, payload) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      var promise1 = new Promise((resolve, reject) => {
        socket.onchannelmessage = (channelmessage) => {
          resolve(channelmessage);
        }
      });

      const session = await client.authenticateCustom({ id: customid })
      await socket.connect(session);

      // chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(channelid, 1, false, false);

      await socket.writeChatMessage(channel.channel.id, payload);
      
      var promise2 = new Promise((resolve, reject) => {
        setTimeout(reject, 5000, "did not receive channel message - timed out.")
      });

      return Promise.race([promise1, promise2]);
    }, customid, channelid, payload);

    expect(response).not.toBeNull();
    expect(response.channel_id).not.toBeNull();
    expect(response.message_id).not.toBeNull();
    expect(response.sender_id).not.toBeNull();
    expect(response.content).toEqual(payload);
    expect(response.code).toBe(0);
    expect(response.persistent).toBe(false);
  });

  it('should join a room, then send message, update message, then list messages', async () => {
    const customid = generateid();
    const channelid = generateid();
    const payload = { "hello": "world" };
    const updatedPayload = { "hello": "world2" };

    const response = await page.evaluate(async (customid, channelid, payload, updatedPayload) => {
      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid })
      await socket.connect(session);

      //chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(channelid, 1, true, false);

      const ack = await socket.writeChatMessage(channel.channel.id, payload);
      
      const ack2 = await socket.updateChatMessage(
        ack.channel_message_ack.channel_id,
        ack.channel_message_ack.message_id,
        updatedPayload);

      return await client.listChannelMessages(session, ack2.channel_message_ack.channel_id, 10)
    }, customid, channelid, payload, updatedPayload);

    expect(response).not.toBeNull();
    expect(response.messages).not.toBeNull();
    expect(response.messages.length).toBe(1);

    response.messages.forEach(message => {
      expect(message.content).toEqual(updatedPayload);
      expect(message.code).toEqual(0);
      expect(message.persistent).toBe(true);
    })
  });

  it('should join a room, then send message, remove message, then list messages', async () => {
    const customid = generateid();
    const channelid = generateid();
    const payload = { "hello": "world" };

    const response = await page.evaluate(async (customid, channelid, payload) => {

      const client = new nakamajs.Client();
      const socket = client.createSocket(false, false);

      const session = await client.authenticateCustom({ id: customid })
      await socket.connect(session);

      // chat type: 1 = room, 2 = Direct Message 3 = Group
      const channel = await socket.joinChat(channelid, 1, true, false);

      const ack = await socket.writeChatMessage(channel.channel.id, payload);

      await socket.removeChatMessage(ack.channel_message_ack.channel_id,
        ack.channel_message_ack.message_id);

      return await client.listChannelMessages(session, ack.channel_message_ack.channel_id, 10)
    }, customid, channelid, payload);

    expect(response).not.toBeNull();
    expect(response.messages).not.toBeNull();
    expect(response.messages.length).toBe(0);
  });

}, TIMEOUT);
