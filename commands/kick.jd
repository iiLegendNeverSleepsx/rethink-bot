const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, client, response, args) => {
    if(!response.member.hasPermission("KICK_MEMBERS"))
      return response.reply("Insufficent permissions! You need to have the `KICK_MEMBERS` permission!");
    
    let member = response.mentions.members.first() || response.guild.members.get(args[0]);
    if(!member)
      return response.reply("Please mention a valid member of this server!");
    if(!member.managable) 
      return response.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    const wUser = member;
    
    await member.kick(reason).then(() =>
    require('../resources/embed.js').log("Moderation Action - Kick", `**User:** ${wUser.user.tag} \n**Moderator:** ${response.author.tag} \n**Reason:** ${reason}`, response)
	wUser.send(`Hey, I just wanted to tell you that you have been kicked from **${response.guild.name}** because of **${reason}**.`);
  response.channel.send(`Okay, ${wUser.user.tag} was kicked for ${reason}, ${response.author.username}.`);)
  .catch(error => response.channel.send(`sorry, ${response.author}, I couldn't kick ${member.tag}.`));
}

module.exports.help = {
	name: "kick",
	usage: "kick <user> [reason]",
	description: "Kicks a user",
	longdes: "Kicks the user given.",
	mentionedperm: "KICK_MEMBERS",
  category: "Moderation"
}
