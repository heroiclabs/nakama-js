/**
 * Copyright 2021 The Nakama Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as nakamajs from "@heroiclabs/nakama-js";

var useSSL = false; // Enable if server is run with an SSL certificate.
var client = new nakamajs.Client("defaultkey", "127.0.0.1", "7350", useSSL);

client.authenticateCustom("test_id").then(
    session => { console.log("authenticated.");
}).catch(e => {
    console.log("error authenticating.");
});
