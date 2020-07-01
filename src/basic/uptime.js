const ms = require("ms")
module.exports = {
    name: "uptime",
    module: "utility",
    description: "Show a time of bot online",
    run(message, args, client) {
        const time = ms(client.uptime, {long: true})
        message.channel.send(`The bot has been up for ${time}`)
    }
}