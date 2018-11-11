const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  message = response;
  if (!args[2]) return response.reply("Usage: `+setstatus (status: online, idle, invisible, dnd) (type: playing, listening, watching) (description)`");
		bot.user.client.user.setPresence({ game: { type: args[1].toUpperCase(), name: args.splice(2, args.length).join(" ") }, status: args[0].toLowerCase() }).then(() => {
			message.reply(":white_check_mark: All set!").catch(() => bot.safeSend(message, module.exports.help.name));
		}).catch(() => {
			message.reply(":x: Couldn't change the status!").catch(() => bot.safeSend(message, module.exports.help.name));
		});
}

module.exports.help = {
  name: "setstatus",
  usage: "setstatus (status: online, idle, invisible, dnd) (type: playing, listening, watching) (description)",
  description: "nil",
  longdes: "Set the bot's status.",
  mentionedperm: "DEV",
  category: "DEV"
}
