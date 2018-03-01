const chalk  = require("chalk");
const fs     = require("fs");
const mkdirp = require("mkdirp");
const os     = require("os");
const path   = require("path");
const puppeteer = require("puppeteer");

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

module.exports = async function() {
  console.log(chalk.green("Setup puppeteer"));
  const browser = await puppeteer.launch({});
  global.__BROWSER__ = browser;
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
