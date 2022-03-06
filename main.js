function computerPlay(){
   return ["rock", "paper", "scissor"][Math.floor(Math.random() * 3)]
}

function roundPlay(playerSelection, computerSelection){
   playerSelection = playerSelection.toLowerCase();
   if (playerSelection === computerSelection){
      return 0
   }else{
      switch(playerSelection){
         case 'rock':
            if(computerSelection === 'paper'){
               return -1
            }
            else if(computerSelection === 'scissor'){
               return 1
            }
         case 'paper':
            if(computerSelection === 'rock'){
               return 1
            }
            else if(computerSelection === 'scissor'){
               return -1
            }
         case 'scissor': 
            if(computerSelection === 'paper'){
               return 1
            }
            else if(computerSelection === 'rock'){
               return -1
            }
      }
   }
}

function game(){
   for(let i=0;i<5;i++){
      alert("Welcome to Rock-Paper-Scissors!! \n This game will be played in 5 rounds")
      let playerSelection = prompt("Insert here your guess:");
      let computerSelection = computerPlay();
      let points = [/*0 for player, 1 for computer*/];
      let resuĺt = roundPlay(playerSelection, computerSelection);
      switch (result){
         case 1:
            console.log(`You win!! Computer choosed ${computerSelection} and ${playerSelection} beats ${computerSelection}!`);
            points[0]++;
         case 0:
            console.log("It's a tie!! You two choosed ${playerSelection}");
         case -1:
            console.log(`You loose!! Computer choosed ${computerSelection} and ${playerSelection} loose for ${computerSelection}!`);
            points[1]++;
      }
   }
   if(points[0]>points[1]){
      console.log("You win the war!!!!");
   } else{
      console.log("You lose!");
   }
}
