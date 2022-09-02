const Discord = require('discord.js');
global.client = new Discord.Client({
    intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES","GUILD_VOICE_STATES"]
});

client.login(process.env.TOKEN);

const fs = require("fs");
const { listenerCount } = require('process');

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



//Creare i menu
client.on("messageCreate", message => {
    if (message.content == "!help") {
        let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(":robot: Tutti i COMANDI :robot:")
            .setDescription(`Tutti i **comandi** disponibili all'interno di glh_tv
Per avere più dettagli del server leggi in `)
            .addField("Categorie", `
I comandi sono divisi nelle seguenti categorie:
🎡 General 
📊 Informations
👮 Moderation
🔐 Tickets 
_Seleziona la categoria dal menù qua sotto_`)
        let select = new Discord.MessageSelectMenu()
            .setCustomId("menuHelp")
            .setPlaceholder("seleziona una pagina")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: "General",
                    value: "general",
                    emoji: "🎡"

                },
                {
                    label: "Information",
                    value: "info",
                    emoji: "📊"

                },
                {
                    label: "Moderation",
                    value: "mod",
                    emoji: "👮‍♂️"

                },
                {
                    label: "Tikets",
                    value: "tiket",
                    emoji: "🔐"

                }
            ])

        let row = new Discord.MessageActionRow()
            .addComponents(select)
        
        message.channel.send({ embeds: [embed], components: [row] })
    
    }
})
/*
//Evento di click
client.on("interactionCreate",  async interaction => {
    
    
    if (!interaction.isSelectMenu()) return

    if(interaction.custumId == "menuHelp"){
        interaction.deferUpdate()
        
        switch(interaction.value[0]){
            case "general": {

                let embed = new Discord.MessageEmbed()
                    .setTitle("Pagina 3")

                interaction.message.edit({ embeds: [embed] })

            }break
            case "info": {

                

            }break
            case "mod": {

            let embedmod = new Discord.MessageEmbed()
                    .setTitle("👮‍♂️ Moderation 👮‍♂️")
                    .setDescription("Comandi per la moderazione")
                    .addFields("!ban", "<:mod:1013204440834129992><:admin:1013205824488882340><:owner:1013205797402062918>")

                interaction.message.edit("ciao")
            
            }break
            case "tiket": {

            }break
        }
    }

})

*/

client.on("interactionCreate", interaction => {
    if (!interaction.isSelectMenu()) return

    if (interaction.customId == "menuHelp") {
        interaction.deferUpdate()

        switch (interaction.values[0]) {
            case "general": {
                    let embedgeneral = new Discord.MessageEmbed()
                    .setColor("GREY")
                    .setTitle("🎡 General 🎡")
                    .setDescription("Un po tutti i comandi")
                    .addFields(
                        { name: '!say <:memeber:1013205895867531325>', value: 'Fai scrivero quello che vuoi al bot', inline: true },
                        { name: '!transcript <:memeber:1013205895867531325>', value: 'IL bot scrive in un file tutti i messagi di una chat', inline: true },
                        { name: '!test <:memeber:1013205895867531325>', value: 'Controlla se il bot e online', inline: true }
                    )
                    .addFields(
                        { name: '!rank <:memeber:1013205895867531325>', value: 'Controlla a che livello sei', inline: true },
                        { name: '!8ball <:memeber:1013205895867531325>', value: 'Scrive un annuncio', inline: true },
                        { name: '!mybirtday <:memeber:1013205895867531325>', value: 'Scrivilo quando e il tuo compleanno cosi tutto ti faranno gli auguri', inline: true }
                    )
                    
                    interaction.message.edit({ embeds: [embedgeneral] })
            } break
            case "info": {
                let embed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Pagina 2")
                    .addFields(
                        { name: '!youtube <:memeber:1013205895867531325>', value: 'Link YouTube', inline: true },
                        { name: '!twich <:memeber:1013205895867531325>', value: 'Link Twich', inline: true },
                        { name: '!github <:memeber:1013205895867531325>', value: 'Link GitHub', inline: true }
                    )
                interaction.message.edit({ embeds: [embed] })
            } break
            case "mod": {
                let embedmod = new Discord.MessageEmbed()
                    .setColor("BLUE")   
                    .setTitle("👮‍♂️ Moderation 👮‍♂️")
                    .setDescription("Comandi per la moderazione")
                    .addFields(
                        { name: '!ban <:mod:1013204440834129992><:admin:1013205824488882340><:owner:1013205797402062918>', value: 'Banna un utente', inline: true },
                        { name: '!kick <:mod:1013204440834129992><:admin:1013205824488882340><:owner:1013205797402062918>', value: 'Espelle un utente', inline: true },
                        { name: '!mute <:mod:1013204440834129992><:admin:1013205824488882340><:owner:1013205797402062918>', value: 'Muta un utente', inline: true }
                    )
                    .addFields(
                        { name: '!warn <:mod:1013204440834129992><:admin:1013205824488882340><:owner:1013205797402062918>', value: 'Warna un utente', inline: true },
                        { name: '!annuncio <:admin:1013205824488882340><:owner:1013205797402062918>', value: 'Scrive un annuncio', inline: true },
                        { name: '!unban <:mod:1013204440834129992><:admin:1013205824488882340><:owner:1013205797402062918>', value: 'Sbanna un utente', inline: true }
                    )
                    .addFields(
                        { name: '!unmute <:mod:1013204440834129992><:admin:1013205824488882340><:owner:1013205797402062918>', value: 'Smuta un utente', inline: true },
                        { name: '!segnala <:memeber:1013205895867531325>', value: 'Serve per segnalare un utente', inline: true },
                        { name: '!bugreport <:memeber:1013205895867531325>', value: 'Segnala un bug', inline: true }
                        
                    )
                    
                    interaction.message.edit({ embeds: [embedmod] })
            } break
            case "tiket": {
                let embed = new Discord.MessageEmbed()
                    .setColor("YELLOW")
                    .setTitle("COMING SOON")

                interaction.message.edit({ embeds: [embed] })
            } break
        }
    }
})


























//comandi a caso che non export non funzionavano




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


client.on("messageCreate", message => {
    if (message.content.startsWith("!userinfo")) {
        let utente
        if (message.content == "!userinfo") {
            utente = message.member;
        }
        else {
            utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Non ho trovato questo utente")
        }
        let elencoPermessi = "";
        if (utente.permissions.has("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            let permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "REQUEST_TO_SPEAK", "MANAGE_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "USE_EXTERNAL_STICKERS", "SEND_MESSAGES_IN_THREADS", "START_EMBEDDED_ACTIVITIES"]
            for (let i = 0; i < permessi.length; i++)
                if (utente.permissions.has(permessi[i]))
                    elencoPermessi += `- ${permessi[i]}\n`
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.displayAvatarURL())
            .addField("User id", utente.user.id, true)
            .addField("Status", utente.presence ? utente.presence.status : "offline", true)
            .addField("Is a bot?", utente.user.bot ? "Yes" : "No", true)
            .addField("Account created", utente.user.createdAt.toDateString(), true)
            .addField("Joined this server", utente.joinedAt.toDateString(), true)
            .addField("Permissions", elencoPermessi)
            .addField("Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\n"))
        message.channel.send({ embeds: [embed] })
    }
})

client.on("messageCreate", (message) => {
    if (message.content == "!audio") {
        const canaleVocale = message.member.voice.channel;
        if(canaleVocale) {
            canaleVocale.join()
                .then(connection => {
                    connection.play('coglioni.mp3');
                });
        }
        else {
            message.channel.send("Non sei in un canale vocale");
        }
    }
})
