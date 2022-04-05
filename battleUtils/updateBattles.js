const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const mongoose = require("mongoose")
const updatedBattles = async (target, item) =>{
  const i = await Item.findOne({owner:target,ID:item})
  return i
}
//return true or false depending on if they have the item

module.exports = updateBattles