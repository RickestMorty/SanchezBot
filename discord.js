const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = ">"

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
client.user.setGame("Use >info") 
console.log("Booted up!") 
});

client.on('ready', () => {
    console.log('Link: https://discordapp.com/oauth2/authorize?client_id=380634112043515904&scope=bot&permissions=268435624');
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "main").sendMessage(member.toString() + " Welcome to the Discord :thinking:");
  
    member.addRole(member.guild.roles.find("name", "Members"));
   
    member.addRole(member.guild.roles.find("name", "Member"));
  });

client.on("message", function(message) { 
    if (message.author.equals(client.user)) return; 

    if (!message.content.startsWith(PREFIX)) return; 

    var args = message.content.substring(PREFIX.length).split(" "); 
    var command = args[0].toLowerCase(); 
    var mutedrole = message.guild.roles.find("name", "muted");
    var mutedrole = message.guild.roles.find("name", "Muted");

    if (command == "help") { 
        var embedhelpmember = new Discord.RichEmbed() 
            .setTitle("**List of Commands**\n") 
            .addField(" - help", "Displays this message (Correct usage: >help)") 
            .addField(" - info", "Tells info about myself :grin:") 
            .addField(" - ping", "Tests your ping (Correct usage: >ping)") 
            .addField(" - 8ball", "Answers to all of your questions! (Correct usage: >8ball [question])") 
            .setColor(0xFFA500) 
            .setFooter("You need help, do you?") 
            message.channel.send(embedhelpmember); 
            if(message.member.roles.some(r=>["bot-admin"].includes(r.name)) ) return message.channel.send(embedhelpadmin); 
    }

    if (command == "helpop") {
        var embedhelpadmin = new Discord.RichEmbed()
            .setTitle("**List of Admin Commands**\n") 
            .addField(" - helpop", "Displays this message (Correct usage: >helpop)") 
            .addField(" - say", "Makes the bot say whatever you want (Correct usage: >say [message])")
            .addField(" - mute", "Mutes a desired member with a reason (Coorect usage: >mute @username [reason])") 
            .addField(" - unmute", "Unmutes a muted player (Correct usage: >unmute @username)")
            .addField(" - kick", "Kicks a desired member with a reason (Correct usage: >kick @username [reason])")
            .addField(" - ban", "Bans a desired member with a reason (Correct usage: >ban @username [reason])")  
            .addField(" - say", "Makes me say anything in your desire (Correct usage: >say [message])") 
            .setColor(0xFF0000) 
            .setFooter("Ooo, an admin!")
        message.channel.send(embedhelpmember); 
        if(message.member.roles.some(r=>["bot-admin"].includes(r.name)) ) return message.channel.send(embedhelpadmin); 
    }

    if (command == "info") {
        message.channel.send("Hey! My name is **SanchezC-137** and I'm here to assist you! You can do ***>help*** to see all of my commands! :smile:")
    }

    if (command == "ping") { 
        message.channel.send("Pong!"); 
    }

    if (command == "8ball") { 
        if (args[1] != null) message.reply(eightball[Math.floor(Math.random() * eightball.length).toString(16)]); 
        else message.channel.send("Ummmm, what is your question? :rolling_eyes: (Correct usage: >8ball [question])"); 
    }

    if (command == "say") {
        if (!message.member.roles.some(r=>["bot-admin"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var sayMessage = message.content.substring(4)
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }

    if (command == "mute") { 
        if (!message.member.roles.some(r=>["bot-admin"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var mutedmember = message.mentions.members.first(); 
        if (!mutedmember) return message.reply("Please mention a valid member of this server!") 
        if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("I cannot mute this member!")
        var mutereasondelete = 10 + mutedmember.user.id.length
        var mutereason = message.content.substring(mutereasondelete).split(" ");
        var mutereason = mutereason.join(" ");
        if (!mutereason) return message.reply("Please indicate a reason for the mute!") 
        mutedmember.addRole(mutedrole) 
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`));
        message.reply(`${mutedmember.user} has been muted by ${message.author} Reason: ${mutereason}`); 
    }

    if (command == "unmute") { 
        if (!message.member.roles.some(r=>["bot-admin"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var unmutedmember = message.mentions.members.first();
        if (!unmutedmember) return message.reply("Please mention a valid member of this server!")
        unmutedmember.removeRole(mutedrole)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); 
        message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`);
    }

    if (command == "kick") { 
        if (!message.member.roles.some(r=>["bot-admin"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); 
        var kickedmember = message.mentions.members.first(); 
        if (!kickedmember) return message.reply("Please mention a valid member of this server!") 
        if (!kickedmember.kickable) return message.reply("I cannot kick this member!") 
        var kickreasondelete = 10 + kickedmember.user.id.length 
        var kickreason = message.content.substring(kickreasondelete).split(" "); 
        var kickreason = kickreason.join(" "); 
        if (!kickreason) return message.reply("Please indicate a reason for the kick!")
        kickedmember.kick(kickreason) 
            .catch(error => message.reply(`Sorry @${message.author} I couldn't kick because of : ${error}`)); 
        message.reply(`${kickedmember.user.username} has been kicked by ${message.author.username} Reason: ${kickreason}`); 
    }

    if (command == "ban") { 
        if (!message.member.roles.some(r=>["bot-admin"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); 
        var bannedmember = message.mentions.members.first(); 
        if (!bannedmember) return message.reply("Please mention a valid member of this server!") 
        if (!bannedmember.bannable) return message.reply("I cannot ban this member!") 
        var banreasondelete = 10 + bannedmember.user.id.length 
        var banreason = message.content.substring(banreasondelete).split(" "); 
        var banreason = banreason.join(" "); 
        if (!banreason) return message.reply("Please indicate a reason for the ban!")
        bannedmember.ban(banreason) 
            .catch(error => message.reply(`Sorry @${message.author} I couldn't ban because of : ${error}`)); 
        message.reply(`${bannedmember.user.username} has been banned by ${message.author.username} Reason: ${banreason}`); 
    }

});

client.login(process.env.BOT_TOKEN);
