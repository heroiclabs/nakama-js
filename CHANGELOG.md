# Change Log
All notable changes to this project are documented below.

The format is based on [keep a changelog](http://keepachangelog.com/) and this project uses [semantic versioning](http://semver.org/).

### Unreleased

### [2.6.0]

### Added

- The socket will now automatically heartbeat with the server from within `nakama-js`. If the server doesn't reply after a heartbeat timeout has elapsed, `ondisconnect` will be called. This should resolve issues with the socket detecting lack of internet connectivity in Chrome. You can configure the heartbeat tiemout with `setHeartbeatTimeoutMs(ms : number) : void`.

- You can now pass a `connectTimeoutMs` to the socket `connect` call in order to set a connect timeout.
- You can now pass a `sendTimeoutMs` to the socket constructor to detect timeouts for socket calls that expect a response.

The connect, send, and heartbeat timeouts are set to sensible default values.

### [2.5.3]

### Fixed
- Nakama and Satori ESM module files now correctly end in the `.mjs` extension.

### [2.5.1]

### Added
- Added [Satori](https://heroiclabs.com/docs/satori) client package (`satori-js`)

### Changed
- Remove Yarn in favour of NPM and updates dependencies to support Node 18 LTS

### [2.4.1]

### Fixed
- This release is a republish of 2.4.0 but with the `cjs` distribution provided.

### [2.4.0]

### Added
- Added more details comments and documentation on objects and methods.

### Changed
- Changed data structure used to pass session variables to authentication methods. The old structure used was a `Map<string, string>`. We now use the `Record<string, string>` for serialization support.
- Changed `StreamData.stream_presence` to `StreamData.sender`. This field should be populated correctly now.
- Changed `MatchData.presences` to a singular `MatchData.presence`. This presence represents the sender. This field should be populated correctly now.
- Match and party data payloads are now serialized as protobuf when using the protobuf adapter.
    - Because of this change, `sendMatchState` and `sendPartyData` can now receive bytes as input. If bytes are sent using the default text adapter, they are base64 encoded to a string.
       - These functions can no longer receive data payloads of type `any`. Any object previously passed in must be serialized to a string or bytes. This change is enforced at compile time.
    - Also due to this change, `MatchData` and `PartyData` have their `data` fields typed as a `Uint8Array`. This breaks
    backwards compatibility. Users who send a string as their match or party data will need to use a utility such as `TextDecoder` to deserialize the string. This change is enforced at compile time.

### Fixed
- Fixed an issue with our base64 dependency in React Native.

### [2.3.0]

### Fixed
- Fixed 401 Unauthorized Responses from the server in response to `rpcHttpKey`.

### Changed
- Changed parameter list optionals and sequencing in `rpcHttpKey`.
    - The signature is now listed as follows: `rpcHttpKey(httpKey: string, id: string, input?: object);`

- Renamed `ApiOverrideOperator` to `ApiOperator`.
- Query params are now formatted with snake case rather than camel case internally by client.

### [2.2.0]

### Added
- Added purchase validation for Apple, Google and Huawei.
- Added an `ApiOverrideOperator` to leaderboard writes.
- Added ability to logout of a session with `sessionLogout`.
- Added realtime party support.
- Added ability to import steam friends through `importSteamFriends`.

### Changed
- Removes the deprecated generalist `socket.Send` function for sending data. Use the other exported Socket methods
such as `socket.addMatchmaker` for better type checking.
- Changed the return type from `socket.addMatchmaker` to a `MatchmakerTicket` rather than a `MatchmakerMatched`.
- Changed signature of `authenticateSteam` and `linkSteam` to allow for a `sync` option.
- Upgraded ts-proto dependency and shipped type definitions with the protobuf adapter.
- Sessions that are close to expiration will now be automatically refreshed. You can configure this behavior
via the `autoRefreshSession` parameter in the `Client` constructor and the `expiredTimespanMs` expiration buffer value on the client.
- Removed `session` parameter from `rpcGet` and renamed it to `rpcHttpKey`. This function should be used with an http key rather than a session.

### Fixed
- 401 Unauthorized errors while renewing sessions.

### [2.1.7]
### Fixed
- Fixed cacheable cursor parsing in `ChannelMessageList`.

### [2.1.6]
### Added
- Added a cachable cursor to `ChannelMessageList`.

### [2.1.5]
### Fixed
- Fixed issue where rollup.js was not bundling in js-base64 library to UMD distribution.

### [2.1.4]

### Added
- Added React Native integration example to packages/ folder. The example builds
for iOS and Android.
- More tests for group chat, social profile ids.

### Fixed
- Fixed base64 imports for React Native
- Rollup not finding tslib due to Yarn workspace inconsistency.
- Authenticate methods now properly accept "create" and "username" parameters for email, Gamecenter, device, and Steam methods.

### Changed
- Base64 library to base64-js (for Typescript support.)

## [2.1.3]
### Added
- Added Webpack and Create React App integration examples to packages/ folder.

### Changed
- Canonical import examples no longer reference a single exported object.
- Moved tests to their own workspace and upgraded Jest dependencies.

### Fixed
- Fixed browser imports by removing the browser IIFE distribution entry in package.json.
The IIFE distribution is still available in the repository but is no longer chosen as an option
by bundlers following conventional package.json load entries.

## [2.1.2]
### Fixed
- Paths to distribution files in package.json

## [2.1.1]
### Added
- Support for Session Vars.
- Added interface for Session object.
- Support for Tournaments.
- Support for events.
- Update to support features through Nakama 2.14.0
- Implemented base64 encoder and decoder for unicode characters
- Added support for protocol buffer payloads via Web Sockets.
- Added support for Facebook Instant Game Authentication.
- Added support for Apple authentication.

### Changed
- Simplified the way callback IDs are generated. (Thanks @dimon4eg).
- Small improvements to TypeScript typings. (Thanks @Blaizer).
- Updated minimum TypeScript language to 3.5 version. (Thanks @Blaizer).
- Migrated test suite to Typescript
- Migrated build system to esbuild
- Update rollup.js which is still used for Cocos support.
- Updated Yarn version to 2.0
- Signatures for all Client.ts methods have been flattened to take primitives rather than composite objects.

### Fixed
- Typo fix in Match interface to use Presences.
- Add missing MatchmakerUser typescript interface definition.
- Authentication functions no longer check for session tokens.
- Fix for Cocos Creator support that allows the setting of XmlHttpRequest.withCredentials to be bypassed if the property does not have a setter.
- Internal type-checking for the generated client methods.

## [2.0.1] - 2018-05-19
### Added
- Authenticate functions for Steam and Game Center.

### Fixed
- Usernames can be passed into account create with register.

## [2.0.0] - 2018-05-14
### Added
- New browser headless test suite with Puppeteer.

### Changed
- All source code now written in TypeScript.
- Rewrite client and socket model for Nakama 2.0.

---

## [0.4.0] - 2018-02-02
### Changed
- Re-structure project for wider browser compatibility.
- Use a polyfill for window.fetch support.

### Fixed
- Fix bug in MatchDataSendRequest message.

## [0.3.0] - 2017-11-27
### Added
- Add support for Leaderboards.

## [0.2.0] - 2017-11-24
### Added
- Matchmaking and multiplayer support.

### Changed
- Build system now bundles a Base64 codec.

### Fixed
- Use Base64 library to enhance React Native compatibility.

## [0.1.0] - 2017-11-08
### Added
- Initial public release.
