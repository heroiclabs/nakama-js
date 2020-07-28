#!/bin/bash

# Copyright 2020 The Nakama Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

build () {
    npx esbuild --bundle web_socket_adapter_pb.ts --target=es6 --global-name=nakamajs-protobuf "$@"
}

build --format=cjs --outfile=dist/nakama-js-protobuf.cjs.js
build --format=esm --outfile=dist/nakama-js-protobuf.esm.js
build --format=iife --outfile=dist/nakama-js-protobuf.iife.js
