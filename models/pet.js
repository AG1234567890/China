const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    id: Number,
    owner: Number,
    ATK: Number,
    STR: Number,
    DEF: Number,
    SPD: Number,
    Name: String
});


const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
