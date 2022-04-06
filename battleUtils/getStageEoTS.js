const getStageEoTS = (stage)=>{
const stages = [
{title:"Hong Kong Suburb",name:"Protestor",HP: 100, DMG: 35, SPD:10, Perks: {},description:"Weak Protestor (100%)",traits:["Yellow"]} //STAGE 1
,{title:"Shang Hai",name:"Capitalist",HP: 140, DMG: 50, SPD:10, Perks: {rob: 30},description:"Capitalist who might steal your money (100%)",traits:["White"]} //STAGE 2
,{title:"Beijing",name:"News Reporter",HP: 200, DMG: 50, SPD:10, Perks: {},description:"Reporter who might expose the CCP",traits:["White"]}
,{title:"Red Sky at Morning",name:"r/shitposting user",HP: 300, DMG: 65, SPD:25, Perks: {cringe: 15},description:"r/shitposting user might cringe you (100%)",traits:["Cringy"]} //STAGE Last
,{title:"Sailors Take Warning",name:"Discord Moderator",HP: 1000, DMG: 1, SPD:0, Perks: {fat: 15},description:"fatass",traits:["Fat"]}
,{title:"Laying Under Palm Trees",name:"Anarchist",HP: 105, DMG: 150, SPD:50, Perks: {},description:"Anarchy the law can't stop me",traits:["Yellow"]}
,{title:"Waiting for the Summer",name:"Violent Anarchist",HP: 135, DMG: 200, SPD:55, Perks: {},description:"Anarchy the law can't stop me",traits:["Yellow"]}
,{title:"Knowing there's no where to go",name:"Very Violent Anarchist",HP: 155, DMG: 250, SPD:60, Perks: {},description:"Anarchy the law can't stop me",traits:["Yellow"]}
,{title:"I'm in a tropic love",name:"Technobald",HP: 400, DMG: 100, SPD:60, Perks: {},description:"Technobald",traits:["Pig"]}
,{title:"Dragoon",name:"Fire Dragon",HP: 1500, DMG: 250, SPD:200, Perks: {burn:50},description:"dragon",traits:["Dragon"]}
,{title:"More Dragoon",name:"Ice Dragon",HP: 2000, DMG: 200, SPD:100, Perks: {freeze:50},description:"more dragoon",traits:["Pig"]}
,{title:"Earth Dragoon",name:"Earth Dragon",HP: 10000, DMG: 75, SPD:30, Perks: {},description:"more dragoon",traits:["Dragon"]}
,{title:"The Crazed Protestor",name:"Crazed Protestor",HP: 25000, DMG: 250, SPD:50, Perks: {},description:"crazed protestor",traits:[]}

]
  //  console.log(stage,stages.length)
if(stage >= stages.length){

    return {title:"Death",name:"Death: Destroyer of Worlds",HP: 9999999999, DMG: 999999999, SPD:999999, Perks: {},description:"Death",traits:["Death"]}
} else {
    return stages[stage]
}



}

module.exports = getStageEoTS