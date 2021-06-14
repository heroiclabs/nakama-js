# Change Log
All notable changes to this project are documented below.

The format is based on [keep a changelog](http://keepachangelog.com/) and this project uses [semantic versioning](http://semver.org/).

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
