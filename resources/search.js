const Discord = require('discord.js');

exports.guildMember = function (term, response) {
  if (!response) return undefined;
  const members = response.guild.members.array()
  const matches = members.filter(member => member.user.username.includes(term))
  
  if (matches.length === 0) return "null";
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) return matches;
}
