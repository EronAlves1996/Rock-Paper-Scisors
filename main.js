function computerPlay(){
   return ["rock", "paper", "scissor"][Math.floor(Math.random() * 3)]
}

function roundPlay(playerSelection, computerSelection){
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
            break;
         case 'paper':
            if(computerSelection === 'rock'){
               return 1
            }
            else if(computerSelection === 'scissor'){
               return -1
            }
            break;
         case 'scissor': 
            if(computerSelection === 'paper'){
              return 1
            }
            else if(computerSelection === 'rock'){
               return -1
            }
            break;
      }
   }
}

function game(){
  const buttons = [];
  for(let i = 0;i<3;i++){
    buttons.push(document.createElement("button"));
    switch(i){
      case 0:
        buttons[i].id = "rock";
        break;
      case 1:
        buttons[i].id = "paper"
        break;
      case 2:
        buttons[i].id = "scissor"
        break;
    }
  }

  buttons.forEach(n => {
    n.onclick = e => console.log(roundPlay(e.target.id, computerPlay()));
    document.body.appendChild(n);
  });

  let div
   let points = [0/*0 for player*/,
      /*1 for computer*/0];
/*   for(let i=0;i<5;i++){

      //Player's input standartization comes before functions to work well in
      //console.log() too

      let playerSelection = prompt("Insert here your guess:").toLowerCase();
      let computerSelection = computerPlay();
      let result = roundPlay(playerSelection, computerSelection);
      switch (result){
         case 1:
            console.log(`You win!! Computer choosed ${computerSelection} and ${playerSelection} beats ${computerSelection}!`);
            points[0]++;
            break;
         case 0:
            console.log(`It's a tie!! You two choosed ${playerSelection}`);
            break;
         case -1:
            console.log(`You loose!! Computer choosed ${computerSelection} and ${playerSelection} loose for ${computerSelection}!`);
            points[1]++;
            break;
      }
   }
   
   if(points[0]>points[1]){
      return "You win the war!!!!"
   } else{
      return "You lose!"
   }*/
}
