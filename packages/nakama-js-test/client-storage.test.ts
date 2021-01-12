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
import * as nakamajs from "@heroiclabs/nakama-js";
import {createPage, generateid} from "./utils"

describe('Storage Tests', () => {

  it('should write and read storage', async () => {

    const page : Page = await createPage();

    const customid = generateid();
    const collection = "testcollection";
    const key = "testkey";
    const value = {"hello": "world"};

    const result = await page.evaluate(async (customid, collection, key, value) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      await client.writeStorageObjects(session, [
        {
          "collection": collection,
          "key": key,
          "value": value
        }
      ]);
      return await client.readStorageObjects(session, {
        object_ids: [{
          "collection": collection,
          "key": key,
          "user_id": session.user_id
        }]
      });
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
    const page : Page = await createPage();

    const customid = generateid();
    const collection = "testcollection";
    const key = "testkey";
    const value = {"hello": "world"};

    const result = await page.evaluate(async (customid, collection, key, value) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      await client.writeStorageObjects(session,[
        {
          "collection": collection,
          "key": key,
          "value": value
        }
      ]);

      await client.deleteStorageObjects(session, {
        object_ids: [{
          "collection": collection,
          "key": key
        }]
      });

      return await client.readStorageObjects(session, {
        object_ids: [{
          "collection": collection,
          "key": key,
          "user_id": session.user_id
        }]
      })
    }, customid, collection, key, value);

    expect(result).not.toBeNull();
    expect(result.objects.length).toBe(0);
  });

  it('should write and list storage', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const collection = "testcollection";
    const key = "testkey";
    const value = {"hello": "world"};

    const result = await page.evaluate(async (customid, collection, key, value) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);

      await client.writeStorageObjects(session,[
        {
          "collection": collection,
          "key": key,
          "value": value,
          "permission_read": 2,
          "permission_write": 1
        }
      ]);

      return await client.listStorageObjects(session, collection, session.user_id);

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

});
