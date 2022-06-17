const Discord = require('discord.js');

module.exports = {
    name: "unban",
    description: "jdsfkjd",
    execute(message){
        if (message.content.startsWith("!unban")) {
            if (!message.member.permissions.has('BAN_MEMBERS')) {
                return message.channel.send('Non hai il permesso');
            }
    
            var args = message.content.split(/\s+/);
            var idUtente = args[1]
    
            if (!idUtente) {
                return message.channel.send("Non hai scritto l'id di nessun utente");
            }
    
            message.guild.members.unban(idUtente)
                .then(() => {
                    var embed = new Discord.MessageEmbed()
                        .setTitle("Utente sbannato")
                        .setDescription("Questo utente è stato sbannato")
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embed] })
                })
                .catch(() => { message.channel.send("Utente non valido o non bannato") })
        }
    }
    
 }
