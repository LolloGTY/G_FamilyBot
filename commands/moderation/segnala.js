const Discord = require('discord.js');

module.exports = {
    name: "segnala",
    description: "jdsfkjd",
    execute(message, args){

        var utente = message.mentions.members.first();
        var ut = message.member.user.username;

        message.channel.send(`${ut} hai segnalato ${utente} con sucesso`)
        
        let embed = new Discord.MessageEmbed()
            .setTitle("**Segnalazione**")
            .setDescription(`L'utente con il nome ${ut} ha segnalato ${utente}`)
            .setColor("RED")
            client.channels.cache.get("1013202996420677783").send({ embeds: [embed] });

    
    }
}