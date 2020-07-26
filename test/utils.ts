import {Page} from "puppeteer";
import * as nakamajs from "../src/index"
import { WebSocketAdapterText, WebSocketAdapterPb } from "../src/index";
const fs = require("fs");

// util to generate a random id.
export function generateid() : string {
    const arr : string[] = [];

    for (let i : number = 0; i < 30; i++)
    {
        arr.push(Math.random().toString(36)[3]);
    }
    
    return arr.join("");
};

export async function createPage() : Promise<Page>
{
    try {

        const page = await browser.newPage();


        page.on('console', msg => console.log('LOG:', msg.text()));
        page.on('error', handlePageError);
        page.on('pageerror', handlePageError);
    
        const nakamaJsLib = fs.readFileSync(__dirname + '/../dist/esbuild.js', 'utf8');
    

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
     catch (e)
     {
         console.log("eeeeerrror " + e.message);
     }
}

function handlePageError(err) {

    let msg: string;
    
    if (err instanceof Object)
    {
        msg = JSON.stringify(err);
    }
    else
    {
        msg = err;
    }

    console.error('ERR:', msg);
}

export const enum AdapterType {
    Text = 0,
    Protobuf = 1
} 

export const adapters = [AdapterType.Text, AdapterType.Protobuf];