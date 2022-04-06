const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const addItem = require("../itemUtils/addItem")
const mongoose = require("mongoose");
const addMoney = require("../moneyUtils/addMoney")
const rareTicket = async (target) =>{
    const rando = Math.floor(Math.random() * 6)
    if(rando === 0) {
        //Free Money
        addMoney(target,100000)
        return "You recieved 100000 coins from the state"
    } else if(rando===1) {
        await User.findOneAndUpdate({id: target},{
            $inc: {STR: 25}
        })
        return "You got a permanent buff of 25 strength"
    } else if(rando===2) {
        await User.findOneAndUpdate({id: target},{
            $inc: {DEF: 25}
        })
        return "You got a permanent buff of 25 defense"
    } else if(rando===3) {
        await User.findOneAndUpdate({id: target},{
            $inc: {HP: 50}
        })
        return "You got a permanent buff of 50 HP"
    } else if(rando===4) {
        const user = await getUser(target)
        await addItem( "Super Idol Sword","Weapon","Rare",target,100,40,user.items)
        return "You recieved SUPER IDOL SWORD [R]"
    }else if(rando===5) {
        const user = await getUser(target)
        await addItem( "Ice Dragon Sword","Weapon","Rare",target,75,55,user.items)
        return "You recieved ICE DRAGON AXE [R]"
    }
}

module.exports = rareTicket