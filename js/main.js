'use strict';
// array de palabras y letras
const words = ['cartero', 'estadio', 'sandia', 'pantera'];
const alphabet = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
];

const hangmanImgArray = [
  '/img/hang0.gif',
  '/img/hang1.gif',
  '/img/hang2.gif',
  '/img/hang3.gif',
  '/img/hang4.gif',
  '/img/hang5.gif',
  '/img/hang6.gif',
];

// conseguir una palabra al azar y copia en tipo array
const randomWord = words[Math.floor(Math.random() * words.length)];
const randomWordArray = randomWord.split('');
console.log(randomWordArray);
let dashedWord;

// VARIABLES GLOBALES
let winCounter = 0;
let failCounter = 6;

// MANIPULACION DEL DOM
const secretWordEl = document.querySelector('#secretWord');
const keyboardEl = document.querySelector('#lettersBtn');
const canvasEl = document.querySelector('#canvas');

canvasEl.innerHTML = `
<img id="imgHangman" src=${hangmanImgArray[0]} alt="" />
`;

// FUNCIONES

// función para ocultar las palabras por guiones
const secretWord = () => {
  dashedWord = randomWord.replace(/./g, '_');
  secretWordEl.innerHTML = `${dashedWord}`;
};

secretWord();
let dashedWordArray = dashedWord.split('');
// implementar todas las funciones con funciones flecha
// crear teclado (botones), y cuando le de click deshabilitar el boton. Dentro otra funcion que cuando le de click, compararlo con la palabra secreta
// una variable con el contador de ganar, que cuando descubra una letra correcta, va incrementando.
// una variable con el contador de perder

//Checkear si ha ganado o perdido.

const checkGameState = (a, b, secretWord) => {
  if (a === secretWord.length)
    console.log(`Ganaste. La palabra secreta era ${secretWord}.`);
  if (b === 0)
    console.log(`Perdiste ratona. La palabra secreta era ${secretWord}.`);
};

const compareLetter = (event) => {
  // Hay que ser capaz de guardar el valor del textContent del boton que se clicko.
  let userGuess = event.target.textContent.toLowerCase();
  let button = event.target;
  button.disabled = true;
  // button.disabled
  // Ver si la letra que guardamos esta en la palabra secreta: Si esta, hay que sustituir el dash por la letra tantas veces aparezca. Ademas hay que blockear el boton y ademas hay que aumentar el contador de encontrado si existe, etc.
  randomWordArray.forEach((letter, index) => {
    if (letter === userGuess) {
      dashedWordArray[index] = letter.toLocaleUpperCase();
      console.log(dashedWordArray);
      secretWordEl.innerHTML = `${dashedWordArray.join('')}`;
      winCounter++;
    }
  });
  if (!randomWordArray.includes(userGuess)) {
    failCounter--;
    canvasEl.innerHTML = `
<img id="imgHangman" src=${hangmanImgArray[6 - failCounter]} alt="" />
`;
  }

  console.log(failCounter);
  checkGameState(winCounter, failCounter, randomWord);
};

const generateKeyboard = (array) => {
  // generar un contenedor que sea una letra, y herede un EventListener, y que eso se repita 26 veces.
  let i = 1;
  for (let letter of array) {
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('letter');
    buttonEl.id = `button${i++}`;
    buttonEl.textContent = letter;
    buttonEl.addEventListener('click', compareLetter);
    keyboardEl.appendChild(buttonEl);
  }
};

generateKeyboard(alphabet);
