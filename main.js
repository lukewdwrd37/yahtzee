//- Create a "dice jar" object with the keys being each dice
var diceJar = {
  "dice1": {value:null, rollable:true},
  "dice2": {value:null, rollable:true},
  "dice3": {value:null, rollable:true},
  "dice4": {value:null, rollable:true},
  "dice5": {value:null, rollable:true},
}
var rollCount = 0
//- Create a "roll" function, keeps track of roll count
var roll = function() {
  if (rollCount == 3){
    for(var di in diceJar){
        diceJar[di].rollable == 0;
      }
  } else {
    for(var di in diceJar){
      if(diceJar[di].rollable){
        diceJar[di].value = Math.floor((Math.random() * 6) + 1);//will roll dice
        document.getElementById(di.toString()).innerHTML = diceJar[di].value;
      }
    }
  rollCount++
  }
}
// - Create a "hold die" function
var hold = function(diToHold, holdno) {
    diceJar[diToHold].rollable = !diceJar[diToHold].rollable;
    if (!diceJar[diToHold].rollable){
      document.getElementById(holdno).innerHTML = "HELD";
    }
    else{
      document.getElementById(holdno).innerHTML = "Hold";
    }
}
// - Create a "Score Points" function
var scorePoints = function(scorename){
  switch scorename = {

    "yahtzee": loop over the dice values and if all the dice are equal then add 50 points to the points section
  }

}
// create
