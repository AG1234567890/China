const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    stats: mongoose.Schema.Types.Mixed
})
const userSchema = new mongoose.Schema({
    id: String,
    coins: Number,
    socialCredit: Number,
    job: String,
    items: Number,
    STR: Number,
    DEF: Number,
    HP: Number,
    MainWeapon: Number,
    Pet: Number,
    Lock: String,
    Armor: String
});


const User = mongoose.model("User", userSchema);

module.exports = User;
