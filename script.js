const 

  excerciseScreen               = document.getElementById('game-screen'),
  optionBox                     = [...document.querySelectorAll('.answer-box')],
  optionBoxText                 = [...document.querySelectorAll('.answer')],
  timer                         = document.getElementById('timer'),
  gameModeButton                = [...document.querySelectorAll('.gameMode')],
  mainScreen                    = document.querySelector('#main_screen'),
  gameScreen                    = document.querySelector('#game-screen'),
  gameModeScreen                = document.querySelector('#gameMode-screen'),
  retryScreen                   = document.querySelector('.retry-screen'),
  finalScreen                   = document.querySelector('#final-screen'),
  scoreBoardScreen              = document.querySelector('#scoreBoardScreen'),
  settingScreen                 = document.querySelector('.settingScreen'),
  infoScreen                    = document.querySelector('.infoScreen'),
  allScreensList                = [...document.querySelectorAll('.screen')],
  scoreScreenData               = document.querySelector('.score-screen'),
  transitionScreen              = document.querySelector('.transition-screen'),
  points                        = [...document.querySelectorAll('.points-box')],
  multiplier                    = document.querySelector('#multiplicador'),
  lifeBar                       = document.querySelector('#bar'),
  retryButton$RetryScreen       = document.querySelector('#retry-button'),
  retryButton$FinalScreen       = document.querySelector('#retry-button2'),
  backButton$RetryScreen        = document.querySelector('#back-menu'),
  backButton$FinalScreen        = document.querySelector('#back-menu2'),
  backButton$GameModeScreen     = document.querySelector('#back-menu3'),
  backButton$ScoreBoardScreen   = document.querySelector('#back-menu4'),
  backButton$settingScreen      = document.querySelector('#back-menu5'),
  backButton$infoScreen         = document.querySelector('#back-menu6'),
  continueButton                = document.querySelector('#continue-button'),
  goScoreBoardButton            = document.querySelector('#score-board-button'),
  pauseButton                   = document.querySelector('.pauseButton'),
  difContainer                  = [...document.querySelectorAll('.dif-container')],
  difIcon                       = [...document.querySelectorAll('.dif-icon')],
  easyMode                      = [...document.querySelectorAll('.easy')],
  mediumMode                    = [...document.querySelectorAll('.medium')],
  hardMode                      = [...document.querySelectorAll('.hard')],
  nameMode                      = document.querySelector('#name-mode'),
  corrects                      = document.querySelector('#corrects'),
  fails                         = document.querySelector('#fails'),
  comboMax                      = document.querySelector('#combo'),
  score                         = document.querySelector('#score'),
  rankLetterText                = document.querySelector('#rank-letter'),
  rankContainer                 = document.querySelector('.rank'),
  playButton                    = document.querySelector('#play'),
  infoButton                    = document.querySelector('#info'),
  scoreBoardItem                = [...document.querySelectorAll('.data-item')],
  scoreBoardList                = document.querySelector('.scoreBoardContainer'),
  levelMusic                    = document.querySelector('#levelsMusic'),
  finalScreenMusic              = document.querySelector('#finalScreenMusic'),
  failSound                     = document.querySelector('#failSound'),
  gameModeClickSound            = document.querySelector('#gameModeClickSound'),
  menuBackSound                 = document.querySelector('#menu-backSound'),
  menuBackSound2                = document.querySelector('#backButtonPause'),
  menuNormalClick               = document.querySelector('#menuNormalClick'),
  retryButtonClickSound         = document.querySelector('#retryButtonSound'),
  iconListClickSound            = document.querySelector('#iconListSound'),
  menuthemeMusic                = document.querySelector('#menuthemeMusic'),
  correctOptionClickSound       = document.querySelector('#correctOptionClick'),
  comboBreakSound               = document.querySelector('#comboBreakSound'),
  wrongOptionClickSound         = document.querySelector('#wrongOptionClick'),
  allSoundFXList                = [...document.querySelectorAll('.soundFX')],
  levelMusicSwitch              = document.querySelector('#levelMusicSwitch'),
  mainThemeMusicSwitch          = document.querySelector('#mainThemeMusicSwitch'),
  allSoundsFxSwitch             = document.querySelector('#allSoundsFXswitch'),
  goSettingsButton              = document.querySelector('#settings'),
  gameTitle                     = document.querySelector('#game-title'),
  lockedModeIcon                = [...document.querySelectorAll('.locked-mode')];


  // Lista de operadores 
const operatorsList = [
    adicion            = 0,                                          
    sustraccion        = 1,
    multiplicacion     = 2,                          
    division           = 3,
    aleatorio          = 4,
]
// Modos de juego 
const adicionMode     = gameMode('adicion',0) ,
      sustrMode       = gameMode('sustraccion',1),
      multMode        = gameMode('multiplicacion',2),
      divisionMode    = gameMode('division',3),
      mixMode         = gameMode('aleatorio',4);

// Lista de clases a aplicar para los ejercicios
const classList = [
  'centerPos',
  'rightPos',
  'leftPos'
];
// Para aplicar estilos 

// lista de botones 
const buttonList = [
  retryButton$FinalScreen,backButton$FinalScreen,retryButton$RetryScreen,backButton$RetryScreen,pauseButton,continueButton
]
// lista de pantallas 
const screenList = [
  gameScreen,
  finalScreen,
  transitionScreen
]

// Para escribir la dificultad del modo en la pantalla final 
const diffNameMode = [
  'FÁCIL',
  'MEDIO',
  'DIFÍCIL'
];

// Para la animacion de los ejercicios 
let currentExercise              = document.getElementById('current');


// INDICES DE DIFICULTADES, FACIL, MEDIO, DIFICIL, UNIDAD e intervalo de LifeBar
let  easy      = 0, easyUnity   = 5, easyLifeBar      = 200; 
let medium     = 1, mediumUnity = 15, mediumLifeBar   = 120;
let  hard      = 2, hardUnity   = 15, hardLifeBar     = 80;

// Array con variables para modo FACIL y condicion del modo inverso
const easyParameters     = (operator, cond) => [operator, easyUnity, isInverseIndex, easyLifeBar, isPlayingMixMode = cond];

// para modo MEDIO 
const mediumParameters   = (operator, cond) => [operator, mediumUnity, isInverseIndex, mediumLifeBar, isPlayingMixMode = cond];

// para modo DIFICIL 
const hardParameters     = (operator, cond) => [operator, hardUnity, !isInverseIndex, hardLifeBar, isPlayingMixMode = cond]; 

// Lista con las dificultades y sus parametros 
const gameVariables = [
    easyParameters,
    mediumParameters,
    hardParameters
]
// Imprime el nombre del modo y dificultad  
const nameModeText = (mode,dif)=>{
    nameMode.innerHTML =  `${mode.toUpperCase()} - ${dif}`
}
// Devuelve un string que representa una variable en el CSS  
const colorTheme = (mode, intensity ='' ) => `var(--${mode}${intensity.toString()})`;
const getTransparentColor = (mode) => `var(--${mode}Pause)`
 
// Incremento de unidad, aciertos, fallos, puntuacion, temporizador,
// combo, maxCombo, lifeBar y lista de ejercicios 
let numberUnityCount = 1;
let acerted = 0; 
let failed = 0; 
let scorePoints = 0; 
let temporizerTime = 95;
let gameTime       = 90;
let combo = 0;
let maxCombo = 1;
let lifeBarTime = 100;
let excercisesList = [];
let answersList = [];
// array con los signos de operaciones que se elijen dependiendo de operatorsIndex
const operators = ['+','-','x','/'];
/* ----- Variables que se definiran cuando se comience el juego ----- */

let operatorsIndex = null;
let opIMix = null;
let operationNumbers = null;
let operationAnswer  = null; 
let numberUnity = null;
let numberUnityII = null;
let lifeBarInterval = null;
let correctExcerciseOption = null;
let correctExcerciseOperation = null;
let currentBackgroundColor = null;

// representan un set interval
let temp = null;
let barStatus = null;
let ssRankAnimation = null; 

/*                          -----------                               */

// Animaciones con clases en el CSS 
const 
  pointUp       = '+ 1000',
  pointDown     = '- 1000',
  animationUp   = 'point-animationUp',
  animationDown = 'point-animationDown',
  boxCorrect    = 'answer-boxCorrect',
  boxWrong      = 'answer-boxWrong';

/* ----- Variables flag para condicionar las funciones ----- */

// Si el combo se pierde 
let comboDown = false;

// Cuando se juega modo aleatorio  
let isPlayingMixMode = false;

// Cuando hay modo inverso 
let isInverseIndex = false; 

// Para los efectos del juego co la cancion 
let isLevelMusicOn = true;

// Para ocultar y mostrar los elementos en la pantalla de juego 
let isPlaying      = false;

/*                          -----                             */


// Todos los modos de juego 

createGameMode(...adicionMode);

createGameMode(...sustrMode);

createGameMode(...multMode);

createGameMode(...divisionMode);

createGameMode(...mixMode,true);


// Todos los botones del juego que cambian entre pantallas 

// EN LA PANTALLA PRINCIPAL 

// 1 - para ir a la pantalla de configuracion 
displayScreenButton(goSettingsButton,settingScreen,menuNormalClick);
// 2 - para ir a la pantalla de seleccionar modo de juego 
displayScreenButton(playButton,gameModeScreen,menuNormalClick);
// 3 - para ir la pantalla de informacion 
displayScreenButton(infoButton,infoScreen,menuNormalClick);

// EN LA PANTALLA DE CONFIGURACION 

// 1 - Boton para regresar
displayScreenButton(backButton$settingScreen,mainScreen,menuBackSound);

// Interruptores en la pantalla de configuracion 

// 2 - activar/desactivar la musica de inicio 
settingSwitchClick(mainThemeMusicSwitch,mainThemeMusic_On$Off);
// 3 - activar/desactivar la musica del nivel y los efectos 
settingSwitchClick(levelMusicSwitch,levelMusic_On$Off);
// 4 - activar desactivar los efectos de sonido 
settingSwitchClick(allSoundsFxSwitch,allSoundFX_On$Off);


// EN LA PANTALLA DE INFORMACION 

// 1 - Boton para regresar 
displayScreenButton(backButton$infoScreen,mainScreen,menuBackSound);

// EN LA PANTALLA DE REINTENTAR Y PAUSA

// 1 - Boton para regresar 
displayScreenButton(backButton$RetryScreen,gameModeScreen,menuBackSound);

// 2 - Boton de reintentar en la pantalla de reintentar 
retryButton(retryButton$RetryScreen);

// 3 - Boton de continuar 
displayScreenButton(continueButton,gameScreen,menuNormalClick)

// 4 - Boton de pausa en la pantalla de juego 
displayScreenButton(pauseButton,retryScreen,menuNormalClick)


// EN LA PANTALLA FINAL DE PUNTUACION 

// 1 - Boton para regresar 
displayScreenButton(backButton$FinalScreen,gameModeScreen,menuBackSound);

// 2 - Boton de reintentar 
retryButton(retryButton$FinalScreen);

// PANTALLA DE SELECCIONAR MODO DE JUEGO 

// 1 - Boton para regresar a la pantalla inicial
displayScreenButton(backButton$GameModeScreen,mainScreen,menuBackSound);

// 2 - para ir a la pantalla de historial de puntajes 
displayScreenButton(goScoreBoardButton,scoreBoardScreen,menuNormalClick);

// 3 - Boton para regresar 
displayScreenButton(backButton$ScoreBoardScreen,gameModeScreen,menuBackSound);

// Al clickear en una opcion 
optionBoxClick();


// Crea un modo de juego con elementos del HTML definiendo las variables 
function createGameMode(nameMode ,operator ,icon ,list ,easyMode ,mediumMode ,hardMode ,playMixMode = false){

  // Para ocultar y mostrar la lista de dificultades 
  icon.addEventListener('click',()=>{
    list.style.bottom = list.style.bottom == '0%' ? '100%' : '0%';

    play$Control_Sound(iconListClickSound, 'play');

    // oculta de nuevo la lista automaticamente 
    setTimeout(() => {
      list.style.bottom = '100%'
    }, 6000);
  });

// Dificultades de la lista
  const difficultList = [
    easyMode,
    mediumMode,
    hardMode
  ]

  // Al clickear en alguna dificultad
  // En Facil, Medio y Dificil 
  difficultList.forEach( item =>{ 

    // dificultad 
    item.addEventListener('click', ()=>{

      // Establece el color del tema 
      setModeColorTheme(nameMode);

      // funcion que define los parametros para la dificultad
      setAllVariables(...gameVariables[difficultList.indexOf(item)](operator,playMixMode));

      // Define el nombre del modo de juego y dificultad en la pantalla final 
      nameModeText(nameMode,diffNameMode[difficultList.indexOf(item)]);

      play$Control_Sound(gameModeClickSound,'play');

      // Inicia el juego 
      playGame()
    })
  });

  // Click en el boton del modo por defecto es nivel facil
  gameModeButton[operator].addEventListener('click', ()=>{

    // Inicializa los parametros de easyParameters 
    setAllVariables(...gameVariables[0](operator,playMixMode));

    // Establece el color del tema 
    setModeColorTheme(nameMode);

    // Nombre y modo de juego en la pantalla final 
    nameModeText(nameMode,diffNameMode[0]);

    play$Control_Sound(gameModeClickSound,'play');

    // Inicia el juego 
    playGame();
})
}

// Inicializa todas las variables del juego 
function setAllVariables(opI,unity,condition,lifeBInterval,playMix){

  operatorsIndex        = opI; // operador a utilizar
  numberUnity           = unity; // unidad de los numeros aleatorios
  numberUnityII         =  unity / 10;
  inverseIndex          = condition; // Indice inverso true o false
  lifeBarInterval       = lifeBInterval; // Intervalo para la LifeBar
  isPlayingMixMode      = playMix // condicion de modo aleatorio

}

// Genera numeros aleatorios para las operaciones 
function getRandomNumbers(){

  let a = 10 + ((Math.ceil(Math.random() * numberUnity) + numberUnityCount)),
      b = 5  + ((Math.floor(Math.random()* numberUnity) + numberUnityCount)),
      c = 2  + (Math.ceil(Math.random()*(numberUnity + numberUnityCount))),
      d = 1  + (Math.ceil(Math.random()*(numberUnity + numberUnityCount))),
      e = null,
      f = null;

  switch (operatorsIndex) {
    case adicion:

      return [a,b];
      break;

    case sustraccion:

      return [a,b];
      break;

    case multiplicacion:

      return [c,d];
      break;

    case division:

      return [...generateEvenNumbers(e,f)];
      break;

  }       
}

// Genera un ejercicio aleatorio con sus opciones 
function generateRandomExcercise(){

  // generador de operadores aleatorios para el modo mixto 
  isPlayingMixMode ? randomOpIMixMode() : operatorsIndex = operatorsIndex;

  // Genera numeros y la respuesta segun la operacion 
  generateNumbers$Answers();

  // ---- GENERAR 4 OPCIONES DE RESPUESTA ---- //

  // genera un indice para elegir una caja con la respuesta
  let correctBoxIndex = Math.floor(Math.random()*4); 

  // para evitar que las opciones se repitan
  const differentNumber = [(10),(-1),(-10)]; 
  const differentNumber1 = [(1),(2),(2),(1),(3),(2)]; 
  let differentNumberIndex = -1;
  const randomOptionNumber = (i) => (operationAnswer - differentNumber[i]);

  // Aqui se definen las opciones con respuestas u operaciones 
  optionBoxText.forEach( option => {

    // opcion correcta 
    if(optionBoxText.indexOf(option) == correctBoxIndex){

      // se crean una opcion con el resultado de la operacion o la operacion
      writeOptionText(option, operationNumbers, operationAnswer);

    }

    // opciones restantes
    else{

      // para elegir un numero que haga diferente a las opciones  
      differentNumberIndex++;

      // Escribe las operaciones o respuestas que no son correctas 
      writeOptionText(option, getDifferentOperationNumbers(operationNumbers,differentNumber1,differentNumberIndex), randomOptionNumber(differentNumberIndex))

    }
  });

  // <---- SE DEFINEN LAS VARIABLES DE OPERACION Y RESPUESTA CORRECTA ----->

  // resultado
  correctExcerciseOption = operationAnswer;

  // operacion  
  correctExcerciseOperation = `${operationNumbers[0]} ${operators[operatorsIndex]} ${operationNumbers[1]}`;

 // Guardar las respuestas u operaciones en arrays segun inverseIndex 
 saveExcercise$Answer(correctExcerciseOperation, correctExcerciseOption)

 // // Escribe en pantalla la respuesta o la operacion
 inverseIndex ? writecurrentExercise(answersList) : writecurrentExercise(excercisesList);

 console.log('generateRandomExercise')
}

//Guarda las respuestas y operaciones en un array
function saveExcercise$Answer(excercise, answer){

    // añade la respuesta a la lista respuestas
    answersList.push(answer);

    // añade la operacion a la lista de ejercicios 
    excercisesList.push(excercise);

}

// Activa los clicks en las opciones 
function optionBoxClick(){

  // Cada opcion recibe un evento click 
  optionBox.forEach( option =>{

    option.addEventListener('click',()=>{ 

      optionClick(undefined, option);

    })
  })
}

//Cuando se hace click en una opcion y es correcta o incorrecta
function optionClick(el,box){

  // el se pasa como indefinido y se define aqui 
  inverseIndex ? el = correctExcerciseOperation : el = correctExcerciseOption;

  //si la opcion clickeada coincide con la respuesta u operacion correcta 
  if(optionBoxText[optionBox.indexOf(box)].innerHTML == el){ 
   correctOptionClick(box);
  }

  // si la respuesta es incorrecta 
  else{
   wrongOptionClick(box)
  }
}

// Para escribir las respuesta y operaciones en las opciones 
function writeOptionText(option, arr, text){
  
  if(inverseIndex){

    // escribe la operacion 
    getOperationText(option,arr)

  }
  else{

    // escribe el resultado de la operacion 
    option.innerHTML = text;

  }
}

// Genera un texto para el HTML con los numeros de la operacion y el operador
const getOperationText = (current,nums) => current.innerHTML = `${nums[0]} ${operators[operatorsIndex]} ${nums[1]}`;

// Animacion de la opcion correcta 
function correctOptionClick(box){

  generateRandomExcercise();

  //incrementa la unidad
  numberUnityCount++

  // recarga a lifeBar 
  lifeBarTime=100;

  // incrementa los aciertos 
  acerted++;

  // incrementa el puntaje
  scorePoints+=1000*combo;

  //  animacion de combo 
   comboMultiplierUp();

  //  animacion de puntos 
  optionBoxPoints(optionBox.indexOf(box),animationUp,pointUp,boxCorrect);

  play$Control_Sound(correctOptionClickSound,'play')

  console.log('PASS');
}

// Animacion de opcion incorrecta 
function wrongOptionClick(box){

  generateRandomExcercise();

  //incrementa la unidad
  numberUnityCount++   

  // resta vida a lifeBar 
  lifeBarTime-=10;

  // incrementa la variable de fallos 
  failed++;

   // animacion de combo 
  comboMultiplierDown();

  // animacion de puntos 
  optionBoxPoints(optionBox.indexOf(box),animationDown,'',boxWrong);

  play$Control_Sound(wrongOptionClickSound,'play');

  console.log('ERROR')
}

// Animaciones para las opciones correctas o incorrectas 
function optionBoxPoints(boxIndex,animation,p,bgColor){

  // añade un color a la opcion clickeada
   optionBox[boxIndex].classList.add(bgColor);

  //  puntos animados en la opcion 
   points[boxIndex].innerHTML = p;

  //  añade una clase a los puntos 
   points[boxIndex].classList.add(animation);

  //  se quitan las animaciones 
   setTimeout(() => {
     optionBox[boxIndex].classList.remove(bgColor);
     points[boxIndex].classList.remove(animation)
   }, 500);
}

// Iniciar temporizador y lifeBar
const temporizer = () => {
  // Este temporizador se inicia 2,8 segundos despues junto con lifeBar para sincronizar con la pantalla de transicion 
 let temporizerTimeOut = setTimeout(() => {

  // se define la variable temp con un setInterval para el temporizador 
   temp = setInterval(() =>{

    // actualizar el numero del tiempo en el HTML 
     timer.innerHTML = `${gameTime.toFixed(1)}s`;

    //  restar para hacer de cuenta regresiva 
     temporizerTime-=0.1;
     gameTime-=0.1

   if(isLevelMusicOn){
      // Le aplica una animacion a la pantalla de juego 
      switchBackgroundColors(levelMusic.currentTime);
   }
   //  si el tiempo llega a 0  
   if (gameTime < 0.1) {
     show$Hidden_AllGameScreenChildren();
     clearInterval(barStatus)
   }
   
   if(temporizerTime < 3 ){

    //  finalizar los intervalos de temp y barStatus 
    clearIntervals();

    //  Establecer los resultados en la pantalla final
     printFinalScreenInfo();

    //  Muestra la pantalla final  
     displayScreen(finalScreen);

     //Pausa la cancion del nivel
     play$Control_Sound(levelMusic,'pause');
    //reproduce la cancion de la pantalla final 
     play$Control_Sound(finalScreenMusic,'play');

     
    //Finaiza el timeOut
    clearTimeout(temporizerTimeOut) ;
   }
   }, 100);

  //  Inicia la lifeBar 
   lifeBarStatus();

 },  2800);
}

const lifeBarStatus = ()=>{
// se define barStatus como setInterval 
 barStatus = setInterval(() => {

  //  restar para descargar la barra 
   lifeBarTime-=1.5;


  //  actualiza el width del barra en el CSS 
   lifeBar.style.width = `${lifeBarTime}%`;

  //  si la barra de vida se descarga ... 
   if (lifeBarTime < 1) {

   clearIntervals()

   play$Control_Sound(failSound,'play'); 

   play$Control_Sound(levelMusic,'pause');

   //  se muestra la pantalla de reintentar 
   displayScreen(retryScreen);

  //  oculta el boton de continuar 
   continueButton.style.display = 'none';

   console.log('Pantalla de reintentar');
  }
 },lifeBarInterval);
}

// PANTALLA DE TRANSICION SOLO PARA LOS MODOS Y REINTENTAR
function screenGameTransition(){

  // ocultar todas las pantallas 
  displayScreen();

  resetAllVariables();

  // se muestra la pantalla con el conteo de 3 segundos 
  transitionScreen.innerHTML = 3;
  transitionScreen.style.display = 'flex';

  // inicia el contador regresivo 
  let seconds = 2;
  let timer = setInterval(() => {
    transitionScreen.innerHTML = seconds;
    seconds-=1;

  // cuando se finaliza la cuenta regresiva 
  if(seconds < 0){

    play$Control_Sound(levelMusic,'play')

    // se oculta la pantalla y se muestra la de juego 
    transitionScreen.style.display = 'none'
    console.log('Pantalla de juego')

    // Muestra la pantalla de juego 
    displayScreen(gameScreen);

    // Finaliza el conteo 
    clearInterval(timer);
  }
  }, 1000);
}

// Animaciones de combo 
const comboAnimation = (display,animationCombo,animationLifeBar) =>{

  // Añade una animacion del CSS al multiplicador 
  multiplier.classList.add(animationCombo);

  //Añade una animacion a la lifeBar
  lifeBar.classList.add(animationLifeBar);

  // se quitan las animaciones añadidas 
  setTimeout(() => {
    lifeBar.classList.remove(animationLifeBar);
    multiplier.classList.remove(animationCombo);
    multiplier.style.display = display;
  }, 500);
}

// Cuando se aumenta el combo y respuesta correcta 
const comboMultiplierUp = () => {

  // condicion para el maxCombo 
  comboDown = false;

  // incrementa el combo 
  combo++;

  // comboMax 
  comboMax$();

  // Igualar multiplicador al combo actual 
  multiplier.innerHTML = `${combo}x`;
  // mostrar el multiplicador 
  multiplier.style.display = 'flex';

  // Animacion de los elementos 
  comboAnimation('flex','comboUp','lifeBarUp');
}

// Para cuando se pierde el combo 
const comboMultiplierDown = () => {

  // flag para cuando se pierde el combo y el maxCombo 
  comboDown = true;

  if(combo >= 5){
    play$Control_Sound(comboBreakSound,'play')
  }

  // Animacion de los elementos 
  comboAnimation('none','comboBreak','lifeBarDown');

  // Combo vuelve a ser 0 
  combo = 0;
}

// Para guardar el combo maximo en una variable 
function comboMax$(){

  // mientras el combo no se pierda se actualizara la variable 
  if(comboDown == false && maxCombo == combo){
  maxCombo++;
  }
  console.log(maxCombo,combo)
}

// Cambio entre pantallas con displays 
function displayScreen(screen){

// indice de pantalla a mostrar 
const screenToShow = allScreensList.indexOf(screen);

allScreensList.forEach( element => { 

  // oculta todas las pantallas 
  element.style.display = 'none';

  // menos la que se pase como parametro 
 if (allScreensList.indexOf(element) == screenToShow){

    element.style.display = 'flex'
  }
 });

};

// Finaliza los intervalos usados en la pantalla de juego 
function clearIntervals(){
  clearInterval(barStatus); // lifeBar
  clearInterval(temp)      // temporizador
}

// Resultados en la pantalla final
function printFinalScreenInfo(){

  corrects.innerHTML = acerted;      //aciertos
  fails.innerHTML    = failed;      //fallos
  score.innerHTML    = scorePoints; // puntaje final
  comboMax.innerHTML = maxCombo - 1
  generateRankLetter();             // rango

  // Añade un nuevo elemento al HTML con los datos del puntaje final 
  writeOnScoreBoard()
}

// Para empezar el juego 
function playGame (){

// Genera un ejercicio aleatorio 
  generateRandomExcercise();

  // Muestra la pantalla de 3,2,1 
  screenGameTransition();
  
  // Inicia el temporizador 
  temporizer();

  // Pausa la musica principal 
  play$Control_Sound(menuthemeMusic,'pause');

  // Muestra los elementos que se ocultaron en la pantalla de juego 
  show$Hidden_AllGameScreenChildren()

}

// Resetea todas las variables del juego
function resetAllVariables (){

  numberUnityCount = 1; //incrementa la unidad
  temporizerTime = 95;     // tiempo de la partida
  gameTime = 90; //tiempo de juego
  lifeBarTime = 100;   // barra de vida
  acerted = 0;    // aciertos
  failed  = 0;   // fallos
  combo   = 0;      // combo
  maxCombo = 1;     //combo maximo
  scorePoints = 0; // puntaje 
  rankLetterText.innerHTML =''; // rango
  excercisesList = [];
  answersList = [];
  isPlaying = true;
  comboMultiplierDown(); // multiplicador
  // remueve los estilos del rango SS 
  removeLetterStyles();
  gameScreen.style.animationName = '';
  continueButton.style.display = 'flex';
  setAtimationExercise(0)
  optionBox.forEach ( box =>{
    box.style.animationDuration = ''
  })

 
  clearIntervals()
  console.log('resetAllVariables')
}

// Iguala a prevExcercise a currentExercise para mostrar el siguiente
function writecurrentExercise(arr){

  // elemento actual del array 
  const current = arr.length - 1;

  // Se escribe en pantalla la operacion 
  currentExercise.innerHTML = arr[current];
  
}

// Establece el rango obtenido y aplica los estilos a la letra 
function rankLetterStyle(letter,letterColor,secondaryColor){
  
  // Letra 
  rankLetterText.innerHTML = letter;

  // Animacion del CSS que lo deja posicionado 
  rankLetterText.classList.add('rankLetterShow');

  // Color de la letra 
  rankLetterText.style.color = letterColor;

  //Cuando la letra es SS se inicia un set interval 
  //para la animacion de la letra
  if (letter == 'SS') {
     ssRankAnimation = setInterval(() => {
      rankLetterText.style.color = rankLetterText.style.color == letterColor ? secondaryColor : letterColor
    }, 800);
  }
}

// Genera un rango basado en los fallos 
function generateRankLetter(){

  // determinara un rango basado en la cantidad de fallos 
  switch (failed) {
    case 0:
      if(acerted >= 25){
        rankLetterStyle('SS','gold','goldenrod');
        unlockGameMode(operatorsIndex);
      }
      else{
        rankLetterStyle('S','gold','goldenrod'); 
        unlockGameMode(operatorsIndex);
         
      }
      break;
    case 1:
      rankLetterStyle('A','lime')
      unlockGameMode(operatorsIndex);
      break;
    case 2:
      rankLetterStyle('B','dodgerblue')
      break;
    case 3:
      rankLetterStyle('C','darkviolet')
      break;
    case 4:
      rankLetterStyle('D','brown')  
    default:
      break;
  }
  // siempre sera rango D si hay mas de 4 fallos 
  if (acerted > 0 && failed > 4){
    rankLetterStyle('D','brown')  
  } 
} 

// Para remover el set interval en la animacion de la letra del Rango 
function removeLetterStyles() {

  // Quita la animacion para volver a ser aplicada 
  rankLetterText.classList.remove('rankLetterShow');

  // Finaliza el intervalo 
  clearInterval(ssRankAnimation)
}

// Establece los colores a los elementos del juego 
function setModeColorTheme(color){

  screenList.forEach( screen =>{
    screen.style.backgroundImage = getBackgroundImageColor(color);
  })

  retryScreen.style.backgroundColor = getTransparentColor(color)

  // en los numeros de las opciones 
  optionBox.forEach( box =>{
    box.style.color = colorTheme(color);
  });

  // color de lifeBar 
  lifeBar.style.backgroundColor = colorTheme(color);

  // Pantalla de puntuacion 
  scoreScreenData.style.backgroundColor = colorTheme(color);

  // Colores de los botones 
  buttonList.forEach (btn =>{
    btn.style.backgroundColor = colorTheme(color)
    btn.style.color = 'white';
  })
}

// Generador de numeros pares en el modo de division 
function generateEvenNumbers (n1,n2){

  let magicNumber = Math.ceil(Math.random()*9)
  // Para verificar si el numero es par 
  const isEven = (num)=>{
    return num % magicNumber  === 0 ? true : false;
  };
  // Condicion 
  let hasEvenNumbers = false;
//  Mientras el numero no sea par 
  while(!hasEvenNumbers){

    // genera numeros aleatorio 
    n1 = numberUnityCount + Math.ceil(Math.random() * (numberUnity*10)); 
    n2 = numberUnityCount + Math.ceil(Math.random() * (numberUnity*10));

    // si el numero es par 
    if(isEven(n1) && isEven(n2) && (n1%n2 == 0) && (n1!==n2)){
      hasEvenNumbers = true;
    }
  }
  console.log(magicNumber)
  return [...arguments]
}

// Generador de operadores para el modo aleatorio  
function randomOpIMixMode (){
  operatorsIndex = Math.floor(Math.random()*4);
}

// Funcion para unir los elementos y variables de un modo de juego con un indice 
function gameMode (name,i){

  return [

    name,              //nombre para el color de tema y pantalla final
    operatorsList[i], //operador 
    difIcon[i],      // icono de lista en el HTML
    difContainer[i], // lista en el HTML
    easyMode[i],     // item 
    mediumMode[i],   // item
    hardMode[i]     //  item

  ]  
}

// Genera numeros aleatorios para la operacion y respuesta 
function generateNumbers$Answers(){

  // Se define la variable operationNumbers 

  // numeros de la operacion a mostrar
    operationNumbers = getRandomNumbers();

   // Genera una respuesta con los numeros y el operador 
    operationAnswer = operationNumbers.reduce((a,b)=> {

    switch (operatorsIndex) {
      case adicion:
        return a + b // cuando es suma  
        break;
      case sustraccion:
        return a - b// cuando es resta
        break;
      case multiplicacion:
        return a * b// cuando es multiplicacion
        break;
      case division:
        return a / b//cuando es division
        break;
    }
  })
}

// Para cambiar de pantalla en los botones 
function displayScreenButton(button,screen,sound){

  button.addEventListener('click', ()=>{

    // cambia a la pantalla que se le pase como parametro
    displayScreen(screen);


    // si el boton es "para ir a la seleccion de modos" en la pantalla de pausa 
    if(button == backButton$RetryScreen || button == backButton$FinalScreen){

      // quita la musica del juego 
      play$Control_Sound(levelMusic,'pause');
      // incia la de menutheme 
      play$Control_Sound(menuthemeMusic,'play');
      // limpia los intervalos del juego 
      clearIntervals();
      resetAllVariables();
    }

    // si el boton es para "ir a la pantalla de inicio" en la de seleccion de modos 
    if (button == backButton$GameModeScreen) {
      
      turnOn$OffMenuThemeMusic('on')
    }

    // si es el boton de "jugar" en la pantalla principal
    if(button == playButton){

      turnOn$OffMenuThemeMusic('off');

    }

    // aqui se reproduce el sonido del click 
    play$Control_Sound(sound,'play');

    console.log('displayScreenButton');

  });

};

// Al clickear en botones de reintentar 
function retryButton(button){
  button.addEventListener('click',()=>{

    // reseta las variables para comenzar de nuevo 
    resetAllVariables();
    clearIntervals()
    playGame();
    play$Control_Sound(menuBackSound2,'play');
    play$Control_Sound(levelMusic,'pause');
    
  })
};

// Crea un elemento para el historial de puntajes 
function writeOnScoreBoard(){
  
  // se crea un nuevo elemento div 
  let newDataItem = document.createElement('div');

  // añade la clase del css 
  newDataItem.classList.add('data-item')

  // se le incluyen otros elementos dentro 
  newDataItem.append(...createScoreData());

  // se añade finalmente al contenedor de los puntajes 
  scoreBoardList.appendChild(newDataItem);

}

// Se crean los elementos que contienen los datos del resultado final 
function createScoreData(){

  // nombre del modo
  let newNameMode = document.createElement('div');


  // añadir clase para tener estilos con css
  newNameMode.classList.add('data-name','data');

  // es el mismo que en la pantalla de puntuacion
  newNameMode.innerHTML = nameMode.innerHTML;


  // Puntaje 
  let newScore = document.createElement('div');

  newScore.classList.add('data-score','data');

  newScore.innerHTML = scorePoints;


  // Rango obtenido 
  let newRank = document.createElement('div');

  newRank.classList.add('data-score','data');

  newRank.innerHTML = rankLetterText.innerHTML

  // retorna un array con los elementos HTML
  
  return [newNameMode,newScore,newRank]
}

// Para reproducir y pausar la musica del nivel 
function play$Control_Sound(sound,stat){

  // Inicia la cancion en 0 segundos 
  sound.currentTime = 0;

  // Reproduce o pausa la cancion 
  switch (stat) {

    case 'play':
      sound.play();
      console.log('play')
      break;

    case 'pause':
      sound.pause();
      console.log('pause')
      break;
  
    default:
      break;
  }
}

// Para el color de fondo con musica 
function switchBackgroundColors(time) {
    
  // Esta funcion toma como parametro el valor del levelMusic.currentTime y cambia el color de fondo 

  if (time > 0) {

     switchBgColorAnimation(1,6);

  }

  if(time > 22){

    switchBgColorAnimation(2,4);

  }

  if(time > 39.3){

    switchBgColorAnimation(3,35);
    setAtimationExercise(35);

  }

  if( time > 62 ){
    switchBgColorAnimation(4,25);
    setAtimationExercise(25);
  }

  if(time > 84 ){
    isPlaying = false
    switchBgColorAnimation(1,7)
    setAtimationExercise(0)
  }

}

// Devuelve un string con el background-image de la pantalla de juego 
const getBackgroundImageColor = (mode) => `linear-gradient(var(--secondBackground), ${colorTheme(mode)})`;

//devuelve un string para el nombre de los colores CSS del los switch 
const getSwitchVarColor =(condition, base = '')=> `var(--switch${base}${condition})`;

// Para cambiar los colores añadiendo una animacion a la pantalla de juego 
function switchBgColorAnimation (number,duration){

  // Esta funcion recibe un numero que sera indicara cual variable CSS se usara en el string
 // tambien recibe otro numero que indica la duracion de la animacion en el CSS

//  Variable que definira el modo que se esta jugando 
  let mode = null ;

  switch (operatorsIndex) {

    case 0:
      mode = 'adicion'
      break;

    case 1:
      mode = 'sustraccion'
      break;

    case 2:
      mode = 'multiplicacion';
      break;  
    
    case 3:
      mode = 'division';
      break;

    case 4:
      mode = 'aleatorio'
      break;

    default:
      break;
  }

  // Aqui se asigna el nombre y la duracion de la animacion 
  setAnimationName$Duration(mode,number,duration);
}

// devuelve un string con el nombre de la animacion 
const getAnimationName = (mode,number)=> `${mode}BgIntensity${number}`;

// Para aplicar establecer la animacion en la clase CSS de la pantalla de juego 
function setAnimationName$Duration(name,number,duration){

  // aqui se le asigna el nombre a la animacion 
  gameScreen.style.animationName = getAnimationName(name,number);

  //aqui la duracion 
  gameScreen.style.animationDuration = `.${duration}s`;
 

}

// para quitar en loop de la musica de fondo 
function turnOn$OffMenuThemeMusic(condition){

  let on$Off = condition;

  switch (on$Off) {
    case 'on':
      menuthemeMusic.loop = true;
      play$Control_Sound(menuthemeMusic,'play')
      break;
    case 'off':
      menuthemeMusic.loop = false;
    default:
      break;
  }
}

// Para ponerle una animacion al ejercicio y las respuestas en el transcurso del temporizador 
function setAtimationExercise(duration){

  // Ya tienen una animacion en el CSS asi que solo se le pasa la duracion para activarla 

  // el ejercicio
  currentExercise.style.animationDuration  = `.${duration}s`;
  
  if( levelMusic.currentTime > 62){
    optionBox.forEach( box => {
      box.style.animationDuration = `.${duration}s`;
    } )
  }
  
}

// Esta es para ocultar los elementos de la pantalla de juego 
function show$Hidden_AllGameScreenChildren(){

  const itemList = [...gameScreen.children];
  itemList.forEach( item =>{

    // si esta jugando se muestran
    if(isPlaying){
      item.style.display = 'grid';
    }
    // sino, se ocultan
    else{
      item.style.display = 'none';
    }
  })
}

// Funcion para los todos los swtichs en la pantalla de configuracion
function settingSwitchClick(button,config){

  // inician activos 
  let on$Off = true;

  // la base del switch
  button.addEventListener('click',()=>{

    // este es el circulo 
    let switchCircle = button.children[0];

    // aqui se desplaza 
    switchCircle.style.transform = switchCircle.style.transform == 'translateX(-5%)'? 'translateX(70%)' : 'translateX(-5%)'

    on$Off = on$Off == true ? false : true;

    // estilos de los swtich
    switch_On$Off_style(on$Off,button,switchCircle);

    // funcion a ejecutar 
   config(on$Off)
  })

  
}


// Funciones parametro para los interruptores 

// para activar/desactivar la musica del juego y los efectos 
function levelMusic_On$Off(condition){

  if( condition ){
    isLevelMusicOn = true;
    levelMusic.muted = false;
  }
  else{
    isLevelMusicOn = false;
    levelMusic.muted = true;
  }

}

//  para desactivar/activar la musica de la pantalla principal 
function mainThemeMusic_On$Off(condition){
  
  if( condition ){
    menuthemeMusic.muted = false;

    // aqui se añade una clase con animacion al titulo del juego 
    gameTitle.classList.add('mainThemeAnimation');
    
  }
  else{
    menuthemeMusic.muted = true;

    // se le quita la clase 
    gameTitle.classList.remove('mainThemeAnimation');
  }
}

// para activar/ desactivar todos los efectos de sonido del juego 
function allSoundFX_On$Off(condition){

  if(condition){
    allSoundFXList.forEach ( sound =>{
      sound.muted = false;
    });
  }
  else{
    allSoundFXList.forEach ( sound =>{
      sound.muted = true;
    });
  }
}

// Para aplicar estilos a los interruptores switch 
function switch_On$Off_style (condition,base,circle){
  
  let on = 'On';
  let off = 'Off';

  if( condition){
    base.style.backgroundColor = getSwitchVarColor(on,'Base');
    circle.style.backgroundColor = getSwitchVarColor(on)
  }
  else{
    base.style.backgroundColor = getSwitchVarColor(off,'Base');
    circle.style.backgroundColor = getSwitchVarColor(off)
  }

}

// Para desbloquear los modos si se obtiene SS 
function unlockGameMode(operator){

  // Si el nombre del modo jugado incluye DIFICIL 
  if((nameMode.innerHTML.includes('DIFÍCIL') || nameMode.innerHTML.includes('MEDIO') || nameMode.innerHTML.includes('FÁCIL')) && (operator < 5) ){
    // Se oculta el bloqueo del modo siguiente 
    // La lista empieza con el modo de Sustraccion 
    lockedModeIcon[operator].style.display = 'none';
  }
}

// Esta funcion altera los numeros de la operacion cuando hay indice inverso y hace que no se repitan las opciones 
function getDifferentOperationNumbers(arr1,arr2,arr2I){

  // Toma un array de los numeros de la operacion y resta cada uno con otro array de numeros

  let a = (arr1[0]+arr2[arr2I]);
  let b = (arr1[1]+arr2[arr2I + 1]);
 
  // Retorna los numeros de la operacion alterados para las opciones 
  return [a,b];

}
