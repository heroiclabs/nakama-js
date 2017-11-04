Nakama JS
=========

> JavaScript client for Nakama server. For Browser, NodeJS and React Native.

Nakama is an [open-source](https://github.com/heroiclabs/nakama) distributed server for social and realtime games and apps. For more information have a look at the [documentation](https://heroiclabs.com/docs/).

This client implements the protocol and all features available in the server. It is compatible with modern browsers (supporting ES5), NodeJS environments and React Native.

If you encounter any issues with the server you can generate diagnostics for us with the [doctor](https://heroiclabs.com/docs/install-server-cli/#doctor) subcommand. Send these to support@heroiclabs.com or [open an issue](https://github.com/heroiclabs/nakama/issues). If you experience any issues with the client, it can be useful to [enable trace](https://heroiclabs.com/docs/javascript-client-guide/#logs-and-errors) to produce detailed logs and [open an issue](https://github.com/heroiclabs/nakama-js/issues).

## Usage

If you are using NPM to manage your dependecies, simply add the following to your `package.json`:
```json
//...
"dependencies": {
  "nakama-js": "^0.1.0"
}
//...
```

If you are using Bower, add the following to your `bower.json`:
```json
//...
"dependencies": {
  "nakama-js": "^0.1.0"
}
//...
```

We have a guide which covers how to use the client with lots of code examples:

https://heroiclabs.com/docs/javascript-client-guide/

To create a client which can connect to the Nakama server with the default settings.

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
$> npm run dev
```

## Production builds

```shell
$> npm run build
```
