const {MessageEmbed} = require("discord.js")
const ez = require("../../index")
const fs = require("fs")
module.exports = {
    name: "help",
    module: "utility",
    description: "Show a list of commands",
    run(message, args, client) {
        let commands = client.easy || ez.getAllCommands() || client.commands
        commands = commands.commands || commands
        commands1 = Array.from(commands.values())
        const embed = new MessageEmbed()
        .setTitle(`List of commands - ${commands.size} commands`)
        function h() {
            if(client.isModule) {
                const _y = fs.readdirSync(client.modulePath).filter(m => !m.startsWith("_"))
                for(const y of _y) {
                    embed.addField(`Module: ${y}`, commands1.filter(m => m.module == y).map(m => `\`${m.name}\``).join(", "))
                }
            } else {
                if(commands.size > 10) {
                    embed.setDescription(commands.map(m => `\`${m.name}\``).join(", "))
                } else {
                    for(const c of Array.from(commands.values())) {
                        embed.addField(c.name, !c.description ? "No description" : c.description)
                    }
                }
            }
            return embed
        }
        message.channel.send(h())
    }
}