const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  //if () {
	  let channel = args.join(" ");
	  if (!channel) return response.reply("please say a role to view.");
    const channels = response.guild.channels.array();
    const matches = channels.filter(channel => channel.name.toLowerCase().includes(args.join(" ").toLowerCase())) 
          channel = matches[0];
	  if (matches.length === 1) {
		  const embed = new Discord.RichEmbed()
      .setTitle(channel.name + "'s Info")
      .addField("Created", channel.createdAt)
      .addField("ID", channel.id)
      .addField("Position", channel.position)
      .addField("Category", channel.parent.name + "(" + channel.parent.id + ")")
      .setColor("#ff0000")
      
      response.channel.send({embed})
      } else {
    if (matches.length === 0) response.reply("no channels were found with your query.");
    if (matches.length >= 2) {
      const arr = matches.join(",\n");
      const embed = new Discord.RichEmbed()
      .setTitle(`${matches.length} channels were found:`)
      .setDescription(arr)
      .setFooter("Please run the command again with a more specific term.")
      
      response.channel.send({embed})
	 }
}
	 // } else {response.reply("you are not allowed to run that command!");}
}

module.exports.help = {
  name: "channelinfo",
  usage: "channelinfo <role>",
  description: "nil",
  longdes: "View a channel's info.",
  mentionedperm: "none",
  category: "Moderation"
}
