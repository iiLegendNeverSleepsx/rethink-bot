const Discord = require('discord.js');

class log {
  let current = {};
  constructor() {current = {}}
  
  setUser(name) {current["user"] = name}
  
  setModerator(name) {current["mod"] = name}
  
  setReason(name) {current["reason"] = name}
  
  setAction(name) {current["action"] = name}
  
  createEmbed() {
    const embed = new Discord.RichEmbed()
    .setTitle(current["action"])
    .setDescription(`**User:** ${current["user"]} \n**Moderator:** ${current["mod"]} \n**Reason:** ${current["reason"]}`)
    .setColor([255, 255, 0])
    
    return embed;
  }
}
