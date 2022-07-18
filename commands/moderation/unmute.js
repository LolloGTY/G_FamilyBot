const Discord = require('discord.js');

module.exports = {
    name: "unmute",
    description: "jdsfkjd",
    execute(message){
        var utente = message.mentions.members.first();
        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }

        utente.roles.remove("939212951947186196")

        var embed = new Discord.MessageEmbed()
            .setTitle(`${utente.user.username} smutato`)
            .setDescription(`Utente smutato da ${message.author.toString()}`)
            .setColor("GREEN")
        message.channel.send({ embeds: [embed] })
        var embed2 = new Discord.MessageEmbed()
        .setTitle(`${utente.user.username} smutato`)
        .setDescription(`Utente smutato da ${message.author.toString()}`)
        .setColor("GREEN")
        client.channels.cache.get("939205310151807080").send({embeds: [embed2]});
    
    
    }
}