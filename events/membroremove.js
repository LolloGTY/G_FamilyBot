const Discord = require('discord.js');

module.exports = {
    name: "guildMemberRemove",
    execute(member) {
        if (member.user.bot) return
        var embed = new Discord.MessageEmbed()
            .setTitle("GOODBEY")
            .setDescription(`Ciao ${member.toString()}, ci rivediamo presto qua in ${member.guild.name}`)
    
        client.channels.cache.get("939224842111160381").send({embeds: [embed]});
    
        }
}