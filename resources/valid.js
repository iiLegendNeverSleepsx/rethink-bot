const discord = require('discord.js');

exports.user = function(client, response, args) {
   let returned;
   if (response.mentions.members.first()) {returned = ['found', response.mentions.members.first()]} else
   if (response.guild.members.get(args[0])) {returned = ['found', response.guild.members.get(args[0])]} else
   {
     const members = response.guild.members.array();
     const matches = members.filter(m => m.name.includes(args.join(" "));
     if (matches.length === 1) returned = ['found', matches[0]];
     if (matches.length === 0) returned = "none";
     if (matches.length >= 2) returned = ['multi', matches];
   }
}
