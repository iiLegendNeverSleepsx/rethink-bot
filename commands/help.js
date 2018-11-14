let commands = "";
const Discord = require('discord.js');
const fs = require('fs');
    
    fs.readdir("./commands", (err, files) => {
      if (err) console.log(err);
      let filesa = files.filter(f => f !== "index.js")
      let jsfile = filesa.filter(f => f.split(".").pop() === "js")
      if (jsfile.length <= 0) {
        console.log("Couldn't find any commands!")
        return
      }

      jsfile.forEach((f, i) => {
        let props = require(`./${f}`);
        commands = commands + "`+" + props.help.name + "` - " + props.help.description + "\n";
      });
    });

module.exports.run = async (bot, client, response, args) => {
    if (!args[0]) {
    const embed = new Discord.RichEmbed()
    .setTitle("All Commands")
    .setDescription(commands)
    .setColor("#ff0000")
    .setFooter("Requested by YOU (" + response.author.tag + ")");
    
    response.author.send({embed})
    .then(something => 
        response.reply("Check your direct messages!"))
    .catch(err => 
        response.channel.send({embed}));
    } else {
    if (require(`./${args[0]}`)) {
        const command = require(`./${args[0]}`);
        const embed = new Discore.RichEmbed()
        .setTitle(command.help.name)
        .setColor("#ff0000")
        .addField("Usage", command.help.usage)
        .addField("Required Psrmission", command.help.mentionedperm, true)
        .addField("Category", command.help.category)
        .addField("Description", command.help.longdesc);
        
        response.channel.send({embed});
}


module.exports.help = {
  name: "help",
  usage: "help [command]",
  description: "Views a command or all commands ",
  longdes: "Get information on a single command or view all commands.",
  mentionedperm: "none",
  category: "Utility"
}
