// Copyright 2020 The Nakama Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { execSync } = require("child_process");

function esbuild(args) {
    execSync("npx esbuild --bundle index.ts --target=es6 --global-name=nakamajsprotobuf " + args)
}

// emit .d.ts files and perform type checking
execSync("npx typescript --project tsconfig.json", {stdio: 'inherit'})

esbuild(" --format=cjs --outfile=dist/nakama-js-protobuf.cjs.js")
esbuild(" --format=esm --outfile=dist/nakama-js-protobuf.esm.js")
esbuild(" --format=iife --outfile=dist/nakama-js-protobuf.iife.js")
