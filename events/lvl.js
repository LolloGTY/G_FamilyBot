const Discord = require('discord.js');
const Levels = require('discord-xp')

Levels.setURL("mongodb+srv://Admin:admin@gfamilybot.seone.mongodb.net/test")

module.exports = {
    name: "messageCreate",
    execute() {
        client.on("message", async message => {
            if (!message.guild) return;
            if (message.author.bot) return;
        
            const prefix = '!';
        
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
        
            const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
            const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
            if (hasLeveledUp) {
                const user = await Levels.fetch(message.author.id, message.guild.id);
            }
    })

}

}