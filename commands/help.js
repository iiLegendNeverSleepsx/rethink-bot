let commands = "";
const Discord = require('discord.js');
    
    fs.readdir("../commands", (err, files) => {
      if (err) console.log(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js")
      if (jsfile.length <= 0) {
        console.log("Couldn't find any commands!")
        return
      }

      jsfile.forEach((f, i) => {
        let props = require(`./${f}`);
        commands = commands + props.help.name + " - " + props.help.description + "\n";
      });
    });

module.exports.run = async (bot, client, response, args) => {
    
    const embed = new Discord.RichEmbed()
    .setTitle("All Commands")
    .setDescription(commands)
    .setColor("#ff0000")
    .setFooter("Requested by YOU (" + response.author.tag + ")");
    
    response.author.send({embed})
    .then(something => 
        response.reply("Check your direct messages!");
    )
    .catch(err => 
        response.channel.send({embed});
    );
}


module.exports.help = {
  name: "help",
  usage: "help [command]",
  description: "nil",
  longdes: "Get information on a single command or view all commands.",
  mentionedperm: "none",
  category: "Utility"
}
