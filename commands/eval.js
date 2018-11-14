const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
    function clean(text, token) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(new RegExp(token, "gi"), "[ Value Hidden By Internal Source ]");
    } else {
        return text;
    }
  }
	
    try {
      const code = args.join(" ");
      
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      //message.channel.send(clean(evaled), {code:"xl"});
    response.channel.send({embed: {
    color: 3066993,
    description: "\n",
    fields: [{
        name: "Evaled!",
        value: (`\`\`\`js\n${clean(evaled, client.token).substring(0, 500)}\`\`\``)
      },
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.avatarURL,
      text: `Eval ran by ${message.author.tag}`
    }
  }
});
    } catch (err) {
      response.channel.send({embed: {
    color: 15158332,
    description: "\n",
    fields: [{
        name: "Error!",
        value: (`\`\`\`x1\n${clean(err, client.token)}\`\`\``)
      },
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.avatarURL,
      text: `Eval ran by ${message.author.tag}`
    }
  }
});
  }
}

module.exports.help = {
  name: "eval",
  usage: "eval <code:js>",
  description: "nil",
  longdes: "Evaluates and runs JavaScript code.",
  mentedperm:  "DEV",
  category: "DEV"
}
