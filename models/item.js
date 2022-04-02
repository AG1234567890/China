const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    type: String,
    rarity: String,
    owner: Number,
    ATK: Number,
    STR: Number,
    ID: Number
    
})



const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
