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
	client.user.client.user.setPresence({ game: { type: "LISTENING", name: "for +help" }, status: "online" });
	
	if (client.guilds.size < 2309) return;
	const Manager = new Discord.ShardingManager('./index.js');
	Manager.spawn(1);
});

client.on("messageDelete", async message => {
	let cha = message.guild.channels.find("name", "message-logs");
	
	if (!cha) return;
	
	require('./resources/embed.js').mlog(cha, "Message Deleted", "Sent by **" + message.author.tag + "** (**" + message.author.id + "**) \n\n **__Content__**: \n" + message.content, message)
})

client.on("messageUpdate", async (message, newmessage) => { if (newmessage.content === message.content) return;
	let cha = message.guild.channels.find("name", "message-logs");
	
	if (!cha) return;
	
	require('./resources/embed.js').mlog(cha, "Message Edited", "Sent by **" + message.author.tag + "** (**" + message.author.id + "**) \n\n **__Old Message:__**: \n" + message.content + "\n\n __**New Message**__ \n" + newmessage.content, message)
})

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
	if (commandfile) commandfile.run(client,client,response,args);
});

client.login(process.env.token); 
