# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Now using Replit's database (`@replit/database`) instead of the original `keyv` database

### Added

- `@replit/database` dependency

### Removed

- `keyv` and `@keyv/sqlite` dependencies
- Deleted `data/` and `data/data.sqlite`

### Planned

- [x] Change to Replit database
- [ ] Change `.env` to just webhook url, extract id and token in code
- [ ] Reformat this file
- [ ] Maybe check if database is empty and don't post to Discord on initial fill?

## [1.1.0] (2021-06-19)

### Added

- `CHANGELOG.md`
  - New file: Log of changes made in my version of the project
- `index.js`
  - Now shows incident ID in embed footer

### Changed

- `README.md`
  - My Changes section now prompts to check this file

### Fixed

- `README.md`
  - Corrected instructions on initial run: incidents will not be saved if it fails to send the message

## [1.0.0] (2021-06-05)

### All changes from base repo

The original repo provided the code in TypeScript and required the user to complie it to JavaScript to run it. I complied it on my computer and copy-pasted the resulting `.js` files into Replit. I had to make a few additional changes to let it run:

- `index.js`
  - Added a simple script to start a web server which can be pinged with [UptimeRobot](http://uptimerobot.com/) so Replit doesn't kill the process (this isn't needed if you have the Hacker plan and set this Repl to Always On)
  - Added `void` in front of `setTimeout`. This simply removes an extra console output.
  - Removed SQLite data file and replaced with Replit database
- `.replit`
  - The Replit config file, added by me so this can be run on Replit
- `.gitignore`
  - Cleared out some unnecessary enteries
- `README.md`
  - The original project didn't have a README, so I made one.

[Unreleased]: https://github.com/WeirdAlex03/discord-status-webhook/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/WeirdAlex03/discord-status-webhook/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/WeirdAlex03/discord-status-webhook/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/WeirdAlex03/discord-status-webhook/compare/v0.0.0...v1.0.0
