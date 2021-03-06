const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  const loading = client.emojis.find(emoji => emoji.name === "loading");
  const m = await response.channel.send(`${loading} Pinging...`);
  const times = m.createdTimestamp - response.createdTimestamp;
  const ping = client.ping
  
  const embed = new Discord.RichEmbed()
  .setDescription("Pinged!")
  .addField("Response Time", `${times} milliseconds`)
  .addField("Ping", `${Math.round(ping)} milliseconds`)
  .setColor("#ff0000")
  
  m.edit({embed})
}

module.exports.help = {
  name: "ping",
  usage: "ping",
  description: "nil",
  longdes: "Ping the bot.",
  mentionedperm: "none",
  category: "Utility"
}
