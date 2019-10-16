# Change Log
All notable changes to this project are documented below.

The format is based on [keep a changelog](http://keepachangelog.com/) and this project uses [semantic versioning](http://semver.org/).

## [Unreleased]
### Added
- Support for Tournaments.
- Added session interface
- Implemented interface in Session class
- Made session constructor public for unit test mocking

### Changed
- Simplified the way callback IDs are generated. (Thanks @dimon4eg).
- Small improvements to TypeScript typings. (Thanks @Blaizer).
- Updated minimum TypeScript language to 3.5 version. (Thanks @Blaizer).

### Fixed
- Typo fix in Match interface to use Presences.
- Add missing MatchmakerUser typescript interface definition.
- Authentication functions no longer check for session tokens.

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
