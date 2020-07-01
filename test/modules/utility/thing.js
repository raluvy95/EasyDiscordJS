module.exports = {
    name: "test",
    module: "utility",
    run(message, args, client) {
        client.easy.mod.kick(message, args).then(m => {
            console.log(m)
            message.channel.send("Kicked :)")
        }).catch(e => message.channel.send(e))
    }
}