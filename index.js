const Discord = require('discord.js');
const client = new Discord.Client({intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES","GUILD_INTEGRATIONS","GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"]}); //<-- RICORDARSI QUESTO
const mysql = require("mysql")

client.login("OTQ5NjIwNzYzNDE2MjExNDc2.YiNBQQ.d5DxNuNL_Vm8IdlK5Ac8WP3q5bg");

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

//ADDIO
client.on("guildMemberRemove", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setTitle("GOODBEY")
        .setDescription(`Ciao ${member.toString()}, ci rivediamo presto qua in ${member.guild.name}`)

    client.channels.cache.get("939224842111160381").send({embeds: [embed]}); 
})


client.on("messageCreate", (message) =>{
    if(message.content == "ciao"){
        message.channel.send("Ciao a te ")
    }
    if(message.content == "!youtube"){
        message.channel.send("Ecco il canale: https://www.youtube.com/channel/UCxhOtYBAsKORiTe_MJVj9fQ ")
    }
    if(message.content == "!twich"){
        message.channel.send("Ecco il canale tiwch: https://www.twitch.tv/ghyoutubi")
    }
    if(message.content == "..dd.."){
        message.member.roles.add("962650270028935198")
    }

})

client.on("messageCreate", message => {
    if (message.channel.type == "DM") return


    var parolacce = ["cazzo", "merda", "favanculo", "minchia", "stronzo",]
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


client.on("messageCreate", message => {
    if (message.content.startsWith("!mute")) {
        var utente = message.mentions.members.first();
        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }

        utente.roles.add("939212951947186196")

        var embed = new Discord.MessageEmbed()
            .setTitle(`${utente.user.username} mutato`)
            .setDescription(`Utente mutato da ${message.author.toString()}`)

        message.channel.send({ embeds: [embed] })
    }
})

client.on("messageCreate", message => {
    if (message.content.startsWith("!unmute")) {
        var utente = message.mentions.members.first();
        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }

        utente.roles.remove("939212951947186196")

        var embed = new Discord.MessageEmbed()
            .setTitle(`${utente.user.username} smutato`)
            .setDescription(`Utente smutato da ${message.author.toString()}`)

        message.channel.send({ embeds: [embed] })
    }
})






client.on("messageCreate", message => {
    if (message.content == "!ciao") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Ciao")

        let button1 = new Discord.MessageButton()
            .setLabel("Cliccami")
            .setStyle("SUCCESS")
            .setCustomId(`clickButton1,${message.author.id}`)

        let row = new Discord.MessageActionRow()
            .addComponents(button1)

        message.channel.send({ embeds: [embed], components: [row] })
    }

    if (message.content == "!help") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setDescription("Seleziona la pagina con il menu qua sotto")

        let select = new Discord.MessageSelectMenu()
            .setCustomId("menuHelp")
            .setPlaceholder("Seleziona una pagina")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: "Utility",
                    description: "Vai a vedere i comandi utility",
                    value: "pagina1"
                },
                {
                    label: "Moderation",
                    description: "Vai a vedere i comandi Moderation",
                    value: "pagina2"
                },
                {
                    label: "Coming soon",
                    description: "Vai alla pagina numero 3",
                    value: "pagina3"
                    
                }
            ])

        let row = new Discord.MessageActionRow()
            .addComponents(select)

        message.channel.send({ embeds: [embed], components: [row] })
    }
})

client.on("interactionCreate", interaction => {
    if (!interaction.isButton()) return

    if (interaction.customId.startsWith("clickButton1")) {
        let idUtente = interaction.customId.split(",")[1]
        if (interaction.user.id != idUtente) return interaction.reply({ content: "Questo bottone non è tuo", ephemeral: true })
        interaction.deferUpdate()

        client.channels.cache.get("idCanale").send("Ciao")
    }
})

client.on("interactionCreate", interaction => {
    if (!interaction.isSelectMenu()) return

    if (interaction.customId == "menuHelp") {
        interaction.deferUpdate()

        switch (interaction.values[0]) {
            case "pagina1": {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Utility")


                interaction.message.edit({ embeds: [embed] })
            } break
            case "pagina2": {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Moderation")

                interaction.message.edit({ embeds: [embed] })
            } break
            case "pagina3": {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Coming soon")

                interaction.message.edit({ embeds: [embed] })
            } break
        }
    }
})





client.on("messageCreate", message => {
    if (message.content.startsWith("!userinfo")) {
        if (message.content == "!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Non ho trovato questo utente")
        }
        var elencoPermessi = "";
        if (utente.permissions.has("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "REQUEST_TO_SPEAK", "MANAGE_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "USE_EXTERNAL_STICKERS", "SEND_MESSAGES_IN_THREADS", "START_EMBEDDED_ACTIVITIES"]
            for (var i = 0; i < permessi.length; i++)
                if (utente.permissions.has(permessi[i]))
                    elencoPermessi += `- ${permessi[i]}\r`
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.displayAvatarURL())
            .addField("User id", utente.user.id, true)
            .addField("Status", utente.presence ? utente.presence.status : "offline", true)
            .addField("Is a bot?", utente.user.bot ? "Yes" : "No", true)
            .addField("Account created", utente.user.createdAt.toDateString(), true)
            .addField("Joined this server", utente.joinedAt.toDateString(), true)
            .addField("Permissions", elencoPermessi, false)
            .addField("Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)
        message.channel.send({ embeds: [embed] })
    }
})


client.on("messageCreate", message => {
    if (message.content == "!serverinfo") {
        var server = message.guild;
        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("Tutte le info su questo server")
            .setThumbnail(server.iconURL())
            .addField("Owner", client.users.cache.get(server.ownerId).username, true)
            .addField("Server id", server.id, true)
            .addField("Members", server.memberCount.toString(), false)
            .addField("Channels", server.channels.cache.size.toString(), false)
            .addField("Server created", server.createdAt.toDateString(), true)
            .addField("Boost level", "Level " + (server.premiumTier != "NONE" ? server.premiumTier : 0) + " (Boost: " + server.premiumSubscriptionCount + ")", true)
        message.channel.send({ embeds: [embed] })
    }
})





client.on("messageCreate", message => {
    if(message.content == "!sond"){
        var user = message.member;
        if(!user.permissions.has("ADMINISTRATOR")){
            message.channel.send("non hai il permesso")
        }
        else{
            var sondcontent = message.content.split(1)
            console.log(sondcontent)
        }
    }
})




