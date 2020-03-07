let db = require('quick.db');

module.exports = {
  name: "buy",
  run: async (client, message, args) => {
    
    let itemName = args[0].toLowerCase();
    let item = client.shop.get(itemName);
    let userbal = db.fetch(`balance_${message.author.id}`)
    if(!item || !args.length || item === null) {
      return message.channel.send("Item not found")
    } else {
      
      let q = db.fetch(`inv_${message.author.id}.${item.id}.quantity`) || 0;
      db.set(`inv_${message.author.id}.${item.id}`, {
        name: item.name,
        id: item.id,
        quantity: q + 1,
        sellprice: Math.floor(item.cost / 2)
      })   
      if(item.sellprice > userbal)
        return message.channel.send('git gud. you no have money');
      db.subtract(`balance_${message.author.id}`, item.cost);
      message.channel.send(`You bought ${item.name} for ${item.cost}$`);
    }
    
  }
}