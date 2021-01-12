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
import {createPage} from "./utils";
import {Page} from "puppeteer";

describe('Session Tests', () => {

  it('should be expired', async () => {
    const page : Page = await createPage();

    const expired = await page.evaluate(() => {
      const nowUnixEpoch = Math.floor(Date.now() / 1000);
      const expiredJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY5MTA5NzMsInVpZCI6ImY0MTU4ZjJiLTgwZjMtNDkyNi05NDZiLWE4Y2NmYzE2NTQ5MCIsInVzbiI6InZUR2RHSHl4dmwifQ.gzLaMQPaj5wEKoskOSALIeJLOYXEVFoPx3KY0Jm1EVU";
      const session = nakamajs.Session.restore(expiredJwt);
      return session.isexpired(nowUnixEpoch);
    });

    expect(expired).toBeTruthy();
  });

  it('should have username and userId', async () => {
    const page : Page = await createPage();

    const session = await page.evaluate(() => {
      const expiredJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY5MTA5NzMsInVpZCI6ImY0MTU4ZjJiLTgwZjMtNDkyNi05NDZiLWE4Y2NmYzE2NTQ5MCIsInVzbiI6InZUR2RHSHl4dmwifQ.gzLaMQPaj5wEKoskOSALIeJLOYXEVFoPx3KY0Jm1EVU";
      return nakamajs.Session.restore(expiredJwt);
    });

    expect(session.username).not.toBeNull();
    expect(session.username).toBe("vTGdGHyxvl");
    expect(session.user_id).not.toBeNull();
    expect(session.user_id).toBe("f4158f2b-80f3-4926-946b-a8ccfc165490");
  });
});
