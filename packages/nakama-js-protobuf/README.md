Nakama JavaScript Protobuf adapter
========================

> Websocket adapter adding protocol buffer support to the [nakama-js](https://www.npmjs.com/package/@heroiclabs/nakama-js) client.

[Nakama](https://github.com/heroiclabs/nakama) is an open-source server designed to power modern games and apps. Features include user accounts, chat, social, matchmaker, realtime multiplayer, and much [more](https://heroiclabs.com).


## Getting Started

1. Import the adapter into your project:

    ```shell
    yarn add "@heroiclabs/nakama-js-protobuf"
    ```

2. Pass the Protobuf adapter alongside your connection credentials to build the client object.

    ```js
    // <script src="path/to/nakama-js.iife.js"></script>
    // <script src="path/to/nakama-js-protobuf.iife.js"></script>

    var useSSL = false; // Enable if server is run with an SSL certificate.
    var client = new nakamajs.Client("defaultkey", "127.0.0.1", 7350, useSSL, new nakamajsprotobuf.WebSocketAdapterPb());
    ```

3. Create and use the WebSocket:

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

### License

This project is licensed under the [Apache-2 License](https://github.com/heroiclabs/nakama-js/blob/master/LICENSE).
