Nakama JavaScript client
========================

> JavaScript client for Nakama server written in TypeScript. For browser and React Native projects.

[Nakama](https://github.com/heroiclabs/nakama) is an open-source server designed to power modern games and apps. Features include user accounts, chat, social, matchmaker, realtime multiplayer, and [much more](https://heroiclabs.com).

This client implements the full API and socket options with the server. It's written in TypeScript with minimal dependencies to be compatible with all modern browsers and React Native.

Full documentation is online - https://heroiclabs.com/docs/javascript-client-guide

## Getting Started

You'll need to setup the server and database before you can connect with the client. The simplest way is to use Docker but have a look at the [server documentation](https://github.com/heroiclabs/nakama#getting-started) for other options.

1. Install and run the servers. Follow these [instructions](https://heroiclabs.com/docs/install-docker-quickstart).

2. Import the client into your project. It's available on NPM and can be also be added to a project with Bower or other package managers.

    ```shell
    yarn add "@heroiclabs/nakama-js"
    ```

    You'll now see the code in the "node_modules" folder and package listed in your "package.json".

3. Use the connection credentials to build a client object.

    ```js
    // <script src="path/to/nakama-js.umd.js"></script>
    var client = new nakamajs.Client("defaultkey", "127.0.0.1", 7350);
    client.ssl = false; // enable if server is run with an SSL certificate
    ```

## Usage

The client object has many methods to execute various features in the server and also create sockets to open connections with the server.

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

The client includes lots of builtin APIs for various features of the game server. These can be accessed with the methods which return Promise objects. It is also possible to call RPC functions for custom logic registered with the server as well as with a socket object.

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

const roomname = "mychannel";
const channel = await socket.send({ channel_join: {
    type: 1, // 1 = room, 2 = Direct Message, 3 = Group
    target: roomname,
    persistence: false,
    hidden: false
} });

const message = { "hello": "world" };
socket.send({ channel_message_send: {
    channel_id: channel.channel.id,
    content: message
} });
```

## Contribute

The development roadmap is managed as GitHub issues and pull requests are welcome. If you're interested to enhance the code please open an issue to discuss the changes or drop in and discuss it in the [community chat](https://gitter.im/heroiclabs/nakama).

### Source Builds

The codebase is written in TypeScript with tests in JavaScript and can be built with [Rollup.js](https://rollupjs.org/guide/en). All dependencies are managed with NPM.

```shell
yarn install && yarn build
```

### Run Tests

To run tests you will need to run the server and database. Most tests are written as integration tests which execute against the server. A quick approach we use with our test workflow is to use the Docker compose file described in the [documentation](https://heroiclabs.com/docs/install-docker-quickstart).

```shell
docker-compose -f ./docker-compose.yml up
yarn build && yarn test
```

### Release Process

To release onto NPM if you have access to the "@heroiclabs" organization you can use Yarn.

```shell
yarn run build && yarn publish --access=public
```

### License

This project is licensed under the [Apache-2 License](https://github.com/heroiclabs/nakama-js/blob/master/LICENSE).
