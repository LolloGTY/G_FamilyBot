const Discord = require('discord.js');

module.exports = {
    name: "mute",
    description: "jdsfkjd",
    execute(message){
            var utente = message.mentions.members.first();
            if (!message.member.permissions.has("MANAGE_ROLES")) {
                return message.channel.send('Non hai il permesso');
            }
            if (!utente) {
                return message.channel.send('Non hai menzionato nessun utente');
            }
    
            utente.roles.add("939212951947186196")
    
            var embed = new Discord.MessageEmbed()
                .setTitle(`${utente.user.username} mutato`)
                .setDescription(`Utente mutato da ${message.author.toString()}`)
    
            message.channel.send({ embeds: [embed] })
    }
}