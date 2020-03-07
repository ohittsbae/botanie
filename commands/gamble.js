let db = require("quick.db");
let Discord = require("discord.js");
let moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "gamb",
  run: async function(client, message, args) {
    let cooldown = 3e+4;
    let timeout = db.fetch(`gamb_${message.author.id}`);
    let userbal = db.fetch(`balance_${message.author.id}`)
    
    const values = [
      -10,
      -10
      -10,
      -10,
      -15,
      -15,
      -30,
      -50,
      -100,
      -1000,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
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
      5,
      5,
      5,
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
      7,
      7,
      7,
      7,
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
      10000,
      1000000
    ];
    
    let gamb = 35;
    
    if (userbal < gamb) 
      return message.channel.send('not enough money to gamble, try again later');
    
    if(timeout !== null && cooldown - (Date.now() - timeout) > 0) {
return message.channel.send(`You are on cooldown, please wait ${moment.duration(cooldown - (Date.now() - timeout)).format("H[h] m[m] s[s]")}`)
  } else {
    const value = values[Math.floor(Math.random() * values.length)];
    
    const earn = value - gamb;
    
    message.channel.send('you gambled 35 crick and gained ' + earn + ' crick!')
    
    db.add(`balance_${message.author.id}`, earn)
    db.subtract(`balance_${message.author.id}`, gamb)
    db.set(`gamb_${message.author.id}`, Date.now())
  }
  }
};
