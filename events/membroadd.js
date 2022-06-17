const Discord = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        if (member.user.bot) return
        var embed = new Discord.MessageEmbed()
            .setTitle("WELCOME")
            .setDescription(`Ciao ${member.toString()}, benvenuto in ${member.guild.name}. Sei il **${member.guild.memberCount}° Membro**`)
    
            client.channels.cache.get("939224842111160381").send({embeds: [embed]}); 
        }
}