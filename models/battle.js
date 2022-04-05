const mongoose = require("mongoose");

const battleSchema = new mongoose.Schema({
owner: Number,
"Enemies Of the State": Number,
"War on Taiwan": Number,
"Battle Against the West": Number,
"A Cold War": Number,
"Cyber Showdown":Number,
"Workers of the World": Number,
"John Xina Awakens": Number
    
})



const Battles = mongoose.model("Battles", battleSchema);

module.exports = Battles;
