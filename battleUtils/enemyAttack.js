const enemyAttack = (HP, userWeapon, userArmor, userSTR, userDEF, userSPD, enemy) => {
let enemyDMG = enemy.DMG
let armors = ["Steel Armor"]
let def = [30]
totalDEF = userDEF
if (armors.includes(userArmor.name)){
    totalDEF += def[armors.indexOf(userArmor.name)]
}

let randomFactor = Math.random() * 0.4 + 0.8 //0.8 - 1.2
enemyDMG -= Math.floor(userDEF*2)
let DMG = Math.floor(enemyDMG * randomFactor  / 1.5)
//console.log(userDEF, enemy.dmg)
HP -= DMG
let reply = `${enemy.name} did ${DMG} damage to you`
if(HP < 1){
    enemyHP = 0
    reply += " and you got destroyed L bonzo radio"
}
let otherStuffThatHappened = []

return [HP, reply,otherStuffThatHappened]

}

module.exports = enemyAttack