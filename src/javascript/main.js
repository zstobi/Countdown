// import confettiSplash from './confetti.js'; export default
// import { confettiSplash } from './confetti.js'; // export nombrado
import {  } from './countdown.js';

// const splash = document.querySelector('#splash');
// splash.addEventListener('click', confettiSplash);

// CHANGE THEME

const themeActivator = document.querySelector('.themeActivator'); //switch activador
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

let starter = 0;

themeActivator.addEventListener('click', () => { //listener del switch de themes
  if (starter === 0) {
    starter = 1;
    daySwitch();
  } else {
    starter = 0;
    nightSwitch();
  }
});

const changeTheme = document.querySelector('.change');

function nightSwitch() { //cuando se usa se activa el modo nocturno en el switch (no el background ni el resto de elementos)
  // themeActivator.style.backgroundColor = 'hsl(204, 86%, 53%)';
  themeActivator.style.transform = 'translateX(0px)';
  moon.style.display = 'block';
  sun.style.display = 'none';
}

function daySwitch() { //cuando se usa se activa el modo día en el switch (no el background ni el resto de elementos)
  // themeActivator.style.backgroundColor = 'hsla(204, 86%, 53%, 0.534)';
  themeActivator.style.transform = 'translateX(48px)';
  moon.style.display = 'none';
  sun.style.display = 'block';
}

function setBrightTheme() {
  //setea el modo día y lo guarda en local storage
  document.body.style.setProperty('--bgc', '#121212');
  localStorage.setItem('fondo', 'dark');
}

function setDarkTheme() {
  //setea el modo noche y lo guarda en local storage
  document.body.style.setProperty('--bgc', '#ccc');
  localStorage.setItem('fondo', 'claro');
}

function firstTimeThemeLocalStorageSwitcher() { 
  //primera ejecución para automáticamente poner el modo que haya quedado en la última carga de la página
  let bgValue = localStorage.getItem('fondo');

  if (bgValue === 'claro') {
    setDarkTheme();
  } else {
    setBrightTheme();
  }
}

function themeLocalStorageSwitcher() {
  //para poner el modo opuesto al que haya quedado en la última carga de la página (se usa en el switch)
  let bgValue = localStorage.getItem('fondo');

  if (bgValue === 'claro') {
    setBrightTheme();
  } else {
    setDarkTheme();
  }
}

firstTimeThemeLocalStorageSwitcher();

changeTheme.addEventListener('click', () => { //event listener para poder usar el botón de cambiar theme
  themeLocalStorageSwitcher();
});



// Faltan remover los eventos
