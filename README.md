Nakama JS
=========

> JavaScript client for Nakama server. For browser and React Native projects.

Nakama is an [open-source](https://github.com/heroiclabs/nakama) distributed server for social and realtime games and apps. For more information have a look at the [documentation](https://heroiclabs.com/docs/).

This client implements the protocol and all features available in the server. It is compatible with modern browsers (supporting ES5) and React Native. If you experience any issues with the client, it can be useful to [enable trace](https://heroiclabs.com/docs/javascript-client-guide/#logs-and-errors) to produce detailed logs and [open an issue](https://github.com/heroiclabs/nakama-js/issues).

## Usage

You can add the client to your project with `yarn add nakama-js`. This will add the dependency to your `package.json`. You can also use NPM or Bower to download and add the dependency to your project.

We have a guide which covers how to use the client with lots of code examples:

https://heroiclabs.com/docs/javascript-client-guide/

To create a client which can connect to the Nakama server in a webpage with UMD imports and default connection settings:

```html
<script src="path/to/dist/nakama-js.umd.js"></script>
```

```js
var client = new nakamajs.Client("defaultkey", "127.0.0.1", 7350);
client.ssl = false;
```

## Contribute

To build the codebase simply run the following to install the dependencies:

```shell
$> yarn install
```

## Development

```shell
$> yarn run dev
```

## Production builds

```shell
$> yarn run build
```

## For releases

```shell
$> yarn run build && yarn publish
```
