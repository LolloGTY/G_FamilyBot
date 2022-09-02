const Discord = require('discord.js');

module.exports = {
    name: "annuncio",
    description: "jdsfkjd",
    execute(message, args){


        const annuncio = args.slice(1).join(` `)
        
        client.channels.cache.get("962357699536900216").send("**AVVISO**");
        client.channels.cache.get("962357699536900216").send(annuncio); 
        client.channels.cache.get("962357699536900216").send("🟢 Bot Online")
    }
}