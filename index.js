//Adds webserver for UptimeRobot to ping so Replit keeps this running
var http = require('http');
http.createServer(function (req, res) {
  res.write("Webhook is active");
  res.end();
}).listen(8080);

"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
const tslib = require("tslib");
const discord_js = require("discord.js");
const node_fetch = tslib.__importDefault(require("node-fetch"));
const luxon = require("luxon");
const keyv = tslib.__importDefault(require("keyv"));
const constants = require("./constants");
const logger = require("./logger");
const incidentData = new keyv.default(`sqlite://data/data.sqlite`);
const hook = new discord_js.WebhookClient(process.env.DISCORD_WEBHOOK_ID, process.env.DISCORD_WEBHOOK_TOKEN);
logger.logger.info(`Starting with ${hook.id}`);
function embedFromIncident(incident) {
    const incidentDT = luxon.DateTime.fromISO(incident.started_at);
    const color = incident.status === 'resolved' || incident.status === 'postmortem'
        ? constants.EMBED_COLOR_GREEN
        : incident.impact === 'critical'
            ? constants.EMBED_COLOR_RED
            : incident.impact === 'major'
                ? constants.EMBED_COLOR_ORANGE
                : incident.impact === 'minor'
                    ? constants.EMBED_COLOR_YELLOW
                    : constants.EMBED_COLOR_BLACK;
    const affectedNames = incident.components.map((c) => c.name);
    const embed = new discord_js.MessageEmbed()
        .setColor(color)
        .setTimestamp(new Date(incident.started_at))
        .setURL(incident.shortlink)
        .setTitle(incident.name)
		.setFooter(`Incident ${incident.id}`);
    for (const update of incident.incident_updates.reverse()) {
        const updateDT = luxon.DateTime.fromISO(update.created_at);
        const timeString = updateDT.hasSame(incidentDT, 'day')
            ? updateDT.toUTC().toFormat('HH:mm ZZZZ')
            : updateDT.toUTC().toFormat('yyyy/LL/dd HH:mm ZZZZ');
        embed.addField(`${update.status.charAt(0).toUpperCase()}${update.status.slice(1)} (${timeString})`, update.body);
    }
    const descriptionParts = [`• Impact: ${incident.impact}`];
    if (affectedNames.length) {
        descriptionParts.push(`• Affected Components: ${affectedNames.join(', ')}`);
    }
    embed.setDescription(descriptionParts.join('\n'));
    return embed;
}
async function updateIncident(incident, messageID) {
    const embed = embedFromIncident(incident);
    try {
        const message = await (messageID ? hook.editMessage(messageID, embed) : hook.send(embed));
        await incidentData.set(incident.id, {
            incidentID: incident.id,
            lastUpdate: luxon.DateTime.now().toISO(),
            messageID: message.id,
            resolved: incident.status === 'resolved' || incident.status === 'postmortem',
        });
    }
    catch (error) {
        if (messageID) {
            logger.logger.error(`error during hook update on incident ${incident.id} message: ${messageID}\n`, error);
            return;
        }
        logger.logger.error(`error during hook sending on incident ${incident.id}\n`, error);
    }
}
async function check() {
    var _a;
    logger.logger.log('heartbeat', `❤`);
    try {
        const json = (await node_fetch.default(`${constants.API_BASE}/incidents.json`).then((r) => r.json()));
        const { incidents } = json;
        for (const incident of incidents.reverse()) {
            const data = await incidentData.get(incident.id);
            if (!data) {
                logger.logger.log('new', `new incident: ${incident.id}`);
                void updateIncident(incident);
                continue;
            }
            const incidentUpdate = luxon.DateTime.fromISO((_a = incident.updated_at) !== null && _a !== void 0 ? _a : incident.created_at);
            if (luxon.DateTime.fromISO(data.lastUpdate) < incidentUpdate) {
                logger.logger.log('update', `update incident: ${incident.id}`);
                void updateIncident(incident, data.messageID);
            }
        }
    }
    catch (error) {
        logger.logger.error(`error during fetch and update routine:\n`, error);
    }
}
void check();
void setInterval(() => void check(), 60000 * 5);
//# sourceMappingURL=index.js.map