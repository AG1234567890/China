const userAttack = (userWeapon,userArmor, STR, DEF, SPD, enemy,pet) => {
  //  console.log(pet)
  console.log(enemy)
  petSTR = pet.STR
  petATK = pet.ATK
let totalSTR = userWeapon.STR + STR + userArmor.STR + petSTR
let totalDEF = DEF
let armors = ["Steel Armor"]
let def = [30]
if (armors.includes(userArmor.name)){
    totalDEF += def[armors.indexOf(userArmor.name)]
}

let weaponATK = userWeapon.ATK
weaponATK += petATK

let enemyHP = enemy.HP 
let enemyName = enemy.name
let traits = enemy.traits

let randomFactor = Math.random() * 0.4 + 0.8 //0.8 - 1.2
let DMG = Math.floor((weaponATK+ 5) * (totalSTR + 10) * randomFactor  / 1.5)
console.log(petSTR,petATK)
enemyHP -= DMG 

let reply = `You did _${DMG}_ damage to the **${enemyName}**`
if(enemyHP < 1){
    enemyHP = 0
    reply += " and it died ggez not even close"
}
let otherStuffThatHappened = []
if(userWeapon.name.includes("Ice")){
    const rando = Math.floor(Math.random() * 3)
    if(rando === 1){
           otherStuffThatHappened.push("Freeze")
    reply += ` and ${enemyName} was frozen`
    }

 
}


return [enemyHP, reply,otherStuffThatHappened]

}

module.exports = userAttack