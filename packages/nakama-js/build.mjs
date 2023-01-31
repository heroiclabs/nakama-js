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

import esbuild from 'esbuild';

// Shared esbuild config
const config = {
  logLevel: 'info',
  entryPoints: ['index.ts'],
  bundle: true,
  target: 'es6',
  globalName: 'nakamajs'
};

// Build CommonJS
await esbuild.build({
  ...config,
  format: 'cjs',
  outfile: 'dist/nakama-js.cjs.js'
});

// Build ESM
await esbuild.build({
  ...config,
  format: 'esm',
  outfile: 'dist/nakama-js.esm.mjs'
});

// Build IIFE
await esbuild.build({
  ...config,
  format: 'iife',
  outfile: 'dist/nakama-js.iife.js'
});