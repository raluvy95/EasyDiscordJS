module.exports = {
    name: "ping",
    module: "utility",
    description: "Pong!",
    run(message, args, client) {
        message.channel.send(`Pong! ${client.ws.ping.toFixed(1)}ms`)
    }
}