//variable set up
// const pokemon = ['bulb','car']; 
const pokemon = ['bulbasaur',
'ivysaur',
'venusaur',
'charmander',
'charmeleon',
'charizard',
'squirtle',
'wartortle',
'blastoise',
'caterpie',
'metapod',
'butterfree',
'weedle',
'kakuna',
'beedrill',
'pidgey',
'pidgeotto',
'pidgeot',
'rattata',
'raticate',
'spearow',
'fearow',
'ekans',
'arbok',
'pikachu',
'raichu',
'sandshrew',
'sandslash',
'nidoran♀',
'nidorina',
'nidoqueen',
'nidoran♂',
'nidorino',
'nidoking',
'clefairy',
'clefable',
'vulpix',
'ninetales',
'jigglypuff',
'wigglytuff',
'zubat',
'golbat',
'oddish',
'gloom',
'vileplume',
'paras',
'parasect',
'venonat',
'venomoth',
'diglett',
'dugtrio',
'meowth',
'persian',
'psyduck',
'golduck',
'mankey',
'primeape',
'growlithe',
'arcanine',
'poliwag',
'poliwhirl',
'poliwrath',
'abra',
'kadabra',
'alakazam',
'machop',
'machoke',
'machamp',
'bellsprout',
'weepinbell',
'victreebel',
'tentacool',
'tentacruel',
'geodude',
'graveler',
'golem',
'ponyta',
'rapidash',
'slowpoke',
'slowbro',
'magnemite',
'magneton',
'farfetch\'d', //not sure how this one works?
'doduo',
'dodrio',
'seel',
'dewgong',
'grimer',
'muk',
'shellder',
'cloyster',
'gastly',
'haunter',
'gengar',
'onix',
'drowzee',
'hypno',
'krabby',
'kingler',
'voltorb',
'electrode',
'exeggcute',
'exeggutor',
'cubone',
'marowak',
'hitmonlee',
'hitmonchan',
'lickitung',
'koffing',
'weezing',
'rhyhorn',
'rhydon',
'chansey',
'tangela',
'kangaskhan',
'horsea',
'seadra',
'goldeen',
'seaking',
'staryu',
'starmie',
'mr mime',
'scyther',
'jynx',
'electabuzz',
'magmar',
'pinsir',
'tauros',
'magikarp',
'gyarados',
'lapras',
'ditto',
'eevee',
'vaporeon',
'jolteon',
'flareon',
'porygon',
'omanyte',
'omastar',
'kabuto',
'kabutops',
'aerodactyl',
'snorlax',
'articuno',
'zapdos',
'moltres',
'dratini',
'dragonair',
'dragonite',
'mewtwo',
'mew']
let caughtPokemon = [];

let score;
let time;
let timeSeconds;
let isPlayingGame = false;

//DOM selectors
const startButton = document.getElementById('start-button');
const wordInput = document.getElementById('input-box');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const message = document.getElementById('message')

const playGame = () => {
    if(!isPlayingGame){
        resetGame();
        initialise();
    }
}

const resetGame = () => {
    //reset score
    score = 0;
    scoreDisplay.innerText = score;
    //reset time
    timeSeconds = 300;
    //result word input
    wordInput.disabled = false;
    wordInput.value = '';
    //reset caught pokemon
    caughtPokemon = [];
    //reset message
    message.innerText = '';

}

const initialise = () => {
    console.log('Initialised Game!!');

    startButton.setAttribute('disabled',true);

    isPlayingGame = true;

    wordInput.addEventListener('input', checkInput);


    intervalTime = setInterval(countDownTimer, 1000);
    interval = setInterval(checkGameStatus, 500);

    // console.log(isPlayingGame);
}

//diasable element
const disableElement = (element) => {

}

//Scoring
const scoreUpdate = () => {
}

//Check input
const checkPokemonMatch = () => {
    let matched = false;
    let input = wordInput.value.toLowerCase();
    //check is input matches pokemon and not been said before
    if(pokemon.includes(input) && !caughtPokemon.includes(input)){
        matched = true;
        caughtPokemon.push(input); //pushes to already said pokemon
    }
    return matched;
}


const checkInput = () => {
    if(checkPokemonMatch()){


        score++;

        scoreDisplay.innerText = score;
        // console.log(pokemon);
        // console.log(namedPokemon);

        wordInput.value = ''; //clears input once correct
    }

}

//Time Updates
const timeUpdate = (timeInSeconds) =>{
    let timeString;
    let minutes = Math.floor(timeInSeconds/60);
    let seconds = (timeInSeconds % 60);
    if(seconds === 0){
        seconds = '00';
    } else if(seconds < 10){
        seconds = `0${seconds}`;
    }

    timeString = `${minutes}:${seconds}`
    return timeString;
    // return time
}

const countDownTimer = () => {
    if(timeSeconds > 0) {
        timeSeconds--;
        // timeUpdate(timeSeconds);
    } else if(timeSeconds === 0){
        isPlayingGame = false;
        clearInterval(intervalTime);
    }

    timeDisplay.innerText = timeUpdate(timeSeconds);
}

//capitolise first letter of string
const firstLetterCap = (string) => {
    let firstLetter = string.slice(0,1).toUpperCase();

    return `${firstLetter}${string.slice(1)}`;
}

const checkGameStatus = () => {
    if(!isPlayingGame && timeSeconds === 0){
        let upperCaughtPokemon = caughtPokemon.map(pokemon => firstLetterCap(pokemon))
        message.innerHTML = `Game Over, You Caught: ${score} Pokemon <br> ${upperCaughtPokemon.join(' <br>')}`;
        clearInterval(interval);
        wordInput.setAttribute('disabled',true);
        startButton.disabled = false;
    }
}

startButton.addEventListener('click', playGame);