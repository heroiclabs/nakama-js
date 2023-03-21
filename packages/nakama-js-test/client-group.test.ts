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
import {describe, expect, it} from '@jest/globals'

describe('Group Tests', () => {

  it('should create group', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid, group_name) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      return await client.createGroup(session, { name: group_name, open: true });
    }, customid, group_name);

    expect(result).not.toBeNull();
    expect(result.name).toBe(group_name);
    expect(result.edge_count).toBe(1);
    expect(result.max_count).toBe(100);
    expect(result.metadata).toEqual({});
    expect(result.open).toBe(true);
  });

  it('should create then list group', async () => {

    const page : Page = await createPage();

    const customid = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid, group_name) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid)
      const group = await client.createGroup(session, { name: group_name, open: true });
      return await client.listUserGroups(session, session.user_id);
    }, customid, group_name);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(1);
    expect(result.user_groups![0].group!.name).toBe(group_name);
    expect(result.user_groups![0].group!.edge_count).toBe(1);
    expect(result.user_groups![0].group!.max_count).toBe(100);
    expect(result.user_groups![0].group!.metadata).toEqual({});
    expect(result.user_groups![0].group!.open).toBe(true);
    expect(result.user_groups![0].state).toBe(0);
  });

  it('should create, update, then list group', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const group_name1 = generateid();
    const group_name2 = generateid();

    const result = await page.evaluate(async (customid, group_name1, group_name2) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      const group = await client.createGroup(session, { name: group_name1, open: true });
      await client.updateGroup(session, group.id!, { name: group_name2 });
      return await client.listUserGroups(session, session.user_id);
    }, customid, group_name1, group_name2);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(1);
    expect(result.user_groups![0].group!.name).toBe(group_name2);
    expect(result.user_groups![0].group!.edge_count).toBe(1);
    expect(result.user_groups![0].group!.max_count).toBe(100);
    expect(result.user_groups![0].group!.metadata).toEqual({});
    expect(result.user_groups![0].group!.open).toBe(true);
    expect(result.user_groups![0].state).toBe(0);
  });

  it('should create, delete, then list group', async () => {

    const page : Page = await createPage();

    const customid = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid, group_name) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      const group = await client.createGroup(session, { name: group_name, open: true });
      await client.deleteGroup(session, group!.id!);
      return await client.listUserGroups(session, session.user_id);
    }, customid, group_name);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(0);
  });

  it('should create then list group users', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid, group_name) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid)
      const group = await client.createGroup(session, { name: group_name, open: true });
      return await client.listGroupUsers(session, group.id!);
    }, customid, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(1);
    expect(result.group_users![0].state).toBe(0);
  });

  it('should create, join, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: true });

      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);
      await client2.joinGroup(session2, group.id!);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(2);
    if (result.group_users![0].state! < result.group_users![1].state!) {
      expect(result.group_users![0].state).toBe(0);
      expect(result.group_users![1].state).toBe(2);
    } else {
      expect(result.group_users![0].state).toBe(2);
      expect(result.group_users![1].state).toBe(0);
    }
  });

  it('should create, add, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      const group = await client1.createGroup(session1, { name: group_name, open: true })
      await client1.addGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(2);
    if (result.group_users![0].state! < result.group_users![1].state!) {
      expect(result.group_users![0].state).toBe(0);
      expect(result.group_users![1].state).toBe(2);
    } else {
      expect(result.group_users![0].state).toBe(2);
      expect(result.group_users![1].state).toBe(0);
    }
  });

  it('should create, add, kick, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      const group = await client1.createGroup(session1, { name: group_name, open: true });
      await client1.addGroupUsers(session1, group.id!, [session2.user_id]);
      await client1.kickGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(1);
    expect(result.group_users![0].state).toBe(0);
  });

  it('should create closed, request to join, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: false });

      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);
      await client2.joinGroup(session2, group.id!);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(2);
    if (result.group_users![0]!.state! < result.group_users![1].state!) {
      expect(result.group_users![0].state).toBe(0);
      expect(result.group_users![1].state).toBe(3);
    } else {
      expect(result.group_users![0].state).toBe(3);
      expect(result.group_users![1].state).toBe(0);
    }
  });

  it('should create open, join, then list user groups and see count affected', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: true });
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      await client2.joinGroup(session2, group.id!);
      return await client1.listUserGroups(session1, session1.user_id);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(1);
    expect(result.user_groups![0].group!.edge_count).toBe(2);
  });

  it('should create closed, request to join, then list user groups and see count unaffected', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: false });
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      await client2.joinGroup(session2, group.id!);
      return await client1.listUserGroups(session1, session1.user_id);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(1);
    expect(result.user_groups![0].group!.edge_count).toBe(1);
  });

  it('should create closed, request to join, add, then list user groups and see count affected', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: false })

      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      await client2.joinGroup(session2, group.id!);
      await client1.addGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listUserGroups(session1, session1.user_id);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(1);
    expect(result.user_groups![0].group!.edge_count).toBe(2);
  });

  it('should create closed group, request to join, promote, then list user groups and see count affected', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: false });

      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);
      await client2.joinGroup(session2, group.id!);
      await client1.addGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listUserGroups(session1, session1.user_id);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(1);
    expect(result.user_groups![0].group!.edge_count).toBe(2);
  });

  it('should create open, join, leave, then list user groups and see count affected', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: true });

      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      await client2.joinGroup(session2, group.id!);
      await client2.leaveGroup(session2, group.id!);
      return await client1.listUserGroups(session1, session1.user_id);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(1);
    expect(result.user_groups![0].group!.edge_count).toBe(1);
  });

  it('should create closed, request to join, leave, then list user groups and see count unaffected', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: false });
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);
      await client2.joinGroup(session2, group.id!);
      await client2.leaveGroup(session2, group.id!);
      return await client1.listUserGroups(session1, session1.user_id);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.user_groups!.length).toBe(1);
    expect(result.user_groups![0].group!.edge_count).toBe(1);
  });

  it('should create closed, request to join, add, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1)
      const group = await client1.createGroup(session1, { name: group_name, open: false })
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2)
      await client2.joinGroup(session2, group.id!)
      await client1.addGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(2);
    if (result.group_users![0].state! < result.group_users![1].state!) {
      expect(result.group_users![0].state).toBe(0);
      expect(result.group_users![1].state).toBe(2);
    } else {
      expect(result.group_users![0].state).toBe(2);
      expect(result.group_users![1].state).toBe(0);
    }
  });

  it('should create closed, request to join, promote, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: false });
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2)
      await client2.joinGroup(session2, group.id!)
      await client1.addGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(2);
    if (result.group_users![0].state! < result.group_users![1].state!) {
      expect(result.group_users![0].state).toBe(0);
      expect(result.group_users![1].state).toBe(2);
    } else {
      expect(result.group_users![0].state).toBe(2);
      expect(result.group_users![1].state).toBe(0);
    }
  });

  it('should create closed, request to join, kick, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: false });
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);
      await client2.joinGroup(session2, group.id!)
      await client1.kickGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(1);
    expect(result.group_users![0]!.state).toBe(0);
  });

  it('should create, add, promote, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      const group = await client1.createGroup(session1, { name: group_name, open: true })
      await client1.addGroupUsers(session1, group.id!, [session2.user_id]);
      await client1.promoteGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(2);
    if (result.group_users![0].state! < result.group_users![1].state!) {
      expect(result.group_users![0].state).toBe(0);
      expect(result.group_users![1].state).toBe(1);
    } else {
      expect(result.group_users![0].state).toBe(1);
      expect(result.group_users![1].state).toBe(0);
    }
  });

  it('should create, add, promote twice, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      const group = await client1.createGroup(session1, { name: group_name, open: true });
      await client1.addGroupUsers(session1, group.id!, [session2.user_id])
      await client1.promoteGroupUsers(session1, group.id!, [session2.user_id]);
      await client1.promoteGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(2);
    expect(result.group_users![0].state).toBe(0);
    expect(result.group_users![1].state).toBe(0);
  });

  it('should create, join, leave, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const group = await client1.createGroup(session1, { name: group_name, open: true });
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);
      await client2.joinGroup(session2, group!.id!)
      await client2.leaveGroup(session2, group!.id!);
      return await client1.listGroupUsers(session1, group!.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(1);
    expect(result.group_users![0].state).toBe(0);
  });

  it('should create closed, request to join, leave, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1)
      const group = await client1.createGroup(session1, { name: group_name, open: false });
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);
      await client2.joinGroup(session2, group!.id!)
      await client2.leaveGroup(session2, group!.id!);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users!.length).toBe(1);
    expect(result.group_users![0].state).toBe(0);
  });

  it('should create, add, promote, add, promote, then list group users', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();
    const customid3 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, customid3, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);
      const client3 = new nakamajs.Client();
      const session3 = await client3.authenticateCustom(customid3);

      const group = await client1.createGroup(session1, { name: group_name, open: true });
      await client1.addGroupUsers(session1, group.id!, [session2.user_id])
      await client1.promoteGroupUsers(session1, group.id!, [session2.user_id]);
      await client2.addGroupUsers(session2, group.id!, [session3.user_id]);
      await client2.promoteGroupUsers(session2, group.id!, [session3.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, customid3, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users).not.toBeNull();
    expect(result.group_users!.length).toBe(3);
  });

  it('should create, list group', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);

      const group = await client1.createGroup(session1, { name: group_name, open: true })
      return await client1.listGroups(session1, "%" + group_name + "%");
    }, customid1, group_name);

    expect(result).not.toBeNull();
    expect(result.groups).not.toBeNull();
    expect(result.groups!.length).toBe(1);
    expect(result.cursor).not.toBeNull();
  });


  it('should create, add, ban, then list group users', async () => {

    const page : Page = await createPage();

    // TODO currently no way to check if a user has been banned in a group other than checking
    // that they aren't returned in the listGroupUsers() call

    const customid1 = generateid();
    const customid2 = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const session1 = await client1.authenticateCustom(customid1);
      const client2 = new nakamajs.Client();
      const session2 = await client2.authenticateCustom(customid2);

      const group = await client1.createGroup(session1, { name: group_name, open: true });
      await client1.addGroupUsers(session1, group.id!, [session2.user_id])
      await client1.banGroupUsers(session1, group.id!, [session2.user_id]);
      return await client1.listGroupUsers(session1, group.id!);
    }, customid1, customid2, group_name);

    expect(result).not.toBeNull();
    expect(result.group_users).not.toBeNull();
    expect(result.group_users!.length).toBe(1);
  });

  it('should create group and fail to demote superadmin', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const group_name = generateid();

    const result = await page.evaluate(async (customid, group_name) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom(customid);
      const group = await client.createGroup(session, { name: group_name, open: true });
      await client.demoteGroupUsers(session, group.id, [session.user_id]);
      return await client.listGroupUsers(session, group.id, 0);
    }, customid, group_name);

    expect(result.group_users[0].state).toBe(0);
  });

  it('should create group, add user and promote and demote them', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);
      const group = await client1.createGroup(session1, { name: group_name, open: true });
      await client1.addGroupUsers(session1, group.id, [session2.user_id]);
      await client1.promoteGroupUsers(session1, group.id, [session1.user_id])
      await client1.demoteGroupUsers(session1, group.id, [session1.user_id]);
      return await client1.listGroupUsers(session1, group.id, 2);
    }, customid1, customid2, group_name);

    expect(result.group_users.length).toBe(1);
  });

  it('should create group, add user and fail to demote lowest-ranking user', async () => {
    const page : Page = await createPage();

    const customid1 = generateid();
    const customid2 = generateid();

    const group_name = generateid();

    const result = await page.evaluate(async (customid1, customid2, group_name) => {
      const client1 = new nakamajs.Client();
      const client2 = new nakamajs.Client();

      const session1 = await client1.authenticateCustom(customid1);
      const session2 = await client2.authenticateCustom(customid2);
      const group = await client1.createGroup(session1, { name: group_name, open: true });
      await client1.addGroupUsers(session1, group.id, [session2.user_id]);
      await client1.demoteGroupUsers(session1, group.id, [session1.user_id]);
      return await client1.listGroupUsers(session1, group.id, 2);
    }, customid1, customid2, group_name);

    expect(result.group_users.length).toBe(1);
  });

});
