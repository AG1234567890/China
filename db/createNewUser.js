const User = require("../models/user");
const mongoose = require("mongoose")
const createNewUser = async (sender) =>{
    const user = new User({
    id: sender,
    coins: 0,
    socialCredit: 0,
    job: "None",
    bank: 0,
    bankMax: 100000,
      HP:100,
      STR: 0,
      DEF: 0,
    items: 0,
    MainWeapon:"",
    Armor: "",
    Pet: -1,
    Lock:"Padlock"

  });
  await user.save();
  return user
}

module.exports = createNewUser