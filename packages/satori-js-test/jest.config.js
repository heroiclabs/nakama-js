const merge = require('merge')
const ts_preset = require('ts-jest/jest-preset')
const puppeteer_preset = require('jest-puppeteer/jest-preset')

//use multiple jest presets by merging and exporting them as a single object
module.exports = merge.recursive(ts_preset, puppeteer_preset, {
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.test.json'
      }
    }
  }
)
