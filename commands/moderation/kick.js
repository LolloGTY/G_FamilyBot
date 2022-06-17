const Discord = require('discord.js');


module.exports = {
    name: "kick",
    description: "jdsfkjd",
    execute(message){
            var utente = message.mentions.members.first();
            var moderatore = message.member;
            var moderatorename = message.member.user.username
            if(utente == moderatore ) return message.channel.send("non puoi kickare te stesso")
            if(!message.member.permissions.has("KICK_MEMBERS")) {
                return message.channel.send('Non hai il permesso');
            }
            
            if (!utente) {
                return message.channel.send('Non hai menzionato nessun utente');
            }
                if(!utente.kickable){
                message.channel.send("Non puoi kickare questo utente")
            }
            
            var embedban = new Discord.MessageEmbed()
            .setTitle("Utente kickato")
            .setDescription("Questo utente è stato kickato")
            .setColor("RED")
            message.channel.send({ embeds: [embedban] })
            
            utente.kick()
            
            var embedbanlog = new Discord.MessageEmbed()
            .setTitle("Log")
            .setDescription("Utente kickato")
            .addField(`Moderator: ${moderatore.user.username}`, "1")
            .addField(`Utente: ${utente.user.username}`, "1")
            .addField(`IdUtente: ${utente.id}`, "1")
            .setColor("RED")
            client.channels.cache.get("939205310151807080").send({embeds: [embedbanlog]}); 
        
        
    }
}