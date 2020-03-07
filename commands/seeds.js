let db = require('quick.db');
let Discord = require('discord.js')

module.exports = {
  name: "seeds",
  run: async function(client, message, args) {
    let user = message.mentions.users.first() || message.author;
    
    let seeds = db.fetch(`seeds_${user.id}`) || 0;
    
    message.channel.send(`${user} has ${seeds} seeds`)
  }
}