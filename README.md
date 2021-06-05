# Discord Status Webhook

[![Run on Repl.it](https://repl.it/badge/github/weirdalex03/discord-status-webhook)](https://repl.it/github/weirdalex03/discord-status-webhook)

Sends Discord status updates from [discordstatus.com](https://discordstatus.com/) to your server through a webhook.

## Usage

To use this with your own server, follow these steps:

1. Fork this project. If you are making a copy without forking from Replit (ie importing from GitHub), make sure you set this as a **Bash** repl, not a Node.js repl. As of 2021-06-04, Bash repls have Node.js v14, but the actual Node.js repl is still on v12.
2. [Make a new webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) in the Discord channel of your choice and copy the URL
3. In the Secrets tab, add the environment varibles `DISCORD_WEBHOOK_ID` and `DISCORD_WEBHOOK_TOKEN` and fill in the information from the webhook URL in the format `https://discord.com/api/webhooks/[ID]/[TOKEN]`. This is sensitive information, so be careful not to share it with anyone and remember all Replit projects are public by default. Even with everything else public, Replit keeps environment varibles private.
4. Click the Run button.
5. If you don't want Replit to kill the process and you don't have the Hacker plan, use a service like [UptimeRobot](http://uptimerobot.com/) to ping the webserver at least once an hour.

## Source

This project is derived from the JS complication of [almostSouji/discord-status-webhook](https://github.com/almostSouji/discord-status-webhook), with changes to run on Replit

### My changes

The original repo provided the code in TypeScript and required the user to complie it to JavaScript to run it. I complied it on my computer and copy-pasted the resulting `.js` files into Replit. I had to make a few additional changes to let it run:

- [`index.js`](index.js)
  - `1-6`: Added a simple script to start a web server which can be pinged with [UptimeRobot](http://uptimerobot.com/) so Replit doesn't kill the process (this isn't needed if you have the Hacker plan and set this Repl to Always On)
  - `17`: Changed data path for `incidentData`. The compiled JS was initially in the `/dist/` folder but is in root here, so the relative path to `/data/` had to be updated
  - `95`: Added `void` in front of `setTimeout`. This simply removes an extra console output.
- [`.replit`](.replit)
  - The Replit config file, added by me so this can be run on Replit
- [`.gitignore`](.gitignore)
  - Cleared out some unnecessary enteries
