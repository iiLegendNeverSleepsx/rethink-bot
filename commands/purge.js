const Discord = require("discord.js");
const fs = require("fs"); 

module.exports.run = async (bot, client, response, args) => {
  if (response.member.hasPermission("MANAGE_MESSAGES")) {
  const count = args.shift();
  const newcount = Number(count) + 1;
  response.channel.bulkDelete(newcount).then(() => {
  response.channel.send(`Deleted **${count}** messages!`).then(msg => msg.delete(3000));
});
  } else {response.reply("\nError! You do not have permission to use this command! You need the `MANAGE_MESSAGES` permission!")}
}

module.exports.help = {
  name: "purge",
  usage: "purge <number:int>",
  description: "nil",
  longdes: "Purges messages in a channel.",
  mentionedperm: "MANAGE_MESSAGES",
  category: "Moderation"
}
