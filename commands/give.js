let db = require('quick.db')

module.exports = {
  name: "give",
  run: async (client, message, args) => {
    
    let user = message.mentions.users.first() || message.author;
    let amount = args.slice(1).join(' ');
    let userbal = db.fetch(`seeds_${message.author.id}`)
    
    if(!amount || isNaN(amount) || amount < 0)
      return message.channel.send("a valid number is required");
    if(!user) return message.channel.send("a valid user is required");
    if(amount > userbal) return message.channel.send("you don't have that many seeds. try a smaller amount");
    
    db.add(`seeds_${user.id}`, amount)
    db.subtract(`seeds_${message.author.id}`, amount)
    message.channel.send(`you sucsesfully gave ${user.username} ${amount} seeds`)
  }
}