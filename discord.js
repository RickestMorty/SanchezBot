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
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " **Welcome to 𝐵adMemory's Discord**");

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
            .setAuthor("𝒯𝒶𝒸𝑜𝐵𝑜𝓉", "https://cdn.discordapp.com/avatars/214805479271038976/82bffc46c1a6bce6e300aa8d971f5271.png")
            .addField(" - help", "Displays this message (Correct usage: !help)") 
            .addField(" - rules", "Displays the rules of 𝐵adMemory's Discord")           
            .addField(" - info", "Tells information about myself") 
            .addField(" - ping", "Tests your ping (Correct usage: !ping)") 
            .setColor(0x00AE86) 
            .setFooter("𝒯𝒶𝒸𝑜's Discord™") 
            message.channel.send(embedhelpmember); 
            if(message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.channel.send(embedhelpadmin); 
    }

    if (command == "helpop") {
        var embedhelpadmin = new Discord.RichEmbed()
            .setTitle("**List of Staff Commands**\n") 
            .setAuthor("𝒯𝒶𝒸𝑜𝐵𝑜𝓉", "https://cdn.discordapp.com/avatars/214805479271038976/82bffc46c1a6bce6e300aa8d971f5271.png")
            .addField(" - helpop", "Displays this message (Correct usage: !helpop)") 
            .addField(" - say", "Makes the bot say whatever you want (Correct usage: !say [message])")
            .addField(" - mute", "Mutes a desired member with a reason (Coorect usage: !mute @username [reason])") 
            .addField(" - unmute", "Unmutes a muted player (Correct usage: !unmute @username)")
            .addField(" - kick", "Kicks a desired member with a reason (Correct usage: !kick @username [reason])")
            .addField(" - ban", "Bans a desired member with a reason (Correct usage: !ban @username [reason])")  
            .addField(" - say", "Makes me say anything in your desire (Correct usage: !say [message])") 
            .setColor(0x00AE86) 
            .setFooter("𝒯𝒶𝒸𝑜's Discord™")
        message.channel.send(embedhelpmember); 
        if(message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.channel.send(embedhelpadmin); 
    }

    if (command == "info") {
        message.channel.send("Hey! I'm **𝒯𝒶𝒸𝑜𝐵𝑜𝓉** and I'm here to give you a hand! You can do ***!help*** to see all of my commands!")
    }

    if (command == "ping") { 
        message.channel.send("Pong!"); 
    }

    if (command == "say") {
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var sayMessage = message.content.substring(4)
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }

    if (command == "mute") { 
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
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
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var unmutedmember = message.mentions.members.first();
        if (!unmutedmember) return message.reply("Please mention a valid member of this server!")
        unmutedmember.removeRole(mutedrole)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); 
        message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`);
    }

    if (command == "rules") {
        var embedhelpmember = new Discord.RichEmbed()
        .setTitle("**Welcome to BadMemory's Discord**")
        .setAuthor("𝒯𝒶𝒸𝑜𝐵𝑜𝓉", "https://cdn.discordapp.com/avatars/214805479271038976/82bffc46c1a6bce6e300aa8d971f5271.png")
        .setDescription("This is a friendly community, have fun, but keep it friendly!")   
        .addField(" Feel free to introduce yourself!", " :nerd: Just some quick rules for you")
            .addField(" ⠀⠀⠀⠀⠀⠀", "**-----------------------------------------------------------------------**")
            .addField(" - *1) No Recording or anything that violates the privacy rules(except for livestreams, but you must set [live] in your name & you have to ask permission to the people in your channel). (Recording is allowed when everyone agrees.)*", " - *2) No mute abuse. @everyone *")
            .addField(" - *3) Respect the admins and members!*", " - *4) Do not copy names. For example: Nickname1, Nickname2, etc.*")
            .addField(" - *5) Do not spam or bother others user with Poke and messages. (Channelhopping is also spam!)*", " - *6) Voice convertors are not allowed.*")
            .addField(" - *7) The channel admin has the responsibility for the channel/server. If you have problems, contact the admin in charge.", " - *8) This page does not cover all the rules; only the basic ones. If an admin finds an unfitting behavior he will moderate it accordingly.*")
            .addField(" - *9) No racism, racism will provide you an instant perm ban.*", " - *10) No verbal abuse.*")
            .addField(" - *11) All recist, right-wing and sexually questionable statements to refrain in any case and will not be tolerated in principle.*", " - *12) Attacks against the server with so-called ''Flood-tools'' are strictly prohibited and will, where appropriate, prosecuted by the provider.*")
            .addField(" - *13) Please use a name that others will be able to recognize you as from in-game. Do not use fake nickname.*", " *14) Don't send links to scam websites, porn websites, phishing websites or anything that can harm the user's computer or are considered inappropriate as we want the users on the Discord server to feel safe while being on it.*")
            .addField(" - *15) Joining channels that you do not usually associate with for the purpose of trolling is also not permitted.*", " - *16) NO advertising of any kind on our Discord server, This includes links to sites that earn you money. Admins decide what is allowed and what is not. DONT asume anything check with an admin first.*")
            .addField(" - *17) Do not link external website or images that included sexual, racist, violent, disturbing or inappropiate content.*", " **-----------------------------------------------------------------------**")
            .setColor(0x00AE86) 
            .setFooter("𝒯𝒶𝒸𝑜𝐵𝑜𝓉's Discord™")
        message.channel.send(embedhelpmember); 
        if(message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.channel.send(embedhelpadmin); 
    }

    if (command == "8ball") { 
        if (args[1] != null) message.reply(eightball[Math.floor(Math.random() * eightball.length).toString(16)]); 
        else message.channel.send("Ummmm, what is your question? :rolling_eyes: (Correct usage: >8ball [question])"); 
    }
    
    if (command == "kick") { 
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); 
        var kickedmember = message.mentions.members.first(); 
        if (!kickedmember) return message.reply("Please mention a valid member of this server!") 
        if (!kickedmember.kickable) return message.reply("I cannot kick this member!") 
        var kickreasondelete = 10 + kickedmember.user.id.length 
        var kickreason = message.content.substring(kickreasondelete).split(" "); 
        var kickreason = kickreason.join(" "); 
        if (!kickreason) return message.reply("Please indicate a reason for the kick!")
        kickedmember.kick(kickreason) 
            .catch(error => message.reply(`Sorry, I couldn't kick because of : ${error}`)); 
        message.reply(`${kickedmember.user.username} has been kicked by ${message.author.username} Reason: ${kickreason}`); 
    }

    if (command == "ban") { 
        if (!message.member.roles.some(r=>["staff", "Staff"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); 
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
