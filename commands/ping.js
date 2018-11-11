const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  const loading = client.emojis.find(emoji => emoji.name === "loading");
  const m = await response.channel.send(`${loading} Pinging...`);
  
  const embed = new Discord.RichEmbed()
  .setDescription("Pinged!")
  .addField("Response Time", `${m.createdTimestamp - response.createdTimestamp * 1000} seconds`)
  .addField("Ping", Math.round(`${client.ping * 1000} seconds`))
  .setColor("#ff0000")
  
  response.reply({embed})
}

module.exports.help = {
  name: "ping",
  usage: "ping",
  description: "nil",
  longdes: "Ping the bot.",
  mentionedperm: "none",
  category: "Utility"
}
