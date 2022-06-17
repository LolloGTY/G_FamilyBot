const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "jdsfkjd",
    execute(message){
        if (message.content.startsWith("!ban")) {
            var utente = message.mentions.members.first();
            var moderatore = message.member;
            var moderatorename = message.member.user.username
            if(utente == moderatore ) return message.channel.send("non puoi bannare te stesso")
            if(!message.member.permissions.has('BAN_MEMBERS')) {
                return message.channel.send('Non hai il permesso');
            }
            
            if (!utente) {
                return message.channel.send('Non hai menzionato nessun utente');
            }
                if(!utente.bannable){
                message.channel.send("Non puoi bannare questo utente")
            }
            
            var embedban = new Discord.MessageEmbed()
            .setTitle("Utente bannato")
            .setDescription("Questo utente è stato bannato ")
            .setColor("RED")
            message.channel.send({ embeds: [embedban] })
            
            utente.ban()
            
            var embedbanlog = new Discord.MessageEmbed()
            .setTitle("Log")
            .setDescription("Utente bannato")
            .addField(`Moderator: ${moderatore.user.username}`, "0_0")
            .addField(`Utente: ${utente.user.username}`, "0_0")
            .addField(`IdUtente: ${utente.id}`, "0_0")
            .setColor("RED")
            client.channels.cache.get("939205310151807080").send({embeds: [embedbanlog]}); 
        
        }
        
    }
}