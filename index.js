const {
  Client,
  Intents,
  RichPresenceAssets,
  MessageActionRow,
} = require("discord.js");
const prefix = "!";

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
const rareTicket = require("./use/rareTicket");
const getBattles = require("./battleUtils/getBattles");
const createNewBattles = require("./battleUtils/createNewBattles");
const getStageEoTS = require("./battleUtils/getStageEoTS");
const userAttack = require("./battleUtils/userAttack");
const enemyAttack = require("./battleUtils/enemyAttack");
const Battles = require("./models/battle");
const battleRewards = require("./battleUtils/battleRewards");
const Item = require("./models/item")

const consumables = ["Daily Ticket","Rare Ticket","Padlock","Epic Ticket","Legendary Ticket"]
// require("./db/mongoose");
// Create a new client instance
const shop = ["Rare Ticket","Padlock"]
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let Daily = new Set();
let Robbed = new Set()
let BattlePrompt = new Set()
let freeRareTicket = new Set()
// When the client is ready, run this code (only once)
client.once("ready", async () => {
  console.log("mogus");
  //   client.user.setStatus("dnd");
  //   client.user.setActivity("amongus", { type: "PLAYING" });
});
let userStory = ""
client.on("messageCreate", async (message) => {
  let sender = message.author.id;
  if(!message.content.startsWith(prefix)) {
    await addMoney(sender, 10)
    //addItem(sender, {name:"thing"})
  }
lets = 1
  if(BattlePrompt.has(sender)){
    let battlePrompt = message.content
    BattlePrompt.delete(sender)

    if (battlePrompt.trim().toUpperCase() === "OK"){
      message.reply("You started the battle")
      const battles = await getBattles(sender)
      let e =""
      if(userStory === "ENEMIES OF THE STATE"){
        
         s = battles["Enemies Of the State"]
      
        e = getStageEoTS(s-1)
      

      } else if(userStory === "WAR ON TAIWAN"){

      }

      let enemyMaxHP = e.HP
      let enemyHP = e.HP
      let enemyATK = e.DMG
      let enemySPD = e.SPD
      
      const user = await getUser(sender)
      let userMaxHP = user.HP
      let userHP = user.HP
      let userSTR = user.STR
      let userDEF = user.DEF
      let userSPD = user.SPD
      let userArmor = user.Armor 
      let userWeapon = user.MainWeapon
      if(userWeapon != -1){
        let weapon = await getItem(sender, userWeapon)
        userWeapon = {name:weapon.name, ATK: weapon.ATK, STR: weapon.STR}
      } else {
        userWeapon = {name:"",ATK:0,STR:0}
      }
      if(userArmor != -1){
        let armor = await getItem(sender, userArmor)
        userArmor = {name:armor.name, ATK: armor.ATK, STR: armor.STR}
      } else {
        userArmor = {name:"",ATK:0,STR:0}
      }

       if(userSPD > enemySPD) {
        const stuff = userAttack(userWeapon, userArmor, userSTR, userDEF, userSPD, e)
          let msg = stuff[1]
          let remainingEnemyHP = stuff[0]
        message.channel.send(" "+msg)
     enemyHP = remainingEnemyHP
     e.HP = remainingEnemyHP
          message.channel.send(`${e.name} has ${remainingEnemyHP} HP left`)

      }

      while (userHP > 0 && enemyHP > 0){
       
        let stuff = enemyAttack(userHP,userWeapon,userArmor,userSTR, userDEF, userSPD, e)
        let msg = stuff[1]
        let yourRemainingHP = stuff[0]
        message.channel.send(" "+msg)
        userHP = yourRemainingHP
        message.channel.send(`You have ${yourRemainingHP} HP left`)
      


        if(userHP > 0){
                stuff = userAttack(userWeapon, userArmor, userSTR, userDEF, userSPD, e)
         msg = stuff[1]
        let remainingEnemyHP = stuff[0]
      message.channel.send(" "+msg)
     enemyHP = remainingEnemyHP
    e.HP = remainingEnemyHP
        message.channel.send(`${e.name} has ${remainingEnemyHP} HP left`)
        }
   






      }
      if(userHP <= 0) {
        message.reply("You lost. L bozo get better dont ask didnt care ")
      }
      else {
        const reward = await battleRewards(sender,s)
        console.log(reward)
        message.reply("You won. W notbozo get worse did ask do care. "+reward)
        if(userStory === "ENEMIES OF THE STATE"){
           await Battles.findOneAndUpdate({owner: sender}, {
          $inc: {"Enemies Of the State":1}
        })



  
        } else if(userStory === "WAR ON TAIWAN"){
  
        }
     
      }




    } else {
      message.reply("You aborted")
    }


  }

  const R = Math.floor(Math.random() * 1000)
  const user = await getUser(sender)
  if(R>=5 && R<=1){
    await addItem( "Rare Ticket","Ticket","Rare",sender,0,0,user.items)
    message.reply("Congrats, you got a rare ticket for free!")
  } else if (R===0){
    await addItem( "Epic Ticket","Ticket","Epic",sender,0,0,user.items)
    message.reply("Congrats, you got an epic ticket for free!")
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
        let bal = 0
        if(message.mentions.members.first()){
          let target = message.mentions.members.first().id
          const user = await getUser(target)
          if(user){
             bal = user.coins
          }
          
          message.reply(`<@${target}> has ${bal} coins`)
        } else{
            const user = await getUser(sender)
        if(user){
               bal = user.coins
        }
    
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
     let trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
      message.reply("Inventory: "+trimString(inven,2038))
    

      } else if (message.content.startsWith(prefix+"use")){
       const arguements = message.content.split(" ") //c!use daily ticket 3
       let targetItem = ""
        for (i=1;i<arguements.length;i++){
          targetItem+=arguements[i]
          targetItem+=" "
        }
       // console.log(arguements)
        const item = await getItem(sender,targetItem)
        console.log(item+" "+targetItem)
        if(item != null){
          let itemName = item.name
if(consumables.includes(itemName)){
         const deletedItem = await removeItem(sender, targetItem)
          if(deletedItem != null){
             message.reply("You used a "+deletedItem.name)

            if(deletedItem.name.toUpperCase() === "DAILY TICKET"){
              const dt = await dailyTicket(sender)
              message.reply(" "+dt)
            } else if(deletedItem.name.toUpperCase() === "RARE TICKET"){
              const rt = await rareTicket(sender)
              message.reply(" "+rt)
            }





          }



       } else {
         if(item.type.toUpperCase() =="WEAPON") {
           await User.findOneAndUpdate({id:sender}, {
            MainWeapon: item.ID
           })
           message.reply("You set your weapon as a "+item.name)
         } else if (item.type.toUpperCase() == "ARMOR") {
          await User.findOneAndUpdate({id:sender}, {
            Armor: item.ID
           })
           message.reply("You set your armor as  "+item.name)
         }
       }

       }
       
       

           
         
      
      } else if(message.content === prefix+"stats"){
        const user = await getUser(sender)
        let STR = user.STR
        let DEF = user.DEF
        let HP = user.HP
        let SPD = user.SPD
        message.reply( `You have ${STR} Strength, ${DEF} Defense, ${HP} HP and ${SPD} Speed`)
      } else if(message.content === prefix+"help"){
        message.reply("some commands are c!daily,c!use,c!rob,c!stats,c!help,c!shop,c!buy,c!banner")
      }else if(message.content.startsWith(prefix+"rob")){
        if(Robbed.has(sender)){
          message.reply("You have robbed too recently!")
        } else 
     {   if(message.mentions.members.first()) {
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

      message.reply("You successfully stole from <@"+target+"> and took "+stealAmount+" coins. You can rob again in 10 minutes")


          } else {
            message.reply("You got caught by the Police bonzo lmao. Try again in 10 minutes")

          }
          Robbed.add(sender)
          setTimeout(()=>{
            Robbed.delete(sender)
          },1000*60*10)
        } else {
          message.reply("You need to choose someone to rob bozo")
        }
      }} else if(message.content === prefix+"banner"){
        message.reply("The current banner is: Super Idol Sword [R], Bingchiling [E], Sword of the Tiger [E], Bane of Capitalism [L] ")
      } else if(message.content.startsWith (prefix+"battle")) {
        const stories = ["ENEMIES OF THE STATE"]
        const arguements = message.content.split(" ") //c!use daily ticket 3
        let targetItem = ""
         for (i=1;i<arguements.length;i++){
           targetItem+=arguements[i]
           targetItem+=" "
         }
         if(!targetItem){
 message.reply("You need to pick a storymode. Your current options are: Enemies of the State")
         }
       else {
          const battles = await getBattles(sender)
        if(!battles) {
          const newBattles = await createNewBattles(sender)
        }
        const story = targetItem.trim().toUpperCase()
        if(stories.includes(story)){
          let b = await getBattles(sender)
         if(story == "ENEMIES OF THE STATE"){
          let stage = b["Enemies Of the State"]
          
          let enemy = await getStageEoTS(stage-1)
          console.log(enemy, stage-1)
          message.reply(`The name of the stage is: ${enemy.title}. #${stage}. The enemy is a ${enemy.name}. Type OK to continue or anything else to abort`)
          BattlePrompt.add(sender)
          userStory = story
         }
        } else {
          message.reply("That's not a valid subchapter")
        }

       }
       
        
      
      
      
      
      
      } else if(message.content === prefix+"shop"){
        
        message.reply("The current items for sale are: Padlock[2500], Steel Sword[10000], Steel Armor[10000], Damage Talisman[25000], Defense Talisman[25000]")
      } else if(message.content === prefix+"weapon") {
        const user = await getUser(sender)
        const weaponID = user.MainWeapon
        let weapon = await getItem(sender, weaponID)

       let  weaponName=weapon.name

        message.reply(`Your current weapon is ${weapon.rarity} ${weaponName} [${weaponID}]. ${weapon.ATK} ATK Power, ${weapon.STR} Bonus Strength`)
      }else if(message.content.startsWith(prefix+"buy")) {
        const shop = ["PADLOCK","STEEL SWORD","STEEL ARMOR", "DAMAGE TALISMAN","DEFENSE TALISMAN","RARE TICKET","DAILY TICKET"]
        const prices = [2500,10000,10000,25000,25000,100000,10000]

        const arguements = message.content.split(" ") //c!use daily ticket 3
        let targetItem = ""
         for (i=1;i<arguements.length;i++){
           targetItem+=arguements[i]
           targetItem+=" "
         }
     //    console.log(targetItem)
     console.log(targetItem)
         if (shop.includes(targetItem.trim().toUpperCase())){
          const itemPrice = prices[shop.indexOf(targetItem.trim().toUpperCase())]
         //message.reply("That'll cost "+itemPrice+" coins")
          const user = await getUser(sender)
          const bal = user.coins

          if(bal < itemPrice) {
             message.reply("You don't have enough money for this. do not try to scam the gloruis ccp!!!")
          } else {
            message.reply(`You successfully bought a ${targetItem} for ${itemPrice} coins. ` )
            await removeMoney(sender,itemPrice)
            let user = await getUser(sender)
           // await addItem("OK Rock","Rock","Uncommon",sender,0,0,user.items)
            targetItem = targetItem.trim().toUpperCase()
            
             user = await getUser(sender)
            if(targetItem === "PADLOCK") { 
              await addItem("Padlock","Lock","Common",sender,0,0,user.items)
            } else if (targetItem === "STEEL SWORD") {
              await addItem("Steel Sword","Weapon","Common",sender,40,0,user.items)
            } else if (targetItem === "STEEL ARMOR") {
              await addItem("Steel Armor","Armor","Common",sender,0,5,user.items)
            } else if (targetItem === "DAMAGE TALISMAN") {
              await User.findOneAndUpdate({id: sender},{
                $inc: {STR: 1, SPD: 1}
            })
            message.reply("You recieved a permanent strength boost of 1 and SPD boost of 1 (it adds up i swear)")
            } else if (targetItem === "DEFENSE TALISMAN") {
              await await User.findOneAndUpdate({id: sender},{
                $inc: {HP: 1,DEF:1}
            })
            message.reply("You recieved a permanent HP boost of 1 and DEF boost of 1 (it adds up i swear)")
            }
          }



         } else {
           message.reply("That Item is Not For Sale Rn, did you mispell it?")
         }



      } else if(message.content === prefix+"claim ticket"){
        if(!freeRareTicket.has(sender)){
          await addItem( "Rare Ticket","Ticket","Rare",sender,0,0,user.items)
          message.reply("Congrats, you got a rare ticket for free!")
          freeRareTicket.add(sender)
        } else {
          message.reply("bonzo radio")
        }
      } else if (message.content.startsWith(prefix+"powerup")){
        const arguements = message.content.split(" ") //c!use daily ticket 3
        let targetItem = ""
         for (i=1;i<arguements.length;i++){
           targetItem+=arguements[i]
           targetItem+=" "
         }

         const item = await getItem(sender,targetItem)
        if(item != null){
          let itemName = item.name
          let rarity = item.rarity
          let price = 0
          let boost = 0
          if(item.type === "Weapon"){
            if(rarity.toUpperCase() === "COMMON"){
              price = 10000
              boost = 1
            } else if (rarity.toUpperCase() === "RARE"){
              price = 25000
              boost = 1
            } else if (rarity.toUpperCase() === "EPIC"){
              price = 20000
              boost = 1
            } else if (rarity.toUpperCase() === "LEGENDARY"){
              price = 50000
              boost = 1
            } 
            const user = await getUser(sender)
            const bal = user.coins
            if(bal < price){
              message.reply("youre too broke lmfao")
            } else {
              await Item.findOneAndUpdate({owner:sender, ID: targetItem},{
            $inc: {ATK:boost, STR:boost}
          })
          message.reply(`You paid ${price} coins for a bonus of 1 strength and Atk to your ${itemName}`)
           removeMoney(sender, price)
        }


          } else {
            message.reply("You can not power this up")
          }
          
        } else {
          message.reply("Invalid item")
        }
          

      }
      
      else {
        message.reply("Idk what that command was. trying doing better? Try c!help or smth")
      }
    } 








})

    

client.login(process.env.TOKEN);
