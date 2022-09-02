const Discord = require('discord.js');

module.exports = {
    name: "8ball",
    description: "jdsfkjd",
    execute(message, args){
        
        const question = args.slice(1).join(` `)
        
        
        const answers = [
            "È decisamente così",
            "Senza dubbio",
            "Molto probabilmente",
            "Sì",
            "I segni indicano sì",
            "La domanda è confusa, riprova",
            "Chiedi più tardi",
            "Meglio non dirtelo ora",
            "Non lo posso prevedere adesso",
            "Concentrati e chiedelo di nuovo",
            "Non contarci",
            "La mia risposta è no",
            "Le mie fonti dicono di no",
            "La prospettiva non è buona",
            "Sono molto dubbioso"
        ]

        let embed = new Discord.MessageEmbed()
            .setTitle(question)
            .setColor("#AA8DD8")
            .setDescription(`:crystal_ball: La risposta del destino: **${answers[Math.floor(Math.random() * answers.length)]}**`)

        message.channel.send({ embeds: [embed] })
    
    }
}