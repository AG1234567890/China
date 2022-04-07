const Item = require("../models/item");
const Pet = require("../models/pet")
const User = require("../models/user");
const mongoose = require("mongoose")
const getUser = require("../moneyUtils/getUser")
const addPet = async (Name,rarity,owner, ATK, STR,DEF, SPD) =>{

    const pet = new Pet({
    id: Math.floor(Math.random()*100000),

    rarity,
    owner,
    ATK,
    STR,
    DEF,
    SPD,
    Name
    
   
  });

  await pet.save();

  return pet
}

module.exports = addPet