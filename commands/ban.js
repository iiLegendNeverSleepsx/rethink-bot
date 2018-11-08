const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, client, response, args) => {
    if(!response.member.hasPermission("BAN_MEMBERS") && !response.member.hasPermission("ADMINISTRATOR"))
      return response.reply("Insufficent permissions! You need to have the `BAN_MEMBERS` permission!");
    
    let member;
    let memberf = require('../resources/valid.js').user(client, response, args);
    if (memberf[0] = 'multi') {
	    const embed = require('../resources/valid.js').embed(memberf[1])
	    response.channel.send({embed});
	    return;
    } else {member = memberf[1]}
	
    if(!member.kickable) 
      return response.reply("I cannot ban this user! Do they have a higher role? **Do I have ban permissions**?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    //await member.ban(reason)
    //  .catch(error => response.channel.send(`\nSorry ${response.author}, I couldn't ban because of: ${error}`));
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
