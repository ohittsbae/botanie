let db = require('quick.db');
let moment = require('moment')
require('moment-duration-format');

module.exports = {
name: "daily",
run: async function(client, message, args) {

  let cooldown = 8.64e+7
  let timeout = db.fetch(`daily_${message.author.id}`)
  
  if(timeout !== null && cooldown - (Date.now() - timeout) > 0) {
return message.channel.send(`You are on cooldown, please wait ${moment.duration(cooldown - (Date.now() - timeout)).format("H[h] m[m] s[s]")}`)
  } else {
    message.channel.send("You just collected your daily reward, and earned " + 1000 + " crick and " + 5 + " seeds")
    db.add(`balance_${message.author.id}`, 1000);
    db.add(`seeds_${message.author.id}`, 5);
    db.set(`daily_${message.author.id}`, Date.now())
  }

}
}