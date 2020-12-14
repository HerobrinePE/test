

module.exports = {
  name: "avatar",
  aliases: ["a"],
  category: "Image",
  description: "returns an avatar picture",
  run: (client, message, args, MessageEmbed) => {
    const embed = new MessageEmbed()
  let usr = message.mentions.users.first()
  if(!usr) return message.channel.send(embed.setImage(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })))
  message.channel.send(embed.setImage(usr.avatarURL({ format: 'png', dynamic: true, size: 1024 })));
  }
}