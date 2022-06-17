const Discord = require('discord.js');
const mongoCurrency = require('discord-mongo-currency');
mongoCurrency.connect("mongodb+srv://Admin:admin@gfamilybot.seone.mongodb.net/test");

module.exports = {
    name: "balance",
    description: "jdsfkjd",
    aliases: ['bal'],
    execute(message, args){
        
        const member = message.mentions.members.first() || message.member;
          
        const user = mongoCurrency.findUser(member.id, message.guild.id);
          
        message.channel.send(`${member} Ha \`${user.coinsInWallet}\` di soldi`)
        
    }
}