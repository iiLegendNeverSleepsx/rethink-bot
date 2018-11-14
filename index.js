const Discord = require("discord.js");
const client = new Discord.Client();
/* var mysql = require('mysql');

// Establish Database Connection:

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.database_username,
  password: process.env.database_password
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
}); */

const fs = require("fs");

client.commands = new Discord.Collection();
client.developers = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if (jsfile.length <= 0) {
		console.log("Couldn't find any commands!")
		return
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} has been loaded!`);
		client.commands.set(props.help.name, props);
	});
});

client.developers.set("one", "hi");
client.developers.set("two", "bye");

client.on("ready", async () => {
	console.log(`${client.user.tag} has started!`);
	client.user.client.user.setPresence({ game: { type: "LISTENING", name: "+help" }, status: "online" });
	
	if (client.guilds.size < 2399) return;
	const Manager = new Discord.ShardingManager('./index.js');
	Manager.spawn(1);
});

client.on("messageDelete", async message => { if (message.author.bot) return;
	let cha = message.guild.channels.find("name", "message-logs");
	
	if (!cha) return;
	
	require('./resources/embed.js').mlog(cha, "Message Deleted", "Sent by **" + message.author.tag + "** (**" + message.author.id + "**) in <#" + message.channel.id + "> \n\n **__Content__**: \n" + message.content, message)
})

client.on("messageDeleteBulk", async messages => {
	let cha = messages.array()[0].guild.channels.find("name", "message-logs");
	
	if (!cha) return;
	
	require('./resources/embed.js').mbulklog(cha, "Messages Deleted", "**" + messages.array().length + "** messages deleted in <#" + messages.array()[0].channel.id + ">" , messages.array()[1], messages)
})

client.on("messageUpdate", async (message, newmessage) => { if (newmessage.content === message.content) return; if (message.author.bot) return;
	let cha = message.guild.channels.find("name", "message-logs");
	
	if (!cha) return;
	
	require('./resources/embed.js').mlog(cha, "Message Edited", "Sent by **" + message.author.tag + "** (**" + message.author.id + "**) in <#" + message.channel.id + "> \n\n **__Old Message:__**: \n" + message.content + "\n\n __**New Message**__ \n" + newmessage.content, message)
})

client.on("guildMemberAdd", async member => {
  if (member.guild.channels.find("name", "settings")) {
          const messages = member.guild.channels.find("name", "settings").fetchMessages.array();
          const matches = messages.filter(m => m.content.toLowerCase().includes("welcome_message")) 
          if (!matches.length === 1) return;
	  console.log(matches[0]);
	  const cont = matches[0].content.replace("/user/", `<@${member.user.id}>`).replace("welcome_message:", "");
	  member.user.send(cont);
  }
});
	  

client.on("message", async response => {

	if (response.author.bot) return;

	const prefixes = ['+', `<@491345635962781696> `];
	let prefix = false;
  	for(const thisPrefix of prefixes) {
    		if(response.content.startsWith(thisPrefix)) prefix = thisPrefix;
  	}

	let messageArray = response.content.split(" ");
	let cmd = messageArray.shift();
	let args = messageArray

	if(!prefix) return;

	let commandfile = client.commands.get(cmd.slice(prefix.length));
	
	const DEVlist = ['258706134850863106', '193979517470113792', '306287412437450753'];
	
	if (commandfile && commandfile.help.mentionedperm === "DEV" && !DEVlist.includes(response.author.id)) return response.reply("you are missing the following permission(s): `This command is reserved for the bot developers`.");
	
	
	if (commandfile) commandfile.run(client,client,response,args);
});

client.login(process.env.token); 
