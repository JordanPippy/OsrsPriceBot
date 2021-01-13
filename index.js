require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', msg => {
    //Check if message was for the bot.
    if (msg.content[0] === '#') {
        let message = msg.content.split(' ');
        if (message[0] !== "#pc")
            return;
    }
    
    //After this point, the message was recognized, bot is working.
    let item = "";
    for (let i = 1; i < message.length; i++) {  
        if (i != 1)
            item += ' ';
        item += message[i];
    }
    console.log(item);
    msg.channel.send('pong');
});