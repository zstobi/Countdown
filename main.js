// import confettiSplash from './confetti.js'; export default
import { confettiSplash } from './confetti.js'; // export nombrado
import {  } from './timeCalculate.js';

const splash = document.querySelector('#splash');
splash.addEventListener('click', confettiSplash);

// CHANGE THEME

const activator = document.querySelector('.activator');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

let starter = 0;

activator.addEventListener('click', () => {
  if (starter === 0) {
    starter = 1;
    activator.style.backgroundColor = 'hsla(204, 86%, 53%, 0.534)';
    activator.style.transform = 'translateX(48px)';
    moon.style.display = 'none';
    sun.style.display = 'block';
  } else {
    starter = 0;
    activator.style.backgroundColor = 'hsl(204, 86%, 53%)';
    activator.style.transform = 'translateX(0px)';
    moon.style.display = 'block';
    sun.style.d2isplay = 'none';
  }
});

const changeTheme = document.querySelector('.change');

function setBrightTheme() {
  // console.log('1');
  document.body.style.setProperty('--bgc', '#121212');
  localStorage.setItem('fondo', 'dark');
}

function setDarkTheme() {
  // console.log('2');
  document.body.style.setProperty('--bgc', '#ccc');
  localStorage.setItem('fondo', 'claro');
}

if (localStorage.getItem('fondo') === 'claro') {
  setDarkTheme();
} else {
  setBrightTheme();
}

changeTheme.addEventListener('click', () => {
  let bgValue = localStorage.getItem('fondo');

  if (bgValue === 'claro') {
    setBrightTheme();
  } else {
    setDarkTheme();
  }
});

// Faltan remover los eventos
