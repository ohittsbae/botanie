let db = require('quick.db');
let Discord = require('discord.js')

module.exports = {
  name: "balance",
  run: async function(client, message, args) {
    let user = message.mentions.users.first() || message.author;
    
    let balance = db.fetch(`balance_${user.id}`) || 0;
    
    message.channel.send(`${user} has ${balance} crick`)
  }
}