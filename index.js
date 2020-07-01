const fs = require("fs")
const { Message, Client } = require("discord.js")
class DiscordAPIError extends Error {
    constructor(message) {
        super(message)
        this.name = "DiscordAPIError"
    }
}

class EasyDiscordJS {
    /**
     * @param {Client} client 
     * @param {{prefix: String}} options
     * @returns {EasyDiscordJS}
     */
    constructor(client, options= {}) {
        if(!client) throw new ReferenceError("client property is required")
        this.client = client
        this.options = options
        if(!this.options.prefix) throw new ReferenceError("prefix is required")
        this.mod = require("./src/moderator")
        this.util = require("./src/core")
        this.commands = client.commands || new Map()
        this.client.isModule = false
        this.cooldown = client.cooldown || new Map()
    }
    /**
     * Load one command.
     * Make sure your JS file should look like this
     * ```js
     * module.exports = {
     *    name: "commandName",
     *    run: (message, args, client) => {
     *        // puts an execute here to run a command
     *    }
     * }
     * ```
     * @param {String} path 
     * @param {Array<String>} ignore
     * @returns {void}
     */
    loadCommand(path, ignore=[]) {
        try {
            const command = require(path)
            if(ignore.includes(command.name)) return
            this.commands.set(command.name, command)
            console.log(`Command ${command.name} is loaded!`)
        } catch(e) {
            console.log(`There was an problem whle loading from ${path}. Skipped\n${e}`)
        }
    }
    /**
     * Load commands in a specific directory.
     * Make sure your JS file should look like this
     * ```js
     * module.exports = {
     *    name: "commandName",
     *    run: (message, args, client) => {
     *        // puts an execute here to run a command
     *    }
     * }
     * ```
     * @param {String} path 
     * @param {Boolean} module
     * @param {Array<String>} ignore
     * @returns {void}
     */
    loadCommands(path, module=false, ignore="_") {
        const f = fs.readdirSync(path).filter(m => !m.startsWith(ignore))
        if(module) { 
            this.client.isModule = true 
            this.client.modulePath = path
        }
        for(const modules of f) {
            if(module) {
                const cmd = fs.readdirSync(`${path}/${modules}`).filter(m => !m.startsWith(ignore))
                for(const comma of cmd) {
                    this.loadCommand(`${path}/${modules}/${comma}`)
                }
            } else {
                this.loadCommand(`${path}/${modules}`)
            }
        }
    }
    /**
     * Get arguments
     * @param {Message} message 
     * @param {String} prefix
     * @returns {Array<String>}
     */
    getArgs(message, prefix=this.options.prefix) {
        return message.content.slice(prefix.length).split(" ")
    }
    /**
     * Load from EasyDiscordJS's basic commands
     * @param {Array<String>} ignore
     * @returns {void}
     */
    loadBasicCommands(ignore=['eval']) {
        console.log("\nLoading from Basic Commands")
        const m = fs.readdirSync(__dirname + "/src/basic")
        for(const cmds of m) {
            this.loadCommand(`${__dirname}/src/basic/${cmds}`, ignore)
        }
    }
    /**
     * Fetch all the bot's commands
     * @returns {Map<String, {}>}
     */
    get allCommands() {
        return this.commands
    }
    /**
     * Set the bot's playing status
     * @param {String | Array} playing
     * @param {{type: string, timeout: Number}} options
     * @returns {void}
     */
    setPlaying(playing, options={type: "PLAYING"}) {
        if(!playing) throw new ReferenceError("Playing must be attribute")
        if(typeof playing == "string") {
            delete options.timeout
            this.client.user.setActivity(playing)
        } else if(playing instanceof Array) {
            const t = options.timeout
            delete options.timeout
            if(t) {
                if(t < 16000) throw new DiscordAPIError("Under than 16 seconds is breaking the rate limit.")
            }
            setInterval(() => {
                const r = Math.floor(Math.random * playing.length)
                this.client.user.setActivity(playing[r])
            }, t || 16000)
        } else throw new TypeError("Must be string or array.")
    }
}

module.exports = EasyDiscordJS