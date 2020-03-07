var Discord = require('discord.js');
var client = new Discord.Client();
var fs = require('fs');
client.commands = new Discord.Collection();
client.shop = new Map();
client.history = new Map();
let items = require('./items.json')


const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);



var prefix = ".";

const files = fs.readdirSync('./commands').filter(f => f.endsWith('js'));

for(const file of files) {
  let command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

items.forEach(a => {
  client.shop.set(a.id, a)
  console.log(`Loaded item ${a.id}!`)
})

client.on('ready', function() { 
  console.log("I am ready!");
});

client.on('guildMemberAdd', function(member) {
  let channel = member.guild.channels.find(c => c.name === "welcome")
  channel.send(`${member} just joined the server!`)
})

client.on('message', async function(message) {  
  if(!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let commandName = args.shift().toLowerCase();
  if(!client.commands.has(commandName)) return;
  let command = client.commands.get(commandName)
  
  try {
    command.run(client, message, args);
  } catch (e) {
   return message.channel.send("oh no, an error!!!")
   console.log(e)
  }
  
});

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
    client.user.setActivity(`the sound of the rain`, { type: 'LISTENING' });
});

client.login(process.env.TOKEN);