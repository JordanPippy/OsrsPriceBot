require('dotenv').config();
const Discord = require('discord.js');
var request = require("request");
var fs = require("fs");
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;
const linkHead = "https://oldschool.runescape.wiki/w/";
var price = "";
bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', msg => {
    //Check if message was for the bot.
    let message = "";
    if (msg.content[0] === '#') {
        message = msg.content.split(' ');
        if (message[0] !== "#pc")
            return;
    }
    else 
        return;

    //After this point, the message was recognized, bot is working.
    let item = "";
    for (let i = 1; i < message.length; i++) {  
        if (i != 1)
            item += ' ';
        item += message[i];
    }
    visitLink(item, msg);
});
function sendMessage(msg, data) {
    msg.channel.send(data);
}
function createLink(link) {
    let fullLink = link.replace(/ /g, '_');
    fullLink = linkHead + fullLink;
    return fullLink;
}

function visitLink(link, msg) {
    let fullLink = createLink(link);
    request({uri: fullLink}, 
        function(error, response, body) {
        let index = body.indexOf("data-val-each");
        console.log("index: " + index);
        price = "";
        while (true)
        {
            let c = body.charAt(index);
            if (c != '>')
                price += c;
            else 
                break;
            index++;
        }
        price = price.split('=');
        price =(price[1]).substring(1, price[1].length - 1);
        console.log("price before return: " + price);
        sendMessage(msg, price);
    });
}
