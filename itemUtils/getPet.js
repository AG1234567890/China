const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const mongoose = require("mongoose");
const Pet = require("../models/pet");
const getPet = async (target, pet) =>{
  const i = await Pet.findOne({owner:target,id:pet})
  return i
}
//return true or false depending on if they have the item

module.exports = getPet