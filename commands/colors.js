module.exports.run = async (bot, message, args) => {
  let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
  if(colors.size < 1) return message.channel.send("There are no colors in this server.");

  message.channel.send(colors.array().join(" "));
}

module.exports.help = {
  name: "colors"
}
