/*
 * Copyright 2020 Heroic Labs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Rollup is the legacy build system for nakama-js and is only used for cocos2d-x-js support.

import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: './index.ts',
    output:  {
        format: 'umd',
        name: 'nakamajs',
        dir: "dist",
        entryFileNames: "nakama-js.umd.js" // workaround for TS requirement that dir is specified in config
    },
    plugins: [
        typescript({
            include: ["**/*.ts"],
            target: "es5"
        }),
        nodeResolve()
    ],
    moduleContext: {
        [require.resolve('whatwg-fetch')]: 'window'
    }
};
