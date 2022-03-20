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

function score(computerPoints, playerPoints){
  this.scoreDisplay = document.createElement("div");
  this.computerPoints = computerPoints;
  this.playerPoints = playerPoints;
  this.refreshScore = function () {
    this.scoreDisplay.textContent=`Computer = ${this.computerPoints}\nPlayer = ${this.playerPoints}`;
  };
}

function display(){
  this.resultDisplay = document.createElement("div");
  this.changeDisplay = function(winvalue, computerSelection, displayScore){
    switch (winvalue){
      case 1:
        displayScore.playerPoints++;
        break;
      case 0:
        break;
      case -1:
        displayScore.computerPoints++;
        break;
    }
    this.resultDisplay.innerHTML = "";
    let computerChoosed = document.createElement("button");
    computerChoosed.id = computerSelection;
    computerChoosed.classList.add("computer-play");
    setTimeout(()=>computerChoosed.classList.add("animated"), 1000);
    let computerChoosedImg = document.createElement("img");
    computerChoosedImg.src = `./images/${computerChoosed.id}.png`;
    computerChoosed.appendChild(computerChoosedImg);
    this.resultDisplay.classList.add('result-display');
    this.resultDisplay.appendChild(computerChoosed);
    displayScore.refreshScore();
  }
}

function checkWin(displayScore, display, buttons){
  if (displayScore.playerPoints == 5) {
    display.resultDisplay.textContent = "You win!!";
    buttons.deactivateButtons(display, displayScore);
    offerRestart();
  } else if (displayScore.computerPoints == 5) {
    display.resultDisplay.textContent = "You loose!!";
    buttons.deactivateButtons(display, displayScore);
    offerRestart();
  }
}

function restartGame(){
  document.body.innerHTML = "";
  game();
}

function offerRestart(){
  let restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", restartGame);
  document.body.appendChild(restartButton);
}

function doPlaying(e, displayScore, display, buttons){
  e = e.target;
  while(!(e.matches("button"))){
    //Previne esse "subborbulhamento" de escapar do contexto de .buttons
    if(e.matches(".buttons")) return 0;
    e = e.parentNode;
  }

  //O código acima seleciona o button, porém é necessário aplicar o estilo 
  //diretamente na Div

  e = e.parentNode;

  buttons.playingButtons.childNodes.forEach(n => {
    if(!(n.classList === e.classList)) {
      n.classList.toggle('notchoosed');
      setTimeout(()=> n.classList.toggle('notchoosed'),3000);
    }
  })

  e.classList.toggle('choosed');
  setTimeout(()=>e.classList.toggle('choosed'), 3000);
  let computerSelection = computerPlay();
  let playerSelection = e.classList[1];
  display.changeDisplay(roundPlay(playerSelection, computerSelection), computerSelection, displayScore);
  checkWin(displayScore, display, buttons);
  setTimeout(()=>{

  }, 3000)
}

function button(){
  this.playingButtons = document.createElement("div");
  this.createButtons = function(){
    this.playingButtons.classList.add("buttons")
    for(let i = 1;i<=3;i++){
      let tempDiv = document.createElement('div');
      tempDiv.classList.add('button-container');
      let tempButton = document.createElement("button");
      let buttonimg = document.createElement("img");
      switch(i){
        case 1:
          tempButton.classList.add('rock');
          tempDiv.classList.add('rock');
          buttonimg.src = "./images/rock.png";
          break;
        case 2:
          tempButton.classList.add('paper');
          tempDiv.classList.add('paper');
          buttonimg.src = "./images/paper.png";
          break;
        case 3:
          tempButton.classList.add('scissor');
          tempDiv.classList.add('scissor');
          buttonimg.src = "./images/scissor.png";
          break;
      }
      tempButton.appendChild(buttonimg);
      tempDiv.appendChild(tempButton);
      tempButton.classList.toggle("initial");
      this.playingButtons.appendChild(tempDiv);
      setTimeout(()=> {
        tempButton.classList.toggle('initial');
      }, 200*i);
  }};
  this.activateButtons = function(display, score){
    this.playingButtons.addEventListener('click', f = (e) => { doPlaying(e, score, display, this) });
  };
  this.deactivateButtons = function(){
    this.playingButtons.removeEventListener('click', f, false);
  };
}

function outdoor(text, id){
  this.element = document.createElement("p");
  this.attachToPage = function(){
    this.element.id = id;
    this.element.appendChild(document.createTextNode(text));
    document.body.appendChild(this.element);
  }
}

function game(){  

  /* Criar Placar, botões e display de resultados em memória */

  const displayScore = new score(0,0);    
  const buttons = new button();
  const endDisplay = new display();
  const playerOutdoor = new outdoor("YOU", "YOU");
  const computerOutdoor = new outdoor("COMPUTER", "COMPUTER");
  const initialOutdoor = new outdoor(`The computer has maded his move!\nMade
  yours to discover the winner of this round!`, "initial-outdoor");

  /* Inicializar elementos criados anteriormente */

  displayScore.refreshScore();
  buttons.activateButtons(endDisplay, displayScore);

  /* Atrelar elementos ao DOM */

  initialOutdoor.attachToPage();
  document.body.appendChild(displayScore.scoreDisplay);
  playerOutdoor.attachToPage();
  document.body.appendChild(buttons.playingButtons);  
  computerOutdoor.attachToPage();
  document.body.appendChild(endDisplay.resultDisplay);

   buttons.createButtons();
}

/* Ponto de Entrada do Jogo */

addEventListener("DOMContentLoaded", game);
