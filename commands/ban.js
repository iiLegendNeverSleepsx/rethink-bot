const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, client, response, args) => {
    if(!response.member.hasPermission("BAN_MEMBERS") && !response.member.hasPermission("ADMINISTRATOR"))
      return response.reply("Insufficent permissions! You need to have the `BAN_MEMBERS` permission!");
    
    let member = response.mentions.members.first() || response.guild.members.get(args[0]);
    if(!member)
      return response.reply("Please mention a valid member of this server!");
    if(!member.kickable) 
      return response.reply("I cannot ban this user! Do they have a higher role? **Do I have ban permissions**?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => response.channel.send(`\nSorry ${response.author}, I couldn't ban because of: ${error}`));
    response.reply(`${member.user.tag} has been banned by ${response.author.tag} because: ${reason}`);
	require('../resources/embed.js').log("BAN: " + member.tag, "Banned by " + response.author.tag + " because '**" + reason + "**'.", response);
}

module.exports.help = {
	name: "ban",
	usage: "ban <user> [reason]",
	description: "nil",
	longdes: "Bans the user given.",
	mentionedperm: "BAN_MEMBERS",
  category: "Moderation"
}
