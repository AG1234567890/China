const User = require("../models/user");
const mongoose = require("mongoose")
const getUser = async (target) =>{
 
    const user = User.findOne({id: target}).exec();

    return user
}

module.exports = getUser