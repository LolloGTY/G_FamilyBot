const Discord = require('discord.js');

const mysql = require("mysql")

client.login("OTQ5NjIwNzYzNDE2MjExNDc2.GFTE-R.s1QoqqLnZVWN-kyLqoFavo0cT9p0sOVqpMOahU");

client.on("ready", () => {
    console.log("Bot online")
})

client.on("messageCreate", message => {
    if (message.content == "!comando") {
        var button1 = new Discord.MessageButton()
            .setLabel("Apri ticket")
            .setCustomId("apriTicket")
            .setStyle("PRIMARY")

        var row = new Discord.MessageActionRow()
            .addComponents(button1)

        message.channel.send({ content: "Clicca sul bottone per aprire un ticket", components: [row] })
    }
})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "apriTicket") {
        interaction.deferUpdate()
        if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
            interaction.user.send("Hai gia un ticket aperto").catch(() => { })
            return
        }
        interaction.guild.channels.create(interaction.user.username, {
            type: "text",
            topic: `User ID: ${interaction.user.id}`,
            parent: "962635576446689371", //Settare la categoria,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
                { //Aggiungere altri "blocchi" se si vogliono dare permessi anche a ruoli o utenti
                    id: "949360067759734784",
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        }).then(canale => {
            canale.send("Grazie per aver aperto un ticket")
        })
    }
})

client.on("messageCreate", message => {
    if (message.content == "!close") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: true
                })
                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }
                if (utente.permissions.has("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: false
                })
                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})






client.on("messageCreate", async message => {
    if (message.content.startsWith("!ban")) {
        var utente = message.mentions.members.first();
        var moderatore = message.member;
        var moderatorename = message.member.user.username
        if(utente == moderatore ) return message.channel.send("non puoi bannare te stesso")
        if(!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
            if(!utente.bannable){
            message.channel.send("Non puoi bannare questo utente")
        }
        
        var embedban = new Discord.MessageEmbed()
        .setTitle("Utente bannato")
        .setDescription("Questo utente è stato bannato")
        .setColor("RED")
        message.channel.send({ embeds: [embedban] })
        
        utente.ban()
        
        var embedbanlog = new Discord.MessageEmbed()
        .setTitle("Log")
        .setDescription("Utente bannato")
        .addField(`Moderator: ${moderatore.user.username}`, "1")
        .addField(`Utente: ${utente.user.username}`, "1")
        .addField(`IdUtente: ${utente.id}`, "1")
        .setColor("RED")
        client.channels.cache.get("939205310151807080").send({embeds: [embedbanlog]}); 
    
    }  
    
    
    
    if (message.content.startsWith("!unban")) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }

        var args = message.content.split(/\s+/);
        var idUtente = args[1]

        if (!idUtente) {
            return message.channel.send("Non hai scritto l'id di nessun utente");
        }

        message.guild.members.unban(idUtente)
            .then(() => {
                var embed = new Discord.MessageEmbed()
                    .setTitle("Utente sbannato")
                    .setDescription("Questo utente è stato sbannato")
                    .setColor("GREEN")
                message.channel.send({ embeds: [embed] })
            })
            .catch(() => { message.channel.send("Utente non valido o non bannato") })
    }
})

client.on("messageCreate", message => {
    if (message.content.startsWith("/clear")) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send('Non ho il permesso');
        }
        var count = parseInt(message.content.split(/\s+/)[1]);
        if (!count) {
            return message.channel.send("Inserisci un numero valido")
        }
        if (count > 100) {
            return message.channel.send("Non puoi cancellare più di 100 messaggi")
        }
        message.channel.bulkDelete(count, true) 
        message.channel.send(count + " messaggi eliminati").then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })
    }
})


client.on("messageCreate", message => {
    if (message.content.startsWith("!say")) {
        var args = message.content.split(/\s+/);
        var testo;
        testo = args.slice(1).join(" ");
        if (!testo) {
            return message.channel.send("Inserire un messaggio");
        }
        if (message.content.includes("@everyone") || message.content.includes("@here")) {
            return message.channel.send("Non taggare everyone o here");
        }
        message.delete()

        //Messaggio classico
        message.channel.send(testo)

    }
    


})



//BENVENUTO
client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setTitle("WELCOME")
        .setDescription(`Ciao ${member.toString()}, benvenuto in ${member.guild.name}. Sei il **${member.guild.memberCount}° Membro**`)

    client.channels.cache.get("939224842111160381").send({embeds: [embed]}); 
})
client.on("guildMemberAdd", member => {
    if (member.user.bot) return

    member.roles.add("939278122505891851");
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



