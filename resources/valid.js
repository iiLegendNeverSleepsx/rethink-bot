const Discord = require('discord.js');

exports.user = function(client, response, args) {
   let returned;
   if (response.mentions.members.first()) {returned = ['found', response.mentions.members.first()]} else
   if (response.guild.members.get(args[0])) {returned = ['found', response.guild.members.get(args[0])]} else
   {
     const members = response.guild.members.array();
     const matches = members.filter(m => m.user.name.includes(args.join(" ")));
     if (matches.length === 1) returned = ['found', matches[0]];
     if (matches.length === 0) returned = "none";
     if (matches.length >= 2) returned = ['multi', matches];
   }
}

exports.listMulti = function(arr, type) {
   const embed = new Discord.RichEmbed()
   .setTitle(`${arr.length} ${type}s found:`)
   .setDescription(arr.join(",\n"))
   .setFooter("Please run the command again with a more specific term.");
   return embed
}
