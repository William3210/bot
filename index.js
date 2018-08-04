const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Could't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});

client.on("ready", async () => {
  console.log(`${client.user.username} is ready to kick ass!`);

  client.user.setActivity("You", {type: "WATCHING"});
});

client.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome");
  welcomechannel.send(`LOOK OUT EVERYONE! ${member} has just joined the party! :tada: :hugging:`);
});

client.on("guildMemberRemove", async member => {
  console.log(`${member.id} left the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome");
  welcomechannel.send(`GOOD RIDDANCE! ${member} Just Bailed On The Server :pensive:`);
});

client.on("message", async message => {
  if(message.author.client) return;
  if(message.channel.type === "dm") return;

  let prefix = clientconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);
});

client.login(process.env.BOT_TOKEN);
