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
import {createPage, generateid} from "./utils";
import {Page} from "puppeteer";
import {describe, expect, it} from '@jest/globals'

describe('Session Tests', () => {

  it('should be expired', async () => {
    const page : Page = await createPage();

    const expired = await page.evaluate(() => {
      const nowUnixEpoch = Math.floor(Date.now() / 1000);
      const expiredJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY5MTA5NzMsInVpZCI6ImY0MTU4ZjJiLTgwZjMtNDkyNi05NDZiLWE4Y2NmYzE2NTQ5MCIsInVzbiI6InZUR2RHSHl4dmwifQ.gzLaMQPaj5wEKoskOSALIeJLOYXEVFoPx3KY0Jm1EVU";
      const session = nakamajs.Session.restore(expiredJwt, expiredJwt);
      return session.isexpired(nowUnixEpoch);
    });

    expect(expired).toBeTruthy();
  });

  it('should have username and userId', async () => {
    const page : Page = await createPage();

    const session = await page.evaluate(() => {
      const expiredJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY5MTA5NzMsInVpZCI6ImY0MTU4ZjJiLTgwZjMtNDkyNi05NDZiLWE4Y2NmYzE2NTQ5MCIsInVzbiI6InZUR2RHSHl4dmwifQ.gzLaMQPaj5wEKoskOSALIeJLOYXEVFoPx3KY0Jm1EVU";
      return nakamajs.Session.restore(expiredJwt, expiredJwt);
    });

    expect(session.username).not.toBeNull();
    expect(session.username).toBe("vTGdGHyxvl");
    expect(session.user_id).not.toBeNull();
    expect(session.user_id).toBe("f4158f2b-80f3-4926-946b-a8ccfc165490");
  });

  it("restored should have refresh token", async () => {
    const page : Page = await createPage();

    const session = await page.evaluate(() => {
      const expiredJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY5MTA5NzMsInVpZCI6ImY0MTU4ZjJiLTgwZjMtNDkyNi05NDZiLWE4Y2NmYzE2NTQ5MCIsInVzbiI6InZUR2RHSHl4dmwifQ.gzLaMQPaj5wEKoskOSALIeJLOYXEVFoPx3KY0Jm1EVU";
      return nakamajs.Session.restore(expiredJwt, expiredJwt);
    });

    expect(session.refresh_token).not.toBeNull();
    expect(session.refresh_token).not.toBeUndefined();
    expect(session.refresh_token).not.toBe("");
  });

  it("restored should handle null refresh token", async () => {
    const page : Page = await createPage();

    await page.evaluate(() => {
      const expiredJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY5MTA5NzMsInVpZCI6ImY0MTU4ZjJiLTgwZjMtNDkyNi05NDZiLWE4Y2NmYzE2NTQ5MCIsInVzbiI6InZUR2RHSHl4dmwifQ.gzLaMQPaj5wEKoskOSALIeJLOYXEVFoPx3KY0Jm1EVU";
      return nakamajs.Session.restore(expiredJwt, null);
    });
  });

  it("should refresh", async () => {
    const page : Page = await createPage();
    const customId = generateid();

    const tokens : any = await page.evaluate(async (customId) => {
        function timeoutPromise(ms : number) : Promise<void> {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const client = new nakamajs.Client();
        const session = await client.authenticateCustom(customId);
        const firstToken = session.token;
        await timeoutPromise(1000);
        const secondSession = await client.sessionRefresh(session);
        const secondToken = secondSession.token;
        return {"firstToken": firstToken, "secondToken": secondToken};
    }, customId);

    expect(tokens.secondToken).not.toBeNull();
    expect(tokens.secondToken).not.toBeUndefined();
    expect(tokens.secondToken).not.toEqual(tokens.firstToken);
  });

  it("should logout", async () => {
    const page : Page = await createPage();
    const customId = generateid();

    const exception : any = await page.evaluate(async (customId) => {
        const client = new nakamajs.Client();
        const session = await client.authenticateCustom(customId);
        await client.sessionLogout(session, session.token, session.refresh_token);

        const obj = {
            "collection": "collection",
            "key": "this should fail",
            "value": {}
        };

        try
        {
            await client.writeStorageObjects(session, [obj]);
            return null;
        } catch (e) {
            return e;
        }
    }, customId);

    expect(exception).toBeDefined;
    expect(exception).not.toBeNull;
    expect(exception.status).toEqual(401);
  });

  it("should autorefresh session", async () => {
    const page : Page = await createPage();
    const customId = generateid();

    const tokens : any = await page.evaluate(async (customId) => {
        function timeoutPromise(ms : number) : Promise<void> {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const client = new nakamajs.Client();
        const session = await client.authenticateCustom(customId);
        const firstToken = session.token;
        session.expires_at = (Date.now() + client.expiredTimespanMs)/1000 - 1;
        await timeoutPromise(500);

        const obj = {
            "collection": "collection",
            "key": "this should succeed",
            "value": {}
        };

        await client.writeStorageObjects(session, [obj]);

        const secondToken = session.token;
        return {"firstToken": firstToken, "secondToken": secondToken};
    }, customId);

    expect(tokens.secondToken).not.toBeNull();
    expect(tokens.secondToken).not.toBeUndefined();
    expect(tokens.secondToken).not.toEqual(tokens.firstToken);
  });
});
