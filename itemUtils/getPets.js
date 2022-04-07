const User = require("../models/user");
const Pet = require("../models/pet")
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const mongoose = require("mongoose")
const getPets = async (target) =>{
 const pets = await Pet.find({owner:target})
 let inv = ""
 for (i=0;i<pets.length;i++ ){
    console.log(pets[i].Name+"["+pets[i].id+"]")
    inv = inv.concat(pets[i].Name+"["+pets[i].id+"], ")
 }
 return inv
}
//return true or false depending on if they have the item

module.exports = getPets