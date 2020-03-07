const db = require('quick.db');

module.exports = {
  name: "sell",
  run: async (client, message, args) => {

 let itemName = args[0].toLowerCase();
  let item = db.fetch(`inv_${message.author.id}.${itemName}`)
  if(!item || item === null || !args.length) {
return message.channel.send("item doesnt exist dummy")
  } else {
    let quantity = item.quantity;
    if(quantity > 1) {
      db.add(`balance_${message.author.id}`, item.sellprice)
      db.subtract(`inv_${message.author.id}.${itemName}.quantity`, 1)
      message.channel.send(`You just sold ${item.name} for ${item.sellprice}$`)
    } else {
      db.add(`balance_${message.author.id}`, item.sellprice)
      db.delete(`inv_${message.author.id}.${itemName}`)
      message.channel.send(`You just sold ${item.name} for ${item.sellprice}$`)
    }
  }    
}
}