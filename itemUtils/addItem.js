const Item = require("../models/item");
const User = require("../models/user");
const mongoose = require("mongoose")
const getUser = require("../moneyUtils/getUser")
const addItem = async (name,type,rarity,owner, ATK, STR, ID) =>{

    const item = new Item({
    name: name,
    type,
    rarity,
    owner,
    ATK,
    STR,
    ID
   
  });

  await item.save();
   await User.findOneAndUpdate({id: owner},{
        $inc: {items: 1}
    })
  return item
}

module.exports = addItem