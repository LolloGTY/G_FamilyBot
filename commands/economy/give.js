const mongoCurrency = require('discord-mongo-currency');

const Discord = require('discord.js');

module.exports = {
    name: "give",
    description: "jdsfkjd",
    execute(message, args){
        const member = message.mentions.members.first();

        if(!member) return message.channel.send('You need to put a member to give the coins to.')
        if(!args[1]){
            message.channel.send('You need to put an amount!')
            return
        }
      
        if(args[1].isNaN) return;
      
        mongoCurrency.giveCoins(member.id, message.guild.id, `${args[1]}`)
        message.channel.send(`I just gave ${member} this amount of coin: \`${args[1]}\``)
    }
}