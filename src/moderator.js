const { getMember } = require("./core.js")
const ms = require("ms")
const { Message, GuildMember, Role, TextChannel, User } = require("discord.js")
module.exports = {
    /**
     * Kick a member
     * @param message {Message}
     * @param args {Array}
     * @param options {{reason: String, bypassAdmin: Boolean}}
     * @returns {Promise<GuildMember>}
     */
    kick(message, args, options={}) {
        return new Promise(
            (res, rej) => {
                const member = getMember(message, args)
                if(!member) {
                    return rej("The member is not found")
                }
                if(!options.bypassAdmin) {
                    if(member.hasPermission("ADMINISTRATOR")) return rej("I don't allow to kick the administrator")
                }
                return member.kick(options.reason).then(m => res(m)).catch(m => rej(m))
            }
        )
    },
    /**
     * Ban a member
     * @param message {Message}
     * @param args {Array}
     * @param {{reason: String, banUser: Boolean, bypassAdmin: Boolean}} options
     * @returns {Promise<GuildMember>}
     */
    ban(message, args, options={}) {
        return new Promise(
            (res, rej) => {
                const member = getMember(message, args)
                if(!member) {
                    if(options.banUser) {
                        if(isNaN(args[0])) return rej("User ID must be number")
                        return message.guild.ban(args[0]).then(m => res(m)).catch(m => rej(m))
                    } else {
                        return rej("The member is not found")
                    }
                }
                if(!options.bypassAdmin) {
                    if(member.hasPermission("ADMINISTRATOR")) return rej("I don't allow to ban the administrator")
                }
                return member.ban(options.reason).then(m => res(m)).catch(m => rej(m))
            }
        )
    },
    /**
     * Mute a member
     * @param message {Message}
     * @param args {Array}
     * @param options {{reason: String, timeout: String | Number, role: Role}}
     * @returns {Promise<Role>}
     */
    mute(message, args, options={}) {
        return new Promise(
            (res, rej) => {
                const member = getMember(message, args)
                if(!member) return rej("The member is not found")
                if(!options.bypassAdmin) {
                    if(member.hasPermission("ADMINISTRATOR")) return rej("I don't allow to ban the administrator")
                }
                const role = options.role || message.guild.roles.cache.find(m => m.name == "Muted")
                if(options.timeout) {
                    let t = options.timeout
                    if(typeof t != "number") t = ms(t)
                    setTimeout(() => {
                        member.roles.remove(role).then(m => res(m)).catch(m => rej(m))
                    }, t)
                }
                return member.roles.add(role).then(m => res(m)).catch(m => rej(m))
            }
        )
    },
    /**
     * Purge any messages
     * @param message {Message}
     * @param number {Number}
     * @param {{channel: TextChannel, filterOld: Boolean}} options
     * @returns {Promise<TextChannel>}
     */
    purge(message, number=10, options={}) {
        return new Promise(
            (res, rej) => {
                const channel = options.channel || message.channel
                return channel.bulkDelete(Number(number), options.filterOld).then(m => res(m)).catch(m => rej(m))
            }
        )
    },
    /**
     * Unban a user
     * @param message {Message}
     * @param args {Array}
     * @returns {Promise<User>}
     */
    unban(message, args) {
        return new Promise(
            (res, rej) => {
                if(!isNaN(args[0])) {
                    message.guild.fetchBan(args[0]).then(m => {
                       return message.guild.members.unban(m.user).then(m => res(m)).catch(m => rej(m))
                    })
                } else {
                    return rej("User ID must be number")
                }
            }
        )
    }
} 