const discord = require('discord.js');

function colorString(color) {
  let newcolor = color;
  if (color === "error") newcolor = "#ff0000";
  if (color === "success") newcolor = "#6dff4c";
  return newcolor;
}

exports.embedInChannel = function (title, message, color, response) {
  color = colorString(color);
  const embed = new discord.RichEmbed()
  .setTitle(title)
  .setDescription(message)
  .setColor(color)
  
  response.channel.send({embed})
}

exports.embedToUser = function (title, message, color, response) {
  color = colorString(color);
  const embed = new discord.RichEmbed()
  .setTitle(title)
  .setDescription(message)
  .setColor(color)
  
  response.author.send({embed})
}

exports.log = function (title, message, response) {
  const embed = new discord.RichEmbed()
  .setTitle(title)
  .setDescription(message)
  .setColor("#ffd400")
  
  response.guild.channels.find("name", "logs").send({embed})
}

exports.mlog = function (title, message, response) {
  const embed = new discord.RichEmbed()
  .setTitle(title)
  .setDescription(message)
  .setColor("#ff0000")
  
  response.guild.channels.find("name", "message-logs").send({embed})
}
