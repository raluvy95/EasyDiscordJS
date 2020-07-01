module.exports = {
    name: "eval",
    description: "Execute a JavaScript code.",
    async run(message, args, client) {
        const ca = await client.fetchApplication()
        const user = ca.owner.user ? ca.owner.user.id : ca.owner.owner
        if(message.author.id == user.id) {
            const clean = text => {
                if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else return text;
            }
            try {
                const code = args.join(" ");
                let evaled = eval(code);
                if (typeof evaled !== "string") {
                    evaled = require("util").inspect(evaled);
                }
                return message.channel.send(clean(evaled), {code:"js"});
            } catch (err) {      
                return message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
            }
        } else return message.channel.send("Only ownership can do!")
    }
}