const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const mongoose = require("mongoose")
const getInventory = async (target) =>{
 const items = await Item.find({owner:target})
 let inv = ""
 for (i=0;i<items.length;i++ ){
    console.log(items[i].name+"["+items[i].ID+"]")
    inv = inv.concat(items[i].name+"["+items[i].ID+"], ")
 }
 return inv
}
//return true or false depending on if they have the item

module.exports = getInventory