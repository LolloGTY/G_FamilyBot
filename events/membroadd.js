const Discord = require('discord.js');
const { createCanvas, loadImage, registerFont } = require("canvas")


module.exports = {
    name: "guildMemberAdd",
    execute(member) {
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
    }
}