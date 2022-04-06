const User = require("../models/user");
const Item = require("../models/item")
const getUser = require("../moneyUtils/getUser")
const addItem = require("../itemUtils/addItem")
const mongoose = require("mongoose");
const addMoney = require("../moneyUtils/addMoney")
const epicTicket = async (target) =>{
    const rando = Math.floor(Math.random() * 4)
    if(rando === 0) {
        //Free Money
        addMoney(target,1000000)
        return "You recieved 1000000 coins from the state"
    }  else if(rando===1) {
        const user = await getUser(target)
        await addItem( "Giant Sword","Weapon","Epic",target,160,0,user.items)
        return "You recieved GIANT SWORD [E]"
    }else if(rando===2) {
        const user = await getUser(target)
        await addItem( "Magic Club","Weapon","Epic",target,120,60,user.items)
        return "You recieved MAGIC CLUB [E]"
    }else if(rando===3) {
        const user = await getUser(target)
        await addItem( "Epic Egg","Egg","Epic",target,0,0,user.items)
        return "You recieved an Epic Egg"
    }
}

module.exports = epicTicket