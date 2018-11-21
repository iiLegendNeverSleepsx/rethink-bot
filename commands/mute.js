const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
const search = args[0].replace("<@", "").replace(">", "")
const member = response.guild.members.get(args[0].replace("<@", "").replace(">", ""));
if (!member) return response.reply("not a valid user!");
if (!response.member.hasPermission("MANAGE_MEMBERS")) return response.reply("it doesn't seem like you can use that!");

  if (member.hasPermission("MANAGE_MEMBERS")) return response.reply("it doesn't seem like you can mute that user!");
  
  const loading = client.emojis.find(emoji => emoji.name === "loading");
  
  const embed = new Discord.RichEmbed().setTitle("Muting")
  .setDescription(loading + " Creating Muted role...");
  
  const m = await response.channel.send({embed});
  
  if (!response.guild.roles.find("name","Muted")) {response.guild.createRole({name: "Muted"})}
  
  embed.setDescription(loading + " Forcing mute...");
  
  m.edit({embed});
  
  response.guild.channels.forEach(c => c.overwritePermissions(response.guild.roles.find("name", "Muted"), {'SEND_MESSAGES': false, 'ADD_REACTIONS': false}))
  
  embed.setDescription(loading + "Muting member...")
  
  m.edit({embed});
  
  args.shift(); let reason = args.join(" ");
  
  member.addRole(response.guild.roles.find("name", "Muted"))
  
  member.send(`Hey, I just wanted to tell you that you have been muted in **${response.guild.name}** because of **${reason}**.`);
  
  require('../resources/embed.js').log("Moderation Action - MUTE", `**User:** ${member.tag} \n**Moderator:** ${response.author.tag} \n**Reason:** ${reason}`);
  
  embed.setColor("#0000ff").setDescription("Successfulky muted!");
  
  m.edit({embed});
}

module.exports.help = {
  name: "mute",
  usage: "mute <user> [reason]",
  description: "mute a user from text channels",
  longdes: "soontm",
  mentionedperm: "none",
  category: "Testing"
}
