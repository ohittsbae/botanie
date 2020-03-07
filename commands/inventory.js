const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "inventory",
  run: async function(client, message, args) {

    let inventory = db.fetch(`inv_${message.author.id}`) || "no items in inventory"
    let array = Object.values(inventory)
    
   let embed = new Discord.RichEmbed()
   .setTitle(`${message.author.username}'s inventory`)
   
   array.forEach(a => {
     embed.addField(`${a.name} x${a.quantity}`, `Sell price: ${a.sellprice}`)
   })
    
  message.channel.send(embed);
    
  }
}