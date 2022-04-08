const getInventory = require("../itemUtils/getInventory")
const getItem = require("../itemUtils/getItem")
const removeItemByName = require("../itemUtils/removeItemByName")

const enemyAttack = async (HP, userWeapon, userArmor, userSTR, userDEF, userSPD, enemy,pet,target) => {
let enemyDMG = enemy.DMG
let maxHP = HP
let focusSash = false
let armors = ["Steel Armor"]
let def = [30]
totalDEF = userDEF + pet.DEF
if (armors.includes(userArmor.name)){
    totalDEF += def[armors.indexOf(userArmor.name)]
}
const inventory = await getInventory(target)
if(inventory.includes("Focus Sash")){
    focusSash = true
}

let randomFactor = Math.random() * 0.4 + 0.8 //0.8 - 1.2
enemyDMG -= Math.floor(userDEF*2)

let DMG = Math.floor(enemyDMG * randomFactor  / 1.5)
if(DMG < enemy.DMG*0.4 ){
DMG = Math.floor(enemy.DMG*0.4)
}
//console.log(userDEF, enemy.dmg)
let previousHP = HP
HP -= DMG
let reply = `${enemy.name} did ${DMG} damage to you`
if(HP < 1){
    if(!focusSash){
       // enemyHP = 0
    reply += " and you got destroyed L bonzo radio"
    } else if(focusSash) {
        reply += " and you held on using your focus sash"
        HP=1
        focusSash = false
        await removeItemByName(target,"Focus Sash")
    } else {
        reply += " and you got destroyed L bonzo radio"
    }
    
}
let otherStuffThatHappened = []

//console.log(HP,reply,otherStuffThatHappened)
return [HP, reply,otherStuffThatHappened]

}

module.exports = enemyAttack