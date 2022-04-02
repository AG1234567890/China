const User = require("../models/user");
const mongoose = require("mongoose")
const removeMoney = async (target, amount) =>{
    await User.findOneAndUpdate({id: target},{
        $inc: {coins: -amount}
    })
    
}

module.exports = removeMoney