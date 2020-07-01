const { MessageEmbed } = require("discord.js")
module.exports = { 
    name: "info",
    module: "utility",
    description: "Information about this bot",
    async run(message, args, client) {
        const ca = await client.fetchApplication()
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Information about the bot")
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        .setThumbnail(client.user.avatarURL())
        .setDescription(`Node.js ${process.version} | Discord.js v12`)
        .addField("Stats", `Servers: ${client.guilds.cache.size}\nUsers: ${client.guilds.cache.size}\nChannels: ${client.channels.cache.size}\nEmojis: ${client.emojis.cache.size}`)
        .addField("Owner", ca.owner.tag || ca.owner.members.map(m => m.user.tag).join(", "))
        .setFooter("Made with EasyDiscordJS, an easy utility library for Discord.JS")
        return message.channel.send(embed)
    }
}