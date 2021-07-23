# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Deprecated

- Separate ID and Token environment varibles have been depreciated in favor of a single URL varbile.
  - Please paste the full Webhook URL copied from Discord into the environment varible `DISCORD_WEBHOOK_URL`

### Changed

- Now using Replit's database (`@replit/database`) instead of the original `keyv` database
- Now using Discord's new timestamp feature ([copied from upstream](https://github.com/almostSouji/discord-status-webhook/commit/e853ef1ba097d81b4be8491568541ffcb893d4ab))

### Added

- `@replit/database` dependency
- Now checks if the database is empty when started and, if so, fills the database without posting to the webhook to prevent a spam of 50 messages

### Removed

- `keyv` and `@keyv/sqlite` dependencies
- `data/data.sqlite`, as that is no longer needed with Replit's database
- `interfaces/StatusPage.js`, because I don't think that did anything to begin with

### Planned

- [x] Change to Replit database
- [x] Change `.env` to just webhook url, extract id and token in code
- [ ] Reformat this file
- [x] Maybe check if database is empty and don't post to Discord on initial fill?

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
