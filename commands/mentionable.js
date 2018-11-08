const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  //if () {
	  let role = args.join(" ");
	  if (!role) return response.reply("please say a role to make mentionable or unmentionable.");
    const roles = response.guild.roles.array();
    const matches = roles.filter(role => role.name.includes(args.join(" "))) 
	  if (matches.length === 1) {
		  if (response.guild.roles.find("name", role).mentionable) {response.guild.roles.find("name", role).setMentionable(false, `Requested by ${response.author.tag}.`).then(() => response.reply(`${role} is no longer mentionable.`)).catch(err => response.channel.send("Oops! Something went wrong while trying to set mentionable of your role. Try doing these steps then try again:  \n `-` Make sure I have the \"Manage Role\" permission. \n `-` Check that the role being edited is not higher than my highest role."));}
		  if (!response.guild.roles.find("name", role).mentionable) {response.guild.roles.find("name", role).setMentionable(true, `Requested by ${response.author.tag}.`).then(() => response.reply(`${role} is now mentionable!`)).catch(err => response.channel.send("Oops! Something went wrong while trying to set mentionable of your role. Try doing these steps then try again:  \n `-` Make sure I have the \"Manage Role\" permission. \n `-` Check that the role being edited is not higher than my highest role."));}
		  } else {
    if (matches.length === 0) response.reply("no roles were found with your query.");
    if (matches.length >= 2) {
      const arr = matches.join(",\n");
      const embed = new Discord.RichEmbed()
      .setTitle(`${matches.length} roles were found:`)
      .setDescription(arr)
      .setFooter("Please run the command again with a more specific term.")
      
      response.channel.send({embed})
	 }
}
	 // } else {response.reply("you are not allowed to run that command!");}
}

module.exports.help = {
  name: "mentionable",
  usage: "mentionable <role>",
  description: "nil",
  longdes: "Sets a role's mentionable option. \n*Note: This is a toggle; use it again to make the role unmentionable again.*",
  mentionedperm: "MENT.list",
  category: "Management"
}
