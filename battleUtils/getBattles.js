const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const mongoose = require("mongoose");
const Battles = require("../models/battle");

const getBattles = async (target) =>{
 
    const battles = Battles.findOne({owner: target}).exec();

    return battles
}




module.exports = getBattles