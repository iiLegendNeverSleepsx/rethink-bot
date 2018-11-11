const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Statistics")
  .setDescription("**ReThink** needs a new description.")
  .addField("Developer", client.users.get('258706134850863106').tag, true)
  .addField("Other Owners", client.users.get('306287412437450753').tag + ", " + client.users.get('193979517470113792').tag, true)
  .addField("Version", require('../package.json').version, true)
  .addField("Servers", client.guilds.size, true)
  .addField("Users", client.users.size, true)
  .addField("Options", "~~Invite~~ (DISABLED) - [Support](https://discord.gg/gRTg6KE)");
  
  response.channel.send({embed})
}

module.exports.help = {
  name: "stats",
  usage: "stats",
  description: "nil",
  longdes: "Get statistics about the bot.",
  mentionedperm: "none",
  category: "Utility"
}
