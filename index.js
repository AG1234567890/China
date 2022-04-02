const {
  Client,
  Intents,
  RichPresenceAssets,
  MessageActionRow,
} = require("discord.js");
const prefix = "c!";

require("./db/mongoose");
const User = require("./models/user");
const mongoose = require("mongoose");
//const Users = mongoose.model('User', User);
require("dotenv").config();
const createNewUser = require("./db/createNewUser")
const addMoney = require("./moneyUtils/addMoney")
const getUser = require("./moneyUtils/getUser");
const addItem = require("./itemUtils/addItem")
const getItem = require("./itemUtils/getItem")
const removeItem = require("./itemUtils/removeItem");
const dailyTicket = require("./use/dailyTicket");
const getInventory = require("./itemUtils/getInventory");
const removeMoney = require("./moneyUtils/removeMoney");

const consumables = ["Daily Ticket","Rare Ticket","Padlock","Epic Ticket","Legendary Ticket"]
// require("./db/mongoose");
// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let Daily = new Set();

// When the client is ready, run this code (only once)
client.once("ready", async () => {
  console.log("mogus");
  //   client.user.setStatus("dnd");
  //   client.user.setActivity("amongus", { type: "PLAYING" });
});

client.on("messageCreate", async (message) => {
  let sender = message.author.id;
  if(!message.content.startsWith(prefix)) {
    await addMoney(sender, 5)
    //addItem(sender, {name:"thing"})
  }

  
    let userObject = ""
    User.findOne({ id: sender }, async function (err, person) {
   // console.log(person);
    if (person == null) {
    userObject = createNewUser(sender)
    } else {
        userObject = person
    }
//console.log(userObject)
    })


    if(message.content.startsWith(prefix)) {

      if(message.content.startsWith(prefix+"bal")){
        if(message.mentions.members.first()){
          let target = message.mentions.members.first().id
          const user = await getUser(target)
          const bal = user.coins
          message.reply(`<@${target}> has ${bal} coins`)
        } else{
            const user = await getUser(sender)
        const bal = user.coins
        message.reply("You have "+bal+" coins")
        }
      

      } else if (message.content === prefix+"daily") {
        if(!Daily.has(sender)){
          message.reply("You recieved a Daily Ticket")
          const user = await getUser(sender)
          addItem(
            "Daily Ticket","Ticket","Common",sender,0,0,user.items
          )
          Daily.add(sender)
          setTimeout(()=>{
            Daily.delete(sender)
          },1000*60*60*24)

        } else {
          message.reply("Wait 24 hours between claiming daily tickets bozo")
        }
      } else if (message.content.startsWith(prefix+"inventory")){
     const inven =  await getInventory(sender)
      message.reply("Inventory: "+inven)
    

      } else if (message.content.startsWith(prefix+"use")){
       const arguements = message.content.split(" ") //c!use daily ticket 3
       let targetItem = ""
        for (i=1;i<arguements.length;i++){
          targetItem+=arguements[i]
          targetItem+=" "
        }
       // console.log(arguements)
        const item = await getItem(sender,targetItem)
        if(item != null){
          let itemName = item.name
if(consumables.includes(itemName)){
         const deletedItem = await removeItem(sender, targetItem)
          if(deletedItem != null){
             message.reply("You used a "+deletedItem.name)

            if(deletedItem.name.toUpperCase() === "DAILY TICKET"){
              const dt = await dailyTicket(sender)
              message.reply(" "+dt)
            }





          }



       }

       }
       
       

           
         
      
      } else if(message.content === prefix+"stats"){
        const user = await getUser(sender)
        let STR = user.STR
        let DEF = user.DEF
        let HP = user.HP
        message.reply( `You have ${STR} Strength, ${DEF} Defense, ${HP} HP`)
      } else if(message.content === prefix+"help"){
        message.reply("some commands are c!daily,c!use,c!rob,c!stats,c!help")
      }else if(message.content.startsWith(prefix+"rob")){
        if(message.mentions.members.first()) {
          let target = message.mentions.members.first()
          const rando = Math.floor(Math.random() * 100)
          if(rando < 40){
            let playerOne = client.users.cache.get(target)
           let targetBal = 10000
           //console.log(target.id)
            const promise = await User.findOne({id: target.id})//.exec();
           console.log(promise.coins)
           targetBal = promise.coins
            const stealAmount = Math.floor(0.1*targetBal)
            if(stealAmount > 100000){
              stealAmount=100000
            }
            await addMoney(sender,stealAmount)
            await removeMoney(target.id,stealAmount)

      message.reply("You successfully stole from <@"+target+"> and took "+stealAmount+" coins")


          } else {
            message.reply("You got caught by the Police bonzo lmao")

          }
        } else {
          message.reply("You need to choose someone to rob bozo")
        }
      }
      
      else {
        message.reply("Idk what that command was. trying doing better? Try c!help or smth")
      }
    } 








})

    

client.login(process.env.TOKEN);
