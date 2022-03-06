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
