let db = require("quick.db");
let Discord = require("discord.js");
let moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "plant",
  run: async function(client, message, args) {
    let cooldown = 6e5;
    let timeout = db.fetch(`plant_${message.author.id}`);

    const randomValue = [
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
      10,
      10,
      10,
      10,
      10,
      10,
      15,
      15,
      15,
      15,
      25,
      25,
      25,
      25,
      25,
      25,
      75,
      75,
      75,
      75,
      100,
      100,
      100,
      100,
      100,
      100,
      1000,
      1000,
      1000,
      1000
    ];

    const randomGrowth = [
      "lilac",
      "lilac",
      "lilac",
      "lilac",
      "lilac",
      "lilac",
      "lilac",
      "rose",
      "lily",
      "lily",
      "lily",
      "lily",
      "lily",
      "lily",
      "lily",
      "lily",
      "bonsai tree",
      "lotus",
      "cucumber",
      "cucumber",
      "cucumber",
      "cucumber",
      "cucumber",
      "cucumber",
      "daisy",
      "daisy",
      "daisy",
      "daisy",
      "daisy",
      "daisy",
      "daisy",
      "druid",
      "fairy",
      "error: null"
    ];

    const randomModifier = [
      "garbage",
      "garbage",
      "garbage",
      "garbage",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "iffy",
      "okay",
      "okay",
      "okay",
      "okay",
      "awesome",
      "awesome",
      "awesome",
      "godly"
    ];

    if (timeout !== null && cooldown - (Date.now() - timeout) > 0) {
      return message.channel.send(
        `You are on cooldown, please wait ${moment
          .duration(cooldown - (Date.now() - timeout))
          .format("H[h] m[m] s[s]")}`
      );
    } else {
      const modifier =
        randomModifier[Math.floor(Math.random() * randomModifier.length)];
      const growth =
        randomGrowth[Math.floor(Math.random() * randomGrowth.length)];
      if (modifier === "garbage") {
        let value = 0;
      } else {
        let value = randomValue[Math.floor(Math.random() * randomValue.length)];

        let itemName = modifier + " " + growth;

        let itemValue = "value = " + value + " crick";

        let itemModifier = "modifier = " + modifier;

        const embed = new Discord.RichEmbed()
          .setTitle(
            "new growth: ||" + growth + "|| attained and sold for " + value + " crick"
          )
          .addField(itemModifier, "---")
          .addField(itemValue, "---");
        
        

        console.log(
          message.author.username +
            " has sold a(n) " +
            itemName +
            " for " +
            itemValue
        );
        db.add(`balance_${message.author.id}`, value);
        message.channel.send(embed);
        db.push(`user.growths_${message.author.id}`, itemName)
        
        const _embed = new Discord.RichEmbed()
          .setTitle(
            "growths sold"
          )
        let array = Object.values(db.get('user.growths'))
        message.channel.send(array)
        db.subtract(`seeds_${message.author.id}`, 1);
        db.set(`plant_${message.author.id}`, Date.now());
      }
    }
  }
};
