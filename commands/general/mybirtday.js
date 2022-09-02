const Discord = require('discord.js');

module.exports = {
    name: "mybirtday",
    description: "jdsfkjd",
    execute(message){
    var ut = message.member.user.username 
    var utente = message.mentions.members.first();
    if(!utente){
        let embed = new Discord.MessageEmbed()
        .setTitle("🎂**BIRTDAY** 🎉")
        .setDescription(`Oggi e il compleanno di ${ut}`)
        message.channel.send({ embeds: [embed]})
    }else{
        if(!message.member.permissions.has("MANAGE_ROLES")){
            return message.channel.send("non puoi fingere il compleanno di qualcunaltro")
        }
        let embed1 = new Discord.MessageEmbed()
        .setTitle("🎂**BIRTDAY** 🎉")
        .setDescription(`Oggi e il compleanno di ${utente}`)
        message.channel.send({ embeds: [embed1]})
    }
    


    } 
    
}