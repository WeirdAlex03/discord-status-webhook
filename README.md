# Discord Status Webhook

[![Run on Repl.it](https://repl.it/badge/github/weirdalex03/discord-status-webhook)](https://repl.it/github/weirdalex03/discord-status-webhook)

Sends Discord status updates from [discordstatus.com](https://discordstatus.com/) to your server through a webhook.

## Usage

To use this with your own server, follow these steps:

1. Fork this project. If you are making a copy without forking from Replit (ie importing from GitHub), make sure you set this as a **Bash** repl, not a Node.js repl. As of 2021-06-04, Bash repls have Node.js v14, but the actual Node.js repl is still on v12.
2. In the Shell tab, run `npm i` to install all needed packages.
3. [Make a new webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) in the Discord channel of your choice and copy the URL. The first run will push the entire backlog, so you may want to set it to another channel at first and move it later.
4. In the Secrets tab, add the environment varibles `DISCORD_WEBHOOK_ID` and `DISCORD_WEBHOOK_TOKEN` and fill in the information from the webhook URL in the format `https://discord.com/api/webhooks/[ID]/[TOKEN]`.
5. Click the Run button to start, this time to keep it on.
6. If you don't want Replit to kill the process and you don't have the Hacker plan, use a service like [UptimeRobot](http://uptimerobot.com/) to ping the webserver at least once an hour.

## Source

This project is derived from the JS complication of [almostSouji/discord-status-webhook](https://github.com/almostSouji/discord-status-webhook), with changes to run on Replit

### My changes

Please see [`CHANGELOG.md`](CHANGELOG.md) for an overview of changes
