const { Client, Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");
require("events").EventEmitter.defaultMaxListeners = 100;
const client = new Client({
  disableEveryone: true
});
client.login(process.env.TOKEN);
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on("ready", async function() {
  var list = [
    `Use my Prefix ${process.env.PREFIX}`,
    `On ${client.guilds.size} servers `,
`A Cloud Partner`
  ];
  setInterval(function() {
    const Exec = Math.floor(Math.random() * list.length);
    client.user.setActivity(list[Exec], { type: "STREAMING" });
    console.log(Exec);
  }, 10000);
  console.log("online  "+client.user.tag);
});

client.on("message", async message => {
  const prefix = process.env.PREFIX;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
  message.member = await message.guild.cache.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args, MessageEmbed);
});    

client.on("message", message =>{
  if(message.channel.type === "dm"){
    if(message.author.bot) return;
    const bed = new MessageEmbed()
    .setTitle("DMs")
    .setDescription("A User Dmed the bot")
    .setColor("RANDOM")
    .setAuthor(message.author.username)
    .addField(`${message.author.tag} sent`, `${message.content}`)
    .setFooter("copy id below if needed "+message.author.id)
    client.channels.get(`742961125607342181`).send(bed).then(m=>{m.channel.send(message.author.id)})
    
    }
})
  let vals={country:"", width:"",height:"" }

  
/*
client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.content.startsWith("+off")) return off()
    function off(){
      if (!message.author.id == "475435277444186114") return message.reply("no");
      message.reply("killing process for 1 mins")
client.destroy(process.env.TOKEN)
    setTimeout(()=>{
message.reply("stopping for 1 min")
      client.login(process.env.TOKEN)
      }, 60000)
    }
    
  }
});
*/