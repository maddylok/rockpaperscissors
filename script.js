const elementsChoices = document.querySelectorAll('.element-button');
const rounds = document.querySelector('.round');
const gameOutput = document.querySelector('.game-output');
const playAgainButton = document.querySelector('.again');
const trainerName = document.querySelector('.trainer-name');

const waterButton = document.querySelector('.water-element');
const fireButton = document.querySelector('.fire-element');
const grassButton = document.querySelector('.grass-element');

let playerLives = 3;
let rivalLives = 3;
let round = 1;

function roundCount(){
    round += 1;
    rounds.innerText = `Round: ${round}`;
    return round;
}

function rival(){
    const elementType = ['water', 'fire', 'grass'];
    const rivalSelection = elementType[Math.floor(Math.random() * elementType.length)];
    const rivalPokemon = document.querySelector('.rival-pokemon-image');


    rivalPokemon.classList.remove('.rival-pokemon-image', '.squirtle', '.charmander', '.bulbasaur');
    if (rivalSelection === 'water') {
        rivalPokemon.classList.add('squirtle');
        // var imgReplace = document.getElementsByClassName("rival-pokemon-water");
        // imgReplace.src = "images/squirtle2.jpeg";
        // imgReplace.style.visibility = 'visible';
    } else if (rivalSelection === 'fire') {
        rivalPokemon.classList.add('charmander');
        // var imgReplace = document.getElementsByClassName("rival-pokemon-fir");
        // imgReplace.src = "images/charmander2.jpeg";
        // imgReplace.style.visibility = "visible";
    } else if (rivalSelection === 'grass') {
        rivalPokemon.classList.add('bulbasaur');
    }
    return rivalSelection;

}

function lives(playerSelection, rivalSelection){
    const rivalResults = document.querySelector('.rival-results');

    switch(true){
        case(playerSelection === rivalSelection):
            gameOutput.innerText = "Neither Pokemon is super effective. Maybe you should switch out your Pokemon.";
            // gameResults.style.border = '3px solid';
            rivalResults.classList.remove('black-border');
            rivalResults.classList.add('yellow-border');
            break;
        case(playerSelection === 'water' && rivalSelection === 'fire'):
        case(playerSelection === 'fire' && rivalSelection === 'grass'):
        case(playerSelection === 'grass' && rivalSelection === 'water'):
            gameOutput.innerText = `It's super effective!! Your ${playerSelection} Pokemon beats their ${rivalSelection} Pokemon. Your opponent's Pokemon has fainted.`
            // gameResults.style.border = '3px solid';
            rivalResults.classList.remove('black-border');
            rivalResults.classList.add('green-border');
            rivalLives -= 1;
            break;
        default:
            gameOutput.innerText = `Unfortunate. Your opponent's ${rivalSelection} Pokemon is super effective against your ${playerSelection} Pokemon. Your Pokemon has fainted.`;
            // gameResults.style.border = '3px solid';
            rivalResults.classList.remove('black-border');
            rivalResults.classList.add('red-border');
            playerLives -= 1;
            break;
    }
    const score = document.querySelector('.score');
    score.innerText = `Your Pokemon left: ${playerLives} | Rival's pokemon left: ${rivalLives}`;
    return [playerLives, rivalLives];
    

}

function endgame () {
    if (playerLives === 0 || rivalLives === 0) {
        elementsChoices.forEach((button) => {
            button.setAttribute('disabled', '');
            button.classList.add('disabled-button', 'opacity');
        });
        
        const rivalPokemon = document.querySelector('.rival-pokemon-image');
        rivalPokemon.style.opacity = '0.5';

        const endgameMessage = document.querySelector('.endgame-message');
        if (playerLives > rivalLives) {
            gameOutput.innerText = `Congrats! You win!`
            endgameMessage.textContent = `Rival: Ah you beat me!! I'll be stronger next time for sure!`;
             
        }
        else {
            gameOutput.innerText = `Better luck next time!`;
            endgameMessage.textContent = `Rival: HAHA I win!! I am the better Pokemon trainer!`;
        }
        playAgainButton.style.visibility = 'visible';
    }
}

function playAgain(){
    playAgainButton.addEventListener('click', () => {
        window.location.reload();
      });
}

function play(){
    let playerSelection;
    elementsChoices.forEach ((element) => {
        element.addEventListener('click', () => {
            // const elementPicture = document.querySelectorAll('.element-icon');
            if (element.classList.contains('water-element')){
                // elementPicture = document.classList.add('.squirtle');
                playerSelection = 'water';
                console.log("pressed water button");
            }
            else if (element.classList.contains('fire-element')){
                // elementPicture = document.classList.add('.charmander');
                playerSelection = 'fire';
                console.log("pressed fire button");
            }
            else {
                // elementPicture = document.classList.add('.bulbasaur');
                playerSelection = 'grass';
                console.log("pressed grass button");
            }
            roundCount();
            lives(playerSelection, rival());
            endgame();
            playAgain();
        });
    });
}
play();

window.onload = randomTrainer;

images = [
     'images/pokemontrainer1.gif', 
     'images/pokemontrainer2.gif',
     'images/pokemontrainer3.gif',
     'images/pokemontrainer4.gif'
] 

function randomTrainer() {
    const size = images.length;
    const x = Math.floor(size * Math.random());
    document.getElementById("trainer").src=images[x];
    // if (x === 'images/pokemontrainer1.gif'){
    //     trainerName.textContent = `Rayu`;
    // } 
    // else if (x === 'images/pokemontrainer2.gif'){
    //     trainerName.textContent = `Boku`;
    // }
    // else if (x === 'images/pokemontrainer3.gif'){
    //     trainerName.textContent = `Saya`;
    // }
    // else {
    //     trainerName.textContent = `Hana`;
    // }
}


