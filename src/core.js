const { Message, Role, GuildMember } = require("discord.js")
module.exports = {
    /** 
     * Fetch a member
     * @param message {Message}
     * @param args {Array}
     * @returns {GuildMember}
    */
    getMember(message, args) {
        let m = message.mentions.members.first()
        if(!m) {
            m = message.guild.members.cache.find(m => m.user.username == args.join(" ") || m.user.id == args[0] || m.user.tag == args.join(" "))
            if(!m) return null
        }
        return m
    },
    /** 
     * Fetch a role
     * @param message {Message}
     * @param args {Array}
     * @returns {Role}
    */
    getRole(message, args) {
        let m = message.mentions.roles.first()
        if(!m) {
            m = message.guild.roles.cache.find(m => m.name == args.join(" ") || m.id == args)
            if(!m) return null
        }
        return m
    }
}