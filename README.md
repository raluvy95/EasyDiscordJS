# easydiscord.js
An easy utility for Discord.js Bots! It includes some useful function-only utilits such as `loadCommand`, `getArgs` and `getMember`/`getRole`
# Table of Elements
* [Examples](#example)
* [Documents](#documents)
# Example
### Quick Example
```js
const Discord = require("discord.js")
const client = new Discord.Client()
const EasyDiscordJS = require("easydiscord.js")
client.easy = new EasyDiscordJS(client, {prefix="!"})
client.easy.loadBasicCommands()
client.on("message", message => {
    const args = client.easy.getArgs(message)
    const commandName = args.shift()
    const command = client.easy.commands.get(commandName)
    if(!command) return 
    command.run(message, args, client)
})
client.login("token")
```

### Using our utility
```js
module.exports = {
    // The command's name
    name: "member",
    // run function must be defined and should use these
    run(message, args, client) {

        // We gonna fetch a member using our library
        const member = client.easy.util.getMember(message, args)

        // if the member is not found or invalid, it will return with null
        if(!member) return message.reply("I cannot find a member!")

        //We can now access to GuildMember class!
        message.channel.send(`The member's tag is ${member.user.tag}! `)

    }
}
```

### Load commands
You can load a file 
```js
client.easy.loadCommand("ping.js")
```
Load files from a specific directory
```js
client.easy.loadCommands("./commands")
```
this should look like this<br>
* commands/
   * ping.js
   * help.js
* index.js

`loadCommands` supported with module. It's similar to one directory above, but with another directories
* modules/
   * fun/
        * rps.js
        * guess.js
    * moderator/
        * kick.js
        * ban.js
        * mute.js
* index.js
```js
client.easy.loadCommands("./modules", module=true)
```
### Moderator Helper
```js
module.exports = {
    name: "ban",
    run: async (message, args, client) {
        // don't worry, this will check the arguments of member. 
        // if args is input
        // The action will ignore if the member has Administrator access
       await client.easy.mod.ban(message, args)
       // or 
       await client.easy.mod.ban(message, args, {
           banUser: true, // can add user ID to server ban list,
           // even the member isn't in the server.
           bypassAdmin: true // ban a member with Administrator access
           // not recommend due to security
        })
    }
}
```
# Documents

# Download
The library can be download via [npm](https://www.npmjs.com/package/@therealraluvy/easydiscord.js)
```
npm i @therealraluvy/easydiscord.js
```

