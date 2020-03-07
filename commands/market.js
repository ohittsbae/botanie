
let db = require('quick.db');
let moment = require('moment')
require('moment-duration-format');

module.exports = {
name: "market",
run: async function(client, message, args) {
  
  const multiplier = [
    0,
    0,
    1,
    1,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    7,
    7,
    7,
    7,
    7,
    10,
    10,
    15,
    15,
    15,
    15,
    15,
    25,
    25,
    25,
    25,
    25,
    50,
    50,
    50,
    100,
    100,
    1000,
    10000
    
    
  ]
  
  const seedRand = [
    0,
    0,
    0,
    1,
    1,
    1,
    3,
    3,
    3,
    3,
    5,
    5,
    5,
    5,
    5,
    15,
    15,
    25,
    50,
    50
    
  ]

  let cooldown = 3e+5;
  let timeout = db.fetch(`market_${message.author.id}`);
  
  if(timeout !== null && cooldown - (Date.now() - timeout) > 0) {
return message.channel.send(`You are on cooldown, please wait ${moment.duration(cooldown - (Date.now() - timeout)).format("H[h] m[m] s[s]")}`)
  } else {
    const mult = Number(multiplier[Math.floor(Math.random() * multiplier.length)]);
    
    const seedAmt = parseInt(seedRand[Math.floor(Math.random() * seedRand.length)]);
    
    message.channel.send("You went to the market and sold your crops for " + mult + " crick, and returned with " + seedAmt + " seeds!")
    db.add(`balance_${message.author.id}`, mult);
    db.add(`seeds_${message.author.id}`, seedAmt);
    db.set(`market_${message.author.id}`, Date.now())
  }

}
}