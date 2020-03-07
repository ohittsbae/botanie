module.exports = {
  name: "lb",
  run: async (client, message, args) => {
    
    let db = require('quick.db');
    let lb = db.all().filter(a => a.ID.startsWith('balance_')).sort((a, b) => b.data - a.data);
    
    let i = 0;
    let place = 1;
    let txt = "";
    
    for(i in lb) {
      txt += `${place++}. <@${lb[i].ID.split('_')[1]}> - ${lb[i].data} crick\n`;
    }
    
    message.channel.send(txt)
    
    let _lb = db.all().filter(a => a.ID.startsWith('seeds_')).sort((a, b) => b.data - a.data);
    
    
    let _i = 0;
    let _place = 1;
    let _txt = "";
    
    for(_i in _lb) {
      _txt += `${_place++}. <@${_lb[_i].ID.split('_')[1]}> - ${_lb[_i].data} seeds\n`;
    }
    
    message.channel.send(_txt)
    
  }
  
  
}