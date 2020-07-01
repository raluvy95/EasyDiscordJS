const Discord = require("discord.js")
const client = new Discord.Client()
const EasyDiscordJS = require("./../index.js")
const prefix = "$"
client.easy = new EasyDiscordJS(client, {prefix: prefix})
client.easy.loadCommands(__dirname + "/modules", true)
client.easy.loadBasicCommands([])
client.on("ready", () => {
    client.easy.setPlaying(['UM', 'Hi', 'What are u doing', 'Do you like pizza?'])
})
client.on("message", message => {
    if(message.author.bot || !message.content.startsWith(prefix)) return
    const args = client.easy.getArgs(message)
    const commandName = args.shift()
    const command = client.easy.commands.get(commandName)
    if(!command) return 
    command.run(message, args, client)
})
client.login("Njk4NTk5NTEyMTQyMzgxMDk2.XtlS3Q.PSaB6iUP5SDmVqrKjK64GEBO8oE")