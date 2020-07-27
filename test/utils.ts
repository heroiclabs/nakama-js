/**
 * Copyright 2020 The Nakama Authors
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

import { Page } from "puppeteer";
const fs = require("fs");

// util to generate a random id.
export function generateid(): string {
    const arr: string[] = [];

    for (let i: number = 0; i < 30; i++) {
        arr.push(Math.random().toString(36)[3]);
    }

    return arr.join("");
};

export async function createPage(): Promise<Page> {
    try {

        const page = await browser.newPage();

        page.on('console', msg => console.log('LOG:', msg.text()));
        page.on('error', handlePageError);
        page.on('pageerror', handlePageError);

        const nakamaJsLib = fs.readFileSync(__dirname + '/../dist/nakama-js.iife.js', 'utf8');

        try {
            const promise = page.evaluateOnNewDocument(nakamaJsLib);
            promise.catch(e => {
                console.log("caught e....");
                console.log(e);

            });
            await promise;

        }
        catch (e) {
            console.log("error is...");

            console.log(e);
        }
        await page.goto('about:blank');

        return page;
    }
    catch (e) {
        console.log("eeeeerrror " + e.message);
    }
}

function handlePageError(err) {

    let msg: string;

    if (err instanceof Object) {
        msg = JSON.stringify(err);
    }
    else {
        msg = err;
    }

    console.error('ERR:', msg);
}

export const enum AdapterType {
    Text = 0,
    Protobuf = 1
}

export const adapters = [AdapterType.Text, AdapterType.Protobuf];