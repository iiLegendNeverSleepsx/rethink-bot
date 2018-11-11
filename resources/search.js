const Discord = require('discord.js');

exports.guildMember = function (term, response) {
  if (!response) return undefined;
  const matches = response.guild.members.filter(member => member.user.username.includes(term))
  
  if (matches.size === 0) return null;
  if (matches.size === 1) return matches.first();
  return Array.from(matches.values());
}
