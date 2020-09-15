Nakama JavaScript client
========================

> JavaScript client for Nakama server written in TypeScript. For browser and React Native projects.

[Nakama](https://github.com/heroiclabs/nakama) is an open-source server designed to power modern games and apps. Features include user accounts, chat, social, matchmaker, realtime multiplayer, and much [more](https://heroiclabs.com).

This client implements the full API and socket options with the server. It's written in TypeScript with minimal dependencies to be compatible with all modern browsers and React Native.

Full documentation is online - https://heroiclabs.com/docs/javascript-client-guide

## Getting Started

You'll need to setup the server and database before you can connect with the client. The simplest way is to use Docker but have a look at the [server documentation](https://github.com/heroiclabs/nakama#getting-started) for other options.

1. Install and run the servers. Follow these [instructions](https://heroiclabs.com/docs/install-docker-quickstart).

2. Import the client into your project. It's [available on NPM](https://www.npmjs.com/package/@heroiclabs/nakama-js) and can be also be added to a project with Bower or other package managers.

    ```shell
    yarn add "@heroiclabs/nakama-js"
    ```

    You'll now see the code in the "node_modules" folder and package listed in your "package.json".

    Optionally, if you would like to use the protocol buffer wire format with your Web Sockets, you can utilize
    the adapter found in this package:

    ```shell
    yarn add "@heroiclabs/nakama-js-protobuf"
    ```

3. Use the connection credentials to build a client object.

    ```js
    <script src="path/to/nakama-js.iife.js"></script>

    var useSSL = false; // Enable if server is run with an SSL certificate.
    var client = new nakamajs.Client("defaultkey", "127.0.0.1", 7350, useSSL);
    ```

    If you are including the optional protocol buffer adapter, pass the adapter to the Client object:
    ```js
    <script src="path/to/nakama-js.iife.js"></script>
    <script src="path/to/nakama-js-protobuf.iife.js"></script>

    var useSSL = false; // Enable if server is run with an SSL certificate.
    var client = new nakamajs.Client("defaultkey", "127.0.0.1", 7350, useSSL, new nakamajsprotobuf.WebSocketAdapterPb());
    ```

## Usage

The client object has many methods to execute various features in the server or open realtime socket connections with the server.

### Authenticate

There's a variety of ways to [authenticate](https://heroiclabs.com/docs/authentication) with the server. Authentication can create a user if they don't already exist with those credentials. It's also easy to authenticate with a social profile from Google Play Games, Facebook, Game Center, etc.

```js
var email = "super@heroes.com";
var password = "batsignal";
const session = await client.authenticateEmail({ email: email, password: password });
console.info(session);
```

### Sessions

When authenticated the server responds with an auth token (JWT) which contains useful properties and gets deserialized into a `Session` object.

```js
console.info(session.token); // raw JWT token
console.info(session.userId);
console.info(session.username);
console.info("Session has expired?", session.isexpired(Date.now() / 1000));
const expiresat = session.expires_at;
console.warn("Session will expire at", new Date(expiresat * 1000).toISOString());
```

It is recommended to store the auth token from the session and check at startup if it has expired. If the token has expired you must reauthenticate. The expiry time of the token can be changed as a setting in the server.

```js
// Assume we've stored the auth token in browser Web Storage.
const authtoken = window.localStorage.getItem("nkauthtoken");
const session = nakamajs.Session.restore(authtoken);
if (session.isexpired(Date.now() / 1000)) {
    console.warn("Session has expired. Must reauthenticate.");
}
```

### Requests

The client includes lots of builtin APIs for various features of the game server. These can be accessed with the methods which return Promise objects. It can also call custom logic as RPC functions on the server. These can also be executed with a socket object.

All requests are sent with a session object which authorizes the client.

```js
const account = await client.getAccount(session);
console.info(account.user.id);
console.info(account.user.username);
console.info(account.wallet);
```

### Socket

The client can create one or more sockets with the server. Each socket can have it's own event listeners registered for responses received from the server.

```js
const secure = false; // enable if server is run with an SSL certificate
const trace = false;
const socket = client.createSocket(secure, trace);
socket.ondisconnect = (evt) => {
    console.info("Disconnected", evt);
};

const session = await socket.connect(session);
// Socket is open.
```

There's many messages for chat, realtime, status events, notifications, etc. which can be sent or received from the socket.

```js
socket.onchannelmessage = (message) => {
    console.info("Message received from channel", message.channel_id);
    console.info("Received message", message);
};


// 1 = room, 2 = Direct Message, 3 = Group
const type : number = 1;
const roomname = "mychannel";
const persistence : boolean = false;
const hidden : boolean = false;

const channel = await socket.joinChat(type, roomname, persistence, hidden);

const message = { "hello": "world" };
socket.writeChatMessage(channel.channel.id, message);
```

## Contribute

The development roadmap is managed as GitHub issues and pull requests are welcome. If you're interested in enhancing the code please open an issue to discuss the changes or drop in and discuss it in the [community forum](https://forum.heroiclabs.com).

### Source Builds

Ensure you are using Node v12.18.1

The codebase is multi-package monorepo written in TypeScript and can be built with [esbuild](https://github.com/evanw/esbuild). All dependencies are managed with Yarn.

To build from source, install dependencies and build the `nakama-js` and `nakama-js-protobuf` subrepositories:

```shell
yarn workspace @heroiclabs/nakama-js install && yarn workspace @heroiclabs/nakama-js build
yarn workspace @heroiclabs/nakama-js-protobuf install && yarn workspace @heroiclabs/nakama-js-protobuf build
```

### Run Tests

To run tests you will need to run the server and database. Most tests are written as integration tests which execute against the server. A quick approach we use with our test workflow is to use the Docker compose file described in the [documentation](https://heroiclabs.com/docs/install-docker-quickstart).

Tests are run against each workspace bundle; if you have made source code changes, you should `yarn workspace <workspace> build` prior to running tests.

```shell
docker-compose -f ./docker-compose.yml up
yarn test
```

### Protocol Buffer Web Socket Adapter

To update the generated Typescript required for using the protocol buffer adapter, run the following:

```shell
npx protoc \
--plugin="./node_modules/.bin/protoc-gen-ts_proto" \
--proto_path=$GOPATH/src \
--ts_proto_out=packages/nakama-js-protobuf \
--ts_proto_opt=snakeToCamel=false \
--ts_proto_opt=useOptionals=true \
--ts_proto_opt=oneof=unions \
$GOPATH/src/github.com/heroiclabs/nakama-common/api/api.proto \
$GOPATH/src/github.com/heroiclabs/nakama-common/rtapi/realtime.proto
```

### Release Process

To release onto NPM if you have access to the "@heroiclabs" organization you can use Yarn.

```shell
yarn workspace <workspace> run build && yarn workspace <workspace> publish --access=public
```

### License

This project is licensed under the [Apache-2 License](https://github.com/heroiclabs/nakama-js/blob/master/LICENSE).
