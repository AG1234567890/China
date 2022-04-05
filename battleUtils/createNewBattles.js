const Battles = require("../models/battle");
const mongoose = require("mongoose")
const createNewBattles = async (sender) =>{
    const battle = new Battles({
        owner: sender,
        "Enemies Of the State": 1,
        "War on Taiwan": 1,
        "Battle Against the West": 1,
        "A Cold War": 1,
        "Cyber Showdown":1,
        "Workers of the World": 1,
        "John Xina Awakens": 1

  });
  await battle.save();
  return battle
}

module.exports = createNewBattles