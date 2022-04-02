const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const mongoose = require("mongoose");
const dailyTicket = require("../use/dailyTicket")
const removeItem = async (target, item) =>{



const deletedItem = await Item.findOneAndDelete({id:item, owner: target})
// console.log(deletedItem)
// if(typeof(deletedItem.name) !== "undefined"){
//     return deletedItem.name
// } else {
//     return "Nothing"
// }

// 
//console.log(" "+deletedItem)
// if(deletedItem.name.toUpperCase() === "Daily Ticket"){
//     dailyTicket(target)
// }

return deletedItem
}

module.exports = removeItem