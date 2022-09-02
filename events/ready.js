const Discord = require('discord.js');

module.exports = {
    name: "ready",
    execute() {
        console.log("Bot online")
        client.user.setActivity("glh_tv", "WATCHING")
    }
}