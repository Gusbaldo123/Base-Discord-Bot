module.exports = {
    EventListener: function (Discord, DisCom, config, Canvas) {
        const command = require("./Main");
        const events = { MESSAGE_REACTION_ADD: 'messageReactionAdd', MESSAGE_REACTION_REMOVE: 'messageReactionRemove' };

        const getDefaultChannel = (guild) => {
            if (guild.channels.has(guild.id))
                return guild.channels.get(guild.id)


            const generalChannel = guild.channels.find(channel => channel.name === "general");
            if (generalChannel)
                return generalChannel;

            return guild.channels
                .filter(c => c.type === "text" &&
                    c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
                .sort((a, b) => a.position - b.position ||
                    Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
                .first();
        }

        var standard_input = process.stdin;
        standard_input.setEncoding('utf-8');
        standard_input.on('data', function (data) {
            let msg = data.substring(0, data.length - 2);
        });

        Discord.on('ready', async () => {
            var channel = Discord.channels.find("name", config.Discord.Channels.General);
            var msg = "Estou on";

            await channel.send(attachment);
            channel.send(msg);
            channel.send(attachment);
        });
        Discord.on('message', msg => {
            if (msg.author.bot || msg.content.length <= 0) return;
            command.commands(msg, config);
        });
        Discord.on('guildMemberAdd', member => {
            var channel = member.guild.channels.find("name", config.Discord.Channels.General);
            if (!channel) return;

            var noob = Discord.guilds.get(member.guild.id).roles.find(Role => Role.name == config.Discord.Roles.Member);
            member.addRole(noob);
            channel.send(`Bem vindo(a) ${member} :D`);
        });
        Discord.on("guildCreate", guild => {
            var channel = member.guild.channels.find("name", config.Discord.Channels.General);
            channel.send("Entrei em " + guild.name + " :D");
        })
        Discord.on("guildDelete", guild => {
            var channel = member.guild.channels.find("name", config.Discord.Channels.General);
            channel.send("Adeus " + guild.name + " :(");
        })
        Discord.on('raw', async event => {
            if (!events.hasOwnProperty(event.t)) return;

            const { d: data } = event;
            const user = Discord.users.get(data.user_id);
            const channel = Discord.channels.find("name", config.Discord.Channels.Register) || await user.createDM();

            const message = await channel.fetchMessage(data.message_id);
            const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
            const reaction = message.reactions.get(emojiKey);

            Discord.emit(events[event.t], reaction, user);
        });
        Discord.on('messageReactionAdd', (reaction, user) => {
            var ch = reaction.message.guild.channels.find("name", config.Discord.Channels.Register);
            ch.fetchMessages({ limit: 1 }).then(messages => {
                let lastMessage = messages.first();

                if (!(lastMessage.author.bot) && (reaction.message.id == lastMessage.id)) {
                    var emojilist = config.Discord.Roles.Reaction_Roles;

                    var emojilistval = Object.values(emojilist);
                    var emojilistkey = Object.keys(emojilist);

                    var emoji = reaction.emoji.name;
                    var emojiid = reaction.emoji.id;

                    for (let i = 0; i < emojilistval.length; i++) {
                        if (emoji == emojilistval[i]) {
                            var role = reaction.message.guild.roles.find(role => role.name == emojilistkey[i]);
                            var member = reaction.message.guild.members.get(user.id);
                            var noob = reaction.message.guild.roles.find(Role => Role.name == config.Discord.Roles.Member);
                            member.addRole(noob);
                            return member.addRole(role);
                        }
                    }
                }
            })
                .catch(console.error);
        });
        Discord.on('messageReactionRemove', (reaction, user) => {
            var ch = reaction.message.guild.channels.find("name", config.Discord.Channels.Register);
            ch.fetchMessages({ limit: 1 }).then(messages => {
                let lastMessage = messages.first();

                if (!(lastMessage.author.bot) && (reaction.message.id == lastMessage.id)) {
                    var emojilist = botconfig.Discord.Roles.Reaction_Roles;

                    var emojilistval = Object.values(emojilist);
                    var emojilistkey = Object.keys(emojilist);

                    var emoji = reaction.emoji.name;
                    var emojiid = reaction.emoji.id;

                    for (let i = 0; i < emojilistval.length; i++) {
                        if (emoji == emojilistval[i]) {
                            var role = reaction.message.guild.roles.find(role => role.name == emojilistkey[i]);
                            var member = reaction.message.guild.members.get(user.id);

                            return member.removeRole(role, null);
                        }
                    }
                }
            })
                .catch(console.error);
        });
    }
}