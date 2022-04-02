const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const mongoose = require("mongoose");
const addMoney = require("../moneyUtils/addMoney")
const dailyTicket = async (target) =>{
    const rando = Math.floor(Math.random() * 4)
    if(rando === 0) {
        //Free Money
        addMoney(target,10000)
        return "You recieved 10000 coins"
    } else if(rando===1) {
        await User.findOneAndUpdate({id: target},{
            $inc: {STR: 5}
        })
        return "You got a permanent buff of 5 strength"
    } else if(rando===2) {
        await User.findOneAndUpdate({id: target},{
            $inc: {DEF: 5}
        })
        return "You got a permanent buff of 5 defense"
    } else if(rando===3) {
        await User.findOneAndUpdate({id: target},{
            $inc: {HP: 10}
        })
        return "You got a permanent buff of 10 HP"
    }
}

module.exports = dailyTicket