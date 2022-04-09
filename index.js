const Discord = require("discord.js")
const client = new Discord.Client(
    {intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES","GUILD_INTEGRATIONS"]}
)

client.login("OTQ5NjIwNzYzNDE2MjExNDc2.YiNBQQ.d5DxNuNL_Vm8IdlK5Ac8WP3q5bg")

client.on("ready", () => {    
    console.log("Bot Online")

})

client.on("messageCreate", (message) => {
    if(message.content == "ciao"){
        message.channel.send("ciao a te")
    }
    if(message.content == "/youtube"){
        message.channel.send("Ecco il mio canale youtube: https://www.youtube.com/channel/UCxhOtYBAsKORiTe_MJVj9fQ ")
    }     
    if(message.content == "/token"){
        if(message.member.roles.cache.has("939160799501504543")){
            message.channel.send("Hai il ruolo")
        }
        else{
            message.channel.send("Non hai il ruolo")  
        }
    } 
    if(message.content == "/twich"){
        message.channel.send("Ecco il canale tiwch: https://www.twitch.tv/ghyoutubi")
    }
    if(message.content == "Bot saluta"){
        if(message.member.roles.cache.has("939160799501504543")){
            message.channel.send("Ciao a tutti ")  
        }
    }
    else{
        message.channel.send("Non ho voglia di salutare ")
    }
   
})

client.on("guildMemberAdd", (member) => {
    client.channels.cache.get("939224842111160381").send("Benvenuto " + member.toString() + " in " + member.guild.name + ", sei il " + member.guild.memberCount + "° membro" )
})

