const Discord = require('discord.js');
const Levels = require('discord-xp')

Levels.setURL("mongodb+srv://Admin:admin@gfamilybot.seone.mongodb.net/test")

module.exports = {
    name: "messageCreate",
    execute() {
   client.on("message", async message => {
    if(message.content == "!rank"){
        const user = await Levels.fetch(message.author.id, message.guild.id);
    var user2 = message.member;
    const embedlvl = new Discord.MessageEmbed()
    .setAuthor(`Livello di ${user2.user.username}`)
    .addField("Level",`Il livello corente di ${user2.user.username} è **${user.level}**!`)
    message.channel.send({embeds: [embedlvl]})
    } 
    
})

    }

}