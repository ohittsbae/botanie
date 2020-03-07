let Discord = require('discord.js')

module.exports = {
name: "shop",
run: async (client, message, args) => {
  
const embed = new Discord.RichEmbed()
.setTitle('shop')

client.shop.forEach(a => {
  embed.addField(a.name, `${a.description}\nCost: ${a.cost}\nid: ${a.id}`,)
})
  
  message.channel.send(embed)
  }
}