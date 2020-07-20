import {Page} from "puppeteer";

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
    const page = await browser.newPage();

    page.on('console', msg => console.log('LOG:', msg.text()));
    page.on('error', handlePageError);
    page.on('pageerror', handlePageError);

    const nakamaJsLib = fs.readFileSync(__dirname + '/../dist/nakama-js.umd.js', 'utf8');
    await page.evaluateOnNewDocument(nakamaJsLib);
    await page.goto('about:blank');

    return page;
}

function handlePageError(err) {

    let msg: string;
    
    if (typeof(err) == "object")
    {
        msg = JSON.stringify(err);
    }
    else
    {
        msg = err;
    }

    console.error('ERR:', msg);

}