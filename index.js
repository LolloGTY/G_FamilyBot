const Discord = require('discord.js');
const client = new Discord.Client({
    intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES","GUILD_INTEGRATIONS","GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES","DIRECT_MESSAGES"],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const Levels = require('discord-xp')


Levels.setURL("mongodb+srv://Admin:admin@gfamilybot.seone.mongodb.net/test")
client.login(process.env.token);

const fs = require("fs");

client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const eventsFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args))
}

client.on("message", message => {
    const prefix = "!";

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if (comando.onlyStaff) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Non hai il permesso di eseguire questo comando")
            return
        }
    }

    comando.execute(message, args);
})


//comandi a caso che non export non funzionavano

global.MongoClient = require("mongodb").MongoClient;

var url = "mongodb+srv://Admin:admin@gfamilybot.seone.mongodb.net/test"


/*
warn

client.on("messageCreate", message => {
    var utente1 = message.mentions.members.first();
    if(message.content == "!warn"){
    
        MongoClient.connect(url, function(err, db){
            var database = db.db("Moderation")
            database.collection("Users").find({id: '${utente1.id}' }).toArray(async function (err, result) {
                var utente = result[0]

                if(!utente){
                    //Utente NON presente nel DB
                    console.log(utente1)
                }
                else{
                    //Utente presente nel DB
                }
        
         })
    })

}    

})
    
*/


const config = require('./settings.json');
const mongoose = require('mongoose');
const mongoCurrency = require('discord-mongo-currency');

mongoose.connect(config.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true, })
mongoose.set('useFindAndModify', false);

mongoCurrency.connect(config.MongoDB);



