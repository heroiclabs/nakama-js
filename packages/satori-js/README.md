Satori JavaScript Client
========================

> JavaScript client for Satori server written in TypeScript. For browser and React Native projects.

This client implements the full API for interacting with Satori server. It's written in TypeScript with minimal dependencies to be compatible with all modern browsers and React Native.

Full documentation is online - https://heroiclabs.com/docs/javascript-client-guide

## Getting Started

You'll need access to an instance of the Satori server before you can connect with the client.

1. Import the client into your project. It's [available on NPM](https://www.npmjs/package/@heroiclabs/satori-js).

  ```shell
  npm install @heroiclabs/satori-js
  ```

You'll now see the code in the "node_modules" folder and package listed in your "package.json".

2. Use the connection credentials to build a client object.

  ```js
  import {Client} from "@heroiclabs/satori-js";

  const useSSL = false;
  const client = new Client("apiKey", "127.0.0.1", 7450, useSSL);
  ```

## Usage

The client object has many method to execute various features in the server.

### Authenticate

To authenticate with the Satori server you must provide an identifier for the user.

```js
const userId = "<UniqueUserId>";

client.authenticate(userId)
  .then(session => {
    _session = session;
    console.info("Authenticated:", session);
  }).catch(error => {
    console.error("Error:", error);
  });
```

### Sessions

When authenticated the server responds with an auth token (JWT) which contains useful properties and gets deserialized into a `Session` object.

```js
console.info(session.token); // raw JWT token
console.info(session.refreshToken); // refresh token
console.info("Session has expired?", session.isexpired(Date.now() / 1000));
const expiresAt = session.expires_at;
console.warn("Session will expire at:", new Date(expiresAt * 1000).toISOString());
```

It is recommended to store the auth token from the session and check at startup if it has expired. If the token has expired you must reauthenticate. The expiry time of the token can be changed as a setting in the server.

```js
// Assume we've stored the auth token in browser Web Storage.
const authtoken = window.localStorage.getItem("satori_authtoken");
const refreshtoken = window.localStorage.getItem("satori_refreshtoken");

let session = satorijs.Session.restore(authtoken, refreshtoken);

// Check whether a session is close to expiry.

const unixTimeInFuture = Date.now() + 8.64e+7; // one day from now

if (session.isexpired(unixTimeInFuture / 1000)) {
    try
    {
        session = await client.sessionRefresh(session);
    }
    catch (e)
    {
        console.info("Session can no longer be refreshed. Must reauthenticate!");
    }
}
```

### Requests

The client includes lots of builtin APIs for various featyures of the Satori server. These can be accessed with the methods which return Promise objects.

Most requests are sent with a session object which authorizes the client.

```js
const flags = await client.getFlags(session);
console.info("Flags:", flags);
```

## Contribute

The development roadmap is managed as GitHub issues and pull requests are welcome. If you're interested in enhancing the code please open an issue to discuss the changes or drop in and discuss it in the [community forum](https://forum.heroiclabs.com).

### Source Builds

Ensure you are using Node v18>.

The codebase is multi-package monorepo written in TypeScript and can be built with [esbuild](https://github.com/evanw/esbuild). All dependencies are managed with Yarn.

To build from source, install dependencies and build the `satori-js` package:

```shell
npm install --workspace=@heroiclabs/satori-js && npm run build --workspace=@heroiclabs/satori-js
```

### Run Tests

To run tests you will need access to an instance of the Satori server.

Tests are run against each workspace bundle; if you have made source code changes, you should `npm run build --workspace=<workspace>` prior to running tests.

```shell
npm run test --workspace=@heroiclabs/satori-js-test
```

### Release Process

To release onto NPM if you have access to the "@heroiclabs" organization you can use NPM.

```shell
npm run build --workspace=<workspace> && npm publish --access=public --workspace=<workspace>
```

### Generate Docs

API docs are generated with typedoc and deployed to GitHub pages.

To run typedoc:

```
npm install && npm run docs
```

### License

This project is licensed under the [Apache-2 License](https://github.com/heroiclabs/nakama-js/blob/master/LICENSE).