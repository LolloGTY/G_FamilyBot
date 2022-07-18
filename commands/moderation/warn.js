const Discord = require('discord.js');
module.exports = {
    name: "warn",
    description: "jdsfkjd",
    execute(message){
        if (message.content.startsWith("!warn")) {
            if (!message.member.permissions.has('MANAGE_MEMBERS')) {
                return message.channel.send('Non hai il permesso');
            }
    
            var args = message.content.split(/\s+/);
            var idUtente = args[1]
    
            if (!idUtente) {
                return message.channel.send("Non hai scritto nessun utente");
            }
            var embed = new Discord.MessageEmbed()
                .setTitle(`Notifica Warn`)
                .addField(`${idUtente} + 1 Warn`,"O_O")
                .setDescription(`Warn dato da ${message.member.user.username}`)
                .setColor("RED")
                client.channels.cache.get("998678427525730425").send({embeds: [embed]});
            
        }
    }

}