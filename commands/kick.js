const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  if (!response.member.hasPermission("KICK_MEMBERS")) return response.reply("you don't have one of the required permissions to run this command: \n `-` ADMINISTRATOR \n `-` KICK_MEMBERS");
  if (response.mentions.members.first() || response.guild.members.get(args[0])) {
    let user = response.mentions.members.first() || response.guild.members.get(args[0]);
    if (user.member.hasPermission("KICK_MEMBERS")) return message.reply("that user can not be kicked!");
    if (user.managable) {
      args.shift();
      user.kick(args.join(" "))
    }
  } else if (require('../resources/search.js').guildMember(args[0], response) !== undefined) {
    let thing = require('../resources/search.js').guildMember(args[0], response)
    if (isArray(thing)) {
      const embed = new Discord.RichEmbed()
      .setTitle(`${thing.length} users found:`)
      .setDescription(thing.join(",\n")
      .setFooter("Please run the command again with a more specific term.")
      
      response.channel.send({embed})
    } else if (typeof thing === 'undefined') {
    } else if (thing === null) {
    } else {
      let user = thing;
      if (user.member.hasPermission("KICK_MEMBERS")) return message.reply("that user can not be kicked!");
      if (user.managable) {
        args.shift()
        user.kick(args.join(" "));
      } else {message.reply("I can not kick that user! Do I have the permission to kick members? Is the user's highest role not higher than mine?")}
    }
}

module.exports.help = {
  name: "kick",
  usage: "kick <user> [reason]",
  description: "nil",
  longdes: "Kicks a user with a reason.",
  mentionedperm: "KICK_MEMBERS",
  category: "Moderation"
}
