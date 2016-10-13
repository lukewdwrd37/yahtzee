//- Create a "dice jar" object with the keys being each dice
var diceJar = {
  "dice1": {value:null, rollable:true},
  "dice2": {value:null, rollable:true},
  "dice3": {value:null, rollable:true},
  "dice4": {value:null, rollable:true},
  "dice5": {value:null, rollable:true},
}



//- Create a "roll" function, keeps track of roll count
var rollCount = 0
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

//
//  #    # ###### #      #####  ###### #####     #    # ###### ##### #    #  ####  #####   ####
//  #    # #      #      #    # #      #    #    ##  ## #        #   #    # #    # #    # #
//  ###### #####  #      #    # #####  #    #    # ## # #####    #   ###### #    # #    #  ####
//  #    # #      #      #####  #      #####     #    # #        #   #    # #    # #    #      #
//  #    # #      #      #      #      #   #     #    # #        #   #    # #    # #    # #    #
//  #    # ###### ###### #      ###### #    #    #    # ######   #   #    #  ####  #####   ####
//

// helps us get the sum of the dice
function get_sum(total, num){
  return total + num;
}

// takes the value of each dice and puts it into an array we can manipulate
map_dice = function(){
  var dice_array = [];

  for(di in diceJar){
    dice_array.push(diceJar[di].value)
  }

  return dice_array
}

// this method combines two functions, map_dice and sort
release_the_orderer_of_the_dice = function(){

  // we need to move our dice values into a usuable array
  current_jar = map_dice()

  // we then need to sort them to check and see if we have the right dice, depending on the score,
  // but doesnt hurt to do this anyway
  current_jar.sort(function(a, b){return a-b})

  // we then return the the current_jar variable to the function where it's called, this is abstraction
  // we can use this to our benefit to make our functions universal and usuable in multiple places without repeating code
  return current_jar
}

// this method releases the keeper of the tallys and counts how many of each dice we have in our jar
release_the_tallyman = function(){
  current_jar = map_dice()
  tallymans_tallyboard = {}

  // create a dictionary count of the dice values
  for(var di=0; di<current_jar.length;di++){
    if (tallymans_tallyboard.hasOwnProperty(current_jar[di])){
      tallymans_tallyboard[current_jar[di]] += 1
    }
    else{
      tallymans_tallyboard[current_jar[di]] = 1
    }
  }

  return tallymans_tallyboard
}


//   #####   #####  ####### ######  #######    ####### ######     #     #####  #    # ####### ######
//  #     # #     # #     # #     # #             #    #     #   # #   #     # #   #  #       #     #
//  #       #       #     # #     # #             #    #     #  #   #  #       #  #   #       #     #
//   #####  #       #     # ######  #####         #    ######  #     # #       ###    #####   ######
//        # #       #     # #   #   #             #    #   #   ####### #       #  #   #       #   #
//  #     # #     # #     # #    #  #             #    #    #  #     # #     # #   #  #       #    #
//   #####   #####  ####### #     # #######       #    #     # #     #  #####  #    # ####### #     #
//

// - Create a "Score Points" function
var current_score = 0
var scorePoints = function(scorename){

  // we take in the type of points you want to score in the switch
  switch (scorename){

    // it matches to the lg straight, so it runs this block.
    case 'lg_straight':

      // for all these cases, we will assume that the user passes the test and will fail them later if they don't meet criteria
      passes_test = true

      // create a local variable that from helper method that gives us an ordered array of our dice
      ordered_dice = release_the_orderer_of_the_dice()

      // So we know in a straight that all 5 dice have to be consecutive, whether that is 1,2,3,4,5 or 2,3,4,5,6.
      // the roll must contain one of these sets of numbers in order to score the points.
      // to do this we will loop through the ordered_dice array and see if the current di(iteration) + 1 is equal
      // to the next di in the array. If it's not we flip the test to false and break the loop because we know they failed the test for a straight
      // else we just continue through the loop until it's over
      for(var di = 0; di<ordered_dice.length; di++){
        // we need to check for undefined here because, if 5 or six is the last number and we do +1 on it, it won't know what we're talking about
        if(ordered_dice[di+1] == undefined){
          break
        }
        else if(ordered_dice[di]+1 != ordered_dice[di+1]){
          passes_test = false
          break
        }
        else{
          continue
        }
        di++
      }

      // if the test is still true, then give the guy some points
      if(passes_test){
        current_score += 40
      }

      // reset the dom score
      document.getElementById("score").innerHTML = current_score;

      break;
    case 'full_house':

      // release the tallyman gives me an object that has the dice values as keys and a tally of how many of each i have
      // dice keys lays out an array of key values
      dice_dictionary = release_the_tallyman()
      dice_keys_values_array = Object.keys(dice_dictionary).map(function(key) {
        return dice_dictionary[key];
      });

      // To check a full house we need a pair and a triplet. But we don't know which order they will be in.
      // so we write a check to see if either of the keys have 2 or 3 tallys
      if(dice_keys_values_array[0] != 2 && dice_keys_values_array[1] != 3){
        if(dice_keys_values_array[0] != 3 && dice_keys_values_array[1] != 2){
          break
        }
      }

      // reset the dom score
      document.getElementById("score").innerHTML = current_score + 25;

      break;

  }

}
// create
