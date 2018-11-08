const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, client, response, args) => {
    let member;
    let memberf = require('../resources/valid.js').user(client, response, args);
    if (memberf[0] = 'multi') {
	    const embed = require('../resources/valid.js').embed(memberf[1])
	    response.channel.send({embed});
	    return;
    } else {member = memberf[1]}
    response.reply("member is in the server!")
});

module.exports.help = {
	name: "isvaliduser",
	usage: "isvaliduset <user>",
	description: "nil",
	longdes: "Checks if a user is valid.",
	mentionedperm: "none",
  category: "none"
}
