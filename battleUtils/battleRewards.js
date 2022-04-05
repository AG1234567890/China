const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const mongoose = require("mongoose");
const addMoney = require("../moneyUtils/addMoney")
const addItem = require("../itemUtils/addItem")

const battleRewards = async (target,stage) =>{
    const rando = Math.floor(Math.random() * 4)
    const user = await getUser(target)
    if(rando === 0) {
        //Free Money
        const money = stage*1000
        await addMoney(target,stage*1000)
        return "You recieved "+money+" coins for winning"
    } else if(rando===1) {
        await addItem( "Rare Ticket","Ticket","Rare",target,0,0,user.items)
        return "You got a rare ticket for winning"
    } else if(rando===2) {
        await User.findOneAndUpdate({id: target},{
            $inc: {DEF: 10}
        })
        return "You got a permanent buff of 10 defense"
    } else if(rando===3) {
        await User.findOneAndUpdate({id: target},{
            $inc: {HP: 20}
        })
        return "You got a permanent buff of 20 HP"
    }
}

module.exports = battleRewards