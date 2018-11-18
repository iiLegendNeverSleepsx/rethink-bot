const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
	if (!response.member.hasPermission("MANAGE_MESSAGES")) return response.reply("it doesn't look like you can use that!");
	let wUser = response.guild.member(response.mentions.users.first()) || response.guild.members.get(args[0]);
	if (!wUser) return response.reply("that member can't be found!");
	if (wUser.hasPermission("MANAGE_MESSAGES") || wUser.hasPermission("ADMINISTRATOR")) return response.reply("cannot warn that user! Check that I have sufficent permissions, or you have permission to warn that user!");
	let reaso = args.shift();
	let reason = args.join(" ");
	if (!reason) {reason = "*No reason specified.*"}
  require('../resources/embed.js').log("Moderation Action - Warn", `**User:** ${wUser.user.tag} \n**Moderator:** ${response.author.tag} \n**Reason:** ${reason}`, response)
	wUser.send(`Hey, I just wanted to tell you that you have been warned in **${response.guild.name}** because of **${reason}**.`);
  response.channel.send(`Okay, ${wUser.user.tag} was warned for ${reason}, ${response.author.username}.`);
}

module.exports.help = {
	name: "warn",
	usage: "warn <user> [reason]",
	description: "Warns a user",
	longdes: "Warns the user given along with a reason.",
	mentionedperm: "MANAGE_MESSAGES",
  category: "Moderation"
}
