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

describe('Storage Tests', () => {
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

  it('should write and read storage', async () => {
    const customid = generateid();
    const collection = "testcollection";
    const key = "testkey";
    const value = {"hello": "world"};

    const result = await page.evaluate((customid, collection, key, value) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return client.writeStorageObjects(session,[
            {
              "collection": collection,
              "key": key,
              "value": value
            }
          ]).then(acks => {
            return client.readStorageObjects(session, {
              object_ids: [{
                "collection": collection,
                "key": key,
                "user_id": session.user_id
              }]
            })
          });
        })
    }, customid, collection, key, value);

    expect(result).not.toBeNull();
    expect(result.objects.length).toBe(1);
    expect(result.objects[0]).not.toBeNull();
    expect(result.objects[0].collection).toBe(collection);
    expect(result.objects[0].key).toBe(key);
    expect(result.objects[0].value).toEqual(value);
    expect(result.objects[0].permission_read).toBe(1);
    expect(result.objects[0].permission_write).toBe(1);
    expect(result.objects[0].version).not.toBeNull();
  });

  it('should write and delete storage', async () => {
    const customid = generateid();
    const collection = "testcollection";
    const key = "testkey";
    const value = {"hello": "world"};

    const result = await page.evaluate((customid, collection, key, value) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return client.writeStorageObjects(session,[
            {
              "collection": collection,
              "key": key,
              "value": value
            }
          ]).then(acks => {
            return client.deleteStorageObjects(session, {
              object_ids: [{
                "collection": collection,
                "key": key
              }]
            })
          }).then(bool => {
            return client.readStorageObjects(session, {
              object_ids: [{
                "collection": collection,
                "key": key,
                "user_id": session.user_id
              }]
            })
          });
        })
    }, customid, collection, key, value);

    expect(result).not.toBeNull();
    expect(result.objects.length).toBe(0);
  });

  it('should write and list storage', async () => {
    const customid = generateid();
    const collection = "testcollection";
    const key = "testkey";
    const value = {"hello": "world"};

    const result = await page.evaluate((customid, collection, key, value) => {
      const client = new nakamajs.Client();
      return client.authenticateCustom({ id: customid })
        .then(session => {
          return client.writeStorageObjects(session,[
            {
              "collection": collection,
              "key": key,
              "value": value,
              "permission_read": 2,
              "permission_write": 1
            }
          ]).then(bool => {
            return client.listStorageObjects(session, collection, session.user_id)
          });
        })
    }, customid, collection, key, value);

    expect(result).not.toBeNull();
    expect(result.objects.length).toBe(1);
    expect(result.objects[0]).not.toBeNull();
    expect(result.objects[0].collection).toBe(collection);
    expect(result.objects[0].key).toBe(key);
    expect(result.objects[0].value).toEqual(value);
    expect(result.objects[0].permission_read).toBe(2);
    expect(result.objects[0].permission_write).toBe(1);
    expect(result.objects[0].version).not.toBeNull();
  });

}, TIMEOUT);
