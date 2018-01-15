import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import rootImport from 'rollup-plugin-root-import';
import packagejson from './package.json';

export default [
  {
    // Build a UMD module for browsers.
    "input": "src/index.js",
    "name": "nakamajs",
    "output": {
      "file": packagejson.browser,
      "format": "umd"
    },
    "plugins": [
      resolve({
        "main": true
      }),
      commonjs(),
      babel({
        "exclude": [
          "node_modules/**"
        ]
      }),
      rootImport({
        useEntry: 'prepend',
        extensions: '.js'
      }),
    ]
  }, {
    // Build commonjs and ES modules.
    "input": "src/index.js",
    "output": [
      {
        "file": packagejson.main,
        "format": "cjs"
      }, {
        "file": packagejson.module,
        "format": "es"
      }
    ],
    "plugins": [
      resolve({
        "main": true
      }),
      commonjs(),
      babel({
        "exclude": [
          "node_modules/**"
        ]
      }),
      rootImport({
        useEntry: 'prepend',
        extensions: '.js'
      }),
    ]
  }
];
