module.exports.run = async (bot, message, args) => {
  let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
  if(colors.size < 1) return message.channel.send("There are no colors in this server.");

  let str = args.join(" ");
  let role = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());

  if(!role) return message.channel.send("This color does no exist!");

  try {
      await message.member.removeRoles(colors);
      await message.member.addRole(role);
      message.channel.send(`You now have the color ${role}!`);
  } catch(e) {
      message.channel.send(`Operation failed! ${e.message}`);
  }
}

module.exports.help = {
  name: "color"
}
