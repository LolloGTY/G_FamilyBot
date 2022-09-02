const Discord = require('discord.js');

module.exports = {
    name: "bugreport",
    description: "jdsfkjd",
    execute(message, args){

        var ut = message.member.user.username;
        const bug = args.slice(1).join(` `)
        let embed = new Discord.MessageEmbed()
            .setTitle("**Bug Report**")
            .setDescription(`L'utente ${ut} ha segnalato il seguente bug`)
            .addField(`**BUG:**`, `${bug}`)     

        client.channels.cache.get("1013383524079915108").send({ embeds: [embed] }); 
        message.channel.send(`Bug reportato con sucesso 
**BUG:** 
${bug}`)
    }
}