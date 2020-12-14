const generate = require("jimp");
const fs = require("fs");
module.exports = {
  name: "grey",
  category: "Fun",
  description:"turns users image grey/Black & white",
  run: async (client, message, args, MessageEmbed) => {
    let usr = message.mentions.users.first();
    let aut = message.author
    if(usr){
    generate.read(usr.avatarURL({ format: 'png', dynamic: true, size: 1024 })).then(image => {
      image
        .quality(60)
        .resize(250, 250)
        .greyscale()
        .write("test.png");
      message.channel
        .send(``, { files: ["test.png"] })
        .then(fs.unlink("/test.png"));
    });
    }else{
      await generate
        .read(aut.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .then(image => {
          image
            .quality(100)
            .resize(250, 250)
            .greyscale()
            .write("test.png");
          message.channel
            .send(``, { files: ["test.png"] })
            .then(fs.unlink("/test.png"));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};