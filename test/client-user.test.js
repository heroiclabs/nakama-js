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

describe('User Tests', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();

    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
    page.on("error", err => console.log("PAGE LOG ERROR:", err));
    page.on("pageerror", err => console.log("PAGE LOG ERROR:", err));

    const nakamaJsLib = fs.readFileSync(__dirname + "/../dist/nakama-js.umd.js", "utf8");
    await page.evaluateOnNewDocument(nakamaJsLib);
    await page.goto("about:blank");
  }, TIMEOUT);

  it('should return current user account', async () => {
    const customid = generateid();

    const account = await page.evaluate((customid) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid })
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
    const customid = generateid();
    const displayName = "display";
    const avatar = "avatar";
    const lang = "fa";
    const loc = "california";

    const account = await page.evaluate((customid, displayName, avatar, lang, loc) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return client.updateAccount(session, {
            displayName: displayName,
            avatarUrl: avatar,
            langTag: lang,
            location: loc
          }).then(bool => {
            return client.getAccount(session);
          });
        });
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
    const customid = generateid();

    const account = await page.evaluate(async (customid) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid });
      const success = await client.updateAccount(session, {
        username: session.username
      });
      return client.getAccount(session);
    }, customid);

    expect(account).not.toBeNull();
    expect(account.custom_id).toBe(customid);
  });

  it('should return two users', async () => {
    const customid = generateid();
    const customid2 = generateid();

    const users = await page.evaluate((customid, customid2) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid })
        .then(session1 => {
          return client.authenticateCustom({ id: customid2 })
            .then(session2 => {
              return client.getUsers(session2, [session1.userId], [session2.username], []);
            });
        });
    }, customid, customid2);

    expect(users).not.toBeNull();
    expect(users[0]).not.toBeNull();
    expect(users[1]).not.toBeNull();
  });

  it('should return no users', async () => {
    const customid = generateid();

    const response = await page.evaluate((customid) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return client.getUsers(session, [], [], []);
        });
    }, customid);

    expect(response).not.toBeNull();
  });
}, TIMEOUT);
