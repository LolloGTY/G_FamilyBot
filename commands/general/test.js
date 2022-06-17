const Discord = require('discord.js');

module.exports = {
    name: "test",
    description: "jdsfkjd",
    execute(message){
        message.channel.send("ciao")
    }
}