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

import * as nakamajs from "../src/client";
import {createPage, generateid} from "./utils"
import {Page} from "puppeteer"

describe('Leaderboard Tests', () => {
  
  it('should create leaderboard with Set operator and write record', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const rpcid = "clientrpc.create_leaderboard"
    const operator = "set"
    const score = {
      score: 10,
      subscore: 1,
      metadata: {"key": "value"}
    };

    const result = await page.evaluate(async (customid, rpcid, operator, score) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid })
      const result = await client.rpc(session, rpcid, {"operator": operator});
      const leaderboardId =(<any>result.payload).leaderboard_id;
      return await client.writeLeaderboardRecord(session, leaderboardId, score)
    }, customid, rpcid, operator, score);

    expect(result).not.toBeNull();
    expect(result.score).toBe(10);
    expect(result.subscore).toBe(1);
    expect(result.metadata).not.toBeNull();
    expect((<any> result.metadata).key).toBe("value");
  });

  it('should create leaderboard with Best operator and write record', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const rpcid = "clientrpc.create_leaderboard"
    const operator = "best"
    const score = {
      score: 10,
      subscore: 1,
      metadata: {"key": "value"}
    };

    const result = await page.evaluate(async (customid, rpcid, operator, score) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid })
      const result = await client.rpc(session, rpcid, {"operator": operator});
      const leaderboardId = (<any>result.payload).leaderboard_id;
      await client.writeLeaderboardRecord(session, leaderboardId, score)

      score.score = 1;
      score.subscore = 20;
      return await client.writeLeaderboardRecord(session, leaderboardId, score)
    }, customid, rpcid, operator, score);

    expect(result).not.toBeNull();
    expect(result.score).toBe(10);
    expect(result.subscore).toBe(20);
    expect(result.metadata).not.toBeNull();
    expect((<any> result.metadata).key).toBe("value");
  });

  it('should create leaderboard with Incr operator and write record', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const rpcid = "clientrpc.create_leaderboard"
    const operator = "incr"
    const score = {
      score: 10,
      subscore: 1,
      metadata: {"key": "value"}
    };

    const result = await page.evaluate(async (customid, rpcid, operator, score) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid });
      const result = await client.rpc(session, rpcid, {"operator": operator});
      const leaderboardId = (<any>result.payload).leaderboard_id;
      await client.writeLeaderboardRecord(session, leaderboardId, score);

      score.score = 1;
      score.subscore = 5;
      return await client.writeLeaderboardRecord(session, leaderboardId, score)
    }, customid, rpcid, operator, score);

    expect(result).not.toBeNull();
    expect(result.score).toBe(11);
    expect(result.subscore).toBe(6);
    expect(result.metadata).not.toBeNull();
    expect((<any> result.metadata).key).toBe("value");
  });

  it('should create leaderboard with Set operator and then list leaderboard records', async () => {
    const page : Page = await createPage();

    const customid = generateid();
    const rpcid = "clientrpc.create_leaderboard"
    const operator = "set"
    const score = {
      score: 10,
      subscore: 1,
      metadata: {"key": "value"}
    };

    const result = await page.evaluate(async (customid, rpcid, operator, score) => {
      const client = new nakamajs.Client();
      const session = await client.authenticateCustom({ id: customid });

      const result = await client.rpc(session, rpcid, {"operator": operator});
      const leaderboardId = (<any>result.payload).leaderboard_id;
      await client.writeLeaderboardRecord(session, leaderboardId, score);
      return await client.listLeaderboardRecords(session, leaderboardId);
    }, customid, rpcid, operator, score);

    expect(result).not.toBeNull();
    expect(result.records[0].score).toBe(10);
    expect(result.records[0].subscore).toBe(1);
    expect(result.records[0].metadata).not.toBeNull();
    expect((<any> result.records[0].metadata).key).toBe("value");
    expect(result.records[0].rank).toBe(1);
  });

});
