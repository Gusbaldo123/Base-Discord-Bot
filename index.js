const config = require('./commands/config');
const events = require('./commands/Disc_Events');

const Canvas = require('canvas');

const DisCom = require('discord.js');
const Discord = new DisCom.Client();
Discord.login(config.Discord.Token);

events.EventListener(Discord,DisCom, config, Canvas);