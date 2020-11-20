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
import * as nakamajs from "../packages/nakama-js";
import {createPage, generateid} from "./utils";

describe('User Tests', () => {

  it('should return current user account', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const account = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom(customid)
        .then(session => {
          return client.getAccount(session);
        });
    }, customid);

    expect(account).not.toBeNull();
    expect(account.custom_id).not.toBeNull();
    expect(account.wallet).not.toBeNull();
    expect(account.wallet).toBe("{}");
    expect(account.user).not.toBeNull();
    expect(account.user.id).not.toBeNull();
    expect(account.user.username).not.toBeNull();
    expect(account.user.lang_tag).not.toBeNull();
    expect(account.user.lang_tag).toBe("en");
    expect(account.user.metadata).not.toBeNull();
    expect(account.user.metadata).toBe("{}");
  });

  it('should update current user account', async () => {

    const page : Page = await createPage();

    const customid = generateid();
    const displayName = "display";
    const avatar = "avatar";
    const lang = "fa";
    const loc = "california";

    const account = await page.evaluate(async (customid, displayName, avatar, lang, loc) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);

      await client.updateAccount(session, {
        display_name: displayName,
        avatar_url: avatar,
        lang_tag: lang,
        location: loc
      });

      return await client.getAccount(session);
    }, customid, displayName, avatar, lang, loc);

    expect(account).not.toBeNull();
    expect(account.user.display_name).not.toBeNull();
    expect(account.user.display_name).toBe(displayName);
    expect(account.user.avatar_url).not.toBeNull();
    expect(account.user.avatar_url).toBe(avatar);
    expect(account.user.lang_tag).not.toBeNull();
    expect(account.user.lang_tag).toBe(lang);
    expect(account.user.location).not.toBeNull();
    expect(account.user.location).toBe(loc);
  });

  it('should update current user with same username', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const account = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      const success = await client.updateAccount(session, {
        username: session.username
      });
      return client.getAccount(session);
    }, customid);

    expect(account).not.toBeNull();
    expect(account.custom_id).toBe(customid);
  });

  it('should return two users', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const customid2 = generateid();

    const users = await page.evaluate(async (customid, customid2) => {
      const client = new nakamajs.Client();
      const session1 = await client.authenticateCustom(customid);
      const session2 = await client.authenticateCustom(customid2)
      return await client.getUsers(session2, [session1.user_id], [session2.username], []);
    }, customid, customid2);

    expect(users).not.toBeNull();
    expect(users[0]).not.toBeNull();
    expect(users[1]).not.toBeNull();
  });

  it('should return no users', async () => {
    const page : Page = await createPage();

    const customid = generateid();

    const response = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      return await client.getUsers(session, [], [], []);
    }, customid);

    expect(response).not.toBeNull();
  });
});
