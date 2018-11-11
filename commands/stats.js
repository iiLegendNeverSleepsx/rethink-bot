const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Statistics")
  .setDescription("**ReThink** is a public bot for different needed for everyone!")
  .addField("Developer", client.users.get('258706134850863106').tag)
  .addField("Other Owners", client.users.get('306287412437450753').tag + ", " + client.users.get('193979517470113792').tag)
  .addField("Version", require('../package.json').version)
  .addField("Options", "~~Invite~~ (DISABLED) - [Support](https://discord.gg/gRTg6KE)
  
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
