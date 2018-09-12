const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = "!"

var eightball = [
    ":8ball: Yes",
    ":8ball: No",
    ":8ball: Maybe",
    ":8ball: Certain",
    ":8ball: Maybe?",
    ":8ball: probably",
    ":8ball: I don't think so.",
    ":8ball: never!",
    ":8ball: you can try...",
    ":8ball: up to you!",
    "https://i.imgur.com/CoWZ05t.gif **ITS TIME TO STOP**",
    ":8ball: Something I can't tell"
];

client.on("ready", function() { 
    client.user.setGame("Use !info") 
    console.log("Logged in as ${client.user.username}!") 
    });

client.on('ready', () => {
    console.log('Link: https://discordapp.com/oauth2/authorize?client_id=394681387942412289%20&scope=bot&permissions=8');
});

client.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "welcome-and-goodbyes").sendMessage(member.toString() + " **Welcome to the Discord Seever**");

    member.addRole(member.guild.roles.find("name", "Member"));
  });

  client.on("message", function(message) { 
    if (message.author.equals(client.user)) return; 

    if (!message.content.startsWith(PREFIX)) return; 

    var args = message.content.substring(PREFIX.length).split(" "); 
    var command = args[0].toLowerCase(); 
    var mutedrole = message.guild.roles.find("name", "muted");
    var mutedrole = message.guild.roles.find("name", "Muted");


    if (command == "say") {
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var sayMessage = message.content.substring(4)
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }

});

client.login(process.env.BOT_TOKEN);
