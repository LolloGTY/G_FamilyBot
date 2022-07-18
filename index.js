const Discord = require('discord.js');
global.client = new Discord.Client({
    intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES","GUILD_INTEGRATIONS","GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES","DIRECT_MESSAGES"],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const Levels = require('discord-xp')


Levels.setURL("mongodb+srv://Admin:admin@gfamilybot.seone.mongodb.net/test")
client.login("OTQ5NjIwNzYzNDE2MjExNDc2.GGZI6Q.ojATXRvE_1fbB8kA9whqji90kX4kGJ-KKyHQ24");

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


//parolaccie
/*
client.on("message", message => {
    var utente = message.member;
    var msgcont = message.content;
    var ciao = message.member.user.username;
    if(message.content == "vafanculo" || "cazzo" || "ciao"){
   
            var embedbanlog = new Discord.MessageEmbed()
            .setTitle("Log")
            .setDescription(`Atenzione qualcuno ha detto una parolaccia`)
            .addField(`Reason: L'utente con il nome ${ciao} ha detto ${msgcont}`, "0_0")
            .addField(`Moderator: G_House Of Game_Tv | BOT`, "0_0")
            .addField(`Utente: ${ciao}`, "0_0")
            .addField(`IdUtente: ${utente.id}`, "0_0")
            .setColor("RED")
            client.channels.cache.get("939205310151807080").send({embeds: [embedbanlog]}); 
        message.author.send(`Hey nel server della G_House Of Game_Tv hai detto una parolacia lo staff e gia stato avvisato e provvedera lui se mutarti bannarti o kickarti (Parolaccia detta:${message.content})`)
    }

}) 
*/


client.on("messageCreate", message => {
    if (message.channel.type == "DM") return

    if (message.member.roles.cache.has("939160799501504543") || message.member.roles.cache.has("idRuolo2")) return

    var parolacce = ["cazzo", "cazo", "vaffanculo", "vafanculo", "puttana", "coglione", "minchia", "minchione", "porco dio", "dio cane", "cane dio", "dio cane", "dio e un cane", "sesso", "pirla", "masturbarsi", "suca", "cazzzo", "cazz0", "cazzz0", "cazzp", "succhia", "caz0", "succa", "suc4", "merda", "m3rd4", "merd4", "m3rda"]
    var trovata = false;
    var testo = message.content;

    parolacce.forEach(parola => {
        if (message.content.toLowerCase().includes(parola.toLowerCase())) {
            trovata = true;
            testo = testo.replace(eval(`/${parola}/g`), "###");
        }
    })

    if (trovata) {
        message.delete();
        var embed = new Discord.MessageEmbed()
            .setTitle("Hai detto una parolaccia")
            .setDescription("Hai scritto un messaggio con parole bloccate\rIl tuo messaggio: " + testo)

        message.channel.send({ embeds: [embed] })
    }
})
const { createCanvas, loadImage, registerFont } = require("canvas")
client.on("guildMemberAdd", async member => {    
        
    //Creare un canvas
let canvas = await createCanvas(1700, 600) //createCanvas(larghezza, altezza)
let ctx = await canvas.getContext("2d")

//Caricare un immagine
let img = await loadImage("./img/background.png")
ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2) //drawImage(immagine, posizioneX, posizioneY, larghezza, altezza)


//Riempire di un colore
ctx.fillStyle = "rgba(0,0,0,0.30)"
ctx.fillRect(70, 70, canvas.width - 70 - 70, canvas.height - 70 - 70) //fillReact(posizioneX, posizioneY, larghezza, altezza)

//Caricare un immagine rotonda
ctx.save()
ctx.beginPath()
ctx.arc(150 + 300 / 2, canvas.height / 2, 150, 0, 2 * Math.PI, false) //arc(centroX, centroY, raggio, startAngolo, endAngolo, sensoOrario/Antiorario)
ctx.clip()
img = await loadImage(member.displayAvatarURL({ format: "png" }))
ctx.drawImage(img, 150, canvas.height / 2 - 300 / 2, 300, 300)
ctx.restore()

//Creare le scritte
ctx.fillStyle = "#fff"
ctx.textBaseline = "middle"

ctx.font = "80px sans-serif" //potete anche inserire sans-serif
ctx.fillText("Benvenuto/a", 500, 200) //Testo, posizioneX, posi sans-serif
ctx.font = "100px sans-serif"
ctx.fillText(member.user.username.slice(0, 25), 500, canvas.height / 2)

ctx.font = "50px sans-serif"
ctx.fillText(`${member.guild.memberCount}° membro`, 500, 400)

//Mandare un canvas
let channel = client.channels.cache.get("idCanale")

let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "canvas.png")

client.channels.cache.get("939224842111160381").send({ files: [attachment] });

    })





    client.on("guildMemberRemove", async member => {    
        
        //Creare un canvas
    let canvas = await createCanvas(1700, 600) //createCanvas(larghezza, altezza)
    let ctx = await canvas.getContext("2d")
    
    //Caricare un immagine
    let img = await loadImage("./img/background.png")
    ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2) //drawImage(immagine, posizioneX, posizioneY, larghezza, altezza)
    
    
    //Riempire di un colore
    ctx.fillStyle = "rgba(0,0,0,0.30)"
    ctx.fillRect(70, 70, canvas.width - 70 - 70, canvas.height - 70 - 70) //fillReact(posizioneX, posizioneY, larghezza, altezza)
    
    //Caricare un immagine rotonda
    ctx.save()
    ctx.beginPath()
    ctx.arc(150 + 300 / 2, canvas.height / 2, 150, 0, 2 * Math.PI, false) //arc(centroX, centroY, raggio, startAngolo, endAngolo, sensoOrario/Antiorario)
    ctx.clip()
    img = await loadImage(member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(img, 150, canvas.height / 2 - 300 / 2, 300, 300)
    ctx.restore()
    
    //Creare le scritte
    ctx.fillStyle = "#fff"
    ctx.textBaseline = "middle"
    
    ctx.font = "80px sans-serif" //potete anche inserire sans-serif
    ctx.fillText("Addio", 500, 200) //Testo, posizioneX, posi sans-serif
    ctx.font = "100px sans-serif"
    ctx.fillText(member.user.username.slice(0, 25), 500, canvas.height / 2)
    
    ctx.font = "50px sans-serif"
    ctx.fillText(`Torna presto`, 500, 400)
    
    //Mandare un canvas
    
    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "canvas.png")
    
    client.channels.cache.get("939224842111160381").send({ files: [attachment] });
    
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