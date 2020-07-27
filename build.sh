#!/bin/bash

build () {
    npx esbuild --bundle src/index.ts --target=es6 --global-name=nakamajs "$@"
} 

build --format=cjs --outfile=dist/nakama-js.cjs.js
build --format=esm --outfile=dist/nakama-js.esm.js
build --format=iife --outfile=dist/nakama-js.iife.js
