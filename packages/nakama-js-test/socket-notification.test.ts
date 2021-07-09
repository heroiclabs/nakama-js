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


import {Page} from "puppeteer";
import * as nakamajs from "@heroiclabs/nakama-js";
import {createPage, generateid} from "./utils";
import {describe, expect, it} from '@jest/globals'

describe('Notification Tests', () => {

  it('should rpc and list notifications', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const notifications = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      await client.rpc(session, "clientrpc.send_notification", {"user_id": session.user_id});
      await client.rpc(session, "clientrpc.send_notification", {"user_id": session.user_id});
      var notificationList = await client.listNotifications(session, 1, "");
      var notificationList = await client.listNotifications(session, 1, notificationList.cacheable_cursor);

      return notificationList;
    }, customid);

    expect(notifications).not.toBeNull();
    expect(notifications.notifications[0].id).not.toBeNull();
    expect(notifications.notifications[0].content).toEqual({reward_coins: 1000});
    expect(notifications.notifications[0].subject).toEqual("You've unlocked level 100!");
    expect(notifications.notifications[0].code).toEqual(1);
  });

  it('should rpc and delete notification', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const response = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      const rpcSuccess = await client.rpc(session, "clientrpc.send_notification", {"user_id": session.user_id});
      const notificationsList = await client.listNotifications(session, 100, "");

      var notificationsDelete = []
      notificationsList.notifications.forEach((notification) => {
        notificationsDelete.push(notification.id);
      });

      await client.deleteNotifications(session, notificationsDelete);
      return client.listNotifications(session, 1, "");
    }, customid);

    expect(response).not.toBeNull();
    expect(response.notifications).not.toBeNull();
    expect(response.notifications.length).toEqual(0);
  });

});
