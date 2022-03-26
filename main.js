function logicalModule(){
  this.analisePlaying = (playerChoice, computerChoice) =>{
    if (playerChoice === computerChoice.id){
      return 0
    }else{
      switch(playerChoice){
        case 'rock':
          if(computerChoice === 'paper'){
            this.score[1]++;
          }
          else if(computerChoice === 'scissor'){
            this.score[0]++;
          }
          break;
        case 'paper':
          if(computerChoice === 'rock'){
            this.score[0]++;
          }
          else if(computerChoice === 'scissor'){
            this.score[1]++;
          }
          break;
        case 'scissor':
          if(computerChoice === 'paper'){
            this.score[0]++;
          }
          else if(computerChoice === 'rock'){
            this.score[1]++
          }
          break;
      }
    }
  };
  this.score = [0,0];
  this.checkWin = ()=> {
    if(this.score[0] === 5) return 1;
    else if(this.score[1] === 5) return 1;
    else return 0;
  }
}

function finalDisplay(win, score, ...event){
  let scoreDisplay = document.createElement("div");
  let computerPoints = score[1];
  let playerPoints = score[0];

  let scoreDiv = document.createElement('div'),
    nextRoundDiv = document.createElement('div'),
    scoreArr = [document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')],
    playerScore = [document.createElement("div"),
    document.createElement('div')],
    voidScore = document.createElement('div'),
    computerScore = [document.createElement('div'),
    document.createElement('div')],
    nextRoundButton = document.createElement('button');

    playerScore[0].textContent = "YOU";
    playerScore[1].textContent = playerPoints;

    voidScore.textContent = "-";

    computerScore[0].textContent = "COMPUTER";
    computerScore[1].textContent = computerPoints;

    playerScore.forEach(n=>scoreArr[0].appendChild(n));
    scoreArr[1].appendChild(voidScore);
    computerScore.forEach(n=>scoreArr[2].appendChild(n));

    scoreArr.forEach(n=>{
      n.classList.add('score-arr');
      scoreDiv.appendChild(n);
    });
    nextRoundDiv.appendChild(nextRoundButton);

    scoreDisplay.appendChild(scoreDiv);
    scoreDisplay.appendChild(nextRoundDiv);

    scoreDisplay.classList.add('score');
    scoreDiv.classList.add('score-div');
    nextRoundDiv.classList.add('next-round-div');
    nextRoundButton.classList.add('next-round-button');

  if (win === 1){
    nextRoundButton.textContent = "New Game";
    nextRoundButton.addEventListener('click', game);
  }
  else{
    nextRoundButton.textContent = "Next Round";
    nextRoundButton.addEventListener('click', event[0]);
  }

  return scoreDisplay;
}


 
function computerModule(){
  this.computerPlaying = ()=>{
    this.computerChoice = ["rock", "paper", "scissor"][Math.floor(Math.random() * 3)];
  };
  this.computerChoice = "";
  this.showChoice = ()=>{
    //Declarando variáveis com elementos que vão apresentar a jogada do computador
    const computerChoosed = document.createElement("button"),
      computerChoosedImg = document.createElement("img");

    //Configurando as propriedades de cada um dos elementos
    computerChoosed.id = this.computerChoice;
    computerChoosed.classList.add("computer-play");

    computerChoosedImg.src = `./images/${this.computerChoice}.png`;

    //Rotina de adição e execução no DOM

    //this.resultDisplay.innerHTML = "";

    setTimeout(()=>computerChoosed.classList.add("animated"), 1000);

    computerChoosed.appendChild(computerChoosedImg);
    return computerChoosed;
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

function playerModule(){
  this.playingButtons = "";
  
  this.createButtons = function(){
    this.playingButtons = '';
    this.playingButtons = document.createElement('div');

    this.playingButtons.classList.add("buttons");

    //Necessário um button e uma div por cima do button para manter posicionamento

    for(let i = 1;i<=3;i++){
      
      //Criando elementos

      let tempDiv = document.createElement('div'),
        tempButton = document.createElement("button"),
        buttonimg = document.createElement("img");

      //Cada ciclo do for vai criar um botão, pelo switch configura-se cada um

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

      //Configurando cada elemento
      
      tempDiv.classList.add('button-container');
      tempButton.classList.toggle("initial");

      //Adicionando ao DOM

      tempButton.appendChild(buttonimg);
      tempDiv.appendChild(tempButton);
      this.playingButtons.appendChild(tempDiv);

      //Setando um timeout para inserir uma animação progressiva

      setTimeout(()=> {
        tempButton.classList.toggle('initial');
      }, 200*i);
  }};
  
  this.managePlaying = (e, continueFlow) => {
    e = e.target;

    while(!(e.matches("button"))){
      //Previne esse "subborbulhamento" de escapar do contexto de .buttons
      if(e.matches(".buttons")) return 0;
      e = e.parentNode;
    }

    //O código acima seleciona o button, porém é necessário aplicar o estilo
    //diretamente na div, por isso preciso do elemento pai do mesmo
    
    e = e.parentNode;
    
    this.playingButtons.childNodes.forEach(n => {
      if(!(n.classList === e.classList)) {
        n.classList.toggle('notchoosed');
      }
    })

    e.classList.toggle('choosed');

    setTimeout(continueFlow, 0);
    this.playerChoice = e.classList[0];
  }

  this.playerChoice = "";

  this.activateButtons = (continueFlow) => {
    this.playingButtons.addEventListener('click', f = (e) => this.managePlaying(e, continueFlow));
  }

  this.deactivateButtons = function(){
    this.playingButtons.removeEventListener('click', f);
  };
}

function outdoor(text, id, typewriter){
  this.container = document.createElement('div');
  this.element = document.createElement("p");
  this.setElements = function(){
    this.element.id = id;
    this.container.classList.add('out-container');
    this.element.classList.add('outdoor');
    if(typewriter==true) this.element.classList.add('typewriter');
    this.element.appendChild(document.createTextNode(text));
    this.container.appendChild(this.element);
  }
}

function game(){  

  /* Criar Placar, botões e display de resultados em memória */

  const pModule = new playerModule(),
    cModule = new computerModule(),
    lModule = new logicalModule(),
    playerOutdoor = new outdoor("YOU", "YOU", false),
    computerOutdoor = new outdoor("COMPUTER", "COMPUTER", false),
    initialOutdoor = new outdoor(`The computer has maded his move!\nMade
      yours to discover the winner of this round!`, "initial-outdoor", true);

  const attachElements = ()=>{
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(playerOutdoor.container);
    pModule.createButtons();
    pModule.activateButtons(continueFlow);
    document.body.appendChild(pModule.playingButtons);
    document.body.appendChild(computerOutdoor.container);
    initialOutdoor.container.removeEventListener('animationend', attachElements);
  }

  const setRound = () => {
    document.body.innerHTML = '';
    document.body.appendChild(initialOutdoor.container);
    initialOutdoor.container.addEventListener('animationend', attachElements);
  }

  const continueFlow = () => {
    pModule.deactivateButtons();
    cModule.computerPlaying();
    let cChoice = cModule.showChoice();
    document.body.appendChild(cChoice);
    lModule.analisePlaying(pModule.playerChoice, cModule.computerChoice);
    let win = lModule.checkWin();
    let fDisplay = finalDisplay(win, lModule.score, setRound);
    document.body.appendChild(fDisplay);
  }

  /* Inicializar elementos criados anteriormente */

  initialOutdoor.setElements();
  playerOutdoor.setElements();
  playerOutdoor.container.classList.add('game-out');
  computerOutdoor.container.classList.add('game-out');
  computerOutdoor.setElements();

  setRound();
}

function introduction(){
  const frame = document.createElement('div'),
    interDiv = document.createElement('div'),
    welcome = new outdoor("Welcome!!", "welcome", true),
    invitation = new outdoor("Let's play a Rock, Paper, Scissor game?", "invitation", true),
    divButtons = document.createElement('div');

  frame.classList.add('frame');
  interDiv.classList.add('inter-div');
  interDiv.appendChild(frame);
  document.body.appendChild(interDiv);
  
  frame.appendChild(welcome.container);
  frame.appendChild(document.createElement('br'));
  frame.appendChild(invitation.container);
  frame.appendChild(divButtons);

  welcome.container.classList.add("intro");
  invitation.container.classList.add("intro");
  divButtons.classList.add("intro");

  welcome.setElements();

  welcome.element.addEventListener('animationend', ()=>{
    setTimeout(()=>{
      welcome.element.classList.toggle('typewriter');
      invitation.setElements();
    }, 1000);
  });

  invitation.element.addEventListener('animationend', ()=>{
    setTimeout( ()=>{
      let buttonPlay = document.createElement('button'), 
        buttonClose = document.createElement('button');

      buttonPlay.textContent = "YES!!";
      buttonClose.textContent = "NOOOO";

      buttonPlay.addEventListener('click', game);
      buttonClose.addEventListener('click', ()=>window.close());

      divButtons.classList.add('intro');

      divButtons.append(buttonPlay, buttonClose);
    },1000);
  }
  )
}
  
/* Ponto de Entrada do Jogo */

addEventListener("DOMContentLoaded", introduction);
